const { test, expect   } = require('@playwright/test');
const locators = require('../Pages/04area/areaentry.json');
const fs = require('fs');
const path = require('path');

/******************Reusable functions imported***********************/
const { log_in, Variable_File_Path } = require('../Pages/01Login/login.js'); 
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { add_area_data , update_area_data , editlink , verifyareadata} = require('../Pages/04area/areaentry.js');
const { Generate_Variable, Generate_Unique_String } = require('../Dynamic_Variables_Manage/Dynamic_Variable_Manage.js');
/********************************************************************/
let filePath = Variable_File_Path();
let updatedVariables;
updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let Area_Name;
let update_Area;

test('Create Area', async ({page}) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page,"Kishorbhai", "Testing","ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    
    Area_Name = await Generate_Variable('Area.Area_Name', async () => `${await Generate_Unique_String()}`);

    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page,"Master"); // called selementmenu to select transaction menu
    await add_area_data(page , "GUJARAT" , "SURAT" , Area_Name); // called selectcustomer to select customer from dropdown
    await editlink(page);

    update_Area = await Generate_Variable('Area.update_Area', async () => `${await Generate_Unique_String()}`);

    await update_area_data(page , "GUJARAT" , "SURAT" , update_Area); // called selectcustomer to select customer from dropdown
    await selectmenu(page,"Master"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Master Menu');
    await verifyareadata(page , update_Area);
});
