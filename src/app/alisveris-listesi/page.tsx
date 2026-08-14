"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePlanStore } from "@/lib/plan-store";
import { recipes } from "@/lib/recipes";
import { buildShoppingList } from "@/lib/shopping-list";
import { splitByShopifyMapping, buildShopifyCartUrl, SHOPIFY_STORE_DOMAIN } from "@/lib/shopify-cart";

export default function ShoppingListPage() {
  const entries = usePlanStore((state) => state.entries);
  const recipesById = useMemo(() => new Map(recipes.map((r) => [r.id, r])), []);

  const shoppingList = useMemo(
    () => buildShoppingList(entries, recipesById),
    [entries, recipesById]
  );

  const { matched, unmatched } = useMemo(() => splitByShopifyMapping(shoppingList), [shoppingList]);
  const cartUrl = useMemo(() => buildShopifyCartUrl(matched), [matched]);

  if (entries.length === 0) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-brand-sea-dark">Alışveriş listeniz boş</h1>
        <p className="mt-3 text-brand-sea-dark/70">
          Önce haftalık planlayıcıdan tarif ekleyin, malzeme listeniz burada otomatik oluşsun.
        </p>
        <Link
          href="/planlayici"
          className="mt-6 inline-block rounded-full bg-brand-sea px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-sea-dark"
        >
          Haftalık Planlayıcıya Git
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-brand-sea-dark">Alışveriş Listesi</h1>
      <p className="mt-2 text-brand-sea-dark/70">
        Haftalık planınıza göre otomatik oluşturulan, birleştirilmiş malzeme listesi.
      </p>

      <div className="mt-8 rounded-2xl border border-brand-border bg-brand-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-brand-sea-dark">
              bodrumfoods.co.uk üzerinden sipariş ver
            </h2>
            <p className="mt-1 text-xs text-brand-sea-dark/60">
              {matched.length} malzeme mağazada bulundu ve sepete eklenmeye hazır.
              {unmatched.length > 0 && ` ${unmatched.length} malzeme için eşleşme bulunamadı.`}
            </p>
          </div>
          {matched.length > 0 ? (
            <a
              href={cartUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-brand-terracotta px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            >
              Sepete Ekle ({matched.length})
            </a>
          ) : (
            <span className="text-sm text-brand-sea-dark/50">Eşleşen ürün yok</span>
          )}
        </div>
        <p className="mt-3 text-xs text-brand-sea-dark/50">
          Sepete eklenen her ürün 1 adet olarak eklenir; gereken miktarı aşağıdaki listeden
          kontrol edip {SHOPIFY_STORE_DOMAIN} sepetinde adetleri güncelleyebilirsiniz.
        </p>
      </div>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-brand-sea-dark">
          Mağazada bulunan malzemeler
        </h2>
        <ul className="divide-y divide-brand-border/70 rounded-2xl border border-brand-border bg-brand-card">
          {matched.map((item) => (
            <li key={item.key} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
              <div>
                <p className="font-medium text-brand-sea-dark">{item.name}</p>
                <p className="text-xs text-brand-sea-dark/50">{item.productTitle}</p>
              </div>
              <span className="font-medium text-brand-sea-dark">
                {item.amount} {item.unit}
              </span>
            </li>
          ))}
          {matched.length === 0 && (
            <li className="px-4 py-3 text-sm text-brand-sea-dark/50">Eşleşen malzeme yok.</li>
          )}
        </ul>
      </section>

      {unmatched.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold text-brand-sea-dark">
            Mağazada eşlenmemiş malzemeler
          </h2>
          <ul className="divide-y divide-brand-border/70 rounded-2xl border border-brand-border bg-brand-card">
            {unmatched.map((item) => (
              <li key={item.key} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                <span className="text-brand-sea-dark">{item.name}</span>
                <span className="font-medium text-brand-sea-dark">
                  {item.amount} {item.unit}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-brand-sea-dark/50">
            Bu malzemeler için mağaza ürün eşlemesi henüz tanımlanmadı.
          </p>
        </section>
      )}
    </div>
  );
}
