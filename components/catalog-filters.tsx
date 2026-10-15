"use client";
import Link from "next/link";
import { Search } from "lucide-react";
import type { Category } from "@/lib/types";
import type { CatalogQuery } from "@/lib/validation";
export function CatalogFilters({
  categories,
  purities = [],
  query,
  hasPrices,
  mobile = false,
}: {
  categories: Category[];
  purities?: string[];
  query: CatalogQuery;
  hasPrices: boolean;
  mobile?: boolean;
}) {
  const choices = (name: string, selected: string, options: { value: string; label: string }[]) =>
    options.map((o) => (
      <label className="facet-choice" key={o.value}>
        <input type="radio" name={name} value={o.value} defaultChecked={selected === o.value} />
        <span>{o.label}</span>
      </label>
    ));
  return (
    <form
      action="/catalog"
      method="get"
      className="facet-form"
      onChange={(e) => {
        if (!mobile && e.target instanceof HTMLInputElement && e.target.type === "radio")
          e.currentTarget.requestSubmit();
      }}
    >
      <div className="facet-heading">
        <strong>Filter:</strong>
        <Link href="/catalog">Reset all</Link>
      </div>
      <label className="facet-search">
        <Search size={16} />
        <input
          type="search"
          name="q"
          aria-label="Search catalogue"
          placeholder="Name or item code"
          defaultValue={query.q}
        />
      </label>
      <details open>
        <summary>Category</summary>
        {choices("category", query.category, [
          { value: "", label: "All jewellery" },
          ...categories.map((c) => ({ value: c.slug, label: c.name })),
        ])}
      </details>
      {purities.length > 0 && (
        <details open>
          <summary>Metal Purity</summary>
          {choices("purity", query.purity, [
            { value: "", label: "All purities" },
            ...purities.map((p) => ({ value: p, label: p })),
          ])}
        </details>
      )}
      <details>
        <summary>Metal</summary>
        {choices("metal", query.metal, [
          { value: "", label: "All metals" },
          { value: "gold", label: "Gold" },
          { value: "silver", label: "Silver" },
          { value: "other", label: "Other" },
        ])}
      </details>
      {hasPrices && (
        <details>
          <summary>Price</summary>
          <div className="facet-price">
            <label>
              From ₹<input type="number" name="min" min="0" step="0.01" defaultValue={query.min} />
            </label>
            <label>
              To ₹<input type="number" name="max" min="0" step="0.01" defaultValue={query.max} />
            </label>
          </div>
        </details>
      )}
      <details>
        <summary>Availability</summary>
        {choices("availability", query.availability, [
          { value: "", label: "All pieces" },
          { value: "available", label: "Available" },
          { value: "unavailable", label: "Currently unavailable" },
        ])}
      </details>
      {mobile ? (
        <details open>
          <summary>Sort by</summary>
          <select name="sort" aria-label="Sort products" defaultValue={query.sort}>
            <option value="newest">Newest first</option>
            <option value="name">Alphabetically, A–Z</option>
            {hasPrices && (
              <>
                <option value="price-asc">Price, low to high</option>
                <option value="price-desc">Price, high to low</option>
              </>
            )}
          </select>
        </details>
      ) : (
        <input type="hidden" name="sort" value={query.sort} />
      )}
      <button type="submit" className="button button-primary facet-apply">
        Apply filters
      </button>
    </form>
  );
}
