import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',             // discover both ui/ and api/
  timeout: 30_000,
  reporter: [
    ['list'],                     // terminal output
    ['html'],                     // built-in HTML report
    ['monocart-reporter', {       // bonus: monocart
      outputFile: 'monocart-report/index.html',
      name: 'Capitec Assessment Report'
    }]
  ],
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    trace: 'on-first-retry'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } }
  ]
});
