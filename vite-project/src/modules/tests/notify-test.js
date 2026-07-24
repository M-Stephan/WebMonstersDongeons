import { Notify, CreateNotifyBox } from "../utils/notify.js";

// set to true to test the notify system
export function NotifyTest() {
    CreateNotifyBox();
    Notify("info", "Test", "This is a notify test", 6);

    setTimeout(() => { 
        Notify("error", "Test 1", "This is a notify test", 6);
    }, 1500);

    setTimeout(() => { 
        Notify("success", "Test 2", "This is a notify test", 6);
    }, 3000);

    setTimeout(() => { 
        Notify("", "Test 3", "This is a notify test", 6);
    }, 4500);
};
