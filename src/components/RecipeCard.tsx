import Link from "next/link";
import type { Recipe } from "@/lib/types";
import Badge from "@/components/Badge";
import RecipeVisual from "@/components/RecipeVisual";

export default function RecipeCard({
  recipe,
  size = "default",
}: {
  recipe: Recipe;
  size?: "default" | "large";
}) {
  const large = size === "large";

  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="group flex h-full flex-col bg-brand-card transition duration-300 hover:shadow-lg"
    >
      <RecipeVisual
        region={recipe.region}
        mealType={recipe.mealType}
        className={`w-full overflow-hidden transition duration-500 group-hover:scale-105 ${
          large ? "aspect-[16/10]" : "aspect-[4/3]"
        }`}
      />
      <div className={`flex flex-1 flex-col gap-2 bg-brand-muted ${large ? "p-6" : "p-4"}`}>
        <span className="text-xs uppercase tracking-wide text-brand-ink/50">
          {recipe.region} • {recipe.mealType}
        </span>
        <h3
          className={`font-display font-bold text-brand-ink underline-offset-4 group-hover:underline ${
            large ? "text-2xl" : "text-lg"
          }`}
        >
          {recipe.name}
        </h3>
        {large && <p className="text-sm text-brand-ink/70">{recipe.description}</p>}
        <div className="flex flex-wrap gap-1.5">
          {recipe.dietTags.map((tag) => (
            <Badge key={tag} label={tag} />
          ))}
        </div>
        <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-brand-ink/50">
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
