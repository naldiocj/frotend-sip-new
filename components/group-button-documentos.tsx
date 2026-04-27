"use client";

import { ACCESS_TOKEN } from "@/lib/constants";
import { switchTemplate } from "@/lib/switch-template";
import Cookies from "js-cookie";
import { BookOpen, Download, Printer } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface iAppProps {
  id: number;
  url: string;
  documento?: {
    tipoModelo?: string;
    conteudo?: any;
  } | null;
}

function getAuthToken(): string | null {
  if (typeof document === "undefined") return null;

  const accessToken = Cookies.get(ACCESS_TOKEN);
  if (accessToken) return accessToken;

  const cookieMatch = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${ACCESS_TOKEN}=`));

  return cookieMatch ? cookieMatch.split("=").slice(1).join("=") : null;
}

async function checkFileExists(imageUrl: string): Promise<boolean> {
  if (!imageUrl) return false;

  const token = getAuthToken();
  const headers: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/files/uploads/Documentos/${imageUrl}`,
      { headers },
    );

    return response.ok;
  } catch {
    return false;
  }
}

async function fetchDocumentBlob(url: string): Promise<Blob> {
  const token = getAuthToken();
  const headers: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/files/uploads/Documentos/${url}`,
    { headers },
  );

  if (!response.ok) {
    throw new Error(
      `Falha ao carregar documento (${response.status} ${response.statusText})`,
    );
  }

  return response.blob();
}

function createPrintHtml(templateElement: HTMLElement): string {
  const styles = Array.from(
    document.querySelectorAll('style, link[rel="stylesheet"]'),
  )
    .map((node) => node.outerHTML)
    .join("\n");

  return `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Impressão</title>
  ${styles}
  <style>
    @page { size: A4; margin: 15mm; }
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    body { margin: 0; padding: 20px; font-family: 'Times New Roman', Times, serif; }
    .print-only { display: block; }
  </style>
</head>
<body>
  ${templateElement.innerHTML}
  <script>
    window.onload = function() {
      setTimeout(function() { window.print(); }, 300);
    };
  </script>
</body>
</html>`;
}

export function GroupButtonDocumentos({ id, url, documento }: iAppProps) {
  const [fileExists, setFileExists] = useState(false);
  const [isLoadingFile, setIsLoadingFile] = useState(true);

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);
  const [viewerLoading, setViewerLoading] = useState(false);
  const [viewerError, setViewerError] = useState<string | null>(null);

  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const templateContentRef = useRef<HTMLDivElement>(null);
  const printFrameRef = useRef<HTMLIFrameElement>(null);

  const docData = documento;
  const templateType = docData?.tipoModelo;
  const templateContent = docData?.conteudo;
  const TemplateComponent = templateType ? switchTemplate(templateType) : null;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    async function checkFile() {
      const exists = await checkFileExists(url);
      setFileExists(exists);
      setIsLoadingFile(false);

      if (!exists) {
        timeoutId = setTimeout(checkFile, 60000);
      }
    }

    checkFile();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [url]);

  useEffect(() => {
    return () => {
      if (viewerUrl) URL.revokeObjectURL(viewerUrl);
    };
  }, [viewerUrl]);

  const openFileViewer = useCallback(async () => {
    setViewerLoading(true);
    setViewerError(null);

    try {
      const blob = await fetchDocumentBlob(url);
      const blobUrl = URL.createObjectURL(blob);
      setViewerUrl(blobUrl);
      setIsViewerOpen(true);
    } catch (error) {
      console.error("Erro ao abrir documento:", error);
      setViewerError(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao abrir o documento.",
      );
    } finally {
      setViewerLoading(false);
    }
  }, [url]);

  const openTemplateViewer = useCallback(() => {
    setIsTemplateOpen(true);
  }, []);

  const closeFileViewer = useCallback(() => {
    setIsViewerOpen(false);
    if (viewerUrl) {
      URL.revokeObjectURL(viewerUrl);
      setViewerUrl(null);
    }
  }, [viewerUrl]);

  const closeTemplateViewer = useCallback(() => {
    setIsTemplateOpen(false);
  }, []);

  const handlePrintOrSave = useCallback(() => {
    const templateElement = templateContentRef.current;
    if (!templateElement) {
      toast.error("ERRO", {
        description: "Não foi possível carregar o template.",
      });
      return;
    }

    setIsPrinting(true);

    const printHtml = createPrintHtml(templateElement);
    const iframe = printFrameRef.current;
    const iframeDoc =
      iframe?.contentDocument || iframe?.contentWindow?.document;

    if (!iframeDoc) {
      setIsPrinting(false);
      toast.error("ERRO", {
        description: "Não foi possível criar frame de impressão.",
      });
      return;
    }

    iframeDoc.open();
    iframeDoc.write(printHtml);
    iframeDoc.close();

    setTimeout(() => setIsPrinting(false), 1500);

    toast.success("Na janela de impressão, selecione 'Salvar como PDF'", {
      duration: 5000,
    });
  }, []);

  const showFileButton = !isLoadingFile && fileExists;
  const showTemplateButton = TemplateComponent && templateContent;

  return (
    <>
      <iframe
        ref={printFrameRef}
        style={{ display: "none" }}
        title="Print frame"
      />

      <div className="flex justify-center items-center w-full gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-800 mt-3">
        {showFileButton && (
          <Button
            variant="outline"
            className="w-full cursor-pointer hover:bg-black hover:text-white dark:bg-foreground dark:text-black dark:hover:bg-foreground"
            onClick={openFileViewer}
          >
            <BookOpen />
          </Button>
        )}

        {showTemplateButton && (
          <Button
            variant="outline"
            className="w-full cursor-pointer hover:bg-black hover:text-white dark:bg-foreground dark:text-black dark:hover:bg-foreground"
            onClick={openTemplateViewer}
          >
            <BookOpen />
          </Button>
        )}
      </div>

      <Dialog
        open={isViewerOpen}
        onOpenChange={(open) => !open && closeFileViewer()}
      >
        <DialogContent className="sm:max-w-5xl max-w-full p-0 overflow-hidden max-h-[90vh]">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle>Visualizador de Documento</DialogTitle>
            <DialogDescription>
              Visualize o documento sem sair da página.
            </DialogDescription>
          </DialogHeader>

          <div className="p-4 min-h-[60vh] bg-slate-50 dark:bg-slate-950">
            {viewerLoading && (
              <div className="flex h-[50vh] items-center justify-center text-sm text-muted-foreground">
                Carregando documento...
              </div>
            )}

            {viewerError && (
              <div className="text-sm text-red-600 dark:text-red-400">
                {viewerError}
              </div>
            )}

            {viewerUrl && !viewerLoading && !viewerError && (
              <div className="h-[70vh]">
                <iframe
                  src={viewerUrl}
                  title="Documento"
                  className="h-full w-full border-none"
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isTemplateOpen}
        onOpenChange={(open) => !open && closeTemplateViewer()}
      >
        <DialogContent
          className="sm:max-w-5xl max-w-full p-0 overflow-hidden max-h-[90vh]"
          title="Modal Template"
          aria-describedby="Modal Template"
        >
          <DialogHeader className="p-6 pb-2">
            <DialogTitle>Template do Documento</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-end gap-2 border-b border-border/60 px-4 py-3">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={handlePrintOrSave}
              disabled={isPrinting}
            >
              <Download className="h-4 w-4" />
              {isPrinting ? "A abrir..." : "Baixar PDF"}
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={handlePrintOrSave}
              disabled={isPrinting}
            >
              <Printer className="h-4 w-4" />
              {isPrinting ? "A abrir..." : "Imprimir"}
            </Button>
          </div>
          <div
            ref={templateContentRef}
            className="overflow-y-auto max-h-[calc(90vh-64px)] p-4"
          >
            {TemplateComponent && (
              <TemplateComponent preview={templateContent} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
