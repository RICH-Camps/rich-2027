// Build the independent Vercel fallback without changing SiteGround source HTML.
// Run: node build-standalone.mjs. No packages or network access are required.
import { cpSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const output = 'standalone-dist';
mkdirSync(output, { recursive: true });
cpSync('assets', join(output, 'assets'), { recursive: true });
const prefix = '/itineraries/2027/';
const fontBase = 'https://www.richcamps.com/assets/fonts/rich-zh-20261027/';
const pages = readdirSync('.').filter(name => name.endsWith('.html'));
if (pages.length !== 10) throw new Error(`Expected 10 public pages, found ${pages.length}`);
for (const name of pages) {
  let html = readFileSync(name, 'utf8');
  // Only root-relative navigation/resources change. Canonical URLs and JSON-LD
  // continue to identify the primary SiteGround pages to avoid SEO migration.
  html = html.replaceAll(`"${prefix}`, '"/').replaceAll(`'${prefix}`, "'/");
  html = html.replaceAll(fontBase, '/assets/standalone-20261030-');
  // These optional main-site planner links are outside the itinerary bundle.
  html = html.replaceAll('href="/shanghai.html', 'href="https://www.richcamps.com/shanghai.html')
    .replaceAll('href="/zh/shanghai.html', 'href="https://www.richcamps.com/zh/shanghai.html');
  // A backup must not depend on SiteGround for a stylesheet, script or image.
  if (/<(?:script|img|link)\b[^>]*(?:src|href)=["']https:\/\/www\.richcamps\.com\/assets\//i.test(html)) {
    throw new Error(`Unresolved primary-site asset dependency in ${name}`);
  }
  writeFileSync(join(output, name), html);
}
for (const name of ['robots.txt', 'sitemap.xml', 'rich-favicon.png', 'rich-favicon-2026.svg']) cpSync(name, join(output, name));
console.log(`Built ${pages.length} independent itinerary pages in ${output}`);
