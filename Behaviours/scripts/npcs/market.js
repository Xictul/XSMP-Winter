import { world, ItemStack, Items, EntityInventoryComponent, Location } from '@minecraft/server'
import { ActionFormData } from '@minecraft/server-ui'
import { getScore } from '../utils'

/**
* @type EntityInventoryComponent
*/

world.events.entityHit.subscribe(data => {
    if(data.hitBlock != undefined) return 

    const player = data.entity
    const entity = data.hitEntity

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
})