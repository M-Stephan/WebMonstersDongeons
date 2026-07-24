import { GetPlayer, UpdatePlayer } from "../models/players.js";
import { Debug } from "./debug.js";
import { Notify } from "./notify.js";
import { items } from "../models/items.js";

export function getPlayerInventory() {
    const raw = GetPlayer();
    if (!raw) return null; // évite le crash

    const player = JSON.parse(raw);
    Debug("success", "getPlayerInventory has successfully returned inventory:" + JSON.stringify(player.inventory));
    return player.inventory;
};

export function getInventoryItem(itemNeeded, count) {
    const inventory = getPlayerInventory();
    if (!inventory) return false; // évite le crash si player=null

    return inventory[itemNeeded] >= count;
};

export function removeInventoryItem(itemNeeded, count) {
    let hasItemAndCount = getInventoryItem(itemNeeded, count);
    if (hasItemAndCount) {
        var player = JSON.parse(GetPlayer());
        var inventory = player.inventory;
        inventory[itemNeeded] = inventory[itemNeeded] - count;
        UpdatePlayer(player);
        inventory[itemNeeded] <= 5 ? Notify("error","Attention", `Il te reste ${inventory[itemNeeded]} ${items[itemNeeded]["label"]}`, 5) : Notify("info", "Information", `Tu as utilisé ${count} ${items[itemNeeded]["label"]}`, 5) ; 
    } else {
        Notify("error","Ce n'est pas possible.", `Tu n'a pas assez ou aucun ${items[itemNeeded]["label"]} sur toi!`, 8);
    };
};

export function addInventoryItem(item, count) {
    const raw = GetPlayer();
    if (!raw) return;

    const player = JSON.parse(raw);
    const inventory = player.inventory;

    if (inventory[item]) {
        inventory[item] += count;
    } else {
        inventory[item] = count;
    }

    UpdatePlayer(player);

    Notify("success", "Inventaire", `Tu as reçu ${count} ${items[item]["label"]}.`, 5);
}

