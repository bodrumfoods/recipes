import Link from "next/link";
import type { Recipe } from "@/lib/types";
import Badge from "@/components/Badge";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-brand-border bg-brand-card p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-terracotta/10"
    >
      <div
        aria-hidden
        className="absolute -right-6 -top-6 text-8xl opacity-10 transition duration-300 group-hover:scale-110 group-hover:opacity-20"
      >
        {recipe.emoji}
      </div>
      <div className="relative flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-terracotta">
          {recipe.region}
        </span>
        <span className="text-xs text-brand-sea-dark/60">{recipe.mealType}</span>
      </div>
      <div className="relative flex items-center gap-3">
        <span className="text-4xl leading-none transition duration-300 group-hover:scale-110">
          {recipe.emoji}
        </span>
        <h3 className="font-display text-lg font-semibold text-brand-sea-dark group-hover:text-brand-terracotta">
          {recipe.name}
        </h3>
      </div>
      <p className="relative text-sm text-brand-sea-dark/70">{recipe.description}</p>
      <div className="relative flex flex-wrap gap-1.5">
        {recipe.dietTags.map((tag) => (
          <Badge key={tag} label={tag} />
        ))}
      </div>
      <div className="relative mt-auto flex items-center gap-3 pt-2 text-xs text-brand-sea-dark/60">
        <span>{recipe.servings} servings</span>
        <span>•</span>
        <span>{recipe.prepTime + recipe.cookTime} min</span>
      </div>
    </Link>
  );
}
