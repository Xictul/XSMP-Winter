import { Entity } from '@minecraft/server'

/**
 * Create a server warning
 * @param {Entity} player The player to message
 * @param {string} warning The server warning
 */
export function warnMessage(player, warning) {
    player.tell('§c' + warning)
    player.playSound('note.bass')
}

/**
 * Create a server notification
 * @param {Entity} player The player to message
 * @param {string} message The server message
 */
export function regularMessage(player, message) {
    player.tell('§8[§bXSMP§8] §r' + message)
    player.playSound('random.orb')
}