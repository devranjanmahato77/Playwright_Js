// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */

// defineConfig is just a Global variable to access inside configuration 'export default defineConfig'
// export default defineConfig({

//this can also be done by below way
const config = ({

  testDir: './tests',
  // testMatch: ['Task_One.spec.js'],

  //By default for each operation/component it's wait for 30s - if in 30s it won't triggered or appear then TEST WILL FAIL

  // We can set our own timer also
  timeout: 100 * 1000,   // 1000ms = 1s --> it will set to entire project

  // for specific component or operation in automation
  expect: {
    timeout: 5000,
  },
  reporter: 'html',   // If you want REPORT (in HTML) after every execution

  // to set what brower you want to run
  use: {
    actionTimeout: 10 * 1000,     // ACTION Timeout (click, fill, waitFor, etc.)
    navigationTimeout: 30 * 1000, // traverse between tabs
    browserName: 'chromium',    // firefox, webkit, chromium
    headless: false             // 'npx playwright test --headed' :: true(without browser)
  },

});

module.exports = config

