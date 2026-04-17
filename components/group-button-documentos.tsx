"use client";

import { ACCESS_TOKEN } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import { BookOpen, Loader2, Printer } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
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
}

function getCookieValue(name: string) {
  if (typeof document === "undefined") return null;
  return (
    document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith(`${name}=`))
      ?.split("=")
      .slice(1)
      .join("=") || null
  );
}

async function imageUrlExists(imageUrl: string): Promise<boolean> {
  if (!imageUrl) return false;

  const token = Cookies.get(ACCESS_TOKEN) || getCookieValue(ACCESS_TOKEN);
  const headers: Record<string, string> = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/files/uploads/Documentos/${imageUrl}`,
      {
        headers,
      },
    );
    return response.ok;
  } catch (e) {
    return false;
  }
}

export function GroupButtonDocumentos({ id, url }: iAppProps) {
  const [currCard, setCurrCard] = useState<number | null>(id);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);
  const [viewerLoading, setViewerLoading] = useState(false);
  const [viewerError, setViewerError] = useState<string | null>(null);
  const [file, setFile] = useState<boolean | null>(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | number | null = null;

    async function checkFile() {
      const exists = await imageUrlExists(url);
      setFile(exists);

      if (!exists) {
        // Retry in 1 minute (60000 ms) if file not found
        timeoutId = setTimeout(checkFile, 60000);
      }
    }

    checkFile();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId as number);
      }
    };
    // Only run when the url changes
  }, [url]);

  useEffect(() => {
    return () => {
      if (viewerUrl) {
        URL.revokeObjectURL(viewerUrl);
      }
    };
  }, [viewerUrl]);

  async function openDocument(url: string) {
    setViewerLoading(true);
    setViewerError(null);

    const token = Cookies.get(ACCESS_TOKEN) || getCookieValue(ACCESS_TOKEN);
    const headers: Record<string, string> = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/files/uploads/Documentos/${url}`,
        {
          headers,
        },
      );

      if (!response.ok) {
        throw new Error(
          `Falha ao carregar documento (${response.status} ${response.statusText})`,
        );
      }

      const blob = await response.blob();
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
  }

  function closeViewer() {
    setIsViewerOpen(false);
    if (viewerUrl) {
      URL.revokeObjectURL(viewerUrl);
      setViewerUrl(null);
    }
  }

  return (
    <>
      <div
        className={cn(
          "flex justify-center items-center w-full gap-2 opacity-0 transition-opacity duration-800 mt-3",
          currCard === id ? "opacity-100" : "opacity-0",
        )}
      >
        {file ? (
          <Button
            variant="outline"
            className="cursor-pointer hover:bg-black hover:text-white dark:bg-foreground dark:text-black dark:hover:bg-foreground"
            onClick={() => openDocument(url)}
          >
            <BookOpen />
          </Button>
        ) : (
          <Button
            variant="outline"
            className="cursor-pointer hover:bg-black hover:text-white dark:bg-foreground dark:text-black dark:hover:bg-foreground"
            onClick={() => openDocument(url)}
          >
            <Loader2 className="size-4 animate-spin" />
          </Button>
        )}
        <Button className="cursor-pointer hover:bg-blue-900">
          <Printer />
        </Button>
      </div>

      <Dialog
        open={isViewerOpen}
        onOpenChange={(open) => !open && closeViewer()}
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
    </>
  );
}
