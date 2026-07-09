import type { Product } from "../types";

export const products: Product[] = [
  {
    id: 1,
    nameAr: "شاي أسود سيلاني ٥٠٠ج",
    nameEn: "Ceylon Black Tea 500g",
    descAr: "أجود أوراق الشاي الأسود من سريلانكا، غني بالنكهة وعميق الأثر",
    descEn:
      "The finest Ceylon black tea leaves — rich, bold, and deeply satisfying",
    weight: "500g",
    image: null,
    tag: "FBOP1",
  },
  {
    id: 2,
    nameAr: "مجموعة الهدايا الفاخرة",
    nameEn: "Luxury Gift Collection",
    descAr: "ثلاث عبوات من أجود الشاي في علبة هدايا أنيقة تليق بالمناسبات الخاصة",
    descEn:
      "Three premium packs in one elegant gift box — a perfect luxury offering for special occasions",
    weight: "1500g",
    image: null,
    tag: "GIFT",
  },
  {
    id: 3,
    nameAr: "خلطة الحرير الممتازة",
    nameEn: "Silk Premium Blend",
    descAr: "خلطة استثنائية من أرقى أوراق الشاي السيلاني، نكهة فريدة في كل كوب",
    descEn:
      "An exceptional blend of the finest Ceylon leaves — a unique expression in every cup",
    weight: "250g",
    image:
      "https://images.unsplash.com/photo-1573784540576-21ddeff9479b?w=600&h=500&fit=crop&auto=format",
  },
];
