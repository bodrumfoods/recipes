# Mediterranean Table — Weekly Meal Planner

A Next.js app that showcases Mediterranean recipes (Turkish, Greek, Italian, Spanish,
Levantine, Moroccan), lets you build a weekly meal plan, and generates a consolidated
shopping list from that plan. The list can be pushed to a bodrumfoods.co.uk (Shopify)
cart in one click.

## Features

- `src/data/recipes.json` holds 50 structured recipes (ingredients, quantities, step-by-step
  method). The schema is designed to scale to thousands of recipes — new ones can be added in
  the same shape, or the data can later move to a CMS/database.
- `/recipes` — search and filter by cuisine, meal type, and diet tag.
- `/planner` — a 7-day plan; add multiple recipes per day and adjust servings. The plan is
  persisted in the browser via `localStorage` (`zustand` persist).
- `/shopping-list` — merges the ingredients from every recipe in the plan into one list, with
  unit normalisation (g/kg, ml/l).
- Each ingredient on the shopping list that has a match in
  `src/data/shopify-ingredient-map.json` gets an "Add to Cart" button that builds a
  [Shopify cart permalink](https://help.shopify.com/en/manual/products/details/cart-permalink)
  (`https://bodrumfoods.co.uk/cart/{variantId}:{qty},...`) and opens the store cart in a new
  tab.

## ⚠️ Before going live

`src/data/shopify-ingredient-map.json` was built from the real bodrumfoods.co.uk product
catalogue (the `products_export` CSV the user provided): 39 ingredients are mapped to real
products (`handle`, `sku`, `productTitle`). However, every mapping's `variantId` field is
still `null` — the standard Shopify product CSV export doesn't include numeric variant IDs,
and this environment's network egress policy blocks direct access to bodrumfoods.co.uk, so
live IDs couldn't be fetched either. Until `variantId` is filled in, the shopping list shows a
"View Product" link (`/products/{handle}`) instead of a one-click cart add.

There are three ways to fill in real `variantId` values:

1. **Shopify Admin API (recommended, scalable):** create a read-only custom app with the
   `read_products` scope, fetch the variant ID for each `handle` in bulk via the Admin API,
   then fill in the corresponding `variantId` fields in the `mappings` array.
2. **Manually from the admin panel:** open each product under **Products**; the numeric
   variant ID appears in the edit page's URL (`/admin/products/{productId}/variants/{variantId}`).
3. **An export tool that includes IDs:** some Shopify export apps (e.g. Matrixify) include a
   Variant ID column; such a CSV can be matched directly.

Other notes:

- The store domain can be changed via the `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` environment
  variable (default: `bodrumfoods.co.uk`).
- The bodrumfoods.co.uk catalogue is mostly pantry items — dry goods, spices, tinned/jarred
  products, olives, pulses, and frozen ready meals; it doesn't carry fresh produce, fresh
  meat, milk, or eggs. Fresh ingredients in the recipes (tomato, onion, potato, cucumber,
  minced meat, egg, etc.) are therefore deliberately left unmapped and shown separately under
  "Not available in the store" on the shopping list.
- Unmapped ingredients are never added to the cart automatically — this avoids adding the
  wrong (or nonexistent) product.
- Every product added to the cart defaults to a quantity of **1** (package size data isn't
  available); the actual amount a recipe needs is shown on the page, and the user can adjust
  quantities in their Shopify cart. If package-size data (e.g. `gramPerPackage`) is added
  later, automatic quantity calculation can be added to `src/lib/shopify-cart.ts`.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint   # ESLint
npm run build  # Production build (all recipe pages are statically generated)
```

## Project structure

```
src/
  data/
    recipes.json                  # Recipe database
    shopify-ingredient-map.json   # Ingredient -> Shopify product mapping
  lib/
    types.ts                      # Recipe, Ingredient, PlanEntry types
    recipes.ts                    # Recipe data access helpers
    plan-store.ts                 # Weekly plan state (zustand + localStorage)
    shopping-list.ts              # Ingredient merging / unit normalisation
    shopify-cart.ts               # Shopify cart permalink builder
  components/                     # Header, Footer, RecipeCard, AddToPlanButton, Badge
  app/
    page.tsx                      # Home page
    recipes/                      # Recipe list + detail pages
    planner/                      # Weekly planner
    shopping-list/                # Ingredient list + bodrumfoods.co.uk cart integration
```
