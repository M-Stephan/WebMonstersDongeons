import { Debug } from "../utils/debug.js";

export function CreatePlayer(data) {
    const playerTestEnabled = true;

    let stats;

    if (playerTestEnabled) {
        stats = data.stats
    } else {
        // stats = GetStats(data.race)
    }

    const newPlayer = {
        "username":  data.userName,
        "firstname": data.firstName,
        "lastname": data.lastName,
        "race": data.race,
        "type": data.type,
        "level": 1,
        "metadata": {
            "stamina" : stats.stamina,
            "rp": 0,
            "pv": 500,
            "mana": stats.mana,
            "hunger": stats.hunger,
            "thirst": stats.thirst
        }
    }
    localStorage.setItem("player", JSON.stringify(newPlayer));
};

export function GetPlayer() {
    const player = localStorage.getItem("player");
    Debug("info", `GetPlayer() returned \nplayer:${player}`, false)
    return JSON.parse(player);
};

export function UpdatePlayer(playerData) {
    localStorage.removeItem("player");

    localStorage.setItem("player", {
        "user_name":  playerData.userName,
        "first_name": playerData.firstName,
        "last_name": playerData.lastName,
        "race": playerData.race,
        "type": playerData.type,
        "level": playerData.level,
        "metadata": {
            "stamina" : playerData.metadata.stamina,
            "rp": playerData.metadata.rp,
            "pv": playerData.metadata.pv,
            "mana": playerData.metadata.mana,
            "hunger": playerData.metadata.hunger,
            "thirst": playerData.metadata.thirst
        }
    });
};

export function DeletePlayer() {
    localStorage.removeItem("player");
};
