"use client";
import { useState } from "react";
import Link from "next/link";
import { SlidersHorizontal, ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";
import type { CatalogResult, Category, Product } from "@/lib/types";
import type { CatalogQuery } from "@/lib/validation";
import { CatalogFilters } from "./catalog-filters";
import { ProductCard } from "./product-card";
import { Modal } from "./modal";
import { ProductRail } from "./product-rail";
export function CatalogView({
  result,
  categories,
  purities,
  query,
  invalid,
  featured,
}: {
  result: CatalogResult;
  categories: Category[];
  purities: string[];
  query: CatalogQuery;
  invalid: boolean;
  featured: Product[];
}) {
  const [open, setOpen] = useState(false);
  const href = (page: number) =>
    "/catalog?" +
    new URLSearchParams({ ...query, page: String(page) } as unknown as Record<string, string>);
  return (
    <main id="main" className="store-catalog">
      <h1 className="sr-only">The jewellery collection</h1>
      <nav className="collection-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <ChevronRight size={13} />
        <span>{categories.find((c) => c.slug === query.category)?.name ?? "All Jewellery"}</span>
      </nav>
      {invalid && (
        <p className="form-error" role="alert">
          These filters were not valid. Showing the complete collection.{" "}
          <Link href="/catalog">Clear filters</Link>
        </p>
      )}
      <div className="collection-layout">
        <aside className="collection-sidebar">
          <CatalogFilters
            categories={categories}
            purities={purities}
            query={query}
            hasPrices={result.hasPrices}
          />
        </aside>
        <div className="collection-products">
          <div className="collection-toolbar">
            <button className="mobile-filter-button" onClick={() => setOpen(true)}>
              <SlidersHorizontal size={20} />
              Filter and sort
            </button>
            <span>
              {result.total} {result.total === 1 ? "product" : "products"}
            </span>
            <form className="collection-sort" action="/catalog">
              {Object.entries(query)
                .filter(([k]) => k !== "sort" && k !== "page")
                .map(([k, v]) => (
                  <input type="hidden" key={k} name={k} value={v} />
                ))}
              <select
                name="sort"
                aria-label="Sort products"
                defaultValue={query.sort}
                onChange={(e) => e.currentTarget.form?.requestSubmit()}
              >
                <option value="newest">Newest first</option>
                <option value="name">Alphabetically, A–Z</option>
                {result.hasPrices && (
                  <>
                    <option value="price-asc">Price, low to high</option>
                    <option value="price-desc">Price, high to low</option>
                  </>
                )}
              </select>
            </form>
          </div>
          {result.products.length ? (
            <div className="product-grid collection-grid">
              {result.products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>No pieces found</h2>
              <p>Try a different search or explore all jewellery.</p>
              <Link className="button button-primary" href="/catalog">
                Clear filters
              </Link>
            </div>
          )}
          {result.totalPages > 1 && (
            <nav className="pagination" aria-label="Catalogue pages">
              {query.page > 1 ? (
                <Link className="button button-secondary" href={href(query.page - 1)}>
                  <ArrowLeft size={15} />
                  Previous
                </Link>
              ) : (
                <span />
              )}
              <span>
                Page {query.page} of {result.totalPages}
              </span>
              {query.page < result.totalPages ? (
                <Link className="button button-secondary" href={href(query.page + 1)}>
                  Next
                  <ArrowRight size={15} />
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}
          <p className="collection-showing">
            Showing {result.products.length ? (query.page - 1) * result.pageSize + 1 : 0}–
            {result.products.length ? Math.min(query.page * result.pageSize, result.total) : 0} of{" "}
            {result.total} pieces
          </p>
        </div>
      </div>
      <ProductRail products={featured} />
      {open && (
        <Modal title="Filter and sort" className="filter-drawer" onClose={() => setOpen(false)}>
          <CatalogFilters
            mobile
            categories={categories}
            purities={purities}
            query={query}
            hasPrices={result.hasPrices}
          />
        </Modal>
      )}
    </main>
  );
}
