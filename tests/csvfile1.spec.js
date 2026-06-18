const { test, expect } = require('../pageobjects/fixtures');
const fs = require('fs');
const path = require('path');

test('Download and parse invoice file from order confirmation screen', async ({ authenticatedPage }) => {
  // Setup: Navigate directly to the final checkout confirmation screen
  // (Assuming you've completed a purchase using the authenticatedPage state)
  await authenticatedPage.goto('https://rahulshettyacademy.com');
  await expect(authenticatedPage.locator('.hero-primary')).toContainText('Thankyou for the order.');

  // 1. Playwright Best Practice: Set up the event listener BEFORE triggering the action
  // Do NOT await the promise here yet!
  const downloadPromise = authenticatedPage.waitForEvent('download');

  // 2. Trigger the file download action by clicking the target link/button
  // In this app, buttons are typically labeled "Click to download excel invoice" or "Download PDF"
  const downloadBtn = authenticatedPage.getByRole('button', { name: /Download.*Invoice|Excel/i }).first();
  await downloadBtn.click();

  // 3. Await the download process to complete and capture the file container metadata
  const download = await downloadPromise;

  // 4. Extract metadata for basic assertions
  const fileName = download.suggestedFilename();
  console.log(`Downloaded file name initialized as: ${fileName}`);
  expect(fileName).toMatch(/order-invoice.*\.csv|xlsx|pdf$/);

  // 5. Save the download payload permanently out of the temporary browser instance folder
  const localSavePath = path.join(__dirname, '../downloads', fileName);
  await download.saveAs(localSavePath);

  // 6. Verify and parse the text inside the file payload (Example: CSV file parsing)
  if (fileName.endsWith('.csv')) {
    const csvContent = fs.readFileSync(localSavePath, 'utf8');
    
    // Assert the content contains data belonging to the bought product
    expect(csvContent).toContain('ADIDAS ORIGINAL');
    console.log("Successfully verified invoice data payload internally.");
  }
  
  // Clean up the local workspace file system after evaluation
  if (fs.existsSync(localSavePath)) {
    fs.unlinkSync(localSavePath);
  }
});
