export function formatChartData(data: any[]): { name: string; value: number }[] {
  if (!data || data.length === 0) return [];
  return data.map((item) => ({
    name: item.name || item.label || "Sem dados",
    value: Number(item.value || item.count || 0),
  }));
}
