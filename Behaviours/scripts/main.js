//              __   __   _____   __  __   _____  
//              \ \ / /  / ____| |  \/  | |  __ \ 
//               \ V /  | (___   | \  / | | |__) |
//                > <    \___ \  | |\/| | |  ___/ 
//               / . \   ____) | | |  | | | |     
//              /_/ \_\ |_____/  |_|  |_| |_|    
// 
//             -- XICTUL'S SURVIVAL MULTIPLAYER --
//

// Realm System Code
import './systems/chat_commands'
import './systems/chat_ranks'
import './systems/mob_protection'
import './systems/spawn_protection'
import './systems/one_player_sleep'
import './systems/joins_leaves'
import './systems/time_rewards'
import './systems/mining_monday'

// Anticheat Code
import './anticheat/illegal_blocks'
import './anticheat/illegal_enchants'
import './anticheat/illegal_coords'

// Misc Code
import './misc/gui'
import './misc/effects'
import './misc/npcs'
import './misc/sidebar'

// Cancel Watchdog Error Crash
import { system, world } from '@minecraft/server'
import { warnMessage } from './utils/server_messages'

system.events.beforeWatchdogTerminate.subscribe(data => {
    data.cancel = true
    world.getAllPlayers().forEach(player => warnMessage(player, 'XSMP Realm rebooting due to excessive server stress. You may experience a lag spike.'))
})