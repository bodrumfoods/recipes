"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { recipes, regions, mealTypes, dietTags } from "@/lib/recipes";
import RecipeCard from "@/components/RecipeCard";

function RecipesContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<string>(searchParams.get("region") ?? "");
  const [mealType, setMealType] = useState<string>("");
  const [dietTag, setDietTag] = useState<string>("");

  const filtered = useMemo(() => {
    return recipes.filter((recipe) => {
      if (region && recipe.region !== region) return false;
      if (mealType && recipe.mealType !== mealType) return false;
      if (dietTag && !recipe.dietTags.includes(dietTag as never)) return false;
      if (query && !recipe.name.toLocaleLowerCase("tr").includes(query.toLocaleLowerCase("tr")))
        return false;
      return true;
    });
  }, [query, region, mealType, dietTag]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-sea-dark">Tarifler</h1>
        <p className="mt-2 text-brand-sea-dark/70">
          {recipes.length} Akdeniz tarifi arasından seçin ve haftalık planınıza ekleyin.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tarif ara..."
          className="w-full max-w-xs rounded-full border border-brand-border bg-white px-4 py-2 text-sm outline-none focus:border-brand-sea"
        />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="rounded-full border border-brand-border bg-white px-4 py-2 text-sm"
        >
          <option value="">Tüm Mutfaklar</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <select
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
          className="rounded-full border border-brand-border bg-white px-4 py-2 text-sm"
        >
          <option value="">Tüm Öğün Türleri</option>
          {mealTypes.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <select
          value={dietTag}
          onChange={(e) => setDietTag(e.target.value)}
          className="rounded-full border border-brand-border bg-white px-4 py-2 text-sm"
        >
          <option value="">Tüm Diyet Etiketleri</option>
          {dietTags.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-brand-sea-dark/70">Aramanızla eşleşen tarif bulunamadı.</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function RecipesPage() {
  return (
    <Suspense fallback={null}>
      <RecipesContent />
    </Suspense>
  );
}
