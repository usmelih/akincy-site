/**
 * vercel.json'u Vercel'in yayınladığı şemaya karşı doğrular.
 *
 * Gerekçesi: geçersiz bir vercel.json deploy'u komple düşürüyor ve hata
 * yalnızca Vercel loglarında görünüyor — build yerelde sorunsuz geçtiği için
 * fark edilmiyor. Bir kez `comment` alanı yüzünden production deploy'u
 * başarısız oldu; bu kontrol onu yerelde yakalar.
 *
 * Ağ yoksa sessizce geçer: CI olmayan ortamda build'i kırmasın.
 */
import { readFileSync } from 'node:fs';

const SCHEMA_URL = 'https://openapi.vercel.sh/vercel.json';
const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));

let schema;
try {
  const res = await fetch(SCHEMA_URL, { signal: AbortSignal.timeout(8000) });
  schema = await res.json();
} catch {
  console.log('vercel.json: şema alınamadı (ağ yok), kontrol atlandı');
  process.exit(0);
}

const errors = [];

/** Şemanın additionalProperties:false olan yerlerinde bilinmeyen alan var mı. */
function checkObject(value, node, path) {
  if (!node || typeof value !== 'object' || value === null) return;

  if (Array.isArray(value)) {
    const items = node.items;
    value.forEach((v, i) => checkObject(v, items, `${path}[${i}]`));
    return;
  }

  const props = node.properties ?? {};
  if (node.additionalProperties === false) {
    for (const key of Object.keys(value)) {
      if (!(key in props)) {
        errors.push(
          `${path}.${key} — şemada yok. İzin verilenler: ${Object.keys(props).join(', ')}`,
        );
      }
    }
  }
  for (const [key, child] of Object.entries(value)) {
    if (props[key]) checkObject(child, props[key], `${path}.${key}`);
  }
}

for (const [key, value] of Object.entries(config)) {
  if (key === '$schema') continue;
  const node = schema.properties?.[key];
  if (!node) {
    errors.push(`.${key} — vercel.json şemasında böyle bir üst seviye alan yok`);
    continue;
  }
  checkObject(value, node, `.${key}`);
}

if (errors.length) {
  console.error('vercel.json geçersiz — bu haliyle deploy başarısız olur:\n');
  for (const e of errors) console.error('  ✗ ' + e);
  process.exit(1);
}
console.log('vercel.json: şemaya uygun ✓');
