// C:/Users/Debu/Desktop/Playwright/Learning/practice.html

const { test, expect } = require('@playwright/test');

test('Website', async ({ page }) => {

  // go wo website
  const localFilePath = "C:/Users/Debu/Desktop/Playwright/Learning/practice.html";
  await page.goto(`file://${localFilePath}`);

//   await page.locator('.profile-card .save-btn').click();
// await page.locator('.save-btn').filter({ visible: true }).click();
await page.locator('.save-btn:not(.hidden)').click();

});