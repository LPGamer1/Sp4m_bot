const startBot = require('./core.js');
const http = require('http');

// --- SISTEMA DE MANTER O RENDER VIVO (Fake Web Server) ---
// O Render precisa de uma porta aberta para saber que o serviço está "Healthly"
const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('SP4M BOT is Running!');
});
server.listen(process.env.PORT || 3000, () => {
    console.log('🌐 Web Server de suporte online (Mantém o Render ativo).');
});

// --- LISTA DE BOTS PARA TENTAR INICIAR ---
// O script vai procurar por estas variáveis no Render
const botsConfig = [
    { name: "BOT_PRINCIPAL", token: process.env.DISCORD_TOKEN, clientId: process.env.DISCORD_CLIENT_ID },
    { name: "BOT_SECUNDARIO", token: process.env.DISCORD_TOKEN_2, clientId: process.env.DISCORD_CLIENT_ID_2 }
];

let botsOnline = 0;

(async () => {
    console.log("🚀 Iniciando lançador de bots...");

    for (const bot of botsConfig) {
        if (!bot.token) {
            console.log(`⚠️ [${bot.name}] Pulei: Token não configurado nas variáveis.`);
            continue;
        }

        if (!bot.clientId) {
            console.warn(`🔸 [${bot.name}] Aviso: CLIENT_ID não encontrado. O bot vai ligar, mas comandos novos podem não registar.`);
        }

        try {
            // Tenta iniciar o bot usando o core.js
            await startBot(bot.token, bot.clientId || "00000000000"); // Passa 0 se não tiver ID para não crashar
            console.log(`✅ [${bot.name}] Iniciado com sucesso!`);
            botsOnline++;
        } catch (err) {
            console.error(`❌ [${bot.name}] Falha ao iniciar:`, err.message);
        }
    }

    if (botsOnline === 0) {
        console.error("❌ NENHUM BOT FICOU ONLINE. Verifique as Variáveis de Ambiente (DISCORD_TOKEN).");
        console.log("💤 O processo ficará ativo aguardando correções...");
    } else {
        console.log(`✨ Total de Bots Online: ${botsOnline}`);
    }

})();

// --- ANTI-CRASH SUPREMO ---
// Impede que o Render desligue por erros de código
process.on('unhandledRejection', (reason, p) => {
    console.log(' [Anti-Crash] Rejeição ignorada:', reason);
});
process.on('uncaughtException', (err, origin) => {
    console.log(' [Anti-Crash] Erro ignorado:', err);
});
