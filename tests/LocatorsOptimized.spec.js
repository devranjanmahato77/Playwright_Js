const { test, expect } = require('@playwright/test');

test('Locators Practice', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise');
    
    const userName = page.locator('#username');
    const passWord = page.locator("[type='password']");
    const signIn = page.locator('#signInBtn');


    await userName.fill('learning');

    await passWord.fill('Learning@830$3mK2');

    await signIn.click();

    console.log("Error message:", await page.locator("[style*='block']").textContent());      //style* --> * means LIKE operator (complete the value)

    // if we want to erase existing filled field like username = learning to empty
    await userName.fill('');

    // refill it
    await userName.fill('rahulshettyacademy');

    await signIn.click();

// Task: after login - select the first element
    // console.log(await page.locator(".card-body a").textContent());

// In ".card-body a" we have 4 element and your task to select 1st (iPhone X)

// <a href="#">iphone X</a> aka getByRole('link', { name: 'iphone X' })
// <a href="#">Samsung Note 8</a> aka getByRole('link', { name: 'Samsung Note' })
// <a href="#">Nokia Edge</a> aka getByRole('link', { name: 'Nokia Edge' })
// <a href="#">Blackberry</a> aka getByRole('link', { name: 'Blackberry' })

// way 1
    console.log(await page.locator(".card-body a").nth(0).textContent());
// way 2
    console.log(await page.locator(".card-body a").first().textContent());
// If you want 3rd element (product) 
    console.log(await page.locator(".card-body a").nth(2).textContent());

// If I want all the products 
const cardTitle = page.locator(".card-body a");

    const allTitles = await cardTitle.allTextContents();    // it wil stored in array
    console.log(allTitles); 

})