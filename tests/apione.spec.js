const {test,expect,request} = require('@playwright/test');
const testPayload = {userEmail:"tkishor@gmail.com",userPassword:"Tell@555"};
const orderPayLoad = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
//const loginPayLoad = {userEmail:"anshikaw@gmail.com",userPassword:"Learning@830$3mK3"};
const {APIUtils} = require('../utils/APIUtils');


let token ;
//let orderid;
let response;

test.beforeAll( async () => 
{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,testPayload);
   // token = await apiUtils.gettoken();
    response =  await apiUtils.createOrder(orderPayLoad);

}
    );

test('apione', async({page}) => {

  //  const apicontext = new APIUtils(logintest,testPayload);
    
    await page.addInitScript(value => {
        window.localStorage.setItem('token',value);
       },response.token);
    
    await page.goto('https://rahulshettyacademy.com/client');
    await page.waitForResponse
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (response.orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }

   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});