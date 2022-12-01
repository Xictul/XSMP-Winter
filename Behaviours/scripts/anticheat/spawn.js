import { world, system } from "@minecraft/server";
import { getGamemode } from "../utils";

system.runSchedule(() => {
    const players = Array.from(world.getPlayers())
    for (const player of players) {
        if(player.hasTag('inSpawn')) player.runCommandAsync('tp @e[family=monster,r=200] ~ -100 ~')

        const gamemode = getGamemode(player)

        const x = Math.abs(player.location.x)
        const z = Math.abs(player.location.z)

        if(x > 500 || z > 500) player.removeTag('inSpawn')
        else player.addTag('inSpawn')

        if(gamemode == 'creative' && !player.hasTag('staff')) {
            player.tell('§8[§bXSMP§8] §rYou are not allowed to be in creative mode.');
            player.playSound('note.bass');
            player.runCommandAsync('gamemode s')
        } else if(gamemode == 'creative' && player.hasTag('inSpawn') && !player.hasTag('staff')) {
            player.tell('§8[§bXSMP§8] §rYou are not allowed to be in creative mode.');
            player.playSound('note.bass');
            player.runCommandAsync('gamemode a') 
        } else if(gamemode == 'survival' && player.hasTag('inSpawn') && !player.hasTag('staff')) {
            player.runCommandAsync('gamemode a') 
        } if(gamemode == 'adventure' && !player.hasTag('inSpawn') && !player.hasTag('staff')) {
            player.runCommandAsync('gamemode s') 
        } 
    }
})