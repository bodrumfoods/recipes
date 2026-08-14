import { notFound } from "next/navigation";
import { recipes, getRecipeById } from "@/lib/recipes";
import Badge from "@/components/Badge";
import AddToPlanButton from "@/components/AddToPlanButton";

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.id }));
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = getRecipeById(slug);
  if (!recipe) notFound();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <div className="animate-fade-in-up">
        <div className="relative overflow-hidden rounded-3xl border border-brand-border bg-gradient-to-br from-brand-sea/10 via-brand-card to-brand-terracotta/20 px-6 py-10 text-center sm:px-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-sea-dark">
            <span>{recipe.region}</span>
            <span>•</span>
            <span>{recipe.mealType}</span>
          </div>
          <h1 className="font-display mt-2 text-3xl font-bold text-brand-sea-dark sm:text-4xl">
            {recipe.name}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-brand-sea-dark/70">{recipe.description}</p>

          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {recipe.dietTags.map((tag) => (
              <Badge key={tag} label={tag} />
            ))}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-brand-sea-dark/70">
            <span>{recipe.servings} servings</span>
            <span>{recipe.prepTime} min prep</span>
            <span>{recipe.cookTime} min cook</span>
          </div>

          <div className="mt-6 flex justify-center">
            <AddToPlanButton recipeId={recipe.id} />
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-[1fr_1.4fr]">
        <section className="animate-fade-in-up" style={{ animationDelay: "80ms" }}>
          <h2 className="font-display mb-3 text-lg font-semibold text-brand-sea-dark">
            Ingredients
          </h2>
          <ul className="space-y-2 text-sm text-brand-sea-dark/80">
            {recipe.ingredients.map((ingredient) => (
              <li
                key={ingredient.name}
                className="flex justify-between border-b border-brand-border/70 pb-2"
              >
                <span className="capitalize">{ingredient.name}</span>
                <span className="font-medium">
                  {ingredient.amount} {ingredient.unit}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="animate-fade-in-up" style={{ animationDelay: "140ms" }}>
          <h2 className="font-display mb-3 text-lg font-semibold text-brand-sea-dark">Method</h2>
          <ol className="space-y-4 text-sm text-brand-sea-dark/80">
            {recipe.steps.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-sea text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
