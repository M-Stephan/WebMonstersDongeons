import { Debug } from "./debug.js";
import { powers } from "../models/power_data.js";
import { animals } from "../models/npc.js";
import { Notify } from "./notify.js";
import { GetPlayer, UpdatePlayer } from "../models/players.js";

export function StartCombat() {
    let randomStart = Math.round(Math.random() * 10);
    if (randomStart <= 5) {
        return "player";
    } else {
        return "npc";
    };
};

export function PlayerHit(power, npc) {
    const raw = GetPlayer();
    if (!raw) return
    const playerData = JSON.parse(raw);

    const hit = powers[power]["force"] * animals[npc]["hit"];
    const useStam = powers[power]["use_stam"];

    Notify("success", "Touché!", `Tu as mit un ${powers[power]["label"]} au ${animals[npc]["label"]}<br>il a perdu ${hit}pv<br>Tu as perdu ${useStam} d'energie.`, 7)
    
    playerData["metadata"]["stamina"] -= useStam;
    
    UpdatePlayer(playerData);

    return hit;
};

export function NpcHit(npc) {
    const raw = GetPlayer();
    if (!raw) return
    const playerData = JSON.parse(raw);
    const hit = animals[npc]["force"];

    playerData["metadata"]["pv"] -= hit;
    UpdatePlayer(playerData);
};

export function NpcLooseCombat() {

};

export function PlayerLooseCombat(metadata) {
    let sentence;
    if (metadata == "stamina") {
        sentence = "Vous n'avez plus d'énergie."
    } else if (metadata == "pv") {
        sentence = "Vous êtes dans le coma. Vous vous reveillerez au dernier point de soin.";

    };
    console.log("")
};