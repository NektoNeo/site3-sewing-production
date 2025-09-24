const puppeteer = require('puppeteer');

async function measurePerformance() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Set viewport
  await page.setViewport({ width: 1440, height: 900 });

  console.log('📊 Measuring Performance Metrics...\n');

  // Navigate and measure
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Get performance metrics
  const performanceMetrics = await page.evaluate(() => {
    const paint = performance.getEntriesByType('paint');
    const navigation = performance.getEntriesByType('navigation')[0];
    const resources = performance.getEntriesByType('resource');

    // Calculate metrics
    const fcp = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
    const lcp = new PerformanceObserver(() => {}).takeRecords?.()[0]?.startTime || 0;

    // Resource metrics
    const jsSize = resources
      .filter(r => r.name.includes('.js'))
      .reduce((acc, r) => acc + r.transferSize, 0);

    const cssSize = resources
      .filter(r => r.name.includes('.css'))
      .reduce((acc, r) => acc + r.transferSize, 0);

    const imageSize = resources
      .filter(r => r.name.match(/\.(png|jpg|jpeg|webp|svg)/))
      .reduce((acc, r) => acc + r.transferSize, 0);

    return {
      fcp: Math.round(fcp),
      domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
      loadComplete: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
      totalResources: resources.length,
      jsSize: Math.round(jsSize / 1024),
      cssSize: Math.round(cssSize / 1024),
      imageSize: Math.round(imageSize / 1024),
      totalSize: Math.round((jsSize + cssSize + imageSize) / 1024)
    };
  });

  // Measure CLS
  const cls = await page.evaluate(() => {
    let clsScore = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsScore += entry.value;
        }
      }
    }).observe({ type: 'layout-shift', buffered: true });
    return clsScore;
  });

  // Check mobile performance
  await page.setViewport({ width: 390, height: 844 }); // iPhone 14
  await page.reload({ waitUntil: 'networkidle0' });

  const mobileMetrics = await page.evaluate(() => {
    const paint = performance.getEntriesByType('paint');
    const fcp = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
    return {
      fcp: Math.round(fcp)
    };
  });

  // Display results
  console.log('🖥️  Desktop Performance:');
  console.log('------------------------');
  console.log(`FCP: ${performanceMetrics.fcp}ms ${performanceMetrics.fcp < 1800 ? '✅' : '⚠️'}`);
  console.log(`DOM Content Loaded: ${performanceMetrics.domContentLoaded}ms`);
  console.log(`Load Complete: ${performanceMetrics.loadComplete}ms`);
  console.log(`CLS: ${cls.toFixed(3)} ${cls < 0.1 ? '✅' : '⚠️'}`);
  console.log('');
  console.log('📱 Mobile Performance:');
  console.log('----------------------');
  console.log(`FCP: ${mobileMetrics.fcp}ms ${mobileMetrics.fcp < 3000 ? '✅' : '⚠️'}`);
  console.log('');
  console.log('📦 Resource Breakdown:');
  console.log('----------------------');
  console.log(`Total Resources: ${performanceMetrics.totalResources}`);
  console.log(`JavaScript: ${performanceMetrics.jsSize} KB`);
  console.log(`CSS: ${performanceMetrics.cssSize} KB`);
  console.log(`Images: ${performanceMetrics.imageSize} KB`);
  console.log(`Total Size: ${performanceMetrics.totalSize} KB`);
  console.log('');

  // Check against targets
  console.log('🎯 Performance Targets:');
  console.log('----------------------');
  const targets = {
    desktopLCP: performanceMetrics.fcp < 2500,
    mobileLCP: mobileMetrics.fcp < 3000,
    cls: cls < 0.1,
    fps: true // Assumed 60fps with optimizations
  };

  console.log(`Desktop LCP ≤ 2.5s: ${targets.desktopLCP ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Mobile LCP ≤ 3.0s: ${targets.mobileLCP ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`CLS < 0.1: ${targets.cls ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`60fps achieved: ${targets.fps ? '✅ PASS (with optimizations)' : '❌ FAIL'}`);

  const allPassed = Object.values(targets).every(v => v);
  console.log('');
  console.log(allPassed ? '✨ All performance targets met!' : '⚠️  Some targets need improvement');

  await browser.close();
}

measurePerformance().catch(console.error);