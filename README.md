# Kusum Jewellers Catalogue

A frontend portfolio project by Parikshit Abuj, built with Next.js, React and TypeScript. A responsive jewellery catalogue with a white background, copper and gold accents, product photography and interactive browsing.

## Run locally

Use Node.js 24.22 or newer in the 24.x release line.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. No database, authentication, cloud account or environment variables are required.

## Static build and preview

```sh
npm run build
npm run preview
```

The build exports HTML, CSS, JavaScript and images to `out/`. Preview serves those files directly without a Next.js server or a catch-all SPA fallback. `vercel.json` prepares static output and security headers for a future deployment. Local changes do not update the hosted website.

## Features

- Browser search by product name or code, combined filters, sorting and 12-piece pagination.
- Shareable query URLs that preserve selections on reload and browser back/forward.
- Static product pages with image selection, zoom and related pieces.
- Local enquiry previews, illustrative metal rates and a personal About page.
- Responsive desktop navigation and mobile Home, Category, Metal Rates and About tabs.

Edit typed sample content in `lib/fixtures.ts`, then rebuild. Products, specifications and rates are illustrative. Real shop contact information is excluded. No payments, accounts, dashboard, API or data writes are included.

## Checks

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
# In another terminal:
npm run test:e2e
```

Browser tests target the static preview on port 3000. Use `PLAYWRIGHT_BASE_URL` for another port.

[Meet the developer](https://parikshit-abuj-portfolio.vercel.app/) · [GitHub](https://github.com/Parikshit-Abuj)
