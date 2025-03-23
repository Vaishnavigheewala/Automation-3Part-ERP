const { test, expect } = require('@playwright/test');
const locators = require('./Delete_Cash_Ledger.json');
const { selectmenu } = require('../../Pages/02Dashboard/dashboard.js');
const { Generate_Variable, Delete_Variable, Delete_All_Variables, List_Variables, Get_Current_Date_Time, Generate_Unique_String, Generate_Unique_Address, Generate_Random_Mobile_No } = require('../../Dynamic_Variables_Manage/Dynamic_Variable_Manage'); // Adjust the path as needed
const { escape } = require('querystring');
let Pop_UP_Msg;
let Outstanding_Grand_Total, Customer_Account_Ledger_Grand_Total;
let Cash_Ledger_Voucher_No;
let Bill_No, Bill_Amt, Net_Outstanding_Amt, Balance;

async function Sales_page_Navigation(page) {
    console.log("===Sales");
    await page.locator(locators.Sales_Page.Sales_Main_Menu).click();
    console.log("Sales Main Menu Clicked.");
    await page.locator(locators.Sales_Page.Sales_Page_Menu).click();
    console.log("Sales Sub Menu Clicked.");
}

async function Select_Customer(page, Customer) {
    if (Customer != null) {
        await page.locator(locators.Sales_Page.Customer_Class).click();
        //await page.waitForTimeout(300);
        await page.fill(locators.Sales_Page.Input_Class, Customer);
        await page.locator('li.e-list-item', { hasText: Customer }).click();
        //await page.waitForTimeout(600);
        console.log("Customer selected", Customer);
    }
    await page.waitForTimeout(1000);
    await page.locator(locators.Sales_Page.Search).click();
    console.log("Customer Searched");
    await page.waitForTimeout(1000);
}

async function Sales_Page_View_N_Edit(page) {
    console.log("===Sales");
    await page.locator(locators.Sales_Page.View_Link).nth(0).click();
    console.log("View Link Open");
    await page.waitForTimeout(1000);
    if (await page.locator(locators.Sales_Page.Edit).isVisible()) {
        await page.locator(locators.Sales_Page.Edit).click();
        console.log("Edit btn Link Open");
        await page.waitForTimeout(1500);
        let popupButton = page.locator(locators.Sales_Page.Ok_Close_Pop_Up);
        await page.waitForTimeout(1000);
        if (await page.locator(locators.Sales_Page.Sales_LedgerPopup_Header).isVisible()) {
            await popupButton.click();
            await page.waitForTimeout(500);

            console.log("Popup Close Btn Clicked");
        }
        else {
            console.log("Popup not open!!!");
        }
    }
    else {
        console.log("Edit Btn Not Fount!!");
    }
    await page.waitForTimeout(900);

}

async function Purchase_page_Navigation(page) {
    console.log("===Purchase");
    await page.locator(locators.Purchase.Purchase_Main_Menu).click();
    console.log("Purchase Main Menu Clicked.");
    await page.locator(locators.Purchase.Purchase_Page_Menu).click();
    console.log("Purchase Sub Menu Clicked.");
}

async function Select_Vendor(page, Vendor) {
    if (Vendor != null) {
        await page.locator(locators.Purchase.Vendor_Class).click();
        //await page.waitForTimeout(300);
        await page.fill(locators.Sales_Page.Input_Class, Vendor);
        await page.locator('li.e-list-item', { hasText: Vendor }).click();
        //await page.waitForTimeout(600);
        console.log("Vendor selected", Vendor);
    }
    await page.waitForTimeout(1000);
    await page.locator(locators.Purchase.Search).click();
    console.log("Customer Searched");
    await page.waitForTimeout(1000);
}

async function Purchase_Page_View_N_Edit(page) {
    console.log("===Purchase");
    await page.locator(locators.Purchase.View_Link).nth(0).click();
    console.log("View Link Open");
    await page.waitForTimeout(600);
    if (await page.locator(locators.Purchase.Edit).isVisible()) {
        await page.locator(locators.Purchase.Edit).click();
        console.log("Edit Link Open");
        await page.waitForTimeout(500);
        if (await page.locator(locators.Purchase.Ok_Close_Pop_Up).isVisible()) {
            await page.locator(locators.Purchase.Ok_Close_Pop_Up).click();
            console.log("Popup Close Btn Clicked");
        }
        else {
            console.log("!!! Edit Page Open cause Part Payment");
        }
    }
    else {
        console.log("Edit Btn Not Fount!!");
    }
}

async function Delete_Ledger_Menu_Click(page) {
    await page.locator(locators.Delete_Ledger.Delete_Ledger_Menu).click();
    console.log("Deleted Menu clicked ");
}

async function Delete_Ledger(page, Voucher_No) {
    console.log("=== Deleted Voucher No");
    await page.fill(locators.Delete_Ledger.Ledger_No_Tbx, Voucher_No);
    console.log("Voucher No Entered ", Voucher_No);
    await page.locator(locators.Delete_Ledger.Redio_Btn).scrollIntoViewIfNeeded();
      await page.locator(locators.Delete_Ledger.Redio_Btn).check({ force: true });
      await page.waitForTimeout(2000);
    console.log("Deleted Radio Button Filled.");
    await page.locator(locators.Delete_Ledger.Delete_Btn).click();
    console.log("Deleted Btn clicked ");
    await page.waitForTimeout(1000);
    if (await page.locator(locators.Delete_Ledger.Toast_Pop_Up).isVisible()) {
        Pop_UP_Msg = await page.locator(locators.Delete_Ledger.Toast_Pop_Up).textContent();
        console.log("Pop Up Message is '", Pop_UP_Msg, "'");
    }
}

async function Outstanding_Report_DL(page, Customer) {
    console.log("=======================================");
    console.log("Outstanding Report");
    console.log("=======================================");
    //await page.waitForTimeout(1000);
    //Open Outstanding Reports
    await page.locator(locators.Reports_Menu).click();
    console.log("Report Menu Click");
    await page.locator(locators.Outstanding_Reports.Outstanding_Report_Menu).click();
    console.log("Outstanding Report Click");
    //await page.waitForTimeout(1500);
    //Open side Bar 
    await page.locator(locators.Outstanding_Reports.Side_Bar).click();
    //await page.waitForTimeout(700);

    if (Customer != null) {
        // Customer Selction 
        // await page.waitForLoadState('networkidle'); // Waits until all network requests finish
        await page.locator(locators.Outstanding_Reports.Customer_Class).click();
        await page.fill(locators.Outstanding_Reports.Input_Class, Customer);
        await page.locator('li.e-list-item').filter({ hasText: Customer }).waitFor({ state: 'visible' });
        await page.locator('li.e-list-item', { hasText: Customer }).click();
        console.log("Outstanding Report Customer Selected = ", Customer);
    }
    //await page.waitForTimeout(700);
    // Search Button
    await page.locator(locators.Outstanding_Reports.Search).click();
    console.log("Outstanding Report's Search Btn Clicked.");
    await page.waitForTimeout(1000);

    await page.waitForSelector(`tr:has(td:has-text("${Customer}"))`, { timeout: 60000 }); // wait up to 60 seconds
    // Now locate the row and get the balance
    await page.locator(`tr:has(td:has-text("${Customer}"))`);
    Outstanding_Grand_Total = await page.locator('td.e-summarycell[data-cell="Balance"]').textContent();
    console.log(`Outstanding Report Overall Balance: ${Outstanding_Grand_Total}`);

    //await page.waitForTimeout(1000);
    // let tableSelector = locators.Outstanding_Reports.Grid_ID; // e.g. "#OutstandingReportGrid"
    // let columnXPath = "//th[@id='OutstandingReportRemainBalanceAmountColumn']";
    // await Find_ValueIn_Column(page, tableSelector, columnXPath, Balance_For_Report);
    /*
    if (await page.locator(locators.Outstanding_Reports.Bill_No).isVisible) {
        let Grid_Data = await page.locator(locators.Outstanding_Reports.Grid).textContent();
        console.log(Grid_Data);
        await Find_ValueIn_Column(page);
    }
    else {
        // let Bill = await page.locator(locators.Outstanding_Reports.Bill_No).textContent();
        console.log("Bill Fount !! Cause this is free ..");
    }*/

}

async function Find_ValueIn_Column(page, Page_Grid_ID, Column, searchValue) {
    console.log("🔍 Searching for:", searchValue);
    let tableSelector = Page_Grid_ID;
    let columnXPath = Column;

    let previousFirstRowText = ""; // Track first row’s content

    while (true) {
        // ✅ Step 1: Ensure the table is loaded
        await page.waitForSelector(`${tableSelector} tr`, { timeout: 5000 }).catch(() => console.log("⚠️ Table took too long to load."));

        // ✅ Step 2: Find the Column Index
        let columnHandles = await page.locator(`xpath=${columnXPath}`).elementHandles();
        if (columnHandles.length === 0) {
            console.log("❌ Column not found!");
            return false;
        }

        let columnIndex = await page.evaluate(el => [...el.parentElement.children].indexOf(el), columnHandles[0]) + 1;
        console.log(`✅ Column index found: ${columnIndex}`);

        // ✅ Step 3: Get all rows
        let rows = await page.locator(`${tableSelector} tr`).all();

        if (rows.length === 0) {
            console.log("⚠️ No rows found on this page.");
            return false;
        }

        let currentFirstRowText = await rows[0].innerText(); // Store first row text

        for (let row of rows) {
            let columnValueLocator = row.locator(`td:nth-child(${columnIndex})`);
            if (await columnValueLocator.count() > 0) {
                let columnValue = await columnValueLocator.innerText();
                if (columnValue.includes(searchValue)) {
                    console.log(`✅ Found "${searchValue}" in row:`, await row.innerText());
                    return true;
                }
            }
        }

        // ✅ Step 4: Check if there's a next page
        try {
            let nextPageElement = await page.locator("//div[contains(@class, 'e-next')]").first();

            if (!(await nextPageElement.isVisible())) {
                console.log("⚠️ No next page button is visible or all pages searched.");
                return false;
            }

            let isNextDisabled = await nextPageElement.getAttribute('class');
            if (isNextDisabled.includes('e-disabled')) {
                console.log(`❌ Value "${searchValue}" not found in any page.`);
                return false;
            }

            // 🛑 Stop if the first row’s text doesn’t change (to prevent infinite loop)
            if (currentFirstRowText === previousFirstRowText) {
                console.log("🚨 No new data loaded. Stopping pagination.");
                return false;
            }

            previousFirstRowText = currentFirstRowText; // Update first row’s text
            console.log("➡️ Moving to next page...");
            await nextPageElement.click();

            // ✅ Wait for new data to load
            await page.waitForTimeout(3000); // Short delay to allow data rendering

        } catch (error) {
            console.log("⚠️ Error while navigating pagination:", error.message);
            return false;
        }
    }
}

async function Customer_Account_Ledger_Report_DL(page, Customer, Voucher_No) {
    //await page.waitForTimeout(1000);
    console.log("=======================================");
    console.log("Customer Account Ledger Report");
    console.log("=======================================");
    await page.locator(locators.Reports_Menu).click();
    //await page.waitForTimeout(1000);
    console.log("Report Menu Clicked.");
    await page.locator(locators.Customer_Account_Ledger.Account_Ledger_Menu).click();
    console.log("Account Ledger Report Menu Clicked.");
    await page.locator(locators.Customer_Account_Ledger.Customer_Account_Menu).click();
    console.log("Customer Account Ledger Report Menu Clicked.");
    await page.locator(locators.Customer_Account_Ledger.Filter_Button).click();
    console.log("Inventory Stock Report Filter Btn Clicked.");
    //await page.waitForTimeout(1000);
    if (Customer != null) {
        await page.locator(locators.Customer_Account_Ledger.Customer_Class).click();
        await page.fill(locators.Customer_Account_Ledger.Input_Class, Customer);
        await page.locator('li.e-list-item', { hasText: Customer }).click();
        //await page.waitForTimeout(300);
        console.log("Customer Account Ledger Report Customer Selected = ", Customer);
    }
    // let now = new Date();
    // let formattedDate = now.toLocaleDateString('en-GB'); // DD/MM/YYYY format
    // let customDate = `30-01-2025 - ${formattedDate} `; // Use a different variable instead of 'Date'
    // console.log(customDate);
    //await page.waitForTimeout(800);
    // await page.fill(locators.Customer_Account_Ledger.Date_Filter, customDate);
    await page.waitForTimeout(1000);
    await page.locator(locators.Customer_Account_Ledger.Search).click();
    console.log("Search btn Click.");
    await page.waitForTimeout(1000);
    //await page.waitForTimeout(1000);
    await page.locator(locators.Customer_Account_Ledger.Bill_No_Column).dblclick();
    console.log("Bill no column Dblclick.");
    //await page.waitForTimeout(700);
    let Company_Name_Fetch = await page.locator(locators.Customer_Account_Ledger.Company_Name).textContent();
    // await page.waitForTimeout(2500);
    let Voucher_No_From_Grid = await page.locator(locators.Customer_Account_Ledger.Voucher_No).textContent();
    //await page.waitForTimeout(1500);
    console.log("Company Name = ", Company_Name_Fetch, " Bill No = ", Voucher_No_From_Grid);
    if (Company_Name_Fetch == "Archi Enterprice" && Voucher_No_From_Grid == Voucher_No) {
        console.log("Data found");
    }
    await page.waitForSelector(`tr:has(td:has-text("${Customer}"))`, { timeout: 60000 });
    await page.locator(`tr:has(td:has-text("${Customer}"))`);
    Customer_Account_Ledger_Grand_Total = await page.locator('td.e-summarycell[data-cell="Balance"]').textContent();
    console.log(`customer Ledger Report Overall Balance: ${Customer_Account_Ledger_Grand_Total}`);
    console.log(`Outstanding Report Overall Balance: ${Outstanding_Grand_Total}`);
    expect(parseFloat(Outstanding_Grand_Total)).toBe(parseFloat(Customer_Account_Ledger_Grand_Total));
    console.log('Consistency between Outstanding Report and Account Ledger verified successfully.');
    //await page.waitForTimeout(2000);
    await page.locator(locators.Customer_Account_Ledger.Date_Grid_TH).dblclick();
    console.log("Date TH click");
    //await page.waitForTimeout(3000);
    let tableSelector = locators.Customer_Account_Ledger.Grid_Table; // e.g. "#OutstandingReportGrid"
    let columnXPath = locators.Customer_Account_Ledger.Voucher_For_find;
    console.log("voucher no = ", Voucher_No);
    await Find_ValueIn_Column(page, tableSelector, columnXPath, Voucher_No);
}

async function Cash_Ledger_Report_DL(page, Customer, Vendor, Voucher_No) {
    console.log("=======================================");
    console.log("Cash Ledger Report");
    console.log("=======================================");
    //await page.waitForTimeout(1000);
    //Open Outstanding Reports
    await page.locator(locators.Reports_Menu).click();
    console.log("Report Menu Click");
    await page.locator(locators.Cash_Ledger_Report.Ledger_Menu).click();
    console.log("Ledger Menu Click");
    await page.locator(locators.Cash_Ledger_Report.Cash_Ledger_Menu).click();
    console.log("Cash Ledger Report Click");
    await page.waitForTimeout(1500);
    //Open side Bar 
    await page.locator(locators.Cash_Ledger_Report.Filter_Button).click();
    console.log("Filter Btn Click");
    await page.waitForTimeout(1000);
    if (Vendor != null) {
        await page.locator(locators.Cash_Ledger_Report.Payment_Nature).click();
        await page.locator('li.e-list-item', { hasText: "Payable" }).click();
        console.log("Payment Nature selected to payable");

        await page.locator(locators.Cash_Ledger_Report.Vendor_Class).click();
        await page.fill(locators.Cash_Ledger_Report.Input_Class, Vendor);
        await page.locator('li.e-list-item').filter({ hasText: Vendor }).waitFor({ state: 'visible' });
        await page.locator('li.e-list-item', { hasText: Vendor }).click();
        console.log("Cash Ledger Report Vendor Selected = ", Vendor);
    }

    if (Customer != null) {
        // Customer Selction 
        // await page.waitForLoadState('networkidle'); // Waits until all network requests finish
        await page.locator(locators.Cash_Ledger_Report.Customer_Class).click();
        await page.fill(locators.Cash_Ledger_Report.Input_Class, Customer);
        await page.locator('li.e-list-item').filter({ hasText: Customer }).waitFor({ state: 'visible' });
        await page.locator('li.e-list-item', { hasText: Customer }).click();
        console.log("Cash Ledger Report Customer Selected = ", Customer);
    }
    // Search Button
    await page.locator(locators.Cash_Ledger_Report.Search).click();
    console.log("Cash Ledger Report's Search Btn Clicked.");
    await page.waitForTimeout(1000);
    console.log("Voucher No =", Voucher_No);
    let tableSelector = locators.Cash_Ledger_Report.Cash_Ledger_Grid; // e.g. "#OutstandingReportGrid"
    let columnXPath = locators.Cash_Ledger_Report.Voucher_No_Column;
    await Find_ValueIn_Column(page, tableSelector, columnXPath, Voucher_No);

}

async function Payble_Reoprt_Vendor_DL(page, Vendor, Date_PR, Bill_No) {
    await page.locator(locators.Reports).click();
    console.log("Reports menu Click");
    await page.locator(locators.Payable_Report.Payable_Report_Menu).click();
    console.log("Payable Report menu Click");
    await page.waitForTimeout(200);
    await page.locator(locators.Payable_Report.Filter_Side_Bar).click();
    await page.waitForTimeout(400);
    if (Vendor != null) {
        await page.locator(locators.Payable_Report.Filter_Class).click();
        await page.waitForTimeout(200);
        await page.fill(locators.Payable_Report.Filter_Input, Vendor);
        await page.locator('li.e-list-item', { hasText: Vendor }).click();
        await page.waitForTimeout(1000);
        console.log("Vendor Selected");
    }
    if (Date_PR != null) {
        const datepicker = '#PayableReportDatePickerForFilter'; //code to clear the date
        await page.fill(datepicker, Date_PR); //code to enter current data   
    }
    await page.locator(locators.Payable_Report.Search).click();
    console.log("Payable Report User Data Searched");
    await page.waitForTimeout(2000);
    let tableSelector = locators.Payable_Report.Payable_Report_Grid; // e.g. "#OutstandingReportGrid"
    let columnXPath = locators.Payable_Report.Bill_No;
    await Find_ValueIn_Column(page, tableSelector, columnXPath, Bill_No);
}

async function Vendor_Account_Ledger_Report_DL(page, Vendor, Date_VA, Voucher_No) {
    await page.locator(locators.Reports).click();
    console.log("Reports menu Click");
    await page.locator(locators.Vendor_Account_Ledger_Report.Accountledger).click();
    console.log("Account Ledger menu Click");
    await page.waitForTimeout(400);
    await page.locator(locators.Vendor_Account_Ledger_Report.Vendor_Account_Ledger_Menu).click();
    console.log("Vendor Account Ledger menu Click");
    await page.waitForTimeout(400);
    await page.locator(locators.Vendor_Account_Ledger_Report.Filter_Side_Bar).click();
    await page.waitForTimeout(200);
    if (Vendor != null) {
        await page.locator(locators.Vendor_Account_Ledger_Report.Filter_Class).click();
        await page.fill(locators.Vendor_Account_Ledger_Report.Filter_Input, Vendor);
        await page.locator('li.e-list-item', { hasText: Vendor }).click();
        await page.waitForTimeout(1000);
    }
    if (Date_VA != null) {
        const datepicker = '#VendorAccountLedgerReportDatePickerForFilter'; //code to clear the date
        await page.fill(datepicker, Date_VA); //code to enter current data   
    }
    await page.locator(locators.Vendor_Account_Ledger_Report.Search).click();
    await page.waitForTimeout(2000);
    console.log("Vendor Account Ledger User Data Searched");
    console.log("Voucher No =", Voucher_No);
    let tableSelector = locators.Vendor_Account_Ledger_Report.Vendor_Account_Ledger_Grid; // e.g. "#OutstandingReportGrid"
    let columnXPath = locators.Vendor_Account_Ledger_Report.Voucher_No_Column;
    await Find_ValueIn_Column(page, tableSelector, columnXPath, Voucher_No);
}

async function Cash_Ledger_Navigation(page) {
    await page.locator(locators.Ledger_Menu).click();
    console.log("Ledger Menu click");
    await page.locator(locators.Cash_Ledger_Menu).click();
    console.log("Cash Ledger Menu click");
}

async function Bank_Ledger_Navigation(page) {
    await page.locator(locators.Ledger_Menu).click();
    console.log("Ledger Menu click");
    await page.locator(locators.Bank_Ledger_Menu).click();
    console.log("Bank Ledger Menu click");
}

async function Getting_Voucher_No_From_Cash_Ledger_Grid(page, Customer, Vendor) {
    await page.waitForTimeout(1000);
    if (Vendor != null) {
        // Account Group selection
        await page.locator(locators.Cash_Ledger_Grid.Account_Group).click();
        await page.locator('li.e-list-item', { hasText: "Vendor" }).click();
        console.log("Account Group slect to Vendor");
        // Vendor selection
        await page.locator(locators.Cash_Ledger_Grid.Vendor_Class).click();
        await page.fill(locators.Cash_Ledger_Report.Input_Class, Vendor);
        await page.locator('li.e-list-item').filter({ hasText: Vendor }).waitFor({ state: 'visible' });
        await page.locator('li.e-list-item', { hasText: Vendor }).click();
        console.log("Cash Ledger Report Vendor Selected = ", Vendor);
    }
    if (Customer != null) {
        // Customer Selction 
        await page.locator(locators.Cash_Ledger_Grid.Customer_Class).click();
        await page.fill(locators.Cash_Ledger_Report.Input_Class, Customer);
        await page.locator('li.e-list-item').filter({ hasText: Customer }).waitFor({ state: 'visible' });
        await page.locator('li.e-list-item', { hasText: Customer }).click();
        console.log("Cash Ledger Report Customer Selected = ", Customer);
    }
    await page.locator(locators.Cash_Ledger_Grid.Search).click();
    await page.waitForTimeout(2000);

    Cash_Ledger_Voucher_No = await page.locator(locators.Cash_Ledger_Grid.Voucher_No).nth(0).textContent();
    if (Cash_Ledger_Voucher_No != null) {
        await Generate_Variable('HUF_Company.Delete_Ledger.Voucher_No', async () => `${Cash_Ledger_Voucher_No}`);
        console.log("voucher No for Delete Ledger stored in Dynamic.JSON !!");
    }
    Bill_No = await page.locator(locators.Cash_Ledger_Grid.Bill_No).nth(0).textContent();
    // Trim and replace newline characters or extra spaces with a comma
    Bill_No = Bill_No.trim().replace(/\s+/g, ',');
    // Split the bill numbers by comma
    let billNumbers = Bill_No.split(',');
    // Remove empty values (in case of extra commas)
    billNumbers = billNumbers.filter(bill => bill.trim() !== '');
    // Check if there are multiple bill numbers
    if (billNumbers.length > 1) {
        console.log(`Multiple bill numbers detected: ${billNumbers.join(', ')}`, "Bill No =", Bill_No);
        await page.locator(locators.Cash_Ledger_Grid.View_Link).nth(0).click();
        console.log("View Link Open");
    } else {
        console.log(`Single bill number detected: ${billNumbers[0]}`);
    }
    console.log("Voucher No =", Cash_Ledger_Voucher_No);
}

async function Delete_Multiple_Bill_No_From_Ledger(page) {
    await page.waitForTimeout(1000);
    await page.locator(locators.cash_Ledger_Edit.Edit).click();
    console.log("Edit btn Click");
    await page.waitForTimeout(1000);
    Bill_No = await page.locator(locators.cash_Ledger_Edit.Bill_No).nth(0).textContent();
    Bill_Amt = await page.locator(locators.cash_Ledger_Edit.Bill_Amt).nth(0).textContent();
    Net_Outstanding_Amt = await page.locator(locators.cash_Ledger_Edit.Net_Outstanding_Amt).nth(0).textContent();
    await page.locator(locators.cash_Ledger_Edit.Balance).nth(0).click();
    console.log("Balacnce btn Click");
    Balance = await page.locator(locators.cash_Ledger_Edit.Balance).nth(0).textContent();
    console.log("Values of edit ledger page", Bill_Amt, "Net amt", Net_Outstanding_Amt, "Balance", Balance);
    if (parseInt(Balance) == 0) {
        await page.locator(locators.cash_Ledger_Edit.Balance).nth(0).click();
        console.log("Balacne for delete Click");
        if (await page.locator(locators.cash_Ledger_Edit.Ok_Pop_Up).isVisible()) {
            await page.locator(locators.cash_Ledger_Edit.Ok_Pop_Up).click();
            console.log("Ok btn Popup Click for delete");
        }
        await page.locator(locators.cash_Ledger_Edit.Balance).nth(0).click();
        console.log("Balacne Click");
        await page.waitForTimeout(1000);
        await page.locator(locators.cash_Ledger_Edit.Delete).click();
        console.log("Delete btn Click");
        await page.locator(locators.cash_Ledger_Edit.Update).click();
        console.log("Update btn Click");
        await page.waitForTimeout(1000);
        if (await page.locator(locators.cash_Ledger_Edit.Ok_Pop_Up).isVisible()) {
            await page.locator(locators.cash_Ledger_Edit.Ok_Pop_Up).click();
            console.log("Ok btn Popup  Click After DeleteF");
        }
    }
    else {
        console.log("first Bill no is part payment.");
        Bill_No = await page.locator(locators.cash_Ledger_Edit.Bill_No).nth(1).textContent();
        Bill_Amt = await page.locator(locators.cash_Ledger_Edit.Bill_Amt).nth(1).textContent();
        Net_Outstanding_Amt = await page.locator(locators.cash_Ledger_Edit.Net_Outstanding_Amt).nth(1).textContent();
        Balance = await page.locator(locators.cash_Ledger_Edit.Bill_No).nth(1).click();
        Balance = await page.locator(locators.cash_Ledger_Edit.Balance).nth(1).textContent();
        console.log("Values of edit ledger page", Bill_Amt, "Net amt", Net_Outstanding_Amt, "Balance", Balance);
        if (parseInt(Balance) == 0) {
            await page.locator(locators.cash_Ledger_Edit.Balance).nth(1).click();
            console.log("Balacne for delete Click");
            if (await page.locator(locators.cash_Ledger_Edit.Ok_Pop_Up).isVisible()) {
                await page.locator(locators.cash_Ledger_Edit.Ok_Pop_Up).click();
                console.log("Ok btn Popup Click for delete");
            }
            await page.locator(locators.cash_Ledger_Edit.Balance).nth(0).click();
            console.log("Balacne Click");
            await page.waitForTimeout(1000);
            await page.locator(locators.cash_Ledger_Edit.Delete).click();
            console.log("Delete btn Click");
            await page.locator(locators.cash_Ledger_Edit.Update).click();
            console.log("Update btn Click");
            await page.waitForTimeout(1000);
            if (await page.locator(locators.cash_Ledger_Edit.Ok_Pop_Up).isVisible()) {
                await page.locator(locators.cash_Ledger_Edit.Ok_Pop_Up).click();
                console.log("Ok btn Popup Click After Delete");
            }
        }
    }
    await page.waitForTimeout(2000);
}

async function First_Try_Delete_Multiple_Bill(page, Customer, Vendor) {
    await page.waitForTimeout(1000);
    if (Vendor != null) {
        // Account Group selection
        await page.locator(locators.Cash_Ledger_Grid.Account_Group).click();
        await page.locator('li.e-list-item', { hasText: "Vendor" }).click();
        console.log("Account Group slect to Vendor");
        // Vendor selection
        await page.locator(locators.Cash_Ledger_Grid.Vendor_Class).click();
        await page.fill(locators.Cash_Ledger_Report.Input_Class, Vendor);
        await page.locator('li.e-list-item').filter({ hasText: Vendor }).waitFor({ state: 'visible' });
        await page.locator('li.e-list-item', { hasText: Vendor }).click();
        console.log("Cash Ledger Report Vendor Selected = ", Vendor);
    }
    if (Customer != null) {
        // Customer Selction 
        await page.locator(locators.Cash_Ledger_Grid.Customer_Class).click();
        await page.fill(locators.Cash_Ledger_Report.Input_Class, Customer);
        await page.locator('li.e-list-item').filter({ hasText: Customer }).waitFor({ state: 'visible' });
        await page.locator('li.e-list-item', { hasText: Customer }).click();
        console.log("Cash Ledger Report Customer Selected = ", Customer);
    }
    await page.locator(locators.Cash_Ledger_Grid.Search).click();
    console.log("Search Btn Click.");
    await page.waitForTimeout(1000);
    // Cash_Ledger_Voucher_No = await page.locator(locators.Cash_Ledger_Grid.Voucher_No).textContent();
    // Bill_No = await page.locator(locators.Cash_Ledger_Grid.Bill_No).textContent();
    let Bill_NO_Column = locators.Cash_Ledger_Grid.Bill_No;
    let Voucher_NO_Column = locators.Cash_Ledger_Grid.Voucher_No;
    let { firstMultiBillNumber, firstMultiVoucherNumber } = await Get_First_Multiple_Bill_And_Voucher_Number(page, Bill_NO_Column, Voucher_NO_Column);
    console.log("First Multiple bill & Voucher no.= ", firstMultiBillNumber, firstMultiVoucherNumber);
    await selectmenu(page, "Delete");
    await Delete_Ledger_Menu_Click(page);
    await Delete_Ledger(page, firstMultiVoucherNumber);
}

async function Get_First_Multiple_Bill_And_Voucher_Number(page, billLocator, voucherLocator) {
    let firstMultiBillNumber = null;
    let firstMultiVoucherNumber = null;

    // Wait for table data to be available
    await page.waitForSelector(billLocator, { state: "visible" }).catch(() => console.log("Bill locator not found!"));
    await page.waitForSelector(voucherLocator, { state: "visible" }).catch(() => console.log("Voucher locator not found!"));

    // Get number of rows
    let rowCount = Math.min(await page.locator(billLocator).count(), await page.locator(voucherLocator).count());
    console.log("Total Rows Found:", rowCount);

    for (let i = 0; i < rowCount; i++) {
        let billElement = page.locator(billLocator).nth(i);
        let voucherElement = page.locator(voucherLocator).nth(i);

        let billText = await billElement.textContent();
        let voucherText = await voucherElement.textContent();

        console.log(`Row ${i + 1} - Bill No:`, billText);
        console.log(`Row ${i + 1} - Voucher No:`, voucherText);

        // Check if the bill contains multiple values (separated by ',')
        if (billText && billText.includes(",")) {
            firstMultiBillNumber = billText.trim();
            firstMultiVoucherNumber = voucherText ? voucherText.trim() : null;
            break; // Stop after finding the first row with multiple bills
        }
    }

    console.log("First Multiple Bill No:", firstMultiBillNumber);
    console.log("First Multiple Voucher No:", firstMultiVoucherNumber);

    return { firstMultiBillNumber, firstMultiVoucherNumber };
}

async function Get_First_Single_Bill_And_Voucher_Number(page, billLocator, voucherLocator) {
    let firstSingleBillNumber = null;
    let firstSingleVoucherNumber = null;

    // Wait for table data to be available
    await page.waitForSelector(billLocator, { state: "visible" }).catch(() => console.log("Bill locator not found!"));
    await page.waitForSelector(voucherLocator, { state: "visible" }).catch(() => console.log("Voucher locator not found!"));

    // Get number of rows
    let rowCount = Math.min(await page.locator(billLocator).count(), await page.locator(voucherLocator).count());
    console.log("Total Rows Found:", rowCount);

    for (let i = 0; i < rowCount; i++) {
        let billElement = page.locator(billLocator).nth(i);
        let voucherElement = page.locator(voucherLocator).nth(i);

        let billText = await billElement.textContent();
        let voucherText = await voucherElement.textContent();

        console.log(`Row ${i + 1} - Bill No:`, billText);
        console.log(`Row ${i + 1} - Voucher No:`, voucherText);

        // Check if the bill contains only a single value (does NOT contain ',')
        if (billText && !billText.includes(",")) {
            firstSingleBillNumber = billText.trim();
            firstSingleVoucherNumber = voucherText ? voucherText.trim() : null;
            break; // Stop after finding the first row with a single bill
        }
    }

    console.log("First Single Bill No:", firstSingleBillNumber);
    console.log("First Single Voucher No:", firstSingleVoucherNumber);

    return { firstSingleBillNumber, firstSingleVoucherNumber };
}

// let { firstSingleBillNumber, firstSingleVoucherNumber } = 
//     await Get_First_Single_Bill_And_Voucher_Number(page, billLocator, voucherLocator);

// console.log("First Single Bill Number:", firstSingleBillNumber);
// console.log("First Single Voucher Number:", firstSingleVoucherNumber);


module.exports = {
    Sales_page_Navigation, Sales_Page_View_N_Edit, Select_Customer, Purchase_page_Navigation, Select_Vendor,
    Delete_Ledger_Menu_Click, Purchase_Page_View_N_Edit, Delete_Ledger, Outstanding_Report_DL, Customer_Account_Ledger_Report_DL,
    Cash_Ledger_Report_DL, Payble_Reoprt_Vendor_DL, Vendor_Account_Ledger_Report_DL,
    Delete_Multiple_Bill_No_From_Ledger, Getting_Voucher_No_From_Cash_Ledger_Grid, Cash_Ledger_Navigation,
    Bank_Ledger_Navigation, First_Try_Delete_Multiple_Bill
};