export type ProductStatus = "draft" | "published" | "archived";
export type Metal = "gold" | "silver" | "other";
export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  position: number;
}
export interface Product {
  id: string;
  code: string;
  slug: string;
  name: string;
  description: string;
  categoryId: string;
  category: Category;
  metal: Metal;
  purity: string;
  weight: string | null;
  price: string | null;
  available: boolean;
  status: ProductStatus;
  featured: boolean;
  images: string[];
  createdAt: string;
  updatedAt: string;
}
export interface ShopSettings {
  name: string;
  tagline: string;
  introduction: string;
  heroTitle: string;
  heroText: string;
  heroImage: string;
  logo: string | null;
  address: string;
  phones: string[];
  primaryPhone: string;
  whatsapp: string;
  hours: string;
}
export interface Rates {
  id: string;
  gold22K: string;
  gold24K: string;
  silverPure: string;
  publishedAt: string;
}
export interface CatalogResult {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPrices: boolean;
}
