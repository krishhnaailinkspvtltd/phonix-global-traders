const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5173/?replayIntro=0 ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const outDir = path.join(__dirname, '../verification_screenshots');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 1. Capture Header & Hero
  await page.screenshot({
    path: path.join(outDir, '01_rounded_header_hero.png'),
    clip: { x: 0, y: 0, width: 1440, height: 800 }
  });
  console.log('Captured 01_rounded_header_hero.png');

  // 2. Scroll to Realistic Trade Map
  const mapHeading = page.locator('text=REALISTIC NAUTICAL CHART');
  await mapHeading.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(outDir, '02_realistic_world_map.png'),
    fullPage: false
  });
  console.log('Captured 02_realistic_world_map.png');

  // 3. Click different corridors to verify interactive routes & port highlights
  const transPacificTab = page.locator('button:has-text("Trans-Pacific Express")');
  if (await transPacificTab.isVisible()) {
    await transPacificTab.click();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(outDir, '03_realistic_world_map_transpacific.png'),
      fullPage: false
    });
    console.log('Captured 03_realistic_world_map_transpacific.png');
  }

  // 4. Scroll to Editorial & Closing CTA
  const editorialHeading = page.locator('text=SOVEREIGN STRUCTURE');
  await editorialHeading.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(outDir, '04_editorial_medium_typography.png'),
    fullPage: false
  });
  console.log('Captured 04_editorial_medium_typography.png');

  // 5. Scroll to Closing CTA & Footer
  const ctaHeading = page.locator('text=FROM HERE.');
  await ctaHeading.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(outDir, '05_closing_cta_footer.png'),
    fullPage: false
  });
  console.log('Captured 05_closing_cta_footer.png');

  await browser.close();
  console.log('All verification screenshots captured successfully!');
})();
