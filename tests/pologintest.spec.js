const { test, expect } = require('@playwright/test');
const { PologinmanageTest, POManagerTest } = require('../pageobjects/POManagerTest');
const dataset = JSON.parse(JSON.stringify(require('../utils/Order_TestData.json')));

for (const data of dataset) {

   test(`@smoke test Client App login ${data.productName}`, async ({ page }) => {

      const poManager = new POManagerTest(page);
      const loginpage = poManager.getLoginPage();
      const cartclicktest = poManager.getDashboardPage();
      const checkouttest = poManager.getplaceorderPage();
      const asserttest = poManager.getthanksPage();

      await loginpage.Logintest();
      await loginpage.validLogin(data.username, data.password);

      // FIX: Remove 'counttest' and only pass data.productName
      await cartclicktest.addToCart(data.productName);

      await page.locator(".btn-custom").first().waitFor();
      await cartclicktest.ClickCart();
      await checkouttest.checkOutandSelectCountry();

      // Best Practice Fix: Use 'await' before your assertions
      await expect(page.locator(".user__name [type='text']").first()).toHaveText(data.username);

      await checkouttest.clickPlaceOrderButton();
      await asserttest.getOrderidFromOrdersTable();
   });
}