import {test, expect} from '@playwright/test';

test('Playwright special locators', async ({ page }) => {

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
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible();

    await page.getByRole('link', { name: 'Shop' }).click();

    // on the shop page we have item find 'Nokia Edge' and click on 'Add to Cart' button, we can use getByText() for this
    await page.locator('app-card').filter({hasText:'Nokia Edge'}).getByRole('button').click();

    // await page.pause();

});