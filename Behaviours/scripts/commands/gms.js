import { Player } from '@minecraft/server'
import { warnMessage } from '../utils/server_messages'

const gms = {
    name: 'gms',
    description: 'Sets you to survival',
    /**
     * 
     * @param {Player} player 
     */
    async execute(player) {
        if(player.hasTag('staff')) player.runCommandAsync('gamemode s')
        else warnMessage(player, 'You do not have permisson to use this command')
    }
}

export { gms }