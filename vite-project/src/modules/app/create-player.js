import { StartGame } from "../app/start-game.js";
import { GetPlayer, CreatePlayer, DeletePlayer } from "../models/players.js";
import { Debug } from "../utils/debug.js";

// Create the form to create player
export function CreatePlayerForm() {
    // Get app space
    const app = document.getElementById("app-main-content");

    // Write the form into the space
    app.innerHTML = `
        <h1>Monsters & Dongeons</h1>
        <h2>Création de personnage</h2>
        <form id="create-player-form">

            <div id="form-names">
                <div>
                    <label for="username-input">Nom d'utilisateur</label>
                    <input type="text" id="username-input">
                </div>
                <div>
                    <label for="firstname-input">Prénom du personnage</label>
                    <input type="text" id="firstname-input">
                </div>
                <div>
                    <label for="lastname-input">Nom du personnage</label>
                    <input type="text" id="lastname-input">
                </div>
            <div>
            
            <p>Si vous choisissez la race humaine la classe d'élément est inactive</p>
            <div id="race-elem">
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
                    <label for="type-input">Eau</label>
                    <input type="radio" name="type" id="water">
                    <label for="type-input">Terre</label>
                    <input type="radio" name="type" id="dirt">
                    <label for="type-input">Feu</label>
                    <input type="radio" name="type" id="fire">
                    <label for="type-input">Air</label>
                    <input type="radio" name="type" id="air">
                </div>
            </div>
            <input type="submit", id="create-submit" value="Créer le personnage">
        </form>
    `;
    // Get the for by id
    const form = document.getElementById("create-player-form");

    // Add an event when the form has been subitted
    form.addEventListener("submit", function(e){
        // Prevent the window from reloading
        e.preventDefault();

        // get username from the form
        const username = document.getElementById("username-input").value;
        // get firstname from the form
        const firstname = document.getElementById("firstname-input").value;
        // get lastname from the form
        const lastname = document.getElementById("lastname-input").value;
        // get race from the form
        const race = document.querySelector('input[name="race"]:checked');
        // get type from the form
        let inputType = document.querySelector('input[name="type"]:checked');
        // initialize type variable
        let type;

        // check if  the race is human
        if (race.id == "human") {
            // if human type = none -- the human has not a magic powers
            type = "none";
        } else {
            // else type = input id
            type = inputType.id;
        };

        // create table
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

        // Create player with data table
        CreatePlayer(data);
        
        // get player from localStorage
        const raw = GetPlayer();

        // if player does not exist stop all
        if (!raw) return;

        // else JSON parse the datas
        const playerData = JSON.parse(raw);
        
        // start the game with parsed player datass
        StartGame(playerData);
    });
};