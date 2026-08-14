export type Unit = "g" | "kg" | "ml" | "l" | "adet" | "yk" | "çk" | "bardak" | "diş" | "demet";

export type MealType =
  | "kahvaltı"
  | "çorba"
  | "meze"
  | "salata"
  | "ana-yemek"
  | "atıştırmalık";

export type Region = "Türk" | "Yunan" | "İtalyan" | "İspanyol" | "Levanten" | "Fas";

export type DietTag = "vegan" | "vejetaryen" | "et" | "deniz-ürünü";

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
  prepTime: number;
  cookTime: number;
  description: string;
  ingredients: Ingredient[];
  steps: string[];
}

export const WEEKDAYS = [
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
  "Pazar",
] as const;

export type Weekday = (typeof WEEKDAYS)[number];

export interface PlanEntry {
  id: string;
  day: Weekday;
  recipeId: string;
  servings: number;
}
