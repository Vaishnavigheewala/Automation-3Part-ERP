const { test, expect   } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

//     ******************Reusable functions imported***********************
const { log_in } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const {navigate_amc,verify_amc,search_amc,reset_amc,Invoicelink_amc,service_ticket,viewlink_amc,verify_addAMC,addamc,resetamc,submitamc,reports_amc,SACcustomeraccledger,verify_edit,verify_editAMC_Ledger } = require('../Archie/Amc_Invoice/amc_Invoice.js');

// ********************************************************************

// Define the file path for the variable storage
let filePath = path.join(process.cwd(), 'Dynamic_Variables_Manage/Dynamic_Variable.json');
 
// Ensure the variable file exists
if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}

let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let customerName = updatedVariables.Customer.Customer_Account_Name; // Get the latest Customer_Name
let update_inventory = updatedVariables.Inventory.update_inventory; //Product
let UpdateRaw_Inventory = updatedVariables.Inventory.UpdateRaw_Inventory; // Item
test('Archie - AMC Invoice', async ({ page }) => {

    test.setTimeout(60000); // 60 seconds
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.29.112:88/');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction");
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    //Navigate AMC Invoice 
    await navigate_amc(page);
    console.log('Step 4: Sucessfully Navigate AMC Invoice');
    //Verify AMC Invoice
    await verify_amc(page);
    console.log('Step 5: Sucessfully Verify AMC Invoice');
    //Search AMC Invoice Entry Page
    await search_amc(page,customerName);
    console.log('Step 6: Sucessfully Search AMC Invoice');
    //Reset AMC Invoice Entry Page
    await reset_amc(page,customerName);
    console.log('Step 7: Sucessfully Reset AMC Invoice');
    //Invoice Link AMC Entry Page
    await Invoicelink_amc(page);
    console.log('Step 8: Sucessfully Download Invoice AMC Invoice');
    //View Link AMC Entry Page
    await viewlink_amc(page);
    console.log('Step 9: Sucessfully Navigate View Link of AMC Invoice');
    //Verify Add AMC Entry Page
    await verify_addAMC(page);
    console.log('Step 10: Sucessfully Verify Add AMC Entry Page');
    //Verify Add AMC Entry Page Section
    await addamc(page,customerName,"PAID","ASHOKBHAI","Due","2",update_inventory,UpdateRaw_Inventory, "2" , "2000");
    console.log('Step 11: Sucessfully Verify Add AMC Entry Page');
   
    //Submit AMC 
    await submitamc(page,"asdf");
    console.log('Step 14: Sucessfully Submit AMC Invoice');
    await service_ticket(page);
    console.log('Step 15 : Service ticket open and close')
    //Reports
    await reports_amc(page,customerName,"Archi Enterprice",UpdateRaw_Inventory);
    console.log('Step 16 : Verify Reports of Successful Added AMC Invoice');
});

//Verify Archi reports in SAC
test('SAC - Customer Account Ledger report for customer', async ({ page }) => {

    console.log('Step 17: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); 
    console.log('Step 18: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.29.112:88/'); 
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); 
    console.log('Step 19: Sucessfully Clicked on Reports Menu');
    await SACcustomeraccledger(page,customerName);
    console.log('Step 20: Sucessfully Customer Account Ledger verify report');

});

test('Archie - Edit AMC Invoice', async ({ page }) => {
   
    test.setTimeout(60000); // 60 seconds
    console.log('Step 21: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // called login function
    console.log('Step 22: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.29.112:88/');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction");
    console.log('Step 23: Sucessfully Clicked on Transaction Menu');
    //Navigate AMC Invoice 
    await navigate_amc(page);
    console.log('Step 24: Sucessfully Navigate AMC Invoice');
    //Edit AMC Invoice
    await verify_edit(page,'4',"4000");
    await submitamc(page,"demo AMC");
    //Verify Edit Cash Ledger AMC Invoice
    await verify_editAMC_Ledger(page,customerName,'50000','Amc');
     //Reports
     await reports_amc(page,customerName,"Archi Enterprice",UpdateRaw_Inventory);
     console.log('Step 25 : Verify Reports of Successful Edit AMC Invoice');

});