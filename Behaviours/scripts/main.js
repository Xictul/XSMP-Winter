//              __   __   _____   __  __   _____  
//              \ \ / /  / ____| |  \/  | |  __ \ 
//               \ V /  | (___   | \  / | | |__) |
//                > <    \___ \  | |\/| | |  ___/ 
//               / . \   ____) | | |  | | | |     
//              /_/ \_\ |_____/  |_|  |_| |_|    
// 
//             -- XICTUL'S SURVIVAL MULTIPLAYER --
//

// Event Based Code
import './block'
import './chat'
import './effects'
import './npcs'
import './rewards'
import './server'
import './tick'

// Tick Based Code


// Stops Watchdog Error Crashes
import { system } from '@minecraft/server'

system.events.beforeWatchdogTerminate.subscribe(event => {
    event.cancel = true
})