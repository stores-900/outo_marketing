import { Link } from "@tanstack/react-router";
import { STORE, fullAddress } from "@/lib/store-info";

export function PaymentBadges() {
  return (
    <div className="flex flex-wrap gap-2">
      {["مدى", "VISA", "Mastercard", "Apple Pay"].map((m) => (
        <span key={m} className="rounded border border-border bg-card px-3 py-1 text-xs font-semibold text-foreground">{m}</span>
      ))}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="space-y-3">
          <img src="/logo.png" alt={`شعار ${STORE.nameAr}`} width={96} height={96} className="h-24 w-24 object-contain" loading="lazy" />
          <p className="font-bold">{STORE.nameAr}</p>
          <p className="text-xs text-muted-foreground">{STORE.nameEn}</p>
          <p className="text-sm text-muted-foreground">متجر إلكتروني متخصص في الأزياء النسائية: فساتين، قفاطين، عبايات وأطقم.</p>
        </div>
        <div>
          <h3 className="mb-4 font-bold">روابط المتجر</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shop" search={{}}>جميع المنتجات</Link></li>
            <li><Link to="/about">من نحن</Link></li>
            <li><Link to="/contact">اتصل بنا</Link></li>
            <li><Link to="/cart">سلة التسوق</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-bold">السياسات</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shipping-policy">سياسة الشحن والتوصيل</Link></li>
            <li><Link to="/refund-policy">سياسة الاسترداد والإلغاء</Link></li>
            <li><Link to="/privacy-policy">سياسة الخصوصية</Link></li>
            <li><Link to="/terms">شروط الخدمة</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-bold">تواصل معنا</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>الجوال / خدمة العملاء: <a href={`tel:${STORE.phone}`} dir="ltr" className="text-foreground">{STORE.phone}</a></li>
            <li>البريد: <a href={`mailto:${STORE.email}`} className="break-all text-foreground">{STORE.email}</a></li>
            <li>العنوان الوطني: {fullAddress()}</li>
            <li>العنوان المختصر: <span dir="ltr">{STORE.address.shortAddress}</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-muted-foreground md:flex-row">
          <div className="space-y-1 text-center md:text-start">
            <p>{STORE.nameAr} — الرقم الوطني الموحد للسجل التجاري: <span className="font-semibold text-foreground">{STORE.unifiedNumber}</span></p>
            <p>© {new Date().getFullYear()} جميع الحقوق محفوظة لـ {STORE.nameAr}</p>
          </div>
          <PaymentBadges />
        </div>
      </div>
    </footer>
  );
}
