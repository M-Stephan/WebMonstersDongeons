import { Notify } from "../utils/notify.js";
import { GetIfMainMenuOpened, GetPlayerInventory, RemoveItemCount } from "../models/inventory.js";
import { Debug } from "../utils/debug.js";
import { UpdatePlayerUsingItem, UseItem } from "../models/item.js";
import { GetPlayerIsFighting } from "../utils/combat.js";

// Initialize variable contain if the player using an item
let itemUsing = false;

// Create or refresh player inventory space
export function RefreshPlayerInventory() {
    // Get app space
    const appMainContent = document.getElementById("app-main-content");
    // Get Inventory space
    let inventory = document.getElementById("inventory-box");
    // If inventory does not exists
    if (!inventory) {
        // Create a div element
        inventory = document.createElement("div");     
        // Add "inventory-box" id to div element   
        inventory.id = "inventory-box";
        // Hide the inventory element 
        inventory.style.display = "none";
        // Add inventory into the app space
        appMainContent.appendChild(inventory);
        // Prepare the inventory content
        inventory.innerHTML = `
            <h1 id="inv-title">Inventaire</h1><br>
            <div id="inventory">
            </div>
        `;
        // Debug console will be disabled in production mode
        Debug("success", "The inventory was successfully created");
    // If inventory space exist
    } else {
        // Refresh the inventory space
        inventory.innerHTML = `
            <h1 id="inv-title">Inventaire</h1><br>
            <div id="inventory">
            </div>
        `;
    };
    // Debug console will be disabled in production mode
    Debug("success", "The inventory was successfully created");
};

// function to Update the player inventory
function UpdatePlayerInventory() {
    // Refresh the player inventory
    RefreshPlayerInventory();
    // Get the player inventory
    const inventory = GetPlayerInventory();
    // get the player inventory items
    const items = inventory["items"];

    // for each item object
    items.forEach(obj => {
        // get the key such as item
        const item = Object.keys(obj)[0];
        // get the value such as a count
        const count = obj[item];
        // Get the inventory space
        let div = document.getElementById("inventory");
        // Create an element for each item
        const card = document.createElement("button");
        // Add a unique ID to element
        card.id = `item-${item}`;
        // Add a class to element
        card.classList.add("inventory-item");
        // Add Item element into the inventory space
        div.appendChild(card);
        // Write each element with item and count
        // Will be refactored to write description for each item too
        card.innerHTML = `
            <h4>${item}</h4>
            <p>${count}</p>
        `;

        // get each element
        const currentCard = document.getElementById(`item-${item}`);

        // Creat an event for each element
        currentCard.addEventListener("click", function() {
            // Call function to use the item
            UseItem(item);
            // Call function to tell the player is using item
            UpdatePlayerUsingItem(true);
            // Tell the player has finished to use item 3 seconds later
            setTimeout(() => {
                // Call function to tell the player has finished to use item
                UpdatePlayerUsingItem(false);
            }, 3000);
        });
    });
};

// Function to Display the player inventory 
export function OpenInventory() {
    // Get if the user is in the main menu
    const mainMenuOpened = GetIfMainMenuOpened();
    // Get if the player is in the fight
    const combatStatus = GetPlayerIsFighting(); // Will be replaced by the localStorage get

    // if the player is in the fight
    if (combatStatus) {
        // Notify You cannot make that, the inventory can't be opened
        Notify("error", "Vous êtes en combat", "L'inventaire ne peut pas être ouvert", 5);
    // else if the player id in the main menu
    } else if (mainMenuOpened) {
        // stop all, the inventory can't be opened
        return;
    // else in the other time
    } else {
        // Refresh the inventory
        UpdatePlayerInventory();
        // Get the inventory space
        const div = document.getElementById("inventory-box");
        // display the inventory
        div.style.display = "grid";
    };
};

// function to hide the player inventory
export function CloseInventory() {
        // Get the inventory space
        const div = document.getElementById("inventory-box");
        // Hide the inventory
        div.style.display = "none";
};