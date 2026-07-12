const { test, expect} = require('@playwright/test');
const { escape } = require('node:querystring');

test('Browser context Playwright test', async ({ browser }) => {
    //Playwright code

    // chrome - plugins/cookies
    const context = await browser.newContext();     // set browser, cookies
    const page = await context.newPage();           // open new page
    await page.goto('https://www.google.com/');

});

// it is also doing the same
test('Page Playwright test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/practice');     // go with default brower without cookies
});

//If you want to run only one test then
test('Only run this TC', async ({page})=>{
    await page.goto('https://www.facebook.com/');

    // If you want to validate the TAB Title (at top)
    console.log(await page.title());        // just to print in log
    await expect(page).toHaveTitle('Facebook');   // here we are verifing
})

// Handling static SELECT drowdown/radio button option
test('UI Controls', async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');

    const dropDown = page.locator("select.form-control");
    await dropDown.selectOption("consult");

    // select radio button
    await page.locator('.radiotextsty').nth(1).click();
    await page.locator('#okayBtn').click();

    //after selecting Radio button - make sure it is clicked - for that we have Assertion
    //syntex : expect(LOCATOR).toBeChecked();
    const checkedRadioBtnClicked = await page.locator('.radiotextsty').last();
    expect(checkedRadioBtnClicked).toBeChecked();  //assertion

    //to check by your own - isChecked(), gives Boolean value (true or false)
    console.log(await checkedRadioBtnClicked.isChecked());

    // await page.pause();

    await page.locator('#terms').click();   // got checked
    await expect(page.locator('#terms')).toBeChecked(); 

    // unchecked it 
    await page.locator('#terms').uncheck(); //this will only works when its cheched once

    // this assertion make sure "await page.locator('#terms').isChecked()" gives False vise versa .toBeTruthy
    expect(await page.locator('#terms').isChecked()).toBeFalsy; 

    //in the same page we have on blinking text on the right top corner - how to verify its blinking or not?
    //In css we have class = blinkingText , which means its blicking
    // we need to verify that class is present or not in the tag

    const blinkLocator = page.locator("[href*='documents-request']");
    await expect(blinkLocator).toHaveAttribute('class','blinkingText');

})

test('Handling child window (new tab)', async({page})=>{
    // working on the same blinking text - once click on that and try to access new window elements
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const blinkLocator = page.locator("[href*='documents-request']");
    await expect(blinkLocator).toHaveAttribute('class','blinkingText');


})

test.only('Child windows handling', async({browser})=>{

    const context = await browser.newContext();     
    const page = await context.newPage();  
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');

    const blinkLocator = page.locator("[href*='documents-request']");

    //now if we click on the link - it will take us to new tab(page) which is not in our scope.
    // to access new page ? Now we are not limited to one page - so we have to access through "async ({ browser })""

    // so for that first we have to set browser to - be ready new page will come 
    // here we can use await before click button - and after click button we can't call the next page event
    // we have to perform both in sync - here comes concept of PROMISE

    const [newPage] = await Promise.all( 
        [
            context.waitForEvent('page'),   //listen to any new page - pending,reject,fulfilled
            blinkLocator.click()
        ]
    )
    // this can be use to - multiple tasks perform in same. promise steps will always perform in Array
    // best this of this promise - we can access new page by newPage variable
    
     const newPageRedText = await newPage.locator('.red').textContent();
     console.log("New page text : ", newPageRedText);
     // O/p : Please email us at mentor@rahulshettyacademy.com with below template to receive response

     // suppose we need only website name "rahulshettyacademy.com" from complete text

    const arrayText = newPageRedText.split('@');   // it will divide text into 2 - from @ left[0] and right[1]
    const domainName = arrayText[1].split('.com')[0]; 
    console.log(domainName);

    // now use that domain name in USERNAME in page1
    await userName.type(domainName);
    // await page.pause();

    // Difference b/w textContent() and valueInput()
    // inicially username not had any value - during execution we are getting value and entering it into #username
    // to get/read that run time value we use valueInput()

    // DOM elements/value we can get/read/access by textContent() and for dynamic values we use valueInput()
    console.log(await userName.inputValue());

})

