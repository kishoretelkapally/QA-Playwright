//const {test,expect} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');
const { test, expect } = require('../pageobjects/fixtures');

//test.describe.configure({mode:'parallel'});
test.describe.configure({mode:'serial'});
test.describe('Rahul Shetty Client Login Framework - POM ,custom fixtures', () =>
   {
      test('@Web Successful Login and Navigation Assertion' , async ( {page , loginPage} ) => 
             {
               const loginpage = new LoginPage(page);
               await  loginPage.navigateToUrl();
               await loginPage.loginFlow('tkishor@gmail.com' , 'Tell@555');
               await expect(page).toHaveURL(/.*dashboard/);
             }
         );
   });

   test.describe('Rahul Shetty Client Login Framework - POM', () =>
   {
      test('Successful Login and Navigation Assertion' , async ( {page} ) => 
             {
               const loginPage = new LoginPage(page);
               await  loginPage.navigateToUrl();
               await loginPage.loginFlow('tkishor@gmail.com' , 'Tell@555');
               await expect(page).toHaveURL(/.*dashboard/);
             }
         );
   });

test('@Api test1', async({browser})=>
{
   const context =  await browser.newContext();
   const page =  await context.newPage();
   await page.goto("https://rahulshettyacademy.com/client");
   await page.waitForLoadState('networkidle');
   await page.locator('#userEmail').fill ("tkishor@gmail.com");
   await page.locator('#userPassword').fill("Tell@555");
   await page.locator('#login').click();

}
)

test('@Api test2', async({browser})=>
{
   const context =  await browser.newContext();
   const page =  await context.newPage();
   await page.goto("https://rahulshettyacademy.com/client");
   await page.waitForLoadState('networkidle');
   await page.locator('#userEmail').fill ("tkishor@gmail.com");
   await page.locator('#userPassword').fill("Tell@555");
   await page.locator('#login').click();
   await page.locator('#products').waitFor();
   await clickAddToCartByProductName(page, 'ADIDAS ORIGINAL');

}
)

test('@Api test3', async ( {browser}) => {

   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://rahulshettyacademy.com/client");
   await page.waitForLoadState('domcontentloaded');
   await page.locator('#userEmail').fill("tkishor@gmail.com");
   await page.locator('#userPassword').fill("Tell@555");
   await page.locator('#login').click();
   await page.locator('#products').waitFor();
   await addProductAndVerifyCartCount(page, 'ADIDAS ORIGINAL');

}

),

test ('@APi test4' , async ({browser}) => {

   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://rahulshettyacademy.com/client");
   
   await page.locator('#userEmail').fill("tkishor@gmail.com");
   await page.locator('#userPassword').fill("Tell@555");
   await page.locator("#login").click();
   await expect(page).toHaveURL(/.*dashboard/);
   
   const firstProductHeading = page.getByRole('heading', { name: 'ADIDAS ORIGINAL' });
   await expect(firstProductHeading).toBeVisible({ timeout: 10000 });
   
   await verifyCartCount(page,'ADIDAS ORIGINAL');



}

)

test('Verify toast banner disappears automatically', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  
  // 1. Submit invalid login to trigger the toast alert
  await page.locator('#userEmail').fill("tkishor@gmail.com");
  await page.locator('#userPassword').fill("IncorrectPassword123");
  await page.locator("#login").click();
  
  // 2. Locate the toast container
  //const toastBanner = page.locator('.toast-container, div[role="alert"]');
  const toastBanner = page.getByRole('alert');
  
  // 3. Step 1: Assert it successfully appears first
  await expect(toastBanner).toBeVisible({ timeout: 5000 });
  await expect(toastBanner).toContainText("Incorrect email or password.");
  
  // 4. Step 2: Assert it automatically fades out/disappears
  // Adjust timeout if the application keeps the toast active longer (e.g., 7000ms)
  await expect(toastBanner).toBeHidden({ timeout: 7000 });
  
  console.log("Verified: Toast banner popped up and disappeared automatically.");
});


async function clickAddToCartByProductName(page, productName) {
  try {
    // Dynamically inject the product name into the sibling locator
    const addToCartBtn = page.locator(`h5:has-text("${productName}") ~ button:has-text("Add To Cart")`);
    
    // Wait for the button to be visible and click it
    await addToCartBtn.waitFor({ state: 'visible', timeout: 5000 });
    await addToCartBtn.click();
    
    console.log(`Successfully clicked 'Add To Cart' for ${productName}`);
  } catch (error) {
    console.error(`Failed to click 'Add To Cart' for ${productName}:`, error.message);
    throw error; // Re-throw to fail the test if needed
  }
}

async function addProductAndVerifyCartCount(page, productName) {
  // 1. Locate the Cart element (adjust selector if there is a separate badge sub-element)
 // const cartButton = page.locator('button:has-text("Cart")');
//const cartButton = page.getByRole('button', { name: /^Cart$/i }).or(
//page.locator('button:has-text("Cart"):not(:has-text("Add To Cart"))')).first();

const cartButton = page.locator('button:has-text("Cart"):not(:has-text("Add To Cart"))').first();
  
  // 2. Get the initial count before clicking
  const initialText = await cartButton.textContent();
  // Extract numbers from text (e.g., "Cart 0" or empty defaults to 0)
  const countMatch = initialText.match(/\d+/);
  const beforeCount = countMatch ? parseInt(countMatch[0], 10) : 0;

  // 3. Locate and click the 'Add To Cart' button inside the specific product card
  const productCard = page.locator('.col-lg-4, .card-body', { 
    has: page.getByRole('heading', { name: productName }) 
  }).first();
  
  const addToCartBtn = productCard.getByRole('button', { name: 'Add To Cart' });

 
  await addToCartBtn.click();

  // 4. Assert that the cart count increases by 1
  const expectedCount = beforeCount + 1;
  
  // Use Playwright's web-first locator assertion to wait for the UI text to update dynamically
  await expect(cartButton).toContainText(expectedCount.toString());
  
  console.log(`Verified: Cart count increased from ${beforeCount} to ${expectedCount}`);
}

async function verifyCartCount(page, productName) {
  // 1. Uniquely identify the navigation cart counter element
  const cartButton = page.locator('button:has-text("Cart"):not(:has-text("Add To Cart"))').first();

  // 2. Safely parse the current item count
  const initialText = await cartButton.textContent();
  const countMatch = initialText.match(/\d+/);
  const beforeCount = countMatch ? parseInt(countMatch, 10) : 0;

  // 3. Locate the single, self-contained product card grid element
  /*const productCard = page.locator('.col-lg-4, .card-body', { 
    has: page.getByRole('heading', { name: productName }) 
  }).first();*/
  
  // 4. Scoping this action ensures it matches exactly 1 matching item button

  const addToCartBtn = page.locator(`.card:has(h5:has-text("${productName}")) button:has-text("Add To Cart")`);
  //const addToCartBtn = productCard.getByRole('button', { name: 'Add To Cart' });
  await addToCartBtn.click();

  // 5. Explicitly await the text changing dynamically
  const expectedCount = beforeCount + 1;
  await expect(cartButton).toContainText(expectedCount.toString());
  
  console.log(`Verified: Cart count increased from ${beforeCount} to ${expectedCount}`);
}
