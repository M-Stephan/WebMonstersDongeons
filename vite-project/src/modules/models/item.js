import { RemoveItemCount } from "./inventory.js";
import { Notify } from "../utils/notify.js";
import { items } from "../datas/items.js";
import { RefreshPlayerInventory, OpenInventory, CloseInventory } from "../app/inventory-page.js";
import { GetPlayer, UpdatePlayer } from "./players.js";

export function UseItem(item) {
    let canUse = true;
    let itemUsing = false;
    if (itemUsing) {
        Notify("error", "Utilisation en cours", "Tu utilises déjà un item, il faut patienter", 5);
        return
    }
    
    const currentItem = items[item];

    const raw = GetPlayer();

    if (!raw) return;

    const playerData = JSON.parse(raw);

    function LocalNotify() {
        Notify("success", "Inventaire", `Tu as utilisé: 1x ${items[item]["label"]}`, 3)
    }

    function Consume(type, max) {
        var upStats = currentItem["upStats"];
        if (type === "rp") {
            if ((playerData["metadata"][type] + upStats) >= max) {
                const restPoints = (playerData["metadata"][type] + upStats) - max
                RemoveItemCount(item, 1);
                LocalNotify();
                // LevelUp(restPoints);
            } else {
                playerData["metadata"][type] += upStats;
                RemoveItemCount(item, 1);
                LocalNotify();
            };
        } else {
            if (playerData["metadata"][type] >= max) {
                Notify("info", "Tout va bien pour l'instant.", "Tu ne peux pas faire ça.", 3.2);
            } else if ((playerData["metadata"][type] + upStats) >= max) {
                playerData["metadata"][type] = max;
                RemoveItemCount(item, 1);
                LocalNotify();
            } else {
                playerData["metadata"][type] += upStats;
                RemoveItemCount(item, 1);
                LocalNotify();
            };
            RefreshPlayerInventory();
            OpenInventory();
            setTimeout(() => {
                CloseInventory();
            }, 3000);    
        }
    }

    if (currentItem["consume"]) {
        switch (currentItem["type"]) {
            case "drink":
                Consume("thirst", 200);
                break;
            case "eat":
                Consume("hunger", 200);
                break;
            case "heal":
                Consume("pv", 500);
                break;
            case "mana":
                Consume("mana", 200);
                break;
            case "exp":
                Consume("rp", 500);
                break;
            case "stamina":
                Consume("stamina", 100);
                break;
        };
        UpdatePlayer(playerData);
    }
};