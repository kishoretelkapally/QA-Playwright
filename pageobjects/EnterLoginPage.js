//const { networkInterfaces } = require("node:os");

class EnterLoginPage {

constructor(page)
{
    this.page = page;
    this.signInbutton= page.locator("[value='Login']");
    this.userName = page.locator('[type="email"]');
    this.password = page.locator("#userPassword");

}

async Logintest()
{
    
    await this.page.goto('https://rahulshettyacademy.com/client');
   // await this.page.waitForURL('**/client', { timeout: 15000 });
   // await expect(this.page.getByText('Let\'s Shop', { exact: true })).toBeVisible();
    
}

async validLogin(username,password)
{
    await  this.userName.fill(username);
     await this.password.fill(password);
     await this.signInbutton.click();
     await this.page.waitForLoadState('networkidle');

}

}
module.exports = {EnterLoginPage};