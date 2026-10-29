const { chromium } = require('playwright');
const path = require('path');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  const outDir = 'C:/Users/KRISHNA AI LINKS/.gemini/antigravity/brain/0eb7c317-f688-49b2-b51f-a4c7507f4e44';

  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
  
  // Dismiss loader
  await page.waitForTimeout(4600);

  // 1. Capture Homepage Top: 100% Transparent Header + Blur Transparent Hero Buttons
  await page.screenshot({ path: path.join(outDir, '37_header_100pct_transparent_top.png') });
  console.log('Captured 37_header_100pct_transparent_top.png');

  // 2. Scroll down 400px to trigger 30% Blur Transparent Glass Header
  await page.evaluate(() => window.scrollTo(0, 450));
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, '38_header_30pct_blur_transparent_glass.png') });
  console.log('Captured 38_header_30pct_blur_transparent_glass.png');

  // 3. Navigate to /products client-side to verify Products Page Glassmorphism & Buttons
  await page.click('a[href="/products"]');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, '39_products_glassmorphism_buttons.png') });
  console.log('Captured 39_products_glassmorphism_buttons.png');

  // 4. Navigate to /contact client-side to verify Contact Form Glassmorphism & Submit Button
  await page.click('a[href="/contact"]');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, '40_contact_glassmorphic_form.png') });
  console.log('Captured 40_contact_glassmorphic_form.png');

  await browser.close();
  console.log('All verification screenshots captured cleanly!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
