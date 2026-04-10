import { DOCUMENT_CATEGORIES } from "./constants";
import { PecaCategory } from "./types";

export function filterDocumentos(query: string): PecaCategory[] {
  if (!query.trim()) {
    return DOCUMENT_CATEGORIES;
  }

  const lowerQuery = query.trim().toLowerCase();

  return DOCUMENT_CATEGORIES.map((category) => {
    const filteredItems = category.items.filter((item) =>
      item.label.toLowerCase().includes(lowerQuery),
    );
    return filteredItems.length > 0
      ? { ...category, items: filteredItems }
      : null;
  }).filter(Boolean) as PecaCategory[];
}
