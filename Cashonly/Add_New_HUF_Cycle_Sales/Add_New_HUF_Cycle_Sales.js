const { test, expect } = require('@playwright/test');
const locators = require('./Add_New_HUF_Cycle_Sales.json');
const { Generate_Variable, Delete_Variable, Delete_All_Variables, List_Variables, Get_Current_Date_Time, Generate_Unique_String, Generate_Unique_Address, Generate_Random_Mobile_No } = require('../../Dynamic_Variables_Manage/Dynamic_Variable_Manage'); // Adjust the path as needed
const { escape } = require('querystring');
const { Console } = require('console');

let CashOnly_Net_Amount, CashOnly_Customer, CashOnly_Broker;
let CashOnly_Grid_Amount, CashOnly_Grid_Customer, CashOnly_Grid_Broker, CashOnly_Grid_Technician, CashOnly_Grid_HUF_Sales_Bill_No;
let HUF_CSLR_Cashonly_Satus, HUF_CSLR_Cashonly_Bill_No, HUF_CSLR_SAC_Satus, HUF_CSLR_SAC_Bill_No, HUF_CSLR_HUF_Satus, HUF_CSLR_HUF_Bill_No;
let SAC_Grid_Customer, SAC_Grid_HUF_Sales_Bill_No, SAC_Grid_Amount, SAC_Grid_Broker;
let HUF_Grid_Customer, HUF_Grid_HUF_Sales_Bill_No, HUF_Grid_Amount, HUF_Grid_Broker;

async function CashOnly_HUF_Sales(page) {
    await page.locator(locators.Sales_Main_Menu).click();
    console.log("Salse Main Menu click");
    await page.locator(locators.HUF_Cycle_CashOnly_Menu).click();
    console.log("Salse HUF Menu click");
}

async function Cashonly_Add_New_Click(page) {
    await page.locator(locators.HUF_Sales_CashOnly.Add_New).click();
    console.log("Add new click");
}

async function CashOnly_Add_HUF_Sales_Page_Verification(page) {
    let Var_Bill_No = await page.locator(locators.Add_HUF_Sales_CashOnly.Bill_No).isEditable();
    let Var_Payment_Type = await page.locator(locators.Add_HUF_Sales_CashOnly.Bill_No).isEditable();
    let Var_Invoice_Type = await page.locator(locators.Add_HUF_Sales_CashOnly.Bill_No).isEditable();
    let Var_Tax_Methode = await page.locator(locators.Add_HUF_Sales_CashOnly.Bill_No).isEditable();
    let Var_Mobile = await page.locator(locators.Add_HUF_Sales_CashOnly.Bill_No).isEditable();
    let Var_POS_No = await page.locator(locators.Add_HUF_Sales_CashOnly.Bill_No).isEditable();
    let Var_Net_Amount = await page.locator(locators.Add_HUF_Sales_CashOnly.Net_Amount).isEditable();
    console.log("=== Editable List ===");
    console.log("Bill no =", Var_Bill_No);
    console.log("Payment Type =", Var_Payment_Type);
    console.log("Invoice Type =", Var_Invoice_Type);
    console.log("Tax Method =", Var_Tax_Methode);
    console.log("Mobile =", Var_Mobile);
    console.log("POS No =", Var_POS_No);
    console.log("Net Amount =", Var_Net_Amount);
    let Var_Reset = await page.locator(locators.Add_HUF_Sales_CashOnly.Reset).isVisible();
    let Var_Close = await page.locator(locators.Add_HUF_Sales_CashOnly.Close).isVisible();
    let Var_Submit = await page.locator(locators.Add_HUF_Sales_CashOnly.Submit).isVisible();
    console.log("=== Button visible List ===");
    console.log("Reset =", Var_Reset);
    console.log("Close =", Var_Close);
    console.log("Submit =", Var_Submit);
}

// This finction for Cash only company Add new HUF Cycle sales
async function CashOnly_Add_New_HUF_Sales(page, Customer, Broker, Technician, Inventory_Group, Item, Qty, Round_Off, Add_Less) {
    console.log("=== add new HUF Sales  ===");
    if (Customer != null) {
        //Select Customer
        await page.locator(locators.Add_HUF_Sales_CashOnly.Customer_Class).click();
        await page.waitForTimeout(500);
        await page.fill(locators.Add_HUF_Sales_CashOnly.Input_Class, Customer);
        await page.locator('li.e-list-item', { hasText: Customer }).waitFor({ state: 'visible' });
        await page.locator('li.e-list-item', { hasText: Customer }).click();
        console.log("customer name =", Customer);
        CashOnly_Customer = Customer;
        await page.waitForTimeout(500);
        if (Broker != null) {
            await page.locator(locators.Add_HUF_Sales_CashOnly.Broker_Name_Class).click();
            await page.waitForTimeout(500);
            await page.fill(locators.Add_HUF_Sales_CashOnly.Input_Class, Broker);
            await page.locator('li.e-list-item', { hasText: Broker }).click();
            console.log("Broker name =", Broker);
            CashOnly_Broker = Broker;
            await page.waitForTimeout(500);
        }
        if (Technician != null) {
            await page.locator(locators.Add_HUF_Sales_CashOnly.Technician_Class).click();
            await page.waitForTimeout(500);
            await page.fill(locators.Add_HUF_Sales_CashOnly.Input_Class, Technician);
            await page.locator('li.e-list-item', { hasText: Technician }).click();
            console.log("Broker name =", Technician);
            await page.waitForTimeout(500);
        }
        await CashOnly_Inventory_Sales_Detail(page, Inventory_Group, Item, Qty);
        if (Round_Off != null) {
            await page.waitForTimeout(1000);
            await page.locator(locators.Add_HUF_Sales_CashOnly.Round_Off).click();
            console.log("Round off tbx click");
            await page.fill(locators.Add_HUF_Sales_CashOnly.Round_Off, Round_Off);
            console.log("Round Off =", Round_Off);
        }
        if (Add_Less != null) {
            await page.waitForTimeout(1000);
            await page.locator(locators.Add_HUF_Sales_CashOnly.Add_Less).click();
            console.log("Add/Less tbx click");
            await page.fill(locators.Add_HUF_Sales_CashOnly.Add_Less, Add_Less);
            console.log("Add/Less =", Add_Less);
        }
        await page.locator(locators.Add_HUF_Sales_CashOnly.Net_Amount).click();
        await page.waitForTimeout(500);
        let CashOnly_Net_Amount_Unfilter = await page.locator(locators.Add_HUF_Sales_CashOnly.Net_Amount).inputValue();
        CashOnly_Net_Amount = Remove_Custom_Value_From_Variable(CashOnly_Net_Amount_Unfilter, ",");
        await page.waitForTimeout(1000);
        await page.locator(locators.Add_HUF_Sales_CashOnly.Submit).click();
        console.log("Submt btn click");
        await page.waitForTimeout(1000);
    }
}

// This finction for Cash only company Add new HUF Cycle sales inventory Detail
async function CashOnly_Inventory_Sales_Detail(page, Inventory_Group, Item, Qty,) {
    console.log("=== add Sales Detail ===");
    await page.locator(locators.Add_HUF_Sales_CashOnly.Sales_Detail.Add).click();
    console.log("Add inventory btn click");
    if (Inventory_Group != null) {
        await page.locator(locators.Add_HUF_Sales_CashOnly.Sales_Detail.Inventory_Group_Class).click();
        await page.waitForTimeout(500);
        await page.locator('li.e-list-item', { hasText: Inventory_Group }).click();
        console.log("Inventory Group name =", Inventory_Group);
        await page.waitForTimeout(500);
        await page.locator(locators.Add_HUF_Sales_CashOnly.Sales_Detail.Item_TD).click();
        if (Item != null) {
            await page.locator(locators.Add_HUF_Sales_CashOnly.Sales_Detail.Item_Class).click();
            console.log("Item TD click");
            await page.waitForTimeout(500);
            await page.fill(locators.Add_HUF_Sales_CashOnly.Input_Class, Item);
            await page.locator('li.e-list-item', { hasText: Item }).click();
            console.log("Item name =", Item);
            await page.waitForTimeout(500);
        }
        if (Qty != null) {
            await page.locator(locators.Add_HUF_Sales_CashOnly.Sales_Detail.Qut).click();
            console.log("Qty TD click");
            await page.fill(locators.Add_HUF_Sales_CashOnly.Sales_Detail.Qty_ID, Qty);
            console.log("Qty =", Qty);
        }
        await Update_click(page);
    }
}

async function Update_click(page) {
    if (await page.locator(locators.Add_HUF_Sales_CashOnly.Sales_Detail.Update).isVisible()) {
        await page.locator(locators.Add_HUF_Sales_CashOnly.Sales_Detail.Update).click();
        console.log("Update btn click");
    }
    else if (await page.locator(locators.SAC.Add_New_HUF_Page.HUF_Cycle_Sales.Update).isVisible()) {
        await page.locator(locators.SAC.Add_New_HUF_Page.HUF_Cycle_Sales.Update).click();
        console.log("Update btn click");
    }
    await page.waitForTimeout(500);
    if (await page.locator(locators.Add_HUF_Sales_CashOnly.Sales_Detail.OK_Update_Popup).isVisible()) {
        await page.locator(locators.Add_HUF_Sales_CashOnly.Sales_Detail.OK_Update_Popup).click();
        console.log("Update Popup Ok btn click");
    }
}

async function CashOnly_HUF_Newly_Data_checkIn_Grid(page) {
    console.log("=== Cash Only HUF Grid ===");
    CashOnly_Grid_Customer = await page.locator(locators.HUF_Sales_CashOnly.Grid.Customer).textContent();
    CashOnly_Grid_HUF_Sales_Bill_No = await page.locator(locators.HUF_Sales_CashOnly.Grid.Regular_Bill_No).textContent();
    await page.waitForTimeout(1000);
    let CashOnly_Grid_Amount_Unfilter = await page.locator(locators.HUF_Sales_CashOnly.Grid.Net_Amount).textContent();
    CashOnly_Grid_Amount = Remove_Custom_Value_From_Variable(CashOnly_Grid_Amount_Unfilter, ",");
    CashOnly_Grid_Broker = await page.locator(locators.HUF_Sales_CashOnly.Grid.Broker_Name).textContent();
    await page.waitForTimeout(1000);
    console.log("Casonly Grid Data =", CashOnly_Grid_Customer, CashOnly_Grid_Amount, CashOnly_Grid_Broker, CashOnly_Grid_HUF_Sales_Bill_No);
    console.log("Cashonly Data = ", CashOnly_Customer, CashOnly_Net_Amount, CashOnly_Broker);
    if (CashOnly_Customer == CashOnly_Grid_Customer && CashOnly_Broker == CashOnly_Grid_Broker && CashOnly_Grid_Amount == CashOnly_Net_Amount) {
        await Generate_Variable('HUF_Sales_Cycle.CashOnly_Bill_No', async () => `${CashOnly_Grid_HUF_Sales_Bill_No}`);
        console.log("Cash Only HUF Sales added Successfuly & data visible in Grid & in jSON.");
    }
}

async function HUF_Cycle_Sales_Link_Report(page, Customer) {
    console.log("=== HUF Cycle Sales Link Report ===");
    await page.locator(locators.Reports).click();
    console.log("Report menu click");
    await page.waitForTimeout(500);
    await page.locator(locators.HUF_Cycle_Sales_Bill_Link_Report.Menu).click();
    console.log("HUF Cycle Bill Link menu click");
    await page.waitForTimeout(500);
    await page.locator(locators.HUF_Cycle_Sales_Bill_Link_Report.Filter_Btn).click();
    console.log("HUF Cycle Bill Filter btn click");
    if (Customer != null) {
        //Select Customer
        await page.locator(locators.Add_HUF_Sales_CashOnly.Customer_Class).click();
        await page.waitForTimeout(1000);
        await page.fill(locators.Add_HUF_Sales_CashOnly.Input_Class, Customer);
        await page.waitForTimeout(1000); // Allow dropdown to start loading
        await page.locator('li.e-list-item', { hasText: Customer }).click();
        console.log("customer name =", Customer);

        await page.locator(locators.HUF_Cycle_Sales_Bill_Link_Report.Search).click();
        console.log("HUF Cycle Bill Search btn click");
        await page.waitForTimeout(1500);
        HUF_CSLR_Cashonly_Satus = await page.locator(locators.HUF_Cycle_Sales_Bill_Link_Report.CashOnly_Status).textContent();
        HUF_CSLR_SAC_Satus = await page.locator(locators.HUF_Cycle_Sales_Bill_Link_Report.SAC_Status).textContent();
        HUF_CSLR_HUF_Satus = await page.locator(locators.HUF_Cycle_Sales_Bill_Link_Report.HUF_Status).textContent();

        HUF_CSLR_Cashonly_Bill_No = await page.locator(locators.HUF_Cycle_Sales_Bill_Link_Report.CashOnly_Bill_No).textContent();
        HUF_CSLR_SAC_Bill_No = await page.locator(locators.HUF_Cycle_Sales_Bill_Link_Report.SAC_Bill_No).textContent();
        HUF_CSLR_HUF_Bill_No = await page.locator(locators.HUF_Cycle_Sales_Bill_Link_Report.HUF_Bill_No).textContent();
        console.log("----------------------------");
        console.log("CashOnly Status =", HUF_CSLR_Cashonly_Satus);
        console.log("CashOnly Bill =", HUF_CSLR_Cashonly_Bill_No);
        console.log("----------------------------");
        console.log("SAC Status =", HUF_CSLR_SAC_Satus);
        console.log("SAC Bill =", HUF_CSLR_SAC_Bill_No);
        console.log("----------------------------");
        console.log("HUF Status =", HUF_CSLR_HUF_Satus);
        console.log("HUF Bill =", HUF_CSLR_HUF_Bill_No);
        console.log("----------------------------");
        let Grid_ID = locators.HUF_Cycle_Sales_Bill_Link_Report.Grid_ID;
        let CO_Bill_No = locators.HUF_Cycle_Sales_Bill_Link_Report.CashOnly_Bill_No;
        await page.waitForTimeout(1000);
        await Find_ValueIn_Column(page, Grid_ID, CO_Bill_No, HUF_CSLR_Cashonly_Bill_No, null);
    }
}

// button click on data find
async function Find_ValueIn_Column(page, Page_Grid_ID, ColumnSelector, searchValue, buttonXPath = null) {
    console.log("🔍 Searching for:", searchValue);
    let tableSelector = Page_Grid_ID;
    let previousFirstRowText = "";
    let isFirstPage = true;

    while (true) {
        try {
            await page.waitForSelector(`${tableSelector} tr`, { timeout: 5000 });
        } catch {
            console.log("⚠️ Table took too long to load.");
            return false;
        }

        let columnHandles = await page.locator(ColumnSelector).elementHandles();
        if (columnHandles.length === 0) {
            console.log("❌ Column not found!");
            return false;
        }

        let columnIndex = await page.evaluate(el => [...el.parentElement.children].indexOf(el), columnHandles[0]) + 1;
        console.log(`✅ Column index found: ${columnIndex}`);

        while (true) {
            let rows = await page.locator(`${tableSelector} tr`).all();
            if (rows.length === 0) {
                console.log("⚠️ No rows found on this page.");
                return false;
            }

            let currentFirstRowText = await rows[0].innerText();

            for (let row of rows) {
                let columnValueLocator = row.locator(`td:nth-child(${columnIndex})`);
                if (await columnValueLocator.count() > 0) {
                    let columnValue = await columnValueLocator.innerText();
                    let rowText = await row.innerText();

                    if (columnValue.includes(searchValue)) {
                        console.log(`✅ Found "${searchValue}" in row:`);
                        console.log(rowText);

                        // ✅ Click button if buttonXPath is provided
                        if (buttonXPath) {
                            let buttonLocator = row.locator(`xpath=${buttonXPath}`);
                            if (await buttonLocator.count() > 0) {
                                console.log("🖱️ Clicking the button in the found row...");
                                await buttonLocator.first().click();
                            } else {
                                console.log("❌ Button not found with XPath:", buttonXPath);
                            }
                        } else {
                            console.log("ℹ️ No button XPath provided. Skipping button click.");
                        }

                        return true;
                    }
                }
            }

            // ✅ Check pagination (same logic as before)
            let nextPageElement = await page.locator(".e-next").first();
            if (!(await nextPageElement.isVisible())) {
                console.log("⚠️ No next page button is visible.");
                return false;
            }

            let isNextDisabled = await nextPageElement.getAttribute('class');
            if (isNextDisabled.includes('e-disabled')) {
                console.log(`❌ Value "${searchValue}" not found in any page.`);
                return false;
            }

            if (currentFirstRowText === previousFirstRowText && !isFirstPage) {
                console.log("🚨 No new data loaded. Stopping pagination.");
                return false;
            }

            previousFirstRowText = currentFirstRowText;
            isFirstPage = false;
            console.log("➡️ Moving to next page...");
            await nextPageElement.click();
            await page.waitForTimeout(3000);
        }
    }
}

function Remove_Custom_Value_From_Variable(variables, charsToRemove) {
    if (!charsToRemove) {
        return variables; // No changes if nothing needs to be removed
    }
    let regex = new RegExp(`[${charsToRemove.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")}]`, "g");
    if (typeof variables === "number") {
        variables = variables.toString(); // Convert number to string
    }
    if (typeof variables === "string") {
        return variables.replace(regex, "");
    } else if (Array.isArray(variables)) {
        return variables.map(item =>
            typeof item === "number" ? item.toString().replace(regex, "") :
                typeof item === "string" ? item.replace(regex, "") :
                    item
        );
    } else {
        throw new TypeError("Expected an array, string, or number");
    }
}

async function SAC_HUF_Cycle_Menu(page) {
    await page.locator(locators.Sales_Main_Menu).click();
    console.log("Salse Main Menu click");
    await page.locator(locators.SAC.SAC_HUF_Cycle_Sales_Menu).click();
    console.log("Salse HUF Menu click");
}

async function SAC_Add_New_Sales_Btn(page) {
    await page.locator(locators.SAC.SAC_HUF_Cycle_Page.Add_New).click();
    console.log("Add new btn click");
}

async function SAC_Add_New_Sales_Page_Verification(page) {
    let Var_SAC_Customer = await page.locator(locators.SAC.Add_New_HUF_Page.Customer).isEditable();
    let Var_SAC_Bill_No = await page.locator(locators.SAC.Add_New_HUF_Page.Bill_No).isEditable();
    let Var_SAC_Date = await page.locator(locators.SAC.Add_New_HUF_Page.Customer).isEditable();
    let Var_SAC_Payment_Type = await page.locator(locators.SAC.Add_New_HUF_Page.Customer).isEditable();
    let Var_SAC_Invoice_Type = await page.locator(locators.SAC.Add_New_HUF_Page.Customer).isEditable();
    let Var_SAC_Tax_Method = await page.locator(locators.SAC.Add_New_HUF_Page.Customer).isEditable();
    let Var_SAC_Mobile = await page.locator(locators.SAC.Add_New_HUF_Page.Customer).isEditable();
    let Var_SAC_POS_No = await page.locator(locators.SAC.Add_New_HUF_Page.Customer).isEditable();
    let Var_SAC_Net_Amount = await page.locator(locators.SAC.Add_New_HUF_Page.Net_Amount).isEditable();

    console.log("=== SAC Add new Non Editable Fileds ===");
    console.log("Customer = ", Var_SAC_Customer);
    console.log("Bill_No = ", Var_SAC_Bill_No);
    console.log("Date = ", Var_SAC_Date);
    console.log("Payment Type = ", Var_SAC_Payment_Type);
    console.log("Invoice Type = ", Var_SAC_Invoice_Type);
    console.log("Tax Method = ", Var_SAC_Tax_Method);
    console.log("Mobile = ", Var_SAC_Mobile);
    console.log("POS No = ", Var_SAC_POS_No);
    console.log("Net Amount = ", Var_SAC_Net_Amount);

    let Var_SAC_GSTIN_No = await page.locator(locators.SAC.Add_New_HUF_Page.Customer).isEditable();
    let Var_SAC_State = await page.locator(locators.SAC.Add_New_HUF_Page.Customer).isEditable();
    let Var_SAC_Delivery_Address = await page.locator(locators.SAC.Add_New_HUF_Page.Customer).isEditable();
    console.log("GSTIN = ", Var_SAC_GSTIN_No);
    console.log("state = ", Var_SAC_State);
    console.log("Delivery Address = ", Var_SAC_Delivery_Address);

    console.log("=== SAC Add new buttons visibility ===");
    let Var_SAC_Reset = await page.locator(locators.SAC.Add_New_HUF_Page.Reset).isVisible();
    let Var_SAC_Close = await page.locator(locators.SAC.Add_New_HUF_Page.Close).isVisible();
    let Var_SAC_Submit = await page.locator(locators.SAC.Add_New_HUF_Page.Submit).isVisible();
    console.log("Reset = ", Var_SAC_Reset);
    console.log("Close = ", Var_SAC_Close);
    console.log("Submit = ", Var_SAC_Submit);
}

async function SAC_Add_New_Cycle_Sales(page, CashOnly_Sales_Bill_No, Inventory_Group, Item, Qty, Add_Less, Round_Off) {
    await page.waitForTimeout(500);
    console.log("=== SAC Add New Cycle Sales ===", CashOnly_Grid_HUF_Sales_Bill_No);
    if (CashOnly_Sales_Bill_No != null) {
        await page.locator(locators.SAC.Add_New_HUF_Page.Customer_Class).click();
        console.log("Customer tbx click");
        CashOnly_Customer = await page.locator(locators.SAC.Add_New_HUF_Page.Customer).inputValue();
        // Cashonly bill no  selection 
        await page.locator(locators.SAC.Add_New_HUF_Page.CashOnly_Sales_Bill_No_Class).click();
        await page.waitForTimeout(500);
        await page.fill(locators.Add_HUF_Sales_CashOnly.Input_Class, CashOnly_Sales_Bill_No);
        await page.locator('li.e-list-item', { hasText: CashOnly_Sales_Bill_No }).waitFor({ state: 'visible' });
        await page.locator('li.e-list-item', { hasText: CashOnly_Sales_Bill_No }).click();
        console.log("Cashonly sales bill no =", CashOnly_Sales_Bill_No);
        if (Inventory_Group != null) {
            await page.waitForTimeout(500);
            await page.locator(locators.SAC.Add_New_HUF_Page.HUF_Cycle_Sales.Add).click();
            console.log("Add Inventory btn click");
            await page.locator(locators.SAC.Add_New_HUF_Page.HUF_Cycle_Sales.Inventory_Group_Class).click();
            await page.waitForTimeout(500);
            await page.locator('li.e-list-item', { hasText: Inventory_Group }).click();
            console.log("Inventory Group =", Inventory_Group);
            await page.waitForTimeout(500);
            await page.locator(locators.SAC.Add_New_HUF_Page.HUF_Cycle_Sales.Item_ID).click();
            console.log("Item ID tbx click");
            if (Item != null) {
                await page.locator(locators.SAC.Add_New_HUF_Page.HUF_Cycle_Sales.Item_Class).click();
                await page.waitForTimeout(500);
                await page.fill(locators.Add_HUF_Sales_CashOnly.Input_Class, Item);
                await page.locator('li.e-list-item', { hasText: Item }).click();
                console.log("Cashonly sales bill no =", Item);
                if (Qty != null) {
                    await page.locator(locators.SAC.Add_New_HUF_Page.HUF_Cycle_Sales.Qty).click();
                    await page.waitForTimeout(500);
                    await page.fill(locators.SAC.Add_New_HUF_Page.HUF_Cycle_Sales.Qty_ID, Qty);
                    console.log("Qty =", Qty);
                    await page.locator(locators.SAC.Add_New_HUF_Page.HUF_Cycle_Sales.Gross_Rate).click();
                }
                await Update_click(page);
            }
            if (Add_Less != null) {
                await page.waitForTimeout(1000);
                await page.locator(locators.SAC.Add_New_HUF_Page.Add_Less).click();
                console.log("Add Less tbx click");
                await page.fill(locators.SAC.Add_New_HUF_Page.Add_Less, Add_Less);
                console.log("Add Less =", Add_Less);
            }
            if (Round_Off != null) {
                await page.waitForTimeout(1000);
                await page.locator(locators.SAC.Add_New_HUF_Page.Round_Off).click();
                console.log("Round Off tbx click");
                await page.fill(locators.SAC.Add_New_HUF_Page.Round_Off, Round_Off);
                console.log("Round Off =", Round_Off);
            }
            await page.locator(locators.SAC.Add_New_HUF_Page.Net_Amount).click();
            await page.waitForTimeout(500);
            CashOnly_Net_Amount = await page.locator(locators.SAC.Add_New_HUF_Page.Net_Amount).inputValue();
            CashOnly_Net_Amount = Remove_Custom_Value_From_Variable(CashOnly_Net_Amount, ",");
            await page.waitForTimeout(1000);
            await page.locator(locators.SAC.Add_New_HUF_Page.Submit).click();
            console.log("Submt btn click");
            await page.waitForTimeout(1000);
        }
    }
}

async function SAC_HUF_Cycle_Sales_Newly_Add_Data_In_Grid(page) {
    await page.waitForTimeout(1000);
    console.log("=== SAC Only HUF Grid ===");
    SAC_Grid_Customer = await page.locator(locators.SAC.SAC_HUF_Cycle_Page.Grid.Customer).textContent();
    SAC_Grid_HUF_Sales_Bill_No = await page.locator(locators.SAC.SAC_HUF_Cycle_Page.Grid.Regular_Bill_No).textContent();
    await page.waitForTimeout(1000);
    let SAC_Grid_Amount_Unfilter = await page.locator(locators.SAC.SAC_HUF_Cycle_Page.Grid.Net_Amount).textContent();
    SAC_Grid_Amount = Remove_Custom_Value_From_Variable(SAC_Grid_Amount_Unfilter, ",");
    SAC_Grid_Broker = await page.locator(locators.SAC.SAC_HUF_Cycle_Page.Grid.Broker_Name).textContent();
    await page.waitForTimeout(1000);
    console.log("SAC Grid Data =", SAC_Grid_Customer, SAC_Grid_Amount, SAC_Grid_Broker, SAC_Grid_HUF_Sales_Bill_No);
    console.log("SAC Data = ", CashOnly_Customer, CashOnly_Net_Amount);
    await Generate_Variable('HUF_Sales_Cycle.SAC_Bill_No', async () => `${SAC_Grid_HUF_Sales_Bill_No}`);
    // await Generate_Variable('HUF_Sales_Cycle.SAC_Customer_HUF', async () => `${SAC_Grid_Customer}`);
    console.log("SAC HUF Sales added Successfuly & data visible in Grid.");
}

async function HUF_Company_HUF_Cycle_Menu(page) {
    console.log("=== HUF Company  menu  ===");
    await page.locator(locators.Sales_Main_Menu).click();
    console.log("Salse Main Menu click");
    await page.locator(locators.HUF_Cycle_HUF_Menu).click();
    console.log("Salse HUF Menu click");
}

async function HUF_Add_New_Btn_click(page) {
    await page.locator(locators.HUF.HUF_HUF_Cycle_Page.Add_New).click();
    console.log("Add New btn Click");
}

async function Add_HUF_Company_HUF_Cycle_Sales(page, Customer, CashOnly_Bill_No, Item, Qty) {
    await page.waitForTimeout(1000);
    console.log("=== HUF Company HUF Cycle  ===");
    let HUF_Grid = locators.HUF.Add_HUF_Cycle_List_HUF.Grid;
    let Bill_No_HUF_Grid = locators.HUF.Add_HUF_Cycle_List_HUF.Bill_No;
    let HUF_Action = locators.HUF.Add_HUF_Cycle_List_HUF.Action_Link;
    Find_ValueIn_Column(page, HUF_Grid, Bill_No_HUF_Grid, CashOnly_Bill_No, HUF_Action);
    await page.waitForTimeout(1000);
    let Customer_HUF = await page.evaluate(() => {
        let el = document.querySelector('#HUFCycleSalesHUFCompanyEntryCustomerName');
        return el ? el.value : null;
    });
    let Item_HUF = await page.locator(locators.HUF.Add_HUF_Cycle_Sales_Register.HUF_Cycle_Sales_Detail.Item).textContent();
    let Qty_HUF = await page.locator(locators.HUF.Add_HUF_Cycle_Sales_Register.HUF_Cycle_Sales_Detail.Qty).textContent();
    console.log("Page data =", Customer_HUF, Item_HUF, Qty_HUF);
    console.log("Parameter =", Customer, Item, Qty)
    if (Customer == Customer_HUF || Item == Item_HUF && Qty == Qty_HUF) {
        console.log("Data matched");
        await page.locator(locators.HUF.Add_HUF_Cycle_Sales_Register.Submit).click();
        console.log("Submit btn Click.");
        await page.waitForTimeout(500);
        if (await page.locator(locators.HUF.Add_HUF_Cycle_Sales_Register.Ok_Submit).isVisible()) {
            await page.locator(locators.HUF.Add_HUF_Cycle_Sales_Register.Ok_Submit).click();
            console.log("Ok btn Click on popup.");
        }
        if (await page.locator(locators.HUF.Add_HUF_Cycle_Sales_Register.No_Invoice).isVisible()) {
            await page.locator(locators.HUF.Add_HUF_Cycle_Sales_Register.No_Invoice).click();
            console.log("No download invvoice btn Click on popup.");
        }
    }
}

async function HUF_Company_HUF_Cycle_Sales_Newly_Add_Data_In_Grid(page) {
    console.log("=== SAC Only HUF Grid ===");
    HUF_Grid_Customer = await page.locator(locators.HUF.HUF_HUF_Cycle_Page.Grid.Customer).textContent();
    HUF_Grid_HUF_Sales_Bill_No = await page.locator(locators.HUF.HUF_HUF_Cycle_Page.Grid.GST_Bill_No).textContent();
    await page.waitForTimeout(1000);
    let HUF_Grid_Amount_Unfilter = await page.locator(locators.HUF.HUF_HUF_Cycle_Page.Grid.Net_Amount).textContent();
    HUF_Grid_Amount = Remove_Custom_Value_From_Variable(HUF_Grid_Amount_Unfilter, ",");
    HUF_Grid_Broker = await page.locator(locators.HUF.HUF_HUF_Cycle_Page.Grid.Broker_Name).textContent();
    await page.waitForTimeout(1000);
    console.log("HUF Grid Data =", HUF_Grid_Customer, HUF_Grid_Amount, HUF_Grid_Broker, HUF_Grid_HUF_Sales_Bill_No);
    console.log("HUF Data = ", CashOnly_Customer, CashOnly_Net_Amount);
    await Generate_Variable('HUF_Sales_Cycle.HUF_Bill_No', async () => `${HUF_Grid_HUF_Sales_Bill_No}`);
    console.log("HUF COmpany HUF Sales added Successfuly & data visible in Grid.");
}

module.exports = {
    CashOnly_Add_HUF_Sales_Page_Verification, CashOnly_HUF_Sales, Cashonly_Add_New_Click, CashOnly_Inventory_Sales_Detail,
    CashOnly_Add_New_HUF_Sales, Update_click, CashOnly_HUF_Newly_Data_checkIn_Grid, HUF_Cycle_Sales_Link_Report, Remove_Custom_Value_From_Variable,
    SAC_HUF_Cycle_Menu, SAC_Add_New_Sales_Btn, SAC_Add_New_Sales_Page_Verification, SAC_Add_New_Cycle_Sales,
    SAC_HUF_Cycle_Sales_Newly_Add_Data_In_Grid, HUF_Add_New_Btn_click,
    HUF_Company_HUF_Cycle_Menu, Add_HUF_Company_HUF_Cycle_Sales, HUF_Company_HUF_Cycle_Sales_Newly_Add_Data_In_Grid
};