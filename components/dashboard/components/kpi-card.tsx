"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown } from "lucide-react";

export function KpiCard({
  title,
  value,
  icon: Icon,
  color,
  trend,
  trendUp,
  description,
  isLoading,
}: {
  title: string;
  value: number;
  icon: any;
  color: string;
  trend?: string;
  trendUp?: boolean;
  description?: string;
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <div className="rounded-2xl bg-card border border-border p-6 shadow-sm">
        <Skeleton className="h-16 w-full" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-card border border-border p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group cursor-pointer">
      <div className="flex items-start justify-between">
        <div className="space-y-1 flex-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider truncate">
            {title}
          </p>
          <h3 className="text-3xl font-bold mt-1 group-hover:text-primary transition-colors" aria-label={`${title}: ${value}`}>{value ?? 0}</h3>
          {trend && (
            <div className="flex items-center gap-1 mt-1">
              {trendUp ? (
                <TrendingUp className="h-3 w-3 text-emerald-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-rose-500" />
              )}
              <span className="text-xs text-muted-foreground">
                {trend}
              </span>
            </div>
          )}
          {description && (
            <p className="text-xs text-muted-foreground mt-1">
              {description}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform duration-300`} aria-hidden="true">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
