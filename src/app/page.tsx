import Link from "next/link";
import { recipes, regions } from "@/lib/recipes";
import RecipeCard from "@/components/RecipeCard";

const floatingEmoji = [
  { emoji: "🍅", className: "left-[6%] top-[18%] text-6xl animate-float-slow" },
  { emoji: "🫒", className: "left-[85%] top-[12%] text-5xl animate-float-slow-reverse" },
  { emoji: "🍆", className: "left-[12%] top-[70%] text-5xl animate-float-slow-reverse" },
  { emoji: "🥙", className: "left-[80%] top-[65%] text-6xl animate-float-slow" },
  { emoji: "🍋", className: "left-[45%] top-[8%] text-4xl animate-float-slow" },
  { emoji: "🧆", className: "left-[92%] top-[40%] text-5xl animate-float-slow-reverse" },
];

export default function Home() {
  const featured = recipes.slice(0, 6);

  return (
    <div className="flex flex-col overflow-x-hidden">
      <section className="relative overflow-hidden border-b border-brand-border bg-gradient-to-b from-brand-sea/10 to-brand-sand">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {floatingEmoji.map((item, i) => (
            <span
              key={i}
              className={`absolute opacity-20 ${item.className}`}
              style={{ animationDelay: `${i * 0.6}s` }}
            >
              {item.emoji}
            </span>
          ))}
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="animate-fade-in-up">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-terracotta">
              Mediterranean cuisine, all in one place
            </p>
            <h1 className="font-display mt-4 max-w-2xl text-4xl font-bold leading-tight text-brand-sea-dark sm:text-5xl">
              Pick a recipe, plan your week, order your ingredients from bodrumfoods.co.uk.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-brand-sea-dark/70">
              Build your weekly meal plan from Turkish, Greek, Italian, Spanish, Levantine, and
              Moroccan recipes — we&apos;ll work out your ingredient list automatically.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/recipes"
                className="rounded-full bg-brand-sea px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-sea-dark hover:shadow-lg"
              >
                Explore Recipes
              </Link>
              <Link
                href="/planner"
                className="rounded-full border border-brand-sea px-6 py-3 text-sm font-semibold text-brand-sea-dark transition hover:-translate-y-0.5 hover:bg-white"
              >
                Start a Weekly Plan
              </Link>
            </div>
          </div>
        </div>

        <div aria-hidden className="relative h-14 overflow-hidden border-t border-brand-border/70">
          <div className="animate-drift absolute flex w-[200%] items-center gap-10 whitespace-nowrap text-2xl">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-10 pl-10">
                {["🍅", "🫒", "🧄", "🍆", "🥙", "🍋", "🧆", "🫓", "🥗", "🍲"].map((e, j) => (
                  <span key={j}>{e}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            {
              step: "1",
              emoji: "📖",
              title: "Pick recipes",
              text: `Browse ${recipes.length}+ Mediterranean recipes and find your favourites.`,
            },
            {
              step: "2",
              emoji: "🗓️",
              title: "Plan your week",
              text: "Add one or more recipes to each day and adjust the servings.",
            },
            {
              step: "3",
              emoji: "🛒",
              title: "Order ingredients",
              text: "Your shopping list is generated automatically — add it to your bodrumfoods.co.uk cart in one click.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="group rounded-2xl border border-brand-border bg-brand-card p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl transition duration-300 group-hover:scale-110">
                  {item.emoji}
                </span>
                <span className="font-display text-3xl font-bold text-brand-terracotta">
                  {item.step}
                </span>
              </div>
              <h3 className="font-display mt-3 font-semibold text-brand-sea-dark">{item.title}</h3>
              <p className="mt-2 text-sm text-brand-sea-dark/70">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-brand-sea-dark">Featured Recipes</h2>
          <Link href="/recipes" className="text-sm font-semibold text-brand-terracotta hover:underline">
            See All
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((recipe, index) => (
            <div
              key={recipe.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-brand-border bg-brand-card">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-brand-sea-dark">Browse by cuisine</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {regions.map((region) => (
              <Link
                key={region}
                href={`/recipes?region=${encodeURIComponent(region)}`}
                className="rounded-full border border-brand-border bg-brand-sand px-4 py-2 text-sm font-medium text-brand-sea-dark transition hover:-translate-y-0.5 hover:border-brand-sea hover:shadow-sm"
              >
                {region}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
