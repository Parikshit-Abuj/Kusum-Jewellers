import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export const metadata: Metadata = {
  title: "About Parikshit Abuj",
  description:
    "Explore Parikshit Abuj’s frontend jewellery catalogue project, built with Next.js, React and TypeScript.",
};
export default function VisitPage() {
  return (
    <main id="main" className="container visit-page about-page">
      <div className="page-heading">
        <p className="eyebrow">ABOUT ME & THIS PROJECT</p>
        <h1>Hi, I’m Parikshit Abuj.</h1>
        <p>
          This is my frontend portfolio project—a jewellery catalogue designed to make browsing feel
          simple and considered.
        </p>
      </div>
      <div className="visit-grid">
        <div className="visit-story">
          <h2>The thinking behind my work</h2>
          <p>
            I built this project to showcase interface design, responsive development and browser
            interactions. Jewellery provides the setting; the focus is the customer experience and
            the decisions behind it.
          </p>
          <p>
            The catalogue runs entirely from static files and local sample data. Search and filters
            work in the browser, with shareable URLs that keep your browsing choices.
          </p>
          <a
            className="text-link"
            href="https://github.com/Parikshit-Abuj"
            target="_blank"
            rel="noopener noreferrer"
          >
            Find me on GitHub <ArrowUpRight size={16} />
          </a>
          <h3 className="about-section-title">What this project demonstrates</h3>
          <ul className="about-highlights">
            <li>
              <strong>Responsive interfaces</strong>
              <span>A clear browsing experience across phones, tablets and desktops.</span>
            </li>
            <li>
              <strong>Frontend application logic</strong>
              <span>
                Search, combined filters, sorting, pagination and shareable catalogue links.
              </span>
            </li>
            <li>
              <strong>Product exploration</strong>
              <span>Image galleries, zoom, related pieces and a local enquiry preview.</span>
            </li>
          </ul>
          <p className="about-stack">
            Built with Next.js, React, TypeScript and CSS. Exported as a static website.
          </p>
          <Link href="/catalog" className="button button-primary">
            Explore my project <ArrowUpRight size={18} />
          </Link>
        </div>
        <aside className="visit-card">
          <p className="eyebrow">TRY THE EXPERIENCE</p>
          <h2>See the work in action.</h2>
          <p>
            Explore the collection, filter by category, open a product gallery and view the
            illustrative metal rates.
          </p>
          <p className="small muted">
            Products, specifications and rates are sample content. Enquiry previews stay in your
            browser.
          </p>
          <a
            href="https://parikshit-abuj-portfolio.vercel.app/"
            className="button button-secondary"
          >
            Meet the developer <ArrowUpRight size={17} />
          </a>
        </aside>
      </div>
    </main>
  );
}
