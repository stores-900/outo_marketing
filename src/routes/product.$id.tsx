import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { getProduct, categoryLabel } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { money, STORE } from "@/lib/store-info";
import { PaymentBadges } from "@/components/site/Footer";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.title} | أوتو ماركتينج` : "منتج غير متوفر";
    const d = loaderData ? loaderData.description.slice(0, 155) : "";
    return {
      meta: [
        { title: t }, { name: "description", content: d },
        { property: "og:title", content: t }, { property: "og:description", content: d },
        { property: "og:type", content: "product" }, { name: "twitter:card", content: "summary_large_image" },
        ...(loaderData ? [{ property: "og:image", content: `${loaderData.images[0]}&width=1200` }, { name: "twitter:image", content: `${loaderData.images[0]}&width=1200` }] : []),
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const p = Route.useLoaderData();
  const [img, setImg] = useState(0);
  const [size, setSize] = useState(p.sizes[0] ?? "");
  const [added, setAdded] = useState(false);
  const { add } = useCart();
  const nav = useNavigate();
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link to="/">الرئيسية</Link> / <Link to="/shop" search={{ cat: p.category }}>{categoryLabel(p.category)}</Link>
      </nav>
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <div className="aspect-[3/4] overflow-hidden bg-muted">
            <img src={`${p.images[img]}&width=1000`} alt={p.title} className="h-full w-full object-cover" />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {p.images.map((u, i) => (
              <button key={u} onClick={() => setImg(i)} className={`aspect-[3/4] overflow-hidden border-2 ${i === img ? "border-gold" : "border-transparent"}`}>
                <img src={`${u}&width=200`} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold leading-[1.6] md:text-3xl">{p.title}</h1>
          <div className="flex items-center gap-3 text-xl">
            <span className="font-bold">{money(p.price)}</span>
            {p.compareAt && <span className="text-base text-muted-foreground line-through">{money(p.compareAt)}</span>}
          </div>
          {p.sizes.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-semibold">المقاس</p>
              <div className="flex flex-wrap gap-2">
                {p.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)} className={`min-w-12 border px-3 py-2 text-sm ${size === s ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>{s}</button>
                ))}
              </div>
            </div>
          )}
          {p.available ? (
            <div className="flex gap-3">
              <button onClick={() => { add({ id: p.id, size, qty: 1 }); setAdded(true); }} className="flex-1 border border-primary py-3 text-sm hover:bg-secondary">{added ? "تمت الإضافة ✓" : "أضيفي إلى السلة"}</button>
              <button onClick={() => { add({ id: p.id, size, qty: 1 }); nav({ to: "/checkout" }); }} className="flex-1 bg-primary py-3 text-sm text-primary-foreground hover:bg-primary/90">اشتري الآن</button>
            </div>
          ) : (
            <p className="bg-muted p-3 text-center text-sm">نفدت الكمية حالياً</p>
          )}
          <PaymentBadges />
          <div className="space-y-3 border-t border-border pt-6 text-sm leading-8 text-muted-foreground">
            {p.description.split(" | ").map((t, i) => <p key={i}>{t}</p>)}
          </div>
          <ul className="space-y-1 border-t border-border pt-6 text-sm text-muted-foreground">
            <li>• التوصيل خلال ٢–٧ أيام عمل — <Link to="/shipping-policy" className="underline">سياسة الشحن</Link></li>
            <li>• الإرجاع والاستبدال خلال ٧ أيام — <Link to="/refund-policy" className="underline">سياسة الاسترداد</Link></li>
            <li>• البائع: {STORE.nameAr} — سجل تجاري {STORE.unifiedNumber}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
