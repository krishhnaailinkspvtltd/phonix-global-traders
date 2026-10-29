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
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2200); // Allow entrance screen to finish

  // 1. Redesigned clean header at top
  await page.screenshot({ path: path.join(outDir, '08_clean_header_top.png') });
  console.log('Captured 08_clean_header_top.png');

  // 2. Scrolled state of clean header
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, '09_clean_header_scrolled.png') });
  console.log('Captured 09_clean_header_scrolled.png');

  // 3. Redesigned clean footer at bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, '10_clean_footer.png') });
  console.log('Captured 10_clean_footer.png');

  // 4. Products page header and footer
  await page.goto('http://localhost:5173/products', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, '11_clean_products_page.png') });
  console.log('Captured 11_clean_products_page.png');

  await browser.close();
  console.log('Verification finished successfully!');
}

run().catch(err => {
  console.error('Error running verification:', err);
  process.exit(1);
});
