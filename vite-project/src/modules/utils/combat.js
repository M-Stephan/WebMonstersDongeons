import { Debug } from "./debug?js";

export function StartCombat() {
    let randomStart = Math.round(Math.random(1) * 10);
    if (randomStart <= 5) {
        return "player";
    } else {
        return "npc";
    }
}