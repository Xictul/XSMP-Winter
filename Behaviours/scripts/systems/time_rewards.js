import { system, world } from '@minecraft/server'
import { getScore } from '../utils/get_score'

system.runSchedule(() => {
    const players = world.getAllPlayers()
    for (const player of players) {
        if(!player.hasTag('toggle:rewards')) {

            const secScore = getScore('seconds', player, true)
            const minScore = getScore('minutes', player, true)
            const hourScore = getScore('hours', player, true)
    
            player.runCommandAsync('scoreboard players add @s seconds 1')
    
            if(secScore >= 60) { // Is the player at 60 seconds? Add a minute and reset second score
                player.runCommandAsync('scoreboard players add @s minutes 1')
                player.runCommandAsync('scoreboard players set @s seconds 0')
            }
    
            if(minScore >= 60) { // Is the player at 60 minutes? Add an hour, reset minute score, add coins
                player.runCommandAsync('scoreboard players add @s hours 1')
                player.runCommandAsync('scoreboard players set @s minutes 0')
    
                const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'] 
                const date = new Date() 
                const day = weekday[date.getDay()] 
        
                if(day == 'Wednesday' || day == 'Sunday') {
                    player.runCommandAsync(`scoreboard players add @s coin 50`)
                    player.tell("§8[§bXSMP§8] §fYou've been awarded 50 coins for playing 60 minutes!") 
                    player.playSound('random.orb') 
                } else {
                    player.runCommandAsync(`scoreboard players add @s coin 25`)
                    player.tell("§8[§bXSMP§8] §fYou've been awarded 25 coins for playing 60 minutes!") 
                    player.playSound('random.orb') 
                }
            }
    
            if(hourScore >= 168 && !player.hasTag('VIP')) { // Is the player at 7 days without the VIP tag? Add VIP tags
                player.addTag('VIP') 
                player.tell('§8[§bXSMP§8] §fYou have spent 7 DAYS on the XSMP! You have now been given the VIP chat rank and access to the exclusive VIP lounge at Spawn. Make sure to let an Admin know so they can get your roles on the Discord as well! Now seriously go touch some grass, and the Minecraft kind does not count!!') 
                player.playSound('random.orb') 
    
                const rankTag = player.getTags().find(tag => tag.startsWith('rank:'))
    
                if(rankTag) {
                    if(rankTag.includes('§bVIP')) return
                    player.removeTag(rankTag)
                    player.addTag(`rank:§bVIP--${rankTag.split(':')[1]}`) 
                } else player.addTag('rank:§bVIP') 
            }
    
        }
    }
}, 20)