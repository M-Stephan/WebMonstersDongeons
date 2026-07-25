import { Debug } from "../utils/debug.js";
import { GetPlayerInventory, RemoveInventoryItem, AddInventoryItem, UseConsummable } from "../utils/inventory.js";
import { PlayerTests } from "./player-test.js"

export function GetInventoryTest() {
    let playerInventory = GetPlayerInventory();
    console.log(playerInventory);
    RemoveInventoryItem("water", 3);
    setTimeout(() => {
        RemoveInventoryItem("bread", 8);
    }, 9000);
    setTimeout(() => {
        AddInventoryItem("water", 3);
    }, 18000);
    setTimeout(() => {
        RemoveInventoryItem("bread", 3);
    }, 27000);
    
    setTimeout(() => {
        UseConsummable("water");
    }, 36000);
};