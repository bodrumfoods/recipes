"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { openJobs, jobCategories, jobLocations } from "@/lib/jobs";
import type { JobCategory } from "@/lib/types";
import JobCard from "@/components/JobCard";

const categoryBlurb: Record<JobCategory, string> = {
  "Warehouse & Logistics": "Picking, packing and forklift roles at our distribution centre.",
  Driving: "HGV Class 1 & 2, and driver's mate roles across London and the South East.",
  "Office & Support": "Buying, finance, HR, marketing and customer service at Head Office.",
  Retail: "Shop floor and customer-facing roles at our stores.",
};

function CareersContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(searchParams.get("category") ?? "");
  const [location, setLocation] = useState<string>("");
  const [employmentType, setEmploymentType] = useState<string>("");

  const filtered = useMemo(() => {
    return openJobs.filter((job) => {
      if (category && job.category !== category) return false;
      if (location && job.location !== location) return false;
      if (employmentType && job.employmentType !== employmentType) return false;
      if (query) {
        const haystack = `${job.title} ${job.localTitle ?? ""} ${job.summary}`.toLowerCase();
        if (!haystack.includes(query.toLowerCase())) return false;
      }
      return true;
    });
  }, [query, category, location, employmentType]);

  const hasActiveFilters = Boolean(category || location || employmentType || query);

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b border-brand-border bg-brand-ink">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-brand-red/25 via-transparent to-brand-green/20"
        />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="animate-fade-in-up max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-white/80">
              Careers at Bodrum Foods
            </p>
            <h1 className="font-display mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Help bring Mediterranean flavours to more tables across the UK
            </h1>
            <p className="mt-4 text-lg text-white/80">
              From our distribution centre and delivery fleet to our Head Office and stores,
              we&apos;re always looking for reliable, friendly people to join the Bodrum Foods
              team.
            </p>
          </div>

          <div className="animate-fade-in-up mt-8 flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-xl sm:flex-row sm:items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search job title, e.g. &quot;driver&quot; or &quot;warehouse&quot;"
              className="flex-1 rounded-xl border border-transparent px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-border"
            />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="rounded-xl border border-brand-border px-4 py-3 text-sm text-brand-ink sm:w-56"
            >
              <option value="">All locations</option>
              {jobLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <span className="rounded-xl bg-brand-red px-6 py-3 text-center text-sm font-semibold text-white">
              {filtered.length} role{filtered.length === 1 ? "" : "s"} found
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/70">
            <span>
              <strong className="text-white">{openJobs.length}</strong> open roles
            </span>
            <span>
              <strong className="text-white">{jobLocations.length}</strong> locations
            </span>
            <span>
              <strong className="text-white">{jobCategories.length}</strong> teams hiring
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {jobCategories.map((cat) => {
            const count = openJobs.filter((j) => j.category === cat).length;
            const active = category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(active ? "" : cat)}
                className={`group flex h-full flex-col items-start gap-1 border p-5 text-left transition ${
                  active
                    ? "border-brand-red bg-brand-red/5"
                    : "border-brand-border bg-brand-card hover:border-brand-ink/30"
                }`}
              >
                <span className="font-display text-lg font-bold text-brand-ink">{cat}</span>
                <span className="text-sm text-brand-ink/60">{categoryBlurb[cat]}</span>
                <span className="mt-auto pt-3 text-xs font-semibold uppercase tracking-wide text-brand-ink/50">
                  {count} open role{count === 1 ? "" : "s"}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="space-y-6">
            <div>
              <h2 className="font-display mb-3 text-sm font-semibold uppercase tracking-wide text-brand-ink/60">
                Employment type
              </h2>
              <div className="flex flex-col gap-2 text-sm">
                {["Full-time", "Part-time"].map((type) => (
                  <label key={type} className="flex items-center gap-2 text-brand-ink/80">
                    <input
                      type="radio"
                      name="employmentType"
                      checked={employmentType === type}
                      onChange={() => setEmploymentType(employmentType === type ? "" : type)}
                      className="accent-brand-red"
                    />
                    {type}
                  </label>
                ))}
                <button
                  type="button"
                  onClick={() => setEmploymentType("")}
                  className="mt-1 w-fit text-xs font-medium text-brand-ink/50 underline-offset-2 hover:text-brand-red hover:underline"
                >
                  Clear
                </button>
              </div>
            </div>

            <div>
              <h2 className="font-display mb-3 text-sm font-semibold uppercase tracking-wide text-brand-ink/60">
                Category
              </h2>
              <div className="flex flex-col gap-2 text-sm">
                {jobCategories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 text-brand-ink/80">
                    <input
                      type="radio"
                      name="category"
                      checked={category === cat}
                      onChange={() => setCategory(category === cat ? "" : cat)}
                      className="accent-brand-red"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => {
                  setCategory("");
                  setLocation("");
                  setEmploymentType("");
                  setQuery("");
                }}
                className="text-sm font-semibold text-brand-red hover:underline"
              >
                Clear all filters
              </button>
            )}
          </aside>

          <div>
            {filtered.length === 0 ? (
              <p className="border border-brand-border bg-brand-muted p-8 text-center text-brand-ink/70">
                No roles match your search right now. Try clearing a filter, or check back soon —
                we post new openings regularly.
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {filtered.map((job, index) => (
                  <div
                    key={job.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${Math.min(index, 10) * 40}ms` }}
                  >
                    <JobCard job={job} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-border bg-brand-muted">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-brand-ink">
            Why work at Bodrum Foods
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Real progression",
                text: "Many of our team leaders and supervisors started on the warehouse floor or behind the wheel.",
              },
              {
                title: "Staff discount",
                text: "Everyone gets a discount across the full Bodrum Foods range, from day one.",
              },
              {
                title: "Stable, local work",
                text: "Consistent shifts and routes across London — no long-haul, no nights away.",
              },
              {
                title: "A team that feels like family",
                text: "We're proud of our close-knit, multicultural team spanning Turkish, Greek and wider Mediterranean communities.",
              },
            ].map((item) => (
              <div key={item.title} className="border border-brand-border bg-white p-5">
                <h3 className="font-display font-semibold text-brand-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-brand-ink/70">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 text-center sm:px-6">
        <h2 className="font-display text-xl font-bold text-brand-ink">
          Can&apos;t see the right role?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-brand-ink/70">
          New roles are posted regularly across our warehouse, driving, office and store teams.
          Check back soon, or explore everything we currently have open.
        </p>
        <Link
          href="/careers"
          className="mt-5 inline-block rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-green-dark"
        >
          View all open roles
        </Link>
      </section>
    </div>
  );
}

export default function CareersPage() {
  return (
    <Suspense fallback={null}>
      <CareersContent />
    </Suspense>
  );
}
