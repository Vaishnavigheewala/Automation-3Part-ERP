const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
//     ******************Reusable functions imported***********************
const { log_in } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { AMC_Menu, PDF_Export, Reset_Demo, Add_AMC_Contract_plan, Edit_AMC_Contract_Plan, viewInAE, viewInSAC } = require('../Pages/AMC Contract Plan/AMC_Contract_Plan.js');
const { platform } = require('os');
const { Generate_Variable, Delete_Variable, Delete_All_Variables, List_Variables, Get_Current_Date_Time, Generate_Unique_String, Generate_Unique_Address, Generate_Random_Mobile_No } = require('../Dynamic_Variables_Manage/Dynamic_Variable_Manage.js'); // Adjust the path as needed

//const { NULL } = require('mysql/lib/protocol/constants/types');
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Define the file path for the variable storage
let filePath = path.join(process.cwd(), 'Dynamic_Variables_Manage/Dynamic_Variable.json');

// Ensure the variable file exists
if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}
let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let AmcContractName;
let Amccontractname = updatedVariables.AmcContract.AmcContractName; // Get the latest Customer_Name


test('Verify AMC Contract Plan Page ', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await selectmenu(page, "Master");
    await page.waitForTimeout(1000);
    await AMC_Menu(page); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Master Menu');
    await PDF_Export(page);
    await page.waitForTimeout(3000);
    await Reset_Demo(page);
    console.log('Step 5: Reset functionality');
    await page.waitForTimeout(3000);

});

test('Add AMC Contract Plan', async ({page}) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    AmcContractName = await Generate_Variable('AmcContract.AmcContractName', async () => `AmcContract${await Generate_Unique_String()}`);
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Master");
    await page.waitForTimeout(1000);
    await AMC_Menu(page); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Master Menu');
    await page.waitForTimeout(400);
    await Add_AMC_Contract_plan(page,AmcContractName,"No");
    await page.waitForTimeout(3000);

});



test('Edit AMC Contract Plan', async ({page}) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await selectmenu(page, "Master");
    await page.waitForTimeout(1000);
    await AMC_Menu(page); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Master Menu');
    await Edit_AMC_Contract_Plan(page,Amccontractname, "Yes");
    await page.waitForTimeout(3000);


});


test('Archi Enterprise AMC Contract Plan View', async ({page}) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await selectmenu(page, "Master");
    await page.waitForTimeout(1000);
    await AMC_Menu(page); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Master Menu');
    await selectmenu(page,"Transaction");
    await viewInAE(page, Amccontractname);
    console.log('Step 5: Active Data Avilable in Drop down');
    await page.waitForTimeout(1000);



});

test('SAC AMC Contract Plan View', async ({page}) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page,"Kishorbhai", "Testing","ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(1000);
    await selectmenu(page,"Transaction"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await viewInSAC(page, Amccontractname);
    console.log('Step 5: Active Data Avilable in Drop down');
    await page.waitForTimeout(1000);

});

