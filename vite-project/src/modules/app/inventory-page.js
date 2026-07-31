import { combatStatus } from "../utils/combat.js";
import { Notify } from "../utils/notify.js";
import { GetPlayerInventory, RemoveItemCount } from "../models/inventory.js";
import { Debug } from "../utils/debug.js";
import { UseItem } from "../models/item.js";

export let mainMenuOpened = false;
export let itemUsing = false;

export function RefreshPlayerInventory() {
    const appMainContent = document.getElementById("app-main-content");
    let inventory = document.getElementById("inventory-box");

    if (!inventory) {
        inventory = document.createElement("div");        
        inventory.id = "inventory-box";
        inventory.style.display = "none";
        appMainContent.appendChild(inventory);
        inventory.innerHTML = `
            <h1 id="inv-title">Inventaire</h1><br>
            <div id="inventory">
            </div>
        `;
        Debug("success", "The inventory was successfully created");
    } else {
        inventory.innerHTML = `
            <h1 id="inv-title">Inventaire</h1><br>
            <div id="inventory">
            </div>
        `;
    }
    
    appMainContent.appendChild(inventory);
    Debug("success", "The inventory was successfully created");
};

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
            itemUsing = true;
            setTimeout(() => {
                itemUsing = false
            }, 3000);
        });
    });
}

export function OpenInventory() {
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