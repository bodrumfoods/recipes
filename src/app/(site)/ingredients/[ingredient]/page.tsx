import { notFound } from "next/navigation";
import { ingredients, getIngredientBySlug } from "@/lib/recipes";
import RecipeCard from "@/components/RecipeCard";

export function generateStaticParams() {
  return ingredients.map((entry) => ({ ingredient: entry.slug }));
}

export default async function IngredientDetailPage({
  params,
}: {
  params: Promise<{ ingredient: string }>;
}) {
  const { ingredient } = await params;
  const entry = getIngredientBySlug(ingredient);
  if (!entry) notFound();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold capitalize text-brand-ink">
        {entry.name} recipes
      </h1>
      <p className="mt-2 text-brand-ink/70">
        {entry.recipes.length} recipe{entry.recipes.length === 1 ? "" : "s"} in our collection use{" "}
        {entry.name}.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {entry.recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
