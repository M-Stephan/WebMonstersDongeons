import { StartGame } from "../game/start-game.js";
import { GetPlayer, CreatePlayer, DeletePlayer } from "../models/players.js";
import { Debug } from "../utils/debug.js";

export function CreatePlayerForm() {
    const app = document.getElementById("app-main-content");
    app.innerHTML = `
        <h1>Monsters & Dongeons</h1>
        <h2>Création de personnage</h2>
        <form id="create-player-form">

            <label for="username-input">Nom d'utilisateur</label>
            <input type="text" id="username-input">
            
            <label for="firstname-input">Prénom du personnage</label>
            <input type="text" id="firstname-input">
            
            <label for="lastname-input">Nom du personnage</label>
            <input type="text" id="lastname-input">

            <div>
                <p>Choisir la race:</p>
                <label for="race-input">Troll</label>
                <input type="radio" name="race" id="troll">
                <label for="race-input">Elfe</label>
                <input type="radio" name="race" id="elfe">
                <label for="race-input">Nain</label>
                <input type="radio" name="race" id="nain">
                <label for="race-input">Humain</label>
                <input type="radio" name="race" id="human">
            </div>
            <div>
                <p>Choisir l'élément:</p>
                <p>Si vous avez choisi la race humaine la classe d'élément est inactive</p>
                <label for="type-input">Eau</label>
                <input type="radio" name="type" id="water">
                <label for="type-input">Terre</label>
                <input type="radio" name="type" id="dirt">
                <label for="type-input">Feu</label>
                <input type="radio" name="type" id="fire">
                <label for="type-input">Air</label>
                <input type="radio" name="type" id="air">
            </div>
            <input type="submit", id="create-submit" value="Créer le personnage">
        </form>
    `;

    const form = document.getElementById("create-player-form");

    form.addEventListener("submit", function(e){
        e.preventDefault();

        const username = document.getElementById("username-input").value;
        const firstname = document.getElementById("firstname-input").value;
        const lastname = document.getElementById("lastname-input").value;

        const race = document.querySelector('input[name="race"]:checked');
        let inputType = document.querySelector('input[name="type"]:checked');
        let type;

        if (race.id == "human") {
            type = "none";
        } else {
            type = inputType.id;
        };

        let data = {
            userName: username,
            firstName: firstname,
            lastName: lastname,
            race: race.id,
            type: type,
            stats: {
                stamina: 100,
                mana: 0,
                hunger: 200,
                thirst: 200
            }
        };
        CreatePlayer(data);
        
        const playerData = GetPlayer();
        StartGame(playerData);
    });
}