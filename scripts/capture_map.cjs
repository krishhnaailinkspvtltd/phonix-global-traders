const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  
  // Set session storage so intro does not block
  await page.addInitScript(() => {
    sessionStorage.setItem('phonix_intro_shown', 'true');
  });

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Capture Header & Hero
  await page.screenshot({ path: 'verification_screenshots/01_hero_with_rounded_header.png' });

  // 2. Scroll to and capture the actual Map Card
  const mapCard = page.locator('.lg\\:col-span-8').first();
  await mapCard.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await mapCard.screenshot({ path: 'verification_screenshots/02_realistic_map_canvas_element.png' });

  // 3. Capture the full map section container
  const mapSection = page.locator('section:has-text("REALISTIC NAUTICAL CHART")');
  await mapSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'verification_screenshots/02_map_section_full.png' });

  console.log('Detailed map screenshots saved!');
  await browser.close();
})();
