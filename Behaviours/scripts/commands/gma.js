import { Player } from '@minecraft/server'
import { warnMessage } from '../utils/server_messages'

const gma = {
    name: 'gma',
    description: 'Sets you to adventure',
    /**
     * 
     * @param {Player} player 
     */
    async execute(player) {
        if(player.hasTag('staff')) player.runCommandAsync('gamemode a')
        else warnMessage(player, 'You do not have permisson to use this command')
    }
}

export { gma }