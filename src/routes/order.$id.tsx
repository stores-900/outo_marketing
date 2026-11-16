import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { loadOrder, type Order } from "@/lib/cart";
import { STORE, fullAddress, money } from "@/lib/store-info";

export const Route = createFileRoute("/order/$id")({
  head: () => ({ meta: [{ title: "فاتورة الطلب | أوتو ماركتينج" }, { name: "description", content: "فاتورة وتفاصيل طلبك من مؤسسة أوتو ماركتينج." }, { property: "og:title", content: "فاتورة الطلب | أوتو ماركتينج" }, { property: "og:description", content: "فاتورة وتفاصيل طلبك." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: OrderPage,
});

function OrderPage() {
  const { id } = Route.useParams();
  const [o, setO] = useState<Order | null | undefined>(undefined);
  useEffect(() => setO(loadOrder(id)), [id]);
  if (o === undefined) return null;
  if (!o) return <div className="py-24 text-center">لم يتم العثور على الطلب. <Link to="/" className="underline">الرئيسية</Link></div>;
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="mb-6 bg-secondary p-4 text-center text-sm">تم استلام طلبك بنجاح. سيتم تحويلك لإتمام الدفع، وستصلك رسالة تأكيد على بريدك الإلكتروني.</p>
      <div className="border border-border bg-card p-8 text-sm">
        <div className="flex flex-wrap items-start justify-between gap-6 border-b border-border pb-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt={`شعار ${STORE.nameAr}`} width={72} height={72} className="h-18 w-18 object-contain" />
            <div className="leading-7">
              <p className="font-bold">{STORE.nameAr}</p>
              <p className="text-xs text-muted-foreground">{STORE.nameEn}</p>
              <p className="text-xs">الرقم الوطني الموحد: {STORE.unifiedNumber}</p>
            </div>
          </div>
          <div className="text-xs leading-6">
            <p className="text-lg font-bold">فاتورة</p>
            <p>رقم الطلب: #{o.id}</p>
            <p>التاريخ: {o.date}</p>
            <p>الحالة: {o.status}</p>
          </div>
        </div>
        <div className="grid gap-6 border-b border-border py-6 text-xs leading-6 md:grid-cols-2">
          <div><p className="mb-1 font-bold">البائع</p><p>{fullAddress()}</p><p>{STORE.email}</p><p dir="ltr" className="text-end">{STORE.phone}</p></div>
          <div><p className="mb-1 font-bold">العميل</p><p>{o.customer.name}</p><p>{o.customer.city}، {o.customer.district}، {o.customer.street}</p><p>{o.customer.email}</p><p>{o.customer.phone}</p></div>
        </div>
        <table className="my-6 w-full text-xs">
          <thead><tr className="border-b border-border text-start"><th className="py-2 text-start">المنتج</th><th>الكمية</th><th>السعر</th><th className="text-end">المجموع</th></tr></thead>
          <tbody>{o.items.map((i) => (
            <tr key={i.id + i.size} className="border-b border-border"><td className="py-2">{i.title}{i.size && ` (${i.size})`}</td><td className="text-center">{i.qty}</td><td className="text-center">{money(i.price)}</td><td className="text-end">{money(i.price * i.qty)}</td></tr>
          ))}</tbody>
        </table>
        <div className="ms-auto max-w-xs space-y-2">
          <div className="flex justify-between"><span>المجموع الفرعي</span><span>{money(o.subtotal)}</span></div>
          <div className="flex justify-between"><span>الشحن</span><span>{o.shipping ? money(o.shipping) : "مجاني"}</span></div>
          <div className="flex justify-between border-t border-border pt-2 font-bold"><span>الإجمالي</span><span>{money(o.total)}</span></div>
          <p className="text-xs text-muted-foreground">طريقة الدفع: {o.payment}</p>
        </div>
      </div>
      <button onClick={() => window.print()} className="mt-6 border border-primary px-6 py-2 text-sm">طباعة الفاتورة</button>
    </div>
  );
}
