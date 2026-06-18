// tests/shopping.spec.js
const { test, expect } = require('../pageobjects/fixtures');

test.describe('E-Commerce Core Shopping Flows (Fast API Auth)', () => {

  // Pass your custom 'authenticatedPage' fixture directly as a parameter
  test('Add item to cart without executing UI login forms', async ({ authenticatedPage }) => {
    
    // The browser opens up directly on the dashboard, completely authenticated!
    const productHeading = authenticatedPage.getByRole('heading', { name: 'ADIDAS ORIGINAL' });
    await expect(productHeading).toBeVisible();

    // 1. Locate and click the 'Add To Cart' button inside the Adidas grid card container
    const productCard = authenticatedPage.locator('.col-lg-4, .card-body', 
      { 
      has: productHeading 
      }).first();
    
    await productCard.getByRole('button', { name: 'Add To Cart' }).click();

    // 2. Verify that the navbar badge updates dynamically
    const cartButton = authenticatedPage.locator('button:has-text("Cart"):not(:has-text("Add To Cart"))').first();
    await expect(cartButton).toContainText('1');
    
    console.log("Successfully ran test completely bypassing the UI login workflow.");
  });
});
