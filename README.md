# akincy-site

Akincy'nin 3 dilli (EN / TR / DE) pazarlama sitesi. Astro ile statik üretilir, Vercel'de yayınlanır.

## Geliştirme

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ üretir
npm run preview
```

## URL yapısı

| Dil | Önek | Örnek |
| --- | --- | --- |
| EN (varsayılan) | yok | `/`, `/services/...` |
| TR | `/tr` | `/tr`, `/tr/hizmetler/...` |
| DE | `/de` | `/de`, `/de/leistungen/...` |

Sondaki slash yok (`trailingSlash: 'never'` + `vercel.json`). Eski `/sitemap.xml`
adresi `/sitemap-index.xml`'e yönlendirilir, böylece Search Console'daki kayıt bozulmaz.

## Dizinler

```
src/
  layouts/BaseLayout.astro   ortak <head>, nav, footer, hreflang, canonical
  i18n/config.ts             locale listesi, hreflang/og eşlemeleri
  i18n/routes.ts             merkezî rota haritası — her sayfanın dile göre slug'ı
  i18n/ui.ts                 nav + footer metinleri (dile göre)
  lib/schema.ts              Organization / WebSite JSON-LD (tek entity, sabit @id)
  pages/                     EN kökte, TR /tr altında, DE /de altında
public/                      statik dosyalar; apply/ ve success/ hâlâ elle yazılmış HTML
```

## Çok dillilik kuralı

Her sayfanın `src/i18n/routes.ts` içinde tek bir anahtarı ve dile göre slug'ı vardır:

```ts
'services/local-seo': {
  en: '/services/local-seo',
  tr: '/hizmetler/yerel-seo',
  de: '/leistungen/lokale-seo',
},
```

Sayfa dosyası bu anahtarı `BaseLayout`'a verir (`route="services/local-seo"`);
canonical, hreflang kümesi, dil değiştirici ve sitemap girdisi oradan üretilir.
Elle hreflang yazılmaz.

Bu harita iki kuralı zorunlu kılar:

1. **Slug'lar dile göre değişir.** Türkçe sorguda sıralanacak sayfanın URL'i de
   Türkçe olmalı.
2. **Karşılığı olmayan dile hreflang verilmez.** Pazara özgü sayfalar (TR şehir
   sayfaları gibi) haritada sadece `tr` anahtarı taşır; o sayfada EN/DE hreflang
   üretilmez ve dil değiştirme linki o dilin ana sayfasına düşer.

Bir dilde çevirisi olmayan rotayı o dilde çağırmak build'i hata ile durdurur —
sessizce kırık hreflang üretmesindense.
