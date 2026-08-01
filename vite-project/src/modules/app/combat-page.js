import { GetPlayer, UpdatePlayer } from "../models/players";
import { Debug } from "../utils/debug.js";
import { powers } from "../datas/power_data.js";
import { NpcHit, PlayerHit, RemoveNpcPv, UpdatePlayerFighting } from "../utils/combat.js";
import { Notify } from "../utils/notify.js";
import { animals } from "../datas/npc.js";
import { MainMenu } from "./main-menu.js";
import { ContinueGame } from "../utils/continue-game.js";
import { AddItemCount } from "../models/inventory.js";

export function PlayerCombatPage(npc) {
    // Get app space
    const app = document.getElementById("app-main-content");
    // Get playerData
    const raw = GetPlayer();
    if (!raw) return;
    const playerData = JSON.parse(raw);

    // If the player is Dead
    if (playerData["metadata"]["pv"] <= 0) {
        Notify(
            "error",
            `Combat contre le ${animals["animals"][npc]["label"]}`,
            "Tu n'a pas survecu à ce combat, retour au menu principal",
            5
        );
        app.innerHTML = ``;
        MainMenu();
        return;
    };

    // Get player Powers
    const playerPowers = playerData["powers"];
    // Create power cards space
    app.innerHTML = `<div id="power-cards"><div>`;
    // Get power cards space 
    const powerCards = document.getElementById("power-cards");
    // For each power into powers list
    playerPowers.forEach(playerPower => {
        // Create power card
        const powerCard = document.createElement("button");
        powerCard.id = `power-card-${playerPower}`;
        powerCard.classList.add("power-card");
        // Create power card content
        powerCard.innerHTML = `
            <p>${powers[playerPower]["label"]}</p>
            <p>Force initiale: ${powers[playerPower]["force"]}</p>
            <p>Utilise ${powers[playerPower]["use_stam"]} points d'énergie</p>
        `;
        // add power card into power cards space
        powerCards.appendChild(powerCard);
        // Add an event when th user click on the button for each power
        powerCard.addEventListener("click", function() {
            // Hit the NPC
            PlayerHit(playerPower);
            // At time Npc can fight
            NpcCombatPage(npc);
        });
    });
};

export function NpcCombatPage(npc) {
    const npcPv = localStorage.getItem("npc_pv")
    const app = document.getElementById("app-main-content");

    if (npcPv <= 0) {
        // Get playerData
        const raw = GetPlayer();
        if (!raw) return;
        const playerData = JSON.parse(raw);
        const avancement = playerData["avancement"];
        const newArray = avancement.split(".");
        const newAvancement = [ (Number(newArray[0]) + 1), 0];
        playerData["avancement"] = newAvancement.join(".");
        UpdatePlayer(playerData);
        const array = animals["animals"][npc]["loot"];
        Notify("info", `Felicitation`, `Tu as vaincu le ${animals["animals"][npc]["label"]}`, 3);
        array.forEach(loot => {
            const rand = Math.round(Math.random() * 5);
            AddItemCount(loot, rand);
        });
        RemoveNpcPv();
        app.innerHTML = ``;
        ContinueGame();
        return;
    };
    app.innerHTML = ``;
    setTimeout(() => {
        NpcHit();
    }, 5000);
    setTimeout(() => {
        PlayerCombatPage(npc);
    }, 8000);
};