import Link from "next/link";
import type { ShopSettings } from "@/lib/types";
import { phoneHref } from "@/lib/format";
export function Footer({ settings, demo }: { settings: ShopSettings; demo: boolean }) {
  return (
    <footer className="site-footer">
      <div className="store-footer-brand container">
        <Link href="/" className="footer-name">
          {settings.logo && <img src={settings.logo} alt="" className="footer-logo" />}
          {settings.name}
        </Link>
        <p>{settings.tagline}</p>
      </div>
      <div className="store-footer-groups container">
        <details open>
          <summary>{demo ? "About this project" : "Know us"}</summary>
          <div>
            <Link href={demo ? "https://parikshit-abuj-portfolio.vercel.app/" : "/visit"}>
              {demo ? "Meet the developer" : "Our shop"}
            </Link>
            <Link href="/catalog">Our jewellery</Link>
          </div>
        </details>
        <details open>
          <summary>Explore</summary>
          <div>
            <Link href="/catalog?metal=gold">Gold jewellery</Link>
            <Link href="/catalog?metal=silver">Silver jewellery</Link>
            <Link href="/catalog">All collections</Link>
          </div>
        </details>
        <details open>
          <summary>Metal rates</summary>
          <div>
            <Link href="/rates">24K gold</Link>
            <Link href="/rates">22K gold</Link>
            <Link href="/rates">Pure silver</Link>
          </div>
        </details>
        <details open>
          <summary>{demo ? "About the demo" : "Get in touch"}</summary>
          <div>
            {demo ? (
              <>
                <Link href="/visit">About this demo</Link>
                <p className="footer-note">A frontend portfolio project by Parikshit Abuj.</p>
              </>
            ) : (
              <>
                {settings.phones.map((phone) => (
                  <a href={"tel:" + phoneHref(phone)} key={phone}>
                    {phone}
                  </a>
                ))}
                {settings.address && <p className="footer-note">{settings.address}</p>}
              </>
            )}
          </div>
        </details>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {demo ? "Parikshit Abuj · Portfolio demo" : settings.name}
        </span>
        <span>
          {demo
            ? "Sample catalogue · No purchases or real enquiries"
            : "Browse online. Enquire with the shop."}
        </span>
      </div>
    </footer>
  );
}
