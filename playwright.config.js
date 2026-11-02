const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://www.saucedemo.com',
    browserName: 'chromium',
    channel: process.env.PLAYWRIGHT_CHANNEL === 'chromium'
      ? undefined
      : process.env.PLAYWRIGHT_CHANNEL || 'chrome',
    viewport: { width: 1280, height: 800 },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    testIdAttribute: 'data-test'
  },
  expect: {
    timeout: 5000
  },
  timeout: 30000
});