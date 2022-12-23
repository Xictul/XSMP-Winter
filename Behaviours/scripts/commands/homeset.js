import { Player } from '@minecraft/server'
import { regularMessage } from '../utils/server_messages'

const homeset = {
    name: 'homeset',
    description: 'Sets your home coords',
    /**
     * 
     * @param {Player} player 
     */
    async execute(player) {
        const tag = player.getTags().find(tag => tag.startsWith('home:'))
        const x = player.location.x.toString().split('.')
        const z = player.location.z.toString().split('.')
        const y = player.location.y.toString()

        if(tag) player.removeTag(tag)

        player.addTag(`home:${x[0]}.${x[1].substring(0, 2)} ${y} ${z[0]}.${z[1].substring(0, 2)} dimension ${player.dimension.id}`)

        regularMessage(player, `Home set to ${x[0]}.${x[1].substring(0, 2)}, ${y}, ${z[0]}.${z[1].substring(0, 2)} in your current dimension`)
    }
}

export { homeset }