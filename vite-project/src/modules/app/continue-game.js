import { GetPlayer, GetPlayerAvancement } from "../models/players.js";
import { StartGame } from "../game/start-game.js";
import { SetFirstCombatPage } from "./first-combat-page.js";
import { Notify } from "../utils/notify.js";
import { animals } from "../models/npc.js";

export function ContinueGame() {
    const raw = GetPlayer();
    const npc = "roar"
    if (!raw) return;
    const playerData = JSON.parse(raw); 

    const avancement = GetPlayerAvancement();

    switch (avancement) {
        case "1.0":
            StartGame(playerData);
            break;
        case "1.1":
            setTimeout(() => {
                Notify('info', `Le combat contre ${animals[npc]["label"]} commence dans:`, "3", 1)
            }, 1000);
            setTimeout(() => {
                Notify('info', `Le combat contre ${animals[npc]["label"]} commence dans:`, "2", 1)
            }, 2000);
            setTimeout(() => {
                Notify('info', `Le combat contre ${animals[npc]["label"]} commence dans:`, "1", 1)
            }, 3000);
            SetFirstCombatPage(npc);
            break;
    }
};