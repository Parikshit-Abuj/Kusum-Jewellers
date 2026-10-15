import type { Category, Product, Rates, ShopSettings } from "./types";
import { slugify } from "./format";
export const categories: Category[] = [
  ["Earrings", "1"],
  ["Mangalsutras", "2"],
  ["Necklaces", "4"],
  ["Jewellery sets", "3"],
].map(([name, image], position) => ({
  id: slugify(name),
  name,
  slug: slugify(name),
  image: "/img/product/" + image + ".jpg",
  position,
}));
const rows: [string, string, number, string[]][] = [
  ["Floral Drop Earrings", "Earrings", 1, ["1", "13"]],
  ["The Swirl Earrings", "Earrings", 6, ["6", "10"]],
  ["Leaf Drop Earrings", "Earrings", 12, ["12"]],
  ["Petal Drop Earrings", "Earrings", 1, ["1"]],
  ["Classic Swirl Drops", "Earrings", 6, ["6"]],
  ["Little Leaf Drops", "Earrings", 12, ["12"]],
  ["The Knot Mangalsutra", "Mangalsutras", 2, ["2"]],
  ["Peacock Pendant Mangalsutra", "Mangalsutras", 5, ["5", "7"]],
  ["Everyday Knot Mangalsutra", "Mangalsutras", 2, ["2"]],
  ["The Mayura Mangalsutra", "Mangalsutras", 5, ["5"]],
  ["Layered Bead Necklace", "Necklaces", 4, ["4"]],
  ["The Double Strand Necklace", "Necklaces", 4, ["4"]],
  ["The Heritage Coin Set", "Jewellery sets", 3, ["3", "8"]],
  ["The Temple Coin Set", "Jewellery sets", 14, ["14", "3"]],
  ["The Festive Coin Set", "Jewellery sets", 3, ["3"]],
  ["Heritage Necklace & Earrings", "Jewellery sets", 14, ["14"]],
];
export const products: Product[] = rows.map(([name, categoryName, , images], i) => {
  const category = categories.find((c) => c.name === categoryName)!;
  const code = "KJ-" + String(i + 1).padStart(3, "0");
  const date = new Date(Date.UTC(2026, 9, 15 - i)).toISOString();
  return {
    id: code,
    code,
    name,
    slug: slugify(name),
    categoryId: category.id,
    category,
    description:
      "An illustrative " +
      categoryName.toLowerCase().replace(/s$/, "") +
      " design from our demonstration collection. Explore the photographs and details, then preview an enquiry about this piece. Photographs and specifications are examples, not a live inventory or certification.",
    metal: "gold",
    purity: "22K · sample specification",
    weight: (4 + i * 1.35).toFixed(3),
    price: null,
    available: i !== 11,
    status: "published",
    featured: [0, 6, 10, 12].includes(i),
    images: images.map((n) => "/img/product/" + n + ".jpg"),
    createdAt: date,
    updatedAt: date,
  };
});
export const settings: ShopSettings = {
  name: "Kusum Jewellers",
  tagline: "Pieces to keep. Moments to remember.",
  introduction:
    "Some pieces become part of your everyday. Others hold a moment you never want to forget. Discover jewellery through a simple, considered catalogue.\n\nThis frontend portfolio project uses illustrative products, specifications and sample rates.",
  heroTitle: "A little everyday. A little forever.",
  heroText: "Explore jewellery for the moments that become part of your story.",
  heroImage: "/img/campaign/kusum-festive.webp",
  logo: "/img/brand/kusum-kj-original.svg",
  address: "",
  phones: [],
  primaryPhone: "",
  whatsapp: "",
  hours: "",
};
export const rates: Rates = {
  id: "sample",
  gold22K: "14000",
  gold24K: "15000",
  silverPure: "200",
  publishedAt: "2026-10-15T00:00:00.000Z",
};
