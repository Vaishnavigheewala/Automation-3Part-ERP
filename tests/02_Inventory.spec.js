const { test, expect } = require('@playwright/test');
const locators = require('../Pages/VerifyInventoryPage/inventory.json');
const fs = require('fs');
const path = require('path');


/******************Reusable functions imported***********************/
const { log_in, Variable_File_Path } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { addinroinventoryNONGSt, selectsubmenuinventory, verifyInventoryEntrySection
    , verifyFinishMaterial, verifyRawMaterial, verifyGeneral,
    verifyInventoryGrid, downloadPDF, addfinishmaterial, selectsubmenu2,
    checkinventoryPurchasepage, inventorystockreport, addinroinventory, checkinventoryProformasalespage,
    selectsubmenu1, checkinventorySalespage, checkinventorySalesReturnpage, checkinventoryPurchasereturnpage,
    checkinventoryAMcwithgstpage, checkinventoryserviceticketpage, checkinventoryamcinvoicepage, checkinventorydirecthufpage,
    checkinventoryhufpage, checkinventorysalescashpage, checkinventoryPurchasecashpage, updateinventory,
    addRawinroinventory, addRawinroinventoryNONGST, checkinventoryAMcwithgstpageforRaw, checkinventoryamcinvoicepageraw,
    checkinventoryserviceticketpageraw, inventorystockreportraw, updateinventoryforRaw, addinroinventorygeneral,
    addinroinventorygeneralwithoutdiscount, Checkinventorycreditnote, Checkinventorydebitnote, updateinventoryforGeneral } = require('../Pages/VerifyInventoryPage/inventory.js');
const { Generate_Variable, Delete_Variable, Delete_All_Variables, List_Variables, Get_Current_Date_Time, Generate_Unique_String, Generate_Unique_Address, Generate_Random_Mobile_No } = require('../Dynamic_Variables_Manage/Dynamic_Variable_Manage.js'); // Adjust the path as needed

// Define the file path for the variable storage
let filePath = Variable_File_Path();
let updatedVariables;
updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let Inventory_Name, InventoryRO_Name, update_inventory, Raw_inventory, NonGST_Raw_Inventory, UpdateRaw_Inventory, General_Inventory, NoDiscount_Inventory, Update_General, Finish_NonGst;
let Customer_Name = updatedVariables.Customer.Customer_Account_Name;
Inventory_Name = updatedVariables.Inventory.Inventory_Name;
InventoryRO_Name = updatedVariables.Inventory.InventoryRO_Name;
Raw_inventory = updatedVariables.Inventory.Raw_inventory;
NonGST_Raw_Inventory = updatedVariables.Inventory.NonGST_Raw_Inventory;
General_Inventory = updatedVariables.Inventory.General_Inventory;
NoDiscount_Inventory = updatedVariables.Inventory.NoDiscount_Inventory;
Finish_NonGst = updatedVariables.Inventory.Finish_NonGst;
test('verify Inventory page', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    await selectmenu(page, "Master"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await selectsubmenuinventory(page, "Master");
    console.log('Step 5: Inventory Page is Displayed');
    //verify inventory section
    await verifyInventoryEntrySection(page);
    console.log('Step:6 Inventory entry section is verified');

});

test('verify Inventory page for finish material', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Master"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await selectsubmenuinventory(page, "Master");
    console.log('Step 5: Inventory Page is Displayed');
    await verifyFinishMaterial(page);
    console.log('Step:6 finishmaterial is verified');

});

test('verify Inventory page for Raw material', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Master"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await selectsubmenuinventory(page, "Master");
    console.log('Step 5: Inventory Page is Displayed');

    await verifyRawMaterial(page);
    console.log('Step:6 Rawmaterial is verified');

});

test('verify Inventory page for General material', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Master"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await selectsubmenuinventory(page, "Master");
    console.log('Step 5: Inventory Page is Displayed');
    await verifyGeneral(page);
    console.log('Step:6 General is verified');
    await page.waitForTimeout(2000);
    await verifyInventoryGrid(page);
    console.log('Step:7 Grid  is verified');
    await page.waitForTimeout(2000);
    await downloadPDF(page);
    console.log('Step:8 pdf button  is verified');

});

test('Add finish material', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    Inventory_Name = await Generate_Variable('Inventory.Inventory_Name', async () => `${await Generate_Unique_String()}Finish`);
    await page.waitForTimeout(2000);
    await selectmenu(page, "Master"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await selectsubmenuinventory(page, "Master");
    console.log('Step 5: Inventory Page is Displayed');
    await addfinishmaterial(page, Inventory_Name);
    console.log('Step:6 inventory is added');

});



test('Add finish material as InRoProduct', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    InventoryRO_Name = await Generate_Variable('Inventory.InventoryRO_Name', async () => `${await Generate_Unique_String()}FinishRO`);
    await selectmenu(page, "Master"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await selectsubmenuinventory(page, "Master");
    console.log('Step 5: Inventory Page is Displayed');
    await addinroinventory(page, InventoryRO_Name);
    console.log('Step:6 inventory is added');

});

test('Add finish material as NONGst', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    Finish_NonGst = await Generate_Variable('Inventory.Finish_NonGst', async () => `${await Generate_Unique_String()}Finish_NonGst`);
    await selectmenu(page, "Master"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await selectsubmenuinventory(page, "Master");
    console.log('Step 5: Inventory Page is Displayed');
    await addinroinventoryNONGSt(page, Finish_NonGst);
    console.log('Step:6 inventory is added');

});

test('Inventory stock report', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await selectsubmenuinventory(page, "Reports");
    console.log('Step 5: Inventory stock report Page is Displayed');
    await inventorystockreport(page, InventoryRO_Name);
    console.log('Step:6 Inventory is verified');

});

test('SAC-Sales entry page inventory verification', async ({ page }) => {
    console.log("Inventory =", InventoryRO_Name);
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await selectsubmenu1(page, "Transaction");
    console.log('Step 5: Sales entry page inventory verification Page is Displayed');
    await checkinventorySalespage(page, Customer_Name, "ANKITBHAI", "FinishMaterial", InventoryRO_Name);
    console.log('Step 6: SAC-Sales return entry page inventory verification ');
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    await selectsubmenu2(page, "Transaction");
    console.log('Step 7 :Sales return entry page inventory verification Page is Displayed');
    await checkinventorySalesReturnpage(page, "FinishMaterial", InventoryRO_Name);
    console.log('Step 8: SAC-Proforma sales page inventory verification ');
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 9: Sucessfully Clicked on Transaction Menu');
    await checkinventoryProformasalespage(page, "FinishMaterial", InventoryRO_Name);
    console.log('Step 10:Sales return entry page inventory verification Page is Displayed');
    console.log('Step 11: SAC-Purchase page inventory verification ');
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 12: Sucessfully Clicked on Transaction Menu');
    await checkinventoryPurchasepage(page, "FinishMaterial", InventoryRO_Name);
    console.log('Step 13:Purchase entry page inventory verification Page is Displayed');
    console.log('Step 14: SAC-Purchase Return page inventory verification ');
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 15: Sucessfully Clicked on Transaction Menu');
    await checkinventoryPurchasereturnpage(page, "FinishMaterial", InventoryRO_Name);
    console.log('Step 16:Purchase return entry page inventory verification Page is Displayed');
    console.log('Step 17: SAC-AMC with GST page inventory verification ');
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 18: Sucessfully Clicked on Transaction Menu');
    await checkinventoryAMcwithgstpage(page, InventoryRO_Name)
    console.log('Step 19:AMC with GST entry page inventory verification Page is Displayed');


});

test('Archie- Service Ticket page inventory verification', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await checkinventoryserviceticketpage(page, InventoryRO_Name)
    console.log('Step 4:Service ticket entry page inventory verification Page is Displayed');
    console.log('Step 5:Archie- Amc invoice page inventory verification');
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 6: Sucessfully Clicked on Transaction Menu');
    await checkinventoryamcinvoicepage(page, InventoryRO_Name)
    console.log('Step 7:Amc invoice entry page inventory verification Page is Displayed');

});


test('KBT- direct HUF sale page inventory verification', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await checkinventorydirecthufpage(page, "FinishMaterial", InventoryRO_Name)
    console.log('Step 4:Amc invoice entry page inventory verification Page is Displayed');

});

test('Cashonly- HUF sale page inventory verification', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "CashOnly"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await checkinventoryhufpage(page, "FinishMaterial", InventoryRO_Name)
    console.log('Step 4:huf sale entry page inventory verification Page is Displayed');

});

test('SAC-AMC with GST page NON-GST inventory verification', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await checkinventoryAMcwithgstpage(page, Finish_NonGst)
    console.log('Step 4:AMC with GST entry page inventory verification Page is Displayed');

});

test('Archie- Service Ticket page NON GST inventory verification', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await checkinventoryserviceticketpage(page, Finish_NonGst)
    console.log('Step 4:Service ticket entry page inventory verification Page is Displayed');
    console.log('Step 5:Archie- Amc invoice page NON GST inventory verification');
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 6: Sucessfully Clicked on Transaction Menu');
    await checkinventoryamcinvoicepage(page, Finish_NonGst)
    console.log('Step 7:Amc invoice entry page inventory verification Page is Displayed');


});


test('Cash Only- Sales Register page NON GST inventory verification', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "CashOnly"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await checkinventorysalescashpage(page, "FinishMaterial", Finish_NonGst)
    console.log('Step 4:Sales Register page inventory verification Page is Displayed');
    console.log('Step 5:Cash Only- Purchase Register page NON GST inventory verification');
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 6: Sucessfully Clicked on Transaction Menu');
    await checkinventoryPurchasecashpage(page, "FinishMaterial", Finish_NonGst)
    console.log('Step 7:Sales Register page inventory verification Page is Displayed');

});


test('Edit finish material as InRoProduct', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    update_inventory = await Generate_Variable('Inventory.update_inventory', async () => `${await Generate_Unique_String()}UpdateINV`);
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Master"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await selectsubmenuinventory(page, "Master");
    console.log('Step 5: Inventory Page is Displayed');
    await updateinventory(page, update_inventory);
    console.log('Step:6 inventory is Updated');

});

//Raw material

test('Add Raw material', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    Raw_inventory = await Generate_Variable('Inventory.Raw_inventory', async () => `${await Generate_Unique_String()}RawINV`);
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Master"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await selectsubmenuinventory(page, "Master");
    console.log('Step 5: Inventory Page is Displayed');
    await addRawinroinventory(page, Raw_inventory);
    console.log('Step:6 inventory is added');

});

test('Add Raw material for non gst', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    NonGST_Raw_Inventory = await Generate_Variable('Inventory.NonGST_Raw_Inventory', async () => `${await Generate_Unique_String()}RawNoGST`);
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Master"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await selectsubmenuinventory(page, "Master");
    console.log('Step 5: Inventory Page is Displayed');
    await addRawinroinventoryNONGST(page, NonGST_Raw_Inventory);
    console.log('Step:6 inventory is added');

});


test('Inventory stock report for Raw Material', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Reports"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await selectsubmenuinventory(page, "Reports");
    console.log('Step 5: Inventory stock report Page is Displayed');
    await inventorystockreportraw(page, Raw_inventory);
    console.log('Step:6 Inventory is verified');


});


test('SAC-Sales entry page inventory verification for Raw Material', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await selectsubmenu1(page, "Transaction");
    console.log('Step 5:Sales entry page inventory verification Page is Displayed');
    await checkinventorySalespage(page, Customer_Name, "ANKITBHAI", "RawMaterial", Raw_inventory);
    console.log('Step 6:SAC-Sales return entry page inventory verification for Raw Material');
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 7: Sucessfully Clicked on Transaction Menu');
    await selectsubmenu2(page, "Transaction");
    console.log('Step 8:Sales return entry page inventory verification Page is Displayed');
    await checkinventorySalesReturnpage(page, "RawMaterial", Raw_inventory);
    console.log('Step 9:SAC-Proforma sales page inventory verification for Raw Material');
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 10: Sucessfully Clicked on Transaction Menu');
    await checkinventoryProformasalespage(page, "RawMaterial", Raw_inventory);
    console.log('Step 11:Sales return entry page inventory verification Page is Displayed');
    console.log('Step 12:SAC-Proforma sales page inventory verification for Raw Material');
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 13: Sucessfully Clicked on Transaction Menu');
    await checkinventoryPurchasepage(page, "RawMaterial", Raw_inventory);
    console.log('Step 14:Purchase entry page inventory verification Page is Displayed');
    console.log('Step 15:SAC-Purchase Return page inventory verification for Raw material');
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 16: Sucessfully Clicked on Transaction Menu');
    await checkinventoryPurchasereturnpage(page, "RawMaterial", Raw_inventory);
    console.log('Step 17:Purchase return entry page inventory verification Page is Displayed');
    console.log('Step 18:SAC-AMC with GST page inventory verification for Raw material');
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 19: Sucessfully Clicked on Transaction Menu');
    await checkinventoryAMcwithgstpageforRaw(page, Raw_inventory)
    console.log('Step 20:AMC with GST entry page inventory verification Page is Displayed');

});




test('Archie- Service Ticket page inventory verification for Raw material', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await checkinventoryserviceticketpageraw(page, Raw_inventory)
    console.log('Step 4:Service ticket entry page inventory verification Page is Displayed');
});

test('Archie- Amc invoice page inventory verification for Raw material', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await checkinventoryamcinvoicepageraw(page, Raw_inventory)
    console.log('Step 4:Amc invoice entry page inventory verification Page is Displayed');
});


test('Archie- Service Ticket page NON GST inventory verification for raw material', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await checkinventoryserviceticketpageraw(page, NonGST_Raw_Inventory)
    console.log('Step 4:Service ticket entry page inventory verification Page is Displayed');
});

test('Archie- Amc invoice page NON GST inventory verification for raw material', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await checkinventoryamcinvoicepageraw(page, NonGST_Raw_Inventory)
    console.log('Step 4:Amc invoice entry page inventory verification Page is Displayed');
});

test('Cash Only- Sales Register page NON GST inventory verification for Raw material', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "CashOnly"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await checkinventorysalescashpage(page, "RawMaterial", NonGST_Raw_Inventory)
    console.log('Step 4:Sales Register page inventory verification Page is Displayed');
});

test('Cash Only- Purchase Register page NON GST inventory verification for raw material', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "CashOnly"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await checkinventoryPurchasecashpage(page, "RawMaterial", NonGST_Raw_Inventory)
    console.log('Step 4:Sales Register page inventory verification Page is Displayed');
});

test('Edit Raw material ', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    UpdateRaw_Inventory = await Generate_Variable('Inventory.UpdateRaw_Inventory', async () => `${await Generate_Unique_String()}updateRaw`);
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Master"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await selectsubmenuinventory(page, "Master");
    console.log('Step 5: Inventory Page is Displayed');
    await updateinventoryforRaw(page, UpdateRaw_Inventory);
    console.log('Step:6 inventory is Updated');


});

//general material
test('Add general material', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    General_Inventory = await Generate_Variable('Inventory.General_Inventory', async () => `${await Generate_Unique_String()}GeneralINV`);
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Master"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await selectsubmenuinventory(page, "Master");
    console.log('Step 5: Inventory Page is Displayed');
    await addinroinventorygeneral(page, General_Inventory);
    console.log('Step:6 inventory is added');

});

test('Add general material without discount', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    NoDiscount_Inventory = await Generate_Variable('Inventory.NoDiscount_Inventory', async () => `${await Generate_Unique_String()}GeneralNoDis`);
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Master"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await selectsubmenuinventory(page, "Master");
    console.log('Step 5: Inventory Page is Displayed');
    await addinroinventorygeneralwithoutdiscount(page, NoDiscount_Inventory);
    console.log('Step:6 inventory is added');

});
test('SAC - Credit note general material verification', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await Checkinventorycreditnote(page, General_Inventory)
    console.log('Step 4:Credit Note page inventory verification Page is Displayed');
});

test('SAC - Debit note general material verification', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await Checkinventorydebitnote(page, General_Inventory)
    console.log('Step 4:Credit Note page inventory verification Page is Displayed');
});


test('Archie- Service Ticket pageNO-Special Discount inventory verification for general material', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await checkinventoryserviceticketpageraw(page, NoDiscount_Inventory)
    console.log('Step 4:Service ticket entry page inventory verification Page is Displayed');
});

test('Archie- Amc invoice page NO-Special Discount inventory verification for general material', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ArchieEnterprice"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Transaction"); // called selementmenu to select transaction menu
    console.log('Step 3: Sucessfully Clicked on Transaction Menu');
    await checkinventoryamcinvoicepageraw(page, NoDiscount_Inventory)
    console.log('Step 4:Amc invoice entry page inventory verification Page is Displayed');
});

test('Edit General material ', async ({ page }) => {

    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "ShreeAquaCare"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    Update_General = await Generate_Variable('Inventory.Update_General', async () => `${await Generate_Unique_String()}updateGeneral`);
    // await expect(page).toHaveURL('http://192.168.1.24:85/'); // Adding further assertions or actions after login
    await page.waitForTimeout(2000);
    await selectmenu(page, "Master"); // called selementmenu to select transaction menu
    console.log('Step 4: Sucessfully Clicked on Transaction Menu');
    await selectsubmenuinventory(page, "Master");
    console.log('Step 5: Inventory Page is Displayed');
    await updateinventoryforGeneral(page, Update_General);
    console.log('Step:6 inventory is Updated');


});
