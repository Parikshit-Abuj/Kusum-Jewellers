"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Search, Home, LayoutGrid, TrendingUp, Info, ChevronRight } from "lucide-react";
import { Modal } from "./modal";
import type { Category, ShopSettings } from "@/lib/types";
export function Header({
  settings,
  demo,
  categories = [],
}: {
  settings: ShopSettings;
  demo: boolean;
  categories?: Category[];
}) {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const isActive = (href: string) =>
    href === "/"
      ? path === "/"
      : href === "/catalog"
        ? path.startsWith("/catalog") || path.startsWith("/products/")
        : path.startsWith(href);
  const items = [
    { href: "/", label: "Home", icon: Home },
    { href: "/catalog", label: "Category", icon: LayoutGrid },
    { href: "/rates", label: "Metal Rates", icon: TrendingUp },
    { href: "/visit", label: "About", icon: Info },
  ];
  return (
    <>
      <header className={"store-header" + (path === "/" ? " store-header-home" : "")}>
        <div className="store-topbar">
          <div className="store-logo-slot">
            {settings.logo && (
              <Link href="/" className="store-logo" aria-label={settings.name + " logo"}>
                <img src={settings.logo} alt="" width={52} height={52} />
              </Link>
            )}
          </div>
          <div className="store-top-links">
            {demo && <span className="store-demo">Portfolio demo</span>}
            <Link href="/rates">Metal Rates</Link>
            <Link href="/visit">{demo ? "About this demo" : "Visit the shop"}</Link>
          </div>
        </div>
        <div className="store-masthead">
          <button
            type="button"
            className="icon-button store-menu-button"
            aria-label="Open navigation"
            onClick={() => setMenu(true)}
          >
            <Menu size={25} />
          </button>
          <Link href="/" className="store-wordmark" aria-label={settings.name + " home"}>
            <strong>{settings.name}</strong>
            <span>JEWELLERY CATALOGUE{demo ? " · DEMO" : ""}</span>
          </Link>
          <nav className="store-desktop-nav" aria-label="Main navigation">
            <Link href="/catalog">All Jewellery</Link>
            {categories.slice(0, 4).map((c) => (
              <Link key={c.id} href={"/catalog?category=" + c.slug}>
                {c.name}
              </Link>
            ))}
          </nav>
          <form action="/catalog" className="store-search" role="search">
            <input
              name="q"
              aria-label="Search jewellery"
              placeholder="Search jewellery or item code"
            />
            <button aria-label="Search" type="submit">
              <Search size={18} />
            </button>
          </form>
          <div className="store-tools">
            <button
              className="icon-button store-search-button"
              aria-label="Search the collection"
              onClick={() => setSearch(true)}
            >
              <Search size={23} />
            </button>
          </div>
        </div>
      </header>
      <nav className="mobile-bottom-nav" aria-label="Mobile bottom navigation">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={isActive(item.href) ? "active" : ""}
            aria-current={isActive(item.href) ? "page" : undefined}
          >
            <item.icon size={26} strokeWidth={1.6} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      {menu && (
        <Modal title="Explore" className="navigation-drawer" onClose={() => setMenu(false)}>
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {[
              { href: "/catalog", label: "All Jewellery" },
              ...categories.map((c) => ({ href: "/catalog?category=" + c.slug, label: c.name })),
              { href: "/rates", label: "Metal Rates" },
              { href: "/visit", label: demo ? "About this demo" : "Visit the shop" },
            ].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenu(false)}>
                {item.label}
                <ChevronRight size={18} />
              </Link>
            ))}
          </nav>
        </Modal>
      )}
      {search && (
        <Modal title="Find your piece" onClose={() => setSearch(false)}>
          <form className="search-dialog" action="/catalog">
            <label htmlFor="mobile-search">Search by product name or item code</label>
            <input
              id="mobile-search"
              type="search"
              name="q"
              placeholder="Search jewellery"
              autoFocus
            />
            <button className="button button-primary">Search collection</button>
          </form>
        </Modal>
      )}
    </>
  );
}
