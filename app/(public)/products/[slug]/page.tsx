import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, getSettings, getCatalog } from "@/lib/data";
import { catalogQuerySchema } from "@/lib/validation";
import { isDemo } from "@/lib/config";
import { ProductDetail } from "@/components/product-detail";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/fixtures";
export const dynamicParams = false;
export function generateStaticParams() {
  return products.filter((p) => p.status === "published").map((p) => ({ slug: p.slug }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProduct((await params).slug);
  return p
    ? { title: p.name, description: p.description.slice(0, 160) }
    : { title: "Piece not found" };
}
export default async function ProductPage({ params }: Props) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();
  const [settings, related] = await Promise.all([
    getSettings(),
    getCatalog(catalogQuerySchema.parse({ category: product.category.slug })),
  ]);
  return (
    <main id="main" className="container product-page">
      <ProductDetail product={product} settings={settings} demo={isDemo()} />
      {related.products.some((p) => p.id !== product.id) && (
        <section className="related-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">KEEP EXPLORING</p>
              <h2>
                A little more inspiration<span>.</span>
              </h2>
            </div>
          </div>
          <div className="product-grid">
            {related.products
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
        </section>
      )}
    </main>
  );
}
