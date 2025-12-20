const http = require('http');
const fs = require('fs');
const path = require('path');
const startBot = require('./core.js');

// --- SERVIDOR WEB (Mostra o site templates/home.html) ---
const server = http.createServer((req, res) => {
    // Define o caminho do ficheiro: pasta atual + templates + home.html
    const filePath = path.join(__dirname, 'templates', 'home.html');

    // Tenta ler o ficheiro
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // Se der erro (ex: ficheiro não existe), mostra mensagem simples
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end(`Erro no Servidor: Não foi possível carregar home.html. (${err.code})`);
            console.error("❌ Erro ao ler HTML:", err);
        } else {
            // Se ler com sucesso, envia o HTML
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(process.env.PORT || 3000, () => {
    console.log('🌐 Web Server Online: A servir templates/home.html na porta 3000.');
});

// --- LANÇADOR DE BOTS (Lógica inalterada) ---
const botsConfig = [
    { 
        name: "BOT_PRINCIPAL", 
        token: process.env.DISCORD_TOKEN,
        clientId: process.env.DISCORD_CLIENT_ID 
    },
    { 
        name: "BOT_SECUNDARIO", 
        token: process.env.DISCORD_TOKEN_2,
        clientId: process.env.DISCORD_CLIENT_ID_2 
    }
];

let botsOnline = 0;

(async () => {
    console.log("🚀 Iniciando sistema...");

    for (const bot of botsConfig) {
        if (!bot.token) {
            console.log(`ℹ️ [${bot.name}] Ignorado (Sem Token).`);
            continue;
        }

        try {
            // Inicia o bot
            await startBot(bot.token, bot.clientId || "000000000000000000"); 
            console.log(`✅ [${bot.name}] LIGADO COM SUCESSO!`);
            botsOnline++;
        } catch (err) {
            console.error(`❌ [${bot.name}] Falhou ao iniciar:`, err.message);
        }
    }

    if (botsOnline === 0) {
        console.log("⚠️ Nenhum bot online (Verifique as Variáveis de Ambiente). O site continua a funcionar.");
    }

})();

// --- ANTI-CRASH ---
process.on('unhandledRejection', (reason, p) => {});
process.on('uncaughtException', (err, origin) => {});
