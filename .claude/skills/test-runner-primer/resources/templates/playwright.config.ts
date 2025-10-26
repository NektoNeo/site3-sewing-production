import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  retries: 1,
  use: { baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000', trace: 'on-first-retry', video: 'retain-on-failure', screenshot: 'only-on-failure' },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } },{ name: 'firefox', use: { browserName: 'firefox' } },{ name: 'webkit', use: { browserName: 'webkit' } }]
});
