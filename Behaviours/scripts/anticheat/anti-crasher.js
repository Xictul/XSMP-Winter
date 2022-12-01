import { world, system } from "@minecraft/server";

system.runSchedule(() => {
    const players = Array.from(world.getPlayers());
    for (const player of players) {
        if(player.hasTag('staff')) return;
        if(Math.abs(player.location.x) >= 30000000 || Math.abs(player.location.y) >= 30000000 || Math.abs(player.location.z) >= 30000000) {

            world.playSound('block.bell.hit')
            world.say(`§8[§bXSMP§8] §r${player.nameTag} attempted to crash the server. Please contact XSMP staff immediately and screenshot this message (if possible).`)

            player.runCommandAsync(`kick "${player.nameTag}" Attempting to crash the server.`)
            player.triggerEvent(`xsmp:kick`)
            
        }
    }
})