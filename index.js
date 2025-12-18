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

// --- SERVIDOR PARA O RENDER (WEB SERVICE) ---
http.createServer((req, res) => {
  res.write("Bot Online!");
  res.end();
}).listen(process.env.PORT || 3000);

// --- CONFIGURAÇÃO ---
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- CONFIGURAÇÃO DOS LINKS ---
const INVITE_LINK = "https://discord.gg/ure7pvshFW";

const msg1 = `[ㅤ](https://image2url.com/images/1764172139465-a87592f4-408e-4189-ab5a-01fe0cb881f5.gif)\n${INVITE_LINK}`;
const msg2 = `[ㅤ](https://images-ext-1.discordapp.net/external/QJ8rUUux1jI1jj3NAnqGozwkMbpCjQNftkBIvdj8zes/https/i.imgur.com/11rlUSl.mp4)\n${INVITE_LINK}`;

const base_mush = `[ㅤ](https://image2url.com/images/1764172139465-a87592f4-408e-4189-ab5a-01fe0cb881f5.gif)
[ㅤ](https://image2url.com/images/1764172085180-b7c0ebc8-2f61-41c4-84ed-f1771952af63.gif)
[ㅤ](https://images-ext-1.discordapp.net/external/QJ8rUUux1jI1jj3NAnqGozwkMbpCjQNftkBIvdj8zes/https/i.imgur.com/11rlUSl.mp4)
[ㅤ](https://image2url.com/images/1764172157205-22977a72-35d5-4471-af49-b637166cc1fe.gif)
[ㅤ](https://image2url.com/images/1764172157205-22977a72-35d5-4471-af49-b637166cc1fe.gif)`;

const msg3_4_5 = `${base_mush}\n${INVITE_LINK}`;
const listaR4id = [msg1, msg2, msg3_4_5, msg3_4_5, msg3_4_5];

// --- REGISTRO DOS COMANDOS ---
const commands = [
  new SlashCommandBuilder()
    .setName('r4id')
    .setDescription('Inicia a sequência de 5 mensagens r4id')
    .setIntegrationTypes([ApplicationIntegrationType.UserInstall, ApplicationIntegrationType.GuildInstall])
    .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel]),
  
  new SlashCommandBuilder()
    .setName('say')
    .setDescription('Envia mensagens repetidas sem mostrar o comando')
    .setIntegrationTypes([ApplicationIntegrationType.UserInstall, ApplicationIntegrationType.GuildInstall])
    .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
    .addStringOption(opt => opt.setName('texto').setDescription('O que dizer?').setRequired(true))
    .addIntegerOption(opt => opt.setName('quantidade').setDescription('Quantas vezes?').setRequired(true))
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Atualizando comandos...');
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log('Comandos registrados!');
  } catch (error) { console.error(error); }
})();

// --- LÓGICA DAS INTERAÇÕES ---
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  // COMANDO /R4ID
  if (interaction.commandName === 'r4id') {
    await interaction.reply({ content: '🚀 Disparando...', ephemeral: true });

    for (let i = 0; i < listaR4id.length; i++) {
      try {
        await interaction.followUp({ content: listaR4id[i], ephemeral: false });
        if (i < listaR4id.length - 1) await wait(2000);
      } catch (e) { break; }
    }
  }

  // COMANDO /SAY
  if (interaction.commandName === 'say') {
    const texto = interaction.options.getString('texto');
    const quantidade = interaction.options.getInteger('quantidade');
    await interaction.reply({ content: '⚙️ Executando...', ephemeral: true });

    for (let i = 0; i < quantidade; i++) {
      if (i > 0) await wait(2000);
      try {
        await interaction.followUp({ content: texto, ephemeral: false });
      } catch (e) { break; }
    }
  }
});

client.login(TOKEN);
