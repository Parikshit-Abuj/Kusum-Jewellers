import Image from "next/image";
import Link from "next/link";
import { Gem, ArrowRight } from "lucide-react";
import { getSettings, getCategories, getFeatured, getRates } from "@/lib/data";
import { isDemo } from "@/lib/config";
import { HeroCarousel } from "@/components/hero-carousel";
import { ProductRail } from "@/components/product-rail";
import { RatesPanel } from "@/components/rates-panel";
export default async function Home() {
  const [settings, categories, featured, rates] = await Promise.all([
    getSettings(),
    getCategories(),
    getFeatured(),
    getRates(),
  ]);
  const demo = isDemo();
  return (
    <main id="main" className="store-home">
      <HeroCarousel settings={settings} />
      <section
        id="collections"
        className="occasion-section"
        aria-label="Explore jewellery categories"
      >
        <div className="occasion-rail">
          {categories.map((c) => (
            <Link key={c.id} className="occasion-card" href={"/catalog?category=" + c.slug}>
              <div>
                {c.image ? (
                  <Image src={c.image} alt="" fill sizes="160px" className="contain-image" />
                ) : (
                  <Gem size={50} />
                )}
                <span>{c.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <ProductRail products={featured} />
      <RatesPanel initial={rates} demo={demo} />
      <section className="store-introduction container">
        <h2>{settings.name}</h2>
        <p>{settings.introduction.split("\n")[0]}</p>
        <Link href="/visit" className="text-link">
          {demo ? "About me & this project" : "Visit our shop"}
          <ArrowRight size={15} />
        </Link>
      </section>
      {demo && (
        <p className="store-demo-note">
          Portfolio demo · Illustrative products, campaign and rates · No purchases or real
          enquiries.
        </p>
      )}
    </main>
  );
}
