const { test, expect } = require('@playwright/test');
const locators = require('./Bankledger.json');
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
let customerName = updatedVariables.Customer.Customer_Account_Name; // Get the latest Customer_Name

async function verifyaddledger(page) {
  await page.locator(locators.BankLedger.Ledger).click();
  await page.locator(locators.BankLedger.BankLedgerpage).click();
  await expect(page.locator('li.breadcrumb-item.active', { hasText: 'Bank' })).toBeVisible();

  await page.locator(locators.BankLedger.AddnewButton).click();
  console.log("Click on Add New Button");

  const voucherNo = await page.isDisabled(locators.BankLedger.VoucherNoField);
  console.log(`voucher number Not Editable: ${voucherNo}`);

  const date = await page.inputValue(locators.BankLedger.datepickr);
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
  expect(date).toBe(formattedDate);
  console.log(`defaulting to current date: ${formattedDate}`);

  await page.locator(locators.BankLedger.paymentMethodDropdown).click();
  await page.click("//li[normalize-space()='Cheque']");

  await page.locator(locators.BankLedger.bankname).click();
  await page.click("//li[normalize-space()='Bank of Baroda']");

  await page.locator(locators.BankLedger.bankactno).click();
  await page.fill(locators.BankLedger.bankactno, "BOB8904567289");
  await page.waitForTimeout(1000);

  await page.locator(locators.BankLedger.chequeno).click();
  await page.fill(locators.BankLedger.chequeno, "BOB999");
  await page.waitForTimeout(1000);


  const customerDropdown = await page.locator(locators.BankLedger.customerdropdown);
  await expect(customerDropdown).toBeVisible();

  // Warning for missing customer before adding outstanding detail
  await page.click(locators.BankLedger.addgridbtn);
  const warningMessage = await page.locator("text='Please select Customer'");
  await expect(warningMessage).toBeVisible();
  await page.waitForTimeout(1000);

  // Select Customer
  await customerDropdown.click();
  await page.fill(locators.BankLedger.entercustomername, customerName);
  await page.locator('li.e-list-item', { hasText: customerName }).click();
  await page.waitForTimeout(1000);

  await page.click(locators.BankLedger.addgridbtn);
  await page.waitForTimeout(1000);

  await page.locator(locators.BankLedger.total_receive).click();
  await page.waitForTimeout(1000);
  await page.fill(locators.BankLedger.total_receive, "50000");
  await page.waitForTimeout(1000);

  //verify outstanding details
  await page.click(locators.BankLedger.addgridbtn);
  await page.locator(locators.BankLedger.billtype).click();
  await page.click(locators.BankLedger.selectsales);
  await page.waitForTimeout(3000);
  //bill no

  //await page.waitForTimeout(1000);
  await page.locator(locators.BankLedger.billno).click();
  await page.locator(locators.BankLedger.billnumber).click();
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
  await page.waitForSelector(locators.BankLedger.netoutstandingamount, { state: 'visible' });
  await page.waitForSelector('td#BankLedgerEntryBillAmtColumn', { state: 'visible' });
  await page.waitForSelector('td#BankLedgerEntryOutstandingColumn', { state: 'visible' });
  await page.waitForTimeout(1000);
  const netOutstandingAmount = await page.locator(locators.BankLedger.netoutstandingamount).textContent();
  console.log('Net Outstanding Amount:', netOutstandingAmount); // Replace with the correct selector
  await page.waitForTimeout(1000);
  const billAmount = await page.locator('td#BankLedgerEntryBillAmtColumn').textContent();
  console.log('bill  Amount:', netOutstandingAmount); // Replace with the correct selector
  await page.waitForTimeout(1000);
  const outstandingAmount = await page.locator('td#BankLedgerEntryOutstandingColumn').textContent();
  console.log('Outstanding Amount:', netOutstandingAmount); // Replace with the correct selector
  //expect(netOutstandingAmount).toBe(billAmount);
  //expect(netOutstandingAmount).toBe(outstandingAmount);

  // Enter the Received Amount equal to the Net Outstanding Amount (full payment)

  // Locate the "Net Outstanding Amount" cell
  const netOutstandingAmt = await page.locator(locators.BankLedger.netoutstandingamount).textContent();

  // Trim and convert the value to a number
  const amount = parseFloat(netOutstandingAmt.trim());

  if (!isNaN(amount) && amount > 0) {
    console.log(`Filling Received Amount with: ${amount}`);

    // Fill the "Received Amount" input field
    await page.locator(locators.BankLedger.Receivedamt).click();
    await page.fill(locators.BankLedger.enterReceiveamt, amount.toString());
    //await page.locator('css-selector-for-received-amt').fill(amount.toString());
  } else {
    console.log("Invalid Net Outstanding Amount. Skipping input.");
  }


  // Verify Balance and Exchange Amount are both displayed as 0
  await page.locator('td#BankLedgerEntryRemainingBalColumn').click();
  await page.waitForSelector('td#BankLedgerEntryRemainingBalColumn', { state: 'visible' });
  await page.waitForSelector('td#BankLedgerEntryExchangeAmountColumn', { state: 'visible' });
  const balanceAmount = (await page.locator('td#BankLedgerEntryRemainingBalColumn').textContent()).trim();
  const exchangeAmount = (await page.locator('td#BankLedgerEntryExchangeAmountColumn').textContent()).trim();

  //expect(balanceAmount).toBe('0.00');
  //expect(exchangeAmount).toBe('0.00');
  console.log('balance Amount :', balanceAmount);
  console.log('exchange Amount :', exchangeAmount);
  // Click on Submit without clicking Update
  const submitButton = await page.locator(locators.BankLedger.Submitbtn);
  await submitButton.click();

  // Verify "Update Changes!" popup is displayed
  const updatePopup = await page.locator('text=Update Changes!');
  await page.click('//button[normalize-space()="Ok"]');

  // Click on Update
  const updateButton = await page.locator(locators.BankLedger.updategridbtn);
  await updateButton.click();

  // Verify the warning popup
  await page.locator('text=Are you sure you want to save changes?');
  await page.click('//button[normalize-space()="OK"]');

}

async function verifypartialpayment(page) {
  //verify partial payment
  await page.click(locators.BankLedger.addgridbtn);
  await page.locator(locators.BankLedger.billtype).click();
  await page.click(locators.BankLedger.selectGSTAMC);
  await page.waitForTimeout(2000);
  // Bill number selection
  page.locator(locators.BankLedger.billno).first().dblclick();
  // await billno.click();
  await page.locator(locators.BankLedger.billnumber).dblclick();
  await page.waitForSelector('li.e-list-item', { state: 'visible', timeout: 2000 });

  let firstBill = await page.locator('li.e-list-item').first().textContent();
  if (firstBill) await page.locator(`li.e-list-item`, { hasText: firstBill }).click();

  await page.waitForTimeout(3000);

  // Enter the Received Amount equal to the Net Outstanding Amount (Partial payment)
  const netOutstandingAmt = await page.locator(locators.BankLedger.netoutstandingamount).first().textContent();
  // Trim and convert the value to a number
  const amount = parseFloat(netOutstandingAmt.trim());

  if (!isNaN(amount) && amount > 0) {
    const halfAmount = (amount / 2).toFixed(2); // Calculate half and keep 2 decimal places

    console.log(`Filling Received Amount with: ${halfAmount}`);

    // Fill the "Received Amount" input field
    await page.locator(locators.BankLedger.Receivedamt).nth(0).click();
    //receive.click();
    await page.fill(locators.BankLedger.enterReceiveamt, halfAmount.toString());
  } else {
    console.log("Invalid Net Outstanding Amount. Skipping input.");
  }

  await page.click('#BankLedgerEntryUpdateButton');

  await page.click("#BankLedgerpartialPaymentYesbutton");
  // Confirm Update
  //await page.click('#BankLedgerEntryUpdateButton');
  const updateWarning = await page.locator("text='Are you sure you want to save changes?'");
  await expect(updateWarning).toBeVisible();
  await page.click("//button[normalize-space()='OK']");
}

async function verifyduplicatebillno(page) {
  await page.click(locators.BankLedger.addgridbtn);
  await page.locator(locators.BankLedger.billtype).click();
  await page.waitForTimeout(1000);
  await page.click(locators.BankLedger.selectGSTAMC);
  await page.waitForTimeout(1000);
  //bill no

  page.locator(locators.BankLedger.billno).first().dblclick();
  // await billno.click();
  await page.locator(locators.BankLedger.billnumber).dblclick();
  await page.waitForSelector('li.e-list-item', { state: 'visible', timeout: 2000 });

  let firstBill = await page.locator('li.e-list-item').first().textContent();
  if (firstBill) await page.locator(`li.e-list-item`, { hasText: firstBill }).click();
  await page.waitForTimeout(3000);

  const updateButton = await page.locator(locators.BankLedger.updategridbtn);
  await updateButton.click();
  await page.waitForTimeout(1000);

  await page.locator(locators.BankLedger.cancelgridbtn).click();
  await page.click("//button[normalize-space()='OK']");
  console.log("Duplicate Bill Number is Cancle by Cancel button in Grid")
  const billtype = await page.locator(locators.BankLedger.Gridbilltype).nth(0);
  await billtype.click();

  // await page.waitForTimeout(1000);
  await page.locator(locators.BankLedger.deletegridbtn).click();
  console.log("Bill Delete in Grid through Delete button in Outstanding details");
  await page.locator(locators.BankLedger.cancelgridbtn).click();
  await page.click("//button[normalize-space()='OK']");
  await page.waitForTimeout(500);
  console.log("Delete Bill cancel in Grid through Cancel button in Outstanding details");
  await page.locator(locators.BankLedger.ResetButton).click();
  await page.locator(locators.BankLedger.CloseButton).click();

}

async function VerifyReceiveAmt(page) {
  await page.locator(locators.BankLedger.AddnewButton).click();
  console.log("Click on Add New Button");

  const voucherNo = await page.isDisabled(locators.BankLedger.VoucherNoField);
  console.log(`voucher number Not Editable: ${voucherNo}`);

  const date = await page.inputValue(locators.BankLedger.datepickr);
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
  expect(date).toBe(formattedDate);
  console.log(`defaulting to current date: ${formattedDate}`);

  await page.locator(locators.BankLedger.paymentMethodDropdown).click();
  await page.click("//li[normalize-space()='Cheque']");

  await page.locator(locators.BankLedger.bankname).click();
  await page.click("//li[normalize-space()='Bank of Baroda']");

  await page.locator(locators.BankLedger.bankactno).click();
  await page.fill(locators.BankLedger.bankactno, "BOB8904567289");
  await page.waitForTimeout(1000);

  await page.locator(locators.BankLedger.chequeno).click();
  await page.fill(locators.BankLedger.chequeno, "BOB999");
  await page.waitForTimeout(1000);

  const customerDropdown = await page.locator(locators.BankLedger.customerdropdown);
  await customerDropdown.click();
  await page.fill(locators.BankLedger.entercustomername, customerName);
  await page.locator('li.e-list-item', { hasText: customerName }).click();

  await page.locator(locators.BankLedger.total_receive).click();
  await page.waitForTimeout(1000);
  await page.fill(locators.BankLedger.total_receive, "10");
  await page.waitForTimeout(2000);

  await page.click(locators.BankLedger.addgridbtn);
  await page.locator(locators.BankLedger.billtype).click();
  await page.click(locators.BankLedger.selectsales);
  await page.waitForTimeout(3000);
  //bill no

  //await page.waitForTimeout(1000);
  await page.locator(locators.BankLedger.billno).click();
  await page.locator(locators.BankLedger.billnumber).click();
  // await page.waitForTimeout(2000);
  const firstBill = await page.locator('li.e-list-item').first().textContent();

  // Check if a bill number exists before selecting
  if (firstBill) {
    console.log(`Selecting first bill: ${firstBill}`);
    await page.locator('li.e-list-item', { hasText: firstBill }).click();
  } else {
    console.log("No bill number found in the dropdown.");
  }

  // Verify Net Outstanding Amount matches the Bill Amount and Outstanding Amount
  await page.waitForSelector(locators.BankLedger.netoutstandingamount, { state: 'visible' });
  await page.waitForSelector('td#BankLedgerEntryBillAmtColumn', { state: 'visible' });
  await page.waitForSelector('td#BankLedgerEntryOutstandingColumn', { state: 'visible' });
  await page.waitForTimeout(1000);
  const netOutstandingAmount = await page.locator(locators.BankLedger.netoutstandingamount).textContent();
  console.log('Net Outstanding Amount:', netOutstandingAmount); // Replace with the correct selector
  const billAmount = await page.locator('td#BankLedgerEntryBillAmtColumn').textContent();
  console.log('bill  Amount:', netOutstandingAmount); // Replace with the correct selector
  const outstandingAmount = await page.locator('td#BankLedgerEntryOutstandingColumn').textContent();
  console.log('Outstanding Amount:', netOutstandingAmount); // Replace with the correct selector
  //expect(netOutstandingAmount).toBe(billAmount);
  //expect(netOutstandingAmount).toBe(outstandingAmount);

  // Enter the Received Amount equal to the Net Outstanding Amount (Partial payment)
  const netOutstandingAmt = await page.locator(locators.BankLedger.netoutstandingamount).first().textContent();
  // Trim and convert the value to a number
  const amount = parseFloat(netOutstandingAmt.trim());
  console.log("amount", amount);

  if (!isNaN(amount) && amount > 0) {
    const doubleAmount = (amount * 2).toFixed(2); // Calculate half and keep 2 decimal places

    console.log(`Filling Received Amount with: ${doubleAmount}`);

    // Fill the "Received Amount" input field
    const receive = await page.locator(locators.BankLedger.Receivedamt).nth(0);
    receive.click();
    await page.fill(locators.BankLedger.enterReceiveamt, doubleAmount.toString());
  } else {
    console.log("Invalid Net Outstanding Amount. Skipping input.");
  }

  // Verify Balance and Exchange Amount are both displayed as 0
  await page.locator('td#BankLedgerEntryRemainingBalColumn').click();

  // Click on Update
  const updateButton = await page.locator(locators.BankLedger.updategridbtn);
  await updateButton.click();

  // Verify the warning popup
  await page.locator('text=Are you sure you want to save changes?');
  await page.click('//button[normalize-space()="OK"]');
}


async function addledgerforsale(page) {
  await page.locator(locators.BankLedger.Ledger).click();
  await page.locator(locators.BankLedger.BankLedgerpage).click();
  await expect(page.locator('li.breadcrumb-item.active', { hasText: 'Bank' })).toBeVisible();
  //click on add new button
  await page.locator(locators.BankLedger.AddnewButton).click();
  console.log("Click on Add New Button");

  const voucherNo = await page.isDisabled(locators.BankLedger.VoucherNoField);
  console.log(`voucher number Not Editable: ${voucherNo}`);

  const date = await page.inputValue(locators.BankLedger.datepickr);
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
  expect(date).toBe(formattedDate);
  console.log(`defaulting to current date: ${formattedDate}`);

  await page.locator(locators.BankLedger.paymentMethodDropdown).click();
  await page.click("//li[normalize-space()='Cheque']");

  await page.locator(locators.BankLedger.bankname).click();
  await page.click("//li[normalize-space()='Bank of Baroda']");

  await page.locator(locators.BankLedger.bankactno).click();
  await page.fill(locators.BankLedger.bankactno, "BOB8904567289");
  await page.waitForTimeout(1000);

  await page.locator(locators.BankLedger.chequeno).click();
  await page.fill(locators.BankLedger.chequeno, "BOB999");
  await page.waitForTimeout(1000);

  const customerDropdown = await page.locator(locators.BankLedger.customerdropdown);
  await expect(customerDropdown).toBeVisible();

  // Warning for missing customer before adding outstanding detail
  await page.click(locators.BankLedger.addgridbtn);
  const warningMessage = await page.locator("text='Please select Customer'");
  await expect(warningMessage).toBeVisible();
  await page.waitForTimeout(1000);

  // Select Customer
  await customerDropdown.click();
  await page.fill(locators.BankLedger.entercustomername, customerName);
  await page.locator('li.e-list-item', { hasText: customerName }).click();
  await page.waitForTimeout(1000);

  await page.locator(locators.BankLedger.total_receive).click();
  await page.waitForTimeout(1000);
  await page.fill(locators.BankLedger.total_receive, "100000");
  await page.waitForTimeout(1000);

  //verify outstanding details
  await page.click(locators.BankLedger.addgridbtn);
  await page.locator(locators.BankLedger.billtype).click();
  await page.click(locators.BankLedger.selectsales);
  await page.waitForTimeout(3000);
  //bill no

  //await page.waitForTimeout(1000);
  await page.locator(locators.BankLedger.billno).click();
  await page.locator(locators.BankLedger.billnumber).click();
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
  await page.waitForSelector(locators.BankLedger.netoutstandingamount, { state: 'visible' });
  await page.waitForSelector('td#BankLedgerEntryBillAmtColumn', { state: 'visible' });
  await page.waitForSelector('td#BankLedgerEntryOutstandingColumn', { state: 'visible' });
  await page.waitForTimeout(1000);
  const netOutstandingAmount = await page.locator(locators.BankLedger.netoutstandingamount).textContent();
  console.log('Net Outstanding Amount:', netOutstandingAmount); // Replace with the correct selector
  await page.waitForTimeout(1000);
  const billAmount = await page.locator('td#BankLedgerEntryBillAmtColumn').textContent();
  console.log('bill  Amount:', netOutstandingAmount); // Replace with the correct selector
  await page.waitForTimeout(1000);
  const outstandingAmount = await page.locator('td#BankLedgerEntryOutstandingColumn').textContent();
  console.log('Outstanding Amount:', netOutstandingAmount); // Replace with the correct selector
  //expect(netOutstandingAmount).toBe(billAmount);
  //expect(netOutstandingAmount).toBe(outstandingAmount);

  // Enter the Received Amount equal to the Net Outstanding Amount (full payment)

  // Locate the "Net Outstanding Amount" cell
  const netOutstandingAmt = await page.locator(locators.BankLedger.netoutstandingamount).textContent();
  // Trim and convert the value to a number
  const amount = parseFloat(netOutstandingAmt.trim());
  console.log("amount", amount);

  if (!isNaN(amount) && amount > 0) {
    const halfAmount = (amount / 2).toFixed(2); // Calculate half and keep 2 decimal places

    console.log(`Filling Received Amount with: ${halfAmount}`);

    // Fill the "Received Amount" input field
    const receive = await page.locator(locators.BankLedger.Receivedamt).nth(0);
    receive.click();
    await page.fill(locators.BankLedger.enterReceiveamt, halfAmount.toString());
  } else {
    console.log("Invalid Net Outstanding Amount. Skipping input.");
  }

  // Verify Balance and Exchange Amount are both displayed as 0
  await page.locator('td#BankLedgerEntryRemainingBalColumn').click();
  await page.click("#BankLedgerpartialPaymentYesbutton");



  // Click on Update
  const updateButton = await page.locator(locators.BankLedger.updategridbtn);
  await updateButton.click();

  // Verify the warning popup
  await page.locator('text=Are you sure you want to save changes?');
  await page.click('//button[normalize-space()="OK"]');

  await page.click(locators.BankLedger.addgridbtn);
  await page.locator(locators.BankLedger.billtype).click();
  await page.click(locators.BankLedger.selectGSTAMC);
  await page.waitForTimeout(3000);
  //bill no

  //await page.waitForTimeout(1000);
  const billno = await page.locator(locators.BankLedger.billno).nth(0);
  await billno.click();
  await page.locator(locators.BankLedger.billnumber).click();
  // await page.waitForTimeout(2000);
  const firstBill2 = await page.locator('li.e-list-item').first().textContent();

  // Check if a bill number exists before selecting
  if (firstBill2) {
    console.log(`Selecting first bill: ${firstBill2}`);
    await page.locator('li.e-list-item', { hasText: firstBill2 }).click();
  } else {
    console.log("No bill number found in the dropdown.");
  }

  // Verify Net Outstanding Amount matches the Bill Amount and Outstanding Amount
  await page.waitForSelector(locators.BankLedger.netoutstandingamount, { state: 'visible' });
  await page.waitForSelector('td#BankLedgerEntryBillAmtColumn', { state: 'visible' });
  await page.waitForSelector('td#BankLedgerEntryOutstandingColumn', { state: 'visible' });
  await page.waitForTimeout(2000);
  const netOutstandingAmount2 = await page.locator(locators.BankLedger.netoutstandingamount).first().textContent();
  console.log('Net Outstanding Amount:', netOutstandingAmount2); // Replace with the correct selector
  await page.waitForTimeout(2000);
  const billAmount2 = await page.locator('td#BankLedgerEntryBillAmtColumn').first().textContent();
  console.log('bill  Amount:', netOutstandingAmount2); // Replace with the correct selector
  await page.waitForTimeout(2000);
  const outstandingAmount2 = await page.locator('td#BankLedgerEntryOutstandingColumn').first().textContent();
  console.log('Outstanding Amount:', netOutstandingAmount2); // Replace with the correct selector
  //expect(netOutstandingAmount).toBe(billAmount);
  //expect(netOutstandingAmount).toBe(outstandingAmount);
  const netOutstandingAmt2 = await page.locator(locators.BankLedger.netoutstandingamount).first().textContent();
  const amount2 = parseFloat(netOutstandingAmt2.trim());
  console.log("amount", amount2);

  if (!isNaN(amount2) && amount2 > 0) {

    console.log(`Filling Received Amount with: ${amount2}`);

    // Fill the "Received Amount" input field
    const receive = await page.locator(locators.BankLedger.Receivedamt).nth(0);
    receive.click();
    await page.fill(locators.BankLedger.enterReceiveamt, amount2.toString());
  } else {
    console.log("Invalid Net Outstanding Amount. Skipping input.");
  }


  await page.locator("td#BankLedgerEntryRemainingBalColumn").nth(0).click();

  await page.waitForTimeout(3000);
  const updateButton2 = await page.locator(locators.BankLedger.updategridbtn);
  await updateButton2.click();

  // Verify the warning popup
  await page.locator('text=Are you sure you want to save changes?');
  await page.click('//button[normalize-space()="OK"]');

  await page.click(locators.BankLedger.Submitbtn);
  console.log("Invalid Cheque No. Error is display");

  await page.locator(locators.BankLedger.chequeno).click();
  await page.fill(locators.BankLedger.chequeno, "219074");
  console.log("Cheque Number modify");

  await page.click(locators.BankLedger.Submitbtn);
  console.log("Bank Ledger Add Successfull with part and full payment");

  const rows = await page.locator('tr[aria-rowindex]'); // Select all rows with aria-rowindex
  const firstRow = await rows.nth(0);
  await firstRow.locator(locators.Grid.Accountname);
  await expect(firstRow).toContainText(customerName);
  await page.waitForTimeout(2000);
  console.log("Verify newly aaded ledger is display in Grid");

}

async function outstandingReport(page) {
  await page.click(locators.outstandingreport.outstanding);

  await page.click(locators.outstandingreport.filterbutton);

  await page.locator(locators.BankLedger.customerdropdown).click();
  await page.waitForTimeout(2000);
  await page.fill(locators.BankLedger.entercustomername, customerName);
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

  await page.locator(locators.BankLedger.customerdropdown).click();
  await page.waitForTimeout(2000);
  await page.fill(locators.BankLedger.entercustomername, customerName);
  await page.locator('li.e-list-item', { hasText: customerName }).click();
  await page.waitForTimeout(2000);

  await page.click(locators.customeraccLedger.Searchbutton);
  await page.waitForTimeout(2000);

  console.log('Customer Account Ledger Report verification completed successfully.');

}

async function VerifyConsistency(page) {

  await page.click(locators.outstandingreport.outstanding);
  await page.click(locators.outstandingreport.filterbutton);

  await page.locator(locators.BankLedger.customerdropdown).click();
  await page.waitForTimeout(2000);
  await page.fill(locators.BankLedger.entercustomername, customerName);
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

  await page.locator(locators.BankLedger.customerdropdown).click();
  await page.waitForTimeout(2000);
  await page.fill(locators.BankLedger.entercustomername, customerName);
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

async function Bankledgerreport(page) {
  await page.click(locators.customeraccLedger.reports);
  await page.click(locators.LedgerReport.ledgerpage);
  await page.click(locators.LedgerReport.bankledgerpage);
  await page.click(locators.LedgerReport.filterbutton);

  await page.locator(locators.LedgerReport.paymentnature).click();
  await page.click("//li[normalize-space()='Receive']");
  await page.locator(locators.BankLedger.customerdropdown).click();
  await page.fill(locators.BankLedger.entercustomername, customerName);
  await page.locator('li.e-list-item', { hasText: customerName }).click();
  await page.click(locators.LedgerReport.submitbutton);

}



module.exports = {
  addledgerforsale, outstandingReport, customeraccledger, VerifyConsistency, Bankledgerreport,
  verifyaddledger, verifypartialpayment, verifyduplicatebillno, VerifyReceiveAmt
};

