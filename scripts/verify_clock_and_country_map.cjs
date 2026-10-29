const { chromium } = require('playwright');
const path = require('path');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1100 }
  });
  const page = await context.newPage();

  const outDir = 'C:/Users/KRISHNA AI LINKS/.gemini/antigravity/brain/0eb7c317-f688-49b2-b51f-a4c7507f4e44';

  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
  
  // Dismiss loader
  await page.waitForTimeout(1000);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(1500);

  // Scroll directly to the map & clock grid
  await page.evaluate(() => {
    const el = document.querySelector('.grid.grid-cols-1.lg\\:grid-cols-12.gap-8.items-stretch');
    if (el) el.scrollIntoView({ block: 'center', behavior: 'instant' });
  });
  await page.waitForTimeout(3000); // Allow Esri Ocean tiles & clock to settle

  // 1. Capture Main View: Real Map with Served Country Points & Names + Global World Clock
  await page.screenshot({ path: path.join(outDir, '48_served_countries_map_and_global_clock.png') });
  console.log('Captured 48_served_countries_map_and_global_clock.png');

  // 2. Click "Dubai" desk in Global Clock to verify live timezone switch
  const dubaiDeskBtn = page.locator('button:has-text("Dubai")').first();
  if (await dubaiDeskBtn.isVisible()) {
    await dubaiDeskBtn.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(outDir, '49_global_clock_dubai_selected.png') });
    console.log('Captured 49_global_clock_dubai_selected.png');
  }

  // 3. Click on a country point on the map to verify glass popup
  const countryPin = page.locator('.country-marker-pin').nth(1); // UAE or next country
  if (await countryPin.isVisible()) {
    await countryPin.click({ force: true });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(outDir, '50_served_country_popup.png') });
    console.log('Captured 50_served_country_popup.png');
  }

  // 4. Click "Vector Nautical" toggle
  const vectorBtn = page.locator('button:has-text("Vector Nautical")');
  if (await vectorBtn.isVisible()) {
    await vectorBtn.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(outDir, '51_vector_chart_with_country_names.png') });
    console.log('Captured 51_vector_chart_with_country_names.png');
  }

  await browser.close();
  console.log('All verification screenshots captured cleanly!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
