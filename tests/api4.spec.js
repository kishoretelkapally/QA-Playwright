// tests/checkout.spec.js
const { test, expect } = require('../pageobjects/fixtures');

test.describe('E-Commerce Checkout & Billing Verification', () => {

  test('Navigate to cart, fill billing information, and place order', async ({ authenticatedPage }) => {
    // 1. Add an item to the cart first via the dashboard layout
    const productCard = authenticatedPage.locator('.col-lg-4, .card-body', { 
      has: authenticatedPage.getByRole('heading', { name: 'ADIDAS ORIGINAL' }) 
    }).first();
    await productCard.getByRole('button', { name: 'Add To Cart' }).click();

    // 2. Navigate to the Cart view page using the top navigation header button
    const cartHeaderBtn = authenticatedPage.locator('button:has-text("Cart"):not(:has-text("Add To Cart"))').first();
    await cartHeaderBtn.click();
    await expect(authenticatedPage).toHaveURL(/.*cart/);

    // 3. Verify the product exists inside the cart layout, then hit "Checkout"
    await expect(authenticatedPage.locator('.cart li').first()).toBeVisible();
    await authenticatedPage.getByRole('button', { name: 'Checkout' }).click();
    await expect(authenticatedPage).toHaveURL(/.*order/);

    // 4. Verify Billing & Shipping Form Layout Elements are present
   // const paymentTypeSection = authenticatedPage.locator('text=Credit Card');
    const paymentTypeSection = authenticatedPage.getByText('Credit Card', { exact: true });
    const cvvField = authenticatedPage.locator('input[type="text"]').nth(1); // Selects CVV code field
    const nameOnCardField = authenticatedPage.locator('input[type="text"]').nth(2); // Selects Name field
    const couponField = authenticatedPage.locator('input[name="coupon"]');

    await expect(paymentTypeSection).toBeVisible();
    await expect(cvvField).toBeVisible();
    
    // 5. Fill out basic Form details
    await cvvField.fill('123');
    await nameOnCardField.fill('Kishor T');

    // 6. Handle the Dynamic Country Auto-suggest Dropdown (Crucial Step)
    // In this app, typing triggers an async dropdown search list
    const countryInput = authenticatedPage.locator('input[placeholder*="Select Country"]');
    await countryInput.pressSequentially('India', { delay: 100 }); // Mimics real typing to trigger AJAX loading
    
    // Select the target option from the loaded auto-suggest container results
    const dropdownResult = authenticatedPage.locator('.ta-results button').first();
    await dropdownResult.click();

    // 7. Click Place Order
    const submitBtn = authenticatedPage.locator('.action__submit');
    await submitBtn.click();

    // 8. Assert Success Page State Confirmation Banner
    const successMessage = authenticatedPage.locator('.hero-primary');
    await expect(successMessage).toContainText('Thankyou for the order.');
    
    console.log("Verified: Checkout lifecycle complete and order successfully generated.");
  });
});
