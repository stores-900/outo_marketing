import { createFileRoute } from "@tanstack/react-router";
import { STORE, fullAddress } from "@/lib/store-info";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "من نحن | أوتو ماركتينج" }, { name: "description", content: "تعرفي على مؤسسة أوتو ماركتينج، متجر سعودي مرخص متخصص في الأزياء النسائية مقره مكة المكرمة." }, { property: "og:title", content: "من نحن | أوتو ماركتينج" }, { property: "og:description", content: "تعرفي على مؤسسة أوتو ماركتينج، متجر سعودي مرخص متخصص في الأزياء النسائية مقره مكة المكرمة." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: () => (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold md:text-4xl">من نحن</h1>
      <div className="mt-8 space-y-5 leading-9 text-muted-foreground">
        <p>{STORE.nameAr} منشأة سعودية مسجلة رسمياً، تدير متجراً إلكترونياً متخصصاً في الأزياء النسائية من فساتين وقفاطين وعبايات وأطقم وقمصان، مختارة بعناية من حيث الخامة والتصميم والجودة.</p>
        <p>نؤمن بأن تجربة التسوق يجب أن تكون واضحة وآمنة: أسعار معلنة بالريال السعودي، سياسات شحن واسترداد صريحة، ودفع إلكتروني موثوق، وخدمة عملاء متاحة للرد على استفساراتك.</p>
      </div>
      <dl className="mt-10 grid gap-4 border border-border bg-card p-6 text-sm md:grid-cols-2">
        <div><dt className="text-muted-foreground">اسم المنشأة</dt><dd className="font-semibold">{STORE.nameAr}</dd></div>
        <div><dt className="text-muted-foreground">الاسم بالإنجليزية</dt><dd className="font-semibold">{STORE.nameEn}</dd></div>
        <div><dt className="text-muted-foreground">نوع الكيان</dt><dd className="font-semibold">{STORE.entityType}</dd></div>
        <div><dt className="text-muted-foreground">الرقم الوطني الموحد (السجل التجاري)</dt><dd className="font-semibold">{STORE.unifiedNumber}</dd></div>
        <div className="md:col-span-2"><dt className="text-muted-foreground">العنوان الوطني</dt><dd className="font-semibold">{fullAddress()}</dd></div>
      </dl>
    </div>
  ),
});
