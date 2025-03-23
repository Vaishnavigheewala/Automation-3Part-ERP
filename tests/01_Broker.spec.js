const { test, expect   } = require('@playwright/test');
const locators = require('../Pages/03Broker/Broker.json');
const fs = require('fs');
const path = require('path');
/******************Reusable functions imported***********************/
const { log_in,Variable_File_Path} = require('../Pages/01Login/login.js'); 
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { add_broker_data , selectsubmenu , selectbroker} = require('../Pages/03Broker/Broker.js');
const { editlink } = require('../Pages/03Broker/Broker.js');
const { Generate_Variable, Generate_Unique_String ,Generate_Random_Mobile_No} = require('../Dynamic_Variables_Manage/Dynamic_Variable_Manage.js'); // Adjust the path as needed

/********************************************************************/

let filePath = Variable_File_Path();
let updatedVariables;
updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));



let Broker_Name;
let Broker_Mobile;
let Broker_Address;
Broker_Name = updatedVariables.Broker.Broker_Name;
test('Create New Broker', async ({page}) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page,"Kishorbhai", "Testing","ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    
    Broker_Name = await Generate_Variable('Broker.Broker_Name', async () => `Broker${await Generate_Unique_String()}`);
    Broker_Mobile = await Generate_Variable('Broker.Broker_Mobile', async () => `${await Generate_Random_Mobile_No()}`);
    Broker_Address = await Generate_Variable('Broker.Broker_Address', async () => `Broker${await Generate_Unique_String()}`);
    let Verifycustomer = JSON.parse(fs.readFileSync('Store_Customer.json')); //Read the shared Net Amount from the JSON fil
    

    await selectmenu(page,"Master"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Master Menu');
    await page.locator(locators.brokermenu.broker_page).click();
    console.log('Step 4: Broker Page Displayed Sucessfully');

    await add_broker_data(page,Broker_Name , Broker_Mobile , Broker_Address); // called selectcustomer to select customer from dropdown
    console.log('Step 5: Entered Broker Data Sucessfully');
    await page.waitForTimeout(1000);

    await page.locator(locators.submit_btn).click();
    console.log("Step 7: Sucessfully Clicked on Save Button");
  
    await page.locator(locators.reset_btn).click();
    console.log("Step 8: Sucessfully Clicked on Reset Button");
   
    await editlink(page);
    console.log("Step 9: Sucessfully Clicked on Edit Button");

    await add_broker_data(page, Broker_Name , Broker_Mobile , Broker_Address);

    await page.waitForTimeout(1000);
    await page.locator(locators.update_btn).click();
    console.log("Step 10: Sucessfully Clicked on update Button");

    await selectmenu(page,"Transaction"); // called selementmenu to select transaction menu
    console.log('Step 11: Sucessfully Clicked on Transaction Menu');
    await selectsubmenu(page,"Transaction");
    console.log('Step 12: Sales Page Displayed');

    await page.locator(locators.add_salse_btn).click();

    await selectbroker(page , Broker_Name);
    

});


test('Verify Broker Name in Kishorbhai B Thakkar Company ', async ({page}) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page,"Kishorbhai", "Testing","KishorbhaiBThakkar"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page,"Transaction"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    
    await page.locator(locators.proforma.sales_menu).click();
    await page.locator(locators.brokermenu.kishorbhaihuf).click();
    await expect(page.locator('li.breadcrumb-item.active', { hasText: 'Direct HUF Sales' })).toBeVisible();
    console.log('Step 5: Sucessfully Display Direct HUF Sales Page');
        
    await page.locator(locators.brokermenu.kishorbhaisalse).click(); 
    
    await page.locator(locators.brokermenu.brokerhufdropdown).click();
    await page.fill(locators.entercustomername, Broker_Name); 
    await page.waitForTimeout(1000); 
    console.log("Step 6: Select the desired Broker by its text");
    await page.locator('li.e-list-item', { hasText: Broker_Name }).click();

    
});


test('Verify Broker Name in Cash Only Company', async ({page}) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page,"Kishorbhai", "Testing","CashOnly"); 
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page,"Transaction");
    console.log('Step 3: Sucessfully Clicked on Master Menu');
    //await page.locator(locators.brokermenu.broker_page).click();
    console.log('Step 4: Broker Page Displayed Sucessfully');

    await page.locator(locators.proforma.sales_menu).click();
    await page.locator(locators.brokermenu.cashonlysalse).click();
    await expect(page.locator('li.breadcrumb-item.active', { hasText: 'Sales' })).toBeVisible();
        
    await page.locator(locators.brokermenu.cashonlyadd).click(); 
    
    await page.locator(locators.brokermenu.cashonlydropdown).click();
    await page.fill(locators.entercustomername,Broker_Name); 
    await page.waitForTimeout(1000); 
    // Step 4: Select the desired Broker by its text
    await page.locator('li.e-list-item', { hasText: Broker_Name }).click();

    await selectmenu(page,"Transaction");
    await page.locator(locators.proforma.sales_menu).click();
    await page.locator(locators.brokermenu.cashonlyhufsalse).click();
    await expect(page.locator('li.breadcrumb-item.active', { hasText: 'HUF Cycle Sales' })).toBeVisible();
        
    await page.locator(locators.brokermenu.cashonlyhufadd).click(); 
    
    await page.locator(locators.brokermenu.cashonlyhufdropdown).click();
    await page.fill(locators.entercustomername, Broker_Name); 
    await page.waitForTimeout(1000); 
    // Step 4: Select the desired Broker by its text
    await page.locator('li.e-list-item', { hasText: Broker_Name }).click();

    
});