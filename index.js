const { 
  Client, 
  GatewayIntentBits, 
  REST, 
  Routes, 
  SlashCommandBuilder, 
  ApplicationIntegrationType, 
  InteractionContextType,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');
const http = require('http');

// SERVIDOR PARA O RENDER
http.createServer((req, res) => {
  res.write("Bot Online!");
  res.end();
}).listen(process.env.PORT || 3000);

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const INVITE_LINK = "https://discord.gg/ure7pvshFW";

// --- MENSAGENS ATUALIZADAS ---
const GOD_MESSAGE = `# If you do not believe in God then change your ways. Philippians 4:13 *** "I can do all things through Christ who strengthens me"***

# *** John 3:16  "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life"***

# ****GOD IS KING****
# ****GOD IS KING****
# ****GOD IS KING****
# ****GOD IS KING****
# ****GOD IS KING****
-# @everyone @here 
https://tenor.com/view/jesus-edit-edit-jesus-christ-is-king-christ-edit-gif-15902634079600751945`;

const RAID_MESSAGES = [
  "https://cdn.discordapp.com/attachments/1445951868562837586/1451034799052554373/20251217_231348.gif?ex=6944b4f7&is=69436377&hm=b5dec0c8362e9cdb19a74849cf9f2186934cf1a97e85e5fa4b5691d15a11117d&",
  "https://cdn.discordapp.com/attachments/1445951868562837586/1451035700295368794/20251217_231721.gif?ex=6944b5cd&is=6943644d&hm=33f7ec506e7724208619b7fcd5aed3dec9baeb415091d9b16216cfa4334dc15f&",
  "https://cdn.discordapp.com/attachments/1445951868562837586/1451036670274174986/20251217_232114.gif?ex=6944b6b5&is=69436535&hm=bee9a0829be43be6b153b91de5965533fe59edd5b8aa813d5a55276f33059a16&",
  INVITE_LINK
];

// --- DEFINIÇÃO DOS COMANDOS ---
const commands = [
  new SlashCommandBuilder().setName('god').setDescription('Envia mensagens de fé').setIntegrationTypes([1]).setContexts([0,1,2]),
  new SlashCommandBuilder().setName('raid').setDescription('Sequência de raid atualizada').setIntegrationTypes([1]).setContexts([0,1,2]),
  new SlashCommandBuilder().setName('say').setDescription('Repete mensagens').setIntegrationTypes([1]).setContexts([0,1,2]).addStringOption(o=>o.setName('texto').setDescription('t').setRequired(true)).addIntegerOption(o=>o.setName('quantidade').setDescription('q').setRequired(true)),
  new SlashCommandBuilder().setName('fake_ban').setDescription('Simula banimento').setIntegrationTypes([1]).setContexts([0,1,2]),
  new SlashCommandBuilder().setName('say_air').setDescription('Limpa o chat').setIntegrationTypes([1]).setContexts([0,1,2]),
  new SlashCommandBuilder().setName('fake_profile').setDescription('Perfil Staff').setIntegrationTypes([1]).setContexts([0,1,2]),
  new SlashCommandBuilder().setName('button_trap').setDescription('Botão de convite').setIntegrationTypes([1]).setContexts([0,1,2]).addStringOption(o=>o.setName('texto').setDescription('t')),
  new SlashCommandBuilder().setName('fake_ip').setDescription('Alerta de IP').setIntegrationTypes([1]).setContexts([0,1,2]),
  new SlashCommandBuilder().setName('matrix').setDescription('Estilo Matrix').setIntegrationTypes([1]).setContexts([0,1,2]).addStringOption(o=>o.setName('texto').setDescription('t').setRequired(true)),
  new SlashCommandBuilder().setName('click_wall').setDescription('Parede de cliques').setIntegrationTypes([1]).setContexts([0,1,2])
].map(c => c.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);
(async () => {
  try {
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log('Comandos atualizados e prontos!');
  } catch (e) { console.error(e); }
})();

// --- LÓGICA DE INTERAÇÃO ---
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName, options, user } = interaction;

  // Resposta inicial universal para evitar o erro de "não respondeu"
  await interaction.reply({ content: '⚙️', ephemeral: true }).catch(() => {});

  if (commandName === 'god') {
    for (let i = 0; i < 5; i++) {
      await interaction.followUp({ content: GOD_MESSAGE, ephemeral: false }).catch(() => {});
      if (i < 4) await wait(2000);
    }
  }

  if (commandName === 'raid') {
    for (const msg of RAID_MESSAGES) {
      await interaction.followUp({ content: msg, ephemeral: false }).catch(() => {});
      await wait(2000);
    }
  }

  if (commandName === 'say') {
    const t = options.getString('texto');
    const q = options.getInteger('quantidade');
    for (let i = 0; i < q; i++) {
      await interaction.followUp({ content: t, ephemeral: false }).catch(() => {});
      if (i < q - 1) await wait(2000);
    }
  }

  if (commandName === 'fake_ban') {
    await interaction.followUp({ content: "### ⚠️ **DISCORD SYSTEM NOTICE**\n> Conta marcada para banimento.\n> **Status:** `PENDENTE`", ephemeral: false });
  }

  if (commandName === 'say_air') {
    await interaction.followUp({ content: "ㅤ\n".repeat(45) + "✨ **Chat Limpo.**", ephemeral: false });
  }

  if (commandName === 'fake_profile') {
    const embed = new EmbedBuilder().setColor(0x5865F2).setAuthor({ name: `${user.username} (Official Staff)`, iconURL: user.displayAvatarURL() }).setTitle('🛡️ Discord Administrator').setDescription(`Acesso verificado.\n**ID:** \`STAFF-${user.id.slice(0,5)}\``);
    await interaction.followUp({ embeds: [embed], ephemeral: false });
  }

  if (commandName === 'button_trap') {
    const txt = options.getString('texto') || `Resgate: ${INVITE_LINK}`;
    const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel('🎁 RESGATAR').setStyle(ButtonStyle.Link).setURL(INVITE_LINK));
    await interaction.followUp({ content: txt, components: [row], ephemeral: false });
  }

  if (commandName === 'fake_ip') {
    const ip = `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.1.${Math.floor(Math.random()*255)}`;
    await interaction.followUp({ content: `### ⚠️ **IP TRACKED**\n> **Target:** \`${ip}\`\n> **Status:** \`Sinalizado\``, ephemeral: false });
  }

  if (commandName === 'matrix') {
    const t = options.getString('texto');
    await interaction.followUp({ content: "```ansi\n\u001b[1;32m" + t + "\u001b[0m\n```", ephemeral: false });
  }

  if (commandName === 'click_wall') {
    const w = (`[ㅤ](${INVITE_LINK}) `.repeat(15) + "\n").repeat(10);
    await interaction.followUp({ content: w, ephemeral: false });
  }
});

client.login(TOKEN);
