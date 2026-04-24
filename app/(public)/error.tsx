"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="w-full max-w-md border-destructive/20 shadow-lg">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold">
              Algo correu mal
            </CardTitle>
            <CardDescription className="text-base">
              Ocorreu um erro inesperado. Tente novamente ou contacte o suporte
              técnico se o problema persistir.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-sm font-muted-foreground text-muted-foreground">
              {error.message || "Erro desconhecido"}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-3">
          <Button onClick={() => reset()} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Tentar novamente
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Voltar ao início
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}