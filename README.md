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

## ⚠️ Before going live — enabling "Sign in with Google"

Membership (My Favourites list, Meal Plan History) uses [Auth.js](https://authjs.dev)
with Google as the sign-in provider. The heart icon and the current weekly plan work for
everyone without an account (stored in `localStorage`); signing in is only required to view
the aggregated **My Favourites** and **Meal Plan History** pages. Until the environment
variables below are set, the "Sign in" button will show an "AuthError" — this is expected.

1. Copy `.env.example` to `.env.local` (or add the same variables in the Vercel project's
   **Settings → Environment Variables**).
2. Generate `AUTH_SECRET`: `npx auth secret` (or any random 32+ byte string).
3. Create a Google OAuth 2.0 Client ID at
   [console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials):
   - Application type: **Web application**
   - Authorized redirect URI: `https://<your-domain>/api/auth/callback/google`
     (add `http://localhost:3000/api/auth/callback/google` too for local dev)
   - Copy the generated **Client ID** and **Client Secret** into `AUTH_GOOGLE_ID` and
     `AUTH_GOOGLE_SECRET`.
4. Redeploy. Once these are set, "Sign in with Google" works end to end.

Favourites and plan history are currently stored per-browser (`localStorage`), the same as
the weekly plan — signing in gates access to those pages but doesn't yet sync them across
devices. Real cross-device sync needs a database (e.g. Vercel Postgres or Supabase) wired up
to store `{ userId, recipeId }` favourites and plan snapshots server-side instead.

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
