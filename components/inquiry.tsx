"use client";
import { useState } from "react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import type { Product, ShopSettings } from "@/lib/types";
import { phoneHref } from "@/lib/format";
import { Modal } from "./modal";
export function Inquiry({
  product,
  settings,
  demo,
}: {
  product: Product;
  settings: ShopSettings;
  demo: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const message = `Hello ${settings.name}, I’d like to enquire about ${product.name} (${product.code}). Please share the price and availability.`;
  const title = product.available ? "Enquire about this piece" : "Ask about availability";
  if (!demo && settings.whatsapp)
    return (
      <a
        className="button button-primary full-width"
        href={
          "https://wa.me/" +
          phoneHref(settings.whatsapp).slice(1) +
          "?text=" +
          encodeURIComponent(message)
        }
        onClick={(e) => {
          e.currentTarget.href =
            "https://wa.me/" +
            phoneHref(settings.whatsapp).slice(1) +
            "?text=" +
            encodeURIComponent(message + "\n" + window.location.href);
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {title}
        <ArrowUpRight size={18} />
      </a>
    );
  if (!demo && settings.primaryPhone)
    return (
      <a
        className="button button-primary full-width"
        href={"tel:" + phoneHref(settings.primaryPhone)}
      >
        {title}
        <ArrowUpRight size={18} />
      </a>
    );
  return (
    <>
      <button className="button button-primary full-width" onClick={() => setOpen(true)}>
        {demo ? "Preview an enquiry" : title}
        <ArrowUpRight size={18} />
      </button>
      {open && (
        <Modal
          title={demo ? "Your enquiry, previewed" : "Enquire with the shop"}
          onClose={() => {
            setOpen(false);
            setCopied(false);
          }}
        >
          <p className="muted">
            {demo
              ? "This is a demonstration. Nothing will be sent to a real shop."
              : "Contact details have not been published yet. Please check again soon."}
          </p>
          <blockquote className="message-preview">{message}</blockquote>
          <button
            className="button button-secondary"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(message);
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}{" "}
            {copied ? "Copied" : "Copy sample message"}
          </button>
        </Modal>
      )}
    </>
  );
}
