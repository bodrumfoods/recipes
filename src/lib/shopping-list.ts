import type { PlanEntry, Recipe, Unit } from "@/lib/types";

export interface ShoppingListItem {
  key: string;
  name: string;
  amount: number;
  unit: Unit;
  recipeNames: string[];
}

const WEIGHT_BASE_UNIT: Unit = "g";
const VOLUME_BASE_UNIT: Unit = "ml";

function toBaseUnit(amount: number, unit: Unit): { amount: number; unit: Unit } {
  if (unit === "kg") return { amount: amount * 1000, unit: WEIGHT_BASE_UNIT };
  if (unit === "l") return { amount: amount * 1000, unit: VOLUME_BASE_UNIT };
  return { amount, unit };
}

function fromBaseUnit(amount: number, unit: Unit): { amount: number; unit: Unit } {
  if (unit === "g" && amount >= 1000) return { amount: amount / 1000, unit: "kg" };
  if (unit === "ml" && amount >= 1000) return { amount: amount / 1000, unit: "l" };
  return { amount, unit };
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

export function buildShoppingList(
  entries: PlanEntry[],
  recipesById: Map<string, Recipe>
): ShoppingListItem[] {
  const totals = new Map<
    string,
    { name: string; amount: number; unit: Unit; recipeNames: Set<string> }
  >();

  for (const entry of entries) {
    const recipe = recipesById.get(entry.recipeId);
    if (!recipe) continue;
    const ratio = entry.servings / recipe.servings;

    for (const ingredient of recipe.ingredients) {
      const base = toBaseUnit(ingredient.amount * ratio, ingredient.unit);
      const key = `${ingredient.name.toLowerCase()}|${base.unit}`;

      const existing = totals.get(key);
      if (existing) {
        existing.amount += base.amount;
        existing.recipeNames.add(recipe.name);
      } else {
        totals.set(key, {
          name: ingredient.name,
          amount: base.amount,
          unit: base.unit,
          recipeNames: new Set([recipe.name]),
        });
      }
    }
  }

  return Array.from(totals.entries())
    .map(([key, value]) => {
      const display = fromBaseUnit(value.amount, value.unit);
      return {
        key,
        name: value.name,
        amount: round(display.amount),
        unit: display.unit,
        recipeNames: Array.from(value.recipeNames),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name, "tr"));
}
