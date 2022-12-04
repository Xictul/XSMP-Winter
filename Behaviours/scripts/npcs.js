import { world, Location, Entity, EntityInventoryComponent, Items, ItemStack } from '@minecraft/server'
import { ActionFormData, MessageFormData } from '@minecraft/server-ui'
import { getScore, tickTimeout } from './utils'

/**
* @type EntityInventoryComponent
*/

world.events.entityHit.subscribe(data => {

    if(data.hitBlock != undefined) return 

    const player = data.entity
    const entity = data.hitEntity

    if(entity.typeId == 'xsmp:pvparena') {

        player.teleport(new Location(113, 148, -448), world.getDimension('overworld'), 0, 0)

    }

    if(entity.typeId == 'xsmp:biomefinder') {

        let plainsIcon = 'textures/guiicons/biomes/locked'
        let flowerIcon = 'textures/guiicons/biomes/locked'
        let oakIcon = 'textures/guiicons/biomes/locked'
        let birchIcon = 'textures/guiicons/biomes/locked'
        let spruceIcon = 'textures/guiicons/biomes/locked'
        let darkOakIcon = 'textures/guiicons/biomes/locked'
        let savannaIcon = 'textures/guiicons/biomes/locked'
        let jungleIcon = 'textures/guiicons/biomes/locked'
        let swampIcon = 'textures/guiicons/biomes/locked'
        let desertIcon = 'textures/guiicons/biomes/locked'
        let mountainsIcon = 'textures/guiicons/biomes/locked'
        let badlandsIcon = 'textures/guiicons/biomes/locked'
        let iceSpikesIcon = 'textures/guiicons/biomes/locked'
    
        let plainsStatus = 'Plains\n§65 coins' // 5 coins
        let flowerStatus = 'Flower Forest\n§65 coins' // 10 coins
        let oakStatus = 'Oak Forest\n§65 coins' // 5 coins
        let birchStatus = 'Birch Forest\n§65 coins' // 5 coins
        let spruceStatus = 'Spruce Forest\n§65 coins' // 5 coins
        let darkOakStatus = 'Dark Oak Forest\n§65 coins' // 5 coins
        let savannaStatus = 'Savanna\n§610 coins' // 10 coins
        let jungleStatus = 'Jungle\n§615 coins' // 15 coins
        let swampStatus = 'Swamp\n§615 coins' // 15 coins
        let desertStatus = 'Desert\n§615 coins' // 15 coins
        let mountainsStatus = 'Mountains\n§630 coins' // 30 coins
        let badlandsStatus = 'Badlands\n§650 coins' // 50 coins
        let iceSpikesStatus = 'Ice Spikes\n§675 coins' // 75 coins
    
        player.getTags().forEach(tag => {
            if(tag == 'biome:plains') plainsStatus = 'Plains\n§6Unlocked', plainsIcon = 'textures/guiicons/biomes/plains'
            if(tag == 'biome:flower') flowerStatus = 'Flower Forest\n§6Unlocked', flowerIcon = 'textures/guiicons/biomes/flower'
            if(tag == 'biome:oak') oakStatus = 'Oak Forest\n§6Unlocked', oakIcon = 'textures/guiicons/biomes/oak'
            if(tag == 'biome:birch') birchStatus = 'Birch Forest\n§6Unlocked', birchIcon = 'textures/guiicons/biomes/birch'
            if(tag == 'biome:spruce') spruceStatus = 'Spruce Forest\n§6Unlocked', spruceIcon = 'textures/guiicons/biomes/spruce'
            if(tag == 'biome:darkoak') darkOakStatus = 'Dark Oak Forest\n§6Unlocked', darkOakIcon = 'textures/guiicons/biomes/darkoak'
            if(tag == 'biome:savanna') savannaStatus = 'Savanna\n§6Unlocked', savannaIcon = 'textures/guiicons/biomes/savanna'
            if(tag == 'biome:jungle') jungleStatus = 'Jungle\n§6Unlocked', jungleIcon = 'textures/guiicons/biomes/jungle'
            if(tag == 'biome:swamp') swampStatus = 'Swamp Forest\n§6Unlocked', swampIcon = 'textures/guiicons/biomes/swamp'
            if(tag == 'biome:desert') desertStatus = 'Desert\n§6Unlocked', desertIcon = 'textures/guiicons/biomes/desert'
            if(tag == 'biome:mountains') mountainsStatus = 'Mountains\n§6Unlocked', mountainsIcon = 'textures/guiicons/biomes/mountains'
            if(tag == 'biome:badlands') badlandsStatus = 'Badlands\n§6Unlocked', badlandsIcon = 'textures/guiicons/biomes/badlands'
            if(tag == 'biome:icespikes') iceSpikesStatus = 'Ice Spikes\n§6Unlocked', iceSpikesIcon = 'textures/guiicons/biomes/icespikes'
        })
    
        const gui = new ActionFormData()
        .title('Biome Finder')
        .body('Where would you like to go?')
        .button(plainsStatus, plainsIcon)
        .button(flowerStatus, flowerIcon)
        .button(oakStatus, oakIcon)
        .button(birchStatus, birchIcon)
        .button(spruceStatus, spruceIcon)
        .button(darkOakStatus, darkOakIcon)
        .button(savannaStatus, savannaIcon)
        .button(jungleStatus, jungleIcon)
        .button(swampStatus, swampIcon)
        .button(desertStatus, desertIcon)
        .button(mountainsStatus, mountainsIcon)
        .button(badlandsStatus, badlandsIcon)
        .button(iceSpikesStatus, iceSpikesIcon)

        /**
        * Buy a biome
        * @param {Entity} target The target entity
        * @param {string} item What is being bought
        * @param {string} tag The tag to give the target
        * @param {number} cost How expensive it is
        */
        function buy(target, item, tag, cost) {
            const coinCount = getScore('coin', target, true).valueOf()

            if(coinCount >= cost) {
                if(!target.hasTag(tag)) {
                    target.tell(`§8[§bXSMP§8] §fUnlocked ${item} for ${cost} coins.`)
                    target.addTag(tag)
                    target.playSound('random.orb')
                    target.runCommandAsync(`scoreboard players remove @s coin ${cost}`)
                } 
            } else {
                target.tell(`§8[§bXSMP§8] §fYou cannot afford this! You need ${cost - coinCount} more coins.`)
                target.playSound('note.bass')
            }
        }

        player.playSound('random.pop', {pitch: 0.5})

        gui.show(player).then(result => {
            if(result.selection == 0) if(player.hasTag('biome:plains')) player.teleport(new Location(1597, 149, 1619), world.getDimension('overworld'), 0, 0); else buy(player, 'Plains Biome', 'biome:plains', 5)
            if(result.selection == 1) if(player.hasTag('biome:flower')) player.teleport(new Location(2182, 68, 1558), world.getDimension('overworld'), 0, 0); else buy(player, 'Flower Forest Biome', 'biome:flower', 5)
            if(result.selection == 2) if(player.hasTag('biome:oak')) player.teleport(new Location(-194, 70, 2674), world.getDimension('overworld'), 0, 0); else buy(player, 'Oak Forest Biome', 'biome:oak', 5)
            if(result.selection == 3) if(player.hasTag('biome:birch')) player.teleport(new Location(356, 87, 3360), world.getDimension('overworld'), 0, 0); else buy(player, 'Birch Forest Biome', 'biome:birch', 5)
            if(result.selection == 4) if(player.hasTag('biome:spruce')) player.teleport(new Location(1077, 95, -3703), world.getDimension('overworld'), 0, 0); else buy(player, 'Spruce Forest Biome', 'biome:spruce', 5)
            if(result.selection == 5) if(player.hasTag('biome:darkoak')) player.teleport(new Location(1172, 93, -3243), world.getDimension('overworld'), 0, 0); else buy(player, 'Dark Oak Forest Biome', 'biome:darkoak', 5)
            if(result.selection == 6) if(player.hasTag('biome:savanna')) player.teleport(new Location(-6239, 71, 4827), world.getDimension('overworld'), 0, 0); else buy(player, 'Savanna Biome', 'biome:savanna', 10)
            if(result.selection == 7) if(player.hasTag('biome:jungle')) player.teleport(new Location(3840, 64, -3682), world.getDimension('overworld'), 0, 0); else buy(player, 'Jungle Biome', 'biome:jungle', 15)
            if(result.selection == 8) if(player.hasTag('biome:swamp')) player.teleport(new Location(3078, 64, -221), world.getDimension('overworld'), 0, 0); else buy(player, 'Swamp Biome', 'biome:swamp', 15)
            if(result.selection == 9) if(player.hasTag('biome:desert')) player.teleport(new Location(4520, 81, -1480), world.getDimension('overworld'), 0, 0); else buy(player, 'Desert Biome', 'biome:desert', 15)
            if(result.selection == 10) if(player.hasTag('biome:mountains')) player.teleport(new Location(1031, 173, -4087), world.getDimension('overworld'), 0, 0); else buy(player, 'Mountains Biome', 'biome:mountains', 30)
            if(result.selection == 11) if(player.hasTag('biome:badlands')) player.teleport(new Location(4570, 84, -1288), world.getDimension('overworld'), 0, 0); else buy(player, 'Badlands Biome', 'biome:badlands', 50)
            if(result.selection == 12) if(player.hasTag('biome:icespikes')) player.teleport(new Location(-729, 113, -4758), world.getDimension('overworld'), 0, 0); else buy(player, 'Ice Spikes Biome', 'biome:icespikes', 75)
        })

    }

    if(entity.typeId == 'xsmp:welcomer') {

        const gui = new MessageFormData()
        .title('Welcomer')
        .body(`Hi ${player.nameTag}! Welcome to the realm. I'm here to get you started and help you get on your feet.\n\nFirst, feel free to claim a starter kit. This contains some tools, armour, coins and food - everything you'll need to survive the first few nights on the realm\n\nAfter that, you can explore Spawn or open the Realm GUI on the right hand side of your hotbar.`)
        .button2('No Thanks')
    
        if(player.hasTag('starterClaimed')) gui.button1(`Starter Kit Claimed`)
        else gui.button1('Claim a Starter Kit')
    
        function claimStarterKit(target) {
            if(target.hasTag('starterClaimed')) return target.tell("§8[§bXSMP§8] §fYou have already claimed the starter kit!"), target.playSound('note.bass')
            else {
                const helmet = new ItemStack(Items.get('minecraft:leather_helmet'), 1)
                const chestplate = new ItemStack(Items.get('minecraft:leather_chestplate'), 1)
                const leggings = new ItemStack(Items.get('minecraft:leather_leggings'), 1)
                const boots = new ItemStack(Items.get('minecraft:leather_boots'), 1)
                const sword = new ItemStack(Items.get('minecraft:stone_sword'), 1)
                const axe = new ItemStack(Items.get('minecraft:stone_axe'), 1)
                const pickaxe = new ItemStack(Items.get('minecraft:stone_pickaxe'), 1)
                const bread = new ItemStack(Items.get('minecraft:bread'), 16)
    
                target.getComponent('inventory').container.addItem(sword)
                target.getComponent('inventory').container.addItem(axe)
                target.getComponent('inventory').container.addItem(pickaxe)
                target.getComponent('inventory').container.addItem(bread)
                target.getComponent('inventory').container.addItem(helmet)
                target.getComponent('inventory').container.addItem(chestplate)
                target.getComponent('inventory').container.addItem(leggings)
                target.getComponent('inventory').container.addItem(boots)
                target.runCommandAsync('scoreboard players add @s coin 20')
    
                target.playSound('armor.equip_leather')
                target.addTag('starterClaimed')
            }
        }

        player.playSound('random.pop', {pitch: 0.5})
        gui.show(player).then(result => {
            if(result.selection == 1) claimStarterKit(player)
        })

    }

    if(entity.typeId == 'xsmp:santa') {

        const gui = new MessageFormData()
        .title('Santa')
        .body(`Hey there ${player.nameTag}, good to see you.\n\nThis year, I've come by with a few presents for you and all the other members to open. I hope you like what I put in them!\n\nMerry Christmas.`)
        .button2('No Thanks')
    
        const tag = player.getTags().find(tag => tag.startsWith == 'presentClaimed:')
    
        let date = new Date().getDate()
        let today = new Date()
        let tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(0,0,0,0)
    
        const diffMs = (tomorrow - today)
        const minutes = Math.floor((diffMs/1000)/60)
        const hours = Math.floor(minutes / 60)
    
        let itemType, itemAmount
    
        if(date == 1) itemType = 'minecraft:golden_apple', itemAmount = 1
        if(date == 2) itemType = 'minecraft:diamond', itemAmount = 1
        if(date == 3) itemType = 'minecraft:cake', itemAmount = 1
        if(date == 4) itemType = 'minecraft:golden_carrot', itemAmount = 16
        if(date == 5) itemType = 'minecraft:cookie', itemAmount = 16
        if(date == 6) itemType = 'minecraft:gold_ingot', itemAmount = 10
        if(date == 7) itemType = 'minecraft:experience_bottle', itemAmount = 16
        if(date == 8) itemType = 'minecraft:honey_bottle', itemAmount = 5
        if(date == 9) itemType = 'minecraft:name_tag', itemAmount = 3
        if(date == 10) itemType = 'minecraft:music_disc_chirp', itemAmount = 1
        if(date == 11) itemType = 'minecraft:shield', itemAmount = 1
        if(date == 12) itemType = 'minecraft:cake', itemAmount = 1
        if(date == 13) itemType = 'minecraft:music_disc_strad', itemAmount = 1
        if(date == 14) itemType = 'minecraft:trident', itemAmount = 1
        if(date == 15) itemType = 'minecraft:ender_chest', itemAmount = 1
        if(date == 16) itemType = 'minecraft:saddle', itemAmount = 1
        if(date == 17) itemType = 'minecraft:music_disc_cat', itemAmount = 1
        if(date == 18) itemType = 'minecraft:redstone_block', itemAmount = 5
        if(date == 19) itemType = 'minecraft:quartz', itemAmount = 32
        if(date == 20) itemType = 'minecraft:netherite_scrap', itemAmount = 2
        if(date == 21) itemType = 'minecraft:experience_bottle', itemAmount = 32
        if(date == 22) itemType = 'minecraft:ender_pearl', itemAmount = 3
        if(date == 23) itemType = 'minecraft:iron_ingot', itemAmount = 32
        if(date == 24) itemType = 'minecraft:cookie', itemAmount = 32
        if(date == 25) itemType = 'minecraft:diamond', itemAmount = 16
    
        if(player.hasTag(`presentClaimed:${date}`)) gui.button1(`Next Present In ${hours} Hours`)
        else gui.button1(`Claim Today's Present`)
    
        function openPresent(target) {
            if(target.hasTag(`presentClaimed:${date}`)) return target.tell("§8[§bXSMP§8] §fYou have already claimed today's present!"), target.playSound('note.bass')
            else {
                const item = new ItemStack(Items.get(itemType), itemAmount)
                target.getComponent('inventory').container.addItem(item)
    
                if(date != 25) target.tell("§8[§bXSMP§8] §fYou have claimed today's present. Come back tomorrow for the next one!")
                if(date == 25) target.tell("§8[§bXSMP§8] §fYou have claimed the last present. Merry Christmas!")
                target.playSound('random.orb')
    
                if(tag) target.removeTag(tag)
                target.addTag(`presentClaimed:${date}`)
            }
        }
        
        player.playSound('xsmp.npcs.hohoho')
        gui.show(player).then(result => {
            if(result.selection == 1) openPresent(player)
        })

    }

    if(entity.typeId == 'xsmp:marketplace') {

        if(!entity.hasTag('marketplaceSpawnNPC') && !entity.getTags().find(t => t.startsWith('market:'))) {
            player.tell(`§8[§bXSMP§8] §fThis is a marketplace NPC that needs setting up. Give it the 'spawnNPC' tag or setup the trading system.`)
            player.playSound('note.bass')
        }

        if(entity.hasTag('marketplaceSpawnNPC')) {

            const markets = []

            const gui = new ActionFormData()
            gui.title('Marketplace Teleports')
            gui.body('Where do you want to go?')

            const entities = Array.from(world.getDimension('overworld').getEntities({type: 'xsmp:marketplace', excludeTypes: 'minecraft:player'}))
            for (const ent of entities) {

                const tags = ent.getTags().find(t => t.startsWith('market:'))

                if(tags) {

                    const coords = tags.split('*')[1].split(' facing ')[0].replaceAll('*', '')
                    const facing = tags.split('*')[1].split(' facing ')[1]
                    
                    let name = tags.split('~')[1].split('*')[0]
                    if(name.includes('§')) name = name.substring(2)
    
                    gui.button(name)
    
                    markets.push({
                        name: name,
                        coords: coords,
                        facing: facing
                    })

                }

            }

            player.playSound('random.pop', {pitch: 0.5}),
            gui.show(player).then(res => {
                if(res.selection == 0 || res.selection) {
                    const coords = markets[res.selection.valueOf()].coords.split(' ')
                    const facing = markets[res.selection.valueOf()].facing.split(' ')

                    player.teleportFacing(new Location(+coords[0], +coords[1], +coords[2]), world.getDimension('overworld'), new Location(+facing[0], +facing[1], +facing[2]))
                }
            })

        } else {

            let tags = entity.getTags().find(t => t.startsWith('market:'))

            if(tags) {
                tags = tags.replaceAll('market:', '').split('~')[0].split('#')
                let name = entity.getTags().find(t => t.startsWith('market:')).replaceAll('market:', '').split('~')[1].split('*')[0]
                if(name.includes('§')) name = name.substring(2)
        
                const gui = new ActionFormData()
                gui.title(name)
                gui.body('What do you want to buy?')
        
                for (const tag of tags) gui.button(`${tag.split('-')[2]} ${tag.split('-')[0]}\n§6${tag.split('-')[3]} coins`)
                
                player.playSound('random.pop', {pitch: 0.5})

                gui.show(player).then(res => {
                    if(res.selection == 0 || res.selection) {
                        const name = tags[res.selection.valueOf()].split('-')[0]
                        const amount = parseInt(tags[res.selection.valueOf()].split('-')[2])
                        const cost = tags[res.selection.valueOf()].split('-')[3]
                        const coinCount = getScore('coin', player, true).valueOf()

                        let item = tags[res.selection.valueOf()].split('-')[1]
                        item = new ItemStack(Items.get(item), amount)
                        
                        if(coinCount < cost) {
                            player.tell(`§8[§bXSMP§8] §fYou cannot afford this! You need ${cost - coinCount} more coins.`)
                            player.playSound('note.bass')
                        } else if(coinCount > cost) {
                            player.tell(`§8[§bXSMP§8] §fBought ${amount} ${name} for ${cost} coins.`)
                            player.playSound('random.orb')
                            player.runCommandAsync(`scoreboard players remove @s coin ${cost}`)
                            player.getComponent('inventory').container.addItem(item)
                        }
                    }
                })
            }
        }

    }

    if(entity.typeId == 'xsmp:info') {

        const gui = new ActionFormData()
        .title('Realm Guide')
        .body('What would you like to know about?')
        .button('Coins')
        .button('NPCs')
        .button('Gamerules')
        .button('Realm GUI')
        .button('Towns')
        .button('PVP Arena')
    
        function coins() {
            player.playSound('xsmp.misc.paper')
            player.tell(`§8[§bXSMP§8] §fCoins are the XSMP's realm currency. They can be used to buy things like cosmetics, enchantings, biome teleports and more! Coins can be earned passively just by playing on the realm, or by participating in realm events. If a realm event is active, you will see it on the sidebar.`)
        }
    
        function npcs() {
            player.playSound('xsmp.misc.paper')
            player.tell(`§8[§bXSMP§8] §fThere are NPCs, such as myself, scattered around spawn and each NPC will do something different. To interact with NPCs, you can click them to trigger their GUIs (General User Interfaces).`)
        }
    
        function gamerules() {
            player.playSound('xsmp.misc.paper')
            player.tell(`§8[§bXSMP§8] §fSome gamerules have been enabled/disabled in the realm. The most noteable ones include there being no fall damage, no PvP (outside the arena), and no TNT explosions for obvious reasons.`)
        }
    
        function realmgui() {
            player.playSound('xsmp.misc.paper')
            player.tell(`§8[§bXSMP§8] §fThe realm GUI (General User Interface) can be used to teleport the various places in the world, check out your player stats, toggle certain realm settings or open up other GUIs. To get the GUI item, run the !gui command.`)
        }
    
        function towns() {
            player.playSound('xsmp.misc.paper')
            player.tell(`§8[§bXSMP§8] §fTowns are small sub-communities on the realm. In each town, there can only be up to 10 members and 4 members are required to create one. Town status means your own chat only accessable to the town's members on the XSMP Discord, an in realm chat rank and Discord role, a protective border surrounding the town that stops non-town members getting in and an option to teleport to the town from the Realm GUI.`)
        }
    
        function pvparena() {
            player.playSound('xsmp.misc.paper')
            player.tell(`§8[§bXSMP§8] §fThe PvP arena is a place next to spawn where you can fight with up to 3 other members. This is the only zone in the entire realm where PvP is enabled for members within it. Any items lost or broken in the Arena cannot be retrieved so make sure to put anything valuable in a chest elsewhere.`)
        }

        if(entity.hasTag('spawnNPC')) {
            player.teleportFacing(new Location(109, 35, -146), world.getDimension('overworld'), new Location(109, 35, -145))
        } else {
            player.playSound('random.pop', {pitch: 0.5})
            gui.show(player).then(result => {
                if(result.selection == 0) coins()
                if(result.selection == 1) npcs()
                if(result.selection == 2) gamerules()
                if(result.selection == 3) realmgui()
                if(result.selection == 4) towns()
                if(result.selection == 5) pvparena()
            })
        }

    }

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
                    target.runCommandAsync('execute @e[type=xsmp:enchantress, r=10] ~~~ playsound xsmp.npcs.orbcharge @a[r=10] ~~~ 1 1')
                    target.runCommandAsync('execute @e[type=xsmp:enchantress, r=10] ~~~ playanimation @s animation.enchantress.chargeup')
                    
                    new tickTimeout(() => {
                        target.tell(`§8[§bXSMP§8] §fBestowed ${item} for ${cost} coins.`)
                        target.addTag(tag)
                        target.runCommandAsync('execute @e[type=xsmp:enchantress, r=10] ~~~ playsound ambient.weather.thunder @a[r=10] ~~~ 0.5 1')
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