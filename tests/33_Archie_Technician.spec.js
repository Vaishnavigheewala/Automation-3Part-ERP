const { test, expect } = require('@playwright/test');
const locators = require('../Archie/Technician/Technician.json');
const fs = require('fs');

//******************Reusable functions imported***********************/
const { log_in, Variable_File_Path, Company_Change } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { Generate_Variable, Delete_Variable, Delete_All_Variables, List_Variables, Get_Current_Date_Time, Generate_Unique_String, Remove_Empty_Strings,
    Generate_Unique_Address, Generate_Random_Mobile_No } = require('../Dynamic_Variables_Manage/Dynamic_Variable_Manage.js'); // Adjust the path as needed
const { add_technician_data, selectsubmenu, selecttechnician, selectsubmenuhuf, Kishorbhai_selecttechnician, Archie_selecttechnician } = require('../Archie/Technician/Technician.js')
//********************************************************************/
// Global variable for updated JSON data
let updatedVariables = {};
// Function to load and clean JSON data dynamically
function loadUpdatedVariables() {
    let filePath = Variable_File_Path();
    let updatedData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return Remove_Empty_Strings(updatedData);
}
// Before each test, load fresh data
test.beforeEach(() => {
    updatedVariables = loadUpdatedVariables();
});
let Technician, Mobile, Address;

test('Add technician', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Master"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Master Menu');
    await page.locator(locators.Technicianpage).click();
    console.log('Step 4: Technicianpage Page Displayed Sucessfully');
    // add new Technician
    Mobile = await Generate_Variable('Technician.Mobile', async () => `${await Generate_Random_Mobile_No()}`);
    await add_technician_data(page, "TechicianSACAutomation", Mobile, "Test");
    await page.waitForTimeout(2000);
    await page.locator(locators.save_btn).click();
    console.log('Step 5: New Technician Added Sucessfully');
    // test Reste Button
    await page.fill(locators.technicianname, "technicianname");
    await page.waitForTimeout(1000);
    await page.locator(locators.reset_btn).click();
    console.log('Step 6: Reset Button Click Sucessfully');
    //test edit 
    await page.locator(locators.edit_link).nth(0).click();
    await page.waitForTimeout(1000);
    Technician = await Generate_Variable('Technician.Technician_Name', async () => `Technician${await Generate_Unique_String()}`);
    Mobile = await Generate_Variable('Technician.Mobile', async () => `${await Generate_Random_Mobile_No()}`);
    Address = await Generate_Variable('Technician.Address', async () => `${await Generate_Unique_Address()}`);
    await add_technician_data(page, Technician, Mobile, Address);
    await page.waitForTimeout(500);
    await page.locator(locators.save_btn).click();
    console.log('Step 7: Technician Updated Sucessfully');
});

test('verify technician SAC', async ({ page }) => {
    let { Technician } = updatedVariables;
    let Technician_Name = Technician.Technician_Name;
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await page.waitForTimeout(1000);
    await selectsubmenu(page, "Transaction");
    console.log('Step 5: Sales Page Displayed');
    await page.waitForTimeout(1000);
    await page.locator(locators.ShreeAquaCare.save_btn).click();
    await selecttechnician(page, Technician_Name);
});

test('verify technician CashOnly Salse', async ({ page }) => {
    let { Technician } = updatedVariables;
    let Technician_Name = Technician.Technician_Name;
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "CashOnly"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await page.waitForTimeout(1000);
    await selectsubmenu(page, "Transaction");
    console.log('Step 5: Sales Page Displayed');
    await page.waitForTimeout(1000);
    await page.locator(locators.CashOnly.save_btn).click();
    await selecttechnician(page, Technician_Name);
});

test('verify technician Archie Enterprice', async ({ page }) => {
    let { Technician } = updatedVariables;
    let Technician_Name = Technician.Technician_Name;
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await page.waitForTimeout(1000);
    await page.locator(locators.Archie.Service).click();
    console.log("Service click");
    await page.locator(locators.Archie.Ticket).click();
    console.log("Ticket click");
    await page.locator(locators.Archie.Service_Add).click();
    console.log("add new Ticket click");
    await Archie_selecttechnician(page, Technician_Name);
});


test('verify technician Kishorbhai B Thakkar Salse', async ({ page }) => {
    let { Technician } = updatedVariables;
    let Technician_Name = Technician.Technician_Name;
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await page.waitForTimeout(1000);
    await page.locator(locators.Kishorbhai.sales_menu).click();
    console.log("sales click");
    await page.locator(locators.Kishorbhai.sales_gstsales).click();
    console.log("sales sumbmenu click");
    await expect(page.locator('li.breadcrumb-item.active', { hasText: 'Sales' })).toBeVisible();
    await page.waitForTimeout(500);
    await page.locator(locators.Kishorbhai.huf_add).click();
    await Kishorbhai_selecttechnician(page, Technician_Name);
});
