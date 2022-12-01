import { world, system, InventoryComponentContainer, EnchantmentList } from '@minecraft/server';

system.runSchedule(() => {
    const players = Array.from(world.getPlayers());
    for (const player of players) {
        /**
        * @type InventoryComponentContainer
        */
        const inventory = player.getComponent('inventory').container;
        if (inventory.size === inventory.emptySlotsCount) return;
        // console.warn(inventory.size, inventory.emptySlotsCount);
        for (let i = 0; i < inventory.size; i++) {
            const item = inventory.getItem(i);
            if (!item) return;
            let changed;
            /**
             * @type EnchantmentList 
             */
            const enchantmentList = item.getComponent('minecraft:enchantments').enchantments;
            Array.from(enchantmentList, (enchantment) => {
                const { level, type } = enchantment;
                const { id, maxLevel } = type;
                if (level > maxLevel) {
                    changed = true;
                    enchantmentList.removeEnchantment(type);
                    player.tell('§8[§bXSMP§8] §rYou are not allowed that enchant.');
                    player.playSound('note.bass');
                }
            });
            if (changed) {
                let enchantmentListNew = item.getComponent('minecraft:enchantments');
                enchantmentListNew.enchantments = enchantmentList;
                inventory.setItem(i, item);
            }
        }
    }
})