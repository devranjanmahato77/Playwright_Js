import { test, expect } from '@playwright/test';

// each test execute based on  timeout: 100 * 1000 (playwright.config.js) else it will failed
test('Playwright special locators', async ({ page }) => {

    // if we want to overwrite time as from config time to other for this test case
    test.setTimeout(120 * 1000);  // 120s

    await page.goto('https://rahulshettyacademy.com/angularpractice/');

    // it will check <label> tag by its DOM text and try to find clickable element associated with it and click on it
    // getByLabel() is used for checkboxes, radio buttons and input fields(not prefer)
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    //for radio button we can use .click() or .checked();
    await page.getByLabel('Employed').check();

    // for dropdown we can use .selectOption() and pass the value of the option we want to select
    await page.getByLabel('Gender').selectOption('Female');


    await page.getByPlaceholder('Password').fill('123456');

    // by getByRole() we can find the element by its role(html tag, eg <button>) and name(in DOM), it is used for buttons, links, checkboxes, radio buttons, input fields etc.
    await page.getByRole('button', { name: 'Submit' }).click();

    // by getByText() we can find the element by its text in DOM, it is used for buttons, links, checkboxes, radio buttons, input fields etc.
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible(); // here it will return 1 or 0 and continue the process even if it fails(0)

    await page.getByRole('link', { name: 'Shop' }).click();

    // on the shop page we have item find 'Nokia Edge' and click on 'Add to Cart' button, we can use getByText() for this
    await page.locator('app-card').filter({ hasText: 'Nokia Edge' }).getByRole('button').click();

    // await page.pause();

    // assertion
    // when we wrap the assertion with expect it will wait for 5s if needed
    await expect(page.getByText('Success! The Form has been submitted successfully!.')).toBeVisible();  // return nothing, just verify. here if it fails it will stop execution

    // what if, text taking more then 5s to display then? override timeout {timeout:10_000} 10s - step level override
    await expect(page.getByText('Success! The Form has been submitted successfully!.')).toBeVisible({ timeout: 10_000 });// here we can provide timeout in ms, 10_000 = 10s
    // or for globally we want to change then, in playwright.config.js we can modify.

    // till now we see step level and global level - expect time
    // what if we need test level time out?

    
});

test('Playwright test level timeout', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/angularpractice/');

    const slowExpect = expect.configure({timeout:9000});

    await page.getByRole('button', { name: 'Submit' }).click();

    await slowExpect(page.getByText('Success! The Form has been submitted successfully!.')).toBeVisible();

    await slowExpect(page.getByText('Success! The Form has been submitted successfully!.')).toBeVisible();
    
});