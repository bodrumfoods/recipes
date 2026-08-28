import Link from "next/link";
import { ingredients } from "@/lib/recipes";

export default function IngredientsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-brand-ink">Ingredients</h1>
      <p className="mt-2 text-brand-ink/70">
        Browse every recipe by a single ingredient — {ingredients.length} ingredients across our
        collection.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {ingredients.map((entry) => (
          <Link
            key={entry.slug}
            href={`/ingredients/${entry.slug}`}
            className="group border border-brand-border bg-white p-4 transition hover:border-brand-red"
          >
            <span className="block font-medium capitalize text-brand-ink group-hover:underline">
              {entry.name}
            </span>
            <span className="text-xs text-brand-ink/50">
              {entry.recipes.length} recipe{entry.recipes.length === 1 ? "" : "s"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
