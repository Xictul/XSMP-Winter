import { world } from '@minecraft/server'
import { tickTimeout } from '../utils/tick_timeout'

world.events.playerJoin.subscribe(data => {
    const player = data.player
    world.playSound('random.orb')

    if(!player.hasTag('toggle:welcome')) {
        new tickTimeout(() => {
            if(player.hasTag('welcome')) {
                player.tell(`§8[§bXSMP§8] §fWelcome back to the realm ${player.name}!`)
                player.playSound('random.orb')
            } if(!player.hasTag('welcome')) {
                player.runCommandAsync('replaceitem entity @s slot.hotbar 8 xsmp:gui')
                player.addTag('welcome')
                player.tell(`§8[§bXSMP§8] §fWelcome to the realm ${player.name}! Follow the pathways to exit Spawn and come back any time by using the !spawn command!`)
                player.playSound('random.orb')
            }
        }, 200)
    }
})

world.events.playerLeave.subscribe(data => {
    world.playSound('random.orb')
})