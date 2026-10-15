import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogBrowser } from "@/components/catalog-browser";
export const metadata: Metadata = { title: "The collection" };
export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <main id="main" className="container">
          <p role="status">Loading the collection…</p>
        </main>
      }
    >
      <CatalogBrowser />
    </Suspense>
  );
}
