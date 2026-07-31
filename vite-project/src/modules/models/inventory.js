import { CloseInventory, OpenInventory, RefreshPlayerInventory } from "../app/inventory-page.js";
import { Debug } from "../utils/debug.js";
import { Notify } from "../utils/notify.js";
import { GetPlayer, UpdatePlayer } from "./players.js";

export function CreateInventoryTable() {
    const inventory = {
        "weapons": {
        },
        "items": [
            { "water": 10 },
            { "bread": 10 }
        ]
    };

    Debug("info", "CreateInventoryTable() has successfully created inventory table");
    return inventory;
};

export function GetPlayerInventory() {
    const raw = GetPlayer();

    if (!raw) return;

    const playerData = JSON.parse(raw);

    const inventory = playerData["inventory"];

    Debug("info", `GetPlayerinventory() has successfully returned player inventory: ${inventory}`)
    
    return inventory;
};

export function GetPlayerHasItemCount(item, count) {
    const inventory = GetPlayerInventory();
    const items = inventory.items;

    return items.some(obj => obj[item] >= count);
};

export function AddItemCount(item, count) {
    const hasItemCount = GetPlayerHasItemCount(item, count);
    const inventory = GetPlayerInventory();
    const newItem = { [item]: count };
    const raw = GetPlayer();
    if (!raw) return;

    const playerData = JSON.parse(raw);
    const items = playerData.inventory.items;

    if (hasItemCount) {
        const entry = items.find(obj => obj[item] !== undefined);
        entry[item] += count;
    } else {
        items.push(newItem);
    }

    UpdatePlayer(playerData);
    RefreshPlayerInventory();
};

export function RemoveItemCount(item, count) {
    const hasItemCount = GetPlayerHasItemCount(item, count);
    const raw = GetPlayer();
    if (!raw) return;

    const playerData = JSON.parse(raw);
    const items = playerData.inventory.items;

    if (hasItemCount) {
        const entry = items.find(obj => obj[item] !== undefined);
        entry[item] -= count;

        if (entry[item] === 0) {
            const index = items.indexOf(entry);
            items.splice(index, 1);
        };

        UpdatePlayer(playerData);
        
        RefreshPlayerInventory();
        OpenInventory();
        setTimeout(() => {
            CloseInventory();
        }, 2800);
        return true;

    } else {
        return false;
    }
};

export function GetIfMainMenuOpened() {
    const opened = localStorage.getItem("main-menu-opened");
    return JSON.parse(opened);
};

export function SetMainMenuOpened(boolean) {
    const opened = localStorage.getItem("main-menu-opened");
    if (opened) {
        localStorage.removeItem("main-menu-opened");
    };
    localStorage.setItem("main-menu-opened", JSON.stringify(boolean));
};


