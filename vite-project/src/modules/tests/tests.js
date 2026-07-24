import { PlayerTests } from "./player-test.js";
import { NotifyTest } from "./notify-test.js";

export function MainTests() {
    const tests = {
        notify: false,
        player: false
    };

    if (tests.notify) {
        setTimeout(() => {
            NotifyTest();
        }, 5000);
    };
    
    if (tests.player) {
        setTimeout(() => {
            PlayerTests();
        }, 5000);
    };
};