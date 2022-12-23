import { world } from '@minecraft/server'
import { gms } from '../commands/gms'
import { gmc } from '../commands/gmc'
import { gma } from '../commands/gma'
import { gmsp } from '../commands/gmsp'
import { gui } from '../commands/gui'
import { spawn } from '../commands/spawn'
import { homeset } from '../commands/homeset'

world.events.beforeChat.subscribe(data => {
    if(!data.message.startsWith('!')) return
    data.cancel = true

    const args = data.message.slice(1).split(/ +/)
    const command = args.shift().toLowerCase()

    switch (command) {
        
        // Staff Commands
        case gms.name: gms.execute(data.sender); break
        case gmc.name: gmc.execute(data.sender); break
        case gma.name: gma.execute(data.sender); break
        case gmsp.name: gmsp.execute(data.sender); break

        // Member Commands
        case gui.name: gui.execute(data.sender); break
        case spawn.name: spawn.execute(data.sender); break
        case homeset.name: homeset.execute(data.sender); break

        // Help Command
        case 'help':
        default: {

            let regular = `§8[§fXSMP Commands§8]§f\n§b!gui §f- §7${gui.description}\n§b!spawn §f- §7${spawn.description}\n§b!homeset §f- §7${homeset.description}`
            let staff = `\n\n§b!gms §f- §7${gms.description}\n§b!gmsp §f- §7${gmsp.description}\n§b!gmc §f- §7${gmc.description}\n§b!gma §f- §7${gma.description}`

            if(data.sender.hasTag('staff')) data.sender.tell(regular + staff)
            else data.sender.tell(regular)

        } break

    }
})