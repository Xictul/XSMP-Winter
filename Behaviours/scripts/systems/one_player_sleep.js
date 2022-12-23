import { world } from '@minecraft/server'
import { tickTimeout } from '../utils/tick_timeout'

world.events.beforeItemUseOn.subscribe(data => {
    const player = data.source
    const time = world.getTime()
    const bed = world.getDimension('overworld').getBlock(data.blockLocation).typeId
    const dimension = player.dimension.id

    if(bed != 'minecraft:bed') return
    if(!isNight(time)) return
    if(player.isSneaking) return
    if(dimension != 'minecraft:overworld') return

    player.runCommandAsync('kill @e[r=10, family=monster]')

    new tickTimeout(() => {
        world.setTime(0)
        player.runCommandAsync('title @s actionbar Good Morning')
    }, 40)
    

    function isNight(currentTime) {
        let night = 12542
        let sunrise = 23459
        if(currentTime >= night && currentTime < sunrise) return true
    }
})