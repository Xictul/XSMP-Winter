import { world } from '@minecraft/server'
import { getScore } from '../utils'

world.events.beforeChat.subscribe(data => {
    data.cancel = true
    
    const player = data.sender
    const score = getScore('hours', player, true)
    if(data.message.startsWith('!')) return
    if(!score >= 1 && !player.hasTag('staff')) return player.tell('§8[§bXSMP§8] §rYou must reach 1 hour of in game time to use the chat!'), player.playSound('note.bass')

    let tags = player.getTags().find(tag => tag.startsWith('rank:'))
    if(tags) {
        tags = tags.substring(5).replaceAll('--', '§8][§r')
        world.say(`§8[§r${tags}§8] §7${player.nameTag}: §r${data.message}`)
    } else world.say(`§7${player.nameTag}: §r${data.message}`)
})