"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  recipeIds: string[];
  toggleFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      recipeIds: [],
      toggleFavorite: (recipeId) =>
        set((state) => ({
          recipeIds: state.recipeIds.includes(recipeId)
            ? state.recipeIds.filter((id) => id !== recipeId)
            : [...state.recipeIds, recipeId],
        })),
      isFavorite: (recipeId) => get().recipeIds.includes(recipeId),
      clearFavorites: () => set({ recipeIds: [] }),
    }),
    { name: "bodrumfoods-favorites" }
  )
);
