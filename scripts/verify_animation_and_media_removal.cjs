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
  
  // 1. Capture 1st Monumental Animation Early Phase (~700ms)
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(outDir, '26_loading_monumental_font_early.png') });
  console.log('Captured 26_loading_monumental_font_early.png');

  // 2. Capture 1st Monumental Animation Fully Assembled (~2200ms)
  // Verify that the 2nd animation (circular logo badge) NEVER appears!
  await page.waitForTimeout(1500); // at ~2.2s total
  await page.screenshot({ path: path.join(outDir, '27_loading_monumental_font_assembled_longer.png') });
  console.log('Captured 27_loading_monumental_font_assembled_longer.png');

  // 3. Wait for loading screen to complete and exit into homepage (~4.3s total)
  await page.waitForTimeout(2200);

  // 4. Scroll down to Maritime In Motion section to verify no play/pause or sound buttons
  const motionSection = await page.$('text=MARITIME IN MOTION');
  if (motionSection) {
    await motionSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, '28_maritime_in_motion_no_buttons.png') });
    console.log('Captured 28_maritime_in_motion_no_buttons.png');
  } else {
    await page.evaluate(() => window.scrollTo(0, 3200));
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, '28_maritime_in_motion_no_buttons.png') });
    console.log('Captured 28_maritime_in_motion_no_buttons.png (fallback scroll)');
  }

  await browser.close();
  console.log('Verification finished successfully!');
}

run().catch(err => {
  console.error('Error during verification:', err);
  process.exit(1);
});
