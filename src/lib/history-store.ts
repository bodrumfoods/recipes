"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PlanEntry } from "@/lib/types";

export interface PlanSnapshot {
  id: string;
  savedAt: string;
  entries: PlanEntry[];
}

interface HistoryState {
  snapshots: PlanSnapshot[];
  saveSnapshot: (entries: PlanEntry[]) => void;
  removeSnapshot: (id: string) => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      snapshots: [],
      saveSnapshot: (entries) =>
        set((state) => ({
          snapshots: [
            { id: `snap-${Date.now()}`, savedAt: new Date().toISOString(), entries },
            ...state.snapshots,
          ].slice(0, 20),
        })),
      removeSnapshot: (id) =>
        set((state) => ({ snapshots: state.snapshots.filter((s) => s.id !== id) })),
    }),
    { name: "bodrumfoods-plan-history" }
  )
);
