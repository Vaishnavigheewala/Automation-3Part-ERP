const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Define the file path for the variable storage
let filePath = path.join(process.cwd(), 'Dynamic_Variables_Manage/Dynamic_Variable.json');

// Ensure the variable file exists
if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}


/******************Reusable functions imported***********************/
const { log_in } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { DeleteHUFCompanySale, DeleteHufSAC, DeleteHufCashonly } = require('../Cashonly/HUF_Delete/HUF_Delete.js');

/********************************************************************/

let updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let Customer_Name = updatedVariables.Customer.Customer_Account_Name;

test('KBT- Delete HUF Sale', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await DeleteHUFCompanySale(page);
});

test('SAC - Delete HUF Sale', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await DeleteHufSAC(page);

});

test('CashOnly - Delete HUF Sale', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "CashOnly"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await DeleteHufCashonly(page, Customer_Name,"vaishnavi automation");

});

