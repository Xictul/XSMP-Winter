// Bans a player permanently

export function banPlayer(player, reason) {
    if(player.hasTag('staff')) return;
    try {
        if(player.hasTag('xsmpBan')) {
            // player.kick(`You have been banned.\nReason: ${reason || 'None'}\n\nIf this was done in fault, contact the XSMP Staff.`);
            console.log(`You have been banned.\nReason: ${reason || 'None'}\n\nIf this was done in fault, contact the XSMP Staff.`);
        } else {
            player.addTag('xsmpBan');
            // player.kick(`You have been banned.\nReason: ${reason || 'None'}\n\nIf this was done in fault, contact the XSMP Staff.`);
            console.log(`You have been banned.\nReason: ${reason || 'None'}\n\nIf this was done in fault, contact the XSMP Staff.`);
        }
    } catch (error) {
        return console.log(error);
    }
}

// Tick Timeout

import { system, world, Entity } from '@minecraft/server'

export class tickTimeout {
    /**
     * Create a tick timeout
     * @param {() => void} callback Code to run after certain amount of time
     * @param {number} ticks Amount of ticks to wait until callback is called
     */
    constructor(callback, ticks) {
        /**@private */
        this.ticks = ticks
        /**@private */
        this.currentTick = 0
        
        const tick = () => {
            if (ticks === -1) return
            if (this.currentTick++ >= ticks) {
                return callback()
            }
        }
        system.runSchedule(() => {tick})
    }
    getDelay() {
        return this.ticks
    }
    setDelay(tickDelay) {
        this.ticks = tickDelay
    }
    getCurrentDelay() {
        return this.currentTick
    }
    setCurrentDelay(tickDelay) {
        this.currentTick = tickDelay
    }
    resetDelay() {
        this.currentTick = 0
    }
    destroy() {
        this.ticks = -1
    }
}

/**
* Get an entity's scoreboard score
* @param {string} objective The scoreboard objective
* @param {Entity | string} target The target entity
* @param {boolean} useZero Specifies whether to return NaN or 0 if error is thrown
*/
export function getScore(objective, target, useZero = false) {
    try {
        const obj = world.scoreboard.getObjective(objective);
        
        if(typeof target == 'string') return obj.getScore(obj.getParticipants().find(t => t.displayName == target))
        return obj.getScore(target.scoreboard)
    } catch {
        return useZero ? 0 : NaN;
    }
}

// Gamemode Check

/**
* Get a player's gamemode
* @param {Entity} target The target player
*/
export function getGamemode(target) {
    if ([...world.getPlayers({ gameMode: 'survival' })].map(e => e.name).includes(target.name)) return 'survival'
    if ([...world.getPlayers({ gameMode: 'creative' })].map(e => e.name).includes(target.name)) return 'creative'
    if ([...world.getPlayers({ gameMode: 'adventure' })].map(e => e.name).includes(target.name)) return 'adventure'
    if ([...world.getPlayers({ gameMode: 'spectator' })].map(e => e.name).includes(target.name)) return 'spectator'
}