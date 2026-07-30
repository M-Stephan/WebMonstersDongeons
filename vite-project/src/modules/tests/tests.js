import { PlayerTests } from "./player-test.js";
import { NotifyTest } from "./notify-test.js";
import { GetInventoryTest } from "./inventory-tests.js";
import { CombatTest } from "./combat-test.js";

export function MainTests() {
    const tests = {
        notify: false,
        player: false,
        inventory: true,
        combat: false
    };

    if (tests.notify) {
        setTimeout(() => {
            NotifyTest();
        }, 3000);
    };
    
    if (tests.player) {
        setTimeout(() => {
            PlayerTests();
        }, 5000);
    };
    
    if (tests.inventory) {
        setTimeout(() => {
            GetInventoryTest();
        }, 5000);
    };
    
    if (tests.combat) {
        setTimeout(() => {
            CombatTest();
        }, 5000);
    };


};