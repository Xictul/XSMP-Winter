import { world } from '@minecraft/server'

/**
* Get an entity's scoreboard score
* @param {string} objective The scoreboard objective
* @param {Entity | string} player The player
* @param {boolean} useZero Specifies whether to return NaN or 0 if error is thrown
*/
export function getScore(objective, player, useZero = false) {
    try {
        const obj = world.scoreboard.getObjective(objective)
        
        if(typeof player == 'string') return obj.getScore(obj.getParticipants().find(t => t.displayName == player))
        return obj.getScore(player.scoreboard)
    } catch {
        return useZero ? 0 : NaN
    }
}