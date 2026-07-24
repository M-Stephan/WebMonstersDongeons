export function StartGame(playerData) {
    const app = document.getElementById("app-main-content");
    let ennemy;
    let race;
    const bodyStyle = document.body.style
    bodyStyle.backgroundImage = 'url("/parchemin.png")';
    bodyStyle.backgroundRepeat = "no-repeat";
    bodyStyle.backgroundSize;
    bodyStyle.backgroundColor = "#222222c9";

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
        <h4>
            ${playerData["firstname"]} ${playerData["lastname"]}, né dans un petit village isolé, au cœur d’un monde où les ${race} régnaient en maîtres.<br>
            Jusqu'au jour où tout a basculé!
        </h4>
        <p>
            Une horde ${ennemy} a attaqué le village, détruit chaque maison, massacré des innocents et tes parents ont péri en tentant de te protéger.<br>
            Trop jeune pour te battre, tu as du te cacher… et tu as survécu.<br>
            Depuis ce jour, tu as grandi seul, loin des autres, apprenant à vivre dans l’ombre et à te débrouiller par tes propres moyens.<br><br>

            Dix années de solitude, de survie, de silence.<br>
            Mais tu as décidé il y a peu de quitter ton refuge dans l'espoir de découvrir si d'autres ${race} sont encore en vie..<br><br>

            À l'instant, en cette fin d'après midi calme et ensoleillée, traversant une énorme forêt tu vois à moins de 2 kilomètres un énorme et magnifique royaume!<br>
            Quand soudain il y a du bruit dans les buissons...
        </p>

        <button class="start-game-btn-buis" id="watch-in-the-buis">Regarder dans le buisson</button><br><br>
        <button class="start-game-btn-castle" id="go-to-the-castle">Continuer sa route</button>
    `;
}