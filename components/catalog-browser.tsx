"use client";
import { useSearchParams } from "next/navigation";
import { getCatalog, getCategories, getFeatured } from "@/lib/data";
import { products } from "@/lib/fixtures";
import { catalogQuerySchema } from "@/lib/validation";
import { CatalogView } from "./catalog-view";
export function CatalogBrowser() {
  const params = useSearchParams();
  const input = Object.fromEntries(
    [...new Set(params.keys())].map((key) => [key, params.get(key)]),
  );
  const parsed = catalogQuerySchema.safeParse(input);
  const query = parsed.success ? parsed.data : catalogQuerySchema.parse({});
  const purities = [
    ...new Set(products.filter((p) => p.status === "published" && p.purity).map((p) => p.purity)),
  ].sort();
  return (
    <CatalogView
      key={JSON.stringify(query)}
      result={getCatalog(query)}
      categories={getCategories()}
      featured={getFeatured()}
      purities={purities}
      query={query}
      invalid={!parsed.success}
    />
  );
}
