const { Given, When, Then , setDefaultTimeout } = require('@cucumber/cucumber');
//const { POManager } = require('../pageobjects/POManager');
setDefaultTimeout(60000); 
const { PologinmanageTest, POManagerTest } = require('../../pageobjects/POManagerTest');

const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');
//const { chromium } = require('@playwright/test'); 

Given('a login  to E commerce application with {string} and {string}', { timeout: 60000 }, async function (username, password) {
  // Write code here that turns the phrase above into concrete actions

const browser = await playwright.chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  this.poManager = new POManagerTest(page);
  //js file- Login js, DashboardPage
  const products = page.locator(".card-body");
  const loginPage = this.poManager.getLoginPage();
  await loginPage.Logintest();
  await loginPage.validLogin(username, password);
  
})

When('Add {string} to Cart', async function (productName) {
  const cartclicktest = this.poManager.getDashboardPage();
  // Write code here that turns the phrase above into concrete actions
    const counttest = cartclicktest.countoforders();
      await cartclicktest.addToCart(counttest,productName);

});

Then('Verify {string} displayed in Cart', async function () {
  // Write code here that turns the phrase above into concrete actions
  await page.locator(".btn-custom").first().waitFor();
  await cartclicktest.ClickCart();

});

When('Enter Valid details and Place the order', async function () {
  // Write code here that turns the phrase above into concrete actions
     const checkouttest = this.poManager.getplaceorderPage();
     await checkouttest.checkOutandSelectCountry();
      expect(page.locator(".user__name [type='text']").first()).toHaveText(data.username);
      await checkouttest.clickPlaceOrderButton();

});

Then('Verify Order in the Order History page', async function () {
  // Write code here that turns the phrase above into concrete actions
  const asserttest = this.poManager.getthanksPage();
  await asserttest.getOrderidFromOrdersTable();
});