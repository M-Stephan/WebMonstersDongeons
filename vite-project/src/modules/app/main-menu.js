import { DeletePlayer } from "../models/players.js";
import { CreatePlayerForm } from "./create-player.js";
import { ContinueGame } from "../utils/continue-game.js";
import { GetIfMainMenuOpened, SetMainMenuOpened } from "../models/inventory.js";

export function MainMenu() {
    SetMainMenuOpened(true);
    
    const app = document.getElementById("app-main-content");
    const div = document.createElement("div");
    div.id = "main-menu-page";
    div.innerHTML = `
        <h1>Monsters & Dongeons</h1>
        <h2>Menu Principal</h2>
        <div id="main-menu">
            <button class="main-menu-btn" id="create-player">Commencer la partie</button>
            <button class="main-menu-btn" id="continue-game">Continuer la partie</button>
            <button class="main-menu-btn" id="delete-player">Supprimer la partie</button>
            <button class="main-menu-btn" id="parameters">Paramètres</button>
        </div>
    `;
    app.appendChild(div);
    const createBtn = document.getElementById("create-player");
    const continueBtn = document.getElementById("continue-game");
    const deleteBtn = document.getElementById("delete-player");
    const parametersBtn = document.getElementById("parameters");

    createBtn.addEventListener("click", function() {
        let response = confirm("Ceci ecrasera la partie existante, continuer?");
        if (!response) return;
        CreatePlayerForm();
    });

    continueBtn.addEventListener("click", function() {
        ContinueGame();
    });    
    
    deleteBtn.addEventListener("click", function() {
        DeletePlayer();
    });
        
};

