import { world } from '@minecraft/server'

/**
* Get a player's gamemode
* @param {Entity} player The player
*/
export function getGamemode(player) {
    if ([...world.getPlayers({ gameMode: 'survival' })].map(e => e.name).includes(player.name)) return 'survival'
    if ([...world.getPlayers({ gameMode: 'creative' })].map(e => e.name).includes(player.name)) return 'creative'
    if ([...world.getPlayers({ gameMode: 'adventure' })].map(e => e.name).includes(player.name)) return 'adventure'
    if ([...world.getPlayers({ gameMode: 'spectator' })].map(e => e.name).includes(player.name)) return 'spectator'
}