/**
 * Prebuild script: fetch products from SternaCart and generate src/data/products.js
 * Run: node scripts/fetch-products.mjs
 * Auto-run: configured as "prebuild" in package.json
 */

import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, '../src/data/products.js');

// Load .env manually (no external dependency)
try {
  const env = readFileSync(path.join(__dirname, '../.env'), 'utf8');
  for (const line of env.split('\n')) {
    const [key, ...rest] = line.split('=');
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
  }
} catch {}

const FEED_TOKEN = process.env.STERNACART_FEED_TOKEN;
if (!FEED_TOKEN) {
  console.error('ERROR: STERNACART_FEED_TOKEN is not set. Add it to .env or set as environment variable.');
  process.exit(1);
}

const API_URL = `https://cart.sternastudio.com/index.php?route=sternastudio/products&token=${FEED_TOKEN}`;

// Preserve all static exports (everything except `products` and `categories`)
function extractStaticExports(existingContent) {
  // Remove the auto-generated header comment if present
  const stripped = existingContent.replace(/^\/\/ AUTO-GENERATED[\s\S]*?\/\/ Source:[^\n]+\n/, '');
  // Remove `export const products = [...];` and `export const categories = [...];`
  const cleaned = stripped
    .replace(/export const products\s*=\s*\[[\s\S]*?\];\n?/, '')
    .replace(/export const categories\s*=\s*\[[\s\S]*?\];\n?/, '')
    .trim();
  return cleaned || null;
}

// Derive category label from SternaCart category name

async function main() {
  console.log('Fetching products from SternaCart...');

  let data;
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = await res.json();
  } catch (err) {
    console.error('Failed to fetch products:', err.message);
    console.warn('Keeping existing products.js unchanged.');
    process.exit(0); // Don't fail the build
  }

  if (data.status !== 'success' || !Array.isArray(data.products)) {
    console.error('Unexpected API response:', data);
    process.exit(0);
  }

  console.log(`Fetched ${data.total} products.`);

  const decodeHtml = (str) =>
    str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'");

  const truncate = (str, max) => {
    if (!str || str.length <= max) return str ?? '';
    const cut = str.lastIndexOf(' ', max);
    return str.substring(0, cut > 0 ? cut : max) + '…';
  };

  const products = data.products.map((p) => ({
    id: p.id,
    name: decodeHtml(p.name),
    category: p.category,
    price: p.special !== null ? p.special : p.price,
    originalPrice: p.special !== null ? p.price : null,
    description: truncate(decodeHtml(p.description ?? ''), 150),
    image: p.image,
    badge: null,
    cartUrl: p.url,
  }));

  // Collect unique categories for the filter pills
  const categorySet = new Set(products.map((p) => p.category));
  const categories = ['Semua', ...Array.from(categorySet).sort()];

  // Read existing file to preserve `features` export
  let existingContent = '';
  try {
    existingContent = readFileSync(OUTPUT_PATH, 'utf8');
  } catch {}
  const featuresExport = extractStaticExports(existingContent);

  const productsJson = JSON.stringify(products, null, 2);
  const categoriesJson = JSON.stringify(categories, null, 2);

  const output = [
    '// AUTO-GENERATED — do not edit manually.',
    `// Last synced: ${new Date().toISOString()}`,
    '// Source: https://cart.sternastudio.com',
    '',
    `export const products = ${productsJson};`,
    '',
    `export const categories = ${categoriesJson};`,
    '',
    featuresExport ?? '',
  ]
    .join('\n')
    .trimEnd() + '\n';

  writeFileSync(OUTPUT_PATH, output, 'utf8');
  console.log(`Written to ${OUTPUT_PATH}`);
}

main();
