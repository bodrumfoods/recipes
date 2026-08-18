"use client";

import { useState } from "react";
import { usePlanStore } from "@/lib/plan-store";
import { WEEKDAYS, type Weekday } from "@/lib/types";

export default function AddToPlanButton({ recipeId }: { recipeId: string }) {
  const addEntry = usePlanStore((state) => state.addEntry);
  const [open, setOpen] = useState(false);
  const [added, setAdded] = useState<Weekday | null>(null);

  function handleAdd(day: Weekday) {
    addEntry(day, recipeId);
    setAdded(day);
    setOpen(false);
    setTimeout(() => setAdded(null), 2000);
  }

  return (
    <div className="relative isolate">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-green-dark"
      >
        {added ? `Added to ${added} ✓` : "Add to Weekly Plan"}
      </button>
      {open && (
        <>
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div
            className="absolute left-0 top-full z-50 mt-2 w-48 rounded-xl border border-brand-border p-2 shadow-xl"
            style={{ backgroundColor: "#ffffff" }}
          >
            {WEEKDAYS.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => handleAdd(day)}
                className="block w-full rounded-lg px-3 py-2 text-left text-sm text-brand-ink hover:bg-brand-muted"
              >
                {day}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
