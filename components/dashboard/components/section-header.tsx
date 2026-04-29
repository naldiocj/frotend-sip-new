"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SectionHeader({
  title,
  description,
  showMonthFilter,
  selectedMonths,
  onMonthChange,
}: {
  title: string;
  description?: string;
  showMonthFilter?: boolean;
  selectedMonths?: number;
  onMonthChange?: (months: number) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {showMonthFilter && selectedMonths !== undefined && onMonthChange && (
        <Select value={selectedMonths.toString()} onValueChange={(v) => onMonthChange(Number(v))}>
          <SelectTrigger className="w-[180px]" aria-label="Selecionar período">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">3 Meses</SelectItem>
            <SelectItem value="6">6 Meses (Padrão)</SelectItem>
            <SelectItem value="12">12 Meses</SelectItem>
            <SelectItem value="24">24 Meses</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
