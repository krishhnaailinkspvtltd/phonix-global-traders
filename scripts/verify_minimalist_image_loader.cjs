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
  
  // 1. Capture Big Monumental Letters Building on Editorial Image
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(600); // Stage 1: Big monumental letters P-H-O-N-I-X building
  await page.screenshot({ path: path.join(outDir, '22_minimalist_image_loader_big_font.png') });
  console.log('Captured 22_minimalist_image_loader_big_font.png');

  // 2. Capture Company Logo Formed Stage
  await page.waitForTimeout(900); // Stage 2: Logo formed from big font
  await page.screenshot({ path: path.join(outDir, '23_minimalist_image_loader_logo_formed.png') });
  console.log('Captured 23_minimalist_image_loader_logo_formed.png');

  // 3. Wait for loading screen to complete and exit into homepage
  await page.waitForTimeout(1600);

  // 4. Capture Home page at TOP (invisible header, only options)
  await page.screenshot({ path: path.join(outDir, '24_homepage_top_invisible_header.png') });
  console.log('Captured 24_homepage_top_invisible_header.png');

  // 5. Scroll down to show Water-Effect Glassmorphic Dynamic Island
  await page.evaluate(() => window.scrollTo(0, 520));
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(outDir, '25_homepage_scrolled_water_island.png') });
  console.log('Captured 25_homepage_scrolled_water_island.png');

  await browser.close();
  console.log('All verification screenshots captured successfully!');
}

run().catch(err => {
  console.error('Error during verification:', err);
  process.exit(1);
});
