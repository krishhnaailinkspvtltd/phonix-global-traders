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
  
  // Wait for the loader to finish naturally and dismiss (~4.6s)
  await page.waitForTimeout(4800);

  // Scroll to Product Range section
  const sectionTitle = await page.$('text=Product Range');
  if (sectionTitle) {
    await sectionTitle.scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
  }

  // Capture Clean Initial 3D Coverflow Perspective
  await page.screenshot({ path: path.join(outDir, '33_carysil_3d_coverflow_initial.png') });
  console.log('Captured 33_carysil_3d_coverflow_initial.png cleanly!');

  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
