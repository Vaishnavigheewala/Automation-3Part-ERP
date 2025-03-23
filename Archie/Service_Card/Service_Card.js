const { test, expect } = require('@playwright/test');
const { loadEnvFile } = require('process');
const { pathToFileURL } = require('url');
const locators = require('./Service_Card.json');
const { Module } = require('module');

async function Service_Card_Navigation(page) {
    await page.locator(locators.Service_Card.Service_Menu).click();
    await page.locator(locators.Service_Card.Service_Card_Menu).click();
    console.log("Navigate to Service Card");
    await page.waitForTimeout(500);
}

async function Pagination_Checking(page) {
    // Scroll down
    await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });
    await page.waitForTimeout(1500);
    let Pagination = await page.locator(locators.Service_Card.Pagination).isVisible();
    console.log("Pagination Available = ", Pagination);
}

async function Search_Customer(page,  Customer) {
    
    if (Customer != null) {
        await page.locator(locators.Service_Card.Customer_Class).click();
        await page.waitForTimeout(300);
        await page.fill(locators.Service_Card.Customer_Input, Customer);
        await page.locator('li.e-list-item', { hasText: Customer }).click();
        await page.waitForTimeout(600);
        console.log("Customer selected", Customer);
    }
    await page.locator(locators.Service_Card.Search).click();
    console.log("Search Cliced");
}

async function Service_Card(page) {
    await page.waitForTimeout(500);
    await page.locator(locators.Service_Card.Generate_Service_Card_Btn).click();
    console.log("Service Card Genarated Download");
}

async function Reset_Service_Card(page) {
    await page.locator(locators.Service_Card.Reset).click();
    console.log("Service Card Reset");
}

async function Verify_Grid(page) {
    let Var_SR_No = await page.locator(locators.Service_Card_Grid.SR_No).nth(1).isVisible();
    let Var_Bill_Date = await page.locator(locators.Service_Card_Grid.Bill_Date).nth(1).isVisible();
    let Var_Product_Name = await page.locator(locators.Service_Card_Grid.Product_Name).nth(1).isVisible();
    let Var_Customer = await page.locator(locators.Service_Card_Grid.Customer_Name).nth(1).isVisible();
    let Var_Address = await page.locator(locators.Service_Card_Grid.Address).nth(1).isVisible();
    let Var_Work_Detail = await page.locator(locators.Service_Card_Grid.Work_Detail).nth(1).isVisible();
    let Var_Amt = await page.locator(locators.Service_Card_Grid.Amt).nth(1).isVisible();
    let Var_Service_Type = await page.locator(locators.Service_Card_Grid.Service_Type).nth(1).isVisible();
    let Var_Technician_Name = await page.locator(locators.Service_Card_Grid.Technican_Name).nth(1).isVisible();
    let Var_Mobile = await page.locator(locators.Service_Card_Grid.Mobile_No).nth(1).isVisible();
    console.log("SR No. =", Var_SR_No);
    console.log("Bill Date. =", Var_Bill_Date);
    console.log("Product Name =", Var_Product_Name);
    console.log("Customer =", Var_Customer);
    console.log("Address =", Var_Address);
    console.log("Work Detail =", Var_Work_Detail);
    console.log("Amt =", Var_Amt);
    console.log("Service Type =", Var_Service_Type);
    console.log("Technician =", Var_Technician_Name);
    console.log("Mobile No. =", Var_Mobile);
}

module.exports = {Service_Card_Navigation, Pagination_Checking, Search_Customer, Service_Card, Reset_Service_Card, Verify_Grid};