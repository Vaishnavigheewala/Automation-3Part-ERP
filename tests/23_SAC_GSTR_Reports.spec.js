const { test, expect } = require('@playwright/test');
// const locator = require('../Pages/GSTR_2/GSTR_2_Report.json');
const locators = require('../Pages/GSTR_1/GSTR_1_Report.json');
const salelocators = require('../Pages/Sales/sales.json');

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
let Customer_Name = updatedVariables.Customer.Customer_Account_Name;
let InventoryRO_Name = updatedVariables.Inventory.InventoryRO_Name;



// ====================
const { log_in, Company_Change, Variable_File_Path } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { Generate_Variable, Delete_Variable, Delete_All_Variables, List_Variables, Get_Current_Date_Time, Generate_Unique_String,
    Generate_Unique_Address, Generate_Random_Mobile_No, Remove_Empty_Strings } = require('../Dynamic_Variables_Manage/Dynamic_Variable_Manage.js');
const { selectsubmenu, addgstsales_button, selectcustomer, selectbroker, selecttechnician,
    addsalesdetails, updatesalesdetails, storenetamount, Pagination_Checking,
    submitbutton, salesgrid, selectfilter, verifydetails, searchSelectedCustomer,
    dataGridInvoiceDownload, ViewSalesDetailData, salessummaryreport, Combinedsalereport,
    Outstanding, inventorystockreport, customeraccledger } = require('../Pages/Sales/sales.js');
const { Apply_Date_Filter_To_Current_Month, GSTR_2_Menu_Selection, B2B_Invoices_3_4A, Close_Popup, B2BUR_4B } = require('../Pages/GSTR_2/GSTR_2_Report.js');
const { Sale_B2Csmall_ingujarat, Sale_B2BInvoices_ingujarat, Sale_B2BInvoices_outofgujarat,
    AMC_B2Csmall_ingujarat, AMC_B2BInvoices_ingujarat, AMC_B2BInvoices_outofgujarat,
    SaleReturn_B2Csmall_ingujarat, SaleReturn_CreditDebitNotesRegistered_ingujarat,
    EditCustomer, SaleReturn_CreditDebitNotesRegistered_outofgujarat,
    DebitNote_CreditDebitNotes_Registered, DebitNote_CreditDebitNotes_UnRegistered,
    addInvdetailsinsale , EwayPopupOkbtn ,InvoiceDownload , Sale_Lessthan_250000 , Sale_Greaterthan_250000,
    
} = require('../Pages/GSTR_1/GSTR_1_Report.js');

test('SAC GSTR 2 Reports', async ({ page }) => {
    console.log("==== GSTR 2 Report ====");
    console.log('Step 1: Login to Cash Only');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    await selectmenu(page, "GSTRReports");
    await GSTR_2_Menu_Selection(page);
    await Apply_Date_Filter_To_Current_Month(page);
    await B2B_Invoices_3_4A(page);
    await B2B_Invoices_3_4A_Column_Total(page)
    await Close_Popup(page);
    await B2BUR_4B(page);
    await B2BUR_4B_Column_Total(page);
    await Close_Popup(page);
    await Credit_Debit_Notes_Registered_6C(page);
    // await Credit_Debit_Notes_Registered_6C_Column_Total(page);
    await Close_Popup(page);
    await Credit_Debit_Notes_Unregistered_6C(page);
    // await Credit_Debit_Notes_UnRegistered_6C_Column_Total(page);
    await Close_Popup(page);
    await Reset(page);
    await PDF_Export(page);
});

test('Sale : SAC GSTR 1 Report : B2C(Small) Details - 7 : UnRegister Customer with Gujarat state', async ({ page }) => {
    console.log("==== GSTR 1 Report ====");
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    await page.waitForTimeout(1000);
    //await expect(page).toHaveURL('http://withidforautomation.aquacare.thinkhpconsultant.com:73/');
    await Sale_B2Csmall_ingujarat(page, "GUJARAT", "");
    console.log('Step 2: Successfully verify B2C(Small) Details - 7 Report ');

});

test(' Sale : SAC GSTR 1 Report : B2B-Invoice : Register Customer with Gujarat state ', async ({ page }) => {
    console.log("==== GSTR 1 Report ====");
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    await page.waitForTimeout(1000);
    //await expect(page).toHaveURL('http://withidforautomation.aquacare.thinkhpconsultant.com:73/');
    await Sale_B2BInvoices_ingujarat(page, "GUJARAT", "24AAACH7409R2Z6");
    console.log('Step 2: Successfully verify B2B-Invoice Report ');

});

test('Sale :  SAC GSTR 1 Report : B2B-Invoice : Register Customer with outof Gujarat state  ', async ({ page }) => {
    console.log("==== GSTR 1 Report ====");
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    await page.waitForTimeout(1000);
    //await expect(page).toHaveURL('http://withidforautomation.aquacare.thinkhpconsultant.com:73/');
    await Sale_B2BInvoices_outofgujarat(page, "TAMIL NADU", "33AAACH7409R1Z8");
    console.log('Step 2: Successfully verify B2B-Invoice Report ');

});

test('AMC : SAC GSTR 1 Report : B2C(Small) Details - 7 : UnRegister Customer with Gujarat state', async ({ page }) => {
    console.log("==== GSTR 1 Report ====");
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    await page.waitForTimeout(1000);
    //await expect(page).toHaveURL('http://withidforautomation.aquacare.thinkhpconsultant.com:73/');
    await AMC_B2Csmall_ingujarat(page, "GUJARAT", "");
    console.log('Step 2: Successfully verify B2C(Small) Details - 7 Report ');

});

test(' AMC : SAC GSTR 1 Report : B2B-Invoice : Register Customer with Gujarat state ', async ({ page }) => {
    console.log("==== GSTR 1 Report ====");
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    await page.waitForTimeout(1000);
    //await expect(page).toHaveURL('http://withidforautomation.aquacare.thinkhpconsultant.com:73/');
    await AMC_B2BInvoices_ingujarat(page, "GUJARAT", "24AAACH7409R2Z6");
    console.log('Step 2: Successfully verify B2B-Invoice Report ');

});

test('AMC :  SAC GSTR 1 Report : B2B-Invoice : Register Customer with outof Gujarat state  ', async ({ page }) => {
    console.log("==== GSTR 1 Report ====");
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    await page.waitForTimeout(1000);
    //await expect(page).toHaveURL('http://withidforautomation.aquacare.thinkhpconsultant.com:73/');
    await AMC_B2BInvoices_outofgujarat(page, "TAMIL NADU", "33AAACH7409R1Z8");
    console.log('Step 2: Successfully verify B2B-Invoice Report ');

});

test('SalesReturn : SAC GSTR 1 Report : B2C(Small) Details - 7 : UnRegister Customer with Gujarat state', async ({ page }) => {
    console.log("==== GSTR 1 Report ====");
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    await page.waitForTimeout(1000);
    //await expect(page).toHaveURL('http://withidforautomation.aquacare.thinkhpconsultant.com:73/');
    await SaleReturn_B2Csmall_ingujarat(page, "GUJARAT", "");
    console.log('Step 2: Successfully verify B2C(Small) Details - 7 Report ');

});

test(' SaleReturn : SAC GSTR 1 Report : Credit/Debit Notes(Registered) - 9B : Register Customer with Gujarat state ', async ({ page }) => {
    console.log("==== GSTR 1 Report ====");
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    await page.waitForTimeout(1000);
    //await expect(page).toHaveURL('http://withidforautomation.aquacare.thinkhpconsultant.com:73/');
    await EditCustomer(page, "GUJARAT", "24AAACH7409R2Z6");
    await SaleReturn_CreditDebitNotesRegistered_ingujarat(page);
    console.log('Step 2: Successfully verify Credit/Debit Notes(Registered) - 9B Report : Register Customer with Gujarat state ');

});

test(' SaleReturn : SAC GSTR 1 Report : Credit/Debit Notes(Registered) - 9B : Register Customer without Gujarat state ', async ({ page }) => {
    console.log("==== GSTR 1 Report ====");
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    await page.waitForTimeout(1000);
    //await expect(page).toHaveURL('http://withidforautomation.aquacare.thinkhpconsultant.com:73/');
    await EditCustomer(page, "TAMIL NADU", "33AAACH7409R1Z8");
    await SaleReturn_CreditDebitNotesRegistered_outofgujarat(page);
    console.log('Step 3: Successfully verify Credit/Debit Notes(Registered) - 9B Report : Register Customer without Gujarat state ');

});

test(' DebitNote : SAC GSTR 1 Report : Credit/Debit Notes(Registered) - 9B : Register Customer ', async ({ page }) => {
    console.log("==== GSTR 1 Report ====");
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    await page.waitForTimeout(1000);
    //await expect(page).toHaveURL('http://withidforautomation.aquacare.thinkhpconsultant.com:73/');
    await DebitNote_CreditDebitNotes_Registered(page, "GUJARAT", "24AAACH7409R2Z6");
    console.log('Step 2: Successfully verify Credit/Debit Notes(Registered) - 9B Report : Register Customer  ');

});

test(' DebitNote : SAC GSTR 1 Report : Credit/Debit Notes(Registered) - 9B : UnRegister Customer ', async ({ page }) => {
    console.log("==== GSTR 1 Report ====");
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    await page.waitForTimeout(1000);
    //await expect(page).toHaveURL('http://withidforautomation.aquacare.thinkhpconsultant.com:73/');
    await DebitNote_CreditDebitNotes_UnRegistered(page, "GUJARAT", "");
    console.log('Step 2: Successfully verify Credit/Debit Notes(Registered) - 9B Report : UnRegister Customer  ');

});

test('Sale : SAC GSTR 1 Report : B2C(Small) Details - 7 : Lessthan 2,50,000 scenario ', async ({ page }) => {
    test.setTimeout(60000); // 60 seconds
    console.log("==== GSTR 1 Report ====");
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    await page.waitForTimeout(2000);
    //Add sale with Lessthan 2,50,000 amount
    await selectmenu(page, "Transaction");
    console.log('Step 2: Sucessfully Clicked on Transaction Menu.');
    await selectsubmenu(page, "Transaction");
    console.log('Step 3: Sales page displayed.');
    await addgstsales_button(page); 
    console.log('Step 4: Clicked on Add New Sales Button');
    await selectcustomer(page, Customer_Name); 
    console.log('Step 5: Selected Customer Name as - Customer_Name');
    await page.waitForTimeout(1000)
    await selectbroker(page, "ANKITBHAI"); 
    console.log('Step 6 : Selected Broker Name as - "ANKITBHAI"');
    await page.waitForTimeout(1000);
    await addInvdetailsinsale(page, "FinishMaterial", InventoryRO_Name, "4" , "4000");
    await updatesalesdetails(page);
    await submitbutton(page);
    await InvoiceDownload(page);
    console.log('Step 7 : Cliked on Submit Button - GST Sales Added Successfully');
    await page.waitForTimeout(1000);
    //await expect(page).toHaveURL('http://withidforautomation.aquacare.thinkhpconsultant.com:73/');
    await Sale_Lessthan_250000(page, "TAMIL NADU", "");
    console.log('Step 8: Successfully verify Lessthan 2,50,000 scenario : UnRegister Customer with Outof Gujarat  ');


});

test('Sale : SAC GSTR 1 Report : B2C(Large) Invoices - 5A, 5B : Greaterthan 2,50,000 scenario ', async ({ page }) => {
    test.setTimeout(60000); // 60 seconds
    console.log("==== GSTR 1 Report ====");
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    await page.waitForTimeout(2000);
    //Add sale with Lessthan 2,50,000 amount
    await selectmenu(page, "Transaction");
    console.log('Step 2: Sucessfully Clicked on Transaction Menu.');
    await selectsubmenu(page, "Transaction");
    console.log('Step 3: Sales page displayed.');
    await addgstsales_button(page); 
    console.log('Step 4: Clicked on Add New Sales Button');
    await selectcustomer(page, Customer_Name); 
    console.log('Step 5: Selected Customer Name as - Customer_Name');
    await page.waitForTimeout(1000)
    await selectbroker(page, "ANKITBHAI"); 
    console.log('Step 6 : Selected Broker Name as - "ANKITBHAI"');
    await page.waitForTimeout(1000);
    await addInvdetailsinsale(page, "FinishMaterial", InventoryRO_Name, "8" , "50000");
    await updatesalesdetails(page);
    await submitbutton(page);
    await EwayPopupOkbtn(page);
    await InvoiceDownload(page);
    console.log('Step 7 : Cliked on Submit Button - GST Sales Added Successfully');
    await page.waitForTimeout(1000);
    //await expect(page).toHaveURL('http://withidforautomation.aquacare.thinkhpconsultant.com:73/');
    await Sale_Greaterthan_250000(page, "TAMIL NADU", "");
    console.log('Step 8: Successfully verify Lessthan 2,50,000 scenario : UnRegister Customer with Outof Gujarat  ');


});

test('GSTR - 3B Report', async ({ page }) => {
    console.log("==== GSTR 3B Report ====");
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare");
    await page.waitForTimeout(2000);
    await SearchDate(page);


});
