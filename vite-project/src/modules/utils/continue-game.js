import { GetPlayer, GetPlayerAvancement } from "../models/players.js";
import { StartGame } from "../story/start-game.js";
import { Notify } from "./notify.js";
import { animals } from "../datas/npc.js";
import { LookIntoTheBuis } from "../story/1.1.js";

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
            LookIntoTheBuis();
            break;
    }
};