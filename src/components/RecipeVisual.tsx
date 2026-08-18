import type { MealType, Region } from "@/lib/types";

const REGION_GRADIENTS: Record<Region, string> = {
  Turkish: "linear-gradient(135deg, var(--brand-red) 0%, var(--brand-red-dark) 100%)",
  Greek: "linear-gradient(135deg, var(--brand-green) 0%, var(--brand-green-dark) 100%)",
  Italian: "linear-gradient(135deg, var(--brand-red-dark) 0%, var(--brand-ink) 100%)",
  Spanish: "linear-gradient(135deg, var(--brand-red) 0%, var(--brand-ink) 100%)",
  Levantine: "linear-gradient(135deg, var(--brand-green-dark) 0%, var(--brand-ink) 100%)",
  Moroccan: "linear-gradient(135deg, var(--brand-red) 0%, var(--brand-green-dark) 100%)",
  British: "linear-gradient(135deg, var(--brand-ink) 0%, var(--brand-red-dark) 100%)",
};

const MEAL_ICON_PATHS: Record<MealType, React.ReactNode> = {
  breakfast: (
    <>
      <path d="M4 10a8 4 0 0 0 16 0" />
      <path d="M4 10a8 4 0 0 1 16 0" />
      <path d="M12 2v2" />
      <path d="M8 3.5 9 5" />
      <path d="M16 3.5 15 5" />
    </>
  ),
  soup: (
    <>
      <path d="M4 11h16a8 6 0 0 1-16 0Z" />
      <path d="M9 4c-.8.8-.8 1.6 0 2.4" />
      <path d="M13 4c-.8.8-.8 1.6 0 2.4" />
    </>
  ),
  meze: (
    <>
      <circle cx="12" cy="13" r="7" />
      <circle cx="9" cy="12" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="13" cy="10.5" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="14" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  salad: (
    <>
      <path d="M4 12a8 8 0 0 1 16 0Z" />
      <path d="M12 12V6" />
      <path d="M12 6c1.5-1.5 3-1.5 4-.5" />
      <path d="M12 6c-1.5-1.5-3-1.5-4-.5" />
    </>
  ),
  "main-course": (
    <>
      <circle cx="13" cy="12" r="7" />
      <circle cx="13" cy="12" r="3.2" />
      <path d="M4 6v5c0 1 .7 1.6 1.6 1.8" />
      <path d="M5.5 6v3.5" />
      <path d="M4 6v3.5" />
    </>
  ),
  side: (
    <>
      <path d="M5 12h14a7 5 0 0 1-14 0Z" />
      <path d="M12 12V8" />
    </>
  ),
  snack: (
    <>
      <path d="M12 4 5 20h14L12 4Z" />
      <path d="M9 14h6" />
    </>
  ),
};

export default function RecipeVisual({
  region,
  mealType,
  className = "",
}: {
  region: Region;
  mealType: MealType;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundImage: REGION_GRADIENTS[region] }}
    >
      <span className="pointer-events-none absolute -left-6 -top-8 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
      <span className="pointer-events-none absolute -bottom-10 -right-6 h-32 w-32 rounded-full bg-black/10 blur-2xl" />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute inset-0 m-auto h-12 w-12 text-white/85 sm:h-14 sm:w-14"
      >
        {MEAL_ICON_PATHS[mealType]}
      </svg>
    </div>
  );
}
