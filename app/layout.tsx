import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import { getSettings } from "@/lib/data";
import { isDemo, siteUrl } from "@/lib/config";
import "./globals.css";
import "./storefront.css";
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});
const sans = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  const name = s.name + (isDemo() ? " — Demo" : "");
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: name + " | Jewellery Catalogue", template: "%s | " + name },
    description: isDemo()
      ? "A portfolio demonstration of a modern frontend jewellery catalogue. Sample products and illustrative rates."
      : s.tagline,
    robots: isDemo() ? { index: false, follow: false } : { index: true, follow: true },
  };
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={serif.variable + " " + sans.variable}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
