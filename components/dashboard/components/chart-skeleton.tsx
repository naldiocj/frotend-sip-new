"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ChartSkeleton() {
  return (
    <div className="h-64 flex items-center justify-center" aria-label="Carregando gráfico">
      <Skeleton className="h-full w-full" />
    </div>
  );
}
