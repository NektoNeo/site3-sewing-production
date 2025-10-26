import { test, expect } from '@playwright/test';

/**
 * Smoke Tests - Fast checks without full page load
 * These tests use request API instead of page navigation to avoid heavy JS execution
 */

test.describe('Smoke Tests - API Endpoints', () => {
  test('robots.txt should be accessible', async ({ page }) => {
    const response = await page.request.get('/robots.txt');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const content = await response.text();
    expect(content).toContain('User-agent');
    expect(content).toContain('Sitemap:');
  });

  test('sitemap.xml should be accessible', async ({ page }) => {
    const response = await page.request.get('/sitemap.xml');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const content = await response.text();
    expect(content).toContain('<?xml');
    // next-sitemap creates sitemapindex, not urlset - both are valid
    const hasSitemap = content.includes('urlset') || content.includes('sitemapindex');
    expect(hasSitemap).toBeTruthy();
  });

  test('manifest.json should be accessible and valid', async ({ page }) => {
    const response = await page.request.get('/manifest.json');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const manifest = await response.json();
    expect(manifest.name).toBeTruthy();
    expect(manifest.icons).toBeTruthy();
    expect(manifest.icons.length).toBeGreaterThan(0);
  });

  test('favicon or icon should be accessible', async ({ page }) => {
    // Try favicon.ico first, fallback to any icon
    const faviconResponse = await page.request.get('/favicon.ico');
    const icon192Response = await page.request.get('/icon-192x192.png');

    const hasIcon = faviconResponse.ok() || icon192Response.ok();
    expect(hasIcon).toBeTruthy();
  });
});

test.describe('Smoke Tests - Page Structure (Light Check)', () => {
  test.setTimeout(20000);

  test('homepage should respond with 200', async ({ page }) => {
    const response = await page.goto('/', {
      waitUntil: 'commit', // Don't wait for full load, just initial HTML
      timeout: 15000
    });

    expect(response).not.toBeNull();
    expect(response!.status()).toBe(200);
  });

  test('homepage should have basic HTML structure', async ({ page }) => {
    await page.goto('/', {
      waitUntil: 'commit',
      timeout: 15000
    });

    // Wait just for HTML to be parsed
    await page.waitForSelector('html', { timeout: 5000 });

    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('en');

    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
  });

  test('homepage should have main landmark', async ({ page }) => {
    await page.goto('/', {
      waitUntil: 'commit',
      timeout: 15000
    });

    // Wait a bit for DOM to be ready
    await page.waitForTimeout(500);

    const main = page.locator('main');
    const mainCount = await main.count();
    expect(mainCount).toBeGreaterThan(0);
  });

  test('homepage should have header and footer', async ({ page }) => {
    await page.goto('/', {
      waitUntil: 'commit',
      timeout: 15000
    });

    // Wait a bit for DOM to be ready
    await page.waitForTimeout(500);

    const headerCount = await page.locator('header').count();
    const footerCount = await page.locator('footer').count();

    expect(headerCount).toBeGreaterThan(0);
    expect(footerCount).toBeGreaterThan(0);
  });
});

test.describe('Smoke Tests - SEO Meta Tags', () => {
  test.setTimeout(20000);

  test('should have essential meta tags', async ({ page }) => {
    await page.goto('/', {
      waitUntil: 'commit',
      timeout: 15000
    });

    // Wait a bit for DOM to be ready
    await page.waitForTimeout(500);

    const charset = await page.locator('meta[charset]').count();
    expect(charset).toBeGreaterThan(0);

    const viewport = await page.locator('meta[name="viewport"]').count();
    expect(viewport).toBeGreaterThan(0);

    const description = await page.locator('meta[name="description"]').count();
    expect(description).toBeGreaterThan(0);
  });

  test('should have Open Graph tags', async ({ page }) => {
    await page.goto('/', {
      waitUntil: 'commit',
      timeout: 15000
    });

    // Wait a bit for DOM to be ready
    await page.waitForTimeout(500);

    const ogTitle = await page.locator('meta[property="og:title"]').count();
    const ogDescription = await page.locator('meta[property="og:description"]').count();

    expect(ogTitle).toBeGreaterThan(0);
    expect(ogDescription).toBeGreaterThan(0);
  });
});
