import { Location, Entity, world } from '@minecraft/server';
import { ActionFormData, MessageFormData, ModalFormData } from '@minecraft/server-ui';
import { getScore } from '../utils';

world.events.beforeItemUse.subscribe(data => {
    const player = data.source;
    const townArray = []

    const gui = new ActionFormData()
    .title('Server GUI')
    .button('Teleports', 'textures/guiicons/tps')
    .button('Settings', 'textures/guiicons/settings')
    .button('Marketplace', 'textures/guiicons/market')
    .button('Statistics', 'textures/guiicons/other')

    const tps = new ActionFormData()
    .title('Server Teleports')
    .body('Where do you want to go?')
    .button('Spawn', 'textures/guiicons/spawn')
    .button('Town', 'textures/guiicons/town')
    .button('Biome', 'textures/guiicons/biome')
    .button('Home', 'textures/guiicons/home')

    let town1, town2, town3, town1Icon, town2Icon, town3Icon = undefined

    player.getTags().forEach(tag => {if(tag.startsWith('town:')) townArray.push(tag)})

    if(townArray[0] != undefined) town1 = townArray[0].substring(5).split('-'); else town1 = ['Empty Town Slot'];
    if(townArray[1] != undefined) town2 = townArray[1].substring(5).split('-'); else town2 = ['Empty Town Slot'];
    if(townArray[2] != undefined) town3 = townArray[2].substring(5).split('-'); else town3 = ['Empty Town Slot'];

    if(townArray[0] == undefined) town1Icon = 'textures/guiicons/blank'; else town1Icon = 'textures/guiicons/town';
    if(townArray[1] == undefined) town2Icon = 'textures/guiicons/blank'; else town2Icon = 'textures/guiicons/town';
    if(townArray[2] == undefined) town3Icon = 'textures/guiicons/blank'; else town3Icon = 'textures/guiicons/town';

    const towns = new ActionFormData()
    .title('Town Teleports')
    .button(town1[0], town1Icon)
    .button(town2[0], town2Icon)
    .button(town3[0], town3Icon)

    if(data.item.typeId == 'xsmp:gui') 
    player.playSound('random.pop', {pitch: 0.5}),
    gui.show(player).then(result => {
        
        if(result.selection == 0) {
            player.playSound('random.pop', {pitch: 0.5}),
            tps.show(player).then(result => {

                if(result.selection == 0) player.teleportFacing(new Location(90, 118, -147), world.getDimension('overworld'), new Location(90, 118, -146))
                if(result.selection == 1) player.playSound('random.pop', {pitch: 0.5}), towns.show(player).then(result => {

                    if(result.selection == 0) if(town1 != 'Empty Town Slot') player.runCommandAsync(`tp @s ${town1[1].replaceAll(',', ' ')}`)
                    if(result.selection == 1) if(town2 != 'Empty Town Slot') player.runCommandAsync(`tp @s ${town2[1].replaceAll(',', ' ')}`)
                    if(result.selection == 2) if(town3 != 'Empty Town Slot') player.runCommandAsync(`tp @s ${town3[1].replaceAll(',', ' ')}`)

                })
                if(result.selection == 2) {
                    let plainsIcon = 'textures/guiicons/biomes/locked'
                    let oakIcon = 'textures/guiicons/biomes/locked'
                    let birchIcon = 'textures/guiicons/biomes/locked'
                    let spruceIcon = 'textures/guiicons/biomes/locked'
                    let darkOakIcon = 'textures/guiicons/biomes/locked'
                    let flowerIcon = 'textures/guiicons/biomes/locked'
                    let savannaIcon = 'textures/guiicons/biomes/locked'
                    let jungleIcon = 'textures/guiicons/biomes/locked'
                    let swampIcon = 'textures/guiicons/biomes/locked'
                    let desertIcon = 'textures/guiicons/biomes/locked'
                    let mountainsIcon = 'textures/guiicons/biomes/locked'
                    let badlandsIcon = 'textures/guiicons/biomes/locked'
                    let iceSpikesIcon = 'textures/guiicons/biomes/locked'
                
                    let plainsStatus = 'Plains\n§65 coins' // 5 coins
                    let oakStatus = 'Oak Forest\n§65 coins' // 5 coins
                    let birchStatus = 'Birch Forest\n§65 coins' // 5 coins
                    let spruceStatus = 'Spruce Forest\n§65 coins' // 5 coins
                    let darkOakStatus = 'Dark Oak Forest\n§65 coins' // 5 coins
                    let flowerStatus = 'Flower Forest\n§610 coins' // 10 coins
                    let savannaStatus = 'Savanna\n§610 coins' // 10 coins
                    let jungleStatus = 'Jungle\n§615 coins' // 15 coins
                    let swampStatus = 'Swamp\n§615 coins' // 15 coins
                    let desertStatus = 'Desert\n§615 coins' // 15 coins
                    let mountainsStatus = 'Mountains\n§630 coins' // 30 coins
                    let badlandsStatus = 'Badlands\n§650 coins' // 50 coins
                    let iceSpikesStatus = 'Ice Spikes\n§675 coins' // 75 coins
                
                    player.getTags().forEach(tag => {
                        if(tag == 'biome:plains') plainsStatus = 'Plains\n§6Unlocked', plainsIcon = 'textures/guiicons/biomes/plains'
                        if(tag == 'biome:oak') oakStatus = 'Oak Forest\n§6Unlocked', oakIcon = 'textures/guiicons/biomes/oak'
                        if(tag == 'biome:birch') birchStatus = 'Birch Forest\n§6Unlocked', birchIcon = 'textures/guiicons/biomes/birch'
                        if(tag == 'biome:spruce') spruceStatus = 'Spruce Forest\n§6Unlocked', spruceIcon = 'textures/guiicons/biomes/spruce'
                        if(tag == 'biome:darkoak') darkOakStatus = 'Dark Oak Forest\n§6Unlocked', darkOakIcon = 'textures/guiicons/biomes/darkoak'
                        if(tag == 'biome:flower') flowerStatus = 'Flower Forest\n§6Unlocked', flowerIcon = 'textures/guiicons/biomes/flower'
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
                    .button(oakStatus, oakIcon)
                    .button(birchStatus, birchIcon)
                    .button(spruceStatus, spruceIcon)
                    .button(darkOakStatus, darkOakIcon)
                    .button(flowerStatus, flowerIcon)
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
                        if(result.selection == 0) if(player.hasTag('biome:plains')) player.teleport(new Location(1597, 76, 1619), world.getDimension('overworld'), 0, 0); else buy(player, 'Plains Biome', 'biome:plains', 5)
                        if(result.selection == 1) if(player.hasTag('biome:oak')) player.teleport(new Location(-194, 70, 2674), world.getDimension('overworld'), 0, 0); else buy(player, 'Oak Forest Biome', 'biome:oak', 5)
                        if(result.selection == 2) if(player.hasTag('biome:birch')) player.teleport(new Location(356, 87, 3360), world.getDimension('overworld'), 0, 0); else buy(player, 'Birch Forest Biome', 'biome:birch', 5)
                        if(result.selection == 3) if(player.hasTag('biome:spruce')) player.teleport(new Location(1077, 95, -3703), world.getDimension('overworld'), 0, 0); else buy(player, 'Spruce Forest Biome', 'biome:spruce', 5)
                        if(result.selection == 4) if(player.hasTag('biome:darkoak')) player.teleport(new Location(1172, 93, -3243), world.getDimension('overworld'), 0, 0); else buy(player, 'Dark Oak Forest Biome', 'biome:darkoak', 5)
                        if(result.selection == 5) if(player.hasTag('biome:flower')) player.teleport(new Location(2182, 68, 1558), world.getDimension('overworld'), 0, 0); else buy(player, 'Flower Forest Biome', 'biome:flower', 10)
                        if(result.selection == 6) if(player.hasTag('biome:savanna')) player.teleport(new Location(-6239, 71, 4827), world.getDimension('overworld'), 0, 0); else buy(player, 'Savanna Biome', 'biome:savanna', 10)
                        if(result.selection == 7) if(player.hasTag('biome:jungle')) player.teleport(new Location(3840, 64, -3682), world.getDimension('overworld'), 0, 0); else buy(player, 'Jungle Biome', 'biome:jungle', 15)
                        if(result.selection == 8) if(player.hasTag('biome:swamp')) player.teleport(new Location(3078, 64, -221), world.getDimension('overworld'), 0, 0); else buy(player, 'Swamp Biome', 'biome:swamp', 15)
                        if(result.selection == 9) if(player.hasTag('biome:desert')) player.teleport(new Location(4520, 81, -1480), world.getDimension('overworld'), 0, 0); else buy(player, 'Desert Biome', 'biome:desert', 15)
                        if(result.selection == 10) if(player.hasTag('biome:mountains')) player.teleport(new Location(1031, 173, -4087), world.getDimension('overworld'), 0, 0); else buy(player, 'Mountains Biome', 'biome:mountains', 30)
                        if(result.selection == 11) if(player.hasTag('biome:badlands')) player.teleport(new Location(4570, 84, -1288), world.getDimension('overworld'), 0, 0); else buy(player, 'Badlands Biome', 'biome:badlands', 50)
                        if(result.selection == 12) if(player.hasTag('biome:icespikes')) player.teleport(new Location(-729, 113, -4758), world.getDimension('overworld'), 0, 0); else buy(player, 'Ice Spikes Biome', 'biome:icespikes', 75)
                    });
                    
                }
                if(result.selection == 3) {
                    const home = player.getTags().find(tag => tag.startsWith('home:'))
                    if(home) {
                        const coords = home.replace('home:', '').split(' dimension ')[0].split(' ')
                        player.teleport(new Location(+coords[0], +coords[1], +coords[2]), world.getDimension(home.split(' dimension ')[1]), 0, 0)
                    } else {
                        player.tell(`§8[§bXSMP§8] §fYou need to set your home first! Run the !homeset command at the co-ordinates you want to be teleported to.`)
                        player.playSound('note.bass')
                    }
                }

            })
        }
        if(result.selection == 1) {
            let sidebar = false
            let welcome = false
            let rewards = false

            if(!player.hasTag('toggle:sidebar')) sidebar = true
            if(!player.hasTag('toggle:welcome')) welcome = true
            if(!player.hasTag('toggle:rewards')) rewards = true

            const settings = new ModalFormData()
            .title('Realm Settings')
            .toggle('Sidebar Scoreboard', sidebar)
            .toggle('Welcome Messages', welcome)
            .toggle('Hourly Rewards', rewards)

            player.playSound('random.pop', {pitch: 0.5})
            
            settings.show(player).then(result => {
                if(result.canceled) return
                if(!result.formValues[0]) player.addTag('toggle:sidebar'); else player.removeTag('toggle:sidebar')
                if(!result.formValues[1]) player.addTag('toggle:welcome'); else player.removeTag('toggle:welcome')
                if(!result.formValues[2]) player.addTag('toggle:rewards'); else player.removeTag('toggle:rewards')
            })
        }
        if(result.selection == 2) {
            const markets = []

            const marketplace = new ActionFormData()
            .title('Marketplace Teleports')
            .body('Where do you want to go?')

            const entities = Array.from(world.getDimension('overworld').getEntities({type: 'xsmp:marketplace', excludeTypes: 'minecraft:player'}))
            for (const ent of entities) {
                const tags = ent.getTags().find(t => t.startsWith('market:'))

                if(tags) {
                    const coords = tags.split('*')[1].split(' facing ')[0].replaceAll('*', '')
                    const facing = tags.split('*')[1].split(' facing ')[1]
                    
                    let name = tags.split('~')[1].split('*')[0]
                    if(name.includes('§')) name = name.substring(2)
    
                    marketplace.button(name)
    
                    markets.push({
                        name: name,
                        coords: coords,
                        facing: facing
                    })
                }
            }

            player.playSound('random.pop', {pitch: 0.5}),
            marketplace.show(player).then(result => {
                if(result.selection == 0 || result.selection) {
                    const coords = markets[result.selection.valueOf()].coords.split(' ')
                    const facing = markets[result.selection.valueOf()].facing.split(' ')

                    player.teleportFacing(new Location(+coords[0], +coords[1], +coords[2]), world.getDimension('overworld'), new Location(+facing[0], +facing[1], +facing[2]))
                }
            })
        }
        if(result.selection == 3) {

            let townCount = 0
            let townNames = []
            let towns = 'None'
            let home = 'No home has been set'

            const coins = getScore('coin', player, true)
            let hours = getScore('hours', player, true)
            const days = Math.floor(hours / 24)
            
            const times = x => f => {
                if (x > 0) {
                    f()
                    times (x - 1) (f)
                }
            }

            times (days) (() => hours = hours - 24)

            const tags = player.getTags()
            tags.forEach(tag => {
                if(tag.startsWith('town:')) {
                    townCount = townCount + 1
                    townNames.push(tag.substring(5).split('-')[0])
                    
                    if(townNames.toString().includes(',')) towns = townNames.toString().replaceAll(',', ', ')
                    else towns = townNames.toString()
                }

                if(tag.startsWith('home:')) {
                    home = `Your home is set to ${tag.substring(5).split(' dimension ')[0]}`
                }
            })
            
            const stats = new MessageFormData()
            .title('Statistics')
            .body(`You've got ${coins} coins.\nYou've played for ${days} days and ${hours} hours.\n\nYou're in ${townCount} towns (${towns}).\n${home}.`)
            .button1('Share Stats')
            .button2('Close')

            stats.show(player).then(result => {
                if(result.selection == 1) {
                    world.say(`§8[§bXSMP§8] §f${player.name} would like to share that they have ${coins} coins and have played ${days} days and ${hours} hours on the XSMP! GG ${player.name}.`);
                    Array.from(world.getPlayers()).forEach(player => player.playSound('random.orb'))
                } 
            })
        }

    });
})