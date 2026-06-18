const  {test,expect} = require('@playwright/test');

test('@web first test', async( {page} ) =>
     {
      const productName = 'ZARA COAT 3';
      const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client")
   await page.locator("#userEmail").fill("tkishor@gmail.com");
   await page.locator("#userPassword").fill("Tell@555");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   /*await page.locator(".card-body b").first().waitFor();
   await page.locator(`title:has-text("Let's Shop")`).isVisible();
   await expect(page).toHaveTitle(/.*Shop/);
   console.log("title is",await page.title());
   const blinkingtextElement = await page.locator(`a[href="https://techsmarthire.com/"]`).textContent();
  console.log(blinkingtextElement);
   await expect(page.locator('a[target=_blank]')).toContainText('Shortlisted');
   const first = await page.locator('#products').first();
   const cardImgTopElement = (await page.locator('.card-body').first().textContent()).split(" ");
   const alltitle= await cardImgTopElement.findLast().length;
   console.log(alltitle)*/
   await page.locator(".card-body b").first().waitFor();
  /* const allTitles = await page.locator('.card-body b').allTextContents();
   console.log (allTitles);
   const ftitle = await page.locator('.card-body b').first().title();
   console.log(ftitle());*/
   const count  = await products.count();
  // await products.nth(1).locator("text= Add To Cart").click();
   for (let i = 0; i < count; ++i) {
          if( await products.nth(i).locator("b").textContent() === productName)
            {
               await products.nth(i).locator("text= Add To Cart").click();
               break;
            } 

   }

await page.locator("[routerlink*='cart']").click();
await page.locator("div li").first().waitFor();
const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
expect(bool).toBeTruthy();
   });
   
