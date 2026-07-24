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
    let parsedPlayer = JSON.parse(player)

    console.log(parsedPlayer);

    parsedPlayer["metadata"]["thirst"] = 180;
    parsedPlayer["metadata"]["hunger"] = 180;
    parsedPlayer["metadata"]["stamina"] = 75;

    UpdatePlayer(parsedPlayer);
    
    Debug("success", JSON.stringify(player), false);

    setTimeout(() => {
        Notify("success", "Création de personnage", "Felicitation ton personnage a bien été créé", 6);
    }, 5000);
}