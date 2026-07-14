// Task 2: 
// Login
// Select the product 
// add to card
// put payment details and checkout
// go to thank you page
// go to order history and view it. 

const { test, expect } = require('@playwright/test');

test('Website', async ({ page }) => {

  const userName = 'abclmn@o2.com';
  const productName = 'ZARA COAT 3';
  const products = await page.locator('.card-body');

  // go wo website
  await page.goto("https://rahulshettyacademy.com/client/");

  //Login

  await page.getByPlaceholder('email@example.com').fill(userName);
  await page.getByPlaceholder('enter your passsword').fill('Abcd@1234');
  await page.getByRole('button', { name: 'Login' }).click();




  await page.locator(".card-body b").first().waitFor();   // load the product object
  const titles = await page.locator(".card-body b").allTextContents();  // get all the products name
  console.log("Titles: ", titles);

  // Pass product name dynamically and select that product and add to card
  await products.filter({ hasText: productName }).getByRole('button', { name: 'Add To Cart' }).click();

  //Go to Cart page - multiple Cart button present in the page, so we need to use getByRole() with getByRole() to find the correct one
  await page.getByRole("listitem").getByRole('button', { name: 'Cart' }).click();

  //wait to load all add to cart list - we are provide this wait because .isvisible() not have auto wait
  await page.locator("div li").first().waitFor();

  // verified product select is present
  await expect(page.getByText(productName)).toBeVisible();

  // check out
  await page.getByRole('button', { name: 'Checkout' }).click();
  // await page.pause();

  // checking - Credit Card Number 
  const creditCardNumber = page.locator('text=Credit Card Number ').locator('xpath=..//input');
  await creditCardNumber.clear();
  await creditCardNumber.pressSequentially('4785256314526985');
  // const expiryDate = page.locator('text=Expiry Date ').locator('xpath=..//select');
  // await expiryDate.nth(0).selectOption('08');
  // await expiryDate.nth(1).selectOption('22');
  // await page.locator('text=Name on Card').locator('xpath=..//input').fill('John Doe');
  // await page.locator('text=CVV Code ').locator('xpath=..//input').fill('787');

  // await page.getByLabel('Expiry Date').nth(0).selectOption('08');
  // await page.getByLabel('Expiry Date').nth(1).selectOption('22');

  await page.locator('select.input.ddl').first().selectOption('08');
  await page.locator('select.input.ddl').last().selectOption('22');

  // await page.locator('.field.small').filter({hasText:'Name on Card'}).getByRole('textbox').fill('John Doe');
  // await page.locator('.field.small').filter({hasText:'CVV Code'}).getByRole('textbox').fill('787');

  await page.locator('text=Name on Card').locator('xpath=..//input').fill('John Doe');
  await page.locator('text=CVV Code ').locator('xpath=..//input').fill('787');




  // //validate email id
  // await expect(page.locator(".user__name [type='text']").first()).toHaveText(userName);

  await page.getByPlaceholder("Select Country").pressSequentially('ind');

  await page.getByRole("button",{name:"India"}).nth(1).click();

  // const countryDropdown = page.locator(".ta-results")
  // await countryDropdown.waitFor();
  // const count = await countryDropdown.locator("button").count()
  // for (let i = 0; i < count; i++) {
  //   const text = await countryDropdown.locator("button").nth(i).textContent();
  //   if (text === ' India') {
  //     await countryDropdown.locator("button").nth(i).click();
  //     console.log("clickIndia");
  //     break
  //   }
  // }
  // // place order
  // await page.locator('text=Place Order ').click();

  await page.getByText('Place Order').click();

  // //Thank you page
  // expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

  await expect(page.getByText('Thankyou for the order.')).toBeVisible();
  
  // await page.locator("text=Click To Download Order Details in CSV").click();
  // const productID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  // console.log("Id:",productID);
  // await page.locator("label[routerlink*='myorders']").click();

  // await page.locator("tbody").waitFor();

  // // View my order
  // const productTableRow = await page.locator('tbody tr');
  // const rowLength = await productTableRow.count();
  // console.log(rowLength);




  // for (let i = 0; i < rowLength; i++) {
  //    const rowOrderId = await productTableRow.nth(i).locator("th").textContent();
  //    if(productID.includes(rowOrderId)){
  //     await productTableRow.nth(i).locator("text=View").click();
  //     break;
  //    }
  // }

  // // await expect(page.locator(".email-title").toHaveText(" order summary "));
  // await expect(page.locator('.email-title')).toHaveText(/order summary/i);
  // const orderIdDetails = await page.locator('.col-text').textContent();
  // await expect(productID.includes(orderIdDetails)).toBeTruthy();

  await page.pause();
});

