import { InventoryComponentContainer, EnchantmentList, system, world } from "@minecraft/server"
import { getGamemode, getScore } from './utils'

system.runSchedule(() => {
    const players = Array.from(world.getPlayers())
    for (const player of players) if(player.dimension.id == 'minecraft:overworld') if(player.location.x < 500 && player.location.z < 500) player.runCommandAsync('tp @e[family=monster,r=200] ~ -100 ~')  
}, 20 * 3)

system.runSchedule(() => {
    world.getDimension('minecraft:overworld').runCommandAsync('execute @a[tag=enchanting:soul] ~~~ particle minecraft:soul_particle ~~~')
    world.getDimension('minecraft:overworld').runCommandAsync('execute @a[tag=enchanting:redflame] ~~~ particle minecraft:basic_flame_particle ~~~')
    world.getDimension('minecraft:overworld').runCommandAsync('execute @a[tag=enchanting:blueflame] ~~~ particle minecraft:blue_flame_particle ~~~')
    world.getDimension('minecraft:overworld').runCommandAsync('execute @a[tag=enchanting:drippinglava] ~~~ particle minecraft:lava_drip_particle ~~~')
    world.getDimension('minecraft:overworld').runCommandAsync('execute @a[tag=enchanting:loveheart] ~~~ particle minecraft:heart_particle ~~2~')
    world.getDimension('minecraft:overworld').runCommandAsync('execute @a[tag=enchanting:thundercloud] ~~~ particle minecraft:villager_angry ~~2~')

    const players = Array.from(world.getPlayers())
    for(const player of players) {
        const dimension = player.dimension.id
        const gamemode = getGamemode(player)
        const x = Math.abs(player.location.x)
        const z = Math.abs(player.location.z)

        // Sidebar

        if(player.hasTag('toggle:sidebar')) player.onScreenDisplay.clearTitle()
        else {
    
            let coins = getScore('coin', player, true)
    
            let mins = getScore('minutes', player, true)
            let hours = getScore('hours', player, true)
            let days = Math.floor(hours / 24)
            
            const times = x => f => {
                if (x > 0) {
                    f()
                    times (x - 1) (f)
                }
            }
    
            times (days) (() => hours -= 24)
    
            let online = players.length
            let obj = world.scoreboard.getObjective('members')
            let peak = obj.getScore(obj.getParticipants().find(part => part.displayName == "peak"))
    
            let date = new Date()
            let hour = date.getHours()
            let minute = date.getMinutes()
            let second = date.getSeconds()
    
            if(hour == 0 && minute == 0 && second == 0) {
                new tickTimeout(() => {
                    player.runCommandAsync('scoreboard players set peak members 0')
                    player.tell(`§8[§bXSMP§8] §rToday's peak member count has been reset.`)
                    player.playSound('random.orb')
                }, 20)
            } else if(online > peak) {
                player.runCommandAsync(`scoreboard players set peak members ${online}`)
                player.tell(`§8[§bXSMP§8] §rToday's peak member count is now ${online}!`)
                player.playSound('random.orb')
            }
    
            let events = "None"
            let weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
            let day = weekday[date.getDay()]
    
            let tomorrow = new Date()
            let today = new Date()
            tomorrow.setDate(today.getDate() + 1)
            tomorrow.setHours(0,0,0,0)
    
            let diffMs = (tomorrow - today)
            let minsLeft = Math.floor((diffMs/1000)/60)
            let hrsLeft = Math.floor(minsLeft / 60)
    
            if(day == "Monday") events = `Mining Monday (${hrsLeft}h left)`
            if(day == 'Wednesday' || day == "Sunday") events = `Coin Boost (${hrsLeft}h left)`
    
            let x = player.location.x.toString().split('.')[0]
            let z = player.location.z.toString().split('.')[0]
            let y = player.location.y.toString().split('.')[0]
    
            player.onScreenDisplay.setTitle(`\n\n  §bPlayer Info§r\n  Time Played: ${days}d, ${hours}h, ${mins}m\n  Total Coins: ${coins}\n  Coords: ${x}, ${y}, ${z}\n\n\n  §bCurrent Events§r\n  ${events}\n\n\n  §bServer Info§r\n  Members Online: ${online}\n  Peak Today: ${peak}`)
    
        }
    
        // Gamemode Changer
    
        if(dimension == 'minecraft:overworld') {
            if(!player.hasTag('staff')) {
                if(gamemode == 'creative') player.tell('§8[§bXSMP§8] §rYou are not allowed to be in creative mode.'), player.playSound('note.bass'), player.runCommandAsync('gamemode s')
                if((x < 500 && z < 500) && (gamemode == 'survival')) player.runCommandAsync('gamemode a')
                if((x > 500 || z > 500) && (gamemode == 'adventure')) player.runCommandAsync('gamemode s')
            }
        } else if(!player.hasTag('staff')) player.runCommandAsync('gamemode s')
    
        // Anticrasher
    
        if(Math.abs(player.location.x) >= 30000000 || Math.abs(player.location.y) >= 30000000 || Math.abs(player.location.z) >= 30000000) {
            player.runCommandAsync(`kick "${player.name}" Attempting to crash the server.`)
            player.triggerEvent(`xsmp:kick`)
        }

        // Illegal Enchants

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

        }}
    }
})
