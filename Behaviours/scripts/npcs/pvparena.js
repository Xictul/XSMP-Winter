import { world, Location } from '@minecraft/server'

world.events.entityHit.subscribe(data => {
    if(data.hitBlock != undefined) return 

    const player = data.entity
    const entity = data.hitEntity

    if(entity.typeId == 'xsmp:pvparena') {
        player.teleport(new Location(113, 148, -448), world.getDimension('overworld'), 0, 0)
    }
})