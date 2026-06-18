class AddOrder {

  constructor(page) {
    this.page = page;
    this.orderslist = page.locator(".card-body ");
    this.dashboardcartbutton = page.locator(" .button,[routerlink = '/dashboard/cart'] ")
    this.cart = page.locator(" .button,[routerlink = '/dashboard/cart'] ")
    this.orders = page.locator("button[routerlink*='myorders']");
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });

  }

  async addToCart(productName) {

    if (await this.continueShoppingButton.isVisible()) {
      await this.continueShoppingButton.click();
    }

    await this.orderslist.locator("b").first().waitFor();
    const ordercount = await this.orderslist.count();
    console.log("count is", ordercount);
    for (let i = 0; i < ordercount; ++i) {
      const titleoforder = await this.orderslist.locator("b").nth(i).textContent();
      console.log("title", titleoforder);
      if (titleoforder === productName) {
        console.log("click");
        await this.orderslist.nth(i).locator(`button:has-text("Add To Cart")`).click();
        console.log("clicked");
        break;
      }
    }
  }

  async ClickCart() {
    await this.dashboardcartbutton.click();

    await this.page.locator("div li").first().waitFor();

  }

}
module.exports = { AddOrder };