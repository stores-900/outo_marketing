import data from "@/data/products.json";

export type Product = {
  id: string; title: string; category: string; price: number; compareAt: number | null;
  available: boolean; description: string; sizes: string[]; images: string[];
};

export const products = data as Product[];

export const CATEGORIES: { id: string; label: string }[] = [
  { id: "dresses", label: "فساتين" },
  { id: "kaftans", label: "قفاطين" },
  { id: "abayas", label: "عبايات" },
  { id: "sets", label: "أطقم" },
  { id: "tops", label: "قمصان وبناطيل" },
  { id: "gifts", label: "هدايا" },
];

export const categoryLabel = (id: string) => CATEGORIES.find((c) => c.id === id)?.label ?? id;
export const getProduct = (id: string) => products.find((p) => p.id === id);
