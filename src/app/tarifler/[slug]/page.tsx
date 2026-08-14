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
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-terracotta">
        <span>{recipe.region}</span>
        <span>•</span>
        <span>{recipe.mealType}</span>
      </div>
      <h1 className="text-3xl font-bold text-brand-sea-dark">{recipe.name}</h1>
      <p className="mt-3 text-brand-sea-dark/70">{recipe.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {recipe.dietTags.map((tag) => (
          <Badge key={tag} label={tag} />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-6 text-sm text-brand-sea-dark/70">
        <span>{recipe.servings} kişilik</span>
        <span>Hazırlık: {recipe.prepTime} dk</span>
        <span>Pişirme: {recipe.cookTime} dk</span>
      </div>

      <div className="mt-6">
        <AddToPlanButton recipeId={recipe.id} />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-[1fr_1.4fr]">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-brand-sea-dark">Malzemeler</h2>
          <ul className="space-y-2 text-sm text-brand-sea-dark/80">
            {recipe.ingredients.map((ingredient) => (
              <li
                key={ingredient.name}
                className="flex justify-between border-b border-brand-border/70 pb-2"
              >
                <span>{ingredient.name}</span>
                <span className="font-medium">
                  {ingredient.amount} {ingredient.unit}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-brand-sea-dark">Yapılışı</h2>
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
