import recipesData from "@/data/recipes.json";
import type { Recipe } from "@/lib/types";

export const recipes = recipesData as Recipe[];

export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find((r) => r.id === id);
}

export const regions = Array.from(new Set(recipes.map((r) => r.region))).sort();
export const mealTypes = Array.from(new Set(recipes.map((r) => r.mealType))).sort();
export const dietTags = Array.from(new Set(recipes.flatMap((r) => r.dietTags))).sort();
