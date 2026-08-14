"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePlanStore } from "@/lib/plan-store";
import { recipes } from "@/lib/recipes";
import { buildShoppingList } from "@/lib/shopping-list";
import {
  splitByShopifyMapping,
  buildShopifyCartUrl,
  productPageUrl,
  SHOPIFY_STORE_DOMAIN,
} from "@/lib/shopify-cart";

export default function ShoppingListPage() {
  const entries = usePlanStore((state) => state.entries);
  const recipesById = useMemo(() => new Map(recipes.map((r) => [r.id, r])), []);

  const shoppingList = useMemo(
    () => buildShoppingList(entries, recipesById),
    [entries, recipesById]
  );

  const { matched, unmatched } = useMemo(() => splitByShopifyMapping(shoppingList), [shoppingList]);
  const cartReady = useMemo(() => matched.filter((item) => item.variantId), [matched]);
  const pendingId = useMemo(() => matched.filter((item) => !item.variantId), [matched]);
  const cartUrl = useMemo(() => buildShopifyCartUrl(matched), [matched]);

  if (entries.length === 0) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-16 text-center sm:px-6">
        <p className="text-6xl">🛒</p>
        <h1 className="font-display mt-4 text-2xl font-bold text-brand-sea-dark">
          Your shopping list is empty
        </h1>
        <p className="mt-3 text-brand-sea-dark/70">
          Add recipes from the weekly planner first, and your ingredient list will appear here
          automatically.
        </p>
        <Link
          href="/planner"
          className="mt-6 inline-block rounded-full bg-brand-sea px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-sea-dark"
        >
          Go to Weekly Planner
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <div className="animate-fade-in-up">
        <h1 className="font-display text-3xl font-bold text-brand-sea-dark">Shopping List</h1>
        <p className="mt-2 text-brand-sea-dark/70">
          A consolidated ingredient list, generated automatically from your weekly plan.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-brand-border bg-brand-card p-5 animate-fade-in-up">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display font-semibold text-brand-sea-dark">
              Order from bodrumfoods.co.uk
            </h2>
            <p className="mt-1 text-xs text-brand-sea-dark/60">
              {matched.length} ingredients found in the store catalogue.
              {unmatched.length > 0 &&
                ` ${unmatched.length} ingredient${unmatched.length > 1 ? "s have" : " has"} no match (likely fresh produce).`}
            </p>
          </div>
          {cartReady.length > 0 ? (
            <a
              href={cartUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-brand-terracotta px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-90"
            >
              Add to Cart ({cartReady.length})
            </a>
          ) : (
            <span className="text-sm text-brand-sea-dark/50">
              One-click add to cart coming soon
            </span>
          )}
        </div>
        {pendingId.length > 0 && (
          <p className="mt-3 text-xs text-brand-sea-dark/50">
            {pendingId.length} product{pendingId.length > 1 ? "s were" : " was"} found in the
            store but can&apos;t be added automatically yet (no product variant ID on file) —
            open the product page below and add it manually.
          </p>
        )}
        {cartReady.length > 0 && (
          <p className="mt-3 text-xs text-brand-sea-dark/50">
            Each product is added to the cart as 1 unit; check the required amount below and
            adjust quantities in your {SHOPIFY_STORE_DOMAIN} cart as needed.
          </p>
        )}
      </div>

      <section className="mt-8 animate-fade-in-up">
        <h2 className="font-display mb-3 text-lg font-semibold text-brand-sea-dark">
          Available in the store
        </h2>
        <ul className="divide-y divide-brand-border/70 rounded-2xl border border-brand-border bg-brand-card">
          {matched.map((item) => (
            <li
              key={item.key}
              className="flex items-center justify-between gap-3 px-4 py-3 text-sm"
            >
              <div>
                <p className="font-medium capitalize text-brand-sea-dark">{item.name}</p>
                <p className="text-xs text-brand-sea-dark/50">{item.productTitle}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium text-brand-sea-dark">
                  {item.amount} {item.unit}
                </span>
                {!item.variantId && (
                  <a
                    href={productPageUrl(item.handle)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap rounded-full border border-brand-border px-3 py-1 text-xs font-medium text-brand-sea-dark hover:border-brand-sea"
                  >
                    View Product
                  </a>
                )}
              </div>
            </li>
          ))}
          {matched.length === 0 && (
            <li className="px-4 py-3 text-sm text-brand-sea-dark/50">No matching ingredients.</li>
          )}
        </ul>
      </section>

      {unmatched.length > 0 && (
        <section className="mt-8 animate-fade-in-up">
          <h2 className="font-display mb-3 text-lg font-semibold text-brand-sea-dark">
            Not available in the store
          </h2>
          <ul className="divide-y divide-brand-border/70 rounded-2xl border border-brand-border bg-brand-card">
            {unmatched.map((item) => (
              <li
                key={item.key}
                className="flex items-center justify-between gap-3 px-4 py-3 text-sm"
              >
                <span className="capitalize text-brand-sea-dark">{item.name}</span>
                <span className="font-medium text-brand-sea-dark">
                  {item.amount} {item.unit}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-brand-sea-dark/50">
            These are mostly fresh produce, meat, or dairy items that bodrumfoods.co.uk doesn&apos;t
            carry — pick them up at your local market.
          </p>
        </section>
      )}
    </div>
  );
}
