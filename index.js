const http = require('http');
const fs = require('fs');
const path = require('path');
const startBot = require('./core.js');

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
    // Rota para o site tecnológico
    if (req.url === '/' || req.url === '/home') {
        const filePath = path.join(__dirname, 'templates', 'home.html');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end("Erro: Página não encontrada.");
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(content);
            }
        });
    } else {
        res.writeHead(404);
        res.end("Not Found");
    }
}).listen(PORT);

// Inicia os bots
startBot(process.env.TOKEN_1, process.env.CLIENT_ID_1);
startBot(process.env.TOKEN_2, process.env.CLIENT_ID_2);
