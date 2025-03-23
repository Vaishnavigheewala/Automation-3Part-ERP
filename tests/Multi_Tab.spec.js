const { test, expect } = require('@playwright/test');
const locators = require('../Archie/Chargeable Service Ticket/Chargeable_Service_Ticket.json');
const fs = require('fs');
const path = require('path');

//******************Reusable functions imported***********************/
const { log_in, Variable_File_Path } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
let vendor_Bill;

test('Handle new tab and switch back', async ({ page, context }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    console.log('Step 2: Dashboard Page displayed');
    // Step 1: Navigate to the page
    // await page.goto('http://192.168.29.112:85/'); // Replace with your URL
    await selectmenu(page, "Reports"); // Select "Reports" menu
    // Step 2: Click to open a new tab
    await page.locator('#NavbarReportsMenuAccountLedgerModule').click();
    await page.locator('#NavbarReportsMenuAccountLedgerModuleVendorAccountLedgerReport').click();
    await page.waitForTimeout(1000);
    // Capture the vendor bill number before clicking
    vendor_Bill = await page.locator('#VendorAccountLedgerReportGridVendorTransactionNoColumn').nth(1).textContent();
    console.log("Vendor Bill: ", vendor_Bill);
    // Wait for new tab to open
    let [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.locator('#VendorAccountLedgerReportGridVendorTransactionNoColumn').nth(1).click(), // Click to open new tab
    ]);
    console.log("Bill no link clicked");

    // Ensure new tab loads properly
    await newPage.waitForLoadState();
    // expect(newPage.url()).toContain('http://192.168.29.112:85/'); // Verify expected URL

    // Ensure the new tab is fully loaded
    await newPage.waitForLoadState();
    // **Wait for the element to appear**
    try {
        await newPage.waitForSelector('#PurchaseViewGSTBillNumber', { timeout: 5000 });
        console.log("Element Found!");
    } catch (e) {
        console.log("Element NOT Found! Possible issues: selector incorrect, slow loading, or inside an iframe.");
    }
    await newPage.waitForTimeout(1000);
    // Fetch bill number from new tab (Fix applied here)
    let bill_From_New_Tab = await newPage.locator('#PurchaseViewGSTBillNumber').inputValue();
    console.log("Bill from New Tab: ", bill_From_New_Tab);
    if (vendor_Bill.trim() === bill_From_New_Tab.trim()) {
        console.log("✅ Bill numbers match. Closing new tab.");
    } else {
        console.log("❌ Bill numbers do not match.");
    }
    // Close the new tab
    await newPage.close();
    // Ensure the original page is still open
    // await expect(page).toHaveURL('http://192.168.29.112:85/vendoraccountledger');
});
