const fs = require('fs');
const path = require('path');

// Define the JSON file path
let storage_Path = path.join(__dirname, './Dynamic_Variable.json');

function Read_Storage() {
    if (!fs.existsSync(storage_Path)) {
        console.warn("Storage file not found. Creating a new one...");
        fs.writeFileSync(storage_Path, JSON.stringify({}, null, 2)); // Create an empty JSON file
        return {}; // Return an empty object
    }

    try {
        let fileContent = fs.readFileSync(storage_Path, 'utf-8').trim();
        return fileContent ? JSON.parse(fileContent) : {}; // Handle empty files safely
    } catch (error) {
        console.error("Error reading storage file:", error);
        console.warn("Resetting storage due to invalid JSON.");
        fs.writeFileSync(storage_Path, JSON.stringify({}, null, 2)); // Reset to an empty object
        return {}; // Return an empty object on failure
    }
}

function Write_Storage(data) {
    fs.writeFileSync(storage_Path, JSON.stringify(data, null, 2), 'utf-8');
}

if (!fs.existsSync(storage_Path)) {
    console.log("Storage file not found. Creating a new file.");
    Write_Storage({}); // Create a new empty JSON file
}
/*
async function Generate_Variable(key, generatorFunction) {
    let storage = Read_Storage();
    if (!storage[key]) {
        let value = await generatorFunction();
        storage[key] = value;
        Write_Storage(storage); // Save the new value in the JSON file
    }
    return storage[key]; // Return the variable value (newly generated or existing)
} 
*/

async function Generate_Variable(path, generatorFunction) {
    let storage;

    // Attempt to read storage
    try {
        storage = Read_Storage();
    } catch (error) {
        console.error("Failed to read storage, initializing a new one:", error);
        storage = {}; // Fallback to an empty object if storage can't be read
    }

    // Convert dot-separated path into a nested structure (e.g., "ABC.abc" → storage["ABC"]["abc"])
    let keys = path.split('.'); // Split path (e.g., "ABC.abc" → ["ABC", "abc"])
    let obj = storage;

    for (let i = 0; i < keys.length - 1; i++) {
        if (!obj[keys[i]]) obj[keys[i]] = {}; // Ensure each level exists
        obj = obj[keys[i]];
    }

    let lastKey = keys[keys.length - 1];

    // Generate a new value using the provided generator function
    try {
        let value = await generatorFunction();
        obj[lastKey] = value; // Assign the new value at the correct level
        Write_Storage(storage); // Save back to JSON file
        return obj[lastKey]; // Return the newly generated value
    } catch (error) {
        console.error("Error during variable generation:", error);
        throw new Error("Failed to generate variable");
    }
}



function Delete_Variable(key) {
    let storage = Read_Storage();
    if (storage[key]) {
        delete storage[key];
        Write_Storage(storage); // Update the JSON file after deletion
        console.log(`Deleted variable: ${key}`);
    } else {
        console.log(`Variable "${key}" not found.`);
    }
}

function Delete_All_Variables() {
    Write_Storage({}); // Overwrite the JSON file with an empty object
    console.log('All variables deleted.');
}

function List_Variables() {
    let storage = Read_Storage();
    console.log('Stored Variables:', storage);
    return storage;
}

async function Get_Current_Date_Time() {
    let now = new Date();
    let year = now.getFullYear();
    let month = String(now.getMonth() + 1).padStart(2, '0');
    let day = String(now.getDate()).padStart(2, '0');
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');

    let date = `${year}-${month}-${day}`;
    let time = `${hours}:${minutes}:${seconds}`;

    return `${date}_${time}`;
}

async function Generate_Unique_String(length = 6) {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    // let timestamp = Date.now().toString(36); // Convert timestamp to base-36 string

    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }
    //console.log("Time = ", timestamp);
    console.log("result", result);
    return result;
}

async function Generate_Unique_Address(length = 10) {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    let timestamp = Date.now().toString(36); // Convert timestamp to base-36 string

    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }
    console.log("Time = ", timestamp);
    console.log("result", result);
    return timestamp + result;
}

async function Generate_Unique_Vendor_Bill(length = 4) {
    let chars = '0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }
    
    console.log("Generated Bill Number = ", result);
    return result;
}


async function Generate_Random_Mobile_No() {
    const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000); // 10-digit number
    return `${randomNumber}`;
}

// Function to recursively remove empty string values from an object
function Remove_Empty_Strings(obj) {
    if (Array.isArray(obj)) {
        return obj.map(removeEmptyStrings).filter(item => item !== "");  // Remove empty strings from arrays
    } else if (typeof obj === "object" && obj !== null) {
        return Object.fromEntries(
            Object.entries(obj)
                .map(([key, value]) => [key, Remove_Empty_Strings(value)]) // Recursively process nested objects
                .filter(([_, value]) => value !== "") // Remove empty strings
        );
    }
    return obj;
}

module.exports = { Read_Storage, Write_Storage, Generate_Variable, Delete_Variable, Delete_All_Variables, List_Variables, 
    Get_Current_Date_Time, Generate_Unique_String, Generate_Unique_Address, Generate_Random_Mobile_No,
    Generate_Unique_Vendor_Bill, Remove_Empty_Strings };
