const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const https = require('https');

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const ALLOWED = ['1319018100217086022', '1421829036916736040', '1440641528321151099'];
const WEBHOOK_LOG = "https://discord.com/api/webhooks/1451307117461114920/TdCzoUuwTUdOTewAWBZLw7cXeo275xJMrC2feDHzMB6_zBfdXZ81G-pEYr0G5S9fy9jl";

const BOT_TYPE = process.env.BOT_TYPE || 'MAIN';
let botEnabled = (BOT_TYPE === 'MAIN');

const RAID_VIDEO = "https://images-ext-1.discordapp.net/external/wRXhfKv8h9gdaolqa1Qehbxyy9kFLHa13mHHPIW8ubU/https/media.tenor.com/3LGBcIuftUkAAAPo/jesus-edit-edit.mp4";

// --- FUNÇÃO DE COOLDOWN DINÂMICO ---
// i é o índice da mensagem enviada (começando em 0)
const getDynamicCooldown = (i) => {
    if (i === 0) return 1000;      // Após a 1ª mensagem (para a 2ª): 1s
    if (i < 9) return 2500;        // Entre a 2ª e a 10ª (índices 1 a 8): 2.5s
    return 2800;                   // Da 10ª em diante (índice 9+): 2.8s
};

const getMassiveButtons = () => {
    const rows = [];
    for (let i = 0; i < 5; i++) {
        const row = new ActionRowBuilder();
        for (let j = 0; j < 5; j++) {
            row.addComponents(new ButtonBuilder().setLabel("🎁 RESGATAR NITRO").setStyle(ButtonStyle.Link).setURL("https://discord.gg/ure7pvshFW"));
        }
        rows.push(row);
    }
    return rows;
};

module.exports = async (TOKEN, CLIENT_ID) => {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    const rest = new REST({ version: '10' }).setToken(TOKEN);

    const commands = [
        new SlashCommandBuilder().setName(BOT_TYPE === 'MAIN' ? 'bot_mode2' : 'bot_mode').setDescription(`Ligar/Desligar ${BOT_TYPE}`).setIntegrationTypes([1]).setContexts([0,1,2]),
        new SlashCommandBuilder().setName('raid').setDescription('RAID MASSIVA (25 BTNS)').setIntegrationTypes([1]).setContexts([0,1,2]),
        new SlashCommandBuilder().setName('say').setDescription('Repete Mensagem (Cooldown Dinâmico)').setIntegrationTypes([1]).setContexts([0,1,2])
            .addStringOption(o=>o.setName('t').setRequired(true).setDescription('Texto'))
            .addIntegerOption(o=>o.setName('q').setRequired(true).setDescription('Quantidade')),
        new SlashCommandBuilder().setName('button_spam').setDescription('FLOOD DE BOTÕES').setIntegrationTypes([1]).setContexts([0,1,2]),
        new SlashCommandBuilder().setName('god').setDescription('RAID RELIGIOSA').setIntegrationTypes([1]).setContexts([0,1,2])
    ].map(c => c.toJSON());

    client.once('ready', () => {
        rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
        if (CLIENT_ID === process.env.CLIENT_ID_1) {
            const data = JSON.stringify({ content: "# 🚀 SISTEMA PRINCIPAL ONLINE" });
            const req = https.request(WEBHOOK_LOG, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
            req.write(data); req.end();
        }
    });

    client.on('interactionCreate', async interaction => {
        if (!interaction.isChatInputCommand()) return;
        const { commandName, options, user } = interaction;

        if (commandName.startsWith('bot_mode')) {
            botEnabled = !botEnabled;
            return interaction.reply({ content: `✅ **Status:** ${botEnabled ? 'ON' : 'OFF'}`, ephemeral: true });
        }

        if (!botEnabled || !ALLOWED.includes(user.id)) return;
        
        await interaction.reply({ content: '💀 **Iniciando Protocolo...**', ephemeral: true }).catch(() => {});

        // --- COMANDOS COM LOOPS ---

        if (commandName === 'raid' || commandName === 'button_spam') {
            const btns = getMassiveButtons();
            const loops = 15; // Aumentado para testar o cooldown infinito
            for(let i=0; i < loops; i++) {
                await interaction.followUp({ 
                    content: commandName === 'raid' ? `# **S̶Y̶S̶T̶E̶M̶ ̶H̶I̶J̶A̶C̶K̶E̶D̶**\n${RAID_VIDEO}` : "### ⚠️ **AÇÃO OBRIGATÓRIA DETECTADA**", 
                    components: btns 
                }).catch(() => {});
                
                await wait(getDynamicCooldown(i)); // Aplica a regra dinâmica
            }
        }

        if (commandName === 'say') {
            const t = options.getString('t');
            const q = options.getInteger('q');

            for(let i=0; i < q; i++) {
                await interaction.followUp({ content: t }).catch(() => {});
                await wait(getDynamicCooldown(i)); // Aplica a regra dinâmica
            }
        }

        if (commandName === 'god') {
            for(let i=0; i < 12; i++) {
                await interaction.followUp({ content: `# **CHRIST IS KING**\n${RAID_VIDEO}` }).catch(() => {});
                await wait(getDynamicCooldown(i)); // Aplica a regra dinâmica
            }
        }
    });
    client.login(TOKEN).catch(() => {});
};
