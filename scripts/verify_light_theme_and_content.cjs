const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 950 } });
  const page = await context.newPage();

  const outDir = path.join(__dirname, '../verification_screenshots');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 1. Capture the new Light Theme Loading Page
  console.log('Capturing Light Theme Loading Page...');
  await page.goto('http://localhost:5173/?replayIntro=1');
  await page.waitForTimeout(600); // mid-way through loading animation
  await page.screenshot({ path: path.join(outDir, '01_light_theme_loader.png') });
  console.log('Saved 01_light_theme_loader.png');

  // Wait for loader to finish and reveal the site
  await page.waitForTimeout(2500);

  // 2. Ensure Light Theme is active
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    localStorage.setItem('phonix_theme', 'light');
  });
  await page.waitForTimeout(400);

  // 3. Capture the proper fixed full-width Header & Hero
  await page.screenshot({
    path: path.join(outDir, '02_proper_header_and_hero_light.png'),
    clip: { x: 0, y: 0, width: 1440, height: 850 }
  });
  console.log('Saved 02_proper_header_and_hero_light.png');

  // 4. Scroll slightly to verify header remains rock-solid without any awkward gap or bleed-through
  await page.evaluate(() => window.scrollBy(0, 450));
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(outDir, '03_scrolled_header_solid_light.png'),
    clip: { x: 0, y: 0, width: 1440, height: 500 }
  });
  console.log('Saved 03_scrolled_header_solid_light.png');

  // 5. Scroll to Showcase (Dehydrated Vegetables & Fruits, Spices, Manufactured)
  const showcaseHeading = page.locator('text=EXPORT & IMPORT PORTFOLIO');
  await showcaseHeading.scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await page.screenshot({
    path: path.join(outDir, '04_product_showcase_dehydrated_agro.png'),
    fullPage: false
  });
  console.log('Saved 04_product_showcase_dehydrated_agro.png');

  // 6. Scroll to Realistic Map showing Mundra/JNPT Indian Export corridors
  const mapElement = page.locator('text=REALISTIC NAUTICAL CHART');
  await mapElement.scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  const mapCard = page.locator('.lg\\:col-span-8').first();
  await mapCard.screenshot({
    path: path.join(outDir, '05_indian_corridors_realistic_map.png')
  });
  console.log('Saved 05_indian_corridors_realistic_map.png');

  // 7. Click Products Page to check Indian Agro & Export Catalog
  await page.goto('http://localhost:5173/products', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(outDir, '06_products_catalog_page_light.png'),
    clip: { x: 0, y: 0, width: 1440, height: 950 }
  });
  console.log('Saved 06_products_catalog_page_light.png');

  await browser.close();
  console.log('All verification screenshots captured successfully!');
})();
