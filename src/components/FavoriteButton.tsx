"use client";

import { useFavoritesStore } from "@/lib/favorites-store";

export default function FavoriteButton({
  recipeId,
  size = "default",
}: {
  recipeId: string;
  size?: "default" | "large";
}) {
  const isFavorite = useFavoritesStore((state) => state.isFavorite(recipeId));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(recipeId);
      }}
      aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"}
      aria-pressed={isFavorite}
      className={`flex items-center justify-center rounded-full bg-white/90 text-brand-red shadow transition hover:scale-110 hover:bg-white ${
        size === "large" ? "h-11 w-11" : "h-8 w-8"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className={size === "large" ? "h-5 w-5" : "h-4 w-4"}
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 20.5s-7.5-4.6-10-9.3C.6 8 1.8 4.5 5 3.4c2.2-.8 4.4.1 5.6 1.9l1.4 2 1.4-2c1.2-1.8 3.4-2.7 5.6-1.9 3.2 1.1 4.4 4.6 3 7.8-2.5 4.7-10 9.3-10 9.3Z"
        />
      </svg>
    </button>
  );
}
