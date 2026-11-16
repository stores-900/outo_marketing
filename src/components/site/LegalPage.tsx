import type { ReactNode } from "react";
import { STORE, fullAddress } from "@/lib/store-info";

export function LegalPage({ title, updated = "16/11/2026", children }: { title: string; updated?: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">آخر تحديث: {updated}</p>
      <div className="legal mt-8">{children}</div>
      <div className="mt-12 border border-border bg-card p-6 text-sm leading-8">
        <p className="font-bold">بيانات المنشأة</p>
        <p>{STORE.nameAr} ({STORE.nameEn}) — الرقم الوطني الموحد: {STORE.unifiedNumber}</p>
        <p>العنوان الوطني: {fullAddress()}</p>
        <p>البريد الإلكتروني: {STORE.email} — الجوال: <span dir="ltr">{STORE.phone}</span></p>
      </div>
    </div>
  );
}
