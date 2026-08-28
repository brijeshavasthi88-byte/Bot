const mineflayer = require('mineflayer');

function startBot() {
    const bot = mineflayer.createBot({
        host: 'delhi-176447.indernos.in', // Yahan apna Indernos Server IP dalo (jaise: myserver.indernos.org)
        port: 25565,             // Yahan apna Port number dalo
        username: 'AFK_247_Bot'  // Bot ka Username
    });

    bot.on('spawn', () => {
        console.log('✅ Bot Minecraft Server me join ho gaya hai!');
    });

    bot.on('end', () => {
        console.log('❌ Disconnect ho gaya! 10 second me reconnect ho raha hai...');
        setTimeout(startBot, 10000);
    });

    bot.on('error', (err) => {
        console.log('⚠️ Error:', err.message);
    });
}

startBot();
