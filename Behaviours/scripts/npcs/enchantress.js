import { world, Entity, Location } from '@minecraft/server'
import { ActionFormData } from '@minecraft/server-ui'
import { getScore, tickTimeout } from '../utils'

world.events.entityHit.subscribe(data => {
    if(data.hitBlock != undefined) return

    const player = data.entity
    const entity = data.hitEntity

    if(entity.typeId == 'xsmp:enchantress') {
        const mainGui = new ActionFormData()
        .title('Enchantress')
        .body('What do you want to buy?')
        .button('Particle Trails', 'textures/guiicons/trail')
        .button('Global Effects', 'textures/guiicons/effect')
    
        const particleGui = new ActionFormData()
        .title('Particle Trail Shop')
        .body('What trail do you want to buy?')
        .button('Love Heart\n§650 coins', 'textures/guiicons/particles/heart')
        .button('Thunder Cloud\n§660 coins', 'textures/guiicons/particles/thunder')
        .button('Dripping Lava\n§670 coins', 'textures/guiicons/particles/lavadrip')
        .button('Red Flame\n§680 coins', 'textures/guiicons/particles/redfire')
        .button('Blue Flame\n§690 coins', 'textures/guiicons/particles/bluefire')
        .button('Soul Particle\n§6100 coins', 'textures/guiicons/particles/soul')
    
        const effectGui = new ActionFormData()
        .title('Global Effect Shop')
        .body('What effect do you want to buy?')
        .button('Speed I\n§630 coins', 'textures/guiicons/effects/speed')
        .button('Speed II\n§640 coins', 'textures/guiicons/effects/speed')
        .button('Jump I\n§630 coins', 'textures/guiicons/effects/jump')
        .button('Jump II\n§640 coins', 'textures/guiicons/effects/jump')
        .button('Resistance I\n§640 coins', 'textures/guiicons/effects/resistance')
        .button('Resistance II\n§650 coins', 'textures/guiicons/effects/resistance')
        .button('Strength I\n§650 coins', 'textures/guiicons/effects/strength')
        .button('Strength II\n§660 coins', 'textures/guiicons/effects/strength')
        .button('Regeneration I\n§670 coins', 'textures/guiicons/effects/regeneration')
        .button('Regeneration II\n§680 coins', 'textures/guiicons/effects/regeneration')
        .button('Haste I\n§690 coins', 'textures/guiicons/effects/haste')
        .button('Haste II\n§6100 coins', 'textures/guiicons/effects/haste')
    
        /**
        * Buy a particle trail or global effect
        * @param {Entity} target The target entity
        * @param {string} item What is being bought
        * @param {string} tag The tag to give the target
        * @param {number} cost How expensive it is
        */
        function buy(target, item, tag, cost) {
            const coinCount = getScore('coin', target, true).valueOf()
    
            if(coinCount >= cost) {
                if(target.hasTag(tag)) {
                    target.tell(`§8[§bXSMP§8] §fYou have already bought this!`)
                    target.playSound('note.bass')
                } else if(!target.hasTag(tag)) {
                    target.runCommandAsync('execute @e[type=xsmp:enchantress] ~~~ playsound xsmp.npcs.orbcharge @a[r=10] ~~~ 1 1')
                    target.runCommandAsync('execute @e[type=xsmp:enchantress] ~~~ playanimation @s animation.enchantress.chargeup')
                    new tickTimeout(() => {
                        target.tell(`§8[§bXSMP§8] §fBestowed ${item} for ${cost} coins.`)
                        target.addTag(tag)
                        target.runCommandAsync('execute @e[type=xsmp:enchantress] ~~~ playsound ambient.weather.thunder @a[r=10] ~~~ 0.5 1')
                        target.runCommandAsync(`scoreboard players remove @s coin ${cost}`)
                    }, 40)
                }
            } else {
                target.tell(`§8[§bXSMP§8] §fYou cannot afford this! You need ${cost - coinCount} more coins.`)
                target.playSound('note.bass')
            }
        }
    
        /**
        * The particle shop GUI function
        * @param {Entity} target The target entity
        */
        function particleShop(target) {
            particleGui.show(target).then(result => {
                if(result.selection == 0) buy(player, 'Love Heart Particle', 'enchanting:loveheart', 50)
                if(result.selection == 1) buy(player, 'Thunder Cloud Particle', 'enchanting:thundercloud', 60)
                if(result.selection == 2) buy(player, 'Dripping Lava Particle', 'enchanting:drippinglava', 70)
                if(result.selection == 3) buy(player, 'Red Flame Particle', 'enchanting:redflame', 80)
                if(result.selection == 4) buy(player, 'Blue Flame Particle', 'enchanting:blueflame', 90)
                if(result.selection == 5) buy(player, 'Soul Particle', 'enchanting:soul', 100)
            })
        }
    
        /**
        * The effect shop GUI function
        * @param {Entity} target The target entity
        */
        function effectShop(target) {
            effectGui.show(target).then(result => {
                if(result.selection == 0) buy(player, 'Speed Effect (I)', 'enchanting:speed1', 30)
                if(result.selection == 1) buy(player, 'Speed Effect (II)', 'enchanting:speed2', 40)
                if(result.selection == 2) buy(player, 'Jump Boost Effect (I)', 'enchanting:jump1', 30)
                if(result.selection == 3) buy(player, 'Jump Boost Effect (II)', 'enchanting:jump2', 40)
                if(result.selection == 4) buy(player, 'Resistance (I)', 'enchanting:resistance1', 40)
                if(result.selection == 5) buy(player, 'Resistance (II)', 'enchanting:resistance2', 50)
                if(result.selection == 6) buy(player, 'Strength (I)', 'enchanting:strength1', 50)
                if(result.selection == 7) buy(player, 'Strength (II)', 'enchanting:strength2', 60)
                if(result.selection == 8) buy(player, 'Regeneration (I)', 'enchanting:regeneration1', 70)
                if(result.selection == 9) buy(player, 'Regeneration (II)', 'enchanting:regeneration1', 80)
                if(result.selection == 10) buy(player, 'Haste (I)', 'enchanting:haste1', 90)
                if(result.selection == 11) buy(player, 'Haste (II)', 'enchanting:haste2', 100)
            })
        }

        if(entity.hasTag('spawnNPC')) {
            player.teleportFacing(new Location(87, 80, -92), world.getDimension('overworld'), new Location(87, 80, -93))
            new tickTimeout(() => {
                player.playSound('xsmp.npcs.laugh')
            }, 10)
        } else {
            player.playSound('random.pop', {pitch: 0.5})
            mainGui.show(player).then(result => {
                if(result.selection == 0) particleShop(player)
                if(result.selection == 1) effectShop(player)
            })
        }
    }
})