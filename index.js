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

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- DEFINIÇÃO DOS CONTEÚDOS DAS MENSAGENS ---
const msg1 = `https://discord.gg/ure7pvshFW\nhttps://image2url.com/images/1764172139465-a87592f4-408e-4189-ab5a-01fe0cb881f5.gif`;

const msg2 = `https://images-ext-1.discordapp.net/external/QJ8rUUux1jI1jj3NAnqGozwkMbpCjQNftkBIvdj8zes/https/i.imgur.com/11rlUSl.mp4`;

const msg3_4 = `https://image2url.com/images/1764172139465-a87592f4-408e-4189-ab5a-01fe0cb881f5.gif
https://image2url.com/images/1764172085180-b7c0ebc8-2f61-41c4-84ed-f1771952af63.gif
https://images-ext-1.discordapp.net/external/QJ8rUUux1jI1jj3NAnqGozwkMbpCjQNftkBIvdj8zes/https/i.imgur.com/11rlUSl.mp4
https://image2url.com/images/1764172157205-22977a72-35d5-4471-af49-b637166cc1fe.gif
https://image2url.com/images/1764172157205-22977a72-35d5-4471-af49-b637166cc1fe.gif`;

const msg5 = `${msg3_4}\nhttps://discord.gg/ure7pvshFW`;

const listaMensagens = [msg1, msg2, msg3_4, msg3_4, msg5];

// --- REGISTRO DOS COMANDOS ---
const commands = [
  new SlashCommandBuilder()
    .setName('r4id')
    .setDescription('Inicia a sequência de mensagens r4id')
    .setIntegrationTypes([ApplicationIntegrationType.UserInstall, ApplicationIntegrationType.GuildInstall])
    .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel]),
  
  // Mantendo os outros comandos que você já tem
  new SlashCommandBuilder()
    .setName('say')
    .setDescription('Envia mensagens repetidas')
    .setIntegrationTypes([ApplicationIntegrationType.UserInstall, ApplicationIntegrationType.GuildInstall])
    .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
    .addStringOption(opt => opt.setName('texto').setDescription('O que dizer?').setRequired(true))
    .addIntegerOption(opt => opt.setName('quantidade').setDescription('Quantas vezes?').setRequired(true)),

  new SlashCommandBuilder().setName('loading').setDescription('Barra de progresso').setIntegrationTypes([1]).setContexts([0, 1, 2]),
  new SlashCommandBuilder().setName('countdown').setDescription('Contagem regressiva').setIntegrationTypes([1]).setContexts([0, 1, 2])
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);
(async () => {
  try {
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log('Comando /r4id registrado com sucesso!');
  } catch (error) { console.error(error); }
})();

// --- LÓGICA DAS INTERAÇÕES ---
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'r4id') {
    // 1. Resposta efêmera para ocultar quem usou o comando
    await interaction.reply({ content: '🚀 Iniciando sequência...', ephemeral: true });

    // 2. Loop para enviar as 5 mensagens com delay de 2s
    for (let i = 0; i < listaMensagens.length; i++) {
      try {
        await interaction.followUp({ 
          content: listaMensagens[i], 
          ephemeral: false 
        });
        
        // Se não for a última mensagem, espera 2 segundos
        if (i < listaMensagens.length - 1) {
          await wait(2000);
        }
      } catch (e) {
        console.error("Erro no comando /r4id:", e);
        break;
      }
    }
  }

  // ... (Outros comandos say, loading, etc)
});

client.login(TOKEN);
