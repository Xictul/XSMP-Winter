import { world } from '@minecraft/server'

world.events.beforeChat.subscribe(data => {

    if(data.message.startsWith('!')) {
        const args = data.message.toLowerCase().slice(1).split(/\s+/g)
        const command = args.shift()
        const player = data.sender
        data.cancel = true

        switch(command) {

            // Member Commands

            case 'help': {
                if(player.hasTag('staff')) player.tell('§8[§7XSMP Commands§8]§f\n§b!spawn §f- §7Teleports you to Spawn\n§b!homeset §f- §7Sets your home co-ords\n§b!gui §f- §7Gives you the server GUI\n\n§b!gmc §f- §7Sets you to creative mode\n§b!gms §f- §7Sets you to survival mode\n§b!gma §f- §7Sets you to adventure mode')
                else player.tell('§8[§7XSMP Commands§8]§f\n§b!spawn §f- §7Teleports you to Spawn\n§b!homeset §f- §7Sets your home co-ords\n§b!gui §f- §7Gives you the server GUI')
                break
            }

            case 'spawn':
                player.teleportFacing(new Location(90, 118, -147), world.getDimension('overworld'), new Location(90, 118, -146))
                break

            case 'homeset': {
                const tag = player.getTags().find(tag => tag.startsWith('home:'))
                const x = player.location.x.toString().split('.')
                const z = player.location.z.toString().split('.')
                const y = player.location.y.toString()

                if(tag) player.removeTag(tag)

                player.addTag(`home:${x[0]}.${x[1].substring(0, 2)} ${y} ${z[0]}.${z[1].substring(0, 2)} dimension ${player.dimension.id}`)
                player.playSound('random.orb')
                player.tell(`§8[§bXSMP§8] §fHome set to ${x[0]}.${x[1].substring(0, 2)}, ${y}, ${z[0]}.${z[1].substring(0, 2)} in your current dimension.`)
                break
            }

            case 'gui':
                player.runCommandAsync('give @s xsmp:gui')
                break

            // Staff Commands

            case 'creative':
            case 'gmc':
                if(player.hasTag('staff')) player.runCommandAsync('gamemode c')
                else player.tell('§8[§bXSMP§8] §fYou cannot use that command!'), player.playSound('note.bass')
                break

            case 'survival':
            case 'gms':
                if(player.hasTag('staff')) player.runCommandAsync('gamemode s')
                else player.tell('§8[§bXSMP§8] §fYou cannot use that command!'), player.playSound('note.bass')
                break

            case 'adventure':
            case 'gma':
                if(player.hasTag('staff')) player.runCommandAsync('gamemode a')
                else player.tell('§8[§bXSMP§8] §fYou cannot use that command!'), player.playSound('note.bass')
                break

            // Not A Command

            default:
                player.tell('§8[§bXSMP§8] §fThe command you entered does not exist!')
                player.playSound('note.bass')
                break
        }
    }
})