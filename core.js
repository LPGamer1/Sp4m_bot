const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const https = require('https');

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const WEBHOOK_LOG = "https://discord.com/api/webhooks/1451307117461114920/TdCzoUuwTUdOTewAWBZLw7cXeo275xJMrC2feDHzMB6_zBfdXZ81G-pEYr0G5S9fy9jl";
const INVITE = "https://discord.gg/ure7pvshFW";

// Controle de interrupção por servidor
const stopSignals = new Map();

// Texto Religioso Original Restaurado
const GOD_TEXT = `# If you do not believe in God then change your ways. Philippians 4:13 *** "I can do all things through Christ who strengthens me"***\n\n# *** John 3:16 "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life"***\n\n# ****GOD IS KING****\n# ****GOD IS KING****\n# ****GOD IS KING****\n# ****GOD IS KING****\n# ****GOD IS KING****\n-# @everyone @here\nhttps://tenor.com/view/jesus-edit-edit-jesus-christ-is-king-christ-edit-gif-15902634079600751945`;

// --- SISTEMA DE COOLDOWN DINÂMICO ---
const getDynamicCooldown = (i) => {
    if (i === 0) return 1000;      // 1ª para 2ª: 1s
    if (i < 9) return 2500;        // 3ª até 10ª: 2.5s
    return 2800;                   // 10ª em diante: 2.8s
};

// Grade de 25 botões para impacto máximo
const getMassiveButtons = () => {
    const rows = [];
    for (let i = 0; i < 5; i++) {
        const row = new ActionRowBuilder();
        for (let j = 0; j < 5; j++) {
            row.addComponents(new ButtonBuilder().setLabel("🎁 RESGATAR NITRO").setStyle(ButtonStyle.Link).setURL(INVITE));
        }
        rows.push(row);
    }
    return rows;
};

module.exports = async (TOKEN, CLIENT_ID) => {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    const rest = new REST({ version: '10' }).setToken(TOKEN);

    // Definição dos comandos (Sem /mode)
    const commands = [
        new SlashCommandBuilder().setName('raid').setDescription('RAID 25 BTNS').setIntegrationTypes([1]).setContexts([0,1,2]),
        new SlashCommandBuilder().setName('say').setDescription('Repete Mensagem').setIntegrationTypes([1]).setContexts([0,1,2])
            .addStringOption(o=>o.setName('t').setRequired(true).setDescription('Texto'))
            .addIntegerOption(o=>o.setName('q').setRequired(true).setDescription('Quantidade')),
        new SlashCommandBuilder().setName('button_spam').setDescription('FLOOD DE BOTÕES').setIntegrationTypes([1]).setContexts([0,1,2]),
        new SlashCommandBuilder().setName('god').setDescription('RAID RELIGIOSA').setIntegrationTypes([1]).setContexts([0,1,2]),
        new SlashCommandBuilder().setName('stop').setDescription('Para o bot neste servidor').setIntegrationTypes([1]).setContexts([0,1,2])
    ].map(c => c.toJSON());

    client.once('ready', () => {
        rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
        if (CLIENT_ID === process.env.CLIENT_ID_1) {
            const req = https.request(WEBHOOK_LOG, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
            req.write(JSON.stringify({ content: "# 🚀 SISTEMA ONLINE (ACESSO TOTAL)" })); req.end();
        }
    });

    client.on('interactionCreate', async interaction => {
        if (!interaction.isChatInputCommand()) return;
        const { commandName, options, guildId } = interaction;

        // Comando /stop: Disponível para todos
        if (commandName === 'stop') {
            stopSignals.set(guildId, true);
            return interaction.reply({ content: '🛑 **PARAGEM FORÇADA.** Todos os comandos neste servidor foram encerrados.', ephemeral: true });
        }

        // Resposta imediata efêmera para evitar o erro "Aplicativo não respondeu"
        await interaction.reply({ 
            content: '💀 **Comando Executado.**\n💡 *Use `/stop` para parar a marretada neste servidor.*', 
            ephemeral: true 
        }).catch(() => {});

        stopSignals.set(guildId, false);

        // --- EXECUÇÃO COM COOLDOWN DINÂMICO ---

        if (commandName === 'raid' || commandName === 'button_spam') {
            const btns = getMassiveButtons();
            for(let i=0; i < 50; i++) { // Limite alto para garantir marretada longa
                if (stopSignals.get(guildId)) break; 
                
                await interaction.followUp({ 
                    content: commandName === 'raid' ? `# **S̶Y̶S̶T̶E̶M̶ ̶H̶I̶J̶A̶C̶K̶E̶D̶**` : "### ⚠️ **AÇÃO OBRIGATÓRIA DETECTADA**", 
                    components: btns 
                }).catch(() => {});
                
                await wait(getDynamicCooldown(i));
            }
        }

        if (commandName === 'say') {
            const t = options.getString('t');
            const q = options.getInteger('q');
            for(let i=0; i < q; i++) {
                if (stopSignals.get(guildId)) break;
                await interaction.followUp({ content: t }).catch(() => {});
                await wait(getDynamicCooldown(i));
            }
        }

        if (commandName === 'god') {
            for(let i=0; i < 20; i++) {
                if (stopSignals.get(guildId)) break;
                await interaction.followUp({ content: GOD_TEXT }).catch(() => {});
                await wait(getDynamicCooldown(i));
            }
        }
    });

    client.login(TOKEN).catch(() => {});
};
