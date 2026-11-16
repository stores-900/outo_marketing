import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";
import { money } from "@/lib/store-info";

export function ProductCard({ p }: { p: Product }) {
  return (
    <Link to="/product/$id" params={{ id: p.id }} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img src={`${p.images[0]}&width=600`} alt={p.title} loading="lazy" width={600} height={800} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        {!p.available && <span className="absolute top-3 right-3 bg-primary px-2 py-1 text-xs text-primary-foreground">نفدت الكمية</span>}
        {p.compareAt && p.available && <span className="absolute top-3 right-3 bg-gold px-2 py-1 text-xs text-accent-foreground">تخفيض</span>}
      </div>
      <h3 className="mt-3 line-clamp-2 text-sm leading-6">{p.title}</h3>
      <div className="mt-1 flex items-center gap-2 text-sm">
        <span className="font-semibold">{money(p.price)}</span>
        {p.compareAt && <span className="text-muted-foreground line-through">{money(p.compareAt)}</span>}
      </div>
    </Link>
  );
}
