# Akdeniz Mutfağı — Haftalık Yemek Planlayıcı

Akdeniz mutfağından (Türk, Yunan, İtalyan, İspanyol, Levanten, Fas) tarifler sunan, haftalık
yemek planı oluşturmaya ve plandan otomatik malzeme listesi çıkarmaya yarayan bir Next.js
uygulaması. Malzeme listesi, bodrumfoods.co.uk (Shopify) sepetine tek tıkla aktarılabilir.

## Özellikler

- `src/data/recipes.json` içinde 50 yapılandırılmış tarif (malzeme, ölçü, adım adım tarif).
  Sistem binlerce tarife ölçeklenecek şekilde tasarlandı — yeni tarifler bu dosyaya aynı
  şemayla eklenebilir veya ileride bir CMS/veritabanına taşınabilir.
- `/tarifler` — arama ve filtreleme (mutfak, öğün türü, diyet etiketi).
- `/planlayici` — 7 günlük plan, her güne birden fazla tarif eklenebilir, kişi sayısı
  ayarlanabilir. Plan tarayıcıda `localStorage`'da saklanır (`zustand` persist).
- `/alisveris-listesi` — plandaki tüm tariflerin malzemeleri birleştirilip (birim
  normalizasyonu ile: g/kg, ml/l) tek listeye dönüştürülür.
- Alışveriş listesindeki her malzeme, `src/data/shopify-ingredient-map.json` üzerinden bir
  bodrumfoods.co.uk ürün varyantına eşlenirse "Sepete Ekle" butonu bir
  [Shopify cart permalink](https://help.shopify.com/en/manual/products/details/cart-permalink)
  (`https://bodrumfoods.co.uk/cart/{variantId}:{qty},...`) oluşturur ve mağaza sepetini yeni
  sekmede açar.

## ⚠️ Canlıya almadan önce yapılması gerekenler

`src/data/shopify-ingredient-map.json` içindeki `variantId` değerleri **yer tutucudur**
(örn. `40000000000001`), gerçek bodrumfoods.co.uk ürünlerine karşılık gelmez. Gerçek
entegrasyon için:

1. Shopify admin panelinde **Products** bölümünden ilgili ürünleri açın; her varyantın
   sayısal ID'si ürün/varyant düzenleme sayfasının URL'sinde ya da Shopify Admin API /
   ürün JSON çıktısında görünür.
2. `shopify-ingredient-map.json` dosyasındaki `mappings` dizisinde her malzeme adını
   (`ingredient`, `src/data/recipes.json`'daki isimlerle birebir aynı ve küçük harf olmalı)
   gerçek `variantId` ve `productTitle` ile güncelleyin.
3. Mağaza alan adı `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` ortam değişkeniyle değiştirilebilir
   (varsayılan: `bodrumfoods.co.uk`).
4. Eşlemesi olmayan malzemeler alışveriş listesinde ayrı bir "mağazada eşlenmemiş" bölümünde
   gösterilir ve sepete otomatik eklenmez — bu, yanlış/var olmayan ürünlerin sepete
   eklenmesini önlemek içindir.
5. Sepete eklenen her ürün miktar olarak **1 adet** eklenir (paket boyutu bilgisi
   olmadığından); tarifin gerektirdiği gerçek miktar sayfada ayrıca gösterilir, kullanıcı
   Shopify sepetinde adetleri kendi ihtiyacına göre güncelleyebilir. Paket boyutu verisi
   eklenirse (`gramPerPackage` gibi) otomatik adet hesaplaması `src/lib/shopify-cart.ts`
   içine eklenebilir.

## Geliştirme

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) adresini açın.

```bash
npm run lint   # ESLint
npm run build  # Production build (tüm tarif sayfaları statik üretilir)
```

## Proje yapısı

```
src/
  data/
    recipes.json                  # Tarif veritabanı
    shopify-ingredient-map.json   # Malzeme -> Shopify varyant eşlemesi (placeholder)
  lib/
    types.ts                      # Recipe, Ingredient, PlanEntry tipleri
    recipes.ts                    # Tarif verisine erişim yardımcıları
    plan-store.ts                 # Haftalık plan state (zustand + localStorage)
    shopping-list.ts              # Malzeme birleştirme / birim normalizasyonu
    shopify-cart.ts               # Shopify cart permalink oluşturma
  components/                     # Header, Footer, RecipeCard, AddToPlanButton, Badge
  app/
    page.tsx                      # Anasayfa
    tarifler/                     # Tarif listesi + detay sayfaları
    planlayici/                   # Haftalık planlayıcı
    alisveris-listesi/            # Malzeme listesi + bodrumfoods.co.uk sepet entegrasyonu
```
