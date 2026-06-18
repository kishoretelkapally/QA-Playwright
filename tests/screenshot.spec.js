const {test} = require('@playwright/test');

test('Element screenshot', async ({page}) =>
    {
       await page.goto ("https://www.locator-labs.com/")
        await page.waitForLoadState('networkidle');
        let element = page.getByText('Now Available as Chrome Extension, Desktop App & NPM Package')
        await element.screenshot({
        path: 'screenshot/heaing.png'
       })
  
    }
)