import { Debug } from "../utils/debug.js";
import { GetPlayer } from "./players.js";

export function GetPlayerPowers() {
    const raw = GetPlayer();
    if (!raw) return;
    
    const player = JSON.parse(raw);
    
    const powers = player.powers;
    Debug("success", `GetPlayerPowers() returned: ${player.powers}`)
    return powers;
}