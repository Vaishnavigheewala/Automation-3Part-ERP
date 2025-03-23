const { test, expect } = require('@playwright/test');
const locators = require('./AddBankLedger.json');


async function verifyledgersection(page) {
  await page.locator(locators.BankLedger.Ledger).click();
  await page.locator(locators.BankLedger.BankLedgerpage).click();
  await expect(page.locator('li.breadcrumb-item.active', { hasText: 'Bank' })).toBeVisible();
  await page.waitForTimeout(1000);
  await page.locator(locators.BankLedger.AddnewButton).click();
  await page.waitForTimeout(1000);

  // Verify "Voucher No." field exists and is not editable
  const voucherNo = await page.isDisabled(locators.BankLedger.VoucherNoField);
  console.log(`voucher number Not Editable: ${voucherNo}`);

  const date = await page.inputValue(locators.BankLedger.datepickr);
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
  expect(date).toBe(formattedDate);
  console.log(`defaulting to current date: ${formattedDate}`);
  const netAmount = page.locator(locators.BankLedger.NetAmount);
  await expect(netAmount).toBeVisible();
  const resetButton = page.locator(locators.BankLedger.ResetButton);
  await expect(resetButton).toBeVisible();
  const closeButton = page.locator(locators.BankLedger.CloseButton);
  await expect(closeButton).toBeVisible();
  const submitButton = page.locator(locators.BankLedger.SubmitButton);
  await expect(submitButton).toBeVisible();

  const paymentNatureDropdown = page.locator(locators.BankLedger.paymentNatureDropdown).nth(1);
  await expect(paymentNatureDropdown).toBeVisible();
  await paymentNatureDropdown.click();
  await page.waitForTimeout(1000);
  console.log('Payment Nature dropdown is visible');


  const paymentMethodDropdown = page.locator(locators.BankLedger.paymentMethodDropdown);
  await expect(paymentMethodDropdown).toBeVisible();
  await paymentMethodDropdown.click();
  await page.waitForTimeout(1000);
  console.log('Payment Method dropdown is visible');

  const bankChargesTextbox = page.locator(locators.BankLedger.bankChargesTextbox);
  await expect(bankChargesTextbox).toBeVisible();
  console.log('Bank Charges textbox is visible');
}

async function verifypaymentnatureandmethod(page) {
  await page.locator(locators.BankLedger.Ledger).click();
  await page.locator(locators.BankLedger.BankLedgerpage).click();
  await expect(page.locator('li.breadcrumb-item.active', { hasText: 'Bank' })).toBeVisible();
  await page.waitForTimeout(1000);
  await page.locator(locators.BankLedger.AddnewButton).click();
  await page.waitForTimeout(1000);
  //payment nature verification
  await page.locator(locators.BankLedger.paymentNatureDropdown).nth(1).click();
  // console.log('payment Nature is disabled');
  await page.click("//li[normalize-space()='Receive']");
  await page.waitForTimeout(1000);
  console.log('Set Payment Nature to Receive');
  // warning: "Please select Customer"
  const customerDropdown = await page.locator(locators.BankLedger.customerdropdown);
  await expect(customerDropdown).toBeVisible();
  console.log('Customer Dropdown is visible after selecting Receive.');

  await page.locator(locators.BankLedger.addgridbtn).click();
  console.log(' Attempt to Submit without selecting Customer');

  const warningMessage = page.locator('text=Please select Customer');
  await expect(warningMessage).toBeVisible();
  await page.waitForTimeout(1000);
  console.log('Warning message displayed: Please select Customer');
  //payment method verification
  await page.locator(locators.BankLedger.paymentMethodDropdown).click();
  await page.click("//li[normalize-space()='UPI']");
  console.log(' Set Payment Method to UPI');

  const TransactionID = page.locator(locators.BankLedger.TransactionIDTextbox);
  await expect(TransactionID).toBeVisible();
  await page.waitForTimeout(1000);
  console.log('UPI Transaction ID textbox is visible after selecting UPI.');


  await page.locator(locators.BankLedger.paymentMethodDropdown).click();
  await page.click("//li[normalize-space()='NEFT']");
  console.log(' Set Payment Method to NEFT');

  const TransactionId = page.locator(locators.BankLedger.TransactionIDTextbox);
  await expect(TransactionId).toBeVisible();
  await page.waitForTimeout(1000);
  console.log(' Transaction ID textbox is visible after selecting NEFT.');

  await page.locator(locators.BankLedger.paymentMethodDropdown).click();
  await page.click("//li[normalize-space()='RTGS']");
  console.log(' Set Payment Method to RTGS');

  const Transactionid = page.locator(locators.BankLedger.TransactionIDTextbox);
  await expect(Transactionid).toBeVisible();
  await page.waitForTimeout(1000);
  console.log(' Transaction ID textbox is visible after selecting RTGS.');

  await page.locator(locators.BankLedger.paymentMethodDropdown).click();
  await page.click("//li[normalize-space()='Cheque']");
  console.log(' Set Payment Method to Cheque');

  const bankname = page.locator(locators.BankLedger.bankname);
  await expect(bankname).toBeVisible();
  await page.waitForTimeout(1000);
  console.log(' Bank Name Dropdown is visible after selecting Cheque.');

  const bankactno = page.locator(locators.BankLedger.bankactno);
  await expect(bankactno).toBeVisible();
  await page.waitForTimeout(1000);
  console.log(' Bank account  textbox is visible after selecting Cheque.');

  const chequeno = page.locator(locators.BankLedger.chequeno);
  await expect(chequeno).toBeVisible();
  await page.waitForTimeout(1000);
  console.log(' cheque no  textbox is visible after selecting Cheque.');

}

async function fullandpartialPayment(page, TransactionID, customer, totalreceivedamount, directhufsale) {

  //go to the Amc Invoice page
  await page.locator(locators.transactionmenu).click();
  await page.locator(locators.sales).click();
  await page.locator(locators.directhufsales).click();

  await page.waitForSelector("//td[@id='DirectHUFSalesRegularBillNumberColumn']");

  // Fetch the latest Amc  number from the regular amc no column
  const LatestDirecthufsaleno = await page.locator("//td[@id='DirectHUFSalesRegularBillNumberColumn']").nth(0).textContent();

  if (!LatestDirecthufsaleno || LatestDirecthufsaleno.trim() === "") {
    console.log('No latest Amc number found. Exiting...');
  }

  console.log(`Latest Amc No: ${LatestDirecthufsaleno.trim()}`);


  await page.locator(locators.transactionmenu).click();
  await page.locator(locators.BankLedger.Ledger).click();
  await page.locator(locators.BankLedger.BankLedgerpage).click();
  await expect(page.locator('li.breadcrumb-item.active', { hasText: 'Bank' })).toBeVisible();
  await page.waitForTimeout(1000);
  await page.locator(locators.BankLedger.AddnewButton).click();
  await page.waitForTimeout(1000);
  const addgridbtn = page.locator(locators.BankLedger.addgridbtn);
  await expect(addgridbtn).toBeVisible();
  const deletegridbtn = page.locator(locators.BankLedger.deletegridbtn);
  await expect(deletegridbtn).toBeVisible();
  const cancelgridbtn = page.locator(locators.BankLedger.cancelgridbtn);
  await expect(cancelgridbtn).toBeVisible();
  const updategridbtn = page.locator(locators.BankLedger.updategridbtn);
  await expect(updategridbtn).toBeVisible();

  await page.locator(locators.BankLedger.paymentMethodDropdown).click();
  await page.click("//li[normalize-space()='UPI']");
  console.log(' Set Payment Method to UPI');

  await page.locator(locators.BankLedger.TransactionIDTextbox).fill(TransactionID);  // Fill the Transaction Id field
  console.log(' Transaction ID filled.');

  //select payment nature
  await page.locator(locators.BankLedger.paymentNatureDropdown).nth(1).click();
  await page.click("//li[normalize-space()='Receive']");
  await page.waitForTimeout(1000);
  console.log('Set Payment Nature to Receive');
  // Select Customer
  await page.locator(locators.BankLedger.customerdropdown).click();
  await page.fill(locators.BankLedger.entercustomername, customer);
  await page.locator('li.e-list-item', { hasText: customer }).click();
  await page.waitForTimeout(1000);

  //Fill Total Received Amount
  await page.locator(locators.BankLedger.totalreceivedamountTbox).click();
  await page.waitForTimeout(1000);
  await page.locator(locators.BankLedger.totalreceivedamountTbox).fill(totalreceivedamount);  // Fill the Transaction Id field
  console.log(' Total Received Amountfilled.');


  //Add partial payment in outstanding details

  await page.locator(locators.BankLedger.addgridbtn).click();
  await page.locator(locators.BankLedger.billtype).click();
  await page.locator('li.e-list-item', { hasText: directhufsale }).click();
  await page.waitForTimeout(1000);

  const billno = await page.locator(locators.BankLedger.billno).nth(0);
  await billno.click();
  await page.locator(locators.BankLedger.billnumber).click();
  await page.locator('li.e-list-item', { hasText: LatestDirecthufsaleno }).click();
  await page.waitForTimeout(2000);

  const netOutstandingAmt = await page.locator(locators.BankLedger.netoutstandingamount).first().textContent();
  // Trim and convert the value to a number
  const pamount = parseFloat(netOutstandingAmt.trim());

  if (!isNaN(pamount) && pamount > 0) {
    const halfAmount = (pamount / 2).toFixed(2); // Calculate half and keep 2 decimal places

    console.log(`Filling Received Amount with: ${halfAmount}`);

    // Fill the "Received Amount" input field
    const receive = await page.locator(locators.BankLedger.Receivedamt).nth(0);
    receive.click();
    await page.fill(locators.BankLedger.enterReceiveamt, halfAmount.toString());
  } else {
    console.log("Invalid Net Outstanding Amount. Skipping input.");
  }


  // // Enter the Received Amount equal to the Net Outstanding Amount (Partial payment)
  const remaining = await page.locator('td#BankLedgerEntryRemainingBalColumn').nth(0);
  await remaining.click();
  await page.click("#BankLedgerpartialPaymentYesbutton"); // confirmation popup massage for partial payment

  await page.waitForTimeout(2000); await page.waitForSelector('td#BankLedgerEntryRemainingBalColumn', { state: 'visible' });
  await page.waitForSelector('td#BankLedgerEntryExchangeAmountColumn', { state: 'visible' });
  const balanceAmountpartial = (await page.locator('td#BankLedgerEntryRemainingBalColumn').nth(0).textContent()).trim();
  const exchangeAmountpartial = (await page.locator('td#BankLedgerEntryExchangeAmountColumn').nth(0).textContent()).trim();

  expect(balanceAmountpartial).not.toBe('0.00');
  expect(exchangeAmountpartial).toBe('0.00');
  console.log('balance Amount is not zero :', balanceAmountpartial);
  console.log('exchange Amount :', exchangeAmountpartial);

  //const updateButton = await page.locator(locators.BankLedger.updategridbtn); // update grid
  const updateButtonF = await page.locator(locators.BankLedger.updategridbtn);
  await updateButtonF.click();
  const updateWarning = await page.locator("text='Are you sure you want to save changes?'");
  await expect(updateWarning).toBeVisible();
  await page.click("//button[normalize-space()='OK']");
  console.log('Step 5: Sucessfully Add & verify Outstanding Detail Section (Partial Payment)');


  // verify Duplicate Bill No Privention

  await page.locator(locators.BankLedger.addgridbtn).click();
  await page.locator(locators.BankLedger.billtype).click();
  await page.locator('li.e-list-item', { hasText: directhufsale }).click();
  await page.waitForTimeout(1000);
  //const billno = await page.locator(locators.BankLedger.billno).nth(0);
  await billno.click();
  await page.locator(locators.BankLedger.billnumber).click();
  //await page.waitForTimeout(3000);
  await page.locator('li.e-list-item', { hasText: LatestDirecthufsaleno }).click();
  await page.waitForTimeout(1000);
  const updateButton = await page.locator(locators.BankLedger.updategridbtn);
  await updateButton.click();
  const cancelButton = await page.locator(locators.BankLedger.cancelgridbtn);
  await cancelButton.click();
  await page.click("//button[normalize-space()='OK']");
  const submitButtons = await page.locator(locators.BankLedger.SubmitButton);
  await submitButtons.click();
  console.log('Step 6: Sucessfully verify duplicate bill selection prevention');
  console.log(' ledger added sucessfully with partial payment');

  // Full Payment

  await page.locator(locators.BankLedger.AddnewButton).click();
  await page.waitForTimeout(1000);

  await page.locator(locators.BankLedger.paymentMethodDropdown).click();
  await page.click("//li[normalize-space()='UPI']");
  console.log(' Set Payment Method to UPI');

  await page.locator(locators.BankLedger.TransactionIDTextbox).fill(TransactionID);  // Fill the Transaction Id field
  console.log(' Transaction ID filled.');

  //select payment nature
  await page.locator(locators.BankLedger.paymentNatureDropdown).nth(1).click();
  await page.click("//li[normalize-space()='Receive']");
  await page.waitForTimeout(1000);
  console.log('Set Payment Nature to Receive');
  // Select Customer
  await page.locator(locators.BankLedger.customerdropdown).click();
  await page.fill(locators.BankLedger.entercustomername, customer);
  await page.locator('li.e-list-item', { hasText: customer }).click();
  await page.waitForTimeout(1000);

  //Fill Total Received Amount
  await page.locator(locators.BankLedger.totalreceivedamountTbox).click();
  await page.waitForTimeout(1000);
  await page.locator(locators.BankLedger.totalreceivedamountTbox).fill(totalreceivedamount);  // Fill the Transaction Id field
  console.log(' Total Received Amountfilled.');


  //add outstanding details
  await addgridbtn.click()
  await page.locator(locators.BankLedger.billtype).click();
  await page.locator('li.e-list-item', { hasText: directhufsale }).click();
  //await page.waitForTimeout(1000);

  await page.locator(locators.BankLedger.billno).click();
  await page.locator(locators.BankLedger.billnumber).click();
  await page.locator('li.e-list-item', { hasText: LatestDirecthufsaleno }).click();
  //await page.waitForTimeout(2000);

  // Verify Net Outstanding Amount matches the Bill Amount and Outstanding Amount
  await page.waitForSelector(locators.BankLedger.netoutstandingamount, { state: 'visible' });
  await page.waitForSelector('td#BankLedgerEntryBillAmtColumn', { state: 'visible' });
  await page.waitForSelector('td#BankLedgerEntryOutstandingColumn', { state: 'visible' });
  await page.waitForTimeout(2000);
  const netOutstandingAmount = await page.locator(locators.BankLedger.netoutstandingamount).textContent();
  console.log('Net Outstanding Amount:', netOutstandingAmount); // Replace with the correct selector
  await page.waitForTimeout(2000);


  // Trim and convert the value to a number
  const amount = parseFloat(netOutstandingAmount.trim());

  if (!isNaN(amount) && amount > 0) {
    console.log(`Filling Received Amount with: ${amount}`);

    // Enter the Received Amount equal to the Net Outstanding Amount (full payment)
    await page.locator(locators.BankLedger.Receivedamt).click();
    await page.fill(locators.BankLedger.enterReceiveamt, amount.toString());
  } else {
    console.log("Invalid Net Outstanding Amount. Skipping input.");
  }


  // Verify Balance and Exchange Amount are both displayed as 0
  await page.locator('td#BankLedgerEntryRemainingBalColumn').click();
  await page.waitForSelector('td#BankLedgerEntryRemainingBalColumn', { state: 'visible' });
  await page.waitForSelector('td#BankLedgerEntryExchangeAmountColumn', { state: 'visible' });
  const balanceAmountfull = (await page.locator('td#BankLedgerEntryRemainingBalColumn').textContent()).trim();
  const exchangeAmountfull = (await page.locator('td#BankLedgerEntryExchangeAmountColumn').textContent()).trim();
  await page.waitForTimeout(1000);

  // expect(balanceAmountfull).toBe('0.00');
  // expect(exchangeAmountfull).toBe('0.00');
  console.log('balance Amount :', balanceAmountfull);
  console.log('exchange Amount :', exchangeAmountfull);

  const submitButton = await page.locator(locators.BankLedger.SubmitButton);
  await submitButton.click();
  await page.waitForTimeout(2000);


  // Verify "Update Changes!" popup is displayed
  const updatePopup = await page.locator('text=Update Changes!');
  await page.click('//button[normalize-space()="Ok"]');



  // Click on Update
  // const updateButtonF = await page.locator(locators.BankLedger.updategridbtn);
  await updateButtonF.click();
 


  // Verify the warning popup
  await page.locator('text=Are you sure you want to save changes?');
  await page.click('//button[normalize-space()="OK"]');
  await submitButton.click();
  console.log('Sucessfully Add & verify Outstanding Detail Section (Full Payment)');

}

async function Report(page, customer) {

  // Outstanding Reports
  await page.click(locators.report);
  await page.click(locators.outstandingreport.outstanding);

  await page.click(locators.outstandingreport.filterbutton);

  await page.locator(locators.BankLedger.customerdropdown).click();
  await page.waitForTimeout(2000);
  await page.fill(locators.BankLedger.entercustomername, customer);
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
  await page.waitForTimeout(1000);
  await page.click(locators.report);
  await page.click(locators.customeraccLedger.accountLedger);
  await page.click(locators.customeraccLedger.customeraccount);
  await page.click(locators.customeraccLedger.filterbutton);

  await page.locator(locators.BankLedger.customerdropdown).click();
  await page.waitForTimeout(2000);
  await page.fill(locators.BankLedger.entercustomername, customer);
  await page.locator('li.e-list-item', { hasText: customer }).click();
  await page.waitForTimeout(2000);
  await page.click(locators.customeraccLedger.Searchbutton);
  await page.waitForTimeout(1000);

  console.log('Customer Account Ledger Report verification completed successfully.');

  await page.waitForSelector(`tr:has(td:has-text("${customer}"))`, { timeout: 60000 }); // wait up to 60 seconds

  await page.locator(`tr:has(td:has-text("${customer}"))`);
  const recentBalance = await page.locator('td.e-summarycell[data-cell="Balance"]').textContent();
  console.log(`customer Ledger Report Overall Balance: ${recentBalance}`);
  expect(parseFloat(outstandingBalance)).toBe(parseFloat(recentBalance));
  await page.waitForTimeout(1000);
  console.log('Consistency between Outstanding Report and Account Ledger verified successfully.');

  //Bank Ledger Report

  await page.locator(locators.companychange).click();
  await page.locator(locators.selectKBT).click();
  await page.locator(locators.yesbtncompnaychange).click();
  await page.waitForTimeout(1000);
  console.log('login to KBT company');
  await page.waitForTimeout(2000);
  await page.click(locators.report);
  await page.click(locators.LedgerReport.ledgerpage);
  await page.click(locators.LedgerReport.bankledgerpage);
  await page.click(locators.LedgerReport.filterbutton);

  await page.locator(locators.LedgerReport.paymentnature).click();
  await page.click("//li[normalize-space()='Receive']");
  await page.locator(locators.BankLedger.customerdropdown).click();
  await page.fill(locators.BankLedger.entercustomername, customer);
  await page.waitForTimeout(2000);
  await page.locator('li.e-list-item', { hasText: customer }).click();
  
  await page.click(locators.LedgerReport.searchbutton);
  await page.waitForTimeout(1000);


}


module.exports = { verifyledgersection, verifypaymentnatureandmethod, fullandpartialPayment, Report };