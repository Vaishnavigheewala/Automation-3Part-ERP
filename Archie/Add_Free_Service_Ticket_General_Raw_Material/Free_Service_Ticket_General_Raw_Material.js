const { test, expect } = require('@playwright/test');
const locators = require('./Free_Service_Ticket_General_Raw_Material.json');
const { loadEnvFile } = require('process');

let Service_Ticket_No;
let Date_find;
async function Open_Add_Account_Link(page) {
    await page.waitForTimeout(500);
    await page.locator(locators.Service_Entry.Add_Account).click();
    console.log("Add new Account Link open");
}

async function Service_Ticket_Page(page) {
    await page.waitForTimeout(500);
    await page.locator(locators.Service_Ticket_Page.Service_Menu).click();
    await page.locator(locators.Service_Ticket_Page.Service_Ticket_Menu).click();
    await page.waitForTimeout(500);
    console.log("Service Ticket menu clicked");
}

async function Add_New_Service_Ticket(page) {
    await page.waitForTimeout(500);
    await page.locator(locators.Service_Ticket_Page.Add_New).click();
    console.log("Add new Service Ticket Btn Clicked");
}

async function AddUser(page, User, GST_No, Client_Code, Email, Name, Mobile, Alter_mobile, Pincode, Address, State, City, Area) {
    console.log("==========================================================");
    console.log("Add customer Work Flow");
    console.log("==========================================================");
    if (User != null) {
        await page.locator(locators.Entry_Edit.Account_Group_SpanClass).waitFor({ state: 'visible' });
        await page.locator(locators.Entry_Edit.Account_Group_SpanClass).click();
        await page.locator(locators.Entry_Edit.Account_Group_Input, User);
        await page.locator('li.e-list-item', { hasText: User }).waitFor({ state: 'visible' });
        await page.waitForTimeout(1000);
        await page.locator('li.e-list-item', { hasText: User }).click();
        console.log("User Selected = ", User);
    }
    if (GST_No != null) {
        await page.fill(locators.Entry_Edit.GSTIN_No, GST_No);
        console.log("GST No fill = ", GST_No);
    }
    if (Client_Code != null) {
        await page.fill(locators.Entry_Edit.Client_Code, Client_Code);
        console.log("Client Code fill = ", Client_Code);
    }
    if (Email != null) {
        await page.fill(locators.Entry_Edit.Email, Email);
        console.log("Email fill = ", Email);
        await page.waitForTimeout(500);
    }
    if (Name != null) {
        await page.fill(locators.Entry_Edit.Account_Name, Name);
        console.log("Name fill = ", Name);
        await page.waitForTimeout(500);
    }
    if (Mobile != null) {
        await page.fill(locators.Entry_Edit.Mobile, Mobile);
        console.log("Mobile fill = ", Mobile);
        await page.waitForTimeout(500);
    }
    if (Alter_mobile != null) {
        await page.fill(locators.Entry_Edit.Alternate_Mobile, Alter_mobile);
        console.log("Alter Mobile fill = ", Alter_mobile);
    }
    if (Pincode != null) {

        await page.fill(locators.Entry_Edit.Pincode, Pincode);
        console.log("Pincode = ", Pincode);
        await page.waitForTimeout(500);
    }
    if (Address != null) {
        await page.fill(locators.Entry_Edit.Address, Address);
        console.log("Address fill = ", Address);
        await page.waitForTimeout(500);
    }

    if (State != null) {
        // +++++++++++++++ Stale Selection +++++++++++++++++
        await page.locator(locators.Entry_Edit.State_SpanClass).click();
        await page.waitForTimeout(1000);
        await page.fill(locators.Entry_Edit.State_Input, State);
        await page.waitForTimeout(1000);
        await page.locator('li.e-list-item', { hasText: State }).click();
        console.log("State Selected = ", State);
        //await page.waitForTimeout(5000);   
    }
    // +++++++++++++++ City Selection +++++++++++++++++
    if (City != null) {
        await page.locator(locators.Entry_Edit.City_SpanClass).click();
        await page.waitForTimeout(1000);
        await page.fill(locators.Entry_Edit.City_Input, City);
        await page.waitForTimeout(1000);
        await page.locator('li.e-list-item', { hasText: City }).waitFor({ state: 'visible' });
        await page.waitForTimeout(4000);
        await page.locator('li.e-list-item', { hasText: City }).click();
        console.log("City Selected = ", City);
    }
    // +++++++++++++++ AREA Selection +++++++++++++++++
    if (Area != null) {
        await page.locator(locators.Entry_Edit.Area_SpanClass).click();
        await page.waitForTimeout(1000);
        await page.fill(locators.Entry_Edit.Area_Input, Area);
        await page.waitForTimeout(1000);
        await page.locator('li.e-list-item', { hasText: Area }).waitFor({ state: 'visible' });
        await page.waitForTimeout(4000);
        await page.locator('li.e-list-item', { hasText: Area }).click();
        await page.waitForTimeout(1000);
        console.log("Area Selected = ", Area);
    }
    await page.locator(locators.Entry_Edit.Submit).click();
    console.log("Submit Btn click");
    await page.waitForTimeout(3000);
}

async function Varify_Service_Add_Ticket(page, AMC_Having_Customer_Name) {
    console.log("==========================================================");
    console.log("Verify Service Ticket Page");
    console.log("==========================================================");
    let Var_Ticket = await page.locator(locators.Service_Entry.Ticket_No).isDisabled();
    let Var_Mobile = await page.locator(locators.Service_Entry.Mobile).isDisabled();
    let Var_Customer_Address = await page.locator(locators.Service_Entry.Customer_Address).isDisabled();
    let Var_Payment_Type = await page.locator(locators.Service_Entry.Payment_Type_Class).isDisabled();
    console.log("Ticket = ", Var_Ticket);
    console.log("Mobile = ", Var_Mobile);
    console.log("Customer Address = ", Var_Customer_Address);
    console.log("Payment Type = ", Var_Payment_Type);

    let Var_Submit = await page.locator(locators.Service_Entry.Submit).isVisible();
    let Var_Close = await page.locator(locators.Service_Entry.Close).isVisible();
    let Var_Reset = await page.locator(locators.Service_Entry.Reset).isVisible();
    console.log("Submit Service = ", Var_Submit);
    console.log("Close Service = ", Var_Close);
    console.log("Reset Service = ", Var_Reset);
    await page.waitForTimeout(1000);

    let Var_Inventory_Detail = await page.locator(locators.Inventory_Detail.Qty).isVisible();
    let Var_Receipt_Detail = await page.locator(locators.Receipt_Detail.Received_On).isVisible();
    console.log("Inventory Detail Visible = ", Var_Inventory_Detail);
    console.log("Receipt Detail = ", Var_Receipt_Detail);

    if (AMC_Having_Customer_Name != null) {
        await page.locator(locators.Service_Entry.Customer_Class).click();
        await page.fill(locators.Service_Entry.Input_Class, AMC_Having_Customer_Name);
        await page.locator('li.e-list-item', { hasText: AMC_Having_Customer_Name }).click();
        await page.waitForTimeout(300);
        console.log("Service Ticket Customer Selected = ", AMC_Having_Customer_Name);

        let Var_AMC_Visible = await page.locator(locators.Service_Entry.AMC_Class).isVisible();
        console.log("AMC Visible = ", Var_AMC_Visible);
    }
    await page.waitForTimeout(1000);
    await page.locator(locators.Service_Entry.Outside_Product).nth(0).check();
    await page.waitForTimeout(1000);
    if (await page.locator(locators.Service_Entry.Outside_Product).first().isChecked() && await page.locator(locators.Service_Entry.Outside_Product_Input).isVisible()) {
        console.log("Outside Product Texbox visible");
    }

    // let dropdownSelector = 'select#ServiceTicketEntryProductName'; // Update with actual dropdown selector
    // let dropdownSelector = await page.locator(locators.Service_Entry.Product_Type_Class);
    // await page.waitForSelector(dropdownSelector);
    // await page.locator(locators.Service_Entry.Product_Type_Class).click();
    // Fetch options using $$eval
    // let options = await page.$$eval(`${dropdownSelector} option`, options => options.map(option => option.textContent.trim()));
    // console.log('Dropdown options:', options);

    await page.locator(locators.Service_Entry.Service_Type_Class).click();
    await page.locator('li.e-list-item', { hasText: "Free" }).click();
    if (await page.locator(locators.Service_Entry.Service_Type_Class) && await page.locator('li.e-list-item', { hasText: "Free" })) {
        let Var_Payment_Type = await page.locator(locators.Service_Entry.Payment_Type_ID).isDisabled();
        let Var_Completed = await page.locator(locators.Service_Entry.Completed_ID).isDisabled();
        console.log("Payment Type = ", Var_Payment_Type);
        console.log("Completed Class = ", Var_Completed);
        let Var_Discount_Amt = await page.locator(locators.Service_Entry.Discount_Amount).nth(0).isEditable();
        let Var_Discount_Per = await page.locator(locators.Service_Entry.Discount_Percentage).isEditable();
        let Var_Net_Amt = await page.locator(locators.Service_Entry.Net_Amount).isEditable();
        console.log("Discount Amt Editable = ", Var_Discount_Amt);
        console.log("Discount % Editable = ", Var_Discount_Per);
        console.log("Net Amt Editable = ", Var_Net_Amt);
    }
    await page.locator(locators.Service_Entry.Reset).click();
    console.log("Reset Btn Click");
}

function extractNumber(grossAmtString) {
    let match = grossAmtString.match(/[\d,]+(\.\d+)?/);
    return match ? parseFloat(match[0].replace(/,/g, '')) : null;
}


async function View_Record_Added_Free_Service_Ticket_Row_Genral(page, Customer, Date) {
    console.log("==========================================================");
    console.log("Verify Newly Add Data in Grid");
    console.log("==========================================================");
    console.log("Service Ticket Added Searching for Data");
    if (Customer != null) {
        await page.locator(locators.Service_Ticket_Page.Customer_Class).click();
        await page.fill(locators.Service_Ticket_Page.Input_Class, Customer);
        await page.locator('li.e-list-item', { hasText: Customer }).click();
        await page.waitForTimeout(300);
        console.log("Service Ticket  Customer Selected = ", Customer);
    }
    await page.locator(locators.Service_Ticket_Page.Search).click();
    Service_Ticket_No = await page.locator(locators.Service_Ticket_Page.Service_Ticket_No).textContent();
    let Fetch_Date = await page.locator(locators.Service_Ticket_Page.Find_Customer_Date_Grid).textContent();
    let Fetch_Customer_Name = await page.locator(locators.Service_Ticket_Page.Find_Customer_Name).textContent();
    console.log("Fetch Date , Customer Name =", Fetch_Date, " + ", Fetch_Customer_Name);
    console.log("Date , Customer Name =", Date, " + ", Customer);
    if (Fetch_Customer_Name == Customer && Fetch_Date == Date) {
        console.log("Service Ticket Data Added Scuccesfuly.");
    }
}

async function Add_Inventory_Detail(page, Inventory_Item, Qty) {
    console.log("========================================================");
    console.log("Add Inventory");
    console.log("========================================================");
    if (Inventory_Item != null) {
        await page.locator(locators.Inventory_Detail.Add).click();
        await page.waitForTimeout(300);

        await page.locator(locators.Inventory_Detail.Item_Class).nth(0).click();
        await page.fill(locators.Inventory_Detail.Input_Class, Inventory_Item);
        await page.locator('li.e-list-item', { hasText: Inventory_Item }).click();
        await page.waitForTimeout(1000);
        console.log("Service Ticket Inventory Item Selected = ", Inventory_Item);

        if (Qty != null) {
            await page.locator(locators.Inventory_Detail.Qty).nth(0).click();
            await page.waitForTimeout(500);
            await page.fill(locators.Inventory_Detail.Input_Qut, Qty);
            console.log("Qty = ", Qty);
        }
        let Rate_Of_Inventory = await page.locator(locators.Inventory_Detail.Rate).nth(0).textContent();
        await page.locator(locators.Inventory_Detail.Rate).nth(0).dblclick();
        if (Rate_Of_Inventory == 0) {
            await page.fill(locators.Inventory_Detail.Input_Rate, "100");
        }
        await page.waitForTimeout(500);
        await page.locator(locators.Inventory_Detail.Amt).nth(0).click();
        await page.waitForTimeout(500);

        await page.locator(locators.Inventory_Detail.Update).click();
        await page.waitForTimeout(500);
        console.log("Update of Inventory Click");
        if (page.locator(locators.Inventory_Detail.Update_Pop).isVisible()) {
            await page.locator(locators.Inventory_Detail.Update_Pop_Cancel).click();
            console.log("Update popup cancel of Inventory Click");
            await page.waitForTimeout(1500);
            await page.locator(locators.Inventory_Detail.Update).click();
            console.log("Update of Inventory Click");
            await page.waitForTimeout(500);
            if (page.locator(locators.Inventory_Detail.Update_Pop).isVisible()) {
                await page.waitForTimeout(500);
                await page.locator(locators.Inventory_Detail.Update_Pop_Ok).click();
                console.log("Update popup ok of Inventory Click");
                await page.waitForTimeout(500);
            }
            let Gross_Amt = await page.locator(locators.Inventory_Detail.Gross_Amt_Class).nth(1).textContent();
            await page.waitForTimeout(1000);
            console.log("Gross Amt of inventory Free Service Ticket =", Gross_Amt);
            let Gross_Amt_convert = extractNumber(Gross_Amt);
            console.log("Gross Amr Converted = ", Gross_Amt_convert);
            if (Gross_Amt_convert != 0) {
                await page.locator(locators.Inventory_Detail.Rate).nth(0).dblclick();
                await page.waitForTimeout(500);
                await page.fill(locators.Inventory_Detail.Input_Rate, "0");
                console.log("Inventory Rate Updated to 0");
                await page.waitForTimeout(500);
                await page.locator(locators.Inventory_Detail.Update).click();
                console.log("Update of Inventory Click");
                await page.waitForTimeout(500);
                if (page.locator(locators.Inventory_Detail.Update_Pop).isVisible()) {
                    await page.waitForTimeout(500);
                    await page.locator(locators.Inventory_Detail.Update_Pop_Ok).click();
                    console.log("Update popup ok of Inventory Click");
                    await page.waitForTimeout(500);
                }
            }
        }
    }
}

async function Add_Free_Service_Ticket_Genaral_Row_Material(page, Customer, Product_Type, Is_Out_Side, Out_Side_Txt, Technician,Row_Inventory_Item, General_Inventory_Item, Qty) {
    await page.waitForTimeout(500);
    console.log("==================================================");
    console.log("Add Free Service Ticket");
    console.log("==================================================");
    if (Customer != null) {
        await page.locator(locators.Service_Entry.Customer_Class).click();
        await page.fill(locators.Service_Entry.Input_Class, Customer);
        await page.locator('li.e-list-item', { hasText: Customer }).click();
        await page.waitForTimeout(300);
        console.log("Service Ticket Customer Selected = ", Customer);
    }
    if (Product_Type != null) {
        await page.locator(locators.Service_Entry.Product_Type_Class).click();
        await page.locator('li.e-list-item', { hasText: Product_Type }).click();
        await page.waitForTimeout(300);
        console.log("Service Ticket Product Type Selected = ", Product_Type);
    }
    if (Is_Out_Side == "Yes") {
        await page.locator(locators.Service_Entry.Outside_Product).nth(0).check();
        await page.waitForTimeout(1000);
        if (await page.locator(locators.Service_Entry.Outside_Product_Input).isVisible()) {
            if (Out_Side_Txt != null) {
                await page.fill(locators.Service_Entry.Outside_Product_Input, Out_Side_Txt);
            }
        }
    }
    if (Technician != null) {
        await page.locator(locators.Service_Entry.Technician_Class).click();
        await page.fill(locators.Service_Entry.Input_Class, Technician);
        await page.locator('li.e-list-item', { hasText: Technician }).click();
        await page.waitForTimeout(300);
        console.log("Service Ticket Technician Selected = ", Technician);
    }
    
        await page.locator(locators.Service_Entry.Product_Class).click();
        await page.waitForTimeout(1000);
        //await page.fill(locators.Service_Entry.Input_Class, Product);
        await page.locator('li.e-list-item').nth(0).click();
        console.log("Service Ticket Product Selected = ");
    
    await page.locator(locators.Service_Entry.Service_Type_Class).click();
    await page.locator('li.e-list-item', { hasText: "Free" }).click();
    await page.waitForTimeout(300);
    console.log("====================================================================");
    console.log("Row Inventory Data :");
    await Add_Inventory_Detail(page, Row_Inventory_Item, Qty);
    console.log("====================================================================");
    console.log("General Inventory Data :");
    await page.waitForTimeout(500);
    await Add_Inventory_Detail(page, General_Inventory_Item, Qty);

    await page.locator(locators.Service_Entry.Submit).click();
    console.log("Submit Btn Click");
    if (await page.locator(locators.Service_Entry.Toast).isVisible) {
        console.log("++++++ Toast Message Pop Up Display ======= ");
        let Gross_Amt = await page.locator(locators.Inventory_Detail.Gross_Amt_Class).nth(1).textContent();
        await page.waitForTimeout(1000);
        console.log("Gross Amt of inventory Free Service Ticket =", Gross_Amt);
        let Gross_Amt_convert = extractNumber(Gross_Amt);
        console.log("Gross Amr Converted = ", Gross_Amt_convert);
        if (Gross_Amt_convert != 0) {
            await page.locator(locators.Inventory_Detail.Sort_Rate).dblclick();
            console.log("Sort rate Btn Dblclicke");
            await page.waitForTimeout(700);
            await page.locator(locators.Inventory_Detail.Rate).nth(0).dblclick();
            await page.waitForTimeout(500);
            await page.fill(locators.Inventory_Detail.Input_Rate, "0");
            console.log("Inventory Rate Updated to 0");
            await page.waitForTimeout(500);
            await page.locator(locators.Inventory_Detail.Update).click();
            console.log("Update of Inventory Click");
            await page.waitForTimeout(500);
            if (page.locator(locators.Inventory_Detail.Update_Pop).isVisible()) {
                await page.waitForTimeout(500);
                await page.locator(locators.Inventory_Detail.Update_Pop_Ok).click();
                console.log("Update popup ok of Inventory Click");
                await page.waitForTimeout(500);
            }
        }
        await page.waitForTimeout(3000);
        await page.locator(locators.Service_Entry.Date_Picker).click();
        await page.waitForTimeout(4000);
        Date_find = await page.locator(locators.Service_Entry.Date).inputValue();
        console.log("Fetch Date =", Date_find);
        await page.locator(locators.Service_Entry.Submit).click();
        console.log("Submit Btn Click");
    }
    await page.waitForTimeout(5000);
    await View_Record_Added_Free_Service_Ticket_Row_Genral(page, Customer, Date_find);
}

async function Service_Report_Free_ST_General_Row(page, Customer, ST_No) {
    console.log("=======================================");
    console.log("Service Report");
    console.log("=======================================");
    await page.locator(locators.Reports_Menu).click();
    console.log("Report Menu Clicked.");
    await page.locator(locators.Service_Report.Service_Report_Main_Menu).click();
    console.log("Service Main Report Menu Clicked.");
    await page.locator(locators.Service_Report.Service_Menu).click();
    console.log("Service Report Menu Clicked.");
    await page.locator(locators.Service_Report.Side_Bar_Btn).click();
    console.log("Service Report Filter Btn Clicked.");
    await page.waitForTimeout(600);
    if (Customer != null) {
        await page.locator(locators.Service_Report.Customer_Class).click();
        await page.fill(locators.Service_Report.Input_Class, Customer);
        await page.locator('li.e-list-item', { hasText: Customer }).click();
        await page.waitForTimeout(300);
        console.log("Service Report Customer Selected = ", Customer);
    }
    await page.locator(locators.Service_Report.Service_Type_Class).click();
    await page.locator('li.e-list-item', { hasText: "Free" }).click();
    await page.waitForTimeout(300);
    console.log("Service Report Service Type Selected =  Free");
    await page.waitForTimeout(600);
    await page.locator(locators.Service_Report.Search).click();
    console.log("Service Report's Search Btn Clicked.");
    await page.waitForTimeout(500);
    ST_No = await page.locator(locators.Service_Report.ST_No).textContent();
    if (Service_Ticket_No == ST_No) {
        console.log("Record Displayed on Service > Service Reports. And Service Ticket No is ", ST_No);
    }
}

async function Item_Wise_Service_Ticket_Report(page, Customer, Row_Inventory_Item, ST_No) {
    console.log("=======================================");
    console.log("Item wise Report");
    console.log("=======================================");
    await page.locator(locators.Reports_Menu).click();
    await page.waitForTimeout(500);
    console.log("Report Menu Clicked.");
    await page.locator(locators.Service_Report.Service_Report_Main_Menu).click();
    console.log("Service Main Report Menu Clicked.");
    await page.waitForTimeout(400);
    await page.locator(locators.Service_Item_Wise_Report.Item_Wise_Menu).click();
    console.log("Service Item Wise Report Menu Clicked.");
    await page.waitForTimeout(400);
    await page.locator(locators.Service_Item_Wise_Report.Filter_Btn).click();
    console.log("Service Report Filter Btn Clicked.");
    await page.waitForTimeout(700);
    await page.locator(locators.Service_Item_Wise_Report.Reset).click();
    await page.waitForTimeout(700);
    if (Customer != null) {
        await page.locator(locators.Service_Item_Wise_Report.Customer_Class).click();
        await page.fill(locators.Service_Report.Input_Class, Customer);
        await page.locator('li.e-list-item', { hasText: Customer }).click();
        await page.waitForTimeout(300);
        console.log("Service Item Wise Report Customer Selected = ", Customer);
    }
    if (Row_Inventory_Item != null) {
        await page.locator(locators.Service_Item_Wise_Report.Inventory_Class).click();
        await page.fill(locators.Service_Report.Input_Class, Row_Inventory_Item);
        await page.locator('li.e-list-item', { hasText: Row_Inventory_Item }).click();
        await page.waitForTimeout(300);
        console.log("Service Item Wise Report Inventory Selected = ", Row_Inventory_Item);
    }
    await page.locator(locators.Service_Item_Wise_Report.Service_Type_Class).click();
    await page.locator('li.e-list-item', { hasText: "Free" }).click();
    await page.waitForTimeout(300);
    console.log("Service Report Service Type Selected =  Free");
    await page.waitForTimeout(1000);
    await page.locator(locators.Service_Item_Wise_Report.Search).click();
    console.log("Service Report's Search Btn Clicked.");
    await page.waitForTimeout(800);
    ST_No = await page.locator(locators.Service_Item_Wise_Report.Service_Item_Wise_ST_No).textContent();
    if (Service_Ticket_No == ST_No) {
        console.log("Record Displayed on Service > Item Wise Reports. And Service Ticket No is ", ST_No);
    }
}

async function Closed_Complain_Report(page, Customer) {
    console.log("=======================================");
    console.log("Colsed Comaplain Report");
    console.log("=======================================");
    await page.locator(locators.Reports_Menu).click();
    await page.waitForTimeout(1000);
    console.log("Report Menu Clicked.");
    await page.locator(locators.Service_Report.Service_Report_Main_Menu).click();
    console.log("Service Main Report Menu Clicked.");
    await page.waitForTimeout(600);
    await page.locator(locators.Close_Complain_Report.Colse_complain_Report_Menu).click();
    console.log("Service Close Complain Report Menu Clicked.");
    await page.waitForTimeout(1000);
    await page.locator(locators.Close_Complain_Report.Customer_Name_Input).dblclick();
    let Customer_CCR = await page.fill(locators.Close_Complain_Report.Customer_Name_Input, Customer);
    await page.waitForTimeout(600);
    await page.locator(locators.Close_Complain_Report.Customer_Name_Input).press('Enter');
    await page.waitForTimeout(500);
    let Grid_Data = await page.locator(locators.Close_Complain_Report.Grid).textContent();
    await page.waitForTimeout(1000);
    console.log("Grid value =", Grid_Data);
}

async function Inventory_Stock_Report(page, Inventory_Group, Inventory, Bill_No, Date) {
    console.log("=======================================");
    console.log("Inventory Stock Report");
    console.log("=======================================");
    await page.locator(locators.Reports_Menu).click();
    await page.waitForTimeout(1000);
    console.log("Report Menu Clicked.");
    await page.locator(locators.Inventory_Stock_Report.Inventory_Stock_Report_Menu).click();
    console.log("Inventory Stock Report Menu Clicked.");
    await page.locator(locators.Inventory_Stock_Report.Filter_Btn).click();
    console.log("Inventory Stock Report Filter Btn Clicked.");
    await page.waitForTimeout(700);
    await page.locator(locators.Inventory_Stock_Report.Reset).click();
    await page.waitForTimeout(700);
    if (Inventory_Group != null) {
        await page.locator(locators.Inventory_Stock_Report.Inventory_Group_Class).click();
        await page.locator('li.e-list-item', { hasText: Inventory_Group }).click();
        await page.waitForTimeout(300);
        console.log("Inventory Stock Report Inventory Group Selected = ", Inventory_Group);
    }
    if (Inventory != null) {
        await page.locator(locators.Inventory_Stock_Report.Inventory_Class).click();
        await page.fill(locators.Inventory_Stock_Report.Input_Class, Inventory);
        await page.locator('li.e-list-item', { hasText: Inventory }).click();
        await page.waitForTimeout(300);
        console.log("Inventory Stock Report Inventory Selected = ", Inventory);
    }
    await page.locator(locators.Inventory_Stock_Report.Search).click();
    console.log("Inventory Stock Report Search Btn Clicked.");
    await page.waitForTimeout(800);
    if (await page.locator(locators.Inventory_Stock_Report.View).isVisible()) {
        await page.locator(locators.Inventory_Stock_Report.View).click();
        console.log("Inventory Stock Report View Link Open.");
        await page.waitForTimeout(500);
        await page.locator(locators.Inventory_Stock_Report.Bill_Column).dblclick();
        await page.waitForTimeout(2500);
        console.log("Bill No sorted to latest up .");
        await page.locator(locators.Inventory_Stock_Report.Transaction_Type).click();
        let Trasaction = await page.locator(locators.Inventory_Stock_Report.Transaction_Type).textContent();
        await page.waitForTimeout(1000);
        let Var_ISBN = await page.locator(locators.Inventory_Stock_Report.Bill_No).textContent();
        console.log("Transaction ", Trasaction, "  Bill no ", Var_ISBN);
        if (Var_ISBN == Service_Ticket_No && Trasaction == "Ticket") {
            console.log("Data found");
        }
    }
    else {
        console.log("Data Not found !!");
    }
}

async function Customer_Account_Ledger_Report(page, Customer, Bill_No, ST_Date) {
    await page.waitForTimeout(1000);
    console.log("=======================================");
    console.log("Customer Account Ledger Report");
    console.log("=======================================");
    await page.locator(locators.Reports_Menu).click();
    await page.waitForTimeout(1000);
    console.log("Report Menu Clicked.");
    await page.locator(locators.Customer_Account_Ledger.Account_Ledger_Menu).click();
    console.log("Account Ledger Report Menu Clicked.");
    await page.locator(locators.Customer_Account_Ledger.Customer_Account_Menu).click();
    console.log("Customer Account Ledger Report Menu Clicked.");
    await page.locator(locators.Customer_Account_Ledger.Filter_Button).click();
    console.log("Inventory Stock Report Filter Btn Clicked.");
    await page.waitForTimeout(1000);
    if (Customer != null) {
        await page.locator(locators.Customer_Account_Ledger.Customer_Class).click();
        await page.fill(locators.Customer_Account_Ledger.Input_Class, Customer);
        await page.locator('li.e-list-item', { hasText: Customer }).click();
        await page.waitForTimeout(300);
        console.log("Customer Account Ledger Report Customer Selected = ", Customer);
    }
    let now = new Date();
    let formattedDate = now.toLocaleDateString('en-GB'); // DD/MM/YYYY format
    let customDate = `30-01-2025 - ${formattedDate} `; // Use a different variable instead of 'Date'

    console.log(customDate);

    Bill_No = Service_Ticket_No;
    await page.waitForTimeout(800);
    await page.fill(locators.Customer_Account_Ledger.Date_Filter, customDate);
    await page.waitForTimeout(500);
    await page.locator(locators.Customer_Account_Ledger.Search).click();
    await page.waitForTimeout(1000);
    await page.locator(locators.Customer_Account_Ledger.Bill_No_Column).dblclick();
    await page.waitForTimeout(700);
    let Company_Name_Fetch = await page.locator(locators.Customer_Account_Ledger.Company_Name).textContent();
    await page.waitForTimeout(1500);
    let Bill_No_Fetch = await page.locator(locators.Customer_Account_Ledger.Bill_No).textContent();
    await page.waitForTimeout(1500);
    console.log("Company Name = ", Company_Name_Fetch, " Bill No = ", Bill_No_Fetch);
    if (Company_Name_Fetch == "Archi Enterprice" && Bill_No_Fetch == Bill_No) {
        console.log("Data found");
    }
}

async function Outstanding_Report(page, Customer, ST_No) {
    console.log("=======================================");
    console.log("Outstanding Report");
    console.log("=======================================");
    await page.waitForTimeout(1000);
    //Open Outstanding Reports
    await page.locator(locators.Reports_Menu).click();
    console.log("Report Menu Click");
    await page.locator(locators.Outstanding_Reports.Outstanding_Report_Menu).click();
    console.log("Outstanding Report Click");
    await page.waitForTimeout(1500);
    //Open side Bar 
    await page.locator(locators.Outstanding_Reports.Side_Bar).click();
    await page.waitForTimeout(700);

    if (Customer != null) {
        // Customer Selction 
        // await page.waitForLoadState('networkidle'); // Waits until all network requests finish
        await page.locator(locators.Outstanding_Reports.Customer_Class).click();
        await page.fill(locators.Outstanding_Reports.Input_Class, Customer);
        await page.locator('li.e-list-item').filter({ hasText: Customer }).waitFor({ state: 'visible' });
        await page.locator('li.e-list-item', { hasText: Customer }).click();
        console.log("Outstanding Report Customer Selected = ", Customer);
    }
    await page.waitForTimeout(700);
    let Company_Name = "Archi Enterprice";
    await page.locator(locators.Outstanding_Reports.Company_Class).click();
    await page.fill(locators.Outstanding_Reports.Input_Class, Company_Name);
    await page.locator('li.e-list-item').filter({ hasText: Company_Name }).waitFor({ state: 'visible' });
    await page.locator('li.e-list-item', { hasText: Company_Name }).click();
    console.log("Outstanding Report Company Selected = ", Company_Name);
    // Search Button
    await page.locator(locators.Outstanding_Reports.Search).click();
    console.log("Outstanding Report's Search Btn Clicked.");
    if (await page.locator(locators.Outstanding_Reports.Bill_No).isVisible) {
        let Grid_Data = await page.locator(locators.Outstanding_Reports.Grid).textContent();
        console.log(Grid_Data);
    }
    else {
        // let Bill = await page.locator(locators.Outstanding_Reports.Bill_No).textContent();
        console.log("Bill Fount !! Cause this is free ..");
    }

}

module.exports = { Open_Add_Account_Link, Service_Ticket_Page, Add_New_Service_Ticket, Varify_Service_Add_Ticket, AddUser, Add_Free_Service_Ticket_Genaral_Row_Material, Service_Report_Free_ST_General_Row, Item_Wise_Service_Ticket_Report, Closed_Complain_Report, Inventory_Stock_Report, Customer_Account_Ledger_Report, Outstanding_Report };