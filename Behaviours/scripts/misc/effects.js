import { system, world } from '@minecraft/server'

system.runSchedule(() => {
    world.getDimension('minecraft:overworld').runCommandAsync('effect @a[tag=enchanting:speed1] speed 20 0 true')
    world.getDimension('minecraft:overworld').runCommandAsync('effect @a[tag=enchanting:speed2] speed 20 1 true')
    world.getDimension('minecraft:overworld').runCommandAsync('effect @a[tag=enchanting:strength1] strength 20 0 true')
    world.getDimension('minecraft:overworld').runCommandAsync('effect @a[tag=enchanting:strength2] strength 20 1 true')
    world.getDimension('minecraft:overworld').runCommandAsync('effect @a[tag=enchanting:jump1] jump_boost 20 0 true')
    world.getDimension('minecraft:overworld').runCommandAsync('effect @a[tag=enchanting:jump2] jump_boost 20 1 true')
    world.getDimension('minecraft:overworld').runCommandAsync('effect @a[tag=enchanting:resistance1] resistance 20 0 true')
    world.getDimension('minecraft:overworld').runCommandAsync('effect @a[tag=enchanting:resistance2] resistance 20 1 true')
    world.getDimension('minecraft:overworld').runCommandAsync('effect @a[tag=enchanting:regeneration1] regeneration 20 0 true')
    world.getDimension('minecraft:overworld').runCommandAsync('effect @a[tag=enchanting:regeneration2] regeneration 20 1 true')
    world.getDimension('minecraft:overworld').runCommandAsync('effect @a[tag=enchanting:haste1] haste 20 0 true')
    world.getDimension('minecraft:overworld').runCommandAsync('effect @a[tag=enchanting:haste2] haste 20 1 true')
}, 20 * 5)