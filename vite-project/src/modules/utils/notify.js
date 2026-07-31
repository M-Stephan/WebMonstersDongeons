import { Debug } from "./debug.js";

export function CreateNotifyBox() {
    Debug("info", "function CreateNotifyBox has been called", true);
    const app = document.getElementById("app");
    app.innerHTML = `
        <div id="notify-box" class="hide-notify">
        </div>
    `;
};

function HideNotify() {
    Debug("info", "function HideNotify has been called", true);
    const notifyBox = document.getElementById("notify-box");
    notifyBox.innerHTML = ``;
    notifyBox.classList.remove("show-notify");
    notifyBox.classList.add("hide-notify");
};

function ShowNotify(type, title, description) {
    Debug("info", "function ShowNotify has been called", true);

    let color;
    const notifyBox = document.getElementById("notify-box");

    switch (type) {
        case "info":
            color = "#e9b961";
            break;
        case "success":
            color = "#82c57e";
            break;
        case "error":
            color = "#ec5f5f";
            break;
        default:
            color = "#ad6beb";
            break;
    };
    
    notifyBox.classList.remove("hide-notify");
    notifyBox.classList.add("show-notify");

    const notify = document.createElement("div");
    notify.classList.add("notify");

    let toArrayWordId = title.toLowerCase().split(" ");
    let uniqueWordId = toArrayWordId.join("_");

    notify.id = "notify_" + uniqueWordId;

    notify.innerHTML = `
        <h4 style="color:${color};">${title}</h4>
        <p style="color:${color};">${description}</p>
    `;
    notifyBox.appendChild(notify);
};

export function Notify(type, title, description, duration) {
    Debug("info", "function Notify has been called", true);
    ShowNotify(type, title, description);
    setTimeout(() => {
        HideNotify()
    }, duration * 950);
};
