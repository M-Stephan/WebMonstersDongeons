import { GetPlayerHasItemCount, AddItemCount, RemoveItemCount } from "../models/inventory.js";
import { Debug } from "../utils/debug.js";
import { PlayerTests } from "./player-test.js"

export function GetInventoryTest() {
    const hasItem = GetPlayerHasItemCount("water", 5);
    const hasNotItem = GetPlayerHasItemCount("water", 11);

    Debug("success", hasItem);
    
    Debug("success", hasNotItem);

    AddItemCount("water", 5);

    AddItemCount("wood", 5);
    
    AddItemCount("bulb", 1);

    RemoveItemCount("water", 5);

};