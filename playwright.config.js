// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: false,                 // keep false so you can SEE the browser while learning
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  reporter: [['html', { outputFolder: 'playwright-report' }]],
});
