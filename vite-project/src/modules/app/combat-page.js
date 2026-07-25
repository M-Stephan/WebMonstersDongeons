import { StartCombat } from "../utils/combat";
import { animals } from "../models/npc.js"

export function SetCombatPage(npc) {
    document.body.style.backgroundImage = `url("./combat.jpg")`;
    const combat = StartCombat();
    if (combat === "player") {
        PlayerCombatPage();
    } else if (combat === "npc") {
        NpcCombatPage()
    }
};

function PlayerCombatPage() {
    const app = document.getElementById("app-main-content");
    app.innerHTML = ``;
}

function NpcCombatPage() {
    const app = document.getElementById("app-main-content");
    app.innerHTML = ``;
}