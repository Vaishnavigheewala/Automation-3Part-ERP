const { test, expect } = require('@playwright/test');
const locators = require('../Pages/City/city.json');
const fs = require('fs');
const path = require('path');

/******************Reusable functions imported***********************/
const { log_in ,Variable_File_Path} = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { selectcityentry, Verifypage, validation, addNewCity, editCityRecord, selectareaentry, verifyCityInAreaDropdown, selectaccountentry, verifyCityInAccountDropdown, verifyCityNotInAreaDropdown, verifyCityNotInAccountDropdown } = require('../Pages/City/city.js');
const { Generate_Variable, Generate_Unique_String } = require('../Dynamic_Variables_Manage/Dynamic_Variable_Manage.js'); // Adjust the path as needed
/********************************************************************/

let filePath = Variable_File_Path();
let updatedVariables;
updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));



let City_Name;
let update_city;
//City_Name = updatedVariables.City.City_Name;


test.describe.configure({mode : "serial"});

test('Verify City Page and Create City', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    City_Name = await Generate_Variable('City.City_Name', async () => `aCity${await Generate_Unique_String()}`);


    await selectmenu(page, "Master"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Master Menu');
    await selectcityentry(page);
    console.log('Step 5: City Entry page is Displayed');
    await Verifypage(page ,City_Name);
    await page.waitForTimeout(6000);
    console.log('Step 6:Verify City Page.');
    await validation(page);
    console.log('Step 7: Check the validation');
    await addNewCity(page, City_Name, "Gujarat");
    console.log('Step 8: Selected state Name as - "Gujarat"');
    console.log('Step 9: Add the city');
    await page.waitForTimeout(5000);
    await selectmenu(page, "Master"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Master Menu');
    await selectareaentry(page);
    console.log('Step 5: area Entry page is Displayed');
    await verifyCityInAreaDropdown(page, "Gujarat", City_Name);   // Verify City in area Entry Dropdown
    console.log('Step 10: Verifying city in Area Entry dropdown');
    await selectmenu(page, "Master"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Master Menu');
    await selectaccountentry(page);
    console.log('Step 5: area Entry page is Displayed');
    await verifyCityInAccountDropdown(page, "Gujarat", City_Name);   // Verify City in area Entry Dropdown
    console.log('Step 10: Verifying city in Account Entry dropdown');


});

test('City Record Update', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    update_city = await Generate_Variable('City.update_city', async () => `aupdateCity${await Generate_Unique_String()}`);
    // // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Master"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Master Menu');
    await selectcityentry(page);
    console.log('Step 5: City Entry page is Displayed');
    fs.writeFileSync('Verifyvendor.json', JSON.stringify({ update_city }));
    await page.waitForTimeout(5000);
    await editCityRecord(page, update_city, "Gujarat");
    await page.waitForTimeout(1000)
    console.log('Step 6: Edit the city');
    await page.waitForTimeout(5000);
    await selectmenu(page, "Master"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Master Menu');
    await selectareaentry(page);
    console.log('Step 5: area Entry page is Displayed');
    await verifyCityNotInAreaDropdown(page, "Gujarat", update_city);   // Verify City in area Entry Dropdown
    console.log('Step 10: Verifying city in Area Entry dropdown');
    await selectmenu(page, "Master"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Master Menu');
    await selectaccountentry(page);
    console.log('Step 5: area Entry page is Displayed');
    await verifyCityNotInAccountDropdown(page, "GUJARAT", update_city);   // Verify City in area Entry Dropdown
    console.log('Step 10: Verifying city in Account Entry dropdown');

});





