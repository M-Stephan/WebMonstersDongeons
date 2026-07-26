import { NpcHit, PlayerHit, StartCombat, NpcLooseCombat } from "../utils/combat.js";
import { animals } from "../models/npc.js"
import { GetPlayer } from "../models/players.js";
import { GetPlayerPowers } from "../models/powers.js";
import { powers } from "../models/power_data.js";
import { Debug } from "../utils/debug.js";
import { Notify } from "../utils/notify.js";
import { debugEnabled } from "../utils/debug.js";

let currentNpc;
let npcPv;

export function SetFirstCombatPage(npc) {
    currentNpc = npc
    npcPv = animals[currentNpc]["pv"];
    let sentence;

    if (currentNpc === "roar") {
        sentence = "Tu as regardé dans le buisson, le bruit provenait d'un sanglier!";
    } else if (currentNpc === "rabbit") {
        sentence = "Un lapin!";
    };

    setTimeout(() => {
        document.body.style.backgroundImage = `url("./combat.jpg")`;
        const app = document.getElementById("app-main-content");
        let combat = StartCombat();

        let starter;

        if (combat === "player") {
            starter = "Tu commences.."
        } else if (combat === "npc") {
            starter = `Le ${animals[currentNpc]["label"]} commence..`;
        };

        app.innerHTML = `
            <div id="start-combat">
                <div id="start-combat-content">
                    <p>${sentence}</p>
                    <p>Tu ne peux pas fuir, le combat commence...</p>
                </div>
                    <p>${starter}</p>
            </div>
            <button id="first-combat">Combattre le ${animals[currentNpc]["label"]}</button>
        `;

        const startCombat = document.getElementById("start-combat");
        startCombat.style.backgroundImage = `url("/parchemin.png")`;
        const combatBtn = document.getElementById("first-combat");
        combatBtn.addEventListener("click", function(){

            if (debugEnabled) {
                combat = "player";
            }

            if (combat === "player") {
                PlayerCombatPage();
            } else if (combat === "npc") {
                NpcCombatPage();
            };
        });
    }, 4000);
};


function PlayerCombatPage() {
    const app = document.getElementById("app-main-content");
    const playerPowers = GetPlayerPowers();
    let i = 0

    app.innerHTML = `
        <div id="player-combat">

        </div>
    `;

    playerPowers.forEach(currentPower => {

        const raw = GetPlayer();
        if (!raw) return
        const playerData = JSON.parse(raw);

        if (playerData["metadata"]["stamina"] <= 0) {
            PlayerLooseCombat("stamina");
        } else if (playerData["metadata"]["pv"] <= 0) {
            PlayerLooseCombat("pv");
        };

        // create page content
        const combatPage = document.getElementById("player-combat");
        const playerPower = document.createElement("button");

        playerPower.classList.add("power-card");
        playerPower.id = currentPower;

        playerPower.innerHTML = `
            <p>${powers[currentPower]["label"]}</p>
            <p>stam cost: ${powers[currentPower]["use_stam"]}</p>
            <p>hit: ${powers[currentPower]["force"]}</p>
        `;

        combatPage.appendChild(playerPower);

        playerPower.addEventListener("click", function() {
            combatPage.innerHTML = ``;
            let playerHit = PlayerHit(currentPower, currentNpc);
            npcPv -= playerHit;
            Debug("success", `You used ${powers[currentPower]["label"]} card`);
            console.log(npcPv);
            setTimeout(() => {
                NpcCombatPage();
            }, 7500);
        });
    });
}

function NpcCombatPage() {
    if (npcPv <= 0) {
        console.log("NPC LOOSE");
        return
        NpcLooseCombat();
    } else {
        const app = document.getElementById("app-main-content");
        const randomN = Math.round(Math.random() * 10);
        let sentence;

        if (randomN > 3) {
            
            sentence = `Le ${animals[currentNpc]["label"]} vous à infligé ${animals[currentNpc]["force"]} de dégats.`
            NpcHit(currentNpc);
        } else {
            sentence = `Le ${animals[currentNpc]["label"]} à raté son coup et ne vous a infligé aucun dégat.`;
        }
        
        app.innerHTML = `
            <div id="npc-combat" style="color:light-grey;">
                <p id="npc-combat-sentence">${sentence}</p>
            </div>
        `;
        const npcCombat = document.getElementById("npc-combat");
        npcCombat.style.backgroundImage = `url("./parchemin.png")`;

        setTimeout(() => {
            PlayerCombatPage();
        }, 8000);
    };
};