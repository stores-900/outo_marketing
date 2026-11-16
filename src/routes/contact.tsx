import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { STORE, fullAddress } from "@/lib/store-info";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "اتصل بنا | أوتو ماركتينج" }, { name: "description", content: "تواصلي مع خدمة عملاء مؤسسة أوتو ماركتينج عبر الجوال 0565134196 أو البريد الإلكتروني." }, { property: "og:title", content: "اتصل بنا | أوتو ماركتينج" }, { property: "og:description", content: "تواصلي مع خدمة عملاء مؤسسة أوتو ماركتينج عبر الجوال 0565134196 أو البريد الإلكتروني." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const f = "w-full border border-input bg-card px-3 py-2.5 text-sm";
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold md:text-4xl">اتصل بنا</h1>
      <p className="mt-3 text-muted-foreground">يسعدنا تواصلك معنا لأي استفسار عن المنتجات أو الطلبات أو الاسترجاع.</p>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <a href={`tel:${STORE.phone}`} className="flex items-center gap-4 border border-border bg-card p-5"><Phone className="h-6 w-6 text-gold" /><div><p className="text-sm text-muted-foreground">الجوال / خدمة العملاء</p><p className="text-lg font-bold" dir="ltr">{STORE.phone}</p></div></a>
          <a href={`mailto:${STORE.email}`} className="flex items-center gap-4 border border-border bg-card p-5"><Mail className="h-6 w-6 text-gold" /><div><p className="text-sm text-muted-foreground">البريد الإلكتروني</p><p className="break-all text-lg font-bold">{STORE.email}</p></div></a>
          <div className="flex items-center gap-4 border border-border bg-card p-5"><MapPin className="h-6 w-6 shrink-0 text-gold" /><div><p className="text-sm text-muted-foreground">العنوان الوطني</p><p className="font-semibold leading-7">{fullAddress()}</p><p className="text-sm">العنوان المختصر: {STORE.address.shortAddress}</p></div></div>
          <div className="flex items-center gap-4 border border-border bg-card p-5"><Clock className="h-6 w-6 text-gold" /><div><p className="text-sm text-muted-foreground">أوقات خدمة العملاء</p><p className="font-semibold">السبت – الخميس، ٩ صباحاً – ٩ مساءً</p></div></div>
          <p className="text-sm text-muted-foreground">{STORE.nameAr} — الرقم الوطني الموحد: {STORE.unifiedNumber}</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); const d = new FormData(e.currentTarget); window.location.href = `mailto:${STORE.email}?subject=${encodeURIComponent(String(d.get("subject")))}&body=${encodeURIComponent(`${d.get("name")} - ${d.get("phone")}\n\n${d.get("message")}`)}`; setSent(true); }} className="space-y-4 border border-border bg-card p-6">
          <h2 className="font-bold">أرسلي رسالة</h2>
          <input required name="name" placeholder="الاسم" className={f} />
          <input required name="phone" placeholder="رقم الجوال" className={f} />
          <input required name="subject" placeholder="الموضوع" className={f} />
          <textarea required name="message" rows={5} placeholder="رسالتك" className={f} />
          <button className="w-full bg-primary py-3 text-sm text-primary-foreground">إرسال</button>
          {sent && <p className="text-sm text-gold">تم فتح تطبيق البريد لإرسال رسالتك.</p>}
        </form>
      </div>
    </div>
  );
}
