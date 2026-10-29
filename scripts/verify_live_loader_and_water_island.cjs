const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  const outDir = 'C:/Users/KRISHNA AI LINKS/.gemini/antigravity/brain/0eb7c317-f688-49b2-b51f-a4c7507f4e44';

  console.log('Navigating to http://localhost:5173/ ...');
  
  // 1. Capture Live Logo Building Loader Screen
  await page.goto('http://localhost:5173/', { waitUntil: 'commit' });
  await page.waitForTimeout(950); // Capture mid-construction of logo & PHONIX letters
  await page.screenshot({ path: path.join(outDir, '12_live_logo_building_loader.png') });
  console.log('Captured 12_live_logo_building_loader.png');

  // Wait for loading screen to complete and unmount
  await page.waitForTimeout(2000);

  // 2. Capture Home page at TOP: Header is invisible, only clean options float over hero
  await page.screenshot({ path: path.join(outDir, '13_homepage_top_invisible_header.png') });
  console.log('Captured 13_homepage_top_invisible_header.png');

  // 3. Scroll down to trigger the Water-Effect Glassmorphic Dynamic Island
  await page.evaluate(() => window.scrollTo(0, 480));
  await page.waitForTimeout(650);
  await page.screenshot({ path: path.join(outDir, '14_homepage_scrolled_water_island.png') });
  console.log('Captured 14_homepage_scrolled_water_island.png');

  // 4. Products Subpage showing the water glass Dynamic Island
  await page.goto('http://localhost:5173/products', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, '15_subpage_water_island.png') });
  console.log('Captured 15_subpage_water_island.png');

  await browser.close();
  console.log('All verification screenshots captured successfully!');
}

run().catch(err => {
  console.error('Error during verification:', err);
  process.exit(1);
});
