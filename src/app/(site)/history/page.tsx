"use client";

import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useHistoryStore } from "@/lib/history-store";
import { getRecipeById } from "@/lib/recipes";
import { WEEKDAYS } from "@/lib/types";

export default function HistoryPage() {
  const { data: session, status } = useSession();
  const snapshots = useHistoryStore((state) => state.snapshots);
  const removeSnapshot = useHistoryStore((state) => state.removeSnapshot);

  if (status === "loading") {
    return null;
  }

  if (!session) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-16 text-center sm:px-6">
        <h1 className="font-display text-2xl font-bold text-brand-ink">
          Sign in to see your meal plan history
        </h1>
        <p className="mt-3 text-brand-ink/70">
          Members can save past weekly plans and look back on them any time.
        </p>
        <button
          type="button"
          onClick={() => signIn("google")}
          className="mt-6 inline-block rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-green-dark"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  if (snapshots.length === 0) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-16 text-center sm:px-6">
        <h1 className="font-display text-2xl font-bold text-brand-ink">No saved plans yet</h1>
        <p className="mt-3 text-brand-ink/70">
          Build a weekly plan, then use &quot;Save This Week&quot; on the Weekly Planner page to
          keep a record of it here.
        </p>
        <Link
          href="/planner"
          className="mt-6 inline-block rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-green-dark"
        >
          Go to Weekly Planner
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-brand-ink">Meal Plan History</h1>
      <p className="mt-2 text-brand-ink/70">
        Weekly plans you&apos;ve saved, {session.user?.name ?? "welcome back"}.
      </p>

      <div className="mt-8 space-y-6">
        {snapshots.map((snapshot) => (
          <div key={snapshot.id} className="border border-brand-border bg-brand-muted p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-brand-ink">
                Saved {new Date(snapshot.savedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <button
                type="button"
                onClick={() => removeSnapshot(snapshot.id)}
                className="text-xs font-medium text-brand-ink/50 hover:text-brand-red"
              >
                Remove
              </button>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {WEEKDAYS.map((day) => {
                const dayEntries = snapshot.entries.filter((e) => e.day === day);
                if (dayEntries.length === 0) return null;
                return (
                  <div key={day}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-ink/50">
                      {day}
                    </p>
                    <ul className="mt-1 space-y-1 text-sm text-brand-ink">
                      {dayEntries.map((entry) => {
                        const recipe = getRecipeById(entry.recipeId);
                        if (!recipe) return null;
                        return (
                          <li key={entry.id}>
                            <Link href={`/recipes/${recipe.id}`} className="hover:text-brand-red hover:underline">
                              {recipe.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
