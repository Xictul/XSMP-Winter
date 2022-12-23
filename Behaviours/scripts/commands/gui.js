import { Player } from '@minecraft/server'

const gui = {
    name: 'gui',
    description: 'Gives you the GUI',
    /**
     * 
     * @param {Player} player 
     */
    async execute(player) {
        player.runCommandAsync('give @s xsmp:gui')
    }
}

export { gui }