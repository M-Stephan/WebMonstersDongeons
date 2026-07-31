import { combatStatus } from "../utils/combat.js";
import { Notify } from "../utils/notify.js";
import { GetIfMainMenuOpened, GetPlayerInventory, RemoveItemCount } from "../models/inventory.js";
import { Debug } from "../utils/debug.js";
import { UpdatePlayerUsingItem, UseItem } from "../models/item.js";

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
    RefreshPlayerInventory();
    const inventory = GetPlayerInventory();
    const items = inventory["items"];

    items.forEach(obj => {
        const item = Object.keys(obj)[0];
        const count = obj[item];
        let div = document.getElementById("inventory");

        const card = document.createElement("button");
        card.id = `item-${item}`;
        card.classList.add("inventory-item");

        if (!div) {
            div = document.getElementById("inventory");
        }

        div.appendChild(card);

        card.innerHTML = `
            <h4>${item}</h4>
            <p>${count}</p>
        `;

        const currentCard = document.getElementById(`item-${item}`);

        currentCard.addEventListener("click", function() {
            UseItem(item);
            UpdatePlayerUsingItem(true);
            setTimeout(() => {
                UpdatePlayerUsingItem(false);
            }, 3000);
        });
    });
}

export function OpenInventory() {
    const mainMenuOpened = GetIfMainMenuOpened(); // change with hthe localStorage
    if (combatStatus) {
        Notify("error", "Vous êtes en combat", "L'inventaire ne peut pas être ouvert", 5);
    } else if (mainMenuOpened) {
        return;
    } else {
        UpdatePlayerInventory()
        const div = document.getElementById("inventory-box");
        div.style.display = "grid";
    }
}

export function CloseInventory() {
        const div = document.getElementById("inventory-box");
        div.style.display = "none";
}