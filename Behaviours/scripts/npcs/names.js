import { world } from '@minecraft/server'

const entities = Array.from(world.getDimension('overworld').getEntities())
for (const entity of entities) {

    // Main Four NPCs
    if(entity.typeId == 'xsmp:enchantress') entity.nameTag = `§e§lEnchantress\n§r§7Click Me`
    if(entity.typeId == 'xsmp:info') entity.nameTag = `§a§lRealm Guide\n§r§7Click Me`
    if(entity.typeId == 'xsmp:pvparena') entity.nameTag = `§b§lPVP Arena\n§r§7Click Me`
    if(entity.typeId == 'xsmp:marketplace' && entity.hasTag('spawnNPC')) entity.nameTag = `§d§lMarketplace\n§r§7Click Me`

    // Other Spawn NPCs
    if(entity.typeId == 'xsmp:biomefinder') entity.nameTag = `§6§lBiome Finder\n§r§7Click Me`
    if(entity.typeId == 'xsmp:welcomer') entity.nameTag = `§b§lWelcome!\n§r§7Click Me`
    // if(entity.typeId == 'xsmp:quests') entity.nameTag = `§e§lQuests\n§r§7Click Me`

    // Limited Time NPCs
    if(entity.typeId == 'xsmp:santa') entity.nameTag = `§e§lSanta\n§r§7Click Me`
    if(entity.typeId == 'xsmp:unavailable') entity.nameTag = `§7§lUnavailable`

    // Marketplace Customisable NPCs

    const tags = entity.getTags().find(tag => tag.startsWith('market:'))
    if(tags && entity.typeId == 'xsmp:marketplace' && tags.includes('~')) entity.nameTag = `${tags.split('~')[1].split('*')[0]}\n§r§7Click Me`

}