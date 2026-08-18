import Link from "next/link";
import { recipes, regions } from "@/lib/recipes";
import RecipeCard from "@/components/RecipeCard";
import SectionHeader from "@/components/SectionHeader";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import HeroSlider from "@/components/HeroSlider";

export default function Home() {
  const [heroRecipe, ...restFeatured] = recipes;
  const featured = restFeatured.slice(0, 4);

  return (
    <div className="flex flex-col overflow-x-hidden">
      <section className="relative flex min-h-[480px] items-center overflow-hidden border-b border-brand-border sm:min-h-[560px]">
        <HeroSlider />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20"
        />

        <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="animate-fade-in-up">
            <p className="text-sm font-semibold uppercase tracking-widest text-white/90">
              Mediterranean cuisine, all in one place
            </p>
            <h1 className="font-display mt-4 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl">
              Pick a recipe, plan your week, order your ingredients from bodrumfoods.co.uk.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">
              Build your weekly meal plan from Turkish, Greek, Italian, Spanish, Levantine,
              Moroccan, and British recipes — we&apos;ll work out your ingredient list
              automatically.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/recipes"
                className="rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-green-dark hover:shadow-lg"
              >
                Explore Recipes
              </Link>
              <Link
                href="/planner"
                className="rounded-full border border-white px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Start a Weekly Plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div aria-hidden className="relative h-10 overflow-hidden border-b border-brand-border bg-brand-muted">
        <div className="animate-drift absolute flex w-[200%] items-center gap-12 whitespace-nowrap text-xs font-semibold uppercase tracking-widest text-brand-ink/40">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12 pl-12">
              {regions.map((r) => (
                <span key={r}>{r} Cuisine</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Pick recipes",
              text: `Browse ${recipes.length}+ Mediterranean recipes and find your favourites.`,
            },
            {
              step: "2",
              title: "Plan your week",
              text: "Add one or more recipes to each day and adjust the servings.",
            },
            {
              step: "3",
              title: "Order ingredients",
              text: "Your shopping list is generated automatically — add it to your bodrumfoods.co.uk cart in one click.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="group rounded-2xl border border-brand-border bg-brand-card p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="font-display flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10 text-lg font-bold text-brand-green-dark transition duration-300 group-hover:bg-brand-green group-hover:text-white">
                {item.step}
              </span>
              <h3 className="font-display mt-4 font-semibold text-brand-ink">{item.title}</h3>
              <p className="mt-2 text-sm text-brand-ink/70">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <SectionHeader title="What to cook this week" href="/recipes" />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="animate-fade-in-up">
            <RecipeCard recipe={heroRecipe} size="large" />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {featured.map((recipe, index) => (
              <div
                key={recipe.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${(index + 1) * 60}ms` }}
              >
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
        <AppDownloadBanner />
      </section>

      <section className="border-t border-brand-border bg-brand-muted">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <SectionHeader title="Browse by cuisine" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {regions.map((region) => (
              <Link
                key={region}
                href={`/recipes?region=${encodeURIComponent(region)}`}
                className="group border border-brand-border bg-white p-4 transition hover:border-brand-red"
              >
                <span className="font-display block text-lg font-bold text-brand-ink group-hover:underline">
                  {region}
                </span>
                <span className="text-xs uppercase tracking-wide text-brand-ink/50">Cuisine</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
