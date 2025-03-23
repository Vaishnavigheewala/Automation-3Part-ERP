const { test, expect } = require('@playwright/test');
const locators = require('./VerifyPurchase.json');
const { TIMEOUT } = require('dns');
const fs = require('fs');


async function selectsubmenupurchase(page, menu) {
    if (menu == "Transaction") {
        await page.locator(locators.VerifyPurchase.purchase_menu).click();
        await page.locator(locators.VerifyPurchase.purchase_page).click();
        await expect(page.locator('li.breadcrumb-item.active', { hasText: 'Purchase Register' })).toBeVisible();
    }
}

async function verify_search_purchase(page, vendor) {
    const date = await page.isVisible(locators.VerifyPurchase.puchase_date);
    const vendor_name = await page.isVisible(locators.VerifyPurchase.vendordropdown);

    console.log(`date: ${date}`);
    console.log(`Customer: ${vendor_name}`);

    await page.waitForTimeout(1000);
    await page.locator(locators.VerifyPurchase.vendordropdown).click();
    await page.fill(locators.VerifyPurchase.entervendorname, vendor);
    await page.locator('li.e-list-item', { hasText: vendor }).click();

    await page.waitForTimeout(1000);
    await page.locator(locators.VerifyPurchase.search_btn).click();
    console.log('Search Functionallity Working Sucess')


}
async function verify_purchase(page) {
    await page.waitForTimeout(1000);
    await page.locator(locators.VerifyPurchase.reset_btn).click();
    console.log('Reset Functionallity working Sucess');

    await page.waitForTimeout(1000);
    await page.locator(locators.VerifyPurchase.add_btn).click();
    await page.locator(locators.VerifyPurchase.close_btn).click();
    console.log('Verify Add New button');

    await page.waitForTimeout(1000);
    await page.locator(locators.VerifyPurchase.pdf_btn).click();
    console.log("Verify PDF Button");

}

async function verifyPurchaseGrid(page) {
    const columns = [
        locators.verify_grid.Regular_bill,
        locators.verify_grid.vendor_bill,
        locators.verify_grid.bill_date,
        locators.verify_grid.vendor_name,
        locators.verify_grid.pay_type,
        locators.verify_grid.Invoice_type,
        locators.verify_grid.Tax_method,
        locators.verify_grid.state,
        locators.verify_grid.qty,
        locators.verify_grid.Add_less,
        locators.verify_grid.round_off,
        locators.verify_grid.net_amount,

    ];

    for (const column of columns) {
        const isVisible = await page.isVisible(column);
        console.log(`${column} visible: ${isVisible}`);
    }
}

async function viewlink(page) {

    await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });
    /*********Scroll Right******************/
    await page.waitForTimeout(3000);
    const divElement = await page.$('div.e-content.e-yscroll.e-lib.e-droppable'); // Replace with your actual selector
    await page.evaluate((el) => {
        el.scrollLeft += 600; // Adjust this value to scroll further or slower
    }, divElement);

    //Locate and click the "view" Button
    const rows = await page.locator('tr[aria-rowindex]'); // Select all rows with aria-rowindex
    const firstRow = await rows.nth(0); // Select the first row
    const viewButton = await firstRow.locator('a#PurchaseViewButton'); //Adjust this with the actual selector for the "View"

    // Check if the "View" button is visible
    const isVisible = await viewButton.isVisible();
    if (isVisible) {
        console.log('View button is visible. Proceeding with click.');
        await viewButton.click();
        console.log('Clicked on "View" button.');
    } else {
        console.log('View button is not found or not visible.');
    }
    await page.waitForTimeout(1000);
    await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight, { timeout: 30000 }); });
    await page.waitForTimeout(1000);
    await page.locator(locators.verify_grid.view_close).click();
    //await page.waitForTimeout(5000);

}


async function DeletePage(page, Payment, vendor, recieve_amt, bill_type ,item) {

    await page.locator(locators.VerifyPurchase.transaction_menu).click();

    await page.locator(locators.VerifyPurchase.purchase_menu).click();
    await page.locator(locators.VerifyPurchase.purchase_page).click();

    await page.waitForSelector("//td[@id='PurchaseRegularBillNumberColumn']");

    // Fetch the latest ticket number from the ticket no column
    const latestTicketNo = await page.locator("//td[@id='PurchaseRegularBillNumberColumn']").nth(0).textContent();

    if (!latestTicketNo || latestTicketNo.trim() === "") {
        console.log('No latest Purchase Bill number found. Exiting...');

        return;
    }

    console.log(`Latest Purchase Bill No: ${latestTicketNo.trim()}`);

    await page.locator(locators.delete_purchase.delete_menu).click();

    await page.locator(locators.delete_purchase.delete_purchase).click();
    await page.locator(locators.delete_purchase.delete_subpurchase).click();

    await page.locator(locators.delete_purchase.purchase_no).click();
    await page.fill(locators.delete_purchase.purchase_no, latestTicketNo);

    await page.locator(locators.delete_purchase.delete_radio).check({ force: true });

    await page.locator(locators.delete_purchase.delete_btn).click();

    await page.locator(locators.delete_purchase.transcation_menu).click();
    await page.locator(locators.delete_purchase.ledger).click();
    await page.locator(locators.delete_purchase.cashLedger).click();
    console.log('Successfully Navigate Cash Ledger Page');

    await page.locator(locators.delete_purchase.AddCashLedger).click();

    await page.locator(locators.PaymentNatureDropdown).click();
    await page.waitForTimeout(2000);
    await page.fill(locators.enterPaymentNature, Payment);
    await page.locator('li.e-list-item', { hasText: Payment }).click();
    console.log('Select Payment Nature')

    await page.locator(locators.VerifyPurchase.vendordropdown).click();
    await page.fill(locators.VerifyPurchase.entervendorname, vendor);
    await page.locator('li.e-list-item', { hasText: vendor }).click();
    console.log('Select Vendor')

    await page.locator(locators.delete_purchase.recieve_amt).click();
    await page.locator(locators.delete_purchase.recieve_amt).fill(recieve_amt);
    console.log('Fill Receive Amount')

    await page.waitForTimeout(1000);
    await page.locator(locators.AddbuttonCash).click();

    await page.locator(locators.selectbilltype).click();
    await page.locator('li.e-list-item', { hasText: bill_type }).click();
    console.log("Select bill type in Grid");

    await page.locator(locators.delete_purchase.update_ledger).click();
    await page.locator(locators.delete_purchase.bill_no).click();
    const billNumbers = await page.locator('li.e-list-item').allTextContents();
    const validBill = billNumbers.find(bill => !latestTicketNo.includes(bill));
  
    if (validBill) {
      await page.locator(`li.e-list-item >> text=${validBill}`).click();
      console.log(`Selected bill number: ${validBill}`);
    } else {
      console.error("No valid bill number available!");
    }
  
      //Item wise report
      await page.locator(locators.reports_menu.reports).click();
      await page.locator(locators.reports_menu.purchase_menu).click();
      await page.locator(locators.reports_menu.purchase_item).click();
  
      await page.locator(locators.reports_menu.purchase_itemwise_filter).click();
  
      await page.locator(locators.reports_menu.purchase_vendor).click();
      await page.fill(locators.reports_menu.enternamevendor, vendor);
      await page.locator('li.e-list-item', { hasText: vendor }).click();
      console.log('Select Vendor for Itemwise Report')
  
      await page.locator(locators.reports_menu.purchase_itewise_search).click();
  
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(2000);
      let billFounditem = false;
    
      // Get all rows in the grid
      await page.waitForSelector('tr[aria-rowindex]', { state: 'visible' });
      const rowitem = await page.locator('tr[aria-rowindex]');
      const rowCountitem = await rowitem.count();
      console.log(` Total rows in grid: ${rowCountitem}`);
      
      // Iterate through each row to check if the deleted bill number exists
      for (let i = 0; i < rowCountitem; i++) {  // Loop through all available rows
          const currentRow = await rowitem.nth(i);
        const billNumberCell = await currentRow.locator("td#ItemWisePurchaseReportBillNoColumn").innerText();
    
        // Debug log for current amc number in grid
        console.log(`Row ${i + 1} Bill Number:`, billNumberCell);
    
    
        if (billNumberCell === latestTicketNo) {
          billFounditem = true;
          break;
        }
      }
    
      // Assert that the deleted amc number is not found in the grid
      expect(billFounditem).toBe(false);
      if (!billFounditem) {
        console.log(` Successfully verified that deleted bill number ${latestTicketNo} is not present in the purchase return itemwise report.`);
      } else {
        console.error(`Error - Deleted bill number ${latestTicketNo} was found in the purchase return itemwise report.`);
      }

       //Purchase Summary
    await page.locator(locators.reports_menu.reports).click();
    await page.locator(locators.reports_menu.purchase_menu).click();
    await page.locator(locators.reports_menu.purchase_summary).click();

    await page.locator(locators.reports_menu.purchase_summary_filter).click();

    await page.locator(locators.reports_menu.purchase_vendor).click();
    await page.fill(locators.reports_menu.enternamevendor, vendor);
    await page.locator('li.e-list-item', { hasText: vendor }).click();
    console.log('Select Vendor for Purchase Summary Report')

    await page.locator(locators.reports_menu.purchase_summary_search).click();

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);
    let billFoundsummary = false;
  
    // Get all rows in the grid
    await page.waitForSelector('tr[aria-rowindex]', { state: 'visible' });
    const rowsummry = await page.locator('tr[aria-rowindex]');
    const rowCountsummary = await rowsummry.count();
    console.log(` Total rows in grid: ${rowCountsummary}`);
    
    // Iterate through each row to check if the deleted bill number exists
    for (let i = 0; i < rowCountsummary; i++) {  // Loop through all available rows
        const currentRow = await rowsummry.nth(i);
      const billNumberCell = await currentRow.locator("td#PurchaseReportBillNoColumn").innerText();
  
      // Debug log for current amc number in grid
      console.log(`Row ${i + 1} Bill Number:`, billNumberCell);
  
  
      if (billNumberCell === latestTicketNo) {
        billFoundsummary = true;
        break;
      }
    }
  
    // Assert that the deleted amc number is not found in the grid
    expect(billFoundsummary).toBe(false);
    if (!billFoundsummary) {
      console.log(` Successfully verified that deleted bill number ${latestTicketNo} is not present in the purchase return Summary report.`);
    } else {
      console.error(` Error - Deleted bill number ${latestTicketNo} was found in the purchase return Summary report.`);
    }

     //Payable Report
     await page.locator(locators.reports_menu.reports).click();
     await page.locator(locators.reports_menu.payable_menu).click();
 
     await page.locator(locators.reports_menu.payable_filter).click();
 
     await page.locator(locators.reports_menu.vendordropdown).click();
     await page.fill(locators.reports_menu.enternamevendor, vendor);
     await page.locator('li.e-list-item', { hasText: vendor }).click();
     console.log('Select Vendor for Payable Report')
 
     await page.locator(locators.reports_menu.payable_search).click();
 
     await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
     await page.waitForTimeout(2000);
     let billFoundpayable = false;
    
     // Get all rows in the grid
     await page.waitForSelector('tr[aria-rowindex]', { state: 'visible' });
     const rowpayable = await page.locator('tr[aria-rowindex]');
     const rowCountpayable = await rowpayable.count();
     console.log(` Total rows in grid: ${rowCountpayable}`);
     
     // Iterate through each row to check if the deleted bill number exists
     for (let i = 0; i < rowCountpayable; i++) {  // Loop through all available rows
         const currentRow = await rowpayable.nth(i);
       const billNumberCell = await currentRow.locator("td#PayableReportBillNoColumn").innerText();
    
       // Debug log for current amc number in grid
       console.log(`Row ${i + 1} Bill Number:`, billNumberCell);
    
    
       if (billNumberCell === latestTicketNo) {
         billFoundpayable = true;
         break;
       }
     }
    
     // Assert that the deleted amc number is not found in the grid
     expect(billFoundpayable).toBe(false);
     if (!billFoundpayable) {
       console.log(` Successfully verified that deleted bill number ${latestTicketNo} is not present in the payable report.`);
     } else {
       console.error(` Error - Deleted bill number ${latestTicketNo} was found in the payable report.`);
     }

        //Inventory Stock Report
    await page.locator(locators.reports_menu.reports).click();
    await page.locator(locators.reports_menu.Inventory_menu).click();

    await page.locator(locators.reports_menu.Inventory_filter).click();

    await page.locator(locators.reports_menu.Inventory_item).click();
    await page.fill(locators.reports_menu.enteritemname, item);
    await page.locator('li.e-list-item', { hasText: item }).click();
    console.log('Select Item for Inventory Stock Report')

    await page.locator(locators.reports_menu.Inventory_search).click();
    await page.click('a#InventoryReportViewDetailedinventoryReportButton');

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);
    let billFoundIV = false;
   
    // Get all rows in the grid
    await page.waitForSelector('tr[aria-rowindex]', { state: 'visible' });
    const rowpayIV = await page.locator('tr[aria-rowindex]');
    const rowCountIV = await rowpayIV.count();
    console.log(` Total rows in grid: ${rowCountIV}`);
    
    // Iterate through each row to check if the deleted bill number exists
    for (let i = 0; i < rowCountIV; i++) {  // Loop through all available rows
        const currentRow = await rowpayIV.nth(i);
      const billNumberCell = await currentRow.locator("td#DetailedInventoryReportGridBillNoColumn").innerText();
   
      // Debug log for current amc number in grid
      console.log(`Row ${i + 1} Bill Number:`, billNumberCell);
   
   
      if (billNumberCell === latestTicketNo) {
        billFoundIV = true;
        break;
      }
    }
   
    // Assert that the deleted amc number is not found in the grid
    expect(billFoundIV).toBe(false);
    if (!billFoundIV) {
      console.log(` Successfully verified that deleted bill number ${latestTicketNo} is not present in the inventory stock report.`);
    } else {
      console.error(` Error - Deleted bill number ${latestTicketNo} was found in the inventory stock report.`);
    }
   
    

}




module.exports = {
    selectsubmenupurchase, verify_purchase, verify_search_purchase,
    verifyPurchaseGrid, viewlink, DeletePage
};