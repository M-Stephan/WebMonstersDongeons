import { PlayerTests } from "./player-test.js";
import { NotifyTest } from "./notify-test.js";
import { getInventoryTest } from "./inventory-tests.js";

export function MainTests() {
    const tests = {
        notify: false,
        player: false,
        inventory: false
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
            getInventoryTest();
        }, 5000);
    };
};