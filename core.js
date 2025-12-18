const { 
  Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, 
  EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle 
} = require('discord.js');
const https = require('https');

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const INVITE_LINK = "https://discord.gg/ure7pvshFW";
const ALLOWED_USERS = ['1319018100217086022', '1421829036916736040', '1440641528321151099'];

const BOT_TYPE = process.env.BOT_TYPE || 'MAIN';
let botEnabled = (BOT_TYPE === 'MAIN');

// Webhook para notificação (Só Bot 1)
const STARTUP_WEBHOOK = "https://discord.com/api/webhooks/1451307117461114920/TdCzoUuwTUdOTewAWBZLw7cXeo275xJMrC2feDHzMB6_zBfdXZ81G-pEYr0G5S9fy9jl";

const RAID_VIDEO = "https://images-ext-1.discordapp.net/external/wRXhfKv8h9gdaolqa1Qehbxyy9kFLHa13mHHPIW8ubU/https/media.tenor.com/3LGBcIuftUkAAAPo/jesus-edit-edit.mp4";
const BUTTON_TEXTS = ["🎁 RESGATAR NITRO", "💎 OBTER GEMAS", "🔥 CARGO VIP", "⭐ RECOMPENSA", "🚀 BOOST"];

// Função para gerar a grade de 25 botões (5x5)
const getMassiveButtons = () => {
  const rows = [];
  for (let i = 0; i < 5; i++) {
    const row = new ActionRowBuilder();
    for (let j = 0; j < 5; j++) {
      row.addComponents(
        new ButtonBuilder()
          .setLabel(BUTTON_TEXTS[j])
          .setStyle(ButtonStyle.Link)
          .setURL(INVITE_LINK)
      );
    }
    rows.push(row);
  }
  return rows;
};

module.exports = async (TOKEN, CLIENT_ID) => {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });
  const rest = new REST({ version: '10' }).setToken(TOKEN);

  async function registerCommands() {
    const commands = [
      new SlashCommandBuilder().setName(BOT_TYPE === 'MAIN' ? 'bot_mode2' : 'bot_mode').setDescription(`Toggle ${BOT_TYPE}`).setIntegrationTypes([1]).setContexts([0,1,2]),
      new SlashCommandBuilder().setName('god').setDescription('RAID RELIGIOSA (PESADA)').setIntegrationTypes([1]).setContexts([0,1,2]),
      new SlashCommandBuilder().setName('raid').setDescription('RAID DE BOTÕES (25 UNIDADES)').setIntegrationTypes([1]).setContexts([0,1,2]),
      new SlashCommandBuilder().setName('say').setDescription('Repete Mensagem').setIntegrationTypes([1]).setContexts([0,1,2])
        .addStringOption(o=>o.setName('texto').setRequired(true).setDescription('Texto'))
        .addIntegerOption(o=>o.setName('quantidade').setRequired(true).setDescription('Vezes')),
      new SlashCommandBuilder().setName('button_spam').setDescription('FLOOD DE BOTÕES (MAX)').setIntegrationTypes([1]).setContexts([0,1,2]),
      new SlashCommandBuilder().setName('fake_update').setDescription('Aviso de Update').setIntegrationTypes([1]).setContexts([0,1,2])
    ].map(c => c.toJSON());
    try { await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands }); } catch (e) {}
  }

  client.once('ready', () => {
    registerCommands();
    // Notificação Apenas do Bot 1
    if (CLIENT_ID === process.env.CLIENT_ID_1) {
      const data = JSON.stringify({ content: "# 🚀 BOT 1 ONLINE" });
      const req = https.request(STARTUP_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': data.length },
      });
      req.write(data); req.end();
    }
  });

  client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const { commandName, options } = interaction;

    if (commandName.startsWith('bot_mode')) {
        botEnabled = !botEnabled;
        return interaction.reply({ content: `✅ **Sistema:** ${botEnabled ? 'ON' : 'OFF'}`, ephemeral: true });
    }

    if (!botEnabled) return;
    await interaction.reply({ content: '💀', ephemeral: true }).catch(() => {});

    // Comandos de Flood Pesado
    if (commandName === 'button_spam' || commandName === 'raid') {
      const buttons = getMassiveButtons();
      for (let i = 0; i < 5; i++) {
        await interaction.followUp({ 
          content: commandName === 'raid' ? `# **S̶Y̶S̶T̶E̶M̶ ̶H̶I̶J̶A̶C̶K̶E̶D̶**\n${RAID_VIDEO}` : "### ⚠️ **AÇÃO OBRIGATÓRIA DETECTADA**", 
          components: buttons 
        });
        if (i < 4) await wait(2000); 
      }
    }

    if (commandName === 'say') {
      const t = options.getString('texto'), q = options.getInteger('quantidade');
      for (let i = 0; i < q; i++) {
        await interaction.followUp({ content: t }).catch(() => {});
        if (i < q - 1) await wait(2000);
      }
    }

    if (commandName === 'god') {
      for(let i=0; i<5; i++) {
        await interaction.followUp({ content: `# **CHRIST IS KING**\n${RAID_VIDEO}` });
        if(i < 4) await wait(2000);
      }
    }

    if (commandName === 'fake_update') {
      const e = new EmbedBuilder().setColor(0xff0000).setTitle('📢 System Update').setDescription(`Uma atualização crítica do **𝗗𝗶𝘀𝗰𝗼𝗿𝗱** é necessária.`);
      const r = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel('Atualizar').setStyle(ButtonStyle.Link).setURL(INVITE_LINK));
      await interaction.followUp({ embeds: [e], components: [r] });
    }
  });

  client.login(TOKEN).catch(() => {});
};
