import { Debug } from "../utils/debug.js";
import { Notify } from "../utils/notify.js";

export function CreatePlayer(data) {
    Debug("info", "function CreatePlayer has been called", true);
    const playerTestEnabled = true;

    let stats;

    if (playerTestEnabled) {
        stats = data.stats
    } else {
        // stats = GetStats(data.race)
    };

    const newPlayer = {
        "username":  data.userName,
        "firstname": data.firstName,
        "lastname": data.lastName,
        "race": data.race,
        "type": data.type,
        "level": 1,
        "avancement": 1,
        "metadata": {
            "stamina" : stats.stamina,
            "rp": 0,
            "pv": 500,
            "mana": stats.mana,
            "hunger": stats.hunger,
            "thirst": stats.thirst
        },
        "inventory": {
            "water": 10,
            "bread": 5
        },
        "powers": ["simple_punch", "critical_punch"]
    }
    localStorage.setItem("player", JSON.stringify(newPlayer));
};

export function GetPlayer() {
    const player = localStorage.getItem("player");
    Debug("info", `GetPlayer() returned \nplayer:${player}`, false)
    return player;
};

export function UpdatePlayer(playerData) {
    localStorage.removeItem("player");
    localStorage.setItem("player", JSON.stringify({
        "user_name":  playerData.userName,
        "first_name": playerData.firstName,
        "last_name": playerData.lastName,
        "race": playerData.race,
        "type": playerData.type,
        "level": playerData.level,
        "avancement": playerData.avancement,
        "metadata": {
            "stamina" : playerData.metadata.stamina,
            "rp": playerData.metadata.rp,
            "pv": playerData.metadata.pv,
            "mana": playerData.metadata.mana,
            "hunger": playerData.metadata.hunger,
            "thirst": playerData.metadata.thirst
        },
        "inventory": playerData.inventory,
        "powers": playerData.powers
    }));

    Debug("success", `UpdatePlayer() has sucessfully saved player:${JSON.stringify({
        "user_name":  playerData.userName,
        "first_name": playerData.firstName,
        "last_name": playerData.lastName,
        "race": playerData.race,
        "type": playerData.type,
        "level": playerData.level,
        "avancement": playerData.avancement,
        "metadata": {
            "stamina" : playerData.metadata.stamina,
            "rp": playerData.metadata.rp,
            "pv": playerData.metadata.pv,
            "mana": playerData.metadata.mana,
            "hunger": playerData.metadata.hunger,
            "thirst": playerData.metadata.thirst
        },
        "inventory": playerData.inventory,
        "powers": playerData.powers
    })}`, false)
};

export function DeletePlayer() {
    let response = confirm("Êtes-vous sûr de vouloir supprimer la partie ?");
    if (!response) return;
    localStorage.removeItem("player");
    Notify("info", "Suppression", "La partie a été correctement supprimée", 5);
};
