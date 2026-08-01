import { RefreshPlayerInventory } from "../app/inventory-page.js";
import { SetMainMenuOpened } from "../models/inventory.js";
import { GetPlayer, UpdatePlayer } from "../models/players.js";
import { StartCombat, UpdatePlayerFighting} from "../utils/combat.js";

export function LookIntoTheBuis() {
    function SetContent() {
        SetMainMenuOpened(false);
        UpdatePlayerFighting(false)
        // Get the app space
        const app = document.getElementById("app-main-content");

        // Create the app content
        app.innerHTML = `
            <h1 id="story11-title">Téméraire!</h1>
            <div id="story11-description">
                <p>
                    Tu as decidé de regarder dans le buisson d'où provenait le bruit.
                    C'était un sanglier! Il n'a pas l'air très sympatique..
                    Tu ne vas pas pouvoir fuir cette fois.. Le Combat Commence!
                </p>
                <button id="combat-roar-into-the-buis">Combattre le sanglier dans le buisson.</button>
            </div>
        `;

        // Refresh the inventory
        RefreshPlayerInventory();

        // Get the button to start the fight
        const fightBtn = document.getElementById("combat-roar-into-the-buis");

        // Add an event to start the fight when the user click on the button
        fightBtn.addEventListener("click",  function() {
            const raw = GetPlayer();
            if (!raw) return;
            const playerData = JSON.parse(raw);
            playerData["metadata"]["stamina"] -= 5;
            UpdatePlayer(playerData);
            StartCombat("roar");
        });
    };
    
    setTimeout(() => {
        SetContent();
    }, 3000);
}