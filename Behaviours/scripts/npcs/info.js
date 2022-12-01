import { world, Location } from '@minecraft/server'
import { ActionFormData } from '@minecraft/server-ui'

world.events.entityHit.subscribe(data => {
    if(data.hitBlock != undefined) return 

    const player = data.entity
    const entity = data.hitEntity

    const gui = new ActionFormData()
    .title('Realm Guide')
    .body('What would you like to know about?')
    .button('Coins')
    .button('NPCs')
    .button('Gamerules')
    .button('Realm GUI')
    .button('Towns')
    .button('PVP Arena')

    function coins() {
        player.playSound('xsmp.misc.paper')
        player.tell(`§8[§bXSMP§8] §fCoins are the XSMP's realm currency. They can be used to buy things like cosmetics, enchantings, biome teleports and more! Coins can be earned passively just by playing on the realm, or by participating in realm events. If a realm event is active, you will see it on the sidebar.`)
    }

    function npcs() {
        player.playSound('xsmp.misc.paper')
        player.tell(`§8[§bXSMP§8] §fThere are NPCs, such as myself, scattered around spawn and each NPC will do something different. To interact with NPCs, you can click them to trigger their GUIs (General User Interfaces).`)
    }

    function gamerules() {
        player.playSound('xsmp.misc.paper')
        player.tell(`§8[§bXSMP§8] §fSome gamerules have been enabled/disabled in the realm. The most noteable ones include there being no fall damage, no PvP (outside the arena), and no TNT explosions for obvious reasons.`)
    }

    function realmgui() {
        player.playSound('xsmp.misc.paper')
        player.tell(`§8[§bXSMP§8] §fThe realm GUI (General User Interface) can be used to teleport the various places in the world, check out your player stats, toggle certain realm settings or open up other GUIs. To get the GUI item, run the !gui command.`)
    }

    function towns() {
        player.playSound('xsmp.misc.paper')
        player.tell(`§8[§bXSMP§8] §fTowns are small sub-communities on the realm. In each town, there can only be up to 10 members and 4 members are required to create one. Town status means your own chat only accessable to the town's members on the XSMP Discord, an in realm chat rank and Discord role, a protective border surrounding the town that stops non-town members getting in and an option to teleport to the town from the Realm GUI.`)
    }

    function pvparena() {
        player.playSound('xsmp.misc.paper')
        player.tell(`§8[§bXSMP§8] §fThe PvP arena is a place next to spawn where you can fight with up to 3 other members. This is the only zone in the entire realm where PvP is enabled for members within it. Any items lost or broken in the Arena cannot be retrieved so make sure to put anything valuable in a chest elsewhere.`)
    }

    if(entity.typeId == 'xsmp:info') {
        if(entity.hasTag('spawnNPC')) {
            player.teleportFacing(new Location(109, 35, -146), world.getDimension('overworld'), new Location(109, 35, -145))
        } else {
            player.playSound('random.pop', {pitch: 0.5})
            gui.show(player).then(result => {
                if(result.selection == 0) coins()
                if(result.selection == 1) npcs()
                if(result.selection == 2) gamerules()
                if(result.selection == 3) realmgui()
                if(result.selection == 4) towns()
                if(result.selection == 5) pvparena()
            })
        }
    }
})