import { describe, it, expect } from "vitest";
import { getCatalog } from "../lib/data";
import { products, settings } from "../lib/fixtures";
import { catalogQuerySchema } from "../lib/validation";
const query = (input: Record<string, unknown> = {}) => catalogQuerySchema.parse(input);
describe("browser catalogue", () => {
  it("searches all products and paginates without duplicates", () => {
    const first = getCatalog(query());
    const second = getCatalog(query({ page: 2 }));
    expect(first.products).toHaveLength(12);
    expect(second.products).toHaveLength(4);
    expect(new Set([...first.products, ...second.products].map((p) => p.id)).size).toBe(16);
    expect(getCatalog(query({ q: "  kj-016 " })).products[0].code).toBe("KJ-016");
    expect(getCatalog(query({ page: 999 })).products).toEqual([]);
  });
  it("combines filters and handles empty results", () => {
    expect(
      getCatalog(
        query({
          category: "necklaces",
          metal: "gold",
          purity: "22k · sample specification",
          availability: "unavailable",
        }),
      ).products.map((p) => p.code),
    ).toEqual(["KJ-012"]);
    expect(getCatalog(query({ metal: "silver" })).total).toBe(0);
    expect(getCatalog(query({ category: "missing" })).total).toBe(0);
  });
  it("sorts numeric prices with nulls last and applies ranges", () => {
    const source = ["100", "20", null].map((price, i) => ({ ...products[i], price }));
    expect(getCatalog(query({ sort: "price-asc" }), source).products.map((p) => p.price)).toEqual([
      "20",
      "100",
      null,
    ]);
    expect(getCatalog(query({ sort: "price-desc" }), source).products.map((p) => p.price)).toEqual([
      "100",
      "20",
      null,
    ]);
    expect(getCatalog(query({ min: "0", max: "99" }), source).products.map((p) => p.price)).toEqual(
      ["20"],
    );
    expect(getCatalog(query({ sort: "name" })).products[0].name).toBe("Classic Swirl Drops");
  });
  it("rejects malformed filters", () => {
    for (const input of [
      { page: -1 },
      { page: 1.2 },
      { sort: "unknown" },
      { metal: "platinum" },
      { min: "50", max: "10" },
      { q: "x".repeat(101) },
    ])
      expect(catalogQuerySchema.safeParse(input).success).toBe(false);
  });
  it("excludes drafts and real contact data", () => {
    expect(getCatalog(query(), [{ ...products[0], status: "draft" }]).total).toBe(0);
    expect(settings.phones).toEqual([]);
    expect(settings.address).toBe("");
    expect(settings.whatsapp).toBe("");
    expect(settings.primaryPhone).toBe("");
  });
});
