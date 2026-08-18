import shopifyMapData from "@/data/shopify-ingredient-map.json";
import type { ShoppingListItem } from "@/lib/shopping-list";

interface ShopifyMapping {
  ingredient: string;
  handle: string;
  productTitle: string;
  sku: string;
  variantId: string | null;
}

const mappings = shopifyMapData.mappings as ShopifyMapping[];
const mappingByIngredient = new Map(mappings.map((m) => [m.ingredient.toLowerCase(), m]));

export const SHOPIFY_STORE_DOMAIN =
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "bodrumfoods.co.uk";

export interface MatchedItem extends ShoppingListItem {
  handle: string;
  productTitle: string;
  variantId: string | null;
}

export function productPageUrl(handle: string): string {
  return `https://${SHOPIFY_STORE_DOMAIN}/products/${handle}`;
}

export function splitByShopifyMapping(items: ShoppingListItem[]): {
  matched: MatchedItem[];
  unmatched: ShoppingListItem[];
} {
  const matched: MatchedItem[] = [];
  const unmatched: ShoppingListItem[] = [];

  for (const item of items) {
    const mapping = mappingByIngredient.get(item.name.toLowerCase());
    if (mapping) {
      matched.push({
        ...item,
        handle: mapping.handle,
        productTitle: mapping.productTitle,
        variantId: mapping.variantId,
      });
    } else {
      unmatched.push(item);
    }
  }

  return { matched, unmatched };
}

/**
 * Shopify cart permalink: https://{domain}/cart/{variantId}:{qty},{variantId2}:{qty2}
 * Only items with a known real variantId are included. Since the required amount
 * (pcs, g, ml, etc.) varies from package size, each matched ingredient adds 1 unit
 * to the cart; the actual amount needed is shown on the page and the user can
 * adjust quantities in their Shopify cart.
 */
export function buildShopifyCartUrl(matched: MatchedItem[]): string {
  const withVariant = matched.filter((item): item is MatchedItem & { variantId: string } =>
    Boolean(item.variantId)
  );
  const parts = withVariant.map((item) => `${item.variantId}:1`);
  return `https://${SHOPIFY_STORE_DOMAIN}/cart/${parts.join(",")}`;
}
