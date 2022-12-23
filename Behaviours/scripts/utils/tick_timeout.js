import { system } from '@minecraft/server'

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
        
        const schedule = system.runSchedule(() => {
            if (ticks === -1) system.clearRunSchedule(schedule)
            if (this.currentTick++ >= ticks) {
                system.clearRunSchedule(schedule), callback()
            }
        })

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