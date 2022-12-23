import { Player } from '@minecraft/server'
import { warnMessage } from '../utils/server_messages'

const gmsp = {
    name: 'gmsp',
    description: 'Sets you to spectator',
    /**
     * 
     * @param {Player} player 
     */
    async execute(player) {
        if(player.hasTag('staff')) player.runCommandAsync('gamemode spectator')
        else warnMessage(player, 'You do not have permisson to use this command')
    }
}

export { gmsp }