"use client";

import { cn } from "@/lib/utils";
import { BookOpen, Printer } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { ACCESS_TOKEN, API_UPLOAD_URL } from "@/lib/constants";

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

export function GroupButtonDocumentos({ id, url }: iAppProps) {
  const [currCard, setCurrCard] = useState<number | null>(id);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);
  const [viewerLoading, setViewerLoading] = useState(false);
  const [viewerError, setViewerError] = useState<string | null>(null);

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
      const response = await fetch(`${API_UPLOAD_URL}/documentos/${url}`, {
        headers,
        // credentials: "include",
      });

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
        <Button
          variant="outline"
          className="cursor-pointer hover:bg-black hover:text-white dark:bg-foreground dark:text-black dark:hover:bg-foreground"
          onClick={() => openDocument(url)}
        >
          <BookOpen />
        </Button>
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

          {/* <DialogFooter className="justify-end">
            <Button variant="outline" onClick={closeViewer}>
              Fechar
            </Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </>
  );
}
