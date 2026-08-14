import Link from "next/link";
import type { Recipe } from "@/lib/types";
import Badge from "@/components/Badge";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-brand-border bg-brand-card p-5 transition duration-300 hover:-translate-y-1 hover:border-brand-sea/40 hover:shadow-xl hover:shadow-brand-sea/10"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-sea transition-transform duration-300 group-hover:scale-x-100"
      />
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-sea-dark">
          {recipe.region}
        </span>
        <span className="text-xs capitalize text-brand-sea-dark/60">{recipe.mealType}</span>
      </div>
      <h3 className="font-display text-lg font-semibold text-brand-sea-dark group-hover:text-brand-sea">
        {recipe.name}
      </h3>
      <p className="text-sm text-brand-sea-dark/70">{recipe.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {recipe.dietTags.map((tag) => (
          <Badge key={tag} label={tag} />
        ))}
      </div>
      <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-brand-sea-dark/60">
        <span>{recipe.servings} servings</span>
        <span>•</span>
        <span>{recipe.prepTime + recipe.cookTime} min</span>
      </div>
    </Link>
  );
}
