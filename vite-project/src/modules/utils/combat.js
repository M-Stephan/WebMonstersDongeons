import { GetPlayer, UpdatePlayer } from "../models/players.js";
import { animals } from "../datas/npc.js";
import { powers } from "../datas/power_data.js";
import { Notify } from "./notify.js";
import { PlayerCombatPage, NpcCombatPage } from "../app/combat-page.js";

export let combatStatus = false;

let npcPv;

export function StartCombat(npc) {
    npcPv = animals["animals"][npc]["pv"];
    const playerStart = GetIfPlayerStart();
    if (playerStart) {
        PlayerCombatPage();
    } else {
        NpcCombatPage();
    };
};

function GetIfPlayerStart() {
    const rand = Math.round(Math.random() * 100);
    let result;

    if (rand <= 50) {
        result = true;
    } else {
        result = false;
    };

    return result;
};

export function PlayerHit(power, npc) {
    const powerHit = powers[power][force];
    const totalHit = powerHit * animals["animals"][npc]["hit"]
    npcPv -= totalHit;
    Notify("success", `Vous avez infligé ${totalHit} de dégat à votre adversaire`, `Il lui reste ${npcPV} PV`, 5);  
};

export function NpcHit(power, npc) {
    const raw = GetPlayer();
    if (!raw) return;
    const playerData = JSON.parse(raw);
    const npcHit = animals["animals"][npc][force];
    playerData["metadata"]["pv"] -= npcHit;
    Notify("error", `Votre adversaire vous a infligé ${npcHit} de dégat.`, `Il te reste ${playerData["metadata"]["pv"]} PV`, 5);
    UpdatePlayer(playerData);
    PlayerHit(power, npc);
};