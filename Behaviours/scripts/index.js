//              __   __   _____   __  __   _____  
//              \ \ / /  / ____| |  \/  | |  __ \ 
//               \ V /  | (___   | \  / | | |__) |
//                > <    \___ \  | |\/| | |  ___/ 
//               / . \   ____) | | |  | | | |     
//              /_/ \_\ |_____/  |_|  |_| |_|    
// 
//             -- XICTUL'S SURVIVAL MULTIPLAYER --
//                     

// Scripty Stuff
import './anticheat'
import './chat'
import './npcs'
import './server'
import './names'

// Stops Watchdog Error Crashes

import { system } from '@minecraft/server'
 
system.events.beforeWatchdogTerminate.subscribe(event => {
    event.cancel = true
})