import Link from "next/link";
import { recipes, regions } from "@/lib/recipes";
import RecipeCard from "@/components/RecipeCard";

export default function Home() {
  const featured = recipes.slice(0, 6);

  return (
    <div className="flex flex-col">
      <section className="border-b border-brand-border bg-gradient-to-b from-brand-sea/10 to-brand-sand">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-terracotta">
            Akdeniz mutfağı, tek çatı altında
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-brand-sea-dark sm:text-5xl">
            Tarif seçin, haftanızı planlayın, malzemelerinizi bodrumfoods.co.uk&apos;tan sipariş edin.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-brand-sea-dark/70">
            Türk, Yunan, İtalyan, İspanyol, Levanten ve Fas mutfağından tarifler arasından
            haftalık yemek planınızı oluşturun; sistem malzeme listenizi otomatik hesaplasın.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/tarifler"
              className="rounded-full bg-brand-sea px-6 py-3 text-sm font-semibold text-white hover:bg-brand-sea-dark"
            >
              Tarifleri Keşfet
            </Link>
            <Link
              href="/planlayici"
              className="rounded-full border border-brand-sea px-6 py-3 text-sm font-semibold text-brand-sea-dark hover:bg-white"
            >
              Haftalık Plan Oluştur
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Tarif seçin",
              text: `${recipes.length}+ Akdeniz tarifi arasından favorilerinizi bulun.`,
            },
            {
              step: "2",
              title: "Planlayın",
              text: "Her güne bir veya birden fazla tarif ekleyin, kişi sayısını ayarlayın.",
            },
            {
              step: "3",
              title: "Sipariş verin",
              text: "Malzeme listesi otomatik oluşsun, tek tıkla bodrumfoods.co.uk sepetine ekleyin.",
            },
          ].map((item) => (
            <div key={item.step} className="rounded-2xl border border-brand-border bg-brand-card p-6">
              <span className="text-3xl font-bold text-brand-terracotta">{item.step}</span>
              <h3 className="mt-3 font-semibold text-brand-sea-dark">{item.title}</h3>
              <p className="mt-2 text-sm text-brand-sea-dark/70">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-brand-sea-dark">Öne Çıkan Tarifler</h2>
          <Link href="/tarifler" className="text-sm font-semibold text-brand-terracotta hover:underline">
            Tümünü Gör
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      <section className="border-t border-brand-border bg-brand-card">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-bold text-brand-sea-dark">Mutfaklara göz atın</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {regions.map((region) => (
              <Link
                key={region}
                href={`/tarifler?region=${encodeURIComponent(region)}`}
                className="rounded-full border border-brand-border bg-brand-sand px-4 py-2 text-sm font-medium text-brand-sea-dark hover:border-brand-sea"
              >
                {region}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
