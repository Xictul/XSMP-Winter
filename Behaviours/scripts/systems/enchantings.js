import { world, system } from "@minecraft/server";

system.runSchedule(() => {
    world.getDimension('overworld').runCommandAsync('effect @a[tag=enchanting:speed1] speed 1 0 true')
    world.getDimension('overworld').runCommandAsync('effect @a[tag=enchanting:speed2] speed 1 1 true')
    world.getDimension('overworld').runCommandAsync('effect @a[tag=enchanting:jump1] jump_boost 1 0 true')
    world.getDimension('overworld').runCommandAsync('effect @a[tag=enchanting:jump2] jump_boost 1 1 true')
    world.getDimension('overworld').runCommandAsync('effect @a[tag=enchanting:resistance1] resistance 1 0 true')
    world.getDimension('overworld').runCommandAsync('effect @a[tag=enchanting:resistance2] resistance 1 1 true')
    world.getDimension('overworld').runCommandAsync('effect @a[tag=enchanting:regeneration1] regeneration 1 0 true')
    world.getDimension('overworld').runCommandAsync('effect @a[tag=enchanting:regeneration2] regeneration 1 1 true')
    world.getDimension('overworld').runCommandAsync('effect @a[tag=enchanting:haste1] haste 1 0 true')
    world.getDimension('overworld').runCommandAsync('effect @a[tag=enchanting:haste2] haste 1 1 true')

    world.getDimension('overworld').runCommandAsync('execute @a[tag=enchanting:soul] ~~~ particle minecraft:soul_particle ~~~')
    world.getDimension('overworld').runCommandAsync('execute @a[tag=enchanting:redflame] ~~~ particle minecraft:basic_flame_particle ~~~')
    world.getDimension('overworld').runCommandAsync('execute @a[tag=enchanting:blueflame] ~~~ particle minecraft:blue_flame_particle ~~~')
    world.getDimension('overworld').runCommandAsync('execute @a[tag=enchanting:drippinglava] ~~~ particle minecraft:lava_drip_particle ~~~')
})

system.runSchedule(() => {
    world.getDimension('overworld').runCommandAsync('execute @a[tag=enchanting:loveheart] ~~~ particle minecraft:heart_particle ~~2~')
    world.getDimension('overworld').runCommandAsync('execute @a[tag=enchanting:thundercloud] ~~~ particle minecraft:villager_angry ~~2~')
}, 20)