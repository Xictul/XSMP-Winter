import { world, Entity } from '@minecraft/server'
import { ActionFormData, MessageFormData, ModalFormData } from '@minecraft/server-ui'
import { getScore } from '../utils/get_score'
import { warnMessage, regularMessage } from '../utils/server_messages'

world.events.beforeItemUse.subscribe(async data => {
    if(data.item.typeId != 'xsmp:gui') return

    const player = data.source
    const tags = player.getTags()
    const overworld = world.getDimension('overworld')

    const mainMenu = new ActionFormData()
    .title('§fRealm GUI')
    .button('§fTeleports\n§7Click To Open', 'textures/xsmp_ui/gui/teleports')
    .button('§fCosmetics\n§7Click To Open', 'textures/xsmp_ui/cosmetics/top_hat')
    .button('§fStatistics\n§7Click To Open', 'textures/xsmp_ui/gui/statistics')
    .button('§fSettings\n§7Click To Open', 'textures/xsmp_ui/gui/settings')

    player.playSound('random.pop')
    const showMenu = await mainMenu.show(player)

    switch (showMenu.selection) {

        // Teleports Menu
        case 0: {

            const teleportsMenu = new ActionFormData()
            .title('§fRealm GUI')
            .body('§7Where do you want to go?')
            .button('§fSpawn\n§7Click To Travel', 'textures/xsmp_ui/gui/spawn')
            .button('§fHome\n§7Click To Travel', 'textures/xsmp_ui/gui/home')
            .button('§fTown\n§7Click To Open', 'textures/xsmp_ui/gui/town')
            .button('§fBiome\n§7Click To Open', 'textures/xsmp_ui/gui/biome')

            let result = await teleportsMenu.show(player)
            
            if(result.selection == 0) player.teleportFacing({ x: 90, y: 118, z: -147 }, overworld, { x: 90, y: 118, z: -146 })
            if(result.selection == 1) homeTeleport()
            if(result.selection == 2) townTeleport()
            if(result.selection == 3) biomeTeleport()

            function homeTeleport() {
                const home = tags.find(tag => tag.startsWith('home:'))
                const coords = home.replace('home:', '').split(' dimension ')[0].split(' ')

                if(home) return player.teleport(({x:+coords[0], y:+coords[1], z:+coords[2]}), world.getDimension(home.split(' dimension ')[1]), 0, 0)
                else return warnMessage(player, 'You need to set your home first! Run the !homeset command at the co-ordinates you want to be teleported to.')
            }

            async function townTeleport() {
                let town1, town2, town3, town1Icon, town2Icon, town3Icon, body, townName1, townName2, townName3
                let townArray = []

                tags.forEach(tag => {if(tag.startsWith('town:')) townArray.push(tag)})

                if(townArray[0]) town1 = townArray[0].substring(5).split('~')
                if(townArray[1]) town2 = townArray[1].substring(5).split('~')
                if(townArray[2]) town3 = townArray[2].substring(5).split('~')
                if(!townArray[0]) town1Icon = 'textures/xsmp_ui/no'; else town1Icon = 'textures/xsmp_ui/yes'
                if(!townArray[1]) town2Icon = 'textures/xsmp_ui/no'; else town2Icon = 'textures/xsmp_ui/yes'
                if(!townArray[2]) town3Icon = 'textures/xsmp_ui/no'; else town3Icon = 'textures/xsmp_ui/yes'

                if(townArray.length == 0) body = '§7You have not joined any towns yet.'
                else body = `§7You have joined ${townArray.length} towns.`

                if(town1) townName1 = `§f${town1[0]}\n§7Click To Travel`; else townName1 = '§7Empty Town Slot'
                if(town2) townName2 = `§f${town2[0]}\n§7Click To Travel`; else townName2 = '§7Empty Town Slot'
                if(town3) townName3 = `§f${town3[0]}\n§7Click To Travel`; else townName3 = '§7Empty Town Slot'

                const townMenu = new ActionFormData()
                .title('§fRealm GUI')
                .body(body)
                .button(townName1, town1Icon)
                .button(townName2, town2Icon)
                .button(townName3, town3Icon)

                const result = await townMenu.show(player)

                if(result.selection == 0) if(town1) player.runCommandAsync(`tp @s ${town1[1]}`)
                if(result.selection == 1) if(town2) player.runCommandAsync(`tp @s ${town2[1]}`)
                if(result.selection == 2) if(town3) player.runCommandAsync(`tp @s ${town3[1]}`)
            }

            async function biomeTeleport() {
                let plainsIcon = 'textures/xsmp_ui/biomes/plains_locked'
                let oakIcon = 'textures/xsmp_ui/biomes/oak_locked'
                let birchIcon = 'textures/xsmp_ui/biomes/birch_locked'
                let spruceIcon = 'textures/xsmp_ui/biomes/spruce_locked'
                let darkOakIcon = 'textures/xsmp_ui/biomes/dark_oak_locked'
                let flowerIcon = 'textures/xsmp_ui/biomes/flower_locked'
                let savannaIcon = 'textures/xsmp_ui/biomes/savanna_locked'
                let jungleIcon = 'textures/xsmp_ui/biomes/jungle_locked'
                let swampIcon = 'textures/xsmp_ui/biomes/swamp_locked'
                let desertIcon = 'textures/xsmp_ui/biomes/desert_locked'
                let mountainIcon = 'textures/xsmp_ui/biomes/mountain_locked'
                let badlandsIcon = 'textures/xsmp_ui/biomes/badlands_locked'
                let iceSpikesIcon = 'textures/xsmp_ui/biomes/ice_spikes_locked'
            
                let plainsStatus = '§fPlains\n§65 coins' // 5 coins
                let oakStatus = '§fOak Forest\n§65 coins' // 5 coins
                let birchStatus = '§fBirch Forest\n§65 coins' // 5 coins
                let spruceStatus = '§fSpruce Forest\n§65 coins' // 5 coins
                let darkOakStatus = '§fDark Oak Forest\n§65 coins' // 5 coins
                let flowerStatus = '§fFlower Forest\n§610 coins' // 10 coins
                let savannaStatus = '§fSavanna\n§610 coins' // 10 coins
                let jungleStatus = '§fJungle\n§615 coins' // 15 coins
                let swampStatus = '§fSwamp\n§615 coins' // 15 coins
                let desertStatus = '§fDesert\n§615 coins' // 15 coins
                let mountainStatus = '§fMountains\n§630 coins' // 30 coins
                let badlandsStatus = '§fBadlands\n§650 coins' // 50 coins
                let iceSpikesStatus = '§fIce Spikes\n§675 coins' // 75 coins
            
                tags.forEach(tag => {
                    if(tag == 'biome:plains') plainsStatus = '§fPlains\n§6Unlocked', plainsIcon = 'textures/xsmp_ui/biomes/plains'
                    if(tag == 'biome:oak') oakStatus = '§fOak Forest\n§6Unlocked', oakIcon = 'textures/xsmp_ui/biomes/oak'
                    if(tag == 'biome:birch') birchStatus = '§fBirch Forest\n§6Unlocked', birchIcon = 'textures/xsmp_ui/biomes/birch'
                    if(tag == 'biome:spruce') spruceStatus = '§fSpruce Forest\n§6Unlocked', spruceIcon = 'textures/xsmp_ui/biomes/spruce'
                    if(tag == 'biome:darkoak') darkOakStatus = '§fDark Oak Forest\n§6Unlocked', darkOakIcon = 'textures/xsmp_ui/biomes/dark_oak'
                    if(tag == 'biome:flower') flowerStatus = '§fFlower Forest\n§6Unlocked', flowerIcon = 'textures/xsmp_ui/biomes/flower'
                    if(tag == 'biome:savanna') savannaStatus = '§fSavanna\n§6Unlocked', savannaIcon = 'textures/xsmp_ui/biomes/savanna'
                    if(tag == 'biome:jungle') jungleStatus = '§fJungle\n§6Unlocked', jungleIcon = 'textures/xsmp_ui/biomes/jungle'
                    if(tag == 'biome:swamp') swampStatus = '§fSwamp Forest\n§6Unlocked', swampIcon = 'textures/xsmp_ui/biomes/swamp'
                    if(tag == 'biome:desert') desertStatus = '§fDesert\n§6Unlocked', desertIcon = 'textures/xsmp_ui/biomes/desert'
                    if(tag == 'biome:mountains') mountainStatus = '§fMountains\n§6Unlocked', mountainIcon = 'textures/xsmp_ui/biomes/mountain'
                    if(tag == 'biome:badlands') badlandsStatus = '§fBadlands\n§6Unlocked', badlandsIcon = 'textures/xsmp_ui/biomes/badlands'
                    if(tag == 'biome:icespikes') iceSpikesStatus = '§fIce Spikes\n§6Unlocked', iceSpikesIcon = 'textures/xsmp_ui/biomes/ice_spikes'
                })
            
                const biomeMenu = new ActionFormData()
                .title('§fRealm GUI')
                .body('§7Where would you like to go?')
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
                .button(mountainStatus, mountainIcon)
                .button(badlandsStatus, badlandsIcon)
                .button(iceSpikesStatus, iceSpikesIcon)

                /**
                * Buy a biome
                * @param {Entity} target The player
                * @param {string} item What is being bought
                * @param {string} tag The tag to give the target
                * @param {number} cost How expensive it is
                */
                function buy(target, item, tag, cost) {
                    const coinCount = getScore('coin', target, true).valueOf()

                    if(coinCount >= cost) {
                        if(!target.hasTag(tag)) {
                            regularMessage(player, `Unlocked ${item} for ${cost} coins.`)
                            target.addTag(tag)
                            target.runCommandAsync(`scoreboard players remove @s coin ${cost}`)
                        } 
                    } else warnMessage(player, `You cannot afford this! You need ${cost - coinCount} more coins.`)
                }

                const showMenu = await biomeMenu.show(player)

                switch (showMenu.selection) {
                    case 0: if(player.hasTag('biome:plains')) player.teleport({x:1597, y:76, z:1619}, overworld, 0, 0); else buy(player, 'Plains Biome','biome:plains', 5); break
                    case 1: if(player.hasTag('biome:oak')) player.teleport({x:-194, y:70, z:2674}, overworld, 0, 0); else buy(player, 'Oak Forest Biome','biome:oak', 5); break
                    case 2: if(player.hasTag('biome:birch')) player.teleport({x:356, y:87, z:3360}, overworld, 0, 0); else buy(player, 'Birch Forest Biome','biome:birch', 5); break
                    case 3: if(player.hasTag('biome:spruce')) player.teleport({x:1077, y:95, z:-3703}, overworld, 0, 0); else buy(player, 'Spruce Forest Biome','biome:spruce', 5); break
                    case 4: if(player.hasTag('biome:darkoak')) player.teleport({x:1172, y:93, z:-3243}, overworld, 0, 0); else buy(player, 'Dark Oak Forest Biome','biome:darkoak', 5); break
                    case 5: if(player.hasTag('biome:flower')) player.teleport({x:2182, y:68, z:1558}, overworld, 0, 0); else buy(player, 'Flower Forest Biome','biome:flower', 10); break
                    case 6: if(player.hasTag('biome:savanna')) player.teleport({x:-6239, y:71, z:4827}, overworld, 0, 0); else buy(player, 'Savanna Biome','biome:savanna', 10); break
                    case 7: if(player.hasTag('biome:jungle')) player.teleport({x:3840, y:64, z:-3682}, overworld, 0, 0); else buy(player, 'Jungle Biome','biome:jungle', 15); break
                    case 8: if(player.hasTag('biome:swamp')) player.teleport({x:3078, y:64, z:-221}, overworld, 0, 0); else buy(player, 'Swamp Biome','biome:swamp', 15); break
                    case 9: if(player.hasTag('biome:desert')) player.teleport({x:4520, y:81, z:-1480}, overworld, 0, 0); else buy(player, 'Desert Biome','biome:desert', 15); break
                    case 10: if(player.hasTag('biome:mountains')) player.teleport({x:1031, y:173, z:-4087}, overworld, 0, 0); else buy(player, 'Mountains Biome','biome:mountains', 30); break
                    case 11: if(player.hasTag('biome:badlands')) player.teleport({x:4570, y:84, z:-1288}, overworld, 0, 0); else buy(player, 'Badlands Biome','biome:badlands', 50); break
                    case 12: if(player.hasTag('biome:icespikes')) player.teleport({x:-729, y:113, z:-4758}, overworld, 0, 0); else buy(player, 'Ice Spikes Biome','biome:icespikes', 75); break
                }
            }

            break
        }

        // Cosmetics Menu
        case 1: {

            const cosmeticsMenu = new ActionFormData()
            .title('§fRealm GUI')
            .body('§7What would you like to buy?')
            .button('§fTop Hat\n§6250 coins', 'textures/xsmp_ui/cosmetics/top_hat')
            .button('§fCake Hat\n§6500 coins', 'textures/xsmp_ui/cosmetics/cake_hat')
            .button('§fWitch Hat\n§6750 coins', 'textures/xsmp_ui/cosmetics/witch_hat')
            .button('§fCrown Hat\n§61000 coins', 'textures/xsmp_ui/cosmetics/crown_hat')

            const showMenu = await cosmeticsMenu.show(player)

            switch (showMenu.selection) {
                case 0: buy(player, 'Top Hat', 'xsmp:top_hat', 250); break
                case 1: buy(player, 'Cake Hat', 'xsmp:cake_hat', 500); break
                case 2: buy(player, 'Witch Hat', 'xsmp:witch_hat', 750); break
                case 3: buy(player, 'Crown Hat', 'xsmp:crown', 1000); break
            }

            /**
            * Buy a biome
            * @param {Entity} target The player
            * @param {string} item What is being bought
            * @param {string} tag The tag to give the target
            * @param {number} cost How expensive it is
            */
            function buy(target, itemName, itemId, cost) {
                const coinCount = getScore('coin', target, true).valueOf()

                if(coinCount >= cost) {
                    regularMessage(player, `Bought ${itemName} for ${cost} coins.`)
                    target.runCommandAsync(`give @s ${itemId}`)
                    target.runCommandAsync(`scoreboard players remove @s coin ${cost}`)
                } else warnMessage(player, `You cannot afford this! You need ${cost - coinCount} more coins.`)
            }

            break
        }

        // Statistics Menu
        case 2: {
            let townCount = 0
            let townNames = []
            let towns = 'None'
            let home = 'No home has been set'

            const coins = getScore('coin', player, true)
            let hours = getScore('hours', player, true)
            const days = Math.floor(hours / 24)

            for (let i = 0; i < days; i++) hours -= 24

            tags.forEach(tag => {
                if(tag.startsWith('town:')) {
                    townCount = townCount + 1
                    townNames.push(tag.substring(5).split('~')[0])
                    
                    if(townNames.toString().includes(',')) towns = townNames.toString().replaceAll(',', ', ')
                    else towns = townNames.toString()
                }

                if(tag.startsWith('home:')) home = `Your home is set to ${tag.substring(5).split(' dimension ')[0]}`
            })
            
            const statisticsMenu = new MessageFormData()
            .title('§fRealm GUI')
            .body(`You've got ${coins} coins.\nYou've played for ${days} days and ${hours} hours.\n\nYou're in ${townCount} towns (${towns}§f).\n${home}.`)
            .button1('Share Stats')
            .button2('Close')

            const showMenu = await statisticsMenu.show(player)

            if(showMenu.selection == 1) {
                world.say(`§8[§bXSMP§8] §f${player.name} has ${coins} coins and have played ${days} days, ${hours} hours on the XSMP! GG ${player.name}!`);
                world.getAllPlayers().forEach(player => player.playSound('random.orb'))
            }

            break
        }

        // Settings Menu
        case 3: {

            let sidebar = false
            let welcome = false
            let rewards = false

            if(!player.hasTag('toggle:sidebar')) sidebar = true
            if(!player.hasTag('toggle:welcome')) welcome = true
            if(!player.hasTag('toggle:rewards')) rewards = true

            const settingsMenu = new ModalFormData()
            .title('§fRealm GUI')
            .toggle('Sidebar Scoreboard', sidebar)
            .toggle('Welcome Messages', welcome)
            .toggle('Hourly Rewards', rewards)

            const showMenu = await settingsMenu.show(player)
            if(!showMenu.formValues[0]) player.addTag('toggle:sidebar'); else player.removeTag('toggle:sidebar')
            if(!showMenu.formValues[1]) player.addTag('toggle:welcome'); else player.removeTag('toggle:welcome')
            if(!showMenu.formValues[2]) player.addTag('toggle:rewards'); else player.removeTag('toggle:rewards')
        
        }

    }

})