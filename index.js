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

// --- SERVIDOR PARA O RENDER ---
http.createServer((req, res) => {
  res.write("Bot Online!");
  res.end();
}).listen(process.env.PORT || 3000);

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const INVITE_LINK = "https://discord.gg/ure7pvshFW";

// --- CONTEÚDO DO COMANDO GOD ---
const GOD_MESSAGE = `# If you do not believe in God then change your ways. Philippians 4:13 *** "I can do all things through Christ who strengthens me"***

# *** John 3:16  "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life"***

# ****GOD IS KING****
# ****GOD IS KING****
# ****GOD IS KING****
# ****GOD IS KING****
# ****GOD IS KING****
-# coners idea @everyone @here 
[ㅤ](https://tenor.com/view/jesus-edit-edit-jesus-christ-is-king-christ-edit-gif-15902634079600751945)`;

// --- DEFINIÇÃO DOS COMANDOS ---
const commands = [
  new SlashCommandBuilder()
    .setName('god')
    .setDescription('Envia mensagens de fé 5 vezes')
    .setIntegrationTypes([ApplicationIntegrationType.UserInstall])
    .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel]),

  new SlashCommandBuilder()
    .setName('r4id')
    .setDescription('Sequência r4id camuflada')
    .setIntegrationTypes([ApplicationIntegrationType.UserInstall])
    .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel]),

  new SlashCommandBuilder()
    .setName('say')
    .setDescription('Repete mensagens de forma invisível')
    .setIntegrationTypes([ApplicationIntegrationType.UserInstall])
    .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
    .addStringOption(o => o.setName('texto').setDescription('O que dizer?').setRequired(true))
    .addIntegerOption(i => i.setName('quantidade').setDescription('Vezes').setRequired(true)),

  new SlashCommandBuilder().setName('fake_ban').setDescription('Simula banimento').setIntegrationTypes([1]).setContexts([0,1,2]),
  new SlashCommandBuilder().setName('say_air').setDescription('Limpa o chat').setIntegrationTypes([1]).setContexts([0,1,2]),
  new SlashCommandBuilder().setName('fake_profile').setDescription('Perfil de Staff').setIntegrationTypes([1]).setContexts([0,1,2]),
  new SlashCommandBuilder().setName('button_trap').setDescription('Botão de convite').setIntegrationTypes([1]).setContexts([0,1,2]).addStringOption(o => o.setName('texto').setRequired(false).setDescription('t')),
  new SlashCommandBuilder().setName('click_wall').setDescription('Parede de cliques').setIntegrationTypes([1]).setContexts([0,1,2]),
  new SlashCommandBuilder().setName('strobe').setDescription('Efeito visual').setIntegrationTypes([1]).setContexts([0,1,2]).addIntegerOption(o => o.setName('vezes').setRequired(true).setDescription('v')),
  new SlashCommandBuilder().setName('matrix').setDescription('Estilo Matrix').setIntegrationTypes([1]).setContexts([0,1,2]).addStringOption(o => o.setName('texto').setRequired(true).setDescription('t'))
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log('Todos os comandos, incluindo /god, foram registrados!');
  } catch (e) { console.error(e); }
})();

// --- LÓGICA DE INTERAÇÃO ---
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName, options, user, channel } = interaction;

  // LÓGICA /GOD
  if (commandName === 'god') {
    await interaction.reply({ content: '🙏 Iniciando orações...', ephemeral: true });

    for (let i = 0; i < 5; i++) {
      try {
        await interaction.followUp({ content: GOD_MESSAGE, ephemeral: false });
        if (i < 4) await wait(2000); // Respeita os 2 segundos
      } catch (e) { break; }
    }
  }

  // LÓGICA /SAY
  if (commandName === 'say') {
    const t = options.getString('texto');
    const q = options.getInteger('quantidade');
    await interaction.reply({ content: '⚙️', ephemeral: true });
    for (let i = 0; i < q; i++) {
      if (i > 0) await wait(2000);
      await interaction.followUp({ content: t, ephemeral: false });
    }
  }

  // LÓGICA /R4ID
  if (commandName === 'r4id') {
    await interaction.reply({ content: '🚀', ephemeral: true });
    const m1 = `[ㅤ](https://image2url.com/images/1764172139465-a87592f4-408e-4189-ab5a-01fe0cb881f5.gif)\n${INVITE_LINK}`;
    const base = `[ㅤ](https://image2url.com/images/1764172139465-a87592f4-408e-4189-ab5a-01fe0cb881f5.gif)\n[ㅤ](https://image2url.com/images/1764172085180-b7c0ebc8-2f61-41c4-84ed-f1771952af63.gif)\n${INVITE_LINK}`;
    const list = [m1, base, base, base, base];
    for (let i = 0; i < list.length; i++) {
      await interaction.followUp({ content: list[i], ephemeral: false });
      if (i < list.length - 1) await wait(2000);
    }
  }

  // LÓGICA /BUTTON_TRAP
  if (commandName === 'button_trap') {
    await interaction.reply({ content: '🎁', ephemeral: true });
    const txt = options.getString('texto') || `Clique abaixo: ${INVITE_LINK}`;
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setLabel('🎁 RESGATAR PRÊMIO').setStyle(ButtonStyle.Link).setURL(INVITE_LINK)
    );
    await interaction.followUp({ content: txt, components: [row], ephemeral: false });
  }

  // LÓGICA /FAKE_PROFILE
  if (commandName === 'fake_profile') {
    await interaction.reply({ content: '🛡️', ephemeral: true });
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setAuthor({ name: `${user.username} (Official Staff)`, iconURL: user.displayAvatarURL() })
      .setTitle('🛡️ Discord Administrator')
      .setDescription(`Acesso verificado.\n**ID:** \`STAFF-${user.id.slice(0,5)}\``)
      .setFooter({ text: 'Verified Badge' });
    await interaction.followUp({ embeds: [embed], ephemeral: false });
  }

  // MANTENDO /FAKE_BAN, /SAY_AIR, /CLICK_WALL, /STROBE, /MATRIX
  if (commandName === 'fake_ban') { await interaction.reply({content:'⚙️',ephemeral:true}); await interaction.followUp({content:"### ⚠️ **DISCORD SYSTEM NOTICE**\n> Conta marcada para banimento.\n> **Status:** `PENDENTE`",ephemeral:false}); }
  if (commandName === 'say_air') { await interaction.reply({content:'🌬️',ephemeral:true}); await interaction.followUp({content:"ㅤ\n".repeat(45)+"✨ **Chat Limpo.**",ephemeral:false}); }
  if (commandName === 'click_wall') { await interaction.reply({content:'🕸️',ephemeral:true}); const w=(`[ㅤ](${INVITE_LINK}) `.repeat(15)+"\n").repeat(10); await interaction.followUp({content:w,ephemeral:false}); }
  if (commandName === 'strobe') { const v=options.getInteger('vezes'); await interaction.reply({content:'⚡',ephemeral:true}); for(let i=0;i<v;i++){await interaction.followUp({content:i%2===0?"⬛⬛⬛⬛⬛":"⬜⬜⬜⬜⬜",ephemeral:false});await wait(1500);} }
  if (commandName === 'matrix') { const t=options.getString('texto'); await interaction.reply({content:'💾',ephemeral:true}); await interaction.followUp({content:"```ansi\n\u001b[1;32m"+t+"\u001b[0m\n```",ephemeral:false}); }
});

client.login(TOKEN);
