"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export function ErrorCard({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="border-destructive border rounded-lg p-6 text-center">
      <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
      <p className="text-sm text-muted-foreground mb-3">{message}</p>
      <Button onClick={onRetry} variant="outline" size="sm">
        Tentar novamente
      </Button>
    </div>
  );
}
