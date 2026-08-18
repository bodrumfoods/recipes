import Link from "next/link";
import type { Recipe } from "@/lib/types";
import Badge from "@/components/Badge";
import RecipeVisual from "@/components/RecipeVisual";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-brand-border bg-brand-card transition duration-300 hover:-translate-y-1 hover:border-brand-red/30 hover:shadow-xl hover:shadow-brand-red/10"
    >
      <RecipeVisual
        region={recipe.region}
        mealType={recipe.mealType}
        className="aspect-[4/3] w-full transition duration-500 group-hover:scale-105"
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-red">
            {recipe.region}
          </span>
          <span className="text-xs capitalize text-brand-ink/60">{recipe.mealType}</span>
        </div>
        <h3 className="font-display text-lg font-semibold text-brand-ink group-hover:text-brand-red">
          {recipe.name}
        </h3>
        <p className="text-sm text-brand-ink/70">{recipe.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {recipe.dietTags.map((tag) => (
            <Badge key={tag} label={tag} />
          ))}
        </div>
        <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-brand-ink/60">
          <span>{recipe.servings} servings</span>
          <span>•</span>
          <span>{recipe.prepTime + recipe.cookTime} min</span>
          <span>•</span>
          <span>~{recipe.calories} kcal</span>
        </div>
      </div>
    </Link>
  );
}
