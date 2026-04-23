import { test, expect, type Page } from '@playwright/test'

// ─── Selectors ────────────────────────────────────────────────────────────────

const HAMBURGER = '[aria-label="Toggle menu"]'
const THEME_TOGGLE = '[aria-label="Toggle theme"]'
const NAV_LABELS = ['About', 'Experience', 'Projects', 'Contact']

// ─── Desktop ──────────────────────────────────────────────────────────────────

test.describe('Navbar — Desktop', () => {
  test.use({ viewport: { width: 1280, height: 800 } })

  test('renders the floating pill nav', async ({ page }) => {
    await page.goto('/')
    const pill = page.locator('nav.rounded-full')
    await expect(pill).toBeVisible()
  })

  test('pill has backdrop-blur (frosted glass)', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('nav.rounded-full')).toHaveClass(/backdrop-blur-md/)
  })

  test('brand initials link is present and clickable', async ({ page }) => {
    await page.goto('/')
    // Scope to the visible desktop pill only
    const brand = page.locator('nav.rounded-full a').first()
    await expect(brand).toBeVisible()
    // HashRouter renders <Link to="/"> as href="#/"
    await expect(brand).toHaveAttribute('href', '#/')
  })

  test('all four nav links are visible', async ({ page }) => {
    await page.goto('/')
    const pill = page.locator('nav.rounded-full')
    for (const label of NAV_LABELS) {
      await expect(pill.getByRole('button', { name: label, exact: true })).toBeVisible()
    }
  })

  test('theme toggle is visible inside the pill', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('nav.rounded-full').locator(THEME_TOGGLE)).toBeVisible()
  })

  test('hamburger button is NOT visible on desktop', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator(HAMBURGER)).not.toBeVisible()
  })

  test('clicking About scrolls to the about section', async ({ page }) => {
    await page.goto('/')
    await page.locator('nav.rounded-full').getByRole('button', { name: 'About', exact: true }).click()
    await page.waitForTimeout(600)
    await expect(page.locator('#about')).toBeInViewport()
  })

  test('theme toggle switches theme class on body', async ({ page }) => {
    await page.goto('/')
    const toggle = page.locator('nav.rounded-full').locator(THEME_TOGGLE)
    const bodyBefore = await page.locator('body').getAttribute('class')
    await toggle.click()
    const bodyAfter = await page.locator('body').getAttribute('class')
    expect(bodyBefore).not.toBe(bodyAfter)
  })
})

// ─── Mobile ───────────────────────────────────────────────────────────────────

test.describe('Navbar — Mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  // The visible mobile container — scopes assertions away from the hidden desktop pill
  const mobileBar = (page: Page) => page.locator('.md\\:hidden.rounded-2xl')

  async function openMenu(page: Page) {
    await page.locator(HAMBURGER).click()
    await expect(page.locator(HAMBURGER)).toHaveAttribute('aria-expanded', 'true')
  }

  test('shows the compact mobile bar', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator(HAMBURGER)).toBeVisible()
  })

  test('desktop pill is NOT visible on mobile', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('nav.rounded-full')).not.toBeVisible()
  })

  test('mobile container has rounded-2xl shape', async ({ page }) => {
    await page.goto('/')
    await expect(mobileBar(page)).toBeVisible()
  })

  test('theme toggle is visible in mobile bar', async ({ page }) => {
    await page.goto('/')
    // Scope to the visible mobile bar to avoid resolving the hidden desktop toggle
    await expect(mobileBar(page).locator(THEME_TOGGLE)).toBeVisible()
  })

  test('dropdown is hidden before hamburger click', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('button', { name: 'About', exact: true })).not.toBeVisible()
  })

  test('hamburger click opens dropdown with all nav links', async ({ page }) => {
    await page.goto('/')
    await openMenu(page)
    for (const label of NAV_LABELS) {
      await expect(
        page.getByRole('button', { name: label, exact: true }).last()
      ).toBeVisible()
    }
  })

  test('hamburger icon changes to close icon when open', async ({ page }) => {
    await page.goto('/')
    await openMenu(page)
    await expect(
      page.locator('.material-symbols-outlined').filter({ hasText: 'close' })
    ).toBeVisible()
  })

  test('second hamburger click closes the dropdown', async ({ page }) => {
    await page.goto('/')
    await openMenu(page)
    await page.locator(HAMBURGER).click()
    await expect(page.locator(HAMBURGER)).toHaveAttribute('aria-expanded', 'false')
    await expect(page.getByRole('button', { name: 'About', exact: true })).not.toBeVisible()
  })

  test('pressing Escape closes the dropdown', async ({ page }) => {
    await page.goto('/')
    await openMenu(page)
    await page.keyboard.press('Escape')
    await expect(page.getByRole('button', { name: 'About', exact: true })).not.toBeVisible()
  })

  test('clicking outside the dropdown closes it', async ({ page }) => {
    await page.goto('/')
    await openMenu(page)
    await page.locator('#root').click({ position: { x: 195, y: 400 } })
    await expect(page.getByRole('button', { name: 'About', exact: true })).not.toBeVisible()
  })

  test('clicking a nav link closes the dropdown and scrolls to section', async ({ page }) => {
    await page.goto('/')
    await openMenu(page)
    await page.getByRole('button', { name: 'About', exact: true }).last().click()
    await expect(page.locator(HAMBURGER)).toHaveAttribute('aria-expanded', 'false')
    await page.waitForTimeout(600)
    await expect(page.locator('#about')).toBeInViewport()
  })

  test('theme toggle switches theme on mobile', async ({ page }) => {
    await page.goto('/')
    // Use the mobile bar's toggle — scoped away from hidden desktop pill
    const toggle = mobileBar(page).locator(THEME_TOGGLE)
    const bodyBefore = await page.locator('body').getAttribute('class')
    await toggle.click()
    const bodyAfter = await page.locator('body').getAttribute('class')
    expect(bodyBefore).not.toBe(bodyAfter)
  })
})
