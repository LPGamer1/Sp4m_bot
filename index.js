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

// --- NOVOS LINKS DO /RAID (Formatados com quebra de linha) ---
const RAID_CONTENT = `https://d2hv78291w0wge.cloudfront.net/q0v4gy%2Fpreview%2F73830703%2Fmain_large.gif?response-content-disposition=inline%3Bfilename%3D%22main_large.gif%22%3B&response-content-type=image%2Fgif&Expires=1766026760&Signature=FbCIatehfisP~PgQ606FDvhI7iHsKmBJ15-ItZNku-OVGRtafbwqv0g~mHIWZ7jQaP7GYf2bU9V-1-giAIrbIlP1EX8mf8A9ya9qLREgePIfm3xLnSz6Vrc75o1L~CG51mnHPUaGerGYlcvJb1qy75U9RxryyoDUkhEdKhEgw6K~Wme0NBj0NmIlJzaTLJVnki0XywUjOAUq5ezB-jwxF0o-8Bp5zGcEMmqMOfVWoXphIdY-ZkjgK1My0MWfkjJxR9O~T6Oihb-Wb5ExFI7XC5-Q38siXFB9lxQDDaaJGTvFdPjRWXt~jOdzb~3Es~4s6YYAJEGN51X3ZtBnseKIlw__&Key-Pair-Id=APKAJT5WQLLEOADKLHBQ

https://d3jqeznwt0i3tt.cloudfront.net/g2x4gy%2Fpreview%2F73830705%2Fmain_large.gif?response-content-disposition=inline%3Bfilename%3D%22main_large.gif%22%3B&response-content-type=image%2Fgif&Expires=1766026722&Signature=TaZc2Juji2AdvDw41s6UgWzDGz59snksZV2LZEsxKaskwqxJKdeX0jfeRxako~7gqcQUNFIw9VDRmqN7HDm2kASWWZr0fn26efDb7mjBQ90zpvHqBtLEpbkPOzExVtdUE85CIYFyGR83sW8dVNoY8rmRuF-FHwR9pWozBQ0le75oofshzlS5BtqFflcgwYCaNnPIAsqEN369iQXmVcEKAp6rTuTZUhNZpvnPFaoVPXool~B8pmjweIIKpvo9gGaHNu8j4aQTq~fA4WnyPbOFjPjUSt6dwDdJqJeveuL1t~OaK9R9uiT2es66OUCinc6W841MeZSbbPGc8Oc0TQ5bJQ__&Key-Pair-Id=APKAJT5WQLLEOADKLHBQ

https://d23j1yojw6x37d.cloudfront.net/923gy%2Fpreview%2F73830638%2Fmain_large.gif?response-content-disposition=inline%3Bfilename%3D%22main_large.gif%22%3B&response-content-type=image%2Fgif&Expires=1766026541&Signature=CiNeXMEDp09NwXJmyZFwKISI8~2qe2qSkHQMeyJ4FH~qYHOcuYT9x7htkh4p4Sxrf4kY--tB7zqK04VP6unVLBF-7Q4mkpJ-4GTiA4rtqf4espbg-FCEb2~SvhtlM9EK73kXvD0ezHwebiOm843NMxt8Gc1rK4a0auRnquOZD81HU5cCNjQhYXf5OEAwvJWiLa818rsawqlIzi1Tq8VSBTQWwPwyzzwbiQNLomywQ0KZCDOJthBakKBtM~TBi01BVPl9Cm1WwUlhVYH6t1xZMGlylA4--VEaZQ1vmFKsOPW04nDDjwDgUL6hS5VLndOxqKm0oPY1LW1m0F5uUFfc2A__&Key-Pair-Id=APKAJT5WQLLEOADKLHBQ

${INVITE_LINK}`;

// --- CONTEÚDO DO /GOD ---
const GOD_MESSAGE = `# If you do not believe in God then change your ways. Philippians 4:13 *** "I can do all things through Christ who strengthens me"***

# *** John 3:16  "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life"***

# ****GOD IS KING****
# ****GOD IS KING****
# ****GOD IS KING****
# ****GOD IS KING****
# ****GOD IS KING****
-# @everyone @here 
https://tenor.com/view/jesus-edit-edit-jesus-christ-is-king-christ-edit-gif-15902634079600751945`;

// --- DEFINIÇÃO DOS COMANDOS ---
const commands = [
  new SlashCommandBuilder().setName('god').setDescription('Envia mensagens de fé').setIntegrationTypes([1]).setContexts([0,1,2]),
  new SlashCommandBuilder().setName('raid').setDescription('Sequência de raid atualizada').setIntegrationTypes([1]).setContexts([0,1,2]),
  new SlashCommandBuilder().setName('say').setDescription('Repete mensagens').setIntegrationTypes([1]).setContexts([0,1,2]).addStringOption(o=>o.setName('texto').setDescription('t').setRequired(true)).addIntegerOption(o=>o.setName('quantidade').setDescription('q').setRequired(true)),
  new SlashCommandBuilder().setName('fake_ban').setDescription('Simula banimento').setIntegrationTypes([1]).setContexts([0,1,2]),
  new SlashCommandBuilder().setName('say_air').setDescription('Limpa o chat').setIntegrationTypes([1]).setContexts([0,1,2]),
  new SlashCommandBuilder().setName('fake_profile').setDescription('Perfil Staff').setIntegrationTypes([1]).setContexts([0,1,2]),
  new SlashCommandBuilder().setName('button_trap').setDescription('Botão de convite').setIntegrationTypes([1]).setContexts([0,1,2]).addStringOption(o=>o.setName('texto').setDescription('t')),
  new SlashCommandBuilder().setName('nitro').setDescription('Nitro falso').setIntegrationTypes([1]).setContexts([0,1,2]),
  new SlashCommandBuilder().setName('captcha').setDescription('Verificação falsa').setIntegrationTypes([1]).setContexts([0,1,2]),
  new SlashCommandBuilder().setName('fake_ip').setDescription('Alerta de IP').setIntegrationTypes([1]).setContexts([0,1,2]),
  new SlashCommandBuilder().setName('matrix').setDescription('Estilo Matrix').setIntegrationTypes([1]).setContexts([0,1,2]).addStringOption(o=>o.setName('texto').setDescription('t').setRequired(true)),
  new SlashCommandBuilder().setName('click_wall').setDescription('Parede de cliques').setIntegrationTypes([1]).setContexts([0,1,2]),
  new SlashCommandBuilder().setName('lag').setDescription('Parede de lag').setIntegrationTypes([1]).setContexts([0,1,2])
].map(c => c.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);
(async () => {
  try {
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log('Bot SP4M_B0T.exe atualizado!');
  } catch (e) { console.error(e); }
})();

// --- LÓGICA DE INTERAÇÃO ---
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName, options, user } = interaction;

  await interaction.reply({ content: '⚙️', ephemeral: true }).catch(() => {});

  if (commandName === 'raid') {
    for (let i = 0; i < 5; i++) {
      await interaction.followUp({ content: RAID_CONTENT, ephemeral: false }).catch(() => {});
      if (i < 4) await wait(2000);
    }
  }

  if (commandName === 'god') {
    for (let i = 0; i < 5; i++) {
      await interaction.followUp({ content: GOD_MESSAGE, ephemeral: false }).catch(() => {});
      if (i < 4) await wait(2000);
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

  // --- OUTROS COMANDOS MANTIDOS ---
  if (commandName === 'fake_ban') await interaction.followUp({ content: "### ⚠️ **DISCORD SYSTEM NOTICE**\n> Conta marcada para banimento.\n> **Status:** `PENDENTE`", ephemeral: false });
  if (commandName === 'say_air') await interaction.followUp({ content: "ㅤ\n".repeat(45) + "✨ **Chat Limpo.**", ephemeral: false });
  if (commandName === 'fake_profile') {
    const embed = new EmbedBuilder().setColor(0x5865F2).setAuthor({ name: `${user.username} (Official Staff)`, iconURL: user.displayAvatarURL() }).setTitle('🛡️ Discord Administrator').setDescription(`Acesso verificado.\n**ID:** \`STAFF-${user.id.slice(0,5)}\``);
    await interaction.followUp({ embeds: [embed], ephemeral: false });
  }
  if (commandName === 'button_trap') {
    const txt = options.getString('texto') || `Resgate: ${INVITE_LINK}`;
    const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel('🎁 RESGATAR').setStyle(ButtonStyle.Link).setURL(INVITE_LINK));
    await interaction.followUp({ content: txt, components: [row], ephemeral: false });
  }
  if (commandName === 'nitro') {
    const embed = new EmbedBuilder().setColor(0x36393F).setTitle('You received a gift!').setDescription(`**Discord Nitro**\nExpires in 24 hours.`).setThumbnail('https://cdn.discordapp.com/emojis/1053103215104245770.webp?size=128');
    const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel('Claim Gift').setStyle(ButtonStyle.Link).setURL(INVITE_LINK));
    await interaction.followUp({ embeds: [embed], components: [row], ephemeral: false });
  }
  if (commandName === 'captcha') {
    const embed = new EmbedBuilder().setColor(0xFF0000).setTitle('⚠️ Security Verification Required').setDescription('Please complete the verification below to gain access.');
    const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel('Verify Account').setStyle(ButtonStyle.Link).setURL(INVITE_LINK));
    await interaction.followUp({ embeds: [embed], components: [row], ephemeral: false });
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
    const wall = (`[ㅤ](${INVITE_LINK})`.repeat(8) + "\n").repeat(6);
    await interaction.followUp({ content: wall, ephemeral: false }).catch(console.error);
  }
  if (commandName === 'lag') {
    const zalgo = "\u030d\u030e\u0304\u0305\u033f\u0311\u0306\u0310\u0352\u035b\u0323\u0324\u0330";
    const heavy = "▓".repeat(5) + zalgo.repeat(15) + "﷽".repeat(3) + "ㅤ".repeat(5);
    const msg = (heavy + "\n").repeat(12);
    await interaction.followUp({ content: msg, ephemeral: false }).catch(console.error);
  }
});

client.login(TOKEN);
