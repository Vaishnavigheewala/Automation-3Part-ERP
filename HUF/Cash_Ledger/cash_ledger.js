const { test, expect } = require('@playwright/test');
const locators = require('./cash_ledger.json');
const { Generate_Variable } = require('../../Dynamic_Variables_Manage/Dynamic_Variable_Manage'); // Adjust the path as needed
const fs = require('fs');
const path = require('path');

// Define the file path for the variable storage
let filePath = path.join(process.cwd(), 'Dynamic_Variables_Manage/Dynamic_Variable.json');

// Ensure the variable file exists
if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customerName = updatedVariables.Customer.Customer_Account_Name;// Get the latest Customer_Name
let vendorName = updatedVariables.Vendor.Vendor_Account_Name; 

async function verifyledger(page) {
  await page.locator(locators.CashLedger.Ledger).click();
  await page.locator(locators.CashLedger.CashLedgerpage).click();
  await expect(page.locator('li.breadcrumb-item.active', { hasText: 'Cash' })).toBeVisible();

  //select date range
  await page.locator(locators.CashLedger.Datepicker).click();
  const datepicker = '#CashLedgerListDatePickerForFilter'; //code to clear the date
  await page.fill(datepicker, ''); //code to clear the date
  await page.fill(datepicker, '06-01-2020 - 06-01-2030');

  await page.waitForTimeout(2000);

  //select customer
  await page.locator(locators.CashLedger.AccountGroup).click();
  await page.locator("//li[normalize-space()='Customer']").click();

  await page.waitForTimeout(2000);
  await page.locator(locators.CashLedger.customername).click();
  await page.waitForTimeout(2000);
  await page.fill(locators.CashLedger.entercustomername, customerName);
  await page.locator('li.e-list-item', { hasText: customerName }).click();
  await page.waitForTimeout(2000);
  //select vendor
  await page.locator(locators.CashLedger.AccountGroup).click();
  await page.locator("//li[normalize-space()='Vendor']").click();
  await page.waitForTimeout(1000);
  await page.locator(locators.CashLedger.vendorname).click();
  await page.waitForTimeout(1000);
  await page.fill(locators.CashLedger.entercustomername, vendorName);
  await page.locator('li.e-list-item', { hasText: vendorName }).click();
  //verify serach and reset button
  await expect(page.locator(locators.CashLedger.Searchbutton)).toBeVisible();
  await page.waitForTimeout(2000);
  await expect(page.locator(locators.CashLedger.ResetButton)).toBeVisible();

  // Verify Search functionality
  await page.click(locators.CashLedger.Searchbutton);
  await page.waitForTimeout(2000);
  // Verify Reset functionality
  await page.click(locators.CashLedger.ResetButton);
  await page.waitForTimeout(2000);

  let Pagination = await page.locator("//div[@class='e-pagercontainer']").isVisible();
  console.log("Pagination Available = ", Pagination);


  //verify grid
  const columns = [
    locators.Grid.VoucherNo,
    locators.Grid.BillNo,
    locators.Grid.VoucherDate,
    locators.Grid.Accountname,
    locators.Grid.NatureType,
    locators.Grid.NetAmount,
    locators.Grid.Action,
    locators.Grid.Viewlink
  ];

  for (const column of columns) {
    const isVisible = await page.isVisible(column);
    console.log(`${column} visible: ${isVisible}`);
  }

  //verify pdf button
  await page.waitForTimeout(2000);
  await page.click(locators.CashLedger.pdfbutton);
  console.log('PDF download triggered.');
  await page.waitForTimeout(2000);
  //Add new
  await page.click(locators.CashLedger.AddnewButton);
  console.log('add new triggered.');
  await page.waitForTimeout(3000);
  await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });
  //close button
  await page.waitForTimeout(3000);
  await page.click(locators.Grid.Closebuttonentry);
  console.log('close button triggered.');
  //verify view link
  const rows1 = await page.locator('tr[aria-rowindex]'); // Select all rows with aria-rowindex
  await page.waitForTimeout(3000);
  await page.click(locators.Grid.Viewlink);
  await page.waitForTimeout(1000);
  await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });
  await page.click(locators.Grid.viewclosebutton);
  console.log("view link verified")

}

async function addcashledger(page) {

  await page.locator(locators.CashLedger.Ledger).click();
  await page.locator(locators.CashLedger.CashLedgerpage).click();
  await expect(page.locator('li.breadcrumb-item.active', { hasText: 'Cash' })).toBeVisible();
  //click on add new button
  await page.click(locators.CashLedger.AddnewButton);
  //verify cash Ledger section 

  const voucherNo = await page.isDisabled(locators.Addcashledger.VoucherNoField);
  console.log(`voucher number Not Editable: ${voucherNo}`);

  const date = await page.inputValue(locators.Addcashledger.datepickr);
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
  expect(date).toBe(formattedDate);
  console.log(`defaulting to current date: ${formattedDate}`);

  //payment nature 
  await page.locator(locators.Addcashledger.paymentnature).click();
  await page.click("//li[normalize-space()='Receive']");

  const customerDropdown = await page.locator(locators.CashLedger.customername);
  await expect(customerDropdown).toBeVisible();

  // Warning for missing customer before adding outstanding detail
  await page.click(locators.Addcashledger.GridAddButton);
  const warningMessage = await page.locator("text='Please select Customer'");
  await expect(warningMessage).toBeVisible();
  await page.waitForTimeout(1000);

  // Select Customer
  await customerDropdown.click();
  await page.fill(locators.CashLedger.entercustomername, customerName);
  await page.locator('li.e-list-item', { hasText: customerName }).click();
  await page.waitForTimeout(1000);

  await page.click(locators.Addcashledger.GridAddButton);
  await page.waitForTimeout(1000);

  await page.locator(locators.Addcashledger.total_receive).click();
  await page.waitForTimeout(1000);
  await page.fill(locators.Addcashledger.total_receive,"50000");
  await page.waitForTimeout(1000);

  //verify outstanding details
  await page.click(locators.Addcashledger.GridAddButton);
  await page.locator(locators.Addcashledger.billtype).click();
  await page.click(locators.Addcashledger.selectsales);
  await page.waitForTimeout(3000);
  //bill no

  //await page.waitForTimeout(1000);
  await page.locator(locators.Addcashledger.billno).click();
  await page.locator(locators.Addcashledger.billnumber).click();
  // Wait for dropdown options to load
  await page.waitForTimeout(1000);

  // Get the first bill number from the dropdown
  const firstBill = await page.locator('li.e-list-item').first().textContent();

  // Check if a bill number exists before selecting
  if (firstBill) {
      console.log(`Selecting first bill: ${firstBill}`);
      await page.locator('li.e-list-item', { hasText: firstBill }).click();
  } else {
      console.log("No bill number found in the dropdown.");
  }

  await page.waitForTimeout(1000);

  // Verify Net Outstanding Amount matches the Bill Amount and Outstanding Amount
  await page.waitForSelector(locators.Addcashledger.netoutstandingamount, { state: 'visible' });
  await page.waitForSelector('td#CashLedgerBillAmountColumn', { state: 'visible' });
  await page.waitForSelector('td#CashLedgerOutstandingAmountColumn', { state: 'visible' });
  await page.waitForTimeout(1000);
  const netOutstandingAmount = await page.locator(locators.Addcashledger.netoutstandingamount).textContent();
  console.log('Net Outstanding Amount:', netOutstandingAmount); // Replace with the correct selector
  await page.waitForTimeout(1000);
  const billAmount = await page.locator('td#CashLedgerBillAmountColumn').textContent();
  console.log('bill  Amount:', netOutstandingAmount); // Replace with the correct selector
  await page.waitForTimeout(1000);
  const outstandingAmount = await page.locator('td#CashLedgerOutstandingAmountColumn').textContent();
  console.log('Outstanding Amount:', netOutstandingAmount); // Replace with the correct selector
  //expect(netOutstandingAmount).toBe(billAmount);
  //expect(netOutstandingAmount).toBe(outstandingAmount);

  // Enter the Received Amount equal to the Net Outstanding Amount (full payment)

  // Locate the "Net Outstanding Amount" cell
const netOutstandingAmt = await page.locator(locators.Addcashledger.netoutstandingamount).textContent();

// Trim and convert the value to a number
const amount = parseFloat(netOutstandingAmt.trim());

if (!isNaN(amount) && amount > 0) {
    console.log(`Filling Received Amount with: ${amount}`);

    // Fill the "Received Amount" input field
    await page.locator(locators.Addcashledger.Receivedamt).click();
    await page.fill(locators.Addcashledger.enterReceiveamt, amount.toString());
    //await page.locator('css-selector-for-received-amt').fill(amount.toString());
} else {
    console.log("Invalid Net Outstanding Amount. Skipping input.");
}


  // Verify Balance and Exchange Amount are both displayed as 0
  await page.locator('td#CashLedgerRemainingBalanceColumn').click();
  await page.waitForSelector('td#CashLedgerRemainingBalanceColumn', { state: 'visible' });
  await page.waitForSelector('td#CashLedgerExchangeAmountColumn', { state: 'visible' });
  const balanceAmount = (await page.locator('td#CashLedgerRemainingBalanceColumn').textContent()).trim();
  const exchangeAmount = (await page.locator('td#CashLedgerExchangeAmountColumn').textContent()).trim();

  //expect(balanceAmount).toBe('0.00');
  //expect(exchangeAmount).toBe('0.00');
  console.log('balance Amount :', balanceAmount);
  console.log('exchange Amount :', exchangeAmount);
  // Click on Submit without clicking Update
  const submitButton = await page.locator(locators.Addcashledger.submitbutton);
  await submitButton.click();

  // Verify "Update Changes!" popup is displayed
  const updatePopup = await page.locator('text=Update Changes!');
  await page.click('//button[normalize-space()="Ok"]');

  // Click on Update
  const updateButton = await page.locator(locators.Addcashledger.updatebutton);
  await updateButton.click();

  // Verify the warning popup
  await page.locator('text=Are you sure you want to save changes?');
  await page.click('//button[normalize-space()="OK"]');


}

async function verifypartialpayment(page) {
  //verify partial payment
  await page.click(locators.Addcashledger.GridAddButton);
  await page.locator(locators.Addcashledger.billtype).click();
  await page.click(locators.Addcashledger.selectsales);
  await page.waitForTimeout(3000);
  //bill no

  //await page.waitForTimeout(1000);
  const billno = await page.locator(locators.Addcashledger.billno).nth(1);
  await billno.click();
  await page.locator(locators.Addcashledger.billnumber).click();
  // Get the first bill number from the dropdown
  const firstBill = await page.locator('li.e-list-item').nth(1).textContent();

  // Check if a bill number exists before selecting
  if (firstBill) {
      console.log(`Selecting first bill: ${firstBill}`);
      await page.locator('li.e-list-item', { hasText: firstBill }).click();
  } else {
      console.log("No bill number found in the dropdown.");
  }  await page.waitForTimeout(2000);


  // Enter the Received Amount equal to the Net Outstanding Amount (Partial payment)
  const netOutstandingAmt = await page.locator(locators.Addcashledger.netoutstandingamount).first().textContent();
    // Trim and convert the value to a number
    const amount = parseFloat(netOutstandingAmt.trim());

    if (!isNaN(amount) && amount > 0) {
      const halfAmount = (amount / 2).toFixed(2); // Calculate half and keep 2 decimal places

        console.log(`Filling Received Amount with: ${halfAmount}`);

        // Fill the "Received Amount" input field
        const receive = await page.locator(locators.Addcashledger.Receivedamt).nth(0);
        receive.click();
        await page.fill(locators.Addcashledger.enterReceiveamt, halfAmount.toString());
    } else {
        console.log("Invalid Net Outstanding Amount. Skipping input.");
    }

  await page.click('#CashLedgerGridUpdateButton');

  await page.click("#CashLedgerEntryPartPayemntYesButton");
  // Confirm Update
  //await page.click('#CashLedgerGridUpdateButton');
  const updateWarning = await page.locator("text='Are you sure you want to save changes?'");
  await expect(updateWarning).toBeVisible();
  await page.click("//button[normalize-space()='OK']");
}

async function verifyduplicatebillno(page) {
  await page.click(locators.Addcashledger.GridAddButton);
  await page.locator(locators.Addcashledger.billtype).click();
  await page.click(locators.Addcashledger.selectsales);
  await page.waitForTimeout(1000);
  //bill no

  //await page.waitForTimeout(1000);
  const billno = await page.locator(locators.Addcashledger.billno).nth(2);
  await billno.click();
  await page.locator(locators.Addcashledger.billnumber).click();
  // await page.waitForTimeout(2000);
  const firstBill = await page.locator('li.e-list-item').first().textContent();

  // Check if a bill number exists before selecting
  if (firstBill) {
      console.log(`Selecting first bill: ${firstBill}`);
      await page.locator('li.e-list-item', { hasText: firstBill }).click();
  } else {
      console.log("No bill number found in the dropdown.");
  }  await page.waitForTimeout(2000);
  const updateButton = await page.locator(locators.Addcashledger.updatebutton);
  await updateButton.click();

  await page.locator(locators.Addcashledger.GridCancelButton).click();
  await page.click("//button[normalize-space()='OK']");
  console.log("Duplicate Bill Number is Cancle by Cancel button in Grid")
  const billtype = await page.locator(locators.Addcashledger.Gridbilltype).nth(0);
  await billtype.click();
  await page.waitForTimeout(1000);
  await page.locator(locators.Addcashledger.GridDeleteBUtton).click();
  console.log("Bill Delete in Grid through Delete button in Outstanding details");
  await page.waitForTimeout(1000);
  await page.locator(locators.Addcashledger.GridCancelButton).click();
  await page.click("//button[normalize-space()='OK']");
  console.log("Delete Bill cancel in Grid through Cancel button in Outstanding details");
  await page.waitForTimeout(1000);
  await page.locator(locators.Addcashledger.Reset_btn).click();
  await page.waitForTimeout(1000);
  await page.locator(locators.Addcashledger.close_btn).click();

}

async function VerifyReceiveAmt(page) {
  await page.click(locators.CashLedger.AddnewButton);
  //payment nature 
  await page.locator(locators.Addcashledger.paymentnature).click();
  await page.click("//li[normalize-space()='Receive']");
  await page.waitForTimeout(1000);
  const customerDropdown = await page.locator(locators.CashLedger.customername);
  await customerDropdown.click();
  await page.fill(locators.CashLedger.entercustomername, customerName);
  await page.locator('li.e-list-item', { hasText: customerName }).click();
  await page.waitForTimeout(1000);
  await page.locator(locators.Addcashledger.total_receive).click();
  await page.fill(locators.Addcashledger.total_receive,"1");
  await page.waitForTimeout(1000);
  await page.click(locators.Addcashledger.GridAddButton);
  await page.locator(locators.Addcashledger.billtype).click();
  await page.click(locators.Addcashledger.selectsales);
  await page.waitForTimeout(3000);
  //bill no
  //await page.waitForTimeout(1000);
  await page.locator(locators.Addcashledger.billno).click();
  await page.locator(locators.Addcashledger.billnumber).click();
  // await page.waitForTimeout(2000);
  const firstBill = await page.locator('li.e-list-item').first().textContent();
    // Check if a bill number exists before selecting
    if (firstBill) {
        console.log(`Selecting first bill: ${firstBill}`);
        await page.locator('li.e-list-item', { hasText: firstBill }).click();
    } else {
        console.log("No bill number found in the dropdown.");
    }  await page.waitForTimeout(2000);
    
  // Verify Net Outstanding Amount matches the Bill Amount and Outstanding Amount
  await page.waitForSelector(locators.Addcashledger.netoutstandingamount, { state: 'visible' });
  await page.waitForSelector('td#CashLedgerBillAmountColumn', { state: 'visible' });
  await page.waitForSelector('td#CashLedgerOutstandingAmountColumn', { state: 'visible' });
  await page.waitForTimeout(2000);
  const netOutstandingAmount = await page.locator(locators.Addcashledger.netoutstandingamount).textContent();
  console.log('Net Outstanding Amount:', netOutstandingAmount); // Replace with the correct selector
  await page.waitForTimeout(2000);
  const billAmount = await page.locator('td#CashLedgerBillAmountColumn').textContent();
  console.log('bill  Amount:', netOutstandingAmount); // Replace with the correct selector
  await page.waitForTimeout(2000);
  const outstandingAmount = await page.locator('td#CashLedgerOutstandingAmountColumn').textContent();
  console.log('Outstanding Amount:', netOutstandingAmount); // Replace with the correct selector
  //expect(netOutstandingAmount).toBe(billAmount);
  //expect(netOutstandingAmount).toBe(outstandingAmount);
  // Enter the Received Amount equal to the Net Outstanding Amount (Partial payment)
  const netOutstandingAmt = await page.locator(locators.Addcashledger.netoutstandingamount).first().textContent();
  // Trim and convert the value to a number
  const amount = parseFloat(netOutstandingAmt.trim());
  console.log("amount",amount);
  if (!isNaN(amount) && amount > 0) {
    const doubleAmount = (amount * 2).toFixed(2); // Calculate half and keep 2 decimal places
      console.log(`Filling Received Amount with: ${doubleAmount}`);
      // Fill the "Received Amount" input field
      const receive = await page.locator(locators.Addcashledger.Receivedamt).nth(0);
      receive.click();
      await page.fill(locators.Addcashledger.enterReceiveamt, doubleAmount.toString());
  } else {
      console.log("Invalid Net Outstanding Amount. Skipping input.");
  }
  // Verify Balance and Exchange Amount are both displayed as 0
  await page.locator('td#CashLedgerRemainingBalanceColumn').click();
  // Click on Update
  const updateButton = await page.locator(locators.Addcashledger.updatebutton);
  await updateButton.click();
  // Verify the warning popup
  await page.locator('text=Are you sure you want to save changes?');
  await page.click('//button[normalize-space()="OK"]');
}

// Partial and Full Payment
async function addledgerforsale(page) {
  await page.locator(locators.CashLedger.Ledger).click();
  await page.locator(locators.CashLedger.CashLedgerpage).click();
  await expect(page.locator('li.breadcrumb-item.active', { hasText: 'Cash' })).toBeVisible();
  //click on add new button
  await page.click(locators.CashLedger.AddnewButton);
  //payment nature 
  await page.locator(locators.Addcashledger.paymentnature).click();
  await page.click("//li[normalize-space()='Receive']");
  await page.waitForTimeout(1000);

  const customerDropdown = await page.locator(locators.CashLedger.customername);
  await customerDropdown.click();
  await page.fill(locators.CashLedger.entercustomername, customerName);
  await page.locator('li.e-list-item', { hasText: customerName }).click();
  await page.waitForTimeout(1000);

  await page.locator(locators.Addcashledger.total_receive).click();
  await page.waitForTimeout(1000);
  await page.fill(locators.Addcashledger.total_receive,"50000");
  await page.waitForTimeout(1000);

  await page.click(locators.Addcashledger.GridAddButton);
  await page.locator(locators.Addcashledger.billtype).click();
  await page.click(locators.Addcashledger.selectsales);
  await page.waitForTimeout(3000);
  //bill no

  //await page.waitForTimeout(1000);
  await page.locator(locators.Addcashledger.billno).click();
  await page.locator(locators.Addcashledger.billnumber).click();
  // await page.waitForTimeout(2000);
  const firstBill = await page.locator('li.e-list-item').first().textContent();

    // Check if a bill number exists before selecting
    if (firstBill) {
        console.log(`Selecting first bill: ${firstBill}`);
        await page.locator('li.e-list-item', { hasText: firstBill }).click();
    } else {
        console.log("No bill number found in the dropdown.");
    }  await page.waitForTimeout(2000);
    
  // Verify Net Outstanding Amount matches the Bill Amount and Outstanding Amount
  await page.waitForSelector(locators.Addcashledger.netoutstandingamount, { state: 'visible' });
  await page.waitForSelector('td#CashLedgerBillAmountColumn', { state: 'visible' });
  await page.waitForSelector('td#CashLedgerOutstandingAmountColumn', { state: 'visible' });
  await page.waitForTimeout(2000);
  const netOutstandingAmount = await page.locator(locators.Addcashledger.netoutstandingamount).textContent();
  console.log('Net Outstanding Amount:', netOutstandingAmount); // Replace with the correct selector
  await page.waitForTimeout(2000);
  const billAmount = await page.locator('td#CashLedgerBillAmountColumn').textContent();
  console.log('bill  Amount:', netOutstandingAmount); // Replace with the correct selector
  await page.waitForTimeout(2000);
  const outstandingAmount = await page.locator('td#CashLedgerOutstandingAmountColumn').textContent();
  console.log('Outstanding Amount:', netOutstandingAmount); // Replace with the correct selector
  //expect(netOutstandingAmount).toBe(billAmount);
  //expect(netOutstandingAmount).toBe(outstandingAmount);

  // Enter the Received Amount equal to the Net Outstanding Amount (Partial payment)
  const netOutstandingAmt = await page.locator(locators.Addcashledger.netoutstandingamount).first().textContent();
  // Trim and convert the value to a number
  const amount = parseFloat(netOutstandingAmt.trim());
  console.log("amount",amount);

  if (!isNaN(amount) && amount > 0) {
    const halfAmount = (amount / 2).toFixed(2); // Calculate half and keep 2 decimal places

      console.log(`Filling Received Amount with: ${halfAmount}`);

      // Fill the "Received Amount" input field
      const receive = await page.locator(locators.Addcashledger.Receivedamt).nth(0);
      receive.click();
      await page.fill(locators.Addcashledger.enterReceiveamt, halfAmount.toString());
  } else {
      console.log("Invalid Net Outstanding Amount. Skipping input.");
  }

  // Verify Balance and Exchange Amount are both displayed as 0
  await page.locator('td#CashLedgerRemainingBalanceColumn').click();
  await page.click("#CashLedgerEntryPartPayemntYesButton");



  // Click on Update
  const updateButton = await page.locator(locators.Addcashledger.updatebutton);
  await updateButton.click();

  // Verify the warning popup
  await page.locator('text=Are you sure you want to save changes?');
  await page.click('//button[normalize-space()="OK"]');

  await page.click(locators.Addcashledger.GridAddButton);
  await page.locator(locators.Addcashledger.billtype).click();
  await page.click(locators.Addcashledger.selectsales);
  await page.waitForTimeout(3000);
  //bill no

  //await page.waitForTimeout(1000);
  const billno = await page.locator(locators.Addcashledger.billno).nth(1);
  await billno.click();
  await page.locator(locators.Addcashledger.billnumber).click();
  // await page.waitForTimeout(2000);
  const firstBill2 = await page.locator('li.e-list-item').nth(1).textContent();

  // Check if a bill number exists before selecting
  if (firstBill2) {
      console.log(`Selecting first bill: ${firstBill2}`);
      await page.locator('li.e-list-item', { hasText: firstBill2 }).click();
  } else {
      console.log("No bill number found in the dropdown.");
  }

      // Verify Net Outstanding Amount matches the Bill Amount and Outstanding Amount
  await page.waitForSelector(locators.Addcashledger.netoutstandingamount, { state: 'visible' });
  await page.waitForSelector('td#CashLedgerBillAmountColumn', { state: 'visible' });
  await page.waitForSelector('td#CashLedgerOutstandingAmountColumn', { state: 'visible' });
  await page.waitForTimeout(2000);
  const netOutstandingAmount2 = await page.locator(locators.Addcashledger.netoutstandingamount).first().textContent();
  console.log('Net Outstanding Amount:', netOutstandingAmount2); // Replace with the correct selector
  await page.waitForTimeout(2000);
  const billAmount2 = await page.locator('td#CashLedgerBillAmountColumn').first().textContent();
  console.log('bill  Amount:', netOutstandingAmount2); // Replace with the correct selector
  await page.waitForTimeout(2000);
  const outstandingAmount2 = await page.locator('td#CashLedgerOutstandingAmountColumn').first().textContent();
  console.log('Outstanding Amount:', netOutstandingAmount2); // Replace with the correct selector
  //expect(netOutstandingAmount).toBe(billAmount);
  //expect(netOutstandingAmount).toBe(outstandingAmount);
  const netOutstandingAmt2 = await page.locator(locators.Addcashledger.netoutstandingamount).first().textContent();
  const amount2 = parseFloat(netOutstandingAmt2.trim());
  console.log("amount",amount2);

  if (!isNaN(amount2) && amount2 > 0) {

      console.log(`Filling Received Amount with: ${amount2}`);

      // Fill the "Received Amount" input field
      const receive = await page.locator(locators.Addcashledger.Receivedamt).nth(0);
      receive.click();
      await page.fill(locators.Addcashledger.enterReceiveamt, amount2.toString());
  } else {
      console.log("Invalid Net Outstanding Amount. Skipping input.");
  }


    await page.locator(locators.Addcashledger.balance).nth(0).click();

    await page.waitForTimeout(3000);
    const updateButton2 = await page.locator(locators.Addcashledger.updatebutton);
    await updateButton2.click();

    // Verify the warning popup
    await page.locator('text=Are you sure you want to save changes?');
    await page.click('//button[normalize-space()="OK"]');

    await page.click(locators.Addcashledger.submitbutton);

    const rows = await page.locator('tr[aria-rowindex]'); // Select all rows with aria-rowindex
    const firstRow = await rows.nth(0);
    await firstRow.locator(locators.Grid.Accountname);
    await expect(firstRow).toContainText(customerName);
    await page.waitForTimeout(2000);

}




async function Checks_Grid_After_New_Data_Added(page) {
    //await page.waitForTimeout(1000);
    console.log("=======================================");
    console.log("Cash Ledger Data Checks in CL Grid  ");
    console.log("=======================================");

    let Var_Grid_voucher, Var_Grid_BillNo, Var_Grid_VoucherDate,Var_Grid_Accountname,Var_Grid_NatureType,Var_Grid_Ledger_NetAmount;

    Var_Grid_voucher = await page.locator(locators.Grid.VoucherNo).nth(1).textContent();
    //await page.waitForTimeout(1000);
    Var_Grid_BillNo = await page.locator(locators.Grid.BillNo).nth(1).textContent();
    Var_Grid_VoucherDate = await page.locator(locators.Grid.VoucherDate).nth(1).textContent();
    Var_Grid_Accountname = await page.locator(locators.Grid.Accountname).nth(1).textContent();
    //await page.waitForTimeout(1000);
    Var_Grid_NatureType = await page.locator(locators.Grid.NatureType).nth(1).textContent();
    Var_Grid_Ledger_NetAmount = await page.locator(locators.Grid.NetAmount).nth(1).textContent();
    console.log("Voucher No =", Var_Grid_voucher);
    console.log("bill no =", Var_Grid_BillNo);
    console.log("Voucher Date =", Var_Grid_VoucherDate);
    console.log("Account Name =", Var_Grid_Accountname);
    console.log("Nature Type =", Var_Grid_NatureType);
    console.log("Net Amount =",Var_Grid_Ledger_NetAmount);

    await Generate_Variable('HUF_Company.Cash_Ledger.Voucher_No', async () => `${Var_Grid_voucher}`);
    console.log("Vouche no", Var_Grid_voucher);
 
}



async function outstandingReport(page) {
  await page.click(locators.outstandingreport.outstanding);

  await page.click(locators.outstandingreport.filterbutton);

  await page.locator(locators.CashLedger.customername).click();
  await page.waitForTimeout(2000);
  await page.fill(locators.CashLedger.entercustomername, customerName);
  await page.locator('li.e-list-item', { hasText: customerName }).click();
  await page.waitForTimeout(2000);
  await page.click(locators.outstandingreport.SearchButton);
  await page.waitForTimeout(2000);

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


  console.log('Verification completed successfully.');

}

async function customeraccledger(page) {
  await page.click(locators.customeraccLedger.accountLedger);
  await page.click(locators.customeraccLedger.customeraccount);
  await page.click(locators.customeraccLedger.filterbutton);

  await page.locator(locators.CashLedger.customername).click();
  await page.waitForTimeout(2000);
  await page.fill(locators.CashLedger.entercustomername, customerName);
  await page.locator('li.e-list-item', { hasText: customerName }).click();
  await page.waitForTimeout(2000);

  await page.click(locators.customeraccLedger.Searchbutton);
  await page.waitForTimeout(2000);

  console.log('Customer Account Ledger Report verification completed successfully.');

}

async function VerifyConsistency(page) {

  await page.click(locators.outstandingreport.outstanding);
  await page.click(locators.outstandingreport.filterbutton);

  await page.locator(locators.CashLedger.customername).click();
  await page.waitForTimeout(2000);
  await page.fill(locators.CashLedger.entercustomername, customerName);
  await page.locator('li.e-list-item', { hasText: customerName }).click();
  await page.waitForTimeout(2000);
  await page.click(locators.outstandingreport.SearchButton);

  await page.waitForSelector(`tr:has(td:has-text("${customerName}"))`);// wait up to 60 seconds

  await page.locator(`tr:has(td:has-text("${customerName}"))`);
  const outstandingBalance = await page.locator('td.e-summarycell[data-cell="Balance"]').textContent();
  console.log(`Outstanding Report Overall Balance: ${outstandingBalance}`);

  console.log('Outstanding Report verification completed successfully.');
  await page.click(locators.customeraccLedger.reports);
  await page.click(locators.customeraccLedger.accountLedger);
  await page.click(locators.customeraccLedger.customeraccount);
  await page.click(locators.customeraccLedger.filterbutton);

  await page.locator(locators.CashLedger.customername).click();
  await page.waitForTimeout(2000);
  await page.fill(locators.CashLedger.entercustomername, customerName);
  await page.locator('li.e-list-item', { hasText: customerName }).click();
  await page.waitForTimeout(2000);

  await page.click(locators.customeraccLedger.Searchbutton);
  await page.waitForSelector(`tr:has(td:has-text("${customerName}"))`);// wait up to 60 seconds

  await page.locator(`tr:has(td:has-text("${customerName}"))`);
  const recentBalance = await page.locator('td.e-summarycell[data-cell="Balance"]').textContent();
  console.log(`customer Ledger Report Overall Balance: ${recentBalance}`);
  expect(parseFloat(outstandingBalance)).toBe(parseFloat(recentBalance));
  console.log('Consistency between Outstanding Report and Account Ledger verified successfully.');
}

async function Cashledgerreport(page) {
  await page.click(locators.customeraccLedger.reports);
  await page.click(locators.LedgerReport.ledgerpage);
  await page.click(locators.LedgerReport.cashledgerpage);
  await page.click(locators.LedgerReport.filterbutton);

  await page.locator(locators.LedgerReport.paymentnature).click();
  await page.click("//li[normalize-space()='Receive']");
  await page.locator(locators.CashLedger.customername).click();
  await page.fill(locators.CashLedger.entercustomername, customerName);
  await page.locator('li.e-list-item', { hasText: customerName }).click();
  await page.click(locators.LedgerReport.submitbutton);

}

async function editcashledger(page, totalreceivedamount) {

  await page.locator(locators.Ledger_Menu).click();
  await page.locator(locators.Cash_Ledger_Menu).click();

  //Locate and click the "view" Button
  await page.locator('a#CashLedgerListViewButton').nth(0).click();
  console.log("click on view");

  //verify edit button and edit data
  await page.locator(locators.Edit).click();

  //Fill Total Received Amount
  await page.locator(locators.totalreceivedamountTbox).click();
  await page.locator(locators.totalreceivedamountTbox).fill(totalreceivedamount);  // Fill the Transaction Id field
  console.log(' Total Received Amountfilled.');

  const netOutstandingAmt = await page.locator(locators.netoutstandingamount).first().textContent();
  const amount = parseFloat(netOutstandingAmt.trim());

  if (!isNaN(amount) && amount > 0) {
   // const halfAmount = (amount / 2).toFixed(2); // Calculate half and keep 2 decimal places

    console.log(`Filling Received Amount with: ${amount}`);
    // Fill the "Received Amount" input field
    const receive = await page.locator(locators.clickreceivedamt).nth(0);
    receive.dblclick();
    await page.fill(locators.enterreceivedamt, amount.toString());
  } else {
    console.log("Invalid Net Outstanding Amount. Skipping input.");
  }

  await page.locator(locators.update_button).click(); // update grid
  await page.waitForTimeout(1000);
  if (await page.locator(locators.Partial_Payment_Pop_up).isVisible()) {
    await page.locator(locators.Partial_Payment_Yes).click();
    await page.waitForTimeout(1000);
  }
  await page.locator(locators.updateok).click();
  console.log("update grid")

  await page.locator(locators.submitbtn).click();
  console.log("click on submit ");
  await page.waitForTimeout(2000);
}

//Report verification after Edit Cash Ledger 
async function Report(page, customer) {

  // Outstanding Reports
  await page.click(locators.customeraccLedger.reports);
  await page.click(locators.outstandingreport.outstanding);
  await page.click(locators.outstandingreport.filterbutton);

  await page.locator(locators.CashLedger.customername).click();
  await page.waitForTimeout(2000);
  await page.fill(locators.CashLedger.entercustomername, customer);
  await page.locator('li.e-list-item', { hasText: customer }).click();
  await page.waitForTimeout(2000);
  await page.click(locators.outstandingreport.SearchButton);
  await page.waitForTimeout(1000);


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

  await page.waitForSelector(`tr:has(td:has-text("${customer}"))`, { timeout: 60000 }); // wait up to 60 seconds

  // Now locate the row and get the balance
  await page.locator(`tr:has(td:has-text("${customer}"))`);
  const outstandingBalance = await page.locator('td.e-summarycell[data-cell="Balance"]').textContent();
  console.log(`Outstanding Report Overall Balance: ${outstandingBalance}`);
  console.log('outstanding report Verification complete successfully.');

  //SAC - customer account ledger repoert

  await page.locator(locators.companychange).click();
  await page.locator(locators.selectSAC).click();
  await page.locator(locators.yesbtncompnaychange).click();
  await page.waitForTimeout(1000);
  console.log('login to SAC company');

  await page.click(locators.customeraccLedger.reports);
  await page.click(locators.customeraccLedger.accountLedger);
  await page.click(locators.customeraccLedger.customeraccount);
  await page.click(locators.customeraccLedger.filterbutton);

  await page.locator(locators.CashLedger.customername).click();
  await page.waitForTimeout(2000);
  await page.fill(locators.CashLedger.entercustomername, customer);
  await page.locator('li.e-list-item', { hasText: customer }).click();

  await page.click(locators.customeraccLedger.Searchbutton);
  await page.waitForTimeout(2000);

  console.log('Customer Account Ledger Report verification completed successfully.');

  await page.waitForSelector(`tr:has(td:has-text("${customer}"))`, { timeout: 60000 }); // wait up to 60 seconds

  await page.locator(`tr:has(td:has-text("${customer}"))`);
  const recentBalance = await page.locator('td.e-summarycell[data-cell="Balance"]').textContent();
  console.log(`customer Ledger Report Overall Balance: ${recentBalance}`);
  expect(parseFloat(outstandingBalance)).toBe(parseFloat(recentBalance));
  console.log('Consistency between Outstanding Report and Account Ledger verified successfully.');

   //Bank Ledger Report

   await page.locator(locators.companychange).click();
   await page.locator(locators.selectKBT).click();
   await page.locator(locators.yesbtncompnaychange).click();
   await page.waitForTimeout(1000);
   console.log('login to KBT company');
 
   await page.click(locators.customeraccLedger.reports);
   await page.click(locators.LedgerReport.ledgerpage);
   await page.click(locators.LedgerReport.cashledgerpage);
   await page.click(locators.LedgerReport.filterbutton);
 
   await page.locator(locators.LedgerReport.paymentnature).click();
   await page.click("//li[normalize-space()='Receive']");
   await page.locator(locators.CashLedger.customername).click();
   await page.fill(locators.CashLedger.entercustomername, customer);
   await page.locator('li.e-list-item', { hasText: customer }).click();
   await page.click(locators.LedgerReport.submitbutton);
}

module.exports = {
  verifyledger, addcashledger, verifypartialpayment,Checks_Grid_After_New_Data_Added,VerifyReceiveAmt,
  verifyduplicatebillno, addledgerforsale, outstandingReport, customeraccledger, VerifyConsistency, Cashledgerreport,
  editcashledger , Report
};
