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
const FEED_TOKEN = process.env.STERNACART_FEED_TOKEN ?? '093de65825cde2efd43ca7855db2efc2cd6e2645b62d6e09f3fa8e93a29c645c';
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
function normalizeCategory(rawCategory) {
  const lower = rawCategory.toLowerCase();
  if (lower.includes('keychain') || lower.includes('gantungan')) return 'Keychain';
  if (lower.includes('game') || lower.includes('konsol') || lower.includes('controller') || lower.includes('ps5') || lower.includes('ps4') || lower.includes('xbox')) return 'Gaming Accessories';
  if (lower.includes('desk') || lower.includes('meja') || lower.includes('pensil') || lower.includes('organizer') || lower.includes('komputer') || lower.includes('stand') || lower.includes('holder') || lower.includes('mac')) return 'Desk Accessories';
  if (lower.includes('hiasan') || lower.includes('dekor') || lower.includes('keranjang') || lower.includes('home') || lower.includes('rumah') || lower.includes('buku')) return 'Home Decor';
  if (lower.includes('miniatur') || lower.includes('figure') || lower.includes('collectible')) return 'Miniature';
  return rawCategory || 'Lainnya';
}

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
    category: normalizeCategory(p.category),
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
