const { test, expect } = require('@playwright/test');
const locators = require('./HUF_Cycle_Sales.json');

async function Verify_HUF_Cycle(page) {
    
    let Datepicker = await page.locator(locators.HUF_Cycle_Sales_Page.Date_Picker).nth(0).isVisible();    
    let Customer_Name = await page.locator(locators.HUF_Cycle_Sales_Page.CustomerName_Dropdown).nth(0).isVisible();
    let Search_Button = await page.locator(locators.HUF_Cycle_Sales_Page.Search_Button).nth(0).isVisible();
    let Reset_Button = await page.locator(locators.HUF_Cycle_Sales_Page.Reset_Button).nth(0).isVisible();
    let PDF_Export_Button = await page.locator(locators.HUF_Cycle_Sales_Page.PDF_Export_Button).nth(0).isVisible();
    let Add_New_Button = await page.locator(locators.HUF_Cycle_Sales_Page.Add_New_Button).nth(0).isVisible();
    let Regular_Bill_Column = await page.locator(locators.HUF_Cycle_Sales_Page.Regular_Column).nth(0).isVisible();
    let Bill_Type_Column = await page.locator(locators.HUF_Cycle_Sales_Page.Bill_Type_Column).nth(0).isVisible();
    let Customer_Name_Column = await page.locator(locators.HUF_Cycle_Sales_Page.Customer_Name_Column).nth(0).isVisible();
    let Broker_Name_Column = await page.locator(locators.HUF_Cycle_Sales_Page.Broker_Name_Column).nth(0).isVisible();
    let Pay_Type_Column = await page.locator(locators.HUF_Cycle_Sales_Page.Pay_Type_Column).nth(0).isVisible();
    let Invoice_Type_Column = await page.locator(locators.HUF_Cycle_Sales_Page.Invoice_Type_Column).nth(0).isVisible();
    let Tax_Method_Column = await page.locator(locators.HUF_Cycle_Sales_Page.Tax_Method_Column).nth(0).isVisible();
    let State_Column = await page.locator(locators.HUF_Cycle_Sales_Page.State_Column).nth(0).isVisible();
    let Total_QTY_Column = await page.locator(locators.HUF_Cycle_Sales_Page.Total_QTY_Column).nth(0).isVisible();
    let Add_Less_AMT_Column = await page.locator(locators.HUF_Cycle_Sales_Page.Add_Less_AMT_Column).nth(0).isVisible();
    let Round_Off_AMT_Column = await page.locator(locators.HUF_Cycle_Sales_Page.Round_Off_AMT_Column).nth(0).isVisible();
    let Net_AMT_Column = await page.locator(locators.HUF_Cycle_Sales_Page.Net_AMT_Column).nth(0).isVisible();
    let Action_Column = await page.locator(locators.HUF_Cycle_Sales_Page.Action_Column).nth(0).isVisible();
    let View_Link = await page.locator(locators.HUF_Cycle_Sales_Page.View_Link).nth(0).isVisible();


    console.log("Date Field is Visible:", Datepicker);
    console.log("Customer Name Field is Visible:", Customer_Name);
    console.log("Search Button is Visible:", Search_Button);
    console.log("Reset Button is Visible:", Reset_Button);
    console.log("PDF Export Button is Visible:", PDF_Export_Button);
    console.log("Add New Button is Visible:", Add_New_Button);
    console.log("Regular Bill Number Column is Visible:", Regular_Bill_Column);
    console.log("Bill Type Column is Visible:", Bill_Type_Column);
    console.log("Customer Name Column is Visible:", Customer_Name_Column);
    console.log("Broker Name Column is Visible:", Broker_Name_Column);
    console.log("Pay Type Column is Visible:", Pay_Type_Column);
    console.log("Invoice Type Column is Visible:", Invoice_Type_Column);
    console.log("Tax Method Column is Visible:", Tax_Method_Column);
    console.log("State Column is Visible:", State_Column);
    console.log("Total Qty Column is Visible:", Total_QTY_Column);
    console.log("Add/Less Amount Column is Visible:", Add_Less_AMT_Column);
    console.log("Round Off Amount Column is Visible:", Round_Off_AMT_Column);
    console.log("Net Amount Column is Visible:", Net_AMT_Column);
    console.log("Action Column is Visible:", Action_Column);
    console.log("View Link is Visible:", View_Link);

}

module.exports = { Verify_HUF_Cycle };