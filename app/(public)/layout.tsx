import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getSettings, getCategories } from "@/lib/data";
import { isDemo } from "@/lib/config";
export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const [settings, categories] = await Promise.all([getSettings(), getCategories()]);
  const demo = isDemo();
  return (
    <>
      <Header settings={settings} demo={demo} categories={categories} />
      {children}
      <Footer settings={settings} demo={demo} />
    </>
  );
}
