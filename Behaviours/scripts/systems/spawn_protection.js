import { world, system } from '@minecraft/server'
import { warnMessage } from '../utils/server_messages'
import { getGamemode } from '../utils/get_gamemode'

system.runSchedule(() => {
    const players = world.getAllPlayers()
    for (const player of players) {
        if(player.hasTag('staff')) return

        const gm = getGamemode(player)
        const x = Math.abs(player.location.x)
        const z = Math.abs(player.location.z)

        if(player.dimension.id == 'minecraft:overworld') {
            if(gm == 'creative') warnMessage(player, 'You are not allowed to be in creative mode'), player.runCommandAsync('gamemode s')
            if(gm == 'survival' && x < 500 && z < 500) player.runCommandAsync('gamemode a')
            if(gm == 'adventure' && x > 500 || z > 500) player.runCommandAsync('gamemode s')
        } 
        
        else if(gm != 'survival') player.runCommandAsync('gamemode s')
    }
})