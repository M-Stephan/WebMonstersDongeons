import { GetPlayer, GetPlayerAvancement } from "../models/players.js";
import { StartGame } from "../story/start-game.js";
import { Notify } from "./notify.js";
import { animals } from "../datas/npc.js";
import { LookIntoTheBuis } from "../story/1.1.js";
import { InventoryTutorial } from "../app/inventory-tutorial.js";

export function ContinueGame() {
    const raw = GetPlayer();

    if (!raw) return;

    const playerData = JSON.parse(raw); 

    const avancement = GetPlayerAvancement();

    switch (avancement) {
        case "1.0":
            StartGame(playerData);
            break;
        case "1.1":
            Notify("info", `Action`, "Tu regardes dans le buisson..", 3);
            LookIntoTheBuis();
            break;
        case "2.0":
            InventoryTutorial();
    }
};