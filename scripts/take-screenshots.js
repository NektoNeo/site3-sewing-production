const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  // Ensure screenshot directory exists
  const screenshotDir = path.join(process.cwd(), '.playwright-mcp');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3001...');
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });

  // Wait for initial load
  await page.waitForTimeout(2000);

  // 1. Full page screenshot
  console.log('Taking full page screenshot...');
  await page.screenshot({
    path: path.join(screenshotDir, 'full-page-overview.png'),
    fullPage: true
  });

  // 2. Navigate to pricing section
  console.log('Scrolling to pricing section...');
  await page.evaluate(() => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(1500);

  // Take pricing section screenshot
  await page.screenshot({
    path: path.join(screenshotDir, 'pricing-section-initial.png'),
    fullPage: false
  });

  // 3. Test pricing filters
  console.log('Testing pricing filters...');

  // Click on category filter if it exists
  const pricingFilter = await page.$('[data-testid="pricing-category-filter"], #pricing select, #pricing button:has-text("Категория"), #pricing button:has-text("Category")');
  if (pricingFilter) {
    await pricingFilter.click();
    await page.waitForTimeout(500);

    // Try to select an option
    const filterOption = await page.$('[role="option"]:first-child, option:nth-child(2)');
    if (filterOption) {
      await filterOption.click();
      await page.waitForTimeout(1000);
    }

    await page.screenshot({
      path: path.join(screenshotDir, 'pricing-section-with-filters.png'),
      fullPage: false
    });
  }

  // Check for hover states on pricing cards
  console.log('Testing pricing card hover states...');
  const pricingCard = await page.$('#pricing .bg-card, #pricing [class*="card"], #pricing > div > div > div');
  if (pricingCard) {
    await pricingCard.hover();
    await page.waitForTimeout(500);

    // Check computed styles for box-shadow
    const hasBoxShadow = await pricingCard.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return styles.boxShadow && styles.boxShadow !== 'none';
    });

    console.log('Pricing card has box-shadow on hover:', hasBoxShadow);

    await page.screenshot({
      path: path.join(screenshotDir, 'pricing-card-hover-state.png'),
      fullPage: false
    });
  }

  // 4. Navigate to catalog section
  console.log('Scrolling to catalog section...');
  await page.evaluate(() => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(1500);

  // Take catalog section screenshot
  await page.screenshot({
    path: path.join(screenshotDir, 'catalog-section-initial.png'),
    fullPage: false
  });

  // 5. Test catalog filters - especially multi-select
  console.log('Testing catalog multi-select filters...');

  // Look for multi-select combobox
  const multiSelect = await page.$('[data-testid="catalog-multiselect"], #catalog [role="combobox"], #catalog button:has-text("Категории"), #catalog button:has-text("Categories"), #catalog button:has-text("Select")');
  if (multiSelect) {
    try {
      await multiSelect.click();
      await page.waitForTimeout(500);

      // Try to select multiple options
      const options = await page.$$('[role="option"], [data-value]');
      if (options.length > 0) {
        console.log(`Found ${options.length} options in multi-select`);

        // Select first two options with better error handling
        for (let i = 0; i < Math.min(2, options.length); i++) {
          try {
            const isAttached = await options[i].evaluate(el => el.isConnected);
            if (isAttached) {
              await options[i].click();
              await page.waitForTimeout(300);
            }
          } catch (e) {
            console.log(`Could not click option ${i + 1}: ${e.message}`);
          }
        }
      }

      await page.screenshot({
        path: path.join(screenshotDir, 'catalog-section-with-multiselect.png'),
        fullPage: false
      });
    } catch (e) {
      console.log('Error testing multi-select:', e.message);
    }
  }

  // 6. Check for virtualized tables
  console.log('Looking for virtualized tables...');
  const tables = await page.$$('table, [role="table"], .table-container');

  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];
    const rowCount = await table.evaluate(el => {
      const rows = el.querySelectorAll('tr, [role="row"]');
      return rows.length;
    });

    console.log(`Table ${i + 1} has ${rowCount} rows`);

    if (rowCount > 40) {
      // Scroll within the table to test virtualization
      await table.evaluate(el => {
        if (el.scrollHeight > el.clientHeight) {
          el.scrollTop = el.scrollHeight / 2;
        }
      });
      await page.waitForTimeout(500);

      await page.screenshot({
        path: path.join(screenshotDir, `virtualized-table-performance-${i + 1}.png`),
        fullPage: false
      });

      // Scroll to bottom
      await table.evaluate(el => {
        if (el.scrollHeight > el.clientHeight) {
          el.scrollTop = el.scrollHeight;
        }
      });
      await page.waitForTimeout(500);

      await page.screenshot({
        path: path.join(screenshotDir, `virtualized-table-scrolled-${i + 1}.png`),
        fullPage: false
      });
    }
  }

  // Check hover states on catalog items
  console.log('Testing catalog item hover states...');
  const catalogItem = await page.$('#catalog tbody tr:first-child, #catalog [role="row"]:nth-child(2), #catalog .catalog-item');
  if (catalogItem) {
    await catalogItem.hover();
    await page.waitForTimeout(500);

    // Check computed styles for box-shadow
    const hasBoxShadow = await catalogItem.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return styles.boxShadow && styles.boxShadow !== 'none';
    });

    console.log('Catalog item has box-shadow on hover:', hasBoxShadow);

    await page.screenshot({
      path: path.join(screenshotDir, 'catalog-item-hover-state.png'),
      fullPage: false
    });
  }

  console.log(`\nScreenshots saved to: ${screenshotDir}`);
  console.log('\nFiles created:');
  const files = fs.readdirSync(screenshotDir).filter(f => f.endsWith('.png'));
  files.forEach(file => console.log(`  - ${file}`));

  await browser.close();
})();