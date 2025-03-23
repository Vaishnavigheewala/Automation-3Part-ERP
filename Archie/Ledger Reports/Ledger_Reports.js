const { test, expect } = require('@playwright/test');
const locators = require('./Ledger_Reports.json');

async function Verify_Bank_Ledger(page, customername) {
     console.log("==================")
    console.log("Cash Ledger");
    await page.locator(locators.Ledger_Reports.Ledger_Reports_Menu).click();
    await page.locator(locators.Ledger_Reports.Bank_Ledger_Page).click();

    // Verify Ungrouping
    await page.locator("span.e-ungroupbutton.e-icons.e-icon-hide").click();

    // Verify All Feild visible
    const VoucherNo = await page.locator(locators.Bank_Ledger.VoucherNo).nth(0).isVisible();
    const VoucherDate = await page.locator(locators.Bank_Ledger.VoucherDate).nth(0).isVisible();
    const NatureType = await page.locator(locators.Bank_Ledger.NatureType).nth(0).isVisible();
    const AccountName = await page.locator(locators.Bank_Ledger.AccountName).nth(0).isVisible();
    const PaymentType = await page.locator(locators.Bank_Ledger.PaymentType).nth(0).isVisible();
    const BankName = await page.locator(locators.Bank_Ledger.BankName).nth(0).isVisible();
    const BankAccNo = await page.locator(locators.Bank_Ledger.BankAccNo).nth(0).isVisible();
    const BankCharge = await page.locator(locators.Bank_Ledger.BankCharge).nth(0).isVisible();
    const ChequeNo = await page.locator(locators.Bank_Ledger.ChequeNo).nth(0).isVisible();
    const TransactionNo = await page.locator(locators.Bank_Ledger.TransactionNo).nth(0).isVisible();
    const ExchangeAmt = await page.locator(locators.Bank_Ledger.ExchangeAmt).nth(0).isVisible();
    const Blance = await page.locator(locators.Bank_Ledger.Blance).nth(0).isVisible();

    console.log("   VoucherNo is Visible:",VoucherNo);
    console.log("   Voucher Date is Visible:",VoucherDate);
    console.log("   Nature Type is Visible:",NatureType);
    console.log("   Account Name is Visible:",AccountName);
    console.log("   Payment Type is Visible:",PaymentType);
    console.log("   BankName is Visible:",BankName);
    console.log("   BankAcc Number is Visible:",BankAccNo);
    console.log("   Bank Charge is Visible:",BankCharge);
    console.log("   Cheque Number is Visible:",ChequeNo);
    console.log("   Transaction Number is Visible:",TransactionNo);
    console.log("   Exchange Amount is Visible:",ExchangeAmt);
    console.log("   Blance is Visible:",Blance);


    // Verify Pdf Export
    await page.waitForTimeout(1000);
    await page.locator(locators.Bank_Ledger.Pdf_Export).click();

    // Verify Search 
    await page.waitForTimeout(1000);
    await page.locator(locators.Bank_Ledger.Filter_btn).click();

    await page.locator(locators.Bank_Ledger.Customer_Dropdown).click();
    await page.fill(locators.Bank_Ledger.entercustomername, customername);
    await page.locator('li.e-list-item', { hasText: customername }).click();

    await page.locator(locators.Bank_Ledger.Search_Btn).click();
}

async function Verify_Cash_Ledger(page, customername) {
    console.log("==================")
    console.log("Cash Ledger");
    await page.locator(locators.Ledger_Reports.Ledger_Reports_Menu).click();
    await page.locator(locators.Ledger_Reports.Cash_Ledger_Page).click();

    // Verify Ungrouping
    await page.locator("span.e-ungroupbutton.e-icons.e-icon-hide").click();

    // Verify Feild Viible
    const VoucherNo = await page.locator(locators.Cash_Ledger.VoucherNo).nth(0).isVisible();
    const VoucherDate = await page.locator(locators.Cash_Ledger.VoucherDate).nth(0).isVisible();
    const NatureType = await page.locator(locators.Cash_Ledger.NatureType).nth(0).isVisible();
    const AccountName = await page.locator(locators.Cash_Ledger.AccountName).nth(0).isVisible();
    const ExchangeAmt = await page.locator(locators.Cash_Ledger.ExchangeAmt).nth(0).isVisible();
    const NetAmt = await page.locator(locators.Cash_Ledger.NetAmt).nth(0).isVisible();

    console.log("   VoucherNo is Visible:",VoucherNo);
    console.log("   Voucher Date is Visible:",VoucherDate);
    console.log("   Nature Type is Visible:",NatureType);
    console.log("   Account Name is Visible:",AccountName);
    console.log("   Net Amount is Visible:",NetAmt);
    console.log("   Exchange Amount is Visible:",ExchangeAmt);


    // Verify Pdf Export
    await page.waitForTimeout(1000);
    await page.locator(locators.Cash_Ledger.Pdf_Export).click();

    // Verify Search
    await page.waitForTimeout(1000);
    await page.locator(locators.Cash_Ledger.Filter_btn).click();

    await page.locator(locators.Cash_Ledger.Customer_Dropdown).click();
    await page.fill(locators.Cash_Ledger.entercustomername, customername);
    await page.locator('li.e-list-item', { hasText: customername }).click();

    await page.locator(locators.Cash_Ledger.Search_Btn).click();

}

module.exports = { Verify_Bank_Ledger, Verify_Cash_Ledger }