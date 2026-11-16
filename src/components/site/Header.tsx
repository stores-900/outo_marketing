import { Link } from "@tanstack/react-router";
import { ShoppingBag, Phone, Mail } from "lucide-react";
import { useCart } from "@/lib/cart";
import { STORE } from "@/lib/store-info";
import { CATEGORIES } from "@/lib/products";

export function Header() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="bg-primary text-primary-foreground text-xs">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2">
          <span>شحن مجاني للطلبات فوق {STORE.freeShippingOver} ر.س داخل المملكة</span>
          <div className="flex gap-4">
            <a href={`tel:${STORE.phone}`} className="flex items-center gap-1" dir="ltr"><Phone className="h-3 w-3" />{STORE.phone}</a>
            <a href={`mailto:${STORE.email}`} className="hidden items-center gap-1 sm:flex"><Mail className="h-3 w-3" />{STORE.email}</a>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt={`شعار ${STORE.nameAr}`} width={64} height={64} className="h-16 w-16 object-contain" />
          <div className="hidden leading-tight sm:block">
            <div className="font-display text-lg font-bold">{STORE.brandAr}</div>
            <div className="text-[10px] tracking-[0.3em] text-muted-foreground">AUTO MARKETING</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link to="/" className="hover:text-gold" activeOptions={{ exact: true }} activeProps={{ className: "text-gold" }}>الرئيسية</Link>
          <Link to="/shop" search={{}} className="hover:text-gold" activeProps={{ className: "text-gold" }}>المتجر</Link>
          <Link to="/about" className="hover:text-gold" activeProps={{ className: "text-gold" }}>من نحن</Link>
          <Link to="/contact" className="hover:text-gold" activeProps={{ className: "text-gold" }}>اتصل بنا</Link>
        </nav>
        <Link to="/cart" className="relative rounded-full border border-border p-2.5 hover:border-gold" aria-label="سلة التسوق">
          <ShoppingBag className="h-5 w-5" />
          {count > 0 && <span className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[11px] font-bold text-accent-foreground">{count}</span>}
        </Link>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl gap-5 overflow-x-auto px-4 py-2 text-sm text-muted-foreground">
          {CATEGORIES.map((c) => (
            <Link key={c.id} to="/shop" search={{ cat: c.id }} className="whitespace-nowrap hover:text-foreground">{c.label}</Link>
          ))}
          <Link to="/contact" className="whitespace-nowrap hover:text-foreground md:hidden">اتصل بنا</Link>
        </div>
      </div>
    </header>
  );
}
