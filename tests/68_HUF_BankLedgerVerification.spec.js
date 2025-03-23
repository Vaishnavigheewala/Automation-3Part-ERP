const { test, expect } = require('@playwright/test');
const locators = require('../Pages/Verify_Bank_Ledger_Page/Verify_Bank_Ledger_Page.json');
const fs = require('fs');

//     ******************Reusable functions imported***********************
const { log_in, Variable_File_Path } = require('../Pages/01Login/login.js');
const { selectmenu } = require('../Pages/02Dashboard/dashboard.js');
const { Search_User, PDF_Export, Add_Bank_Ledger, View_Bank_Ledger_link, Bank_Ledger_Menu, Verify_Add_Bank_Ledger_Page, Add_Bank_Ledger_For_User, Try_Para,
    Generate_Unique_String, Get_Current_Date_Time, Add_New_Click, Dublicate_Bill_Entry, Reset_Add_Bank_Ledger_Page, Payble_Reoprt_Vendor, Vendor_Account_Ledger_Report,
    Bank_Ledger_Report, Verify_Bank_Ledger_Page, Total_Receving_Amt, Select_Payment_Method, Bank_Ledger_Section_Data, Add_New_Bank_Ledger } = require('../Pages/Verify_Bank_Ledger_Page/Verify_Bank_Ledger_Page.js');

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Define the file path for the variable storage
let filePath = Variable_File_Path();
let updatedVariables, Customer_Name, D_Sales_Bill_No, D_Purchase_Bill_No, Vendor_Name, D_Total_Receving_Amt, D_Remain_Bill_Amt;
let Payment_Method, Bank_Name, Bank_Account_No, Cheque_No, Transaction_ID, Bank_Charges, Bill_Type;
// Reload fresh variables from the file
updatedVariables = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
Customer_Name = updatedVariables.Customer.Customer_Account_Name;
Vendor_Name = updatedVariables.Vendor.Vendor_Account_Name;
D_Sales_Bill_No = updatedVariables.Sales.Bill_No;
D_Purchase_Bill_No = updatedVariables.Purchase.Bill_No;
D_Total_Receving_Amt = updatedVariables.Bank_Ledger.Total_Receive_Amt;
D_Remain_Bill_Amt = updatedVariables.Bank_Ledger.Dublicate_Amt;
Payment_Method = updatedVariables.Bank_Ledger.Payment_Method;
Bank_Name = updatedVariables.Bank_Ledger.Bank_Name;
Bank_Account_No = updatedVariables.Bank_Ledger.Bank_Account_No
Cheque_No = updatedVariables.Bank_Ledger.Cheque_No;
Transaction_ID = updatedVariables.Bank_Ledger.Transaction_ID;
Bank_Charges = updatedVariables.Bank_Ledger.Bank_Charges;
Bill_Type = updatedVariables.Bank_Ledger.Bill_Type;


let customerName = updatedVariables.Customer.Customer_Account_Name;
let vendorName = updatedVariables.Vendor.Vendor_Account_Name; 


//console.log("Bank= ", Payment_Method, Bank_Name, Bank_Account_No, Cheque_No, Transaction_ID, Bank_Charges, Bill_Type);
test('Verify Bank Ledger Page', async ({ page }) => {
    console.log('Step 1: Login to Shree Aqua Care');
    await log_in(page, "Kishorbhai", "Testing", "KishorbhaiBThakkar"); // called login function
    console.log('Step 2: Dashboard Page displayed');
    await page.waitForTimeout(2000);
    // await expect(page).toHaveURL('http://192.168.29.112:88/');
    await selectmenu(page, "Transaction");
    await page.waitForTimeout(1000);
    await Bank_Ledger_Menu(page);
    console.log('Step 3: Sucessfully navigate to bankLedger.');
    await page.waitForTimeout(500);
    await Search_User(page, null, null, customerName, null);
    console.log('Step 4: Sucessfully Customer Search');
    await page.locator(locators.Reset).click();
    console.log('Step 5: Sucessfully Reset');
    await PDF_Export(page);
    console.log('Step 7: Sucessfully PDF Export');
    await Add_Bank_Ledger(page);
    console.log('Step 8: Sucessfully Add navigate N close');
    await View_Bank_Ledger_link(page);
    console.log('Step 9: Sucessfully view navigate N close');
    await Verify_Bank_Ledger_Page(page);
    console.log('Step 10 : Grid Verify');
    console.log("data", D_Purchase_Bill_No, D_Sales_Bill_No, D_Total_Receving_Amt, vendorName, customerName);
});
