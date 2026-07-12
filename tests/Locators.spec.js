const { test, expect } = require('@playwright/test');

test('Locators Practice', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise');
    
    //if ID is present #id of tag in css 
    // to fill the detail in field use ".type"(discope) or ".fill" (recommomend to use)
    await page.locator('#username').fill('learning');

    //if attribute is present [attribute='value']
    await page.locator("[type='password']").fill('learning');

    //to click on button
    await page.locator('#signInBtn').click();

    //Suppose username or password is wrong and we have to validate error message.
    console.log("Error message:", await page.locator("[style*='block']").textContent());      //style* --> * means LIKE operator (complete the value)

    // verify the ERROR msg extracted is the correct or any of the given word
    const errorMsg = await page.locator("[style*='block']");
    await expect(errorMsg).toContainText('Incorrect');

})