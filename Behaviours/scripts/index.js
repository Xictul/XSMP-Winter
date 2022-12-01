//              __   __   _____   __  __   _____  
//              \ \ / /  / ____| |  \/  | |  __ \ 
//               \ V /  | (___   | \  / | | |__) |
//                > <    \___ \  | |\/| | |  ___/ 
//               / . \   ____) | | |  | | | |     
//              /_/ \_\ |_____/  |_|  |_| |_|    
// 
//             -- XICTUL'S SURVIVAL MULTIPLAYER --
//                     

// Chat Stuff
import './chat/ranks'
import './chat/commands'

// AntiHack Stuff
import './anticheat/spawn'
import './anticheat/banned-blocks'
import './anticheat/banned-enchants'
import './anticheat/anti-crasher'

// Server Stuff
import './systems/join'
import './systems/gui'
import './systems/mining'
import './systems/rewards'
import './systems/sidebar'
import './systems/enchantings'

// Custom NPC Stuff
import './npcs/names'
import './npcs/santa'
import './npcs/market'
import './npcs/biomefinder'
import './npcs/enchantress'
import './npcs/welcomer'
import './npcs/pvparena'
import './npcs/info'

// Stops Watchdog Error Crashes

import { system } from '@minecraft/server'
 
system.events.beforeWatchdogTerminate.subscribe(event => {
    event.cancel = true
})