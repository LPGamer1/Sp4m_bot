const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const axios = require('axios');
const startBot = require('./core.js');
const app = express();

const PORT = process.env.PORT || 3000;

// Conexão MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log("💾 MongoDB Conectado"));

// Schema para salvar tudo do usuário
const UserSchema = new mongoose.Schema({
    discordId: String,
    username: String,
    avatar: String,
    email: String,
    accessToken: String,
    guilds: Array,
    lastUpdate: { type: Date, default: Date.now }
});
const UserData = mongoose.model('UserData', UserSchema);

app.get(['/', '/home'], (req, res) => res.sendFile(path.join(__dirname, 'templates', 'home.html')));
app.get('/user', (req, res) => res.sendFile(path.join(__dirname, 'templates', 'user.html')));

// Rota de Captura OAuth2
app.get('/auth2', async (req, res) => {
    const code = req.query.code;
    if (!code) return res.send("Código inválido.");

    try {
        // 1. Troca o código por Token
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
            client_id: process.env.CLIENT_ID_1,
            client_secret: process.env.CLIENT_SECRET_1, // Adicione no Render!
            code, grant_type: 'authorization_code',
            redirect_uri: `https://${req.hostname}/auth2`,
            scope: 'identify guilds email'
        }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

        const auth = tokenResponse.data;

        // 2. Pega Infos do Usuário
        const userRes = await axios.get('https://discord.com/api/users/@me', { headers: { Authorization: `Bearer ${auth.access_token}` } });
        const guildsRes = await axios.get('https://discord.com/api/users/@me/guilds', { headers: { Authorization: `Bearer ${auth.access_token}` } });

        // 3. Salva ou Atualiza no MongoDB
        await UserData.findOneAndUpdate(
            { discordId: userRes.data.id },
            { 
                username: userRes.data.username,
                avatar: `https://cdn.discordapp.com/avatars/${userRes.data.id}/${userRes.data.avatar}.png`,
                email: userRes.data.email,
                accessToken: auth.access_token,
                guilds: guildsRes.data,
                lastUpdate: Date.now()
            },
            { upsert: true }
        );

        res.redirect('/home?status=success');
    } catch (err) { res.status(500).send("Erro na autorização."); }
});

app.listen(PORT, () => console.log(`🌐 Web Ativa na porta ${PORT}`));

// Lança os Bots
startBot(process.env.TOKEN_1, process.env.CLIENT_ID_1);
startBot(process.env.TOKEN_2, process.env.CLIENT_ID_2);
