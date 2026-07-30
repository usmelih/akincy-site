import type { RouteKey } from '../i18n/routes';

/**
 * Case studies — STAGED, NOT PUBLISHED.
 *
 * The pages were removed on purpose; this data and its layout support stay so the
 * section can be switched back on without rewriting it. To publish:
 *   1. add `cases: { tr: '/vakalar' }` to ROUTES in src/i18n/routes.ts
 *   2. restore src/pages/tr/vakalar/ (see git history: the commit that removed it)
 *   3. re-add the nav entry in BaseLayout (`strings.nav.cases` already exists)
 *
 * These are written **anonymised on purpose**: sector and city, no client name.
 * That needs no client approval and lets us describe the actual work honestly.
 *
 * Two fields are deliberately empty until real data exists:
 *  - `metrics` renders only when filled. Do not put estimates here; the whole
 *    point of the rank-tracking service is that numbers are measured.
 *  - `client` / `quote` turn an anonymised case into a named one. Fill them in
 *    only after the client has agreed in writing.
 */

export interface CaseMetric {
  label: string;
  before: string;
  after: string;
}

export interface CaseStudy {
  slug: string;
  /** Sector + city headline, e.g. "Mersin'de bir hukuk bürosu". */
  subject: string;
  sector: string;
  city: string;
  /** One line for the hub card. */
  summary: string;
  /** Named client — only with written permission. */
  client?: string;
  situation: string[];
  work: string[];
  outcome: string[];
  /** Rendered only when measured numbers exist. */
  metrics: CaseMetric[];
  quote?: { text: string; author: string };
  services: RouteKey[];
  industry?: RouteKey;
}

export const CASES: CaseStudy[] = [
  {
    slug: 'mersin-hukuk-burosu-arabuluculuk',
    subject: "Mersin'de bir hukuk bürosu",
    sector: 'Hukuk',
    city: 'Mersin',
    summary:
      'Arabuluculuk hizmeti profilde birincil kategoriye alınmıştı ve büro "avukat" aramalarında görünmüyordu. Kategori yapısı ve eksik hizmet sayfaları yeniden kuruldu.',
    situation: [
      'Büro hem avukatlık hem arabuluculuk yapıyordu ve Google İşletme Profili’nde birincil kategori "Arabulucu" olarak seçilmişti. Bu, arama hacminin ezici çoğunluğunu oluşturan "avukat" sorgularındaki görünürlüğü doğrudan baskılıyordu.',
      'Sitede çalışma alanları tek bir sayfada, her biri birkaç paragrafla anlatılıyordu. Dava türü sorgularının hiçbirinde karşılık gelen bir sayfa yoktu.',
    ],
    work: [
      'Birincil kategori ana hizmete alındı, arabuluculuk ikincil kategori olarak eklendi',
      'Profildeki hizmet listesi, sitedeki sayfa isimlendirmesiyle birebir eşitlendi',
      'Arabuluculuk için ayrı ve kapsamlı bir hizmet sayfası yazıldı (HUAK çerçevesi dahil)',
      'Mevcut altı çalışma alanı sayfası, süreç–süre–belge–SSS yapısıyla derinleştirildi',
      'LegalService yapılandırılmış verisi kuruldu ve işletme varlığına bağlandı',
      'Tüm metinler TBB Reklam Yasağı Yönetmeliği süzgecinden geçirildi; başarı vaadi, müvekkil sayısı ve üstünlük iddiası içeren ifade kullanılmadı',
    ],
    outcome: [
      'Kategori düzeltmesi, bu vakada tek başına en yüksek etkili müdahaleydi: profil, arabuluculuk sorgularındaki konumunu korurken avukatlık sorgularının değerlendirme havuzuna girdi.',
      'Dava türü sayfaları, daha önce hiç karşılığı olmayan sorgularda gösterim almaya başladı. Bu sorgular yakınlık sinyali taşımadığı için görünürlük şehir sınırının dışına da çıktı.',
    ],
    metrics: [],
    services: ['services/gbp', 'services/content', 'services/on-page-seo'],
    industry: 'industries/law',
  },
  {
    slug: 'bursa-oto-ekspertiz-yorum-profil',
    subject: "Bursa Nilüfer'de bir oto ekspertiz noktası",
    sector: 'Oto ekspertiz',
    city: 'Bursa',
    summary:
      'Tesisin bulunduğu noktada birinciydi, 4 km ötede ilk yirmide değildi. Dar grid ölçümü sorunu yakınlık dışı sinyallerde gösterdi.',
    situation: [
      'İşletme sahibi kendi tesisinden arattığında hep birinci sırayı görüyordu, ama gelen telefon sayısı bunu doğrulamıyordu. Bu, sektörde en sık karşılaştığımız yanılgı: kendi konumundan yapılan arama ölçüm değildir.',
      'Profil aktif kullanılmıyordu; foto seti kuruluştan kalmaydı ve yorumlara yanıt verilmiyordu.',
    ],
    work: [
      '3–5 km yarıçapında dar bir 7×7 grid kuruldu; şehir geneline yayılmış ölçüm bu sektörde anlamsız veri üretiyor',
      'İlk üçteki rakipler için aynı grid çalıştırılıp değerlendirme hacmi farkı sayısal olarak çıkarıldı',
      'Rapor teslim anında QR ile çalışan, teşvik içermeyen bir değerlendirme akışı kuruldu',
      'Gerçek tesis fotoğrafları (dış cephe ve tabela, lift, cihazlar, bekleme alanı) düzenli aralıklarla eklenmeye başlandı',
      'Tüm yorumlara, hizmet ve semt adını doğal biçimde içeren kısa yanıtlar yazıldı',
      'Sitede rapor örneği ve süreç sayfaları açıldı — "ne kadar sürer" ve "neye bakılır" sorgularının karşılığı',
    ],
    outcome: [
      'Grid deseni sorunu net gösterdi: merkezde güçlü, kenarlara doğru hızlı düşüş. Bu desen "yakınlık dışında güçlü sinyaliniz yok" anlamına geliyor ve müdahaleyi yorum hacmi ile profil tazeliğine yönlendirdi.',
      'Rakip karşılaştırması, farkın tahmin edilenden basit olduğunu gösterdi: aradaki temel açık değerlendirme sayısıydı.',
    ],
    metrics: [],
    services: ['services/rank-tracking', 'services/gbp'],
    industry: 'industries/vehicle-inspection',
  },
  {
    slug: 'fizyoterapi-klinigi-sikayet-icerigi',
    subject: 'Bir fizyoterapi kliniği',
    sector: 'Fizyoterapi',
    city: 'İstanbul',
    summary:
      'Site uygulanan yöntemleri anlatıyordu, hastalar ise şikâyetlerini arıyordu. İçerik hastanın diline çevrildi.',
    situation: [
      'Sitede manuel terapi, kuru iğneleme ve egzersiz terapisi gibi yöntemler anlatılıyordu. Oysa hastalar "bel fıtığı ağrısı geçmiyor" ya da "boyun tutulması ne yapmalı" diye arıyordu. İki dil arasındaki bu uçurum, sektördeki en büyük içerik boşluğu.',
      'Profil, klinik adresi olmasına rağmen adressiz kurulmuştu — bu, "yakınımdaki fizyoterapist" aramalarındaki görünürlüğün bir kısmını kaybettiriyordu.',
    ],
    work: [
      'Profil adresli yapıya çevrildi, evde hizmet ayrıca hizmet bölgesi olarak tanımlandı',
      'Kategori "Fizyoterapist" olarak düzeltildi; masaj terapisti kategorisi fizyoterapi sorgularında gösterim vermiyor',
      'Şikâyet bazlı sayfalar yazıldı: bel, boyun, omuz, diz ve ameliyat sonrası rehabilitasyon',
      '"İlk randevuda ne oluyor" sayfası eklendi — küçük görünen ama tereddüdü doğrudan azaltan sayfa',
      'Unvan kullanımı mevzuata uygun hale getirildi; tanı koyar görünen ve sonuç vaat eden ifadeler kaldırıldı',
    ],
    outcome: [
      'Şikâyet içerikleri yakınlık sinyali taşımadığı için ülke genelinde sıralanabilir hale geldi; hizmet sayfaları ise yerel talebi karşılamaya devam etti.',
      'Adresli profile geçiş, kliniğe yürüme mesafesindeki aramalarda görünürlüğü geri kazandırdı.',
    ],
    metrics: [],
    services: ['services/gbp', 'services/content'],
    industry: 'industries/physio',
  },
];

export const PUBLISHED_CASES = CASES;
