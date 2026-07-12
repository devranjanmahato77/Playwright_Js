// Automate - website : https://rahulshettyacademy.com/client/
// 1. create a new account - by registering you self
// 2. Log in with same creds
// 3. Get the first product title (console)

const { test, expect } = require('@playwright/test');

test('Website', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/");

    // part 1 start
    //1. create a new account - by registering you self
    await page.locator(".login-wrapper-footer-text").click();

    const random4Digit = Math.floor(1000 + Math.random() * 9000);

    const emailID = `oracledb${random4Digit}@o2.com`;

    //Enter all details
    await page.locator("#firstName").fill('Oracle');
    await page.locator("#lastName").fill('Database');
    await page.locator("#userEmail").fill(emailID);
    await page.locator("#userMobile").fill('9856321470');

    //dropdown value - student
    // await page.locator(".custom-select").click();
    await page.locator("select[formcontrolname='occupation']").selectOption("Student");

    await page.locator("#userPassword").fill('Abcd@1234');
    await page.locator("#confirmPassword").fill('Abcd@1234');

    await page.locator("[type$='checkbox']").click();
    await page.locator("input[value='Male']").click();

    await page.locator("[value='Register']").click();


    // await page.pause();

    // part 1 end

    // part 2
    // click on login 
    await page.locator(".login-wrapper button").click();

    await page.locator("[type='email']").fill(emailID);
    await page.locator("[type='password']").fill('Abcd@1234');
    await page.locator("#login").click();
    // await page.waitForTimeout(3000);

    // 3. Get the first product title (console)

    //Note: sometime page take much time to load (until all network files load) - we can wait till all elements loaded
    await page.waitForLoadState('networkidle'); //sometime it will trubble you, if it take more time to load

    // alternate : load 
    // await page.locator('.card-body b').first().waitFor()

    const firstProductName = await page.locator('.card-body b').first().textContent();
    const allProductName = await page.locator('.card-body b').allTextContents();
    console.log(firstProductName);
    console.log(allProductName);
    // await page.waitForTimeout(3000);

})