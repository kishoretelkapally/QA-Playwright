const { expect } = require("@playwright/test");

class ThanksPage{

    constructor(page){
        this.page = page;
      
        
   }

   async getOrderidFromOrdersTable(){
    await expect (this.page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ");
const orderId = await this.page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log(orderId);
await this.page.locator(`button:has-text("ORDERS")`).click();
//await page.locator("button[routerlink*='myorders']").click();
   await this.page.locator("tbody").waitFor();
   const rows = await this.page.locator("tbody tr");
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
    const orderIdDetails = await this.page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

   }


   
}
module.exports = {ThanksPage}