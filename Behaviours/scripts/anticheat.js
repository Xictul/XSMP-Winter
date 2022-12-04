import { world, system, InventoryComponentContainer, EnchantmentList } from "@minecraft/server"
import { getGamemode } from "./utils";

/**
* @type InventoryComponentContainer
* @type EnchantmentList 
*/


system.runSchedule(() => {
    const players = Array.from(world.getPlayers());
    for (const player of players) if(player.hasTag('inSpawn')) player.runCommandAsync('tp @e[family=monster,r=200] ~ -100 ~')
}, 100)


system.runSchedule(() => {

    const players = Array.from(world.getPlayers())
    for (const player of players) {


        // Spawn Commands //


        if(player.hasTag('staff')) return

        const gamemode = getGamemode(player)
        const x = Math.abs(player.location.x)
        const z = Math.abs(player.location.z)

        if(player.dimension.id != 'minecraft:overworld') player.removeTag('inSpawn')
        if(x > 500 || z > 500) player.removeTag('inSpawn')
        if((player.dimension.id == 'minecraft:overworld') && (x < 500 || z < 500)) player.addTag('inSpawn')

        if(gamemode == 'creative' && !player.hasTag('staff')) {
            player.tell('§8[§bXSMP§8] §rYou are not allowed to be in creative mode.')
            player.playSound('note.bass')
            player.runCommandAsync('gamemode s')
        } else if(gamemode == 'survival' && player.hasTag('inSpawn') && !player.hasTag('staff')) {
            player.runCommandAsync('gamemode a') 
        } if(gamemode == 'adventure' && !player.hasTag('inSpawn') && !player.hasTag('staff')) {
            player.runCommandAsync('gamemode s') 
        }


        // Anticrasher //


        if(Math.abs(player.location.x) >= 30000000 || Math.abs(player.location.y) >= 30000000 || Math.abs(player.location.z) >= 30000000) {

            player.runCommandAsync(`kick "${player.name}" Attempting to crash the server.`)
            player.triggerEvent(`xsmp:kick`)
            
        }


        // Banned Enchants //


        const inventory = player.getComponent('inventory').container
        if (inventory.size === inventory.emptySlotsCount) return
        for (let i = 0; i < inventory.size; i++) {

            const item = inventory.getItem(i)
            if (!item) return

            let changed
            const enchantmentList = item.getComponent('minecraft:enchantments').enchantments

            Array.from(enchantmentList, (enchantment) => {
                const { level, type } = enchantment
                const { id, maxLevel } = type
                if (level > maxLevel) {
                    changed = true
                    enchantmentList.removeEnchantment(type)
                    player.tell('§8[§bXSMP§8] §rYou are not allowed that enchant.')
                    player.playSound('note.bass')
                }
            })

            if (changed) {
                let enchantmentListNew = item.getComponent('minecraft:enchantments')
                enchantmentListNew.enchantments = enchantmentList
                inventory.setItem(i, item)
            }

        }

    }
})


// Banned Blocks //


world.events.beforeItemUseOn.subscribe(data => {
    const player = data.source
    const block = data.item.typeId

    const bannedBlocks = [
        'minecraft:beehive',
        'minecraft:bee_nest',
        'minecraft:moving_block',
        'minecraft:movingblock',
        'minecraft:mob_spawner',
        'minecraft:repeating_command_block',
        'minecraft:chain_command_block',
        'minecraft:command_block',
        'minecraft:structure_block',
        'minecraft:border',
        'minecraft:border_block',
        'minecraft:barrier',
        'minecraft:bedrock',
        'minecraft:deny',
        'minecraft:allow',
        'minecraft:camera',
        'minecraft:lit_deepslate_redstone_ore',
        'minecraft:soul_fire',
        'minecraft:stickypistonarmcollision',
        'minecraft:light_block',
        'minecraft:lit_blast_furnace',
        'minecraft:jigsaw',
        'minecraft:lava_cauldron',
        'minecraft:sweet_berry_bush',
        'minecraft:lit_smoker',
        'minecraft:bamboo_sapling',
        'minecraft:bubble_column',
        'minecraft:chalkboard',
        'minecraft:structure_void',
        'minecraft:info_update2',
        'minecraft:info_update',
        'minecraft:netherreactor',
        'minecraft:glowstick',
        'minecraft:glowingobsidian',
        'minecraft:cave_head_body_with_verries',
        'minecraft:cave_vines_body_with_verries',
        'minecraft:end_portal_frame',
        'minecraft:end_portal',
        'minecraft:end_gateway',
        'minecraft:invisiblebedrock',
        'minecraft:powered_repeater',
        'minecraft:unpowered_repeater',
        'minecraft:daylight_detector_inverted',
        'minecraft:portal',
        'minecraft:unlit_redstone_torch',
        'minecraft:lit_redstone_ore',
        'minecraft:lit_furnace',
        'minecraft:fire',
        'minecraft:powered_comparator',
        'minecraft:unpowered_comparator',
        'minecraft:tripwire',
        'minecraft:pistonarmcollision',
        'minecraft:lit_redstone_lamp',
        'minecraft:water',
        'minecraft:flowing_water',
        'minecraft:lava',
        'minecraft:flowing_lava',
        'minecraft:melon_stem',
        'minecraft:pumpkin_stem'
    ]

    if(player.hasTag('staff')) return
    if(bannedBlocks.includes(block)) {
        data.cancel = true
        player.tell('§8[§bXSMP§8] §rYou cannot place that block.')
        player.playSound('note.bass')
    }
})