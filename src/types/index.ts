export type Lang = "ar" | "en";

export interface Product {
  id: number;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  weight: string;
  image: string | null;
  tag?: string;
}

export interface RitualStep {
  num: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  detail: string;
}
