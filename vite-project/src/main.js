import { Notify, CreateNotifyBox } from "./modules/utils/notify.js";

CreateNotifyBox();

Notify("info", "Test", "This is a notify test", 6);

setTimeout(() => { 
    Notify("error", "Test", "This is a notify test", 6);
}, 1500);

setTimeout(() => { 
    Notify("success", "Test", "This is a notify test", 6);
}, 3000);

setTimeout(() => { 
    Notify("", "Test", "This is a notify test", 6);
}, 4500);
