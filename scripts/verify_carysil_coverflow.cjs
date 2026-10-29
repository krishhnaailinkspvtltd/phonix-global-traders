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
  
  // Dismiss loader instantly
  await page.waitForTimeout(300);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);

  // Scroll to Product Range section
  const sectionTitle = await page.$('text=Product Range');
  if (sectionTitle) {
    await sectionTitle.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
  }

  // 1. Capture Initial 3D Coverflow Perspective
  await page.screenshot({ path: path.join(outDir, '33_carysil_3d_coverflow_initial.png') });
  console.log('Captured 33_carysil_3d_coverflow_initial.png');

  // 2. Click Next Arrow
  const nextBtn = await page.$('button[aria-label="Next Product"]');
  if (nextBtn) {
    await nextBtn.click();
    await page.waitForTimeout(650);
    await page.screenshot({ path: path.join(outDir, '34_carysil_3d_coverflow_next.png') });
    console.log('Captured 34_carysil_3d_coverflow_next.png');

    // 3. Click Next Arrow Again
    await nextBtn.click();
    await page.waitForTimeout(650);
    await page.screenshot({ path: path.join(outDir, '35_carysil_3d_coverflow_next2.png') });
    console.log('Captured 35_carysil_3d_coverflow_next2.png');
  }

  // 4. Click a side card to rotate it into center
  const leftCard = await page.$('text=Dehydrated Vegetables');
  if (leftCard) {
    await leftCard.click();
    await page.waitForTimeout(650);
    await page.screenshot({ path: path.join(outDir, '36_carysil_3d_coverflow_card_clicked.png') });
    console.log('Captured 36_carysil_3d_coverflow_card_clicked.png');
  }

  await browser.close();
  console.log('All Carysil 3D Coverflow screenshots captured cleanly!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
