// Removido o require('dotenv') pois o Render já fornece as variáveis nativamente
const startBot = require('./core.js');

// Pega as variáveis de ambiente do Render
const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;

if (!TOKEN || !CLIENT_ID) {
    console.error("❌ ERRO CRÍTICO: Faltam variáveis de ambiente (DISCORD_TOKEN ou DISCORD_CLIENT_ID) no painel do Render.");
    process.exit(1);
}

// Inicia o bot
startBot(TOKEN, CLIENT_ID);

// Sistema anti-crash
process.on('unhandledRejection', (reason, p) => {
    console.log(' [Anti-Crash] Rejeição:', reason);
});
process.on('uncaughtException', (err, origin) => {
    console.log(' [Anti-Crash] Erro:', err);
});
