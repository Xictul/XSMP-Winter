import { world, InventoryComponentContainer, EnchantmentList } from '@minecraft/server';

/**
* @type InventoryComponentContainer
* @type EnchantmentList 
*/

const miningMondays = [
    'minecraft:diamond_ore',
    'minecraft:ancient_debris',
    'minecraft:emerald_ore',
    'minecraft:gold_ore'
]

world.events.blockBreak.subscribe(data => {
    const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const date = new Date();
    const day = weekday[date.getDay()];
    const block = data.brokenBlockPermutation.type.id;
    const player = data.player;
    const { selectedSlot } = player 
    const mainhand = player.getComponent('inventory').container.getItem(selectedSlot)

    if(mainhand == undefined) {
        if(day != 'Monday') return;
        if(miningMondays.includes(block)) {
            player.runCommandAsync(`scoreboard players add @s coin 5`)
            player.tell("§8[§bXSMP§8] §rYou've been awarded 5 coins!");
            player.playSound('random.orb');
        }
    } else {
        const enchantmentList = mainhand.getComponent('minecraft:enchantments').enchantments

        let silkTouch = false
        if(day != 'Monday') return;
    
        Array.from(enchantmentList, (enchantment) => {
            const { type } = enchantment;
            if(type.id == 'silkTouch') silkTouch = true
        })
    
        if(miningMondays.includes(block) && !silkTouch) {
            player.runCommandAsync(`scoreboard players add @s coin 5`)
            player.tell("§8[§bXSMP§8] §rYou've been awarded 5 coins!");
            player.playSound('random.orb');
        }
    }
})