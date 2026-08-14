import shopifyMapData from "@/data/shopify-ingredient-map.json";
import type { ShoppingListItem } from "@/lib/shopping-list";

interface ShopifyMapping {
  ingredient: string;
  variantId: string;
  productTitle: string;
}

const mappings = shopifyMapData.mappings as ShopifyMapping[];
const mappingByIngredient = new Map(mappings.map((m) => [m.ingredient.toLowerCase(), m]));

export const SHOPIFY_STORE_DOMAIN =
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "bodrumfoods.co.uk";

export interface MatchedItem extends ShoppingListItem {
  variantId: string;
  productTitle: string;
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
      matched.push({ ...item, variantId: mapping.variantId, productTitle: mapping.productTitle });
    } else {
      unmatched.push(item);
    }
  }

  return { matched, unmatched };
}

/**
 * Shopify cart permalink: https://{domain}/cart/{variantId}:{qty},{variantId2}:{qty2}
 * Miktar (adet, g, ml vb.) ürün paket boyutuna göre değişeceğinden her eşlenmiş
 * malzeme için 1 adet ürün sepete eklenir; gereken miktar sayfada ayrıca gösterilir
 * ve kullanıcı sepette adedi kendi ihtiyacına göre güncelleyebilir.
 */
export function buildShopifyCartUrl(matched: MatchedItem[]): string {
  const parts = matched.map((item) => `${item.variantId}:1`);
  return `https://${SHOPIFY_STORE_DOMAIN}/cart/${parts.join(",")}`;
}
