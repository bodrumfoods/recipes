import recipesData from "@/data/recipes.json";
import type { Recipe } from "@/lib/types";

export const recipes = recipesData as Recipe[];

export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find((r) => r.id === id);
}

export const regions = Array.from(new Set(recipes.map((r) => r.region))).sort();
export const mealTypes = Array.from(new Set(recipes.map((r) => r.mealType))).sort();
export const dietTags = Array.from(new Set(recipes.flatMap((r) => r.dietTags))).sort();

export function slugifyIngredient(name: string): string {
  return name
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export interface IngredientEntry {
  slug: string;
  name: string;
  recipes: Recipe[];
}

const ingredientMap = new Map<string, IngredientEntry>();
for (const recipe of recipes) {
  for (const ingredient of recipe.ingredients) {
    const slug = slugifyIngredient(ingredient.name);
    if (!slug) continue;
    const existing = ingredientMap.get(slug);
    if (existing) {
      if (!existing.recipes.some((r) => r.id === recipe.id)) {
        existing.recipes.push(recipe);
      }
    } else {
      ingredientMap.set(slug, { slug, name: ingredient.name, recipes: [recipe] });
    }
  }
}

export const ingredients = Array.from(ingredientMap.values()).sort((a, b) =>
  a.name.localeCompare(b.name, "en")
);

export function getIngredientBySlug(slug: string): IngredientEntry | undefined {
  return ingredientMap.get(slug);
}
