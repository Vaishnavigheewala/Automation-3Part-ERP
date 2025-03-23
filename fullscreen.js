const { chromium } = require('playwright');

(async () => {
    // Launch Chromium in headful mode with full screen
    const browser = await chromium.launch({
        headless: false, // Run in headful mode (visible browser)
        args: ['--start-maximized'], // Start browser maximized
    });

    // Create a browser context with no viewport restrictions
    const context = await browser.newContext({
        viewport: null, // Use the entire window size
    });

    // Open a new page and navigate to a website
    const page = await context.newPage();
    await page.goto('http://withidforautomation.aquacare.thinkhpconsultant.com:73/'); // Replace with your desired URL

    // Keep the browser open for debugging or testing
    await page.waitForTimeout(10000); // Adjust timeout as needed

    // Close the browser
    await browser.close();




})();
