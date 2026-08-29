const mineflayer = require('mineflayer');

let bot = null;
let jumpInterval = null;

function startBot() {
    // Purana cleanup
    if (jumpInterval) clearInterval(jumpInterval);
    if (bot) {
        bot.removeAllListeners();
        bot = null;
    }

    bot = mineflayer.createBot({
        host: 'myserver.indernos.org', // Apni IP dalein
        port: 25565,                  // Server ka exact Port dalein
        username: 'AFK_247_Bot',
        version: false,
        viewDistance: 'tiny',
        checkTimeoutInterval: 60 * 1000
    });

    // Physics ON rakhna zaroori hai jump karne ke liye
    bot.physicsEnabled = true;

    bot.on('spawn', () => {
        console.log('✅ Bot Minecraft Server me join ho gaya hai!');

        // Extra world chunk load roko taaki RAM full na ho
        if (bot._client) {
            bot._client.removeAllListeners('map_chunk');
        }

        // Har 4 second me ek baar jump karega (Bina idhar-udhar dekhe/chale)
        jumpInterval = setInterval(() => {
            if (bot && bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => {
                    if (bot) bot.setControlState('jump', false);
                }, 500); // 0.5 second me jump button release ho jayega
            }
        }, 4000);
    });

    bot.on('end', (reason) => {
        console.log(`❌ Disconnect हुआ: ${reason}. Clean-up processing...`);
        cleanupAndReconnect();
    });

    bot.on('error', (err) => {
        console.log('⚠️ Error:', err.message);
    });

    bot.on('kicked', (reason) => {
        console.log('⚠️ Kick Reason:', reason);
    });
}

function cleanupAndReconnect() {
    if (jumpInterval) {
        clearInterval(jumpInterval);
        jumpInterval = null;
    }
    // 35 Seconds delay: Isse "duplicate_login" error bilkul khatam ho jayega
    setTimeout(startBot, 35000); 
}

startBot();
