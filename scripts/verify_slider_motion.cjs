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
  
  // Press Escape to dismiss loader instantly
  await page.waitForTimeout(300);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);

  // Scroll down to the Export & Import Portfolio section
  const sectionTitle = await page.$('text=EXPORT & IMPORT PORTFOLIO');
  if (sectionTitle) {
    await sectionTitle.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
  }

  // 1. Capture initial state (Division 01 active, card 1 centered with blue ring)
  await page.screenshot({ path: path.join(outDir, '29_slider_state_div01.png') });
  console.log('Captured 29_slider_state_div01.png (Division 01 active)');

  // 2. Click Next arrow to slide to Division 02
  const nextBtn = await page.$('button[aria-label="Next Category"]');
  if (nextBtn) {
    await nextBtn.click();
    await page.waitForTimeout(650);
    await page.screenshot({ path: path.join(outDir, '30_slider_slid_to_div02.png') });
    console.log('Captured 30_slider_slid_to_div02.png (slid to Division 02)');

    // 3. Click Next arrow again to slide to Division 03
    await nextBtn.click();
    await page.waitForTimeout(650);
    await page.screenshot({ path: path.join(outDir, '31_slider_slid_to_div03.png') });
    console.log('Captured 31_slider_slid_to_div03.png (slid to Division 03)');
  }

  // 4. Click Division 04 filter tab
  const div04Tab = await page.$('button:has-text("Global Import Commodities")');
  if (div04Tab) {
    await div04Tab.click();
    await page.waitForTimeout(650);
    await page.screenshot({ path: path.join(outDir, '32_slider_jumped_to_div04.png') });
    console.log('Captured 32_slider_jumped_to_div04.png (jumped to Division 04)');
  }

  await browser.close();
  console.log('All slider screenshots captured cleanly!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
