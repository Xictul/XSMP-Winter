import { world, EntityInventoryComponent, Items, ItemStack } from '@minecraft/server'
import { MessageFormData } from '@minecraft/server-ui'

/**
* @type EntityInventoryComponent
*/

world.events.entityHit.subscribe(data => {
    if(data.hitBlock != undefined) return 

    const player = data.entity
    const entity = data.hitEntity

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
})