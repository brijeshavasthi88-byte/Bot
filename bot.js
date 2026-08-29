const mineflayer = require('mineflayer');

let bot = null;
let lookInterval = null;

function startBot() {
    // Purane bot event listeners aur intervals ko saaf karna
    if (lookInterval) {
        clearInterval(lookInterval);
        lookInterval = null;
    }
    if (bot) {
        bot.removeAllListeners();
        bot = null;
    }

    bot = mineflayer.createBot({
        host: 'myserver.indernos.org', // Apni IP dalein
        port: 25565,                  // Server ka exact Port dalein
        username: 'AFK_247_Bot',
        version: false,               // Auto-detect server version (Disconnect loop fix)
        viewDistance: 'tiny',         // Minimum memory allocation
        checkTimeoutInterval: 60 * 1000 // Server timeout latency fix
    });

    // World physics ko disable karke RAM bachana
    bot.physicsEnabled = false;

    bot.on('spawn', () => {
        console.log('✅ Bot Minecraft Server me successfully join ho gaya hai!');

        // RAM bachane ke liye extra chunk data load hone se rokna
        if (bot._client) {
            bot._client.removeAllListeners('map_chunk');
        }

        // Safe movement loop (Join hone ke 5 sec baad start hoga)
        setTimeout(() => {
            if (lookInterval) clearInterval(lookInterval);
            
            lookInterval = setInterval(() => {
                if (bot && bot.entity) {
                    const yaw = Math.random() * Math.PI * 2;
                    const pitch = (Math.random() - 0.5) * (Math.PI / 2);
                    bot.look(yaw, pitch, true);
                }
            }, 5000);
        }, 5000);
    });

    bot.on('end', (reason) => {
        console.log(`❌ Disconnect hua: ${reason}. 20 sec me reconnect ho raha hu...`);
        cleanupAndReconnect();
    });

    bot.on('error', (err) => {
        console.log('⚠️ Error:', err.message);
    });

    bot.on('kicked', (reason) => {
        console.log('⚠️ Server ne Kick kiya, Reason:', reason);
    });
}

function cleanupAndReconnect() {
    if (lookInterval) {
        clearInterval(lookInterval);
        lookInterval = null;
    }
    setTimeout(startBot, 20000); // 20 sec delay taaki Aternos Anti-Spam trigger na ho
}

startBot();
