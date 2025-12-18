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

// SERVIDOR PARA O RENDER
http.createServer((req, res) => {
  res.write("Bot está vivo!");
  res.end();
}).listen(process.env.PORT || 3000);

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// REGISTRO DO COMANDO
const commands = [
  new SlashCommandBuilder()
    .setName('say')
    .setDescription('Envia mensagens repetidas sem mostrar o comando original')
    .setIntegrationTypes([ApplicationIntegrationType.UserInstall, ApplicationIntegrationType.GuildInstall])
    .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
    .addStringOption(option => 
      option.setName('texto')
        .setDescription('O que eu devo dizer?')
        .setRequired(true))
    .addIntegerOption(option => 
      option.setName('quantidade')
        .setDescription('Quantas vezes? (Padrão: 1)')
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(25)) 
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log('Comando /say atualizado!');
  } catch (error) {
    console.error(error);
  }
})();

// LÓGICA DO BOT
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'say') {
    const texto = interaction.options.getString('texto');
    const quantidade = interaction.options.getInteger('quantidade') ?? 1;

    // 1. Resposta Efêmera: Só o usuário vê. 
    // Isso esconde a linha "Usuário usou /say" para todos os outros.
    await interaction.reply({ 
      content: `Iniciando o envio de ${quantidade} mensagem(ns)...`, 
      ephemeral: true 
    });

    for (let i = 0; i < quantidade; i++) {
      try {
        // Intervalo de 2 segundos entre as mensagens
        if (i > 0) await wait(2000);

        // 2. Envia a mensagem de forma pública no canal
        // Usamos ephemeral: false para que todos vejam
        await interaction.followUp({ 
          content: texto, 
          ephemeral: false 
        });
        
      } catch (e) {
        console.error("Erro ao enviar:", e);
        break; 
      }
    }
  }
});

client.login(TOKEN);
