const startBot = require('./core.js');
const http = require('http');

// --- MANTÉM O RENDER ONLINE (Fake Server) ---
// O Render precisa de uma porta aberta para não desligar o serviço
const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('SP4M BOT is Running!');
});
server.listen(process.env.PORT || 3000, () => {
    console.log('🌐 Web Server de suporte online (Porta 3000).');
});

// --- LISTA DE BOTS PARA LIGAR ---
// O código vai procurar estas chaves exatas no teu Render
const botsConfig = [
    { 
        name: "BOT_PRINCIPAL", 
        token: process.env.DISCORD_TOKEN,       // Chave no Render: DISCORD_TOKEN
        clientId: process.env.DISCORD_CLIENT_ID // Chave no Render: DISCORD_CLIENT_ID
    },
    { 
        name: "BOT_SECUNDARIO", 
        token: process.env.DISCORD_TOKEN_2,     // Chave no Render: DISCORD_TOKEN_2
        clientId: process.env.DISCORD_CLIENT_ID_2 // Chave no Render: DISCORD_CLIENT_ID_2
    }
];

let botsOnline = 0;

(async () => {
    console.log("🚀 Iniciando sistema de bots...");

    for (const bot of botsConfig) {
        // Se não tiver token, pula sem dar erro (permite rodar apenas 1 bot)
        if (!bot.token) {
            console.log(`ℹ️ [${bot.name}] Ignorado (Variável não configurada).`);
            continue;
        }

        try {
            console.log(`🔄 [${bot.name}] A tentar conectar...`);
            // Se não tiver CLIENT_ID, usa um dummy "000" só para não crashar, mas comandos podem falhar
            await startBot(bot.token, bot.clientId || "000000000000000000"); 
            console.log(`✅ [${bot.name}] LIGADO COM SUCESSO!`);
            botsOnline++;
        } catch (err) {
            console.error(`❌ [${bot.name}] Falhou ao iniciar:`, err.message);
        }
    }

    if (botsOnline === 0) {
        console.error("⚠️ NENHUM BOT FICOU ONLINE. Verifique as 'Environment Variables' no Render.");
        console.log("   Necessário: 'DISCORD_TOKEN' (e 'DISCORD_CLIENT_ID' para comandos).");
    } else {
        console.log(`✨ Total de Bots Operacionais: ${botsOnline}`);
    }

})();

// --- ANTI-CRASH GERAL ---
// Impede que o Render desligue por erros aleatórios
process.on('unhandledRejection', (reason, p) => {
    console.log(' [Anti-Crash] Rejeição detetada (Bot continua online).');
});
process.on('uncaughtException', (err, origin) => {
    console.log(' [Anti-Crash] Erro detetado (Bot continua online).');
});
