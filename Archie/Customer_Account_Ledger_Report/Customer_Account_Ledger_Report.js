const { test, expect } = require('@playwright/test');
const locators = require('./Customer_Account_Ledger_Report.json');
const { TIMEOUT } = require('dns');
const fs = require('fs');
// import pdf from 'pdf-parse';  // Install using: npm install pdf-parse
// import path from 'path';


async function Customer_Account_Ledger_Report_Menu(page) {
    console.log("=======================================");
    console.log("Customer Account Ledger Report");
    console.log("=======================================");
    console.log('Report Menu Clicked');
    await page.locator(locators.Reports.Account_Ledger_Menu).click();
    console.log('Account Ledger Menu Clicked');
    await page.locator(locators.Reports.Customer_Account_Ledger_Menu).click();
    console.log('Customer Account Ledger Menu Clicked');
}

async function Verify_Page(page) {
    console.log("----- Verify Page ------");
    await page.waitForTimeout(1000);
    let Back_Btn = await page.locator(locators.Customer_Account_Ledger.Back_Btn).isVisible();
    let PDF_Export_Btn = await page.locator(locators.Customer_Account_Ledger.PDF_Export).isVisible();
    let Filter_Btn = await page.locator(locators.Customer_Account_Ledger.Filter_Button).isVisible();

    console.log("Back Btn =", Back_Btn);
    console.log("PDF Export Btn =", PDF_Export_Btn);
    console.log("Filter Btn =", Filter_Btn);
    await page.waitForTimeout(1000);
    await page.locator(locators.Customer_Account_Ledger.UnGroup).click();
    console.log('Gustomer Groping Removed');
    await page.waitForTimeout(2000);
    await page.reload();
    await page.waitForTimeout(1000);
    console.log("Page Refresh");
}

async function Grid_Verify(page) {
    console.log("----- Verify Grid ------");
    let Var_Grid_Date = await page.locator(locators.Grid.Grid_Date).isVisible();
    let Var_Grid_Company = await page.locator(locators.Grid.Company_Name).isVisible();
    let Var_Grid_Address = await page.locator(locators.Grid.Address).isVisible();
    let Var_Grid_Mobile = await page.locator(locators.Grid.Mobile).isVisible();
    let Var_Grid_Bill_No = await page.locator(locators.Grid.Bill_No).isVisible();
    let Var_Grid_Voucher_No = await page.locator(locators.Grid.Voucher_No).isVisible();
    let Var_Grid_Description = await page.locator(locators.Grid.Description).isVisible();
    let Var_Grid_Debit = await page.locator(locators.Grid.Debit).isVisible();
    let Var_Grid_Credit = await page.locator(locators.Grid.Credit).isVisible();
    let Var_Grid_Exchange_Amt = await page.locator(locators.Grid.Exchange_Amt).isVisible();
    let Var_Grid_Balance = await page.locator(locators.Grid.Balance).isVisible();

    console.log("Date = ", Var_Grid_Date);
    console.log("Company = ", Var_Grid_Company);
    console.log("Address = ", Var_Grid_Address);
    console.log("Mobile = ", Var_Grid_Mobile);
    console.log("Bill No = ", Var_Grid_Bill_No);
    console.log("Voucher No = ", Var_Grid_Voucher_No);
    console.log("Description = ", Var_Grid_Description);
    console.log("Debit = ", Var_Grid_Debit);
    console.log("Credit = ", Var_Grid_Credit);
    console.log("Exchenge amt = ", Var_Grid_Exchange_Amt);
    console.log("Balance = ", Var_Grid_Balance);
}

async function Select_Customer(page, Customer) {
    console.log("----- Customer Select ------");
    await page.locator(locators.Customer_Account_Ledger.Filter_Button).click();
    console.log("Inventory Stock Report Filter Btn Clicked.");
    await page.waitForTimeout(1000);
    if (Customer != null) {
        await page.locator(locators.Customer_Account_Ledger.Customer_Class).click();
        await page.fill(locators.Customer_Account_Ledger.Input_Class, Customer);
        await page.locator('li.e-list-item', { hasText: Customer }).click();
        await page.waitForTimeout(300);
        console.log("Customer Account Ledger Report Customer Selected = ", Customer);
    }
    await page.waitForTimeout(500);
    await page.locator(locators.Customer_Account_Ledger.Search).click();
    console.log("Search Click");
    await page.waitForTimeout(1000);
}

async function PDF_Export(page) {
    await page.locator(locators.Customer_Account_Ledger.PDF_Export).click();
    await page.waitForTimeout(5000);
    console.log("PDF Export Click");
}

async function downloadAndVerifyPDF(page, buttonSelector, expectedText) {
    // Define the download directory
    let downloadPath = path.resolve(__dirname, 'downloads');
    if (!fs.existsSync(downloadPath)) {
        fs.mkdirSync(downloadPath);
    }
    // Start waiting for the download before clicking the button
    let [download] = await Promise.all([
        page.waitForEvent('download'), // Wait for the download to start
        page.click(buttonSelector) // Click the button to trigger download
    ]);
    // Save the downloaded PDF file
    let pdfPath = path.join(downloadPath, download.suggestedFilename());
    await download.saveAs(pdfPath);
    // Read and parse the PDF file
    let dataBuffer = fs.readFileSync(pdfPath);
    let pdfData = await pdf(dataBuffer);
    let pdfText = pdfData.text;
    console.log('Extracted PDF Text:', pdfText); // Debugging purpose
    // Validate the required data is present in the PDF
    expect(pdfText).toContain(expectedText);
    // Cleanup: Delete the file after validation
    fs.unlinkSync(pdfPath);
}

// Function to download and verify multiple texts in the PDF
async function Download_Verify_PDF(page, buttonSelector, expectedTexts = []) {
    // Define the download directory
    let downloadPath = path.resolve(__dirname, 'downloads');
    if (!fs.existsSync(downloadPath)) {
        fs.mkdirSync(downloadPath);
    }
    // Start waiting for the download before clicking the button
    let [download] = await Promise.all([
        page.waitForEvent('download'), // Wait for the download to start
        page.click(buttonSelector) // Click the button to trigger download
    ]);
    // Save the downloaded PDF file
    let pdfPath = path.join(downloadPath, download.suggestedFilename());
    await download.saveAs(pdfPath);
    // Read and parse the PDF file
    let dataBuffer = fs.readFileSync(pdfPath);
    let pdfData = await pdf(dataBuffer);
    let pdfText = pdfData.text;
    console.log('Extracted PDF Text:', pdfText); // Debugging purpose
    // Validate multiple expected texts
    for (const text of expectedTexts) {
        expect(pdfText).toContain(text, `Expected text "${text}" not found in PDF`);
    }
    // Cleanup: Delete the file after validation
    fs.unlinkSync(pdfPath);
}


module.exports = { Verify_Page, Customer_Account_Ledger_Report_Menu, Select_Customer, Grid_Verify, PDF_Export, Download_Verify_PDF };