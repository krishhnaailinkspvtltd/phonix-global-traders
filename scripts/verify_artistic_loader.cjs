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
  
  // 1. Capture Artistic Alphabets Connecting
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(600); // Capture mid-connecting of artistic alphabets
  await page.screenshot({ path: path.join(outDir, '18_artistic_alphabets_connecting.png') });
  console.log('Captured 18_artistic_alphabets_connecting.png');

  // 2. Capture Formed Logo & Artistic Signature
  await page.waitForTimeout(1400); // step >= 3, logo and title fully formed
  await page.screenshot({ path: path.join(outDir, '19_artistic_logo_formed.png') });
  console.log('Captured 19_artistic_logo_formed.png');

  // 3. Wait for loading screen to complete and exit into homepage
  await page.waitForTimeout(1600);

  // 4. Capture Home page at TOP (invisible header, only options)
  await page.screenshot({ path: path.join(outDir, '20_homepage_top_invisible_header.png') });
  console.log('Captured 20_homepage_top_invisible_header.png');

  // 5. Scroll down to show Water-Effect Glassmorphic Dynamic Island
  await page.evaluate(() => window.scrollTo(0, 520));
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(outDir, '21_homepage_scrolled_water_island.png') });
  console.log('Captured 21_homepage_scrolled_water_island.png');

  await browser.close();
  console.log('All verification screenshots captured successfully!');
}

run().catch(err => {
  console.error('Error during verification:', err);
  process.exit(1);
});
