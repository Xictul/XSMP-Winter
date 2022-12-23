import { Player } from '@minecraft/server'
import { warnMessage } from '../utils/server_messages'

const gmc = {
    name: 'gmc',
    description: 'Sets you to creative',
    /**
     * 
     * @param {Player} player 
     */
    async execute(player) {
        if(player.hasTag('staff')) player.runCommandAsync('gamemode c')
        else warnMessage(player, 'You do not have permisson to use this command')
    }
}

export { gmc }