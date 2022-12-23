import { system, world } from '@minecraft/server'

system.runSchedule(() => {
    const players = world.getAllPlayers()
    for (const player of players) {
        if(Math.abs(player.location.x) >= 30000000 || Math.abs(player.location.y) >= 30000000 || Math.abs(player.location.z) >= 30000000) {
            player.runCommandAsync(`kick "${player.name}" Attempting to crash the server.`)
            player.triggerEvent(`xsmp:kick`)
        }
    }
})