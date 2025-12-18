const { 
  Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, 
  ApplicationIntegrationType, InteractionContextType, 
  EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle 
} = require('discord.js');

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const INVITE_LINK = "https://discord.gg/ure7pvshFW";

// --- CONTEÚDOS CORRIGIDOS ---
const GOD_MSG = `# If you do not believe in God then change your ways. Philippians 4:13 *** "I can do all things through Christ who strengthens me"***\n\n# *** John 3:16  "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life"***\n\n# ****GOD IS KING****\n# ****GOD IS KING****\n# ****GOD IS KING****\n# ****GOD IS KING****\n# ****GOD IS KING****\n-# @everyone @here \nhttps://tenor.com/view/jesus-edit-edit-jesus-christ-is-king-christ-edit-gif-15902634079600751945`;

// Links antigos reestabelecidos para garantir que os GIFs apareçam
const RAID_MSG = `https://image2url.com/images/1764172139465-a87592f4-408e-4189-ab5a-01fe0cb881f5.gif\n\nhttps://image2url.com/images/1764172085180-b7c0ebc8-2f61-41c4-84ed-f1771952af63.gif\n\nhttps://image2url.com/images/1764172157205-22977a72-35d5-4471-af49-b637166cc1fe.gif\n\n${INVITE_LINK}`;

// Função que inicia o bot
module.exports = async (TOKEN, CLIENT_ID) => {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  const commands = [
    new SlashCommandBuilder().setName('god').setDescription('Fé 5x').setIntegrationTypes([1]).setContexts([0,1,2]),
    new SlashCommandBuilder().setName('raid').setDescription('Raid 5x').setIntegrationTypes([1]).setContexts([0,1,2]),
    new SlashCommandBuilder().setName('say').setDescription('Repete').setIntegrationTypes([1]).setContexts([0,1,2]).addStringOption(o=>o.setName('texto').setRequired(true).setDescription('t')).addIntegerOption(o=>o.setName('quantidade').setRequired(true).setDescription('q')),
    new SlashCommandBuilder().setName('say_air').setDescription('Limpa chat').setIntegrationTypes([1]).setContexts([0,1,2]),
    new SlashCommandBuilder().setName('lag').setDescription('Parede de lag').setIntegrationTypes([1]).setContexts([0,1,2]),
    new SlashCommandBuilder().setName('strobe').setDescription('Efeito pisca').setIntegrationTypes([1]).setContexts([0,1,2]).addIntegerOption(o=>o.setName('vezes').setRequired(true).setDescription('v')),
    new SlashCommandBuilder().setName('nitro').setDescription('Nitro falso').setIntegrationTypes([1]).setContexts([0,1,2]),
    new SlashCommandBuilder().setName('button_trap').setDescription('Botão').setIntegrationTypes([1]).setContexts([0,1,2]).addStringOption(o=>o.setName('texto').setDescription('t')),
    new SlashCommandBuilder().setName('captcha').setDescription('Captcha').setIntegrationTypes([1]).setContexts([0,1,2]),
    new SlashCommandBuilder().setName('click_wall').setDescription('Click wall').setIntegrationTypes([1]).setContexts([0,1,2]),
    new SlashCommandBuilder().setName('terminal').setDescription('Log Hacker').setIntegrationTypes([1]).setContexts([0,1,2]),
    new SlashCommandBuilder().setName('fake_ban').setDescription('Ban falso').setIntegrationTypes([1]).setContexts([0,1,2]),
    new SlashCommandBuilder().setName('fake_profile').setDescription('Staff Profile').setIntegrationTypes([1]).setContexts([0,1,2]),
    new SlashCommandBuilder().setName('fake_ip').setDescription('IP Tracker').setIntegrationTypes([1]).setContexts([0,1,2]),
    new SlashCommandBuilder().setName('matrix').setDescription('Matrix').setIntegrationTypes([1]).setContexts([0,1,2]).addStringOption(o=>o.setName('texto').setRequired(true).setDescription('t'))
  ].map(c => c.toJSON());

  const rest = new REST({ version: '10' }).setToken(TOKEN);
  try { await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands }); } catch (e) {}

  client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const { commandName, options, user } = interaction;
    await interaction.reply({ content: '⚙️', ephemeral: true }).catch(() => {});

    if (commandName === 'god') { for(let i=0;i<5;i++){ await interaction.followUp({content:GOD_MSG}); if(i<4)await wait(2000); } }
    if (commandName === 'raid') { for(let i=0;i<5;i++){ await interaction.followUp({content:RAID_MSG}); if(i<4)await wait(2000); } }
    if (commandName === 'say') { const t=options.getString('texto'),q=options.getInteger('quantidade'); for(let i=0;i<q;i++){ await interaction.followUp({content:t}); if(i<q-1)await wait(2000); } }
    if (commandName === 'say_air') await interaction.followUp({ content: "ㅤ\n".repeat(45) + "✨ **Chat Limpo.**" });
    if (commandName === 'lag') { const msg = ("▓\u030d\u030e\u0304\u0305\u033f\u0311\u0306\u0310\u0352\u035b\u0323\u0324\u0330﷽ㅤ\n").repeat(12); await interaction.followUp({content:msg}); }
    if (commandName === 'strobe') { const v=options.getInteger('vezes'); for(let i=0;i<v;i++){ await interaction.followUp({content:i%2===0?"⬛⬛⬛⬛⬛":"⬜⬜⬜⬜⬜"}); await wait(1500); } }
    if (commandName === 'nitro') { 
        const e=new EmbedBuilder().setColor(0x36393F).setTitle('You received a gift!').setDescription('**Discord Nitro**\nExpires in 24 hours.').setThumbnail('https://cdn.discordapp.com/emojis/1053103215104245770.webp?size=128'); 
        const r=new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel('Claim Gift').setStyle(ButtonStyle.Link).setURL(INVITE_LINK)); 
        await interaction.followUp({embeds:[e],components:[r]}); 
    }
    if (commandName === 'captcha') { 
        const e=new EmbedBuilder().setColor(0xFF0000).setTitle('⚠️ Security Verification Required').setDescription('Please verify your account.'); 
        const r=new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel('Verify Account').setStyle(ButtonStyle.Link).setURL(INVITE_LINK)); 
        await interaction.followUp({embeds:[e],components:[r]}); 
    }
    if (commandName === 'click_wall') await interaction.followUp({ content: (`[ㅤ](${INVITE_LINK})`.repeat(8)+"\n").repeat(6) });
    if (commandName === 'terminal') { 
        const logs=["```ansi\n\u001b[1;30m[SYSTEM]: Connecting...\u001b[0m\n```","```ansi\n\u001b[1;32m[OK]: Connection established.\u001b[0m\n```","```ansi\n\u001b[1;31m[ALERT]: TARGET -> "+INVITE_LINK+"\u001b[0m\n```"]; 
        for(const l of logs){ await interaction.followUp({content:l}); await wait(2000); } 
    }
    if (commandName === 'fake_ban') await interaction.followUp({ content: "### ⚠️ **DISCORD NOTICE**\n> Conta marcada para banimento.\n> **Status:** `PENDENTE`" });
    if (commandName === 'fake_profile') { 
        const e=new EmbedBuilder().setColor(0x5865F2).setAuthor({name:`${user.username} (Staff)`,iconURL:user.displayAvatarURL()}).setTitle('🛡️ Administrator').setDescription(`ID: \`STAFF-${user.id.slice(0,5)}\``); 
        await interaction.followUp({embeds:[e]}); 
    }
    if (commandName === 'fake_ip') await interaction.followUp({ content: `### ⚠️ **IP TRACKED**\n> **Target:** \`${Math.floor(Math.random()*255)}.1.${Math.floor(Math.random()*255)}\`\n> **Status:** \`Infected\`` });
    if (commandName === 'matrix') await interaction.followUp({ content: "```ansi\n\u001b[1;32m" + options.getString('texto') + "\u001b[0m\n```" });
  });

  client.login(TOKEN);
  console.log(`Bot com ID ${CLIENT_ID} iniciado.`);
};

