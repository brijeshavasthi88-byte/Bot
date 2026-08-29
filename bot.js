const mineflayer = require('mineflayer');

function startBot() {
    const bot = mineflayer.createBot({
        host: 'delhi-176447.indernos.in',
        port: 25565,
        username: 'AFK_247_Bot'
    });

    bot.on('spawn', () => {
        console.log('✅ Bot Minecraft Server me join ho gaya hai!');

        // Har 3 second me bot alag direction me munder/gardann ghumayega
        setInterval(() => {
            // Random yaw (daayein/baayein) aur pitch (upaar/neeche) calculate karna
            const yaw = Math.random() * Math.PI * 2; // 360 degree rotation
            const pitch = (Math.random() - 0.5) * Math.PI / 2; // Upaar-neeche dekhna

            // Mouse ki tarah camera turn karega bina position badle
            bot.look(yaw, pitch, true);
        }, 3000);
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
