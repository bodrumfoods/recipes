import Link from "next/link";
import type { Recipe } from "@/lib/types";
import Badge from "@/components/Badge";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      href={`/tarifler/${recipe.id}`}
      className="group flex flex-col gap-3 rounded-2xl border border-brand-border bg-brand-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-terracotta">
          {recipe.region}
        </span>
        <span className="text-xs text-brand-sea-dark/60">{recipe.mealType}</span>
      </div>
      <h3 className="text-lg font-semibold text-brand-sea-dark group-hover:text-brand-terracotta">
        {recipe.name}
      </h3>
      <p className="text-sm text-brand-sea-dark/70">{recipe.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {recipe.dietTags.map((tag) => (
          <Badge key={tag} label={tag} />
        ))}
      </div>
      <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-brand-sea-dark/60">
        <span>{recipe.servings} kişilik</span>
        <span>•</span>
        <span>{recipe.prepTime + recipe.cookTime} dk</span>
      </div>
    </Link>
  );
}
