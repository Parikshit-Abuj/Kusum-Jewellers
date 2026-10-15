import type { Metadata } from "next";
import { getRates } from "@/lib/data";
import { isDemo } from "@/lib/config";
import { RatesPanel } from "@/components/rates-panel";
export const metadata: Metadata = { title: "Sample metal rates" };
export default async function MetalRatesPage() {
  return (
    <main id="main" className="metal-rates-page">
      <RatesPanel initial={await getRates()} demo={isDemo()} presentation="card" />
    </main>
  );
}
