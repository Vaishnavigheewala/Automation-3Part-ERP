const { test, expect } = require('@playwright/test');
const locators = require('./Technician.json');


async function add_technician_data(page, technicianname, mobile, address) {
    console.log("=== Add New Technician ===");
    await page.locator(locators.technicianname).click();
    await page.fill(locators.technicianname, technicianname);
    console.log("tecnician name fill ", technicianname);
    await page.waitForTimeout(1000);
    await page.locator(locators.technicianmobile).click();
    await page.fill(locators.technicianmobile, mobile);
    console.log("tecnician Mobile fill ", mobile);
    await page.waitForTimeout(1000);
    await page.locator(locators.technicianaddress).click();
    await page.fill(locators.technicianaddress, address);
    console.log("tecnician Address fill ", address);
    await page.waitForTimeout(1000);
}

async function selectsubmenu(page, menu) {
    if (menu == "Transaction") {
        await page.locator(locators.ShreeAquaCare.sales_menu).click();
        console.log("Sales menu click ");
        await page.locator(locators.ShreeAquaCare.sales_gstsales).click();
        await expect(page.locator('li.breadcrumb-item.active', { hasText: 'Sales' })).toBeVisible();
    }
}

async function selectsubmenuhuf(page, menu) {
    if (menu == "Transaction") {
        await page.locator(locators.ShreeAquaCare.sales_menu).click();
        console.log("Sales click ");
        await page.locator(locators.ShreeAquaCare.sales_gstsales).click();
        await expect(page.locator('li.breadcrumb-item.active', { hasText: 'HUF Cycle Sales' })).toBeVisible();
    }
}

async function selecttechnician(page, broker) {
    await page.locator(locators.ShreeAquaCare.brokerdropdown).click();
    await page.waitForTimeout(1000);
    await page.fill(locators.ShreeAquaCare.entercustomername, broker);
    console.log("Broker selected is ", broker);
    await page.waitForTimeout(1000);
    // Step 4: Select the desired Broker by its text
    await page.locator('li.e-list-item', { hasText: broker }).click();
    await page.waitForTimeout(500);
}

async function Kishorbhai_selecttechnician(page, broker) {
    await page.locator(locators.Kishorbhai.brokerdropdown).click();
    await page.fill(locators.ShreeAquaCare.entercustomername, broker);
    console.log("Broker selected is ", broker);
    await page.waitForTimeout(1000);
    // Step 4: Select the desired Broker by its text
    await page.locator('li.e-list-item', { hasText: broker }).click();
    await page.waitForTimeout(500);
}

async function Archie_selecttechnician(page, broker) {
    await page.locator(locators.Archie.Technician_Class).click();
    await page.fill(locators.ShreeAquaCare.entercustomername, broker);
    console.log("Broker selected is ", broker);
    await page.waitForTimeout(1000);
    // Step 4: Select the desired Broker by its text
    await page.locator('li.e-list-item', { hasText: broker }).click();
    await page.waitForTimeout(500);
}

module.exports = { add_technician_data, selectsubmenu, selecttechnician, selectsubmenuhuf, Kishorbhai_selecttechnician, Archie_selecttechnician }