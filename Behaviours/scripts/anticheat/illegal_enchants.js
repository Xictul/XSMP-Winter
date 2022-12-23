import { InventoryComponentContainer, EnchantmentList, system, world } from '@minecraft/server'
import { warnMessage } from '../utils/server_messages'

system.runSchedule(() => {
    const players = world.getAllPlayers()
    for (const player of players) {

        /**
        * @type InventoryComponentContainer
        * @type EnchantmentList 
        */

        const inventory = player.getComponent('inventory').container
        if (inventory.size != inventory.emptySlotsCount) {
        for (let i = 0; i < inventory.size; i++) {

            const item = inventory.getItem(i)
            if (item) {
                let changed
                const enchantmentList = item.getComponent('minecraft:enchantments').enchantments

                Array.from(enchantmentList, (enchantment) => {
                    const { level, type } = enchantment
                    const { id, maxLevel } = type
                    if (level > maxLevel) {
                        changed = true
                        enchantmentList.removeEnchantment(type)
                        warnMessage(player, 'You are not allowed that enchant!')
                    }
                })

                if (changed) {
                    let enchantmentListNew = item.getComponent('minecraft:enchantments')
                    enchantmentListNew.enchantments = enchantmentList
                    inventory.setItem(i, item)
                }
            }

        }}
    }
}, 20 * 5)

