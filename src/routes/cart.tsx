import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";
import { money, shippingFor } from "@/lib/store-info";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "سلة التسوق | أوتو ماركتينج" }, { name: "description", content: "راجعي المنتجات في سلة التسوق وتفاصيل الشحن قبل إتمام الطلب." }, { property: "og:title", content: "سلة التسوق | أوتو ماركتينج" }, { property: "og:description", content: "راجعي المنتجات في سلة التسوق وتفاصيل الشحن قبل إتمام الطلب." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: Cart,
});

function Cart() {
  const { items, setQty, subtotal } = useCart();
  const ship = shippingFor(subtotal);
  if (!items.length) return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">سلة التسوق فارغة</h1>
      <Link to="/shop" search={{}} className="mt-6 inline-block bg-primary px-8 py-3 text-sm text-primary-foreground">تصفحي المنتجات</Link>
    </div>
  );
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
      <div className="md:col-span-2">
        <h1 className="mb-6 text-3xl font-bold">سلة التسوق</h1>
        <div className="divide-y divide-border border-y border-border">
          {items.map((i) => {
            const p = getProduct(i.id)!;
            return (
              <div key={i.id + i.size} className="flex gap-4 py-4">
                <img src={`${p.images[0]}&width=200`} alt={p.title} className="h-28 w-20 object-cover" />
                <div className="flex-1 space-y-1 text-sm">
                  <p className="font-semibold">{p.title}</p>
                  {i.size && <p className="text-muted-foreground">المقاس: {i.size}</p>}
                  <p>{money(p.price)}</p>
                  <div className="flex items-center gap-2 pt-1">
                    <button aria-label="إنقاص" onClick={() => setQty(i.id, i.size, i.qty - 1)} className="border border-border p-1"><Minus className="h-3 w-3" /></button>
                    <span className="w-6 text-center">{i.qty}</span>
                    <button aria-label="زيادة" onClick={() => setQty(i.id, i.size, i.qty + 1)} className="border border-border p-1"><Plus className="h-3 w-3" /></button>
                    <button aria-label="حذف" onClick={() => setQty(i.id, i.size, 0)} className="ms-3 text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
                <p className="text-sm font-semibold">{money(p.price * i.qty)}</p>
              </div>
            );
          })}
        </div>
      </div>
      <aside className="h-fit space-y-3 border border-border bg-card p-6 text-sm">
        <h2 className="text-lg font-bold">ملخص الطلب</h2>
        <div className="flex justify-between"><span>المجموع الفرعي</span><span>{money(subtotal)}</span></div>
        <div className="flex justify-between"><span>الشحن</span><span>{ship ? money(ship) : "مجاني"}</span></div>
        <div className="flex justify-between border-t border-border pt-3 text-base font-bold"><span>الإجمالي</span><span>{money(subtotal + ship)}</span></div>
        <Link to="/checkout" className="block bg-primary py-3 text-center text-primary-foreground">إتمام الطلب</Link>
      </aside>
    </div>
  );
}
