"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PlanEntry, Weekday } from "@/lib/types";
import { getRecipeById } from "@/lib/recipes";

interface PlanState {
  entries: PlanEntry[];
  addEntry: (day: Weekday, recipeId: string) => void;
  removeEntry: (id: string) => void;
  updateServings: (id: string, servings: number) => void;
  clearPlan: () => void;
}

export const usePlanStore = create<PlanState>()(
  persist(
    (set) => ({
      entries: [],
      addEntry: (day, recipeId) =>
        set((state) => {
          const recipe = getRecipeById(recipeId);
          const entry: PlanEntry = {
            id: `${day}-${recipeId}-${Date.now()}`,
            day,
            recipeId,
            servings: recipe?.servings ?? 4,
          };
          return { entries: [...state.entries, entry] };
        }),
      removeEntry: (id) =>
        set((state) => ({ entries: state.entries.filter((e) => e.id !== id) })),
      updateServings: (id, servings) =>
        set((state) => ({
          entries: state.entries.map((e) =>
            e.id === id ? { ...e, servings: Math.max(1, servings) } : e
          ),
        })),
      clearPlan: () => set({ entries: [] }),
    }),
    { name: "bodrumfoods-meal-plan" }
  )
);
