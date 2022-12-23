import { Player, world } from '@minecraft/server'

const spawn = {
    name: 'spawn',
    description: 'Teleports you to spawn',
    /**
     * 
     * @param {Player} player 
     */
    async execute(player) {
        try {
            player.teleport({ x: 90, y: 118, z: -147 }, world.getDimension('minecraft:overworld'), 0, 0)
        } catch (error) {
            console.warn(error, error.stack)
        }
    }
}

export { spawn }