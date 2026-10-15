"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductCard } from "./product-card";
export function ProductRail({ products }: { products: Product[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState({ previous: false, next: false });
  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const update = () =>
      setCanScroll({
        previous: element.scrollLeft > 1,
        next: element.scrollWidth - element.clientWidth - element.scrollLeft > 1,
      });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      element.removeEventListener("scroll", update);
    };
  }, [products.length]);
  const move = (direction: number) => {
    const element = rail.current;
    if (element)
      element.scrollBy({
        left: element.clientWidth * direction,
        behavior: matchMedia("(prefers-reduced-motion:reduce)").matches ? "instant" : "smooth",
      });
  };
  if (!products.length) return null;
  return (
    <section className="store-featured container">
      <div className="store-section-heading">
        <h2>Curated for you</h2>
        <div className="rail-tools">
          <Link href="/catalog">Explore all</Link>
          <button
            className="icon-button"
            aria-label="Previous curated pieces"
            disabled={!canScroll.previous}
            onClick={() => move(-1)}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="icon-button"
            aria-label="Next curated pieces"
            disabled={!canScroll.next}
            onClick={() => move(1)}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="curated-rail" ref={rail} tabIndex={0} aria-label="Curated jewellery">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
