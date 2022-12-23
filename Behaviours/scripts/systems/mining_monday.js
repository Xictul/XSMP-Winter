import { world, EntityInventoryComponent, EnchantmentList } from '@minecraft/server'
import { regularMessage } from '../utils/server_messages'

world.events.blockBreak.subscribe(data => {

    const miningMondays = [
        'minecraft:diamond_ore',
        'minecraft:ancient_debris',
        'minecraft:emerald_ore',
        'minecraft:gold_ore',
        'minecraft:deepslate_diamond_ore',
        'minecraft:deepslate_emerald_ore',
        'minecraft:deepslate_gold_ore'
    ]

    /**
    * @type EntityInventoryComponent
    * @type EnchantmentList 
    */

    const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const date = new Date()
    const day = weekday[date.getDay()]
    const block = data.brokenBlockPermutation.type.id
    const player = data.player
    const { selectedSlot } = player 
    const mainhand = player.getComponent('inventory').container.getItem(selectedSlot)

    if(mainhand == undefined) {
        if(day == 'Monday') if(miningMondays.includes(block)) {
            player.runCommandAsync(`scoreboard players add @s coin 5`)
            player.tell("§8[§bXSMP§8] §rYou've been awarded 5 coins!")
            player.playSound('random.orb')
        }
    } else {
        const enchantmentList = mainhand.getComponent('minecraft:enchantments').enchantments

        let silkTouch = false
        if(day == 'Monday') {
            Array.from(enchantmentList, (enchantment) => {
                const { type } = enchantment
                if(type.id == 'silkTouch') silkTouch = true
            })
        
            if(miningMondays.includes(block) && !silkTouch) {
                player.runCommandAsync(`scoreboard players add @s coin 1`)
                regularMessage(player, `Awarded 1 coin.`)
            }
        }
    }

})