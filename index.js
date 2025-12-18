const http = require('http');
const fs = require('fs');
const path = require('path');
const startBot = require('./core.js');

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
    // Atende tanto a raiz "/" quanto "/home"
    if (req.url === '/' || req.url === '/home') {
        const filePath = path.join(__dirname, 'templates', 'home.html');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                // Se der erro, mostra a mensagem de texto antiga para não cair o Render
                res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end(`SP4M_B0T Ativo - Modo: ${process.env.BOT_TYPE || 'MAIN'}`);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(content);
            }
        });
    } else {
        res.writeHead(404);
        res.end("Página não encontrada");
    }
}).listen(PORT);

console.log(`Servidor rodando na porta ${PORT}`);

// Inicializa os bots usando o core.js fornecido
startBot(process.env.TOKEN_1, process.env.CLIENT_ID_1);
startBot(process.env.TOKEN_2, process.env.CLIENT_ID_2);
