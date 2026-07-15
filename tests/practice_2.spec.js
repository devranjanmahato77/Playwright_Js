// by ID
await page.locator('#loginBtn').click();
//  by class
await page.locator('.title').textContent();
// by tag
await page.locator('button').first().click();
// by attribute
await page.locator('[name="username"]').fill('dev');
// bt multiple class
await page.locator('.btn.primary').click();
// by parent -> child 
const count = await page.locator('.menu > li').count();
// Descendant selector 
await page.locator('#container a').click();
// first child
await page.locator('.menu li:first-child').click();
// last child
await page.locator('.menu li:last-child').click();
// nth child
await page.locator('.menu li:nth-child(1)').click();
// starting with attribute
await page.locator('[id^="user_"]').first().fill('Hello');
// ends with attribute
await page.locator('[id$="456"]');
// contain attribute
await page.locator('[id*="ser"]');