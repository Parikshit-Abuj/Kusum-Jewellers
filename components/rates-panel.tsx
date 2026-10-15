import { money } from "@/lib/format";
import type { Rates } from "@/lib/types";
export function RatesPanel({
  initial: rates,
  presentation = "strip",
}: {
  initial: Rates | null;
  demo: boolean;
  presentation?: "strip" | "card";
}) {
  const values = rates
    ? [
        { label: "Gold", purity: "22 KARAT", value: rates.gold22K },
        { label: "Gold", purity: "24 KARAT", value: rates.gold24K },
        { label: "Silver", purity: "PURE SILVER", value: rates.silverPure },
      ]
    : [];
  if (presentation === "card")
    return (
      <section id="rates" className="metal-rates-card" aria-label="Illustrative metal rates">
        <h1>Sample Metal Rates</h1>
        <dl>
          {values.map((row) => (
            <div key={row.purity}>
              <dt>
                {row.purity === "PURE SILVER"
                  ? "Pure Silver"
                  : row.purity.replace(" KARAT", "K") + " Gold"}
              </dt>
              <dd>{money(row.value)} <small>per gram</small></dd>
            </div>
          ))}
        </dl>
        <p>Indian rupees per gram · Illustrative values</p>
        <p className="rates-demo-disclaimer">
          Sample rates for this portfolio project. These are not live market quotes.
        </p>
      </section>
    );
  return (
    <section id="rates" className="rates-section" aria-label="Illustrative metal rates">
      <div className="container rates-inner">
        <div className="rates-title">
          <span className="eyebrow">SAMPLE METAL RATES</span>
          <p>
            Worth knowing<span className="serif-dot">.</span>
          </p>
          <span className="rates-unit">₹ per gram · Illustrative values</span>
        </div>
        <div className="rate-values">
          {values.map((item) => (
            <div className="rate-item" key={item.purity}>
              <span className="rate-purity">{item.purity}</span>
              <div>
                <span className="rate-metal">{item.label}</span>
                <strong>{money(item.value)}</strong>
              </div>
              <span className="rates-unit">per gram</span>
            </div>
          ))}
        </div>
        <div className="rates-updated">
          <div>
            <strong>Portfolio sample</strong>
            <span>Not live market quotes.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
