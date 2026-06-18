const test = require('@playwright/test');

test('First Test', async ({browser}) =>
{
        // open the browser
        const context = await browser.newContext();
        const page =  await context.newPage();
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        //enter login
        // enter password
        // submit
        

});

test('@web First mail to google Test', async ({page}) =>
{
        // open the browser
        await page.goto("https://google.com/");
      
        //enter login
        // enter password
        // submit
        
});
