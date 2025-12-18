const http = require('http');
const startBot = require('./core.js');

// Servidor HTTP para o Render
http.createServer((req, res) => {
  res.write("Sistema Multi-Bot Online (2 Instancias Ativas)");
  res.end();
}).listen(process.env.PORT || 3000);

console.log("🚀 Iniciando Bots...");

// Inicia Instância 1
startBot(process.env.TOKEN_1, process.env.CLIENT_ID_1);

// Inicia Instância 2
startBot(process.env.TOKEN_2, process.env.CLIENT_ID_2);
