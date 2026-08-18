"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePlanStore } from "@/lib/plan-store";
import { WEEKDAYS, type Weekday } from "@/lib/types";
import { recipes, getRecipeById } from "@/lib/recipes";

function DayColumn({ day }: { day: Weekday }) {
  const allEntries = usePlanStore((state) => state.entries);
  const entries = useMemo(() => allEntries.filter((e) => e.day === day), [allEntries, day]);
  const addEntry = usePlanStore((state) => state.addEntry);
  const removeEntry = usePlanStore((state) => state.removeEntry);
  const updateServings = usePlanStore((state) => state.updateServings);
  const [selected, setSelected] = useState("");

  const dayCalories = entries.reduce((sum, entry) => {
    const recipe = getRecipeById(entry.recipeId);
    return recipe ? sum + recipe.calories * entry.servings : sum;
  }, 0);

  return (
    <div className="flex min-w-[260px] flex-col gap-3 rounded-2xl border border-brand-border bg-brand-card p-4 transition hover:shadow-md">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-display font-semibold text-brand-ink">{day}</h3>
        {dayCalories > 0 && (
          <span className="text-xs font-medium text-brand-ink/50">~{dayCalories} kcal</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {entries.length === 0 && (
          <p className="text-xs text-brand-ink/50">No recipes added yet.</p>
        )}
        {entries.map((entry) => {
          const recipe = getRecipeById(entry.recipeId);
          if (!recipe) return null;
          return (
            <div key={entry.id} className="rounded-xl bg-brand-muted p-3 text-sm">
              <div className="flex items-start justify-between gap-2">
                <Link
                  href={`/recipes/${recipe.id}`}
                  className="font-medium text-brand-ink hover:text-brand-red"
                >
                  {recipe.name}
                </Link>
                <button
                  type="button"
                  onClick={() => removeEntry(entry.id)}
                  aria-label="Remove"
                  className="text-brand-ink/50 hover:text-brand-red"
                >
                  ✕
                </button>
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs text-brand-ink/70">
                <label htmlFor={`servings-${entry.id}`}>Servings</label>
                <input
                  id={`servings-${entry.id}`}
                  type="number"
                  min={1}
                  value={entry.servings}
                  onChange={(e) => updateServings(entry.id, Number(e.target.value))}
                  className="w-14 rounded border border-brand-border px-1 py-0.5"
                />
                <span className="ml-auto text-brand-ink/50">
                  ~{recipe.calories * entry.servings} kcal
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-auto flex gap-2">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full rounded-lg border border-brand-border bg-white px-2 py-1.5 text-xs"
        >
          <option value="">Choose a recipe...</option>
          {recipes.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          disabled={!selected}
          onClick={() => {
            addEntry(day, selected);
            setSelected("");
          }}
          className="rounded-lg bg-brand-green px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-green-dark disabled:opacity-40"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default function PlannerPage() {
  const clearPlan = usePlanStore((state) => state.clearPlan);
  const entries = usePlanStore((state) => state.entries);
  const entryCount = entries.length;
  const weekCalories = useMemo(
    () =>
      entries.reduce((sum, entry) => {
        const recipe = getRecipeById(entry.recipeId);
        return recipe ? sum + recipe.calories * entry.servings : sum;
      }, 0),
    [entries]
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand-ink">
            Weekly Meal Planner
          </h1>
          <p className="mt-2 text-brand-ink/70">
            Pick a recipe for each day — your plan turns into a shopping list automatically.
          </p>
          {weekCalories > 0 && (
            <p className="mt-1 text-sm font-medium text-brand-ink/50">
              ~{weekCalories} kcal planned this week
            </p>
          )}
        </div>
        <div className="flex gap-3">
          {entryCount > 0 && (
            <button
              type="button"
              onClick={clearPlan}
              className="rounded-full border border-brand-border px-4 py-2 text-sm font-medium text-brand-ink hover:bg-brand-muted"
            >
              Clear Plan
            </button>
          )}
          <Link
            href="/shopping-list"
            className="rounded-full bg-brand-green px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-green-dark"
          >
            View Shopping List
          </Link>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {WEEKDAYS.map((day) => (
          <DayColumn key={day} day={day} />
        ))}
      </div>
    </div>
  );
}
