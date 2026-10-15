"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="container empty-state standalone-error">
      <p className="eyebrow">A SMALL INTERRUPTION</p>
      <h1>The catalogue is taking a moment.</h1>
      <p>Please try again or reload the page to continue exploring the sample collection.</p>
      <button onClick={reset} className="button button-primary">
        Try again
      </button>
    </main>
  );
}
