import { OpenInventory, RefreshPlayerInventory, CloseInventory } from "./inventory-page.js";
import { Debug } from "../utils/debug.js";

// Function to create the app space into the windows
export function SetAppPage() {
    // Get app main element
    const app = document.getElementById("app");
    // Create new element to receive the game content
    const appMainContent = document.createElement("div");
    // add an id
    appMainContent.id = "app-main-content";
    // add the new element into the main element
    app.appendChild(appMainContent);
    // Create the player inventory
    RefreshPlayerInventory();
    // create an event when the key "I" was pushed
    window.addEventListener("keydown", function(event) {
        if (event.key === "i" || event.key === "I") {
            // Display the player inventory
            OpenInventory();
        };
    });
    //Create an event when the key "ESC" was pushed
    window.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            // Hide the playerInventory
            CloseInventory();
        };
    }); 
};