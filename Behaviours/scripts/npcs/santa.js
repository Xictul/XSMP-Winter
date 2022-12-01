import { world, EntityInventoryComponent, Items, ItemStack } from '@minecraft/server'
import { MessageFormData } from '@minecraft/server-ui'

/**
* @type EntityInventoryComponent
*/

world.events.entityHit.subscribe(data => {
    if(data.hitBlock != undefined) return 

    const player = data.entity
    const entity = data.hitEntity

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
})