import { world } from '@minecraft/server';

world.events.beforeItemUseOn.subscribe(data => {
    const player = data.source;
    const block = data.item.typeId;

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

    if(player.hasTag('staff')) return;
    if(bannedBlocks.includes(block)) {
        data.cancel = true
        player.tell('§8[§bXSMP§8] §rYou cannot place that block.')
        player.playSound('note.bass')
    }
});