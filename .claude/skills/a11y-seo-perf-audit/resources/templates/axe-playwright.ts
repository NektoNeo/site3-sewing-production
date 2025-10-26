import { test, expect } from '@playwright/test'
test('home has title and main', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await expect(page).toHaveTitle(/.+/)
  expect(await page.locator('main').count()).toBeGreaterThan(0)
})
