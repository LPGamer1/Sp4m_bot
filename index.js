const { 
  Client, 
  GatewayIntentBits, 
  REST, 
  Routes, 
  SlashCommandBuilder, 
  ApplicationIntegrationType, 
  InteractionContextType,
  // NOVAS IMPORTAÇÕES PARA EMBEDS E BOTÕES
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

// --- CONFIGURAÇÃO ---
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const INVITE_LINK = "https://discord.gg/ure7pvshFW";

// --- DEFINIÇÃO DOS COMANDOS ---
const commands = [
  // --- NOVOS COMANDOS ---
  
  // 1. /FAKE_PROFILE (Embed oficial)
  new SlashCommandBuilder()
    .setName('fake_profile')
    .setDescription('Exibe um perfil falso de Staff/Admin')
    .setIntegrationTypes([ApplicationIntegrationType.UserInstall])
    .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel]),

  // 2. /BUTTON_TRAP (Botão chamativo)
  new SlashCommandBuilder()
    .setName('button_trap')
    .setDescription('Envia uma mensagem com um botão de link chamativo')
    .setIntegrationTypes([ApplicationIntegrationType.UserInstall])
    .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
    .addStringOption(opt => opt.setName('texto').setDescription('Texto da mensagem (Padrão: seu link)').setRequired(false)),

  // --- COMANDOS ANTERIORES (MANTIDOS) ---
  new SlashCommandBuilder().setName('say').setDescription('Repete mensagens').setIntegrationTypes([1]).setContexts([0,1,2]).addStringOption(o=>o.setName('texto').setRequired(true).setDescription('t')).addIntegerOption(o=>o.setName('quantidade').setRequired(true).setDescription('q')),
  new SlashCommandBuilder().setName('r4id').setDescription('Sequência r4id').setIntegrationTypes([1]).setContexts([0,1,2]),
  new SlashCommandBuilder().setName('fake_ban').setDescription('Simula banimento').setIntegrationTypes([1]).setContexts([0,1,2]),
  new SlashCommandBuilder().setName('say_air').setDescription('Limpa chat').setIntegrationTypes([1]).setContexts([0,1,2]),
  new SlashCommandBuilder().setName('click_wall').setDescription('Parede de cliques').setIntegrationTypes([1]).setContexts([0,1,2]),
  new SlashCommandBuilder().setName('strobe').setDescription('Efeito strobe').setIntegrationTypes([1]).setContexts([0,1,2]).addIntegerOption(o=>o.setName('vezes').setRequired(true).setDescription('v')),
  new SlashCommandBuilder().setName('matrix').setDescription('Texto Matrix').setIntegrationTypes([1]).setContexts([0,1,2]).addStringOption(o=>o.setName('texto').setRequired(true).setDescription('t'))

].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Registrando novos comandos (Profile e Trap)...');
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log('Bot atualizado e pronto!');
  } catch (e) { console.error(e); }
})();

// --- LÓGICA DE INTERAÇÃO ---
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName, options, user } = interaction;

  // >>> LÓGICA /FAKE_PROFILE <<<
  if (commandName === 'fake_profile') {
    await interaction.reply({ content: '🛡️ Gerando credenciais...', ephemeral: true });

    const fakeEmbed = new EmbedBuilder()
      .setColor(0x5865F2) // Cor oficial do Discord (Blurple)
      .setAuthor({ name: `${user.username} (Official Staff)`, iconURL: user.displayAvatarURL({ dynamic: true }) })
      .setTitle('🛡️ Discord System Administrator')
      .setDescription(`Este usuário é um administrador verificado do sistema Discord.\n\n**ID de Funcionário:** \`DISCORD-STAFF-${user.id.slice(0, 4)}\`\n**Nível de Acesso:** \`TIER 3 (Global Override)\``)
      .setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png') // Ícone padrão do Discord
      .setFooter({ text: 'Verified System Badge • Discord Inc.' })
      .setTimestamp();

    await interaction.followUp({ embeds: [fakeEmbed], ephemeral: false });
  }

  // >>> LÓGICA /BUTTON_TRAP <<<
  if (commandName === 'button_trap') {
    await interaction.reply({ content: '🎁 Criando armadilha...', ephemeral: true });

    // Se o usuário não digitou texto, usa o link como padrão
    const textoMensagem = options.getString('texto') || `Clique abaixo para resgatar: ${INVITE_LINK}`;

    // Cria o botão de Link (ButtonStyle.Link é crucial para User Install)
    const button = new ButtonBuilder()
      .setLabel('🎁 RESGATAR PRÊMIO AGORA')
      .setStyle(ButtonStyle.Link)
      .setURL(INVITE_LINK); // O botão sempre leva pro seu convite

    // Adiciona o botão numa linha de ação
    const row = new ActionRowBuilder().addComponents(button);

    await interaction.followUp({ content: textoMensagem, components: [row], ephemeral: false });
  }

  // --- LÓGICAS ANTERIORES (MANTIDAS) ---
  if (commandName === 'say') {
    const t = options.getString('texto'); const q = options.getInteger('quantidade');
    await interaction.reply({ content: '⚙️', ephemeral: true });
    for(let i=0;i<q;i++){ if(i>0)await wait(2000); await interaction.followUp({content:t, ephemeral:false}); }
  }
  if (commandName === 'r4id') { /* (Sua lógica r4id existente) */
    await interaction.reply({ content: '🚀', ephemeral: true });
    const m1=`[ㅤ](https://image2url.com/images/1764172139465-a87592f4-408e-4189-ab5a-01fe0cb881f5.gif)\n${INVITE_LINK}`;
    const base=`[ㅤ](https://image2url.com/images/1764172139465-a87592f4-408e-4189-ab5a-01fe0cb881f5.gif)\n[ㅤ](https://image2url.com/images/1764172085180-b7c0ebc8-2f61-41c4-84ed-f1771952af63.gif)\n${INVITE_LINK}`;
    const l=[m1,base,base,base,base]; for(let i=0;i<l.length;i++){await interaction.followUp({content:l[i],ephemeral:false});if(i<l.length-1)await wait(2000);}
  }
  if (commandName === 'fake_ban') { await interaction.reply({content:'⚙️',ephemeral:true}); await interaction.followUp({content:"### ⚠️ **DISCORD SYSTEM NOTICE**\n> Conta marcada para banimento.\n> **Status:** `PENDENTE`",ephemeral:false}); }
  if (commandName === 'say_air') { await interaction.reply({content:'🌬️',ephemeral:true}); await interaction.followUp({content:"ㅤ\n".repeat(45)+"✨ **Chat Limpo.**",ephemeral:false}); }
  if (commandName === 'click_wall') { await interaction.reply({content:'🕸️',ephemeral:true}); const w=(`[ㅤ](${INVITE_LINK}) `.repeat(15)+"\n").repeat(10); await interaction.followUp({content:w,ephemeral:false}); }
  if (commandName === 'strobe') { const v=options.getInteger('vezes'); await interaction.reply({content:'⚡',ephemeral:true}); for(let i=0;i<v;i++){await interaction.followUp({content:i%2===0?"⬛⬛⬛⬛⬛":"⬜⬜⬜⬜⬜",ephemeral:false});await wait(1500);} }
  if (commandName === 'matrix') { const t=options.getString('texto'); await interaction.reply({content:'💾',ephemeral:true}); await interaction.followUp({content:"```ansi\n\u001b[1;32m"+t+"\u001b[0m\n```",ephemeral:false}); }
});

client.login(TOKEN);
