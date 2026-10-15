"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ShopSettings } from "@/lib/types";
export function HeroCarousel({ settings }: { settings: ShopSettings }) {
  const [slide, setSlide] = useState(0);
  const titles = [settings.heroTitle, "Made for your everyday.", "A moment. A memory. A keepsake."];
  const source = settings.heroImage;
  return (
    <section
      className="campaign-hero"
      aria-label="Featured jewellery collection"
      aria-roledescription="carousel"
    >
      <div className="hero-image">
        <Image
          src={source}
          alt={settings.name + " illustrative jewellery campaign"}
          fill
          sizes="100vw"
          loading="eager"
          className="campaign-photo"
        />
      </div>
      <div className="campaign-shade" />
      <div className="campaign-panel">
        <span className="campaign-kicker">
          {["THE FESTIVE EDIT", "EVERYDAY ELEGANCE", "MOMENTS TO KEEP"][slide]}
        </span>
        <h1>{titles[slide]}</h1>
        <p>{settings.heroText}</p>
        <Link className="campaign-cta" href="/catalog">
          Explore the collection
        </Link>
      </div>
      <button
        className="campaign-prev"
        aria-label="Previous collection slide"
        onClick={() => setSlide((slide + 2) % 3)}
      >
        <ChevronLeft size={28} />
      </button>
      <button
        className="campaign-next"
        aria-label="Next collection slide"
        onClick={() => setSlide((slide + 1) % 3)}
      >
        <ChevronRight size={28} />
      </button>
      <div className="campaign-dots" role="group" aria-label="Choose collection slide">
        {titles.map((_, i) => (
          <button
            key={i}
            aria-label={"Collection slide " + (i + 1)}
            aria-pressed={slide === i}
            className={slide === i ? "active" : ""}
            onClick={() => setSlide(i)}
          />
        ))}
      </div>
    </section>
  );
}
