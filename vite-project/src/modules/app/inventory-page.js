import { combatStatus } from "../utils/combat.js";
import { Notify } from "../utils/notify.js";

export function SetInventoryPage() {
    if (combatStatus) {
        Notify("error", "Vous êtes en combat", "L'inventaire ne peut pas être ouvert", 5);
    }
}