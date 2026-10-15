"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function ShopPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/catalog");
  }, [router]);
  return (
    <main id="main" className="container">
      <p>
        Opening the collection… <Link href="/catalog">Browse jewellery</Link>
      </p>
    </main>
  );
}
