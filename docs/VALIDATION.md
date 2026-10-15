# Local validation

Run TypeScript, ESLint and unit tests, then build the static export and run browser tests against its file server. No database or authentication credentials are needed.

Checks cover query validation, full-collection search, combined filters, sorting, pagination, empty results, shared URLs, product galleries and local enquiry previews. Removed admin and API paths must return 404. Responsive checks cover 320, 390, 768, 1440 and 1920px widths. The demo must make no API requests.

Client changes in this stage only hide public admin navigation. The authenticated /admin route remains in the separate client checkout.

Validated locally on 15 October 2026: static production build with the environment file temporarily absent, TypeScript checks for both checkouts, ESLint with zero errors or warnings, five unit tests and eight browser tests. All 16 product deep links and the browser icon returned successfully; browser navigation produced no API requests or JavaScript errors. The original environment file was restored after the build.

The client checkout's browser verification could not be completed because its local PostgreSQL service is unavailable while Docker is stopped. Its authentication code and admin routes are unchanged; only the header and footer were edited.
