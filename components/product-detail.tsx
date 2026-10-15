"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Maximize2 } from "lucide-react";
import type { Product, ShopSettings } from "@/lib/types";
import { money } from "@/lib/format";
import { Modal } from "./modal";
import { Inquiry } from "./inquiry";
export function ProductDetail({
  product,
  settings,
  demo,
  back = "/catalog",
  onBack,
}: {
  product: Product;
  settings: ShopSettings;
  demo: boolean;
  back?: string;
  onBack?: () => void;
}) {
  const [selected, setSelected] = useState(0);
  const [zoom, setZoom] = useState(false);
  const image = product.images[selected] ?? product.images[0];
  return (
    <>
      <Link
        href={back}
        onClick={
          onBack
            ? (event) => {
                event.preventDefault();
                onBack();
              }
            : undefined
        }
        className="breadcrumb"
      >
        <ArrowLeft size={15} /> Back to the collection
      </Link>
      <div className="product-detail">
        <div className="gallery">
          <button
            type="button"
            className="gallery-main"
            onClick={() => image && setZoom(true)}
            aria-label="Enlarge product photograph"
          >
            {image ? (
              <Image
                src={image}
                alt={product.name}
                fill
                sizes="(max-width:800px) 95vw, 50vw"
                className="contain-image"
                loading="eager"
              />
            ) : (
              <span>No photograph yet</span>
            )}
            <span className="zoom-icon">
              <Maximize2 size={18} />
            </span>
          </button>
          {product.images.length > 1 && (
            <div className="gallery-thumbs">
              {product.images.map((src, i) => (
                <button
                  type="button"
                  key={src + "-" + i}
                  aria-label={"Show photograph " + (i + 1)}
                  aria-pressed={selected === i}
                  onClick={() => setSelected(i)}
                  className={selected === i ? "selected" : ""}
                >
                  <Image src={src} alt="" width={90} height={110} className="contain-image" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="product-info">
          <p className="eyebrow">
            {product.category.name} <span className="dot-separator">/</span> {product.code}
          </p>
          <h1>{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <div className="piece-price">
            {product.price ? money(product.price) : "A price, just for your piece."}
            <span>
              {product.price
                ? "Final quote confirmed by the shop."
                : "Enquire with the shop for the current price."}
            </span>
          </div>
          <dl className="specifications">
            <div>
              <dt>Metal</dt>
              <dd className="capitalize">{product.metal}</dd>
            </div>
            {product.purity && (
              <div>
                <dt>Purity</dt>
                <dd>{product.purity}</dd>
              </div>
            )}
            {product.weight && (
              <div>
                <dt>Weight</dt>
                <dd>
                  {Number(product.weight).toLocaleString("en-IN", { maximumFractionDigits: 3 })} g
                </dd>
              </div>
            )}
            <div>
              <dt>Availability</dt>
              <dd>{product.available ? "Available for enquiry" : "Currently unavailable"}</dd>
            </div>
          </dl>
          <Inquiry product={product} settings={settings} demo={demo} />
          <p className="small muted detail-note">
            {demo
              ? "Sample product and specifications. This portfolio demo accepts no real enquiries."
              : "Mention the item code when enquiring so we can find your piece."}
          </p>
          <Link href="/rates" className="text-link detail-rates-link">
            View sample metal rates <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
      {zoom && (
        <Modal title={product.name} wide onClose={() => setZoom(false)}>
          <div className="zoom-image">
            <Image src={image} alt={product.name} fill sizes="90vw" className="contain-image" />
          </div>
        </Modal>
      )}
    </>
  );
}
