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
      if (query && !recipe.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [query, region, mealType, dietTag]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 animate-fade-in-up">
        <h1 className="font-display text-3xl font-bold text-brand-sea-dark">Recipes</h1>
        <p className="mt-2 text-brand-sea-dark/70">
          Choose from {recipes.length} Mediterranean recipes and add them to your weekly plan.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes..."
          className="w-full max-w-xs rounded-full border border-brand-border bg-white px-4 py-2 text-sm outline-none transition focus:border-brand-sea focus:ring-2 focus:ring-brand-sea/20"
        />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="rounded-full border border-brand-border bg-white px-4 py-2 text-sm"
        >
          <option value="">All Cuisines</option>
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
          <option value="">All Meal Types</option>
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
          <option value="">All Diet Tags</option>
          {dietTags.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-brand-sea-dark/70">No recipes match your search.</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((recipe, index) => (
            <div
              key={recipe.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
            >
              <RecipeCard recipe={recipe} />
            </div>
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
