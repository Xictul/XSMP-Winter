import { world } from '@minecraft/server'

world.events.entityCreate.subscribe(data => {
    const entity = data.entity
    const x = Math.abs(entity.location.x)
    const z = Math.abs(entity.location.z)

    if(entity.dimension.id != 'minecraft:overworld') return

    if(x < 500 && z < 500) entity.runCommandAsync('testfor @s[family=monster]').then(result => {
        if(result.successCount != 0) entity.teleport({ x: 0, y: -70, z: 0 }, entity.dimension, 0, 0)
    })
})