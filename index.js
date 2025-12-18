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
  res.write("Bot está vivo!");
  res.end();
}).listen(process.env.PORT || 3000);

// --- CONFIGURAÇÃO ---
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- REGISTRO DO COMANDO ---
const commands = [
  new SlashCommandBuilder()
    .setName('say')
    .setDescription('Envia uma mensagem repetidas vezes')
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
    console.log('Iniciando registro dos comandos...');
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log('Comandos registrados com sucesso!');
  } catch (error) {
    console.error(error);
  }
})();

// --- LÓGICA DO BOT ---
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'say') {
    const texto = interaction.options.getString('texto');
    // Se não colocar quantidade, o padrão é 1
    const quantidade = interaction.options.getInteger('quantidade') ?? 1;

    for (let i = 0; i < quantidade; i++) {
      try {
        if (i === 0) {
          await interaction.reply(texto);
        } else {
          // Cooldown de 2 segundos
          await wait(2000);
          await interaction.followUp(texto);
        }
      } catch (e) {
        console.error("Erro ao enviar mensagem:", e);
        break; 
      }
    }
  }
});

client.login(TOKEN);

