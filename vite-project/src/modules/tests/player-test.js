import { CreatePlayer, GetPlayer, UpdatePlayer, DeletePlayer } from "../models/players.js";
import { Debug } from "../utils/debug.js";
import { Notify } from "../utils/notify.js";


export function PlayerTests() {

    let player;
    const data = {
        userName: "neodarkcrow",
        firstName: "Neo",
        lastName: "Carter",
        race: "human",
        type: "none",
        stats: {
            stamina: 100,
            mana: 0,
            hunger: 200,
            thirst: 200
        }
    };
    
    CreatePlayer(data);

    player = GetPlayer();

    Debug("success", JSON.stringify(player), false);

    player["metadata"]["thirst"] = 180;
    player["metadata"]["hunger"] = 180;
    player["metadata"]["stamina"] = 75;

    UpdatePlayer(player);
    Debug("success", JSON.stringify(player), false);
    setTimeout(() => {
        Notify("success", "Création de personnage", "Felicitation ton personnage a bien été créé", 6);
    }, 5000);
}