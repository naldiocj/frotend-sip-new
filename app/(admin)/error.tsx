"use client";

import { useEffect } from "react";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Algo correu mal</h2>
        <p className="text-muted-foreground max-w-md">
          Ocorreu um erro inesperado. Por favor, tente novamente ou contacte o suporte se o
          problema persistir.
        </p>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          <RefreshCw className="h-4 w-4" />
          Tentar novamente
        </button>
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md border px-4 py-2 hover:bg-accent hover:text-accent-foreground"
        >
          <Home className="h-4 w-4" />
          Início
        </Link>
      </div>
    </div>
  );
}