
require('dotenv').config();
const express = require('express');
const path = require('path');
const startBot = require('./core.js');

// --- SISTEMA DE WEB SERVER (PARA O RENDER NÃO MATAR O BOT) ---
const app = express();
const PORT = process.env.PORT || 3000;

// Serve os arquivos da pasta 'public' (se tiveres CSS/Imagens lá)
app.use(express.static('public'));

// Rota principal: Carrega o teu home.html
app.get('/', (req, res) => {
    // Tenta carregar o ficheiro da pasta templates
    const homePath = path.join(__dirname, 'templates', 'home.html');
    res.sendFile(homePath, (err) => {
        if (err) {
            // Se der erro ou não existir, manda texto simples
            res.send('🤖 SP4M_BOT.EXE está online. System Hijacked.');
        }
    });
});

// Mantém a porta aberta ouvindo o Render
app.listen(PORT, () => {
    console.log(`🌐 Web Server rodando na porta ${PORT}`);
});

// --- INICIA O BOT DISCORD ---
const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;

if (!TOKEN || !CLIENT_ID) {
    console.error("❌ ERRO: Faltam variáveis de ambiente (DISCORD_TOKEN ou DISCORD_CLIENT_ID).");
} else {
    startBot(TOKEN, CLIENT_ID);
}

// Anti-Crash (Evita que o bot desligue por erros bobos)
process.on('unhandledRejection', (reason, p) => console.log(' [Anti-Crash] Rejeição:', reason));
process.on('uncaughtException', (err, origin) => console.log(' [Anti-Crash] Erro:', err));
