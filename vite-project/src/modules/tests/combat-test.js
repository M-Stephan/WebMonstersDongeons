import { GetPlayer } from "../models/players.js"
import { StartCombat } from "../utils/combat.js"
import { animals } from "../models/npc.js"

export function CombatTest() {
    const startCombat = StartCombat();
    console.log(startCombat);
};