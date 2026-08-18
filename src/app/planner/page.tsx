"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { usePlanStore } from "@/lib/plan-store";
import { useHistoryStore } from "@/lib/history-store";
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
    <div className="flex w-full flex-col gap-3 rounded-2xl border border-brand-border bg-brand-card p-4 transition hover:shadow-md">
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

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function PlannerPage() {
  const { data: session } = useSession();
  const clearPlan = usePlanStore((state) => state.clearPlan);
  const addEntry = usePlanStore((state) => state.addEntry);
  const entries = usePlanStore((state) => state.entries);
  const entryCount = entries.length;
  const saveSnapshot = useHistoryStore((state) => state.saveSnapshot);
  const [saved, setSaved] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const weekCalories = useMemo(
    () =>
      entries.reduce((sum, entry) => {
        const recipe = getRecipeById(entry.recipeId);
        return recipe ? sum + recipe.calories * entry.servings : sum;
      }, 0),
    [entries]
  );

  function handleSaveWeek() {
    if (!session) {
      signIn("google");
      return;
    }
    saveSnapshot(entries);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleMagicPlan() {
    if (entryCount > 0) {
      const confirmed = window.confirm(
        "This will replace your current weekly plan with a random one. Continue?"
      );
      if (!confirmed) return;
    }
    clearPlan();

    const mains = shuffle(recipes.filter((r) => r.mealType === "main-course"));
    // Sides pool: dedicated side dishes, salads, and yoghurt-based mezes — all things
    // that make sense served alongside a main, unlike an unrelated meze or dessert.
    const sidesPool = recipes.filter(
      (r) =>
        r.mealType === "side" ||
        r.mealType === "salad" ||
        (r.mealType === "meze" && r.ingredients.some((i) => /yog(h)?urt/i.test(i.name)))
    );
    const usedSideIds = new Set<string>();

    WEEKDAYS.forEach((day, i) => {
      const main = mains[i % mains.length];
      addEntry(day, main.id);

      // Prefer a side from the same cuisine as the main so pairings actually make
      // sense (e.g. Italian mains get Caprese/Panzanella, not a Turkish bulgur pilaf).
      const sameRegion = sidesPool.filter((s) => s.region === main.region);
      const candidates = sameRegion.length > 0 ? sameRegion : sidesPool;
      const unused = candidates.filter((s) => !usedSideIds.has(s.id));
      const pool = unused.length > 0 ? unused : candidates;
      const side = shuffle(pool)[0];

      if (side) {
        addEntry(day, side.id);
        usedSideIds.add(side.id);
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand-ink">
            Weekly Meal Planner
          </h1>
          <p className="mt-2 text-brand-ink/70">
            Pick a recipe for each day — your plan turns into a shopping list automatically. Not
            sure what to cook? Hit &quot;Plan My Week For Me&quot; and we&apos;ll pick a main and a
            side for every day.
          </p>
          {weekCalories > 0 && (
            <p className="mt-1 text-sm font-medium text-brand-ink/50">
              ~{weekCalories} kcal planned this week
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleMagicPlan}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-red to-brand-green px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M11 2.5 12.8 8l5.5 1.8-5.5 1.8L11 17.2 9.2 11.6 3.7 9.8l5.5-1.8L11 2.5Z" />
              <path
                d="M18.5 13.5 19.4 16l2.5.9-2.5.9-.9 2.5-.9-2.5-2.5-.9 2.5-.9.9-2.5Z"
                opacity="0.75"
              />
            </svg>
            Plan My Week For Me
          </button>
          {entryCount > 0 && (
            <>
              <button
                type="button"
                onClick={handleSaveWeek}
                className="rounded-full border border-brand-border px-4 py-2 text-sm font-medium text-brand-ink hover:bg-brand-muted"
              >
                {saved ? "Saved ✓" : session ? "Save This Week" : "Sign in to Save"}
              </button>
              <button
                type="button"
                onClick={clearPlan}
                className="rounded-full border border-brand-border px-4 py-2 text-sm font-medium text-brand-ink hover:bg-brand-muted"
              >
                Clear Plan
              </button>
            </>
          )}
          <Link
            href="/shopping-list"
            className="rounded-full bg-brand-green px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-green-dark"
          >
            View Shopping List
          </Link>
        </div>
      </div>

      <div className="hidden gap-4 sm:grid sm:grid-cols-2">
        {WEEKDAYS.map((day) => (
          <DayColumn key={day} day={day} />
        ))}
      </div>

      <div className="sm:hidden">
        <div className="mb-3 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setCarouselIndex((i) => (i - 1 + WEEKDAYS.length) % WEEKDAYS.length)}
            aria-label="Previous day"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-border text-brand-ink hover:border-brand-red hover:text-brand-red"
          >
            ‹
          </button>
          <span className="font-display text-lg font-semibold text-brand-ink">
            {WEEKDAYS[carouselIndex]}
          </span>
          <button
            type="button"
            onClick={() => setCarouselIndex((i) => (i + 1) % WEEKDAYS.length)}
            aria-label="Next day"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-border text-brand-ink hover:border-brand-red hover:text-brand-red"
          >
            ›
          </button>
        </div>

        <DayColumn day={WEEKDAYS[carouselIndex]} />

        <div className="mt-4 flex justify-center gap-2">
          {WEEKDAYS.map((day, i) => (
            <button
              key={day}
              type="button"
              onClick={() => setCarouselIndex(i)}
              aria-label={`Show ${day}`}
              className={`h-2 w-2 rounded-full transition ${
                i === carouselIndex ? "bg-brand-red" : "bg-brand-border hover:bg-brand-red/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
