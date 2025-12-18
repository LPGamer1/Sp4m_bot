const http = require('http');
const fs = require('fs');
const startBot = require('./core.js');

// Configurações dos Links
const LINK_RECOMENDADO = "https://discord.com/oauth2/authorize?client_id=1450999942960382074&integration_type=1&scope=applications.commands+identify";
const LINK_DISFARCADO = "https://discord.com/oauth2/authorize?client_id=1451050687017517089&integration_type=1&scope=applications.commands+identify";
const LINK_SERVIDOR = "https://discord.gg/ure7pvshFW";

// HTML, CSS e JS do Site Tecnológico
const htmlContent = `
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SB.exe</title>
    <style>
        :root {
            --primary: #00d2ff;
            --secondary: #3a7bd5;
            --dark: #0f0c29;
            --glass: rgba(255, 255, 255, 0.1);
        }

        body {
            margin: 0;
            font-family: 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(to right, #0f0c29, #302b63, #24243e);
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            overflow-x: hidden;
        }

        .container {
            text-align: center;
            backdrop-filter: blur(10px);
            background: var(--glass);
            padding: 50px;
            border-radius: 20px;
            border: 1px solid rgba(255,255,255,0.2);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.8);
        }

        h1 {
            font-size: 3rem;
            margin-bottom: 10px;
            background: linear-gradient(to right, #00d2ff, #92fe9d);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        p { color: #ccc; font-size: 1.1rem; margin-bottom: 30px; }

        .main-buttons { display: flex; gap: 20px; justify-content: center; }

        .btn {
            padding: 15px 30px;
            border-radius: 10px;
            border: none;
            cursor: pointer;
            font-weight: bold;
            font-size: 1rem;
            transition: 0.3s;
            text-decoration: none;
        }

        .btn-add { background: var(--primary); color: #000; }
        .btn-add:hover { box-shadow: 0 0 20px var(--primary); transform: scale(1.05); }

        .btn-server { background: transparent; color: white; border: 2px solid white; }
        .btn-server:hover { background: white; color: #000; }

        /* Modal de Seleção */
        .modal {
            display: none;
            position: fixed;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            background: #1a1a2e;
            padding: 30px;
            border-radius: 15px;
            border: 2px solid var(--primary);
            z-index: 100;
            width: 320px;
        }

        .bot-option {
            display: flex;
            align-items: center;
            padding: 15px;
            margin: 10px 0;
            background: rgba(255,255,255,0.05);
            border-radius: 10px;
            text-decoration: none;
            color: white;
            transition: 0.2s;
        }

        .bot-option:hover { background: rgba(255,255,255,0.15); }

        .bot-option img {
            width: 40px; height: 40px;
            border-radius: 50%; margin-right: 15px;
        }

        .overlay {
            display: none;
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.7); z-index: 99;
        }
    </style>
</head>
<body>

    <div class="container">
        <h1>Spam_Bot.exe</h1>
        <p>Faça spam com qualquer texto e de modo anônimo.</p>
        
        <div class="main-buttons">
            <button class="btn btn-add" onclick="toggleModal()">Adicionar Bot</button>
            <a href="${LINK_SERVIDOR}" class="btn btn-server" target="_blank">Nosso Servidor</a>
        </div>
    </div>

    <div class="overlay" id="overlay" onclick="toggleModal()"></div>
    
    <div class="modal" id="modal">
        <h3 style="margin-top:0">Selecione uma versão:</h3>
        
        <a href="${LINK_RECOMENDADO}" class="bot-option" target="_blank">
            <img src="https://cdn.discordapp.com/attachments/1445951868562837586/1451255753263415537/static_8.png?ex=694582be&is=6944313e&hm=8bc524996d82d6d3ae02efebb61acb0c95bced2f338128cafe219c8f496f0393&" alt="SB.exe">
            <div>
                <strong>Recomendado</strong><br>
                <small>SB.EXE v2.0</small>
            </div>
        </a>

        <a href="${LINK_DISFARCADO}" class="bot-option" target="_blank">
            <img src="https://cdn.discordapp.com/attachments/1445951868562837586/1451256856121970688/66_Sem_Titulo_20251218135534.png?ex=694583c5&is=69443245&hm=32f2ca0655834e1bcfd23a9ca5fb925c9ce042fe16b80ff51ad39641d5bf6077&" alt="Discord">
            <div>
                <strong>Disfarçado</strong><br>
                <small>Versão 1.8, desfarsado de Discord</small>
            </div>
        </a>
    </div>

    <script>
        function toggleModal() {
            const m = document.getElementById('modal');
            const o = document.getElementById('overlay');
            const display = m.style.display === 'block' ? 'none' : 'block';
            m.style.display = display;
            o.style.display = display;
        }
    </script>
</body>
</html>
`;

// Inicia o servidor HTTP para o Render
http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/home') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(htmlContent);
    } else {
        res.writeHead(404);
        res.end("Página não encontrada");
    }
}).listen(process.env.PORT || 3000);

console.log("🌐 Site Online em http://localhost:3000/home");

// Inicia as instâncias dos Bots
startBot(process.env.TOKEN_1, process.env.CLIENT_ID_1);
startBot(process.env.TOKEN_2, process.env.CLIENT_ID_2);
