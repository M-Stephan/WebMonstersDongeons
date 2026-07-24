export function SetAppPage() {
    const app = document.getElementById("app");
    const appMainContent = document.createElement("div");
    appMainContent.id = "app-main-content";
    app.appendChild(appMainContent);
};