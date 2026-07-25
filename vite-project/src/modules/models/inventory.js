import { GetPlayer, UpdatePlayer } from "./players.js";
import { Debug } from "../utils/debug.js";
import { Notify } from "../utils/notify.js";
import { items } from "./items.js";

export function GetPlayerInventory() {
    const raw = GetPlayer();
    if (!raw) return null;

    const player = JSON.parse(raw);
    Debug("success", "getPlayerInventory has successfully returned inventory:" + JSON.stringify(player.inventory));
    return player.inventory;
};

export function GetInventoryItem(itemNeeded, count) {
    const inventory = GetPlayerInventory();
    if (!inventory) return false;

    return inventory[itemNeeded] >= count;
};

export function RemoveInventoryItem(itemNeeded, count) {
    let hasItemAndCount = GetInventoryItem(itemNeeded, count);
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

export function AddInventoryItem(item, count) {
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

export function UseConsummable(item) {
    let hasItemAndCount = GetInventoryItem(item, 1)
    
    if (hasItemAndCount) {
        const raw = GetPlayer();
        if (!raw) return;
        const player = JSON.parse(raw);

        switch (
            items[item]["type"]) {
            case 'eat':
                player.metadata["hunger"] = player.metadata["hunger"] + items[item]["upStats"];
                break;
            case 'drink':
                player.metadata["thirst"] = player.metadata["thirst"] + items[item]["upStats"];
                break;
            case 'heal':
                player.metadata["pv"] = player.metadata["pv"] + items[item]["upStats"];
                break;
            case 'mana':
                player.metadata["mana"] = player.metadata["mana"] + items[item]["upStats"];
                break;
            case 'exp':
                player.metadata["rp"] = player.metadata["rp"] + items[item]["upStats"];
                break;
            case 'stamina':
                player.metadata["stamina"] = player.metadata["stamina"] + items[item]["upStats"];
                break;
        }
        RemoveInventoryItem(item, 1);
        UpdatePlayer(player);
    }
}

