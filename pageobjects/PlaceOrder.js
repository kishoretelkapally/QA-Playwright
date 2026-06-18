const {expect} = require('@playwright/test');

class PlaceOrder {

    constructor(page) {
        this.page = page;
        this.checkOutbtn = page.locator("text=Checkout");
        this.placeorder = page.locator(".user__name");
        this.selectCountryElement = page.locator(`input[placeholder="Select Country"]`);

    }

    async clickPlaceOrderButton() {
        console.log("clickPlaceOrderButton function");
       // await this.page.locator('.btnn.action__submit').click();
        await this.page.locator(".action__submit").click();
        await expect(this.page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        const orderId = await this.page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log(orderId);

    }

    async checkOutandSelectCountry() {
        const bool = await this.page.locator("h3:has-text('ZARA COAT 3')").isVisible();
        expect(bool).toBeTruthy();
        await this.checkOutbtn.click();
        await this.page.locator("[placeholder*='Country']").pressSequentially("ind");
        const dropdown = this.page.locator(".ta-results");
        await dropdown.waitFor();
        const optionsCount = await dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; ++i) {
            const text = await dropdown.locator("button").nth(i).textContent();
            if (text === " India") {
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }

        
        

        //  await this.placeorder.waitFor();
        //  console.log("Country Select function");
        //  await this.selectCountryElement.pressSequentially("ind");
        //   await this.page.locator('.ta-results').waitFor();
        //   await this.page.locator(`span:has-text("India")`).first().click();



    }




}
module.exports = { PlaceOrder }