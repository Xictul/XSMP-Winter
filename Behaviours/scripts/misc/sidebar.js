import { system, world } from '@minecraft/server'
import { getScore } from '../utils/get_score'

system.runSchedule(() => {

    const players = world.getAllPlayers()
    for (const player of players) {
        
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

    }
})