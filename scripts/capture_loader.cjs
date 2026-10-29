const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 950 } });
  const page = await context.newPage();

  console.log('Capturing Light Theme Loading Page at stage 3...');
  await page.goto('http://localhost:5173/?replayIntro=1', { waitUntil: 'commit' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'verification_screenshots/01_light_theme_loader_full.png', timeout: 5000 });
  console.log('Saved 01_light_theme_loader_full.png');

  await browser.close();
})();
