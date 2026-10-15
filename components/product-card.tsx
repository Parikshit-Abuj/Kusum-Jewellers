"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { money } from "@/lib/format";
export function ProductCard({
  product,
  base = "/products",
  onSelect,
}: {
  product: Product;
  base?: string;
  onSelect?: (product: Product) => void;
}) {
  const select = onSelect
    ? (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onSelect(product);
      }
    : undefined;
  return (
    <article className="product-card">
      <Link
        href={base + "/" + product.slug}
        onClick={select}
        className="product-image-link"
        aria-label={"View " + product.name}
      >
        <div className="product-image">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width:600px) 46vw, (max-width:1000px) 30vw, 24vw"
              className="contain-image"
            />
          ) : (
            <span>No photograph yet</span>
          )}
          <span className="card-view">
            <ArrowUpRight size={18} />
          </span>
          {!product.available && <span className="availability-badge">Currently unavailable</span>}
        </div>
      </Link>
      <div className="product-caption">
        <span className="product-category">
          {product.category.name} <span>· {product.code}</span>
        </span>
        <h3>
          <Link href={base + "/" + product.slug} onClick={select}>
            {product.name}
          </Link>
        </h3>
        <div className="product-meta">
          <span>{product.purity || product.metal}</span>
          <span>{product.price ? money(product.price) : "Enquire for price"}</span>
        </div>
      </div>
      <Link
        href={base + "/" + product.slug}
        onClick={select}
        className="product-card-action"
        aria-label={"View product: " + product.name}
      >
        View product
      </Link>
    </article>
  );
}
