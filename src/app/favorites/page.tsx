"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useFavoritesStore } from "@/lib/favorites-store";
import { recipes } from "@/lib/recipes";
import RecipeCard from "@/components/RecipeCard";

export default function FavoritesPage() {
  const favoriteIds = useFavoritesStore((state) => state.recipeIds);
  const favoriteRecipes = useMemo(
    () => recipes.filter((recipe) => favoriteIds.includes(recipe.id)),
    [favoriteIds]
  );

  if (favoriteRecipes.length === 0) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-16 text-center sm:px-6">
        <h1 className="font-display text-2xl font-bold text-brand-ink">
          No favourites yet
        </h1>
        <p className="mt-3 text-brand-ink/70">
          Tap the heart icon on any recipe to save it here for quick access later.
        </p>
        <Link
          href="/recipes"
          className="mt-6 inline-block rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-green-dark"
        >
          Browse Recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-brand-ink">My Favourites</h1>
      <p className="mt-2 text-brand-ink/70">
        {favoriteRecipes.length} recipe{favoriteRecipes.length === 1 ? "" : "s"} you&apos;ve saved
        on this device.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {favoriteRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
