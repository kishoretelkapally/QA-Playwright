const {test} = require('@playwright/test');


test('scrolltest', async ({page}) =>
{
     const email = "tkishor@gmail.com";
   const productName = 'ZARA COAT 3';
   //const products = page.locator(".card-body");
     console.log("open browser")
     page.goto("https://rahulshettyacademy.com/client")
     await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Tell@555");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   //  await page.waitForLoadState('networkidle');
      const products = page.locator(".card-body");
    await page.evaluate ( () => {
        window.scrollBy (0,700)
    });
})