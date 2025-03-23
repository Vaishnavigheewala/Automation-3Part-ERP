const { test, expect } = require('@playwright/test');
const locators = require('../Pages/InventoryMerge/InventoryMerge.json');

/******************Reusable functions imported***********************/
const { log_in } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { verifyinventory ,verifytransactionrecord,SACitemwise,purchaseitemwise,inventorystockreport} = require('../Pages/InventoryMerge/InventoryMerge.js');


test('navigate and verify inventory merge page', async ({page}) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page,"Kishorbhai", "Testing","ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await selectmenu(page,"Tools"); // called selementmenu to select transaction menu
     console.log('Step 3: Sucessfully Clicked on Tools Menu');
     await verifyinventory(page);
  
 });


 test('Verify Transaction Records', async ({page}) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page,"Kishorbhai", "Testing","ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await selectmenu(page,"Transaction"); // called selementmenu to select transaction menu
     console.log('Step 3: Sucessfully Clicked on Transaction Menu');
     await verifytransactionrecord(page);
  
 });

 test('SAC ItemWise Report', async ({page}) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page,"Kishorbhai", "Testing","ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await selectmenu(page,"Reports"); // called selementmenu to select transaction menu
     console.log('Step 3: Sucessfully Clicked on Reports Menu');
     await SACitemwise(page);    
 
 });

 test('HUF ItemWise Report', async ({page}) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page,"Kishorbhai", "Testing","KishorbhaiBThakkar"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await selectmenu(page,"Reports"); // called selementmenu to select transaction menu
     console.log('Step 3: Sucessfully Clicked on Reports Menu');
     await SACitemwise(page);
  
 });

 test('Cash Only ItemWise Report', async ({page}) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page,"Kishorbhai", "Testing","CashOnly"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await selectmenu(page,"Reports"); // called selementmenu to select transaction menu
     console.log('Step 3: Sucessfully Clicked on Reports Menu');
     await SACitemwise(page);
  
 });

 test('SAC purchase ItemWise Report', async ({page}) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page,"Kishorbhai", "Testing","ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await selectmenu(page,"Reports"); // called selementmenu to select transaction menu
     console.log('Step 3: Sucessfully Clicked on Reports Menu');
     await purchaseitemwise(page);  
 
 });

 test('HUF purchase ItemWise Report', async ({page}) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page,"Kishorbhai", "Testing","KishorbhaiBThakkar"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await selectmenu(page,"Reports"); // called selementmenu to select transaction menu
     console.log('Step 3: Sucessfully Clicked on Reports Menu');
     await purchaseitemwise(page);   
 
 });

 test('Cash Only purchase ItemWise Report', async ({page}) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page,"Kishorbhai", "Testing","CashOnly"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await selectmenu(page,"Reports"); // called selementmenu to select transaction menu
     console.log('Step 3: Sucessfully Clicked on Reports Menu');
     await purchaseitemwise(page);

 });

 test('SAC inventory stock Report', async ({page}) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page,"Kishorbhai", "Testing","ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await selectmenu(page,"Reports"); // called selementmenu to select transaction menu
     console.log('Step 3: Sucessfully Clicked on Reports Menu');
     await inventorystockreport(page);
  
 });

 test('Archie inventory stock Report', async ({page}) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page,"Kishorbhai", "Testing","ArchieEnterprice"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await selectmenu(page,"Reports"); // called selementmenu to select transaction menu
     console.log('Step 3: Sucessfully Clicked on Reports Menu');
     await inventorystockreport(page);
   
 });

 test('Cash Only inventory stock Report', async ({page}) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page,"Kishorbhai", "Testing","CashOnly"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await selectmenu(page,"Reports"); // called selementmenu to select transaction menu
     console.log('Step 3: Sucessfully Clicked on Reports Menu');
     await inventorystockreport(page);
  
 });