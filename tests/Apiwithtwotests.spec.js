const { test, expect, request } = require('@playwright/test');
let apiwebContext;

test.beforeAll(async ({ browser }) => {
    const apiContext = await browser.newContext();
    const page = await apiContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill("tkishor@gmail.com");
    await page.locator('#userPassword').fill("Tell@555");
    await page.locator('#login').click();
    await page.locator('button[routerlink="/dashboard/"]').first().waitFor();
    await apiContext.storageState({ path: 'state.json' });
    apiwebContext = await browser.newContext({ storageState: 'state.json' });
}
);


test('Login with Api Web context', async ({ browser }) => {

    const page = await apiwebContext.newPage();

    //login
    await page.goto("https://rahulshettyacademy.com/client");
         

}
);

test('check with orders are not available', async ({ browser }) => {
    //Test Data
    const noordertxt = "You have No Orders to show at this time. Please Visit Back Us";
    const loginurl = "https://rahulshettyacademy.com/client";

    //Browser call
    const page = await apiwebContext.newPage();

    //Locators
    const ordersButton = page.getByRole('button', { name: 'ORDERS' });
    const gobacktoshopbtn = page.locator('div button[routerlink ="/dashboard"]');


    //Page actions for Login
    await page.goto(loginurl);

    //Order page verification
    await ordersButton.click();
    await expect(page.locator('.mt-4')).toBeVisible
    const actualtextinorders = await page.locator('.mt-4').textContent();
    await expect(noordertxt === actualtextinorders).toBeTruthy;
    await gobacktoshopbtn.click();

}

);


