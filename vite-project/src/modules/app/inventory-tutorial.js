import { SetMainMenuOpened } from "../models/inventory.js";
import { UpdatePlayerFighting } from "../utils/combat.js";
import { CloseInventory, OpenInventory, RefreshPlayerInventory } from "./inventory-page.js";

export function InventoryTutorial() {
    SetMainMenuOpened(false);
    UpdatePlayerFighting(false);
    const app = document.getElementById("app-main-content");
    app.innerHTML = ``;
    RefreshPlayerInventory();
};