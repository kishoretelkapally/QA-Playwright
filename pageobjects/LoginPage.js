const {expect} = require('@playwright/test');

class LoginPage{

    constructor(page){
        this.page = page;
        this.url = ("https://rahulshettyacademy.com/client");
        
        // locators
        this.username = page.locator ("#userEmail");
        this.password = page.locator ('#userPassword');
        this.loginButton = page.locator('#login');
        this.toastAlert =  page.locator('.toast-container, div[role="alert"]');

        // validation error message

        this.emailErrorMessage = page.locator('div:has-text("*Email is required")');
        this.passwordErrorMessage = page.locator(page.locator('div:has-text("*Password is required")'));
    }

    async navigateToUrl(){
        await this.page.goto(this.url);
    }

    async loginFlow(username,password){
        if(username) await this.username.fill(username);
        if(password) await this.password.fill(password);
        await this.loginButton.click();
    }

    // Reusable Assertion: Verify login failure toast message
  async verifyToastErrorMessage(expectedMessage) {
    await expect(this.toastAlert).toBeVisible({ timeout: 5000 });
    await expect(this.toastAlert).toContainText(expectedMessage);
  }

  // Reusable Assertion: Verify standard blank form validation rules
  async verifyEmptyFormErrors() {
    await expect(this.emailRequiredError.last()).toBeVisible();
    await expect(this.passwordRequiredError.last()).toBeVisible();
  }
}

module.exports = { LoginPage };

