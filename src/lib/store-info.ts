export const STORE = {
  nameAr: "مؤسسة أوتو ماركتينج",
  nameEn: "AUTO MARKETING Establishment",
  brandAr: "أوتو ماركتينج",
  entityType: "مؤسسة",
  unifiedNumber: "7055359355",
  crIssueDate: "06/10/2026",
  email: "mznhalbdly074@gmail.com",
  phone: "0565134196",
  phoneIntl: "+966565134196",
  address: {
    building: "7291",
    street: "عبدالله عريف",
    secondary: "2893",
    district: "حي الرصيفة",
    city: "مكة المكرمة",
    postalCode: "24232",
    shortAddress: "MCCA7291",
    country: "المملكة العربية السعودية",
  },
  currency: "ر.س",
  shippingFee: 30,
  freeShippingOver: 500,
};

export const fullAddress = () => {
  const a = STORE.address;
  return `${a.building} شارع ${a.street}، ${a.district}، ${a.city} ${a.postalCode} - الرقم الإضافي ${a.secondary}، ${a.country}`;
};

export const money = (n: number) =>
  `${n.toLocaleString("ar-SA", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} ${STORE.currency}`;

export const shippingFor = (subtotal: number) =>
  subtotal === 0 || subtotal >= STORE.freeShippingOver ? 0 : STORE.shippingFee;
