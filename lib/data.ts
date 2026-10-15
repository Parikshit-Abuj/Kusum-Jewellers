import { products, categories, settings, rates } from "./fixtures";
import type { CatalogQuery } from "./validation";
import type { CatalogResult, Product } from "./types";
export const getSettings = () => settings;
export const getCategories = () => categories;
export const getRates = () => rates;
export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug && p.status === "published") ?? null;
export const getFeatured = () =>
  products.filter((p) => p.status === "published" && p.featured).slice(0, 4);
export function getCatalog(query: CatalogQuery, source: Product[] = products): CatalogResult {
  const published = source.filter((p) => p.status === "published");
  const search = query.q.toLowerCase();
  const filtered = published
    .filter(
      (p) =>
        (!search ||
          p.name.toLowerCase().includes(search) ||
          p.code.toLowerCase().includes(search)) &&
        (!query.category || p.category.slug === query.category) &&
        (!query.purity || p.purity.toLowerCase() === query.purity.toLowerCase()) &&
        (!query.metal || p.metal === query.metal) &&
        (!query.availability || p.available === (query.availability === "available")) &&
        (!query.min || (p.price !== null && Number(p.price) >= Number(query.min))) &&
        (!query.max || (p.price !== null && Number(p.price) <= Number(query.max))),
    )
    .sort((a, b) => {
      let order: number;
      if (query.sort === "name") order = a.name.localeCompare(b.name, "en");
      else if (query.sort.startsWith("price-")) {
        if (a.price === null || b.price === null)
          return a.price === b.price ? a.id.localeCompare(b.id) : a.price === null ? 1 : -1;
        order = (Number(a.price) - Number(b.price)) * (query.sort === "price-asc" ? 1 : -1);
      } else order = b.createdAt.localeCompare(a.createdAt);
      return order || a.id.localeCompare(b.id);
    });
  const pageSize = 12;
  return {
    products: filtered.slice((query.page - 1) * pageSize, query.page * pageSize),
    total: filtered.length,
    page: query.page,
    pageSize,
    totalPages: Math.ceil(filtered.length / pageSize),
    hasPrices: published.some((p) => p.price !== null),
  };
}
