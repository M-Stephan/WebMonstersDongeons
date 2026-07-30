import { GetPlayer, GetPlayerAvancement } from "../models/players.js";
import { StartGame } from "../app/start-game.js";
import { Notify } from "./notify.js";
import { animals } from "../datas/npc.js";

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
    }
};