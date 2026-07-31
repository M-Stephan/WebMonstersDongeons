import { OpenInventory, RefreshPlayerInventory, CloseInventory } from "./inventory-page.js";
import { Debug } from "../utils/debug.js";

export function SetAppPage() {
    const app = document.getElementById("app");
    const appMainContent = document.createElement("div");
    appMainContent.id = "app-main-content";
    app.appendChild(appMainContent);

    RefreshPlayerInventory();

    window.addEventListener("keydown", function(event) {
        if (event.key === "i" || event.key === "I") {
            OpenInventory();
        };
    });

        window.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            CloseInventory();
        };
    });

    
};