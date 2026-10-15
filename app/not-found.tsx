import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="container empty-state standalone-error">
      <p className="eyebrow">404 · NOT FOUND</p>
      <h1>This piece of the story is missing.</h1>
      <p>The page may have moved, or the item is no longer published.</p>
      <Link href="/catalog" className="button button-primary">
        Explore the collection
      </Link>
    </main>
  );
}
