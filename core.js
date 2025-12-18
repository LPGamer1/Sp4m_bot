const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const https = require('https');

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const INVITE = "https://discord.gg/ure7pvshFW";
const ALLOWED = ['1319018100217086022', '1421829036916736040', '1440641528321151099'];
const WEBHOOK_LOG = "https://discord.com/api/webhooks/1451307117461114920/TdCzoUuwTUdOTewAWBZLw7cXeo275xJMrC2feDHzMB6_zBfdXZ81G-pEYr0G5S9fy9jl";

const BOT_TYPE = process.env.BOT_TYPE || 'MAIN';
let botEnabled = (BOT_TYPE === 'MAIN');

const RAID_VIDEO = "https://images-ext-1.discordapp.net/external/wRXhfKv8h9gdaolqa1Qehbxyy9kFLHa13mHHPIW8ubU/https/media.tenor.com/3LGBcIuftUkAAAPo/jesus-edit-edit.mp4";

// Gera a grade de 25 botões (5x5)
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

    const commands = [
        new SlashCommandBuilder().setName(BOT_TYPE === 'MAIN' ? 'bot_mode2' : 'bot_mode').setDescription(`Toggle ${BOT_TYPE}`).setIntegrationTypes([1]).setContexts([0,1,2]),
        new SlashCommandBuilder().setName('raid').setDescription('RAID 25 BOTÕES').setIntegrationTypes([1]).setContexts([0,1,2]),
        new SlashCommandBuilder().setName('god').setDescription('RAID RELIGIOSA').setIntegrationTypes([1]).setContexts([0,1,2]),
        new SlashCommandBuilder().setName('button_spam').setDescription('50 BOTÕES').setIntegrationTypes([1]).setContexts([0,1,2]),
        new SlashCommandBuilder().setName('say').setDescription('Repete Mensagem').setIntegrationTypes([1]).setContexts([0,1,2]).addStringOption(o=>o.setName('t').setRequired(true)).addIntegerOption(o=>o.setName('q').setRequired(true)),
        new SlashCommandBuilder().setName('fake_update').setDescription('Aviso de Update').setIntegrationTypes([1]).setContexts([0,1,2])
    ].map(c => c.toJSON());

    client.once('ready', () => {
        rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
        if (CLIENT_ID === process.env.CLIENT_ID_1) {
            const data = JSON.stringify({ content: "# 🚀 BOT 1 ONLINE" });
            const req = https.request(WEBHOOK_LOG, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
            req.write(data); req.end();
        }
    });

    client.on('interactionCreate', async interaction => {
        if (!interaction.isChatInputCommand()) return;
        const { commandName, options, user } = interaction;

        if (commandName.startsWith('bot_mode')) {
            botEnabled = !botEnabled;
            return interaction.reply({ content: `✅ **Sistema:** ${botEnabled ? 'ON' : 'OFF'}`, ephemeral: true });
        }

        if (!botEnabled || !ALLOWED.includes(user.id)) return;
        await interaction.reply({ content: '💀', ephemeral: true });

        if (commandName === 'raid' || commandName === 'button_spam') {
            const btns = getMassiveButtons();
            for(let i=0; i<3; i++) {
                await interaction.followUp({ content: `# **SYSTEM HIJACKED**\n${RAID_VIDEO}`, components: btns });
                await wait(2000);
            }
        }

        if (commandName === 'say') {
            for(let i=0; i<options.getInteger('q'); i++) {
                await interaction.followUp({ content: options.getString('t') });
                await wait(2000);
            }
        }

        if (commandName === 'god') {
            for(let i=0; i<5; i++) {
                await interaction.followUp({ content: `# **CHRIST IS KING**\n${RAID_VIDEO}` });
                await wait(2000);
            }
        }
    });
    client.login(TOKEN);
};
