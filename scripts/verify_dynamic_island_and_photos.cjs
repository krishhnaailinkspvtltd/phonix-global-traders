const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  const outDir = path.resolve(__dirname, '..', 'screenshots_verification');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500); // Allow loading screen to exit smoothly

  // 1. Dynamic Island at Top
  await page.screenshot({ path: path.join(outDir, '01_dynamic_island_top.png') });
  console.log('Captured 01_dynamic_island_top.png');

  // 2. Scrolled state showing compact dynamic island
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, '02_dynamic_island_scrolled.png') });
  console.log('Captured 02_dynamic_island_scrolled.png');

  // 3. Pinned Product Scenes showing new photos
  await page.evaluate(() => window.scrollTo(0, 1600));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, '03_product_scenes_photos.png') });
  console.log('Captured 03_product_scenes_photos.png');

  // 4. Products Catalog Page
  await page.goto('http://localhost:5173/products', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, '04_products_catalog.png') });
  console.log('Captured 04_products_catalog.png');

  // 5. Mobile Viewport
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(outDir, '05_dynamic_island_mobile.png') });
  console.log('Captured 05_dynamic_island_mobile.png');

  await browser.close();
  console.log('All verification screenshots captured successfully!');
}

run().catch(err => {
  console.error('Error running verification:', err);
  process.exit(1);
});
