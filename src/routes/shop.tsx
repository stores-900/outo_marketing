import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { products, CATEGORIES } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): { cat?: string } => (typeof s["cat"] === "string" ? { cat: s["cat"] } : {}),
  head: () => ({ meta: [{ title: "المتجر | أوتو ماركتينج" }, { name: "description", content: "تصفحي جميع منتجات أوتو ماركتينج من الفساتين والقفاطين والعبايات والأطقم بأسعار واضحة بالريال السعودي." }, { property: "og:title", content: "المتجر | أوتو ماركتينج" }, { property: "og:description", content: "تصفحي جميع منتجات أوتو ماركتينج من الفساتين والقفاطين والعبايات والأطقم بأسعار واضحة بالريال السعودي." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: Shop,
});

function Shop() {
  const { cat } = Route.useSearch();
  const [q, setQ] = useState("");
  const list = products.filter((p) => (!cat || p.category === cat) && (!q || p.title.includes(q)));
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold">{CATEGORIES.find((c) => c.id === cat)?.label ?? "جميع المنتجات"}</h1>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Link to="/shop" search={{}} className={`border px-4 py-1.5 text-sm ${!cat ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>الكل</Link>
        {CATEGORIES.map((c) => (
          <Link key={c.id} to="/shop" search={{ cat: c.id }} className={`border px-4 py-1.5 text-sm ${cat === c.id ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>{c.label}</Link>
        ))}
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحثي عن منتج..." className="ms-auto w-full border border-input bg-card px-4 py-2 text-sm md:w-64" />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{list.length} منتج</p>
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
        {list.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}
