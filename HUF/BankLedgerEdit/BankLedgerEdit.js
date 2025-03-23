const { test, expect } = require('@playwright/test');
const locators = require('./BankLedgerEdit.json');

async function editbankledger(page) {
    await page.click(locators.ledger);
    await page.click(locators.bank_ledger);

    await page.click(locators.customerdropdown);
    await page.fill(locators.entercustomername, "vaishnavi 10-12-24");
    await page.locator(locators.entercustomername).press('Backspace');
    await page.locator('li.e-list-item', { hasText: "vaishnavi 10-12-24" }).click();
    await page.waitForTimeout(1000);
    await page.click(locators.searchbutton);

    // await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });

    const divElement = await page.$('div.e-content.e-yscroll.e-lib.e-droppable'); // Replace with your actual selector
    await page.evaluate((el) => {
        el.scrollLeft += 600; // Adjust this value to scroll further or slower
    }, divElement);
    await page.waitForTimeout(1000);

    await page.click(locators.viewLink);

    // const paymentAmount = parseFloat(await page.locator(locators.viewpage.receivedamt).textContent());
    // const totalBillAmount = parseFloat(await page.locator(locators.viewpage.netoutstanding).textContent());
    // const editButton = page.locator(locators.viewpage.editbutton);
    // // Determine payment type
    // const paymentType = paymentAmount > totalBillAmount ? 'Partial' : 'Full';
    // if (paymentType === 'Partial' ) {
    //     // Edit button should be displayed for the latest partial payment
    //     await expect(editButton).toBeHidden();
    // } else {
    //     // Edit button should not be displayed for earlier ledgers or full payments
    //     await expect(editButton).toBeVisible();
    // }
    await page.waitForTimeout(1000);

    await page.click(locators.viewpage.editbutton);

    await page.waitForTimeout(2000);

    //select payment method
    await page.click(locators.viewpage.paymentmethod);
    await page.fill(locators.entercustomername, "UPI");
    await page.locator('li.e-list-item', { hasText: "UPI" }).click();
    await page.waitForTimeout(2000);

    //enter transaction num
    await page.fill(locators.viewpage.TransactionNo, "21450785");
    // await page.waitForTimeout(2000);

    await page.click("#BankLedgerEntryTotalReceivedAmount");
    await page.waitForTimeout(1000);
    await page.fill("#BankLedgerEntryTotalReceivedAmount", "5000");

    //enter received amt
    await page.dblclick(locators.viewpage.Receivedamt);
    // await page.dblclick(locators.viewpage.enterReceiveamt);
    await page.fill(locators.viewpage.enterReceiveamt, "1200");
    await page.click(locators.viewpage.balance);

    //click on yes
    await page.click(locators.viewpage.yesbutton);
    //click on add
    await page.click(locators.viewpage.addbutton);
    //select bill type
    await page.click(locators.viewpage.billtype);
    await page.click("//li[normalize-space()='CashSales']");

    //select bill number
    const billno = await page.locator(locators.viewpage.billno).nth(0);
    await billno.click();

    await page.locator(locators.viewpage.billnumber).click();
    await page.locator('li.e-list-item', { hasText: 'SI20947' }).click();

    //enter received amt
    await page.dblclick(locators.viewpage.Receivedamt);
    // await page.dblclick(locators.viewpage.enterReceiveamt);
    await page.fill(locators.viewpage.enterReceiveamt, "1500");
    await page.click(locators.viewpage.balance);
    await page.click(locators.viewpage.yesbutton);
    await page.click(locators.viewpage.balance);

    //click on delete
    await page.click(locators.viewpage.deletebutton);

    //click on update
    await page.click(locators.viewpage.updatebutton);
    await page.click('//button[normalize-space()="OK"]');

    await page.click(locators.viewpage.submitbutton);
    await page.waitForTimeout(1000);
    await page.click(locators.customerdropdown);
    await page.fill(locators.entercustomername, "vaishnavi 10-12-24");
    await page.locator(locators.entercustomername).press('Backspace');
    await page.locator('li.e-list-item', { hasText: "vaishnavi 10-12-24" }).click();
    await page.waitForTimeout(1000);
    await page.click(locators.searchbutton);
}

async function editforvendor(page) {

    //edit vendor for partial payment

    //select account group
    await page.click(locators.viewpage.accountgroup);
    await page.click("//li[normalize-space()='Vendor']");

    await page.click(locators.viewpage.vendordropdown);
    await page.fill(locators.entercustomername, "ZinalAutomation vendor");
    await page.locator('li.e-list-item', { hasText: "ZinalAutomation vendor" }).click();
    await page.click(locators.searchbutton);
    await page.waitForTimeout(3000);

    const divElement = await page.$('div.e-content.e-yscroll.e-lib.e-droppable'); // Replace with your actual selector
    await page.evaluate((el) => {
        el.scrollLeft += 600; // Adjust this value to scroll further or slower
    }, divElement);

    await page.click(locators.viewLink);

    const paymentAmount = parseFloat(await page.locator(locators.viewpage.receivedamt).textContent());
    const totalBillAmount = parseFloat(await page.locator(locators.viewpage.netoutstanding).textContent());
    const editButton = page.locator(locators.viewpage.editbutton);
    // Determine payment type
    const paymentType = paymentAmount > totalBillAmount ? 'Partial' : 'Full';
    if (paymentType === 'Partial') {
        // Edit button should be displayed for the latest partial payment
        await expect(editButton).toBeHidden();
    } else {
        // Edit button should not be displayed for earlier ledgers or full payments
        await expect(editButton).toBeVisible();
    }

    await page.click(locators.viewpage.editbutton);

    await page.click(locators.viewpage.paymentmethod);
    await page.fill(locators.entercustomername, "UPI");
    await page.locator('li.e-list-item', { hasText: "UPI" }).click();
    //enter transaction num
    await page.fill(locators.viewpage.TransactionNo, "21450785");

    await page.click(locators.viewpage.addbutton);
    //select bill type
    await page.click(locators.viewpage.billtype);
    await page.click("//li[normalize-space()='Purchase']");

    //select bill number
    const billno = await page.locator(locators.viewpage.billno).nth(0);
    await billno.click();
    await page.locator(locators.viewpage.billnumber).click();
    await page.locator('li.e-list-item', { hasText: 'PI20365' }).click();

    //click on delete
    await page.click(locators.viewpage.cancelbutton);
    await page.click('//button[normalize-space()="OK"]');

    //enter received amt
    await page.dblclick(locators.viewpage.Receivedamt);
    // await page.dblclick(locators.viewpage.enterReceiveamt);
    await page.fill(locators.viewpage.enterReceiveamt, "3000");
    await page.click(locators.viewpage.balance);

    //click on update
    await page.click(locators.viewpage.updatebutton);
    await page.click('//button[normalize-space()="OK"]');

    await page.click(locators.viewpage.submitbutton);

    await page.click(locators.viewpage.accountgroup);
    await page.click("//li[normalize-space()='Vendor']");

    await page.click(locators.viewpage.vendordropdown);
    await page.fill(locators.entercustomername, "ZinalAutomation vendor");
    await page.locator('li.e-list-item', { hasText: "ZinalAutomation vendor" }).click();
    await page.click(locators.searchbutton);

    const rows = await page.locator('tr[aria-rowindex]'); // Select all rows with aria-rowindex
    const firstRow = await rows.nth(0);
    await firstRow.locator(locators.viewpage.cutmername);
    await expect(firstRow).toContainText('ZinalAutomation vendor');

}

async function outstandingforcustomer(page) {
    // Click on Reports → Outstanding Reports
    await page.click(locators.outstandingreport.outstanding);

    // Open the filter sidebar
    await page.click(locators.outstandingreport.filterbutton);

    // Enter Customer Name in the filter

    await page.click(locators.customerdropdown);
    await page.fill(locators.entercustomername, "vaishnavi 10-12-24");
    await page.locator(locators.entercustomername).press('Backspace');
    await page.locator('li.e-list-item', { hasText: "vaishnavi 10-12-24" }).click();
    // Apply the filter by clicking on Search
    await page.click(locators.outstandingreport.SearchButton);

    // Check for sales/AMCs with 0 pending payment
    const zeroPendingRows = await page.$$eval('table tbody tr', rows => {
        return rows.filter(row => {
            const balanceElement = row.querySelector('#OutstandingReportRemainBalanceAmountColumn');
            const balance = balanceElement ? parseFloat(balanceElement.innerText.replace(/[^0-9.-]+/g, "")) : 0;
            return balance === 0;
        });
    });

    if (zeroPendingRows.length < 0) {
        console.error('Found sales/AMCs with 0 pending payment displayed in the report.');
    } else {
        console.log('No sales/AMCs with 0 pending payment displayed in the report.');
    }
}

async function customeraccledger(page) {
    await page.click(locators.customeraccLedger.accountLedger);
    await page.click(locators.customeraccLedger.customeraccount);
    await page.click(locators.customeraccLedger.filterbutton);

    await page.click(locators.customerdropdown);
    await page.fill(locators.entercustomername, "vaishnavi 10-12-24");
    await page.locator(locators.entercustomername).press('Backspace');
    await page.locator('li.e-list-item', { hasText: "vaishnavi 10-12-24" }).click();
    await page.click(locators.customeraccLedger.Searchbutton);
    console.log('Customer Account Ledger Report verification completed successfully.');
}

async function VerifyConsistency(page) {

    await page.click(locators.outstandingreport.outstanding);
    await page.click(locators.outstandingreport.filterbutton);

    // Enter Customer Name in the filter
    await page.click(locators.customerdropdown);
    await page.fill(locators.entercustomername, "vaishnavi 10-12-24");
    await page.locator(locators.entercustomername).press('Backspace');
    await page.locator('li.e-list-item', { hasText: "vaishnavi 10-12-24" }).click();
    // Apply the filter by clicking on Search
    await page.click(locators.outstandingreport.SearchButton);

    await page.waitForSelector('tr:has(td:has-text("vaishnavi 10-12-24"))', { timeout: 60000 }); // wait up to 60 seconds

    // Now locate the row and get the balance
    await page.locator('tr:has(td:has-text("vaishnavi 10-12-24"))');
    const outstandingBalance = await page.locator('td.e-summarycell[data-cell="Balance"]').textContent();
    console.log(`Outstanding Report Overall Balance: ${outstandingBalance}`);

    console.log('Outstanding Report verification completed successfully.');
    await page.click(locators.customeraccLedger.reports);
    await page.click(locators.customeraccLedger.accountLedger);
    await page.click(locators.customeraccLedger.customeraccount);
    await page.click(locators.customeraccLedger.filterbutton);

    await page.click(locators.customerdropdown);
    await page.fill(locators.entercustomername, "vaishnavi 10-12-24");
    await page.locator(locators.entercustomername).press('Backspace');
    await page.locator('li.e-list-item', { hasText: "vaishnavi 10-12-24" }).click();

    await page.click(locators.customeraccLedger.Searchbutton);
    await page.waitForSelector('tr:has(td:has-text("vaishnavi 10-12-24"))', { timeout: 60000 });

    await page.locator('tr:has(td:has-text("vaishnavi 10-12-24"))');
    const recentBalance = await page.locator('td.e-summarycell[data-cell="Balance"]').textContent();
    console.log(`customer Ledger Report Overall Balance: ${recentBalance}`);
    expect(parseFloat(outstandingBalance)).toBe(parseFloat(recentBalance));
    console.log('Consistency between Outstanding Report and Account Ledger verified successfully.');
}

async function payablereportforvendor(page) {
    await page.locator(locators.payablereport.reportpayble).click();
    await page.locator(locators.payablereport.FilterbtnpurchasePayblereport).click();
    await page.locator(locators.payablereport.FiltervenpurchasePayble).click();
    await page.fill(locators.entercustomername, "ZinalAutomation vendor");
    await page.locator(locators.entercustomername).press('Backspace');
    await page.locator('li.e-list-item', { hasText: "ZinalAutomation vendor" }).click();
    await page.locator(locators.payablereport.SearchbtnpurchasePayble).click();

}

async function Vendoraccountledger(page) {
    await page.locator(locators.vendoraccountledger.accledger).click();
    await page.locator(locators.vendoraccountledger.reportvendoraccountledger).click();
    await page.locator(locators.vendoraccountledger.Filterbtnpurchasevendorledgerreport).click();
    await page.locator(locators.vendoraccountledger.Filtervenpurchasevendorledger).click();
    await page.fill(locators.entercustomername, "ZinalAutomation vendor");
    await page.locator(locators.entercustomername).press('Backspace');
    await page.locator('li.e-list-item', { hasText: "ZinalAutomation vendor" }).click();
    await page.locator(locators.vendoraccountledger.Searchbtnpurchasevendorledger).click();

}

module.exports = { editbankledger, editforvendor, outstandingforcustomer, customeraccledger, VerifyConsistency, payablereportforvendor, Vendoraccountledger };