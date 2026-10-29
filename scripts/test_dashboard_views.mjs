import { chromium } from 'playwright';

async function testDashboard() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.addInitScript(() => {
    sessionStorage.setItem('phonix_intro_shown', 'true');
  });

  await page.goto('http://localhost:5173/understand-dashboard', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // Click Architectural Layers tab
  await page.locator('button', { hasText: 'Architectural Layers' }).click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'public/screenshots/15-understand-layers.png' });
  console.log('✓ 15-understand-layers.png captured');

  // Click Guided Tour tab
  await page.locator('button', { hasText: 'Guided Tour' }).click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'public/screenshots/16-understand-tour.png' });
  console.log('✓ 16-understand-tour.png captured');

  await browser.close();
}

testDashboard().catch(console.error);
