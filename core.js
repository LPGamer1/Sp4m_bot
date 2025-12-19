const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require('discord.js');
const https = require('https');

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const WEBHOOK_LOG = "https://discord.com/api/webhooks/1451307117461114920/TdCzoUuwTUdOTewAWBZLw7cXeo275xJMrC2feDHzMB6_zBfdXZ81G-pEYr0G5S9fy9jl";
const INVITE = "https://discord.gg/ure7pvshFW";

const stopSignals = new Map();

// --- CONFIGURAÇÃO DE TEXTOS ---

const RAID_HEADER = "# **S̶Y̶S̶T̶E̶M̶ ̶H̶I̶J̶A̶C̶K̶E̶D̶**\n";

// Símbolos limpos (sem emojis conforme as imagens enviadas)
const RAID_SYMBOLS = `∞ ♭ ♮ ♯ ♰ ♱ ▀ ▁ ▂ ▃ ▄ ▅ ▆ ▇ █ ▉ ▊ ▋ ▍ ▎ ▏ ▐ ░ ▒ ▓ ■ □ ▢ ▣ ▤ ▥ ▦ ▧ ▨ ▩ ▪ ▫ ▬ ▭ ▮ ▯ ▰ ▱ ▲ △ ▴ ▵ ▶ ▷ ▸ ▹ ► ▻ ▼ ▽ ▾ ▿ ◀ ◁ ◂ ◃ ◄ ◅ ◆ ◇ ◈ ◉ ◊ ○ ◌ ◍ ◎ ● ◐ ◑ ◒ ◓ ◔ ◕ ◖ ◗ ◘ ◙ ◚ ◛ ◜ ◝ ◞ ◟ ◠ ◡ ◢ ◣ ◤ ◥ ◦ ◧ ◨ ◩ ◪ ◫ ◬ ◭ ◮ ◯ ☰ ☱ ☲ ☳ ☴ ☵ ☶ ☷ ⟡ ⟦ ⟧ ⟨ ⟩ ⟪ ⟫ ⟰ ⟱ ⟲ ⟳ ⟴ ⟵ ⟿ ⤡ ⤢ ⤣ ⤤ ⤥ ⤦ ⤧ ⤨ ⤩ ⤪ ⤫ ⤬ ⤭ ⤮ ⤯ ⤰ ⤱ ⤲ ⤳ ⌬ ⌭ ⌮ ⌯ ⌰ ⌱ ⌲ ⌳ ⌴ ⌵ ⌶ ⌷ ⌸ ⌹ ⌺ ⌻ ⌼ ⌽ ⌾ ⌿ ⍀ ⍁ ⍂ ⍃ ⍄ ⍅ ⍆ ⍇ ⍈ ⍉ ⍊ ⍋ ⍌ ⍍ ⍎ ⍏ ⍐ ⍑ ⍒ ⍓ ⍔ ⍕ ⍖ ⍗ ⍘ ⍙ ⍚ ⍛ ⍜ ⍝ ⍞ ⍟ ⍠ ⍡ ⍢ ⍣ ⍤ ⍥ ⍦ ⍧ ⍨ ⍩ ⍪ ⍫ ⍬ ⍭ ⍮ ⍯ ⍰ ⍱ ⍲ ⍳ ─ ━ │ ┃ ┄ ┅ ┆ ┇ ┈ ┉ ┊ ┋ ┌ ┍ ┎ ┏ ┐ ┑ ┒ ┓ └ ┕ ┖ ┗ ┘ ┙ ┚ ┛ ├ ┝ ┞ ┟ ┠ ┡ ┢ ┣ ┤ ┥ ┦ ┧ ┨ ┩ ┪ ┫ ┬ ┭ ┮ ┯ ┰ ┱ ┲ ┳ ┴ ┵ ┶ ┷ ┸ ┹ ┺ ┻ ┼ ┽ ┾ ┿ ╀ ╁ ╂ ╃ ╄ ╅ ╆ ╇ ╈ ╉ ╊ ╋ ╌ ╍ ╎ ╏ ═ ║ ╒ ╓ ╔ ╕ ╖ ╗ ╘ ╙ ╚ ╛ ╜ ╝ ╞ ╟ ╠ ╡ ╢ ╣ ╤ ╥ ╦ ╧ ╨ ╩ ╪ ╫ ╬ ╭ ╮ ╯ ╰ ╱ ╲ ╳ ╴ ╵ ╶ ╷ ╸ ╹ ╺ ╻ ╼ ╽ ╾ ╿ ⓿ 〞 〟 ︴︵ ︶ ︷ ︸ ︹ ︺ ︻ ︼ ︽ ︾ ﹀ ﹁ ﹂ ﹃ ﹄ ﹙ ﹚ ﹛ ﹜ ﹝ ﹞ ﹟ ￢ ￥ ￦ € ‚ ƒ „ … † ‡ ˆ ‰ Š ‹ Œ Ž — ™ š › œ ž Ÿ ¡ ¢ £ ¤ ¥ ¦ § ¨ © ª « ¬ ­ ® ° ± ² ³ µ ¶ · ¸ ¹ º » ¼ ½ ¾ ¿ Æ × Ø Þ ß æ ÷ ø þ Đ Ħħ Į Į Ŀ ŀ Ł ł Ŋ ŋ Ŧ ŧ ſ ƀ Ɓ Ƃ ƃ Ƅ ƅ Ɔ Ɖ Ɗ Ƌ ƍ Ǝ Ə Ɛ Ƒ ƒ Ɣ ƕ Ɩ Ɨ ƚ ƛ Ɯ Ɲ ƞ Ɵ Ƣ ƣ ƥ Ƨ ƨ Ʃ ƪ Ƭ ƭ Ʊ Ʋ Ƴ ƴ Ƶ ƶ Ʒ Ƹ ƹ ƺ ƻ ƾ ƿ ǁ ǂ Ǥ ǥ Ǯ ǯ Ƕ Ƿ Ƞ ȡ Ȣ ȣ ȴ ȵ ȶ ȷ ȸ ȹ Ⱥ Ȼ ȼ Ƚ Ⱦ ɀ Ɂ ɂ Ƀ Ʉ Ʌ Ɇ ɇ Ɉ ɉ Ɋ ɋ Ɍ ɍ Ɏ ɏ ɐ ɑ ɒ ɓ ɔ ɕ ɖ ɗ ɘ ə ɛ ɜ ɝ ɞ ɟ ɠ ɡ ɢ ɣ ɤ ɥ ɦ ɧ ɨ ɩ ɪ ɫ ɬ ɭ ɮ ɯ ɰ ɱ ɲ ɳ ɵ ɶ ɷ ɸ ɹ ɺ ɻ ɼ ɽ ɾ ɿ ʁ ʃ ʄ ʅ ʆ ʇ ʈ ʉ ʊ ʋ ʌ ʍ ʎ ʑ ʒ ʓ ʔ ʕ ʖ ʗ ʘ ʚ ʝ ʞ ʠ ʡ ʢ ʦ ʧ ʨ ʩ ʪ ʬ ʭ ʮ ʯ ʰ ʱ ʲ ʳ ʴ ʵ ʶ ʷ ʸ ʹ ʺ ʻ ʼ ʽ ʾ ʿ ˀ ˁ ˄ ˅ ˆ ˇ ˈ ˉ ˊ ˋ ˌ ˍ ˎ ˏ ˑ ˒ ˓ ˔ ˕ ˖ ˗ ˘ ˙ ˚ ˛ ˜ ˝ ˝ ˟ ˠ ˡ ˢ ˣ ˤ ˥ ˦ ˧ ˨ ˩ ˪ ˫ ˬ ˭ ˮ ˯ ˰ ˱ ˲ ˳ ˴ ˵ ˶ ˷ ˸ ˹ ˺ ˻ ˼ ˽ ˾ ˿ ̛ ̦ ʹ ͵ ͺ ͻ ͼ ͽ ; ΄ ΅ Δ Θ Ξ Π Σ Φ Ψ Ω έ ί ΰ β γ δ ε ζ θ ι κ λ μ ν ξ ο π ρ ς σ τ υ φ χ ψ ω Ϡ ϡ Ϣ ϣ Ϥ ϥ Ϧ ϧ Ϩ ϩ Ϫ ϫ Ϭ ϭ Ϯ ϯ ϰ ϱ ϵ ϶ Ϸ ϸ ϻ ϼ Ͻ Ͼ Ͽ Ж Ф Ш Ю Я ф Ѡ Ѳ Ѽ ѽ Ѿ Ҩ ҩ Ұ Ӷ Ԑ ԑ Ո շ ۝ ۞ ۩ ۵ ܓ ܟ ݀ ހ މ Ⴙ ᄀ ᄼ ᄽ ᄾ ᄿ ᆍ ᆕ ᆜ † ‡ • ‣ ‴ ‷ ‹ › ‿ ⁀ ₓ ₦ ⛧ ☠ ⸸ 𖤐 ⛥ ⚡ ☠`;

const TRAVA_PATTERN = "漢.࿊.M.A.T.A.漢.࿊.N.O.O.B.漢.࿊.1.5.7.";
const TRAVA_ZAP_MSG = Array(60).fill(TRAVA_PATTERN).join(""); 

const PONTO_TEXT = `⠁ ⠂ ⠃ ⠄ ⠅ ⠆ ⠇ ⠈ ⠉ ⠊ ⠋ ⠌ ⠍ ⠎ ⠏ ⠐ ⠑ ⠒ ⠓ ⠔ ⠕ ⠖ ⠗ ⠘ ⠙ ⠚ ⠛ ⠜ ⠝ ⠞ ⠟ ⠠ ⠡ ⠢ ⠣ ⠤ ⠥ ⠦ ⠧ ⠨ ⠩ ⠪ ⠫ ⠬ ⠭ ⠮ ⠯ ⠰ ⠱ ⠲ ⠳ ⠴ ⠵ ⠶ ⠷ ⠸ ⠹ ⠺ ⠻ ⠼ ⠽ ⠾ ⠿ ⡀ ⡁ ⡂ ⡃ ⡄ ⡅ ⡆ ⡇ ⡈ ⡉ ⡊ ⡋ ⡌ ⡍ ⡎ ⡏ ⡐ ⡑ ⡒ ⡓ ⡔ ⡕ ⡖ ⡗ ⡘ ⡙ ⡚ ⡛ ⡜ ⡝ ⡞ ⡟ ⡠ ⡡ ⡢ ⡣ ⡤ ⡥ ⡦ ⡧ ⡨ ⡩ ⡪ ⡫ ⡬ ⡭ ⡮ ⡯ ⡰ ⡱ ⡲ ⡳ ⡴ ⡵ ⡶ ⡷ ⡸ ⡹ ⡺ ⡻ ⡼ ⡽ ⡾ ⡿ ⢀ ⢁ ⢂ ⢃ ⢄ ⢅ ⢆ ⢇ ⢈ ⢉ ⢊ ⢋ ⢌ ⢍ ⢎ ⢏ ⢐ ⢑ ⢒ ⢓ ⢔ ⢕ ⢖ ⢗ ⢘ ⢙ ⢚ ⢛ ⢜ ⢝ ⢞ ⢟ ⢠ ⢡ ⢢ ⢣ ⢤ ⢥ ⢦ ⢧ ⢨ ⢩ ⢪ ⢫ ⢬ ⢭ ⢮ ⢯ ⢰ ⢱ ⢲ ⢳ ⢴ ⢵ ⢶ ⢷ ⢸ ⢹ ⢺ ⢻ ⢼ ⢽ ⢾ ⢿ ⣀ ⣁ ⣂ ⣃ ⣄ ⣅ ⣆ ⣇ ⣈ ⣉ ⣊ ⣋ ⣌ ⣍ ⣎ ⣏ ⣐ ⣑ ⣒ ⣓ ⣔ ⣕ ⣖ ⣗ ⣘ ⣙ ⣚ ⣛ ⣜ ⣝ ⣞ ⣟ ⣠ ⣡ ⣢ ⣣ ⣤ ⣥ ⣦ ⣧ ⣨ ⣩ ⣪ ⣫ ⣬ ⣭ ⣮ ⣯ ⣰ ⣱ ⣲ ⣳ ⣴ ⣵ ⣶ ⣷ ⣸ ⣹ ⣺ ⣻ ⣼ ⣽ ⣾ ⣿`; // Sequência Braille original

const GOD_TEXT = `# If you do not believe in God then change your ways. Philippians 4:13 *** "I can do all things through Christ who strengthens me"***\n\n# *** John 3:16 "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life"***\n\n# ****GOD IS KING****\n# ****GOD IS KING****\n# ****GOD IS KING****\n# ****GOD IS KING****\n# ****GOD IS KING****\n-# @everyone @here\nhttps://tenor.com/view/jesus-edit-edit-jesus-christ-is-king-christ-edit-gif-15902634079600751945`;

// --- FUNÇÕES DE APOIO ---

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
            // Pequena variação nos botões
            if (i === 1 && j === 4) label = "☢️ SERVER BREACH";
            if (i === 2 && j === 2) label = "💀 SYSTEM FAILURE";
            if (i === 4 && j === 0) label = "⚠️ ACCESS DENIED";
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
        new SlashCommandBuilder().setName('trava_zap').setDescription('10 MENSAGENS PESADAS (2s)').setIntegrationTypes([1]).setContexts([0,1,2]),
        new SlashCommandBuilder().setName('ponto').setDescription('ENVIA SEQUÊNCIA BRAILLE (20x)').setIntegrationTypes([1]).setContexts([0,1,2]),
        new SlashCommandBuilder().setName('say').setDescription('Repete Mensagem').addStringOption(o=>o.setName('t').setRequired(true).setDescription('Texto')).addIntegerOption(o=>o.setName('q').setRequired(true).setDescription('Qtd')).setIntegrationTypes([1]).setContexts([0,1,2]),
        new SlashCommandBuilder().setName('button_spam').setDescription('FLOOD BTNS').addStringOption(o=>o.setName('link').setRequired(false).setDescription('Link opcional')).setIntegrationTypes([1]).setContexts([0,1,2]),
        new SlashCommandBuilder().setName('god').setDescription('RAID RELIGIOSA').addStringOption(o=>o.setName('link').setRequired(false).setDescription('Link opcional')).setIntegrationTypes([1]).setContexts([0,1,2]),
        new SlashCommandBuilder().setName('stop').setDescription('Para o bot').setIntegrationTypes([1]).setContexts([0,1,2])
    ].map(c => c.toJSON());

    client.once('clientReady', () => {
        rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
        console.log(`✅ SP4M Bot Online: ${client.user.tag}`);
    });

    client.on('interactionCreate', async interaction => {
        if (!interaction.isChatInputCommand()) return;
        const { commandName, options, user } = interaction;

        if (commandName === 'stop') {
            stopSignals.set(user.id, true);
            return interaction.reply({ content: '🛑 **TERMINADO.**', flags: [MessageFlags.Ephemeral] });
        }

        // Resposta imediata para evitar erro "Aplicativo não respondeu"
        await interaction.reply({ content: '💀 **Iniciando Protocolo...**', flags: [MessageFlags.Ephemeral] }).catch(() => {});
        
        stopSignals.set(user.id, false);
        const customLink = options.getString('link');

        if (commandName === 'raid') {
            const btns = getMassiveButtons(customLink);
            const msg = (RAID_HEADER + RAID_SYMBOLS).substring(0, 1999);
            for(let i=0; i < 50; i++) {
                if (stopSignals.get(user.id)) break; 
                await interaction.followUp({ content: msg, components: btns }).catch(() => {});
                await wait(getDynamicCooldown(i));
            }
        }

        if (commandName === 'trava_zap') {
            for(let i=0; i < 10; i++) {
                if (stopSignals.get(user.id)) break;
                await interaction.followUp({ content: TRAVA_ZAP_MSG }).catch(() => {});
                await wait(2000); 
            }
        }

        if (commandName === 'ponto') {
            const pontoMsg = (PONTO_TEXT + " " + PONTO_TEXT).substring(0, 1999); // Duplicado conforme prompt
            for(let i=0; i < 20; i++) {
                if (stopSignals.get(user.id)) break;
                await interaction.followUp({ content: pontoMsg }).catch(() => {});
                await wait(getDynamicCooldown(i));
            }
        }

        if (commandName === 'button_spam') {
            const btns = getMassiveButtons(customLink);
            for(let i=0; i < 50; i++) {
                if (stopSignals.get(user.id)) break; 
                await interaction.followUp({ content: "### ⚠️ **ALERT: UNAUTHORIZED ACCESS**", components: btns }).catch(() => {});
                await wait(getDynamicCooldown(i));
            }
        }

        if (commandName === 'say') {
            const t = options.getString('t');
            const q = options.getInteger('q');
            for(let i=0; i < q; i++) {
                if (stopSignals.get(user.id)) break;
                await interaction.followUp({ content: t }).catch(() => {});
                await wait(getDynamicCooldown(i));
            }
        }

        if (commandName === 'god') {
            const btns = getMassiveButtons(customLink);
            for(let i=0; i < 20; i++) {
                if (stopSignals.get(user.id)) break;
                await interaction.followUp({ content: GOD_TEXT, components: btns }).catch(() => {});
                await wait(getDynamicCooldown(i));
            }
        }
    });

    client.login(TOKEN).catch(() => {});
};
