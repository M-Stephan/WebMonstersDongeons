import { Debug } from "../utils/debug.js";
import { getPlayerInventory, removeInventoryItem, addInventoryItem} from "../utils/inventory.js";
import { PlayerTests } from "./player-test.js"

export function getInventoryTest() {
    let playerInventory = getPlayerInventory();
    console.log(playerInventory);
    removeInventoryItem("water", 3);
    setTimeout(() => {
        removeInventoryItem("bread", 8);
    }, 9000);
    setTimeout(() => {
        addInventoryItem("water", 3);
    }, 18000);
    setTimeout(() => {
        removeInventoryItem("bread", 3);
    }, 27000);
};