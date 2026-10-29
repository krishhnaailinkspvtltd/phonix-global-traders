const { chromium } = require('playwright');
const path = require('path');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1150 }
  });
  const page = await context.newPage();

  const outDir = 'C:/Users/KRISHNA AI LINKS/.gemini/antigravity/brain/0eb7c317-f688-49b2-b51f-a4c7507f4e44';

  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
  
  // Wait out initial loader or press Escape
  await page.waitForTimeout(1000);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(1500);

  // Scroll directly to center the map card in viewport
  await page.evaluate(() => {
    const el = document.querySelector('.grid.grid-cols-1.lg\\:grid-cols-12.gap-8.items-stretch');
    if (el) el.scrollIntoView({ block: 'center', behavior: 'instant' });
  });
  await page.waitForTimeout(3000); // Allow Esri Ocean tiles & animations to settle

  // 1. Capture Real Interactive Map (Real Ocean Chart in Light Theme)
  await page.screenshot({ path: path.join(outDir, '43_real_map_ocean_light.png') });
  console.log('Captured 43_real_map_ocean_light.png');

  // 2. Click "Satellite Orbital" layer toggle
  const satelliteBtn = page.locator('button:has-text("Satellite Orbital")');
  if (await satelliteBtn.isVisible()) {
    await satelliteBtn.click();
    await page.waitForTimeout(2500); // Wait for satellite tiles
    await page.screenshot({ path: path.join(outDir, '44_real_map_satellite_orbital.png') });
    console.log('Captured 44_real_map_satellite_orbital.png');
  }

  // 3. Click "India-Europe Atlantic Highway" tab and re-center
  const europeTab = page.locator('button:has-text("India-Europe Atlantic Highway")');
  if (await europeTab.isVisible()) {
    await europeTab.click();
    await page.evaluate(() => {
      const el = document.querySelector('.grid.grid-cols-1.lg\\:grid-cols-12.gap-8.items-stretch');
      if (el) el.scrollIntoView({ block: 'center', behavior: 'instant' });
    });
    await page.waitForTimeout(3000); // Wait for smooth flyToBounds camera animation
    await page.screenshot({ path: path.join(outDir, '45_real_map_europe_corridor.png') });
    console.log('Captured 45_real_map_europe_corridor.png');
  }

  // Click on a port marker to verify interactive glass popup
  const portMarker = page.locator('.custom-port-marker').first();
  if (await portMarker.isVisible()) {
    await portMarker.click({ force: true });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(outDir, '47_real_map_port_popup.png') });
    console.log('Captured 47_real_map_port_popup.png');
  }

  // 4. Click "Vector Nautical" view engine toggle
  const vectorBtn = page.locator('button:has-text("Vector Nautical")');
  if (await vectorBtn.isVisible()) {
    await vectorBtn.click();
    await page.evaluate(() => {
      const el = document.querySelector('.grid.grid-cols-1.lg\\:grid-cols-12.gap-8.items-stretch');
      if (el) el.scrollIntoView({ block: 'center', behavior: 'instant' });
    });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(outDir, '46_vector_nautical_light_chart.png') });
    console.log('Captured 46_vector_nautical_light_chart.png');
  }

  await browser.close();
  console.log('All real map verification screenshots captured cleanly!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
