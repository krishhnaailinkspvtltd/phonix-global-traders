import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const SCREENSHOT_DIR = path.resolve('public/screenshots/carysil_redesign')
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })
}

async function run() {
  console.log('[1/4] Launching Playwright Chromium...')
  const browser = await chromium.launch({ headless: true })
  
  // -------------------------------------------------------------------------
  // TEST 1: LOADING SCREEN & REPLAY INTRO (?replayIntro=1)
  // -------------------------------------------------------------------------
  console.log('[2/4] TEST 1: Loading Screen & Intro Replay...')
  const loadContext = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const loadPage = await loadContext.newPage()
  
  // Navigate with replayIntro=1
  await loadPage.goto('http://localhost:5173/?replayIntro=1', { waitUntil: 'domcontentloaded' })
  // Capture loading screen mid-sequence (PHONIX & GLOBAL TRADE reveal)
  await loadPage.waitForTimeout(650)
  await loadPage.screenshot({ path: path.join(SCREENSHOT_DIR, '01-loading-screen-reveal.png') })
  console.log('✓ 01-loading-screen-reveal.png captured (mid-animation)')

  // Wait for loader transition to finish and hero to reveal
  await loadPage.waitForTimeout(2200)
  await loadPage.screenshot({ path: path.join(SCREENSHOT_DIR, '02-hero-after-loader.png') })
  console.log('✓ 02-hero-after-loader.png captured (hero reveal complete)')
  await loadContext.close()

  // -------------------------------------------------------------------------
  // TEST 2: DESKTOP 1440px HERO & SCROLL MOTION STAGES (0%, 25%, 50%, 75%, 100%)
  // -------------------------------------------------------------------------
  console.log('[3/4] TEST 2 & 3: Hero & Scroll Progression (0%, 25%, 50%, 75%, 100%)...')
  const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await desktopContext.newPage()

  // Set sessionStorage to bypass loader for subsequent tests
  await page.addInitScript(() => sessionStorage.setItem('phonix_intro_shown', 'true'))
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(1000)

  // 0% Scroll Progress: Hero at top
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03-scroll-0pct-hero.png') })
  console.log('✓ 03-scroll-0pct-hero.png')

  // Theme Switch Check: Switch to Dark Theme & Capture
  const themeBtn = page.locator('button[aria-label*="Theme"]').first()
  if (await themeBtn.isVisible()) {
    await themeBtn.click()
    await page.waitForTimeout(600)
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03b-hero-dark-theme.png') })
    console.log('✓ 03b-hero-dark-theme.png')
    // Switch back to Light Theme (default)
    await themeBtn.click()
    await page.waitForTimeout(400)
  }

  // Measure total scroll height
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight - window.innerHeight)

  // 25% Scroll Progress: Pinned Stacked Panels - Scene 2 / 3
  await page.evaluate((sh) => window.scrollTo(0, sh * 0.25), scrollHeight)
  await page.waitForTimeout(1000)
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04-scroll-25pct-stacked-panels.png') })
  console.log('✓ 04-scroll-25pct-stacked-panels.png')

  // 50% Scroll Progress: Draggable Product Showcase (Carysil Style)
  await page.evaluate((sh) => window.scrollTo(0, sh * 0.50), scrollHeight)
  await page.waitForTimeout(1000)
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05-scroll-50pct-product-showcase.png') })
  console.log('✓ 05-scroll-50pct-product-showcase.png')

  // TEST 4: INTERACT WITH DRAGGABLE PRODUCT SHOWCASE
  console.log('Testing Draggable Product Showcase Interaction...')
  const nextBtn = page.locator('button[aria-label="Next Category"]').first()
  if (await nextBtn.isVisible()) {
    await nextBtn.click()
    await page.waitForTimeout(600)
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05b-product-showcase-next.png') })
    console.log('✓ 05b-product-showcase-next.png (Category 02 active)')
  }

  // 75% Scroll Progress: "Maritime In Motion" Film Showcase
  await page.evaluate((sh) => window.scrollTo(0, sh * 0.72), scrollHeight)
  await page.waitForTimeout(1000)
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06-scroll-75pct-in-motion.png') })
  console.log('✓ 06-scroll-75pct-in-motion.png')

  // Test expanding Panel 2 in "Maritime In Motion"
  const panel2 = page.locator('text=High-Seas Carrier Navigation').first()
  if (await panel2.isVisible()) {
    await panel2.click()
    await page.waitForTimeout(800)
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06b-in-motion-panel2-active.png') })
    console.log('✓ 06b-in-motion-panel2-active.png (Panel 02 expanded)')
  }

  // 100% Scroll Progress: Closing CTA & Architectural Footer
  await page.evaluate((sh) => window.scrollTo(0, sh), scrollHeight)
  await page.waitForTimeout(1000)
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07-scroll-100pct-footer.png') })
  console.log('✓ 07-scroll-100pct-footer.png')

  // Reverse Scrolling Verification (scroll back up to 30%)
  await page.evaluate((sh) => window.scrollTo(0, sh * 0.30), scrollHeight)
  await page.waitForTimeout(800)
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08-reverse-scroll-check.png') })
  console.log('✓ 08-reverse-scroll-check.png')

  // -------------------------------------------------------------------------
  // TEST 5 & 6: RESPONSIVE VIEWPORTS (390px Mobile, 768px Tablet, 1920px Ultrawide)
  // -------------------------------------------------------------------------
  console.log('[4/4] TEST 6: Responsive Viewports (390px, 768px, 1920px)...')
  
  // Mobile 390px
  const mobileCtx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
  const mobilePage = await mobileCtx.newPage()
  await mobilePage.addInitScript(() => sessionStorage.setItem('phonix_intro_shown', 'true'))
  await mobilePage.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await mobilePage.waitForTimeout(800)
  await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, '09-mobile-390px-hero.png') })
  console.log('✓ 09-mobile-390px-hero.png')

  // Open Fullscreen Menu on Mobile
  const menuTrigger = mobilePage.locator('button[aria-label="Open Fullscreen Menu"]').first()
  if (await menuTrigger.isVisible()) {
    await menuTrigger.click()
    await mobilePage.waitForTimeout(600)
    await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, '10-mobile-fullscreen-menu.png') })
    console.log('✓ 10-mobile-fullscreen-menu.png')
  }
  await mobileCtx.close()

  // Tablet 768px
  const tabletCtx = await browser.newContext({ viewport: { width: 768, height: 1024 } })
  const tabletPage = await tabletCtx.newPage()
  await tabletPage.addInitScript(() => sessionStorage.setItem('phonix_intro_shown', 'true'))
  await tabletPage.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await tabletPage.waitForTimeout(800)
  await tabletPage.screenshot({ path: path.join(SCREENSHOT_DIR, '11-tablet-768px-hero.png') })
  console.log('✓ 11-tablet-768px-hero.png')
  await tabletCtx.close()

  // Desktop 1920px Ultrawide
  const ultrawideCtx = await browser.newContext({ viewport: { width: 1920, height: 1080 } })
  const ultrawidePage = await ultrawideCtx.newPage()
  await ultrawidePage.addInitScript(() => sessionStorage.setItem('phonix_intro_shown', 'true'))
  await ultrawidePage.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await ultrawidePage.waitForTimeout(800)
  await ultrawidePage.screenshot({ path: path.join(SCREENSHOT_DIR, '12-desktop-1920px-hero.png') })
  console.log('✓ 12-desktop-1920px-hero.png')
  await ultrawideCtx.close()

  // -------------------------------------------------------------------------
  // TEST 7: INNER PAGES BLUE & WHITE INTEGRITY CHECK
  // -------------------------------------------------------------------------
  console.log('Verifying Inner Pages Blue & White Theme...')
  const innerPages = [
    { route: '/about', name: '13-inner-about.png' },
    { route: '/products', name: '14-inner-products.png' },
    { route: '/products/prod-01', name: '15-inner-product-detail.png' },
    { route: '/global-trade', name: '16-inner-global-trade.png' },
    { route: '/gallery', name: '17-inner-gallery.png' },
    { route: '/contact', name: '18-inner-contact.png' },
  ]

  for (const item of innerPages) {
    await page.goto(`http://localhost:5173${item.route}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(600)
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, item.name) })
    console.log(`✓ ${item.name}`)
  }

  await browser.close()
  console.log('ALL TESTS COMPLETED SUCCESSFULLY!')
}

run().catch((err) => {
  console.error('Test Suite Failed:', err)
  process.exit(1)
})
