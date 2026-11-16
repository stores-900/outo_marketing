import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";
import { products, CATEGORIES } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { STORE } from "@/lib/store-info";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "أزياء نسائية فاخرة | أوتو ماركتينج" }, { name: "description", content: "تسوقي فساتين وقفاطين وعبايات وأطقم من مؤسسة أوتو ماركتينج مع شحن لجميع مدن المملكة ودفع آمن." }, { property: "og:title", content: "أزياء نسائية فاخرة | أوتو ماركتينج" }, { property: "og:description", content: "تسوقي فساتين وقفاطين وعبايات وأطقم من مؤسسة أوتو ماركتينج مع شحن لجميع مدن المملكة ودفع آمن." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: Index,
});

function Index() {
  const latest = products.filter((p) => p.available).slice(0, 8);
  const hero = products.find((p) => p.available)!;
  const catImg = (id: string) => products.find((p) => p.category === id && p.available)?.images[0] ?? hero.images[0];
  return (
    <div>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
        <div className="space-y-6">
          <p className="text-sm tracking-[0.3em] text-gold">مجموعة ٢٠٢٦</p>
          <h1 className="text-4xl font-bold leading-[1.4] md:text-6xl">أناقة تُروى في التفاصيل</h1>
          <p className="max-w-md leading-8 text-muted-foreground">فساتين وقفاطين وعبايات مختارة بعناية، بخامات فاخرة وقصّات تليق بكل مناسبة. توصيل لجميع مناطق المملكة.</p>
          <div className="flex gap-3">
            <Link to="/shop" search={{}} className="bg-primary px-8 py-3 text-sm text-primary-foreground hover:bg-primary/90">تسوقي الآن</Link>
            <Link to="/shop" search={{ cat: "kaftans" }} className="border border-primary px-8 py-3 text-sm hover:bg-secondary">القفاطين</Link>
          </div>
        </div>
        <div className="aspect-[4/5] overflow-hidden bg-muted">
          <img src={`${hero.images[0]}&width=900`} alt={hero.title} width={900} height={1125} className="h-full w-full object-cover" />
        </div>
      </section>
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 text-sm md:grid-cols-4">
          {[[Truck, "شحن لجميع مدن المملكة"], [ShieldCheck, "دفع إلكتروني آمن"], [RotateCcw, "استبدال وإرجاع خلال ٧ أيام"], [Headphones, `خدمة العملاء ${STORE.phone}`]].map(([I, t], i) => {
            const Icon = I as typeof Truck;
            return <div key={i} className="flex items-center gap-3"><Icon className="h-6 w-6 text-gold" /><span>{t as string}</span></div>;
          })}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-8 text-2xl font-bold">تسوقي حسب الفئة</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
          {CATEGORIES.map((c) => (
            <Link key={c.id} to="/shop" search={{ cat: c.id }} className="group relative aspect-[3/4] overflow-hidden bg-muted">
              <img src={`${catImg(c.id)}&width=400`} alt={c.label} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 bg-background/90 py-2 text-center text-sm font-semibold">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold">وصل حديثاً</h2>
          <Link to="/shop" search={{}} className="text-sm text-gold">عرض الكل ←</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
          {latest.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </div>
  );
}
