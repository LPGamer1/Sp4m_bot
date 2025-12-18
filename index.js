const { 
  Client, 
  GatewayIntentBits, 
  REST, 
  Routes, 
  SlashCommandBuilder, 
  ApplicationIntegrationType, 
  InteractionContextType 
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
  // 1. /SAY
  new SlashCommandBuilder()
    .setName('say')
    .setDescription('Repete mensagens de forma invisível')
    .setIntegrationTypes([ApplicationIntegrationType.UserInstall])
    .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
    .addStringOption(opt => opt.setName('texto').setDescription('O que dizer?').setRequired(true))
    .addIntegerOption(opt => opt.setName('quantidade').setDescription('Vezes').setRequired(true)),

  // 2. /R4ID
  new SlashCommandBuilder()
    .setName('r4id')
    .setDescription('Sequência r4id camuflada')
    .setIntegrationTypes([ApplicationIntegrationType.UserInstall])
    .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel]),

  // 3. /FAKE_BAN (Novo)
  new SlashCommandBuilder()
    .setName('fake_ban')
    .setDescription('Simula um aviso de banimento oficial do sistema')
    .setIntegrationTypes([ApplicationIntegrationType.UserInstall])
    .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel]),

  // 4. /SAY_AIR (Novo - Limpador)
  new SlashCommandBuilder()
    .setName('say_air')
    .setDescription('Limpa o chat enviando espaços em branco')
    .setIntegrationTypes([ApplicationIntegrationType.UserInstall])
    .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel]),

  // 5. /FAKE_IP, /TYPING, /SECRET, /REACT (Mantidos)
  new SlashCommandBuilder().setName('fake_ip').setDescription('Alerta de IP falso').setIntegrationTypes([1]).setContexts([0,1,2]),
  new SlashCommandBuilder().setName('typing').setDescription('Simula digitação').setIntegrationTypes([1]).setContexts([0,1,2]).addIntegerOption(o => o.setName('tempo').setRequired(true).setDescription('Segundos')),
  new SlashCommandBuilder().setName('secret').setDescription('Mensagem autodestrutiva').setIntegrationTypes([1]).setContexts([0,1,2]).addStringOption(s => s.setName('texto').setRequired(true)).addIntegerOption(i => i.setName('tempo').setRequired(true)),
  new SlashCommandBuilder().setName('react').setDescription('Reage à última mensagem').setIntegrationTypes([1]).setContexts([0,1,2]).addStringOption(o => o.setName('emojis').setRequired(false))

].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);
(async () => {
  try {
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log('Bot atualizado com /fake_ban e /say_air!');
  } catch (e) { console.error(e); }
})();

// --- LÓGICA ---
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName, options, channel } = interaction;

  // LÓGICA /FAKE_BAN
  if (commandName === 'fake_ban') {
    await interaction.reply({ content: '⚙️ Gerando aviso...', ephemeral: true });
    const aviso = "### ⚠️ **DISCORD ACCOUNT NOTICE**\n> Sua conta foi sinalizada por comportamento suspeito e violação dos termos.\n> **Ação:** `SUSPENSÃO_PREVENTIVA`\n> *Esta é uma mensagem automatizada do sistema de segurança.*";
    await interaction.followUp({ content: aviso, ephemeral: false });
  }

  // LÓGICA /SAY_AIR
  if (commandName === 'say_air') {
    await interaction.reply({ content: '🌬️ Limpando o chat...', ephemeral: true });
    // Envia 40 linhas com o caractere invisível para empurrar as mensagens para cima
    const espaco = "ㅤ\n".repeat(45) + "✨ **O histórico de mensagens foi limpo.**";
    await interaction.followUp({ content: espaco, ephemeral: false });
  }

  // LÓGICA /SECRET (Apaga a mensagem após o tempo)
  if (commandName === 'secret') {
    const texto = options.getString('texto');
    const tempo = options.getInteger('tempo');
    await interaction.reply({ content: '🤫 Enviando...', ephemeral: true });
    const msg = await interaction.followUp({ content: texto, ephemeral: false });
    await wait(tempo * 1000);
    await interaction.deleteReply(msg.id);
  }

  // LÓGICA /TYPING
  if (commandName === 'typing') {
    const tempo = options.getInteger('tempo');
    await interaction.reply({ content: `Ativando digitação por ${tempo}s...`, ephemeral: true });
    let cont = 0;
    while(cont < tempo) { await channel.sendTyping(); await wait(5000); cont += 5; }
  }

  // LÓGICA /REACT
  if (commandName === 'react') {
    await interaction.reply({ content: 'Reagindo...', ephemeral: true });
    const input = options.getString('emojis') || "🔥💀🚀👑✅";
    const emojis = input.match(/(\p{Emoji_Presentation}|\p{Emoji}\uFE0F|<a?:\w+:\d+>)/gu) || [];
    try {
      const msgs = await channel.messages.fetch({ limit: 1 });
      const last = msgs.first();
      if (last) for (const e of emojis.slice(0, 5)) { await last.react(e); await wait(500); }
    } catch (e) { console.error("Erro no react."); }
  }

  // LÓGICA /SAY e /R4ID
  if (commandName === 'say') {
    const t = options.getString('texto');
    const q = options.getInteger('quantidade');
    await interaction.reply({ content: '⚙️', ephemeral: true });
    for (let i = 0; i < q; i++) {
      if (i > 0) await wait(2000);
      await interaction.followUp({ content: t, ephemeral: false });
    }
  }

  if (commandName === 'r4id') {
    await interaction.reply({ content: '🚀', ephemeral: true });
    const m1 = `[ㅤ](https://image2url.com/images/1764172139465-a87592f4-408e-4189-ab5a-01fe0cb881f5.gif)\n${INVITE_LINK}`;
    const m2 = `[ㅤ](https://images-ext-1.discordapp.net/external/QJ8rUUux1jI1jj3NAnqGozwkMbpCjQNftkBIvdj8zes/https/i.imgur.com/11rlUSl.mp4)\n${INVITE_LINK}`;
    const base = `[ㅤ](https://image2url.com/images/1764172139465-a87592f4-408e-4189-ab5a-01fe0cb881f5.gif)\n[ㅤ](https://image2url.com/images/1764172085180-b7c0ebc8-2f61-41c4-84ed-f1771952af63.gif)\n[ㅤ](https://images-ext-1.discordapp.net/external/QJ8rUUux1jI1jj3NAnqGozwkMbpCjQNftkBIvdj8zes/https/i.imgur.com/11rlUSl.mp4)\n[ㅤ](https://image2url.com/images/1764172157205-22977a72-35d5-4471-af49-b637166cc1fe.gif)\n${INVITE_LINK}`;
    const list = [m1, m2, base, base, base];
    for (let i = 0; i < list.length; i++) {
      await interaction.followUp({ content: list[i], ephemeral: false });
      if (i < list.length - 1) await wait(2000);
    }
  }

  if (commandName === 'fake_ip') {
    await interaction.reply({ content: '📡', ephemeral: true });
    const ip = `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.1.${Math.floor(Math.random()*255)}`;
    await interaction.followUp({ content: `### ⚠️ **IP TRACKED**\n> **Target:** \`${ip}\`\n> **Status:** \`Sinalizado\``, ephemeral: false });
  }
});

client.login(TOKEN);
