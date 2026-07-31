import { Notify } from "../utils/notify.js";
import { GetPlayer, UpdatePlayer } from "../models/players.js";
import { animals } from "../datas/npc.js";
import { RefreshPlayerInventory } from "./inventory-page.js";
import { SetMainMenuOpened } from "../models/inventory.js";

export function StartGame(playerData) {
    SetMainMenuOpened(false);
    const app = document.getElementById("app-main-content");
    let ennemy;
    let race;

    switch (playerData["race"]) {
        case "human":
            race = "humains";
            ennemy = "de nains";
            break;
        case "nain":
            race = "nains";
            ennemy = "d'humains";
            break;
        case "troll":
            race = "trolls";
            ennemy = "d'elfes";
            break;
        case "elfe":
            race = "elfes";
            ennemy = "de trolls";
            break;
    }

    app.innerHTML = `
        <h1>Monsters & Dongeons</h1>
        <h2>Le commencement</h2>

        <p>
            ${playerData["firstname"]} ${playerData["lastname"]}, né dans un petit village isolé, au cœur d’un monde où les ${race} régnaient en maîtres.<br>
            Jusqu'au jour où tout a basculé!<br>

            Une horde ${ennemy} a attaqué le village, détruit chaque maison, massacré des innocents et tes parents ont péri en tentant de te protéger.<br>
            Trop jeune pour te battre, tu as du te cacher… et tu as survécu.<br>
            Depuis ce jour, tu as grandi seul, loin des autres, apprenant à vivre dans l’ombre et à te débrouiller par tes propres moyens.<br><br>

            Dix années de solitude, de survie, de silence.<br>
            Mais tu as décidé il y a peu de quitter ton refuge dans l'espoir de découvrir si d'autres ${race} sont encore en vie..<br><br>

            À l'instant, en cette fin d'après midi calme et ensoleillée, traversant une énorme forêt tu vois à moins de 2 kilomètres un grand et magnifique royaume!<br>
            Quand soudain il y a du bruit dans les buissons...
        </p>
        <div>
            <button class="start-game-btn-buis" id="watch-in-the-buis">Regarder dans le buisson<br><i>(stamina -5)</i></button>
            <button class="start-game-btn-castle" id="go-to-the-castle">Continuer sa route<br><i>(stamina -10)</i></button>
        </div>    
    `;
    
    RefreshPlayerInventory();

    const buisBtn = document.getElementById("watch-in-the-buis");
    const castleBtn = document.getElementById("go-to-the-castle");

    buisBtn.addEventListener("click", function() {
        Notify("info", `Action`, "Tu regardes dans le buisson..", 3);
        playerData["metadata"]["stamina"] = playerData["metadata"]["stamina"] - 5;
        playerData["avancement"] = "1.1";
        UpdatePlayer(playerData);
        // START THE FIRST COMBAT WITH DE ROAR HERE
        
    })

    castleBtn.addEventListener("click", function() {
        playerData["metadata"]["stamina"] = playerData["metadata"]["stamina"] - 10;
        playerData["avancement"] = "1.2";
        UpdatePlayer(playerData);
        Notify("info", `Action`, "Tu continue ton chemin..", 3);
        // CONTINUE THE ROAD
    })
}