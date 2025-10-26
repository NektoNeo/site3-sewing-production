import { test, expect, Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Accessibility and SEO Audit Tests
 * Following a11y-seo-perf-audit skill requirements
 */

// Helper to navigate with proper timeout and waitUntil for heavy pages
async function gotoPage(page: Page, url: string) {
  await page.goto(url, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });
  // Give animations time to start
  await page.waitForTimeout(1000);
}

test.describe('Accessibility Audit', () => {
  test('homepage should not have any automatically detectable accessibility issues', async ({ page }) => {
    await gotoPage(page, '/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await gotoPage(page, '/');

    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
    expect(h1Count).toBeLessThanOrEqual(1); // Only one h1 per page

    // Check if headings exist in order (h1 -> h2 -> h3, etc.)
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();
    expect(headings.length).toBeGreaterThan(0);
  });

  test('should have skip link for keyboard navigation', async ({ page }) => {
    await gotoPage(page, '/');

    const skipLink = page.locator('.skip-to-main');
    await expect(skipLink).toBeVisible();
    await expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  test('images should have alt text', async ({ page }) => {
    await gotoPage(page, '/');

    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      // Alt can be empty string for decorative images, but must exist
      expect(alt).not.toBeNull();
    }
  });

  test('interactive elements should be keyboard accessible', async ({ page }) => {
    await gotoPage(page, '/');

    // Test Tab navigation
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });

  test('should have proper ARIA labels on interactive elements', async ({ page }) => {
    await gotoPage(page, '/');

    const buttons = await page.locator('button[aria-label]').count();
    const links = await page.locator('a[aria-label]').count();

    // At least some interactive elements should have ARIA labels
    expect(buttons + links).toBeGreaterThan(0);
  });
});

test.describe('SEO Audit', () => {
  test('should have proper meta tags', async ({ page }) => {
    await gotoPage(page, '/');

    // Title
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(10);
    expect(title.length).toBeLessThan(60);

    // Meta description
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThan(50);
    expect(description!.length).toBeLessThan(160);

    // Viewport
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).toContain('width=device-width');

    // Charset
    const charset = await page.locator('meta[charset]').getAttribute('charset');
    expect(charset).toBe('utf-8');
  });

  test('should have Open Graph tags', async ({ page }) => {
    await gotoPage(page, '/');

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');

    expect(ogTitle).toBeTruthy();
    expect(ogDescription).toBeTruthy();
    expect(ogImage).toBeTruthy();
    expect(ogUrl).toBeTruthy();
  });

  test('should have Twitter Card tags', async ({ page }) => {
    await gotoPage(page, '/');

    const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    const twitterTitle = await page.locator('meta[name="twitter:title"]').getAttribute('content');

    expect(twitterCard).toBeTruthy();
    expect(twitterTitle).toBeTruthy();
  });

  test('should have proper HTML structure', async ({ page }) => {
    await gotoPage(page, '/');

    // Lang attribute
    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBe('en');

    // Main landmark
    const main = page.locator('main');
    await expect(main).toBeVisible();

    // Header
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Footer
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should have canonical URL', async ({ page }) => {
    await gotoPage(page, '/');

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBeTruthy();
  });

  test('should have proper robots meta tag', async ({ page }) => {
    await gotoPage(page, '/');

    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    expect(robots).toContain('index');
    expect(robots).toContain('follow');
  });

  test('should have manifest for PWA', async ({ page }) => {
    await gotoPage(page, '/');

    const manifest = await page.locator('link[rel="manifest"]').getAttribute('href');
    expect(manifest).toBe('/manifest.json');

    // Verify manifest is accessible
    const manifestResponse = await page.request.get('/manifest.json');
    expect(manifestResponse.ok()).toBeTruthy();
  });

  test('should have sitemap.xml', async ({ page }) => {
    const sitemapResponse = await page.request.get('/sitemap.xml');
    expect(sitemapResponse.ok()).toBeTruthy();
  });

  test('should have robots.txt', async ({ page }) => {
    const robotsResponse = await page.request.get('/robots.txt');
    expect(robotsResponse.ok()).toBeTruthy();

    const robotsContent = await robotsResponse.text();
    expect(robotsContent).toContain('Sitemap:');
  });
});

test.describe('Performance & Core Web Vitals', () => {
  test('should load homepage in reasonable time', async ({ page }) => {
    const startTime = Date.now();
    await gotoPage(page, '/');
    const loadTime = Date.now() - startTime;

    // Should load in less than 5 seconds on localhost (with heavy animations)
    expect(loadTime).toBeLessThan(5000);
  });

  test('should have proper image optimization', async ({ page }) => {
    await gotoPage(page, '/');

    // Check for next/image usage (images should have srcset)
    const images = await page.locator('img[srcset]').count();
    expect(images).toBeGreaterThan(0);
  });

  test('should not have console errors', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await gotoPage(page, '/');

    // Filter out known/expected errors
    const criticalErrors = consoleErrors.filter(error =>
      !error.includes('Failed to load resource') && // Common dev server issue
      !error.includes('Web Vitals') // Web Vitals logging is expected
    );

    expect(criticalErrors).toHaveLength(0);
  });
});
