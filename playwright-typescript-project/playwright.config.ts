import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests', // Directory for your test files
  retries: 0, // Retry failed tests
  timeout: 60000, // Global test timeout: 60 seconds
  use: {
    headless: false, // Run in non-headless mode
    baseURL: '', // Your base URL
    screenshot: 'on', // Take screenshots on failure
    video: 'on', // Record video for each test
    trace: 'on-first-retry', // Capture trace on first retry
    actionTimeout: 10000, // Timeout for individual actions: 10 seconds
    navigationTimeout: 30000, // Timeout for page navigation: 30 seconds
  },
  reporter: [
    ['list'], // List-style reporter
    ['html', { open: 'never' }], // Generate an HTML report
  ],
});
