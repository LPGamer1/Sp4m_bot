const http = require('http');
const fs = require('fs');
const path = require('path');
const startBot = require('./core.js');

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
    // Rota principal e /home
    if (req.url === '/' || req.url === '/home') {
        // Caminho correto para o arquivo dentro da pasta templates
        const filePath = path.join(__dirname, 'templates', 'home.html');
        
        fs.readFile(filePath, (err, content) => {
            if (err) {
                // Caso o arquivo não seja encontrado, ele avisa no navegador
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end("Erro interno: Verifique se a pasta 'templates' e o arquivo 'home.html' existem no seu GitHub.");
                console.error("Erro ao ler home.html:", err);
            } else {
                // Envia o HTML tecnológico
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(content);
            }
        });
    } else {
        res.writeHead(404);
        res.end("Página não encontrada");
    }
}).listen(PORT);

console.log(`🌐 Servidor Web ativo na porta ${PORT}`);

// Inicializa as instâncias dos Bots em segundo plano
startBot(process.env.TOKEN_1, process.env.CLIENT_ID_1);
startBot(process.env.TOKEN_2, process.env.CLIENT_ID_2);
