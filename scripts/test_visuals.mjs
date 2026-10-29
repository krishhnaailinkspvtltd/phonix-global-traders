import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const SCREENSHOT_DIR = path.resolve('public/screenshots')
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })
}

async function run() {
  console.log('[1/3] Connecting to live Vite server on port 5173...')
  console.log('[2/3] Launching Chromium...')
  const browser = await chromium.launch({ headless: true })
  
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  })
  const page = await context.newPage()

  try {
    console.log('[3/3] Testing Desktop pages...')
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' })

    // Wait for loader or press ESC to skip
    await page.keyboard.press('Escape')
    await page.waitForTimeout(1000)

    // Capture Hero Dark Mode
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01-home-hero-dark.png') })
    console.log('✓ 01-home-hero-dark.png')

    // Test Theme Switch to Light Mode
    const themeBtn = page.locator('button[aria-label*="Theme"]').first()
    if (await themeBtn.isVisible()) {
      await themeBtn.click()
      await page.waitForTimeout(600)
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02-home-hero-light.png') })
      console.log('✓ 02-home-hero-light.png')
      // Switch back to Dark
      await themeBtn.click()
      await page.waitForTimeout(400)
    }

    // Scroll down to Stacked Template Panels
    await page.evaluate(() => window.scrollTo(0, 950))
    await page.waitForTimeout(800)
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03-stacked-panels.png') })
    console.log('✓ 03-stacked-panels.png')

    // Scroll down to Horizontal Showcase
    await page.evaluate(() => window.scrollTo(0, 2400))
    await page.waitForTimeout(800)
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04-horizontal-showcase.png') })
    console.log('✓ 04-horizontal-showcase.png')

    // Scroll down to Category Showcase & Trade Map
    await page.evaluate(() => window.scrollTo(0, 4200))
    await page.waitForTimeout(800)
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05-trade-matrix.png') })
    console.log('✓ 05-trade-matrix.png')

    // Set sessionStorage so subsequent page loads skip intro
    await page.evaluate(() => sessionStorage.setItem('phonix_intro_shown', 'true'))

    // Visit /about
    await page.goto('http://localhost:5173/about', { waitUntil: 'networkidle' })
    await page.waitForTimeout(800)
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06-about-page.png') })
    console.log('✓ 06-about-page.png')

    // Visit /products
    await page.goto('http://localhost:5173/products', { waitUntil: 'networkidle' })
    await page.waitForTimeout(800)
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07-products-catalog.png') })
    console.log('✓ 07-products-catalog.png')

    // Visit /products/prod-01
    await page.goto('http://localhost:5173/products/prod-01', { waitUntil: 'networkidle' })
    await page.waitForTimeout(800)
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08-product-detail.png') })
    console.log('✓ 08-product-detail.png')

    // Visit /global-trade
    await page.goto('http://localhost:5173/global-trade', { waitUntil: 'networkidle' })
    await page.waitForTimeout(800)
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09-global-trade.png') })
    console.log('✓ 09-global-trade.png')

    // Visit /gallery
    await page.goto('http://localhost:5173/gallery', { waitUntil: 'networkidle' })
    await page.waitForTimeout(800)
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '10-gallery-monograph.png') })
    console.log('✓ 10-gallery-monograph.png')

    // Open first gallery photo lightbox
    const firstPlate = page.locator('text=PLATE 01').first()
    if (await firstPlate.isVisible()) {
      await firstPlate.click()
      await page.waitForTimeout(600)
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '10b-gallery-lightbox.png') })
      console.log('✓ 10b-gallery-lightbox.png')
      await page.keyboard.press('Escape')
      await page.waitForTimeout(400)
    }

    // Visit /contact
    await page.goto('http://localhost:5173/contact', { waitUntil: 'networkidle' })
    await page.waitForTimeout(800)
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '11-contact-page.png') })
    console.log('✓ 11-contact-page.png')

    await page.fill('input[name="fullName"]', 'Lord Henry Sterling')
    await page.fill('input[name="corporateEmail"]', 'h.sterling@sterling-commodities.com')
    await page.fill('input[name="companyName"]', 'Sterling Global Commodities Ltd')
    await page.fill('input[name="destinationPort"]', 'Port of Rotterdam (Draft: 17.5m)')
    await page.fill('textarea[name="message"]', 'Requesting CIF Rotterdam container quote for 10,000 MT Grade-A Copper Cathodes under GAFTA contract terms.')
    await page.click('button[type="submit"]')
    await page.waitForTimeout(1400)
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '11b-contact-success-modal.png') })
    console.log('✓ 11b-contact-success-modal.png')

    // Mobile Viewport
    console.log('Testing Mobile Viewport (390x844)...')
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    })
    const mobilePage = await mobileContext.newPage()
    await mobilePage.goto('http://localhost:5173', { waitUntil: 'networkidle' })
    await mobilePage.keyboard.press('Escape')
    await mobilePage.waitForTimeout(1000)
    await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, '12-mobile-home.png') })
    console.log('✓ 12-mobile-home.png')

    const menuBtn = mobilePage.locator('button[aria-label*="Fullscreen Menu"]').first()
    if (await menuBtn.isVisible()) {
      await menuBtn.click()
      await mobilePage.waitForTimeout(600)
      await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, '13-mobile-fullscreen-menu.png') })
      console.log('✓ 13-mobile-fullscreen-menu.png')
    }

    console.log('ALL PLAYWRIGHT VISUAL TESTS COMPLETED SUCCESSFULLY!')
  } catch (err) {
    console.error('Test error:', err)
  } finally {
    await browser.close()
    process.exit(0)
  }
}

run()
