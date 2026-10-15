export default function Loading() {
  return (
    <main id="main" className="container loading-state" aria-label="Loading catalogue">
      <div className="skeleton skeleton-title" />
      <div className="product-grid">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="skeleton skeleton-product" />
        ))}
      </div>
    </main>
  );
}
