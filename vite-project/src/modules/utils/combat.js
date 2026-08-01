import { GetPlayer, UpdatePlayer } from "../models/players.js";
import { animals } from "../datas/npc.js";
import { powers } from "../datas/power_data.js";
import { Notify } from "./notify.js";
import { PlayerCombatPage, NpcCombatPage } from "../app/combat-page.js";
import { Debug } from "./debug.js";

export let combatStatus = false;

let npcInFighting;

export function UpdatePlayerFighting(boolean) {
    const playerIsFighting = localStorage.getItem("player_is_fighting");

    if (playerIsFighting) {
        localStorage.removeItem("player_is_fighting");
    }

    localStorage.setItem("player_is_fighting", JSON.stringify(boolean));
};

export function GetPlayerIsFighting() {
    let result;
    const playerIsFighting = localStorage.getItem("player_is_fighting");
    if (playerIsFighting) {
        result = JSON.parse(playerIsFighting);
    };

    return result;
};

export function StartCombat(npc) {
    UpdatePlayerFighting(true);
    npcInFighting = npc;
    Debug("info", "StartCombat() has been called");
    const playerStart = GetIfPlayerStart();
    SetNpcPv(npc);
    if (playerStart) {
        PlayerCombatPage(npc);
    } else {
        NpcCombatPage(npc);
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

export function PlayerHit(power) {
    const raw = GetPlayer();
    if (!raw) return;
    const playerData = JSON.parse(raw);
    playerData["metadata"]["stamina"] -= powers[power]["use_stam"];
    UpdatePlayer(playerData);
    const powerHit = powers[power]["force"];
    const totalHit = powerHit * animals["animals"][npcInFighting]["hit"];
    var npcPv = JSON.parse(localStorage.getItem("npc_pv"));
    npcPv -= totalHit;
    Notify("success", `Vous avez infligé ${totalHit} de dégat à votre adversaire`, `Il lui reste ${npcPv} PV`, 5);  
    UpdateNpcPv(npcPv);
};

export function NpcHit() {
    const raw = GetPlayer();
    if (!raw) return;
    const playerData = JSON.parse(raw);
    const npcHit = animals["animals"][npcInFighting]["force"];
    if (playerData["metadata"]["pv"] - npcHit <= 0) {
        playerData["metadata"]["pv"] = 0;
    } else {
        playerData["metadata"]["pv"] -= npcHit;
    }
    
    Notify("error", `Votre adversaire vous a infligé ${npcHit} de dégat.`, `Il te reste ${playerData["metadata"]["pv"]} PV`, 5);
    UpdatePlayer(playerData);
};

export function SetNpcPv(npc) {
    localStorage.setItem("npc_pv", JSON.stringify(animals["animals"][npc]["pv"]));
};

export function UpdateNpcPv(pv) {
    const npcPv = localStorage.getItem("npc_pv");

    if (npcPv) {
        localStorage.removeItem("npc_pv");
    }
    localStorage.setItem("npc_pv", JSON.stringify(pv));
};

export function RemoveNpcPv() {
    const npcPv = localStorage.getItem("npc_pv");

    if (npcPv) {
        localStorage.removeItem("npc_pv");
    }
}