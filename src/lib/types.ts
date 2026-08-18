export type Unit = "g" | "kg" | "ml" | "l" | "pcs" | "tbsp" | "tsp" | "cup" | "clove" | "bunch";

export type MealType =
  | "breakfast"
  | "soup"
  | "meze"
  | "salad"
  | "main-course"
  | "side"
  | "snack";

export type Region =
  | "Turkish"
  | "Greek"
  | "Italian"
  | "Spanish"
  | "Levantine"
  | "Moroccan"
  | "British";

export type DietTag = "vegan" | "vegetarian" | "meat" | "seafood";

export interface Ingredient {
  name: string;
  amount: number;
  unit: Unit;
}

export interface Recipe {
  id: string;
  name: string;
  region: Region;
  mealType: MealType;
  dietTags: DietTag[];
  servings: number;
  calories: number;
  prepTime: number;
  cookTime: number;
  description: string;
  ingredients: Ingredient[];
  steps: string[];
  image?: string;
}

export const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export type Weekday = (typeof WEEKDAYS)[number];

export interface PlanEntry {
  id: string;
  day: Weekday;
  recipeId: string;
  servings: number;
}
