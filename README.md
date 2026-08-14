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

`src/data/shopify-ingredient-map.json`, gerçek bodrumfoods.co.uk ürün kataloğu (kullanıcının
yüklediği `products_export` CSV'si) taranarak oluşturuldu: 39 malzeme gerçek ürünlere
(`handle`, `sku`, `productTitle`) eşlendi. Ancak her eşlemenin `variantId` alanı hâlâ `null` —
standart Shopify ürün CSV export'u sayısal Variant ID içermez ve bu ortamdan
bodrumfoods.co.uk'a doğrudan ağ erişimi kurumsal proxy politikası tarafından engellendiği için
canlı siteden de çekilemedi. `variantId` dolana kadar "Sepete Ekle" tek-tık linki yerine
alışveriş listesinde her ürün için bir "Ürünü Gör" linki gösterilir (`/products/{handle}`).

Gerçek `variantId` değerlerini eklemek için üç yoldan biri kullanılabilir:

1. **Shopify Admin API (önerilen, ölçeklenebilir):** `read_products` yetkili salt okunur bir
   custom app oluşturup Admin API ile her `handle` için variant ID'leri toplu çekin, ardından
   `mappings` dizisindeki ilgili `variantId` alanlarını doldurun.
2. **Admin panelinden manuel:** Her ürünü **Products** bölümünde açın; varyantın sayısal ID'si
   düzenleme sayfasının URL'sinde görünür (`/admin/products/{productId}/variants/{variantId}`).
3. **ID içeren bir export aracı:** Matrixify gibi bazı Shopify export uygulamaları Variant ID
   kolonunu da içerir; böyle bir CSV varsa doğrudan eşleştirilebilir.

Diğer notlar:

- Mağaza alan adı `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` ortam değişkeniyle değiştirilebilir
  (varsayılan: `bodrumfoods.co.uk`).
- bodrumfoods.co.uk kataloğu ağırlıklı olarak kuru gıda, baharat, konserve/kavanoz ürünler,
  zeytin, bakliyat ve donmuş hazır yemeklerden oluşuyor; taze sebze, taze et, süt/yumurta gibi
  ürünler satılmıyor. Bu yüzden tariflerdeki taze malzemeler (domates, soğan, patates,
  salatalık, kıyma, yumurta vb.) kasıtlı olarak eşlenmedi ve alışveriş listesinde ayrı bir
  "mağazada bulunmayan malzemeler" bölümünde gösteriliyor.
- Eşlemesi olmayan malzemeler sepete otomatik eklenmez — bu, yanlış/var olmayan ürünlerin
  sepete eklenmesini önlemek içindir.
- Sepete eklenen her ürün miktar olarak **1 adet** eklenir (paket boyutu bilgisi
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
