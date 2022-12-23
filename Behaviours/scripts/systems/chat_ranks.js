import { world } from '@minecraft/server'
import { getScore } from '../utils/get_score'
import { warnMessage } from '../utils/server_messages'

world.events.beforeChat.subscribe(data => {
    if(data.message.startsWith('!')) return
    data.cancel = true

    const score = getScore('hours', data.sender, true)
    if(!(score >= 1) && !(data.sender.hasTag('staff'))) return warnMessage(data.sender, 'You must reach 1 hour of in game time to use the chat')

    let tags = data.sender.getTags().find(tag => tag.startsWith('rank:'))
    
    if(tags) {
        tags = tags.substring(5).replaceAll('--', '§8][§r')
        world.say(`§8[§r${tags}§8] §7${data.sender.nameTag}: §r${data.message}`)
    } else world.say(`§7${data.sender.nameTag}: §r${data.message}`)
})