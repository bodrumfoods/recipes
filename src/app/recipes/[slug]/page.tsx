import Link from "next/link";
import { notFound } from "next/navigation";
import { recipes, getRecipeById, slugifyIngredient } from "@/lib/recipes";
import { buildShoppingList } from "@/lib/shopping-list";
import { splitByShopifyMapping, buildShopifyCartUrl } from "@/lib/shopify-cart";
import Badge from "@/components/Badge";
import AddToPlanButton from "@/components/AddToPlanButton";
import RecipeVisual from "@/components/RecipeVisual";
import RecipeCard from "@/components/RecipeCard";
import SectionHeader from "@/components/SectionHeader";
import FavoriteButton from "@/components/FavoriteButton";

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

  const shoppingList = buildShoppingList(
    [{ id: "single", day: "Monday", recipeId: recipe.id, servings: recipe.servings }],
    new Map([[recipe.id, recipe]])
  );
  const { matched } = splitByShopifyMapping(shoppingList);
  const cartReady = matched.filter((item) => item.variantId);
  const cartUrl = buildShopifyCartUrl(matched);

  const relatedRecipes = recipes
    .filter((r) => r.id !== recipe.id && r.region === recipe.region)
    .slice(0, 4);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <div className="animate-fade-in-up">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-red">
          <span>{recipe.region}</span>
          <span>•</span>
          <span>{recipe.mealType}</span>
        </div>
        <h1 className="font-display mt-2 text-3xl font-bold text-brand-ink sm:text-4xl">
          {recipe.name}
        </h1>
        <p className="mt-3 max-w-2xl text-brand-ink/70">{recipe.description}</p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 animate-fade-in-up lg:grid-cols-[1.6fr_1fr]">
        <div className="relative">
          <RecipeVisual region={recipe.region} mealType={recipe.mealType} className="aspect-[4/3] w-full" />
          <div className="absolute right-4 top-4">
            <FavoriteButton recipeId={recipe.id} size="large" />
          </div>
        </div>

        <aside className="border border-brand-border bg-brand-muted p-6">
          {cartReady.length > 0 ? (
            <a
              href={cartUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full border border-brand-green bg-brand-green px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-brand-green-dark"
            >
              + Add Ingredients to Cart
            </a>
          ) : (
            <span className="block w-full border border-brand-border px-4 py-3 text-center text-sm font-medium text-brand-ink/40">
              Add to Cart — coming soon
            </span>
          )}

          <div className="mt-3">
            <AddToPlanButton recipeId={recipe.id} />
          </div>

          <dl className="mt-6 space-y-4 border-t border-brand-border pt-6 text-sm">
            <div>
              <dt className="font-display font-semibold text-brand-ink">Prepare</dt>
              <dd className="text-brand-ink/70">{recipe.prepTime} min</dd>
            </div>
            <div>
              <dt className="font-display font-semibold text-brand-ink">Cook</dt>
              <dd className="text-brand-ink/70">{recipe.cookTime} min</dd>
            </div>
            <div>
              <dt className="font-display font-semibold text-brand-ink">Serve</dt>
              <dd className="text-brand-ink/70">Serves {recipe.servings}</dd>
            </div>
            <div>
              <dt className="font-display font-semibold text-brand-ink">Calories</dt>
              <dd className="text-brand-ink/70">~{recipe.calories} kcal / serving</dd>
            </div>
            <div>
              <dt className="font-display font-semibold text-brand-ink">Dietary</dt>
              <dd className="mt-1 flex flex-wrap gap-1.5">
                {recipe.dietTags.map((tag) => (
                  <Badge key={tag} label={tag} />
                ))}
              </dd>
            </div>
          </dl>
        </aside>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-[1fr_1.4fr]">
        <section className="animate-fade-in-up" style={{ animationDelay: "80ms" }}>
          <h2 className="font-display mb-3 text-lg font-semibold text-brand-ink">
            Ingredients
          </h2>
          <ul className="space-y-2 text-sm text-brand-ink/80">
            {recipe.ingredients.map((ingredient) => (
              <li
                key={ingredient.name}
                className="flex justify-between border-b border-brand-border pb-2"
              >
                <Link
                  href={`/ingredients/${slugifyIngredient(ingredient.name)}`}
                  className="capitalize underline decoration-brand-border underline-offset-4 hover:text-brand-red hover:decoration-brand-red"
                >
                  {ingredient.name}
                </Link>
                <span className="font-medium">
                  {ingredient.amount} {ingredient.unit}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="animate-fade-in-up" style={{ animationDelay: "140ms" }}>
          <h2 className="font-display mb-3 text-lg font-semibold text-brand-ink">Method</h2>
          <ol className="space-y-4 text-sm text-brand-ink/80">
            {recipe.steps.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {relatedRecipes.length > 0 && (
        <div className="mt-16">
          <SectionHeader title="Related recipes" href={`/recipes?region=${encodeURIComponent(recipe.region)}`} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedRecipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
