import { StartCombat } from "../utils/combat";
import { animals } from "../models/npc.js"
import { GetPlayer } from "../models/players.js";
import { GetPlayerPowers } from "../models/powers.js";

export function SetFirstCombatPage(npc) {
    let sentence;
    if (npc === "roar") {
        sentence = "Tu as regardé dans le buisson, le bruit provenait d'un sanglier!";
    } else if (npc === "rabbit") {
        sentence = "Un lapin!";
    }

    setTimeout(() => {
        document.body.style.backgroundImage = `url("./combat.jpg")`;
        const app = document.getElementById("app-main-content");
        const combat = StartCombat();
        let starter;

        if (combat === "player") {
            starter = "Tu commences.."
        } else if (combat === "npc") {
            starter = `Le ${animals[npc]["label"]} commence..`;
        };

        app.innerHTML = `
            <div id="start-combat">
                <div id="start-combat-content">
                    <p>${sentence}</p>
                    <p>Tu ne peux pas fuir, le combat commence...</p>
                </div>
                    <p>${starter}</p>
            </div>
            <button id="first-combat">Combattre le ${animals[npc]["label"]}</button>
        `;

        const startCombat = document.getElementById("start-combat");
        startCombat.style.backgroundImage = `url("/parchemin.png")`;
        const combatBtn = document.getElementById("first-combat");
        combatBtn.addEventListener("click", function(){
            //debug mode (delete after use)
            let combat = "player";

            if (combat === "player") {
                PlayerCombatPage();
            } else if (combat === "npc") {
                NpcCombatPage();
            };
        });
    }, 3000);
};


function PlayerCombatPage() {
    const app = document.getElementById("app-main-content");
    const powers = GetPlayerPowers();
    let i = 0
    powers.forEach(power => {
            const playerPower = document.createElement("div");
            playerPower.classList.add("power-card");
            const combatPage = document.getElementById("player-combat");
    });

    app.innerHTML = `
        <div id="player-combat">

        </div>
    `;
}


function NpcCombatPage() {
    const app = document.getElementById("app-main-content");
    app.innerHTML = `
        <div id="npc-combat">
        
        </div>
        `;
}