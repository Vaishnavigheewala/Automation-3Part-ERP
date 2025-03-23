const { test, expect } = require('@playwright/test');
const locators = require('../Pages/Bank/bank.json');
const fs = require('fs');
const path = require('path');


/******************Reusable functions imported***********************/
const { log_in ,Variable_File_Path} = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { Bank_Entry_Selection,Addbank, verifybank, updatebank, paymentmethod, Bank_Ledger_Navigation } = require('../Pages/Bank/bank.js');
const { Generate_Variable, Generate_Unique_String } = require('../Dynamic_Variables_Manage/Dynamic_Variable_Manage.js');
/********************************************************************/

let filePath = Variable_File_Path();
let updatedVariables;
updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));



let Bank_Name;
let updateBank_Name;


test('Verify Bank Page and Create Bank', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);

    Bank_Name = await Generate_Variable('Bank.Bank_Name', async () => `Bank Of ${await Generate_Unique_String()}`);
    updateBank_Name = await Generate_Variable('Bank.updateBank_Name', async () => `Bank of ${await Generate_Unique_String()}`);
    console.log("Bank Name:", Bank_Name);

    await selectmenu(page, "Master"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Master Menu');
    await Bank_Entry_Selection(page, "Master");
    console.log('Step 5: Bank Page is Displayed');

    await verifybank(page, Bank_Name);
    console.log('step 6:verify bank entry page');
    await Addbank(page, Bank_Name);
    console.log('step 7:Add bank entry page');


    await updatebank(page, updateBank_Name);
    console.log('step 8:update bank entry page');

    await Bank_Ledger_Navigation(page);
    console.log('Step 9: Bank Ledger Page is Displayed');

    await page.locator(locators.Verify_bank.ladger_add).click();

    await paymentmethod(page, "Cheque", updateBank_Name); // called selectcustomer to select customer from dropdown
    //    //const bankname = "VaishnaviAutomation"; // stored in variable so that it can be used across diffrent test cases
    console.log('Step 10: Selected Payment Method as - "Cheque" ');

    //await page.locator(locators.Verify_bank.ladger_add).click();
    await page.waitForTimeout(1000)

});