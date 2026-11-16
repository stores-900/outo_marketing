import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useCart, saveOrder, type Order } from "@/lib/cart";
import { getProduct } from "@/lib/products";
import { money, shippingFor } from "@/lib/store-info";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "إتمام الطلب | أوتو ماركتينج" }, { name: "description", content: "أدخلي بيانات الشحن واختاري طريقة الدفع لإتمام طلبك بأمان." }, { property: "og:title", content: "إتمام الطلب | أوتو ماركتينج" }, { property: "og:description", content: "أدخلي بيانات الشحن واختاري طريقة الدفع لإتمام طلبك بأمان." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: Checkout,
});

const field = "w-full border border-input bg-card px-3 py-2.5 text-sm";

function Checkout() {
  const { items, subtotal, clear } = useCart();
  const nav = useNavigate();
  const [agree, setAgree] = useState(false);
  const [payment, setPayment] = useState("بطاقة مدى / فيزا / ماستركارد");
  const ship = shippingFor(subtotal);
  if (!items.length) return <div className="py-24 text-center"><p>لا توجد منتجات في السلة.</p><Link to="/shop" search={{}} className="text-gold underline">العودة للمتجر</Link></div>;

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget); const g = (k: string) => String(fd.get(k) ?? ""); const f = { name: g("name"), phone: g("phone"), email: g("email"), city: g("city"), district: g("district"), street: g("street"), notes: g("notes") };
    const order: Order = {
      id: String(Date.now()).slice(-8), date: new Date().toLocaleString("ar-SA"),
      items: items.map((i) => ({ ...i, title: getProduct(i.id)!.title, price: getProduct(i.id)!.price })),
      subtotal, shipping: ship, total: subtotal + ship,
      customer: { name: f.name, phone: f.phone, email: f.email, city: f.city, district: f.district, street: f.street, notes: f.notes },
      payment, status: "بانتظار الدفع",
    };
    saveOrder(order); clear();
    nav({ to: "/order/$id", params: { id: order.id } });
  };

  return (
    <form onSubmit={submit} className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
      <div className="space-y-8 md:col-span-2">
        <h1 className="text-3xl font-bold">إتمام الطلب</h1>
        <section className="grid gap-4 md:grid-cols-2">
          <h2 className="font-bold md:col-span-2">بيانات العميل والشحن</h2>
          <input required name="name" placeholder="الاسم الكامل" className={field} />
          <input required name="phone" type="tel" pattern="05[0-9]{8}" placeholder="رقم الجوال 05xxxxxxxx" className={field} />
          <input required name="email" type="email" placeholder="البريد الإلكتروني" className={`${field} md:col-span-2`} />
          <input required name="city" placeholder="المدينة" className={field} />
          <input required name="district" placeholder="الحي" className={field} />
          <input required name="street" placeholder="الشارع ورقم المبنى / العنوان الوطني المختصر" className={`${field} md:col-span-2`} />
          <textarea name="notes" placeholder="ملاحظات (اختياري)" className={`${field} md:col-span-2`} rows={3} />
        </section>
        <section className="space-y-3">
          <h2 className="font-bold">طريقة الدفع</h2>
          {["بطاقة مدى / فيزا / ماستركارد", "Apple Pay"].map((m) => (
            <label key={m} className={`flex cursor-pointer items-center gap-3 border p-4 text-sm ${payment === m ? "border-primary" : "border-border"}`}>
              <input type="radio" checked={payment === m} onChange={() => setPayment(m)} /> {m}
            </label>
          ))}
          <p className="text-xs text-muted-foreground">تتم معالجة المدفوعات عبر بوابة دفع إلكترونية آمنة ومشفّرة، ولا نقوم بتخزين بيانات بطاقتك.</p>
        </section>
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" required checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1.5" />
          <span>أقر بأنني اطلعت ووافقت على <Link to="/terms" className="underline">شروط الخدمة</Link> و<Link to="/refund-policy" className="underline">سياسة الاسترداد والإلغاء</Link> و<Link to="/shipping-policy" className="underline">سياسة الشحن</Link> و<Link to="/privacy-policy" className="underline">سياسة الخصوصية</Link>.</span>
        </label>
      </div>
      <aside className="h-fit space-y-3 border border-border bg-card p-6 text-sm">
        <h2 className="text-lg font-bold">طلبك</h2>
        {items.map((i) => { const p = getProduct(i.id)!; return (
          <div key={i.id + i.size} className="flex justify-between gap-2"><span className="line-clamp-1">{p.title} {i.size && `(${i.size})`} × {i.qty}</span><span className="whitespace-nowrap">{money(p.price * i.qty)}</span></div>
        ); })}
        <div className="flex justify-between border-t border-border pt-3"><span>المجموع الفرعي</span><span>{money(subtotal)}</span></div>
        <div className="flex justify-between"><span>الشحن</span><span>{ship ? money(ship) : "مجاني"}</span></div>
        <div className="flex justify-between border-t border-border pt-3 text-base font-bold"><span>الإجمالي</span><span>{money(subtotal + ship)}</span></div>
        <button type="submit" disabled={!agree} className="w-full bg-primary py-3 text-primary-foreground disabled:opacity-50">تأكيد الطلب والدفع</button>
      </aside>
    </form>
  );
}
