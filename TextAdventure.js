// Helper function to show text in chatHistory
function showMessage(text) {
    const chatEl = document.getElementById('chatHistory');
    if (chatEl) {
        chatMessages.push(text);
        while (chatMessages.length > maxChatMessages) chatMessages.shift();
        chatEl.innerHTML = chatMessages.map(m => `<div style="margin-bottom:6px;">${escapeHtml(m)}</div>`).join('');
        chatEl.scrollTop = chatEl.scrollHeight;
    }
}

// Helper function to show choices in a modal
function showChoices(text, choices) {
    return new Promise((resolve) => {
        const modal = document.getElementById("modal");
        const modalText = document.getElementById("modalText");
        const modalChoices = document.getElementById("modalChoices");

        modalText.textContent = text;
        modalChoices.innerHTML = "";

        choices.forEach((choice) => {
            const button = document.createElement("button");
            button.textContent = choice.text;
            button.onclick = () => {
                modal.classList.remove("active");
                resolve(choice.value);
            };
            modalChoices.appendChild(button);
        });

        modal.classList.add("active");
    });
}

// global character properties
let player, age, role, riskLevel, race, statLevels;
let levelInDamage, levelInHealth, levelInDefense, levelInMagic;
// prompt history for "back" support
let promptHistory = []; // stores previous questions
let currentPromptQuestion = null;
// chat buffer and pruning controls
let chatMessages = [];
let newSincePrune = 0;
const pruneThreshold = 3; // after this many new messages consider pruning
const maxChatMessages = 12; // minimum/maximum chat window size

// prompt resolver for chat-based prompts
let promptResolve = null;

// try to extract clickable choices from a question string
function generateChoicesFromQuestion(question) {
    if (!question || typeof question !== 'string') return null;
    // take part after '?' or ':' if present (common pattern: prompt? choices)
    let q = question;
    const qmark = question.indexOf('?');
    const colon = question.indexOf(':');
    const sep = qmark >= 0 ? qmark : (colon >= 0 ? colon : -1);
    if (sep >= 0) q = question.slice(sep + 1).trim();

    // try comma-separated
    if (q.includes(',')) {
        const parts = q.split(',').map(s => s.trim()).filter(Boolean);
        if (parts.length > 1) return parts;
    }

    // try ' or ' separated
    const orParts = q.split(/\s+or\s+/i).map(s => s.trim()).filter(Boolean);
    if (orParts.length > 1) return orParts;

    // try numeric mapping like '1=yes 2=no' or '1=yes, 2=no'
    const matches = [...question.matchAll(/\b\d+\s*=\s*([^,\s]+)/g)];
    if (matches.length) {
        return matches.map(m => m[1].trim());
    }

    // yes/no fallback
    if (/\byes\b/i.test(question) && /\bno\b/i.test(question)) return ['yes','no'];

    return null;
}

// display a question in dialogue and return a Promise that resolves with input
async function chatPrompt(question) {
    // show the question in the chat
    displayDialogue(question);
    currentPromptQuestion = question;
    promptHistory.push(question);

    // if we can parse clickable choices, use the modal buttons
    const parsed = generateChoicesFromQuestion(question);
    if (parsed && parsed.length) {
        // build choices for showChoices
        const choices = parsed.map(c => ({ text: c, value: c }));
        try {
            const result = await showChoices(question, choices);
            return result;
        } catch (e) {
            // fall through to text input if modal fails
            console.error(e);
        }
    }

    return new Promise(resolve => {
        promptResolve = resolve;
        // enable the input box for typed reply
        const inputEl = document.getElementById('dialogueInput');
        if (inputEl) {
            inputEl.disabled = false;
            inputEl.focus();
        }
    });
}

async function initializeCharacter() {
    player = await chatPrompt("what is your name?");
    console.log(player);

    const ageInput = Math.floor(Math.random() * 30) + 1;
    age = ageInput;
    console.log(age);
    alert("you are " + age + " years old");

    if (age < 10) {
        alert("you are too young to adventure, but you can still train and prepare for your future adventures!");
    } else if (age <= 16) {
        alert("you are a young adventurer, you have a lot of potential, but you still have a lot to learn");
    } else {
        alert("you are an experienced adventurer, you have a lot of knowledge and skills");
    }

    // available roles
    const roleOptions = [
        { text: "knight",  value: 1 },
        { text: "adventurer", value: 2 },
        { text: "hero",  value: 3 },
        { text: "mercenary",  value: 4 },
        { text: "assassin",  value: 5 },
    ];

    // filter based on age
    if (age < 10) {
        roleOptions.splice(4, 1); // remove assassin
        roleOptions.splice(3, 1); // remove mercenary
        roleOptions.splice(1, 1); // remove adventurer
    } else if (age <= 16) {
        roleOptions.splice(3, 1); // remove mercenary
        roleOptions.splice(1, 1); // remove adventurer
    }

    const rand = Math.floor(Math.random() * roleOptions.length);
    role = roleOptions[rand].text;
    console.log("Selected role:", role);
    alert("you are now a " + role + "!");
}

// start character creation asynchronously
async function startGame() {
    await initializeCharacter();
    riskLevel = await chatPrompt("How dangerous do you wish to be? low risk, medium, high");
    console.log(riskLevel);

    const races = [
    { text: "human",  value: 0 },
    { text: "elf", value: 1 },
    { text: "demon",  value: 2 },
    { text: "undead",  value: 3 },
    { text: "angel",  value: 4 },
    { text: "arch-angel",  value: 5 },  
    { text: "dwarf",  value: 6 },
    { text: "demi-god",  value: 7 },
    { text: "giant",  value: 8 },
];
let randRace = Math.floor(Math.random() * races.length); 
race = races[randRace].text;
console.log("Selected race:", randRace);
alert("you are now " + race + "!");

statLevels;
statLevels = await chatPrompt("what stat do you wish to focus on? base damage, healthpoints, defense, magic");
console.log(statLevels);
//player creation

let experienceMultiplierBasedOnAge;
if (age < 10){
    experienceMultiplierBasedOnAge=(0.5*2);
} else if (age <= 16){
    experienceMultiplierBasedOnAge=(2*1);
} else{
    experienceMultiplierBasedOnAge=(3*1);
} 
 //player and npc age ranges
 // role and race bonuses will be applied later once stats exist
switch(riskLevel){
case "low risk":
riskLevel = Math.floor(Math.random() * 3) + 1;
break;
case "medium":
riskLevel = Math.floor(Math.random() * 4) + 4;
break;
case "high":
riskLevel = Math.floor(Math.random() * 3) + 8;
break;
}
//danger levels of both npcs and player (abilities and attacks available and depends on relationships)

let experienceGain = Number(age) || 1;
let statOfCharacter = 0; // will be set after base stats and bonuses are calculated

// base 10 plus experience and modifiers applied later
levelInDamage = 10 + (1 * experienceGain);
// base HP 100
levelInHealth = 100 + (10 * experienceGain);
levelInDefense = 10 + (5 * experienceGain);
levelInMagic = 10 + (3 * experienceGain);

// apply role-based bonuses now that stats are defined
switch(role){
    case "knight":       levelInDamage += 6; break;
    case "adventurer":   levelInDamage += 4; break;
    case "hero":         levelInDamage += 14; break;
    case "mercenary":    levelInDamage += 5; break;
    case "assassin":     levelInDamage += 8; break;
    // future roles can be added here
}

// apply race-based bonuses
switch(race){
    case "human":        levelInDamage += 2; break;
    case "elf":          levelInDamage += 4; break;
    case "demon":        levelInDamage += 3; break;
    case "undead":       levelInDamage += 1; break;
    case "angel":        levelInDamage += 5; break;
    case "arch-angel":   levelInDamage += 7; break;
    case "dwarf":        levelInDamage += 3; break;
    case "demi-god":     levelInDamage += 10; break;
    case "giant":        levelInDamage += 8; break;
}

// determine which stat the player focused on now that bonuses are applied
switch (statLevels) {
    case "base damage":
        statOfCharacter = levelInDamage;
        break;
    case "healthpoints":
        statOfCharacter = levelInHealth;
        break;
    case "defense":
        statOfCharacter = levelInDefense;
        break;
    case "magic":
        statOfCharacter = levelInMagic;
        break;
    default:
        statOfCharacter = levelInDamage;
}

let damageToEnemies = statOfCharacter%10 === 0 ? 10 : statOfCharacter % 1;

let welcomePlayer;
welcomePlayer=(player);
alert("welcome " + player + ", we've been waiting for your arrival");
alert("the king is waiting to speak with you "+ player + ", he has summoned you here for an important request");
let question = await chatPrompt("do you wish to travel to the palace now? 1=yes 2=no ");
console.log(question);

if (question === "1") {
    question = "y";}
    else if (question === "2") {
        question = "n";
    }

if (question == "y") {
    alert("you will travel to the palace shortly");
    alert("the king sits on his massive throne infront of you, he's thought to be at least 10 feet tall, with a bulky build and strong manner. hello, player, you have been summoned from your world because of the tyranical leader in the underworld. we need you to stop him");
    let answerRequest = await chatPrompt("will you accept the request? y/n");
    console.log(answerRequest);

    if (answerRequest == "y") {
        alert("the king seems pleased…your training will start soon");
        let weapon = await chatPrompt("choose your choice of warfare: scythe, long sword, magic");
    } else if (answerRequest == "2") {
        alert("the king sits up, a worried expression on his face...he pleads but understands if you insist on saying no, implying your consequences will be heavy, but the reward for complying will be handsome");
        let nah = await chatPrompt("ONLY PUT nah");
        if (nah === "nah") {
            let sure = await chatPrompt("are you sure? yes/no");            if (sure === "yes") {
                alert("then its settled. we will begin your training momentarily, please decide what skill you should specialize in. scythe, magic, long sword");
            } else if (sure === "no") {
                alert("fine, then you shall be a enemy to our kingdom");
                // player declined completely; restart the game by reloading the page
                initializeCharacter();
                // refresh the page so execution begins again at top (line 31)
                location.reload();
            }
        }
    }
    let training;
    training = await chatPrompt("you have been teleported to the training grounds, do you wish to train your base damage, healthpoints, defense, or magic?");
    console.log(training);
    switch (training) {
        case "base damage":
            levelInDamage *= 2;
            displayDialogue("You trained your base damage.\n");
            break;
        case "healthpoints":
            levelInHealth *= 2;
            displayDialogue("You trained your health points.\n");
            break;
        case "defense":
            levelInDefense *= 2;
            displayDialogue("You trained your defense.\n");
            break;
        case "magic":
            levelInMagic *= 2;
            displayDialogue("You trained your magic.\n");
            break;
        default:
            // no training or unrecognized input
            break;
    }
} 
else if (question === "n") {
    alert("Teleport initializing…");
    alert("you have been teleported back to your world…");
}
} // end startGame

function showStats() {
    // Check if game has been started
    if (!player || levelInDamage === undefined) {
        alert("Start the game first by using the chat prompt!");
        return;
    }
    // display full-screen overlay with stat & level-up info
    let overlay = document.getElementById('statsOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'statsOverlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);color:#fff;z-index:2000;display:flex;justify-content:center;align-items:center;';
        document.body.appendChild(overlay);
    }

    function requiredToNext(stat) {
        const level = Math.floor(stat/10);
        const next = (level+1)*10;
        return next - stat;
    }

    const statsHtml =
        `<div style="background:#222;padding:30px;border-radius:8px;max-width:500px;text-align:left;border:2px solid #fff;">` +
        `<h2 style="color:#fff;margin-top:0;">Character Stats</h2>` +
        `<p>name: ${player} &nbsp;&nbsp; age: ${age}</p>` +
        `<p>role: ${role} &nbsp;&nbsp; race: ${race}</p>` +
        `<p>Risk Level: ${riskLevel}</p>` +
        `<hr style="border-color:#666">` +
        `<p>Base Damage: ${levelInDamage} (need ${requiredToNext(levelInDamage)} to next)</p>` +
        `<p>Health: ${levelInHealth} (need ${requiredToNext(levelInHealth)} to next)</p>` +
        `<p>Defense: ${levelInDefense} (need ${requiredToNext(levelInDefense)} to next)</p>` +
        `<p>Magic: ${levelInMagic} (need ${requiredToNext(levelInMagic)} to next)</p>` +
        `<button id="closeStatsBtn" style="margin-top:20px;padding:10px 20px;background:#ff6b6b;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:16px;">Close</button>` +
        `</div>`;

    overlay.innerHTML = statsHtml;
    overlay.style.display = 'flex';
    
    const closeBtn = document.getElementById('closeStatsBtn');
    if (closeBtn) {
        closeBtn.onclick = () => {
            overlay.style.display = 'none';
        };
    }
}

/*
function showLore() {
    const roles = [
        { name: "knight", desc: "Armored warrior, strong defense and melee damage." },
        { name: "adventurer", desc: "Versatile explorer with balanced stats." },
        { name: "hero", desc: "Exceptional combatant with high damage potential." },
        { name: "mercenary", desc: "Professional fighter for hire, skilled in tactics." },
        { name: "assassin", desc: "Stealthy killer with high critical damage." },
    ];

    const races = [
        { name: "human", desc: "Adaptable and balanced." },
        { name: "elf", desc: "Agile and magically inclined." },
        { name: "demon", desc: "Powerful but often volatile." },
        { name: "undead", desc: "Resilient, with unusual traits." },
        { name: "angel", desc: "Blessed beings with strong auras." },
        { name: "arch-angel", desc: "Exceptional celestial beings." },
        { name: "dwarf", desc: "Sturdy and strong craftsmen." },
        { name: "demi-god", desc: "Partially divine, very powerful." },
        { name: "giant", desc: "Massive strength and presence." },
    ];

    const pages = [];
    // page 0: roles
    let rolesHtml = "<strong>Roles</strong><br>";
    roles.forEach(r => { rolesHtml += `<em>${r.name}</em>: ${r.desc}<br>`; });
    pages.push(rolesHtml);

    // page 1: races
    let racesHtml = "<strong>Races</strong><br>";
    races.forEach(r => { racesHtml += `<em>${r.name}</em>: ${r.desc}<br>`; });
    pages.push(racesHtml);

    const output = document.getElementById("gameOutput");
    if (!output) {
        alert("Lore is unavailable.");
        return;
    }

    // render logic with pagination
    let current = 0;

    function render() {
        output.innerHTML = pages[current] + '<div style="margin-top:10px;display:flex;gap:8px;justify-content:center;">'
            + `<button id="lorePrev" ${current===0? 'disabled' : ''}>&lt;</button>`
            + `<button id="loreNext" ${current===pages.length-1? 'disabled' : ''}>&gt;</button>`
            + '</div>';

        const prev = document.getElementById('lorePrev');
        const next = document.getElementById('loreNext');
        if (prev) prev.addEventListener('click', () => { if (current > 0) { current--; render(); } });
        if (next) next.addEventListener('click', () => { if (current < pages.length - 1) { current++; render(); } });
    }

    render();
}
*/

// updated showLore that uses the modal instead of gameOutput
function showLore() {
    const roles = [
        { name: "knight", desc: "Armored warrior, strong defense and melee damage." },
        { name: "adventurer", desc: "Versatile explorer with balanced stats." },
        { name: "hero", desc: "Exceptional combatant with high damage potential." },
        { name: "mercenary", desc: "Professional fighter for hire, skilled in tactics." },
        { name: "assassin", desc: "Stealthy killer with high critical damage." },
    ];

    const races = [
        { name: "human", desc: "Adaptable and balanced." },
        { name: "elf", desc: "Agile and magically inclined." },
        { name: "demon", desc: "Powerful but often volatile." },
        { name: "undead", desc: "Resilient, with unusual traits." },
        { name: "angel", desc: "Blessed beings with strong auras." },
        { name: "arch-angel", desc: "Exceptional celestial beings." },
        { name: "dwarf", desc: "Sturdy and strong craftsmen." },
        { name: "demi-god", desc: "Partially divine, very powerful." },
        { name: "giant", desc: "Massive strength and presence." },
    ];

    const pages = [];
    // build pages
    const roleColors = {
        "assassin": "#dc143c",
        "knight": "#c0c0c0",
        "mercenary": "#008000",
        "hero": "#ff8c00",
        "adventurer": "#8b7355"
    };
    let rolesHtml = "<strong>Roles</strong><br>";
    roles.forEach(r => { 
        const color = roleColors[r.name] || "#000000";
        rolesHtml += `<em style="color: ${color}; font-weight: bold;">${r.name}</em>: ${r.desc}<br>`; 
    });
    pages.push(rolesHtml);
    const raceColors = {
        "human": "#4a4a4a",
        "elf": "#228b22",
        "demon": "#8b0000",
        "undead": "#9932cc",
        "angel": "#ffd700",
        "arch-angel": "#00ffff",
        "dwarf": "#a0826d",
        "demi-god": "#ff1493",
        "giant": "#4169e1"
    };
    let racesHtml = "<strong>Races</strong><br>";
    races.forEach(r => { 
        const color = raceColors[r.name] || "#000000";
        racesHtml += `<em style="color: ${color}; font-weight: bold;">${r.name}</em>: ${r.desc}<br>`; 
    });
    pages.push(racesHtml);

    // show modal pagination
    let current = 0;
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modalText');
    const modalChoices = document.getElementById('modalChoices');
    function renderModal() {
        modalText.innerHTML = pages[current];
        modalChoices.innerHTML = '';
        const prev = document.createElement('button');
        prev.textContent = '<';
        prev.disabled = current === 0;
        prev.onclick = () => { if (current > 0) { current--; renderModal(); } };
        const next = document.createElement('button');
        next.textContent = '>';
        next.disabled = current === pages.length - 1;
        next.onclick = () => { if (current < pages.length - 1) { current++; renderModal(); } };
        const close = document.createElement('button');
        close.textContent = 'Close';
        close.onclick = () => { modal.classList.remove('active'); };
        modalChoices.appendChild(prev);
        modalChoices.appendChild(next);
        modalChoices.appendChild(close);
        modal.classList.add('active');
    }
    renderModal();
}


async function npcInterface() {
    const reply = await chatPrompt("A mage approaches you, do you wish to speak with her? y/n");
    if (reply === "y") {
        alert("Mage: Welcome, traveller!, i have some valuables you might enjoy yourself to.");
    } else {
        alert("The stranger walks away.");
    }
}

async function teleport() {
    const place = await chatPrompt("you have the option to teleport to the kingdom, training grounds, town, tavern, or forest. Where do you wish to go?");
    if (!place) return; // cancelled

    const normalized = place.toLowerCase().trim();
    // set current location
    let currentLocation = normalized;

    switch (normalized) {
        case "kingdom":
            alert(`Teleporting to kingdom…`);
            kingdomArea();
            break;
        case "training grounds":
        case "trainingground":
        case "training":
            alert(`Teleporting to training grounds…`);
            trainingGroundsArea();
            break;
        case "town":
            alert(`Teleporting to town…`);
            townArea();
            break;
        case "tavern":
            alert(`Teleporting to tavern…`);
            tavernArea();
            break;
        case "forest":
            alert(`Teleporting to forest…`);
            forestArea();
            break;
        default:
            alert("Unknown location. Valid choices: kingdom, training grounds, town, tavern, forest.");
            return;
    }

    console.log("Current location:", currentLocation);
}
// wire the buttons up when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnStats").addEventListener("click", showStats);
    document.getElementById("btnNPC").addEventListener("click", npcInterface);
    document.getElementById("btnLocation").addEventListener("click", teleport);
    const loreBtn = document.getElementById("btnLore");
    if (loreBtn) loreBtn.addEventListener("click", toggleLore);
    const chatBtn = document.getElementById("btnChat");
    if (chatBtn) chatBtn.addEventListener("click", toggleChat);
    const homeBtn = document.getElementById("btnHome");
    if (homeBtn) homeBtn.addEventListener("click", () => {
        goHome();
    });
    const invBtn = document.getElementById("btnInventory");
    if (invBtn) invBtn.addEventListener("click", () => {
        showInventory();
    });

    // dialogue input handling
    const sendBtn = document.getElementById("dialogueSend");
    const inputBox = document.getElementById("dialogueInput");
    if (sendBtn && inputBox) {
        sendBtn.addEventListener("click", () => {
            const v = inputBox.value.trim();
            if (!v) return;
            // if a prompt is waiting, allow 'back' to re-show the question
                    if (promptResolve) {
                if (v.toLowerCase() === 'back') {
                    if (currentPromptQuestion) displayDialogue(currentPromptQuestion);
                    inputBox.value = '';
                    return;
                }
                // resolve the pending prompt and disable input
                promptResolve(v);
                promptResolve = null;
                inputBox.value = "";
                inputBox.disabled = true;
                return;
            }
                    // typing is disabled unless a prompt is active; ignore free chat
            inputBox.value = "";
        });
        inputBox.addEventListener("keypress", (e) => {
            if (e.key === "Enter") sendBtn.click();
        });
        // disable free chat until a prompt is active
        inputBox.disabled = true;
    }

    // start the main game flow
    startGame();

    // make the chat panel draggable by its header
    const chatArea = document.getElementById('dialogueArea');
    const chatHeader = document.getElementById('dialogHeader');
    if (chatArea && chatHeader) makeDraggable(chatArea, chatHeader);
});

// utility to make an element draggable by clicking a handle
function makeDraggable(el, handle) {
    handle = handle || el;
    let offsetX = 0, offsetY = 0;
    function mouseMove(e) {
        el.style.left = (e.clientX - offsetX) + 'px';
        el.style.top = (e.clientY - offsetY) + 'px';
    }
    function mouseUp() {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
        // snapping to nearest edge
        const rect = el.getBoundingClientRect();
        const winW = window.innerWidth;
        const winH = window.innerHeight;
        // horizontal snap
        if (rect.left + rect.width/2 < winW/2) {
            el.style.left = '0px';
        } else {
            el.style.left = (winW - rect.width) + 'px';
        }
        // vertical snap
        if (rect.top + rect.height/2 < winH/2) {
            el.style.top = '0px';
        } else {
            el.style.top = (winH - rect.height) + 'px';
        }
    }
    handle.addEventListener('mousedown', (e) => {
        const rect = el.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    });
}

// make modal content draggable whenever shown; hook into existing modal logic
const modalContentObserver = new MutationObserver((mutations) => {
    mutations.forEach(m => {
        if (m.target.id === 'modal' && m.target.classList.contains('active')) {
            const mc = document.querySelector('.modal-content');
            if (mc) makeDraggable(mc, mc);
        }
    });
});
const modalNode = document.getElementById('modal');
if (modalNode) {
    modalContentObserver.observe(modalNode, { attributes: true, attributeFilter: ['class'] });
}

// helper to escape HTML in user input
function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// go home handler (resets character and shows message)
function goHome() {
    initializeCharacter();
    displayDialogue("You returned home.");
}

// display dialogue in the dialogue area and append to game output
function displayDialogue(text) {
    // append to chat buffer and render into right-side chatHistory
    const chatEl = document.getElementById('chatHistory');
    if (chatEl) {
        chatMessages.push(text);
        newSincePrune++;
        // when prune threshold reached, remove one oldest message if we exceed max
        if (newSincePrune >= pruneThreshold && chatMessages.length > maxChatMessages) {
            chatMessages.shift();
            newSincePrune = 0;
        }
        // clamp to max messages
        while (chatMessages.length > maxChatMessages) chatMessages.shift();

        // render messages
        chatEl.innerHTML = chatMessages.map(m => `<div style="margin-bottom:6px;">${escapeHtml(m)}</div>`).join('');
        chatEl.scrollTop = chatEl.scrollHeight;
    } else {
        // fallback to old single-line dialogue if chatHistory not present
        const dlg = document.getElementById("dialogue");
        if (dlg) dlg.innerHTML = text;
    }

}


// override window.alert to show in dialogue area instead of blocking popup
window.alert = function(message) {
    try { displayDialogue(message); } catch (e) { console.log(message); }
};

// chat toggle function
function toggleChat() {
    const dlgArea = document.getElementById('dialogueArea');
    if (dlgArea) {
        dlgArea.style.display = dlgArea.style.display === 'none' ? 'block' : 'none';
    }
}

// lore toggle state and handler
let loreOpen = false;
function toggleLore() {
    if (loreOpen) {
        const modal = document.getElementById('modal');
        if (modal) modal.classList.remove('active');
        loreOpen = false;
    } else {
        showLore();
        loreOpen = true;
    }
}
function forestArea() {
alert("you have entered a dangerous area, the monsters are strong, but have a chance of dropping rewards that you can either sell, or use for your own strength.");
}

function tavernArea() {
    // tavern interactions; offer to buy a drink (only here prompt currency)
    if (age === "young") {
        alert("the tavern owner looks at you with a confused expression, and says, 'you look too young to be here, get lost kid'");
        return;
    } else if (age === "youngAdult") {
        alert("the tavern owner looks at you and says, 'welcome to the tavern, we have the best ale in the kingdom!'");
    } else if (age === "uncStatus") {
        alert("the tavern owner looks at you with respect, and says, 'welcome to the tavern, you must be a seasoned adventurer, feel free to look around and interact with the other patrons, they might have some quests for you.");
        alert("welcome! welcome! says the tavern owner.");
    }

    // Offer a purchase option handled through chat
    (async () => {
        const buy = await chatPrompt("Would you like to buy a drink? y/n");
        if (!buy) return;
        if (buy.toLowerCase().trim() === 'y') {
            const currencyChoice = await chooseCurrency();
            if (!currencyChoice) return;
            // simple drink price table
            const drinkPrices = { gold: 1, iron: 5, copper: 10 };
            const price = drinkPrices[currencyChoice] || drinkPrices.copper;
            if ((balances[currencyChoice] || 0) < price) {
                displayDialogue(`You don't have enough ${currencyChoice} to buy a drink.`);
                return;
            }
            balances[currencyChoice] -= price;
            displayDialogue(`You buy a drink for ${price} ${currencyChoice}. The tavern owner nods.`);
        } else {
            displayDialogue('You decide not to buy anything.');
        }
    })();
}

async function townArea() {
    alert("the town is bustling with activity, merchants are selling their wares, and people are going about their daily lives.");
    alert("you have the option to go to a shop, the blacksmith, or the market");
    const choice = await chatPrompt("where do you wish to go? shop, blacksmith, market");
    if (!choice) return;
    const normalized = choice.toLowerCase().trim();
    if (normalized === 'shop') {
        shopArea();
    } else if (normalized === 'blacksmith') {
        blacksmithArea("you enter the blacksmith, the sound of hammering on metal fills the air, the blacksmith looks up and says, 'welcome to my forge, if you have any weapons or armor that need repairing, or if you want to upgrade your current gear, i can help you with that.'");
    } else if (normalized === 'market') {
        marketArea();
    }
}

function shopArea() {
    displayDialogue("Welcome to the shop!");
    showShop();
}

// Simple shop interaction flow (chat-based)
async function showShop() {
    // list items
    displayDialogue('Items for sale:');
    shopItems.forEach(it => displayDialogue(`${it.name} - price: ${it.price.gold || '-'} gold / ${it.price.iron || '-'} iron / ${it.price.copper || '-'} copper (id: ${it.id})`));
    displayDialogue("Type the item id to buy, or 'exit' to leave.");
    const choice = await chatPrompt('Which item do you want to buy? (item id or exit)');
    if (!choice) return;
    const sel = choice.toLowerCase().trim();
    if (sel === 'exit') {
        displayDialogue('You leave the shop.');
        return;
    }
    const item = shopItems.find(i => i.id === sel || i.name.toLowerCase() === sel);
    if (!item) {
        displayDialogue('Item not found.');
        return;
    }
    // ask which currency to use (only here)
    const currencyChoice = await chooseCurrency();
    if (!currencyChoice) return;
    const price = item.price[currencyChoice];
    if (price === undefined) {
        displayDialogue(`This item cannot be bought with ${currencyChoice}.`);
        return;
    }
    if ((balances[currencyChoice] || 0) < price) {
        displayDialogue(`You don't have enough ${currencyChoice}.`);
        return;
    }
    // deduct and add to inventory
    balances[currencyChoice] -= price;
    inventoryItems.push({ id: item.id, name: item.name, slot: item.slot });
    displayDialogue(`You bought ${item.name} for ${price} ${currencyChoice}.`);
}
function blacksmithArea() {
alert("the blacksmith is a large, muscular man with a thick beard, he's working on a new sword, you can ask him to forge you a new weapon, or upgrade your current one.");
}
function marketArea() {
alert("the market is filled with various merchants selling their wares, you can find rare items here, but be careful, some of the merchants might be trying to scam you.");
}
function trainingGroundsArea() {
alert("This is the training area, you can train your stats dependent on the what you interact with.");
}

// Inventory data and functions
// Currency system
let currency={
    gold: 10,
    iron: 50,
    copper: 100,
}
currency = alert("what currency do you wish to use? gold, silver, bronze");

let balance;
switch (currency){
    case "gold":
        balance = 0;
        break;
    case "silver":
        balance = 10;
        break;
    case "bronze":
        balance = 50;
        break;
}   

let exchangeRate;
switch (currency){
    case "gold":
        exchangeRate = 1 / 5; // 1 gold = 5 silver
        exchangeRate = 1 / 25; // 1 gold = 25 bronze
        break;
    case "silver":
        exchangeRate = 1 / 5; // 1 silver = 5 bronze
        break;
}   

function convertCurrency(amount, fromCurrency, toCurrency) {
    let exchangeRate;
    switch (fromCurrency) {
        case "gold":
            if (toCurrency === "silver") {
                exchangeRate = 5; // 1 gold = 5 silver
            } else if (toCurrency === "copper") {
                exchangeRate = 25; // 1 gold = 25 copper
            }
            break;
        case "silver":
            if (toCurrency === "copper") {
                exchangeRate = 5; // 1 silver = 5 copper
            }
            break;
        case "copper":
            if (toCurrency === "silver") {
                exchangeRate = 1 / 5; // 1 copper = 0.2 silver
            } else if (toCurrency === "gold") {
                exchangeRate = 1 / 25; // 1 copper = 0.04 gold
            }
            break;
    }
    return amount * exchangeRate;
}
;

let inventoryItems = [
    { id: 'iron_helmet', name: 'Iron Helmet', slot: 'helmet' },
    { id: 'iron_sword', name: 'Iron Sword', slot: 'weapon' },
    { id: 'cloth_leggings', name: 'Cloth Leggings', slot: 'leggings' },
    { id: 'leather_chest', name: 'Leather Chest', slot: 'chest' },
    { id: 'leather_boots', name: 'Leather Boots', slot: 'shoes' },
];

let equipped = { helmet: null, weapon: null, leggings: null, chest: null, shoes: null };

// Shop items and pricing
const shopItems = [
    { id: 'health_potion', name: 'Health Potion', price: { gold: 2, iron: 10, copper: 50 }, slot: null },
    { id: 'mana_potion', name: 'Mana Potion', price: { gold: 3, iron: 15, copper: 75 }, slot: null },
    { id: 'steel_sword', name: 'Steel Sword', price: { gold: 5, iron: 25, copper: 100 }, slot: 'weapon' },
    { id: 'steel_helmet', name: 'Steel Helmet', price: { gold: 4, iron: 20, copper: 80 }, slot: 'helmet' },
    { id: 'dragon_scale_armor', name: 'Dragon Scale Armor', price: { gold: 10, iron: 50, copper: 200 }, slot: 'chest' },
];

function showInventory() {
    const panel = document.getElementById('inventoryPanel');
    if (!panel) return;
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    if (panel.style.display === 'block') renderInventory();
}

function renderInventory() {
    const itemsList = document.getElementById('itemsList');
    const equipmentSlots = document.getElementById('equipmentSlots');
    if (!itemsList || !equipmentSlots) return;

    // render items
    itemsList.innerHTML = '';
    inventoryItems.forEach(item => {
        const el = document.createElement('div');
        el.className = 'inv-item';
        el.draggable = true;
        el.style.border = '1px solid #333';
        el.style.padding = '6px 8px';
        el.style.cursor = 'grab';
        el.style.background = '#fff';
        el.style.margin = '4px';
        el.textContent = item.name;
        el.dataset.itemId = item.id;
        el.dataset.slot = item.slot;
        el.addEventListener('dragstart', onDragStart);
        itemsList.appendChild(el);
    });

    // render equipment slots content
    Array.from(equipmentSlots.querySelectorAll('.slot')).forEach(slotEl => {
        const slotName = slotEl.dataset.slot;
        slotEl.innerHTML = '';
        slotEl.style.minHeight = '40px';
        slotEl.addEventListener('dragover', onDragOver);
        slotEl.addEventListener('drop', onDrop);
        if (equipped[slotName]) {
            const eq = document.createElement('div');
            eq.textContent = equipped[slotName].name;
            eq.style.fontWeight = '600';
            slotEl.appendChild(eq);
        } else {
            slotEl.textContent = slotEl.dataset.slot.charAt(0).toUpperCase() + slotEl.dataset.slot.slice(1);
        }
    });
}

function onDragStart(e) {
    const id = e.target.dataset.itemId;
    e.dataTransfer.setData('text/plain', id);
}

function onDragOver(e) {
    e.preventDefault();
}

function onDrop(e) {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    const slotName = e.currentTarget.dataset.slot;
    const itemIndex = inventoryItems.findIndex(it => it.id === itemId);
    if (itemIndex === -1) return;
    const item = inventoryItems[itemIndex];
    if (item.slot !== slotName) {
        displayDialogue('You cannot equip that item to this slot.');
        return;
    }

    // if slot occupied, return equipped to inventory
    if (equipped[slotName]) {
        inventoryItems.push(equipped[slotName]);
    }

    // equip
    equipped[slotName] = item;
    // remove from inventory
    inventoryItems.splice(itemIndex, 1);
    renderInventory();
    displayDialogue(`${item.name} equipped to ${slotName}.`);
}

// Skill and Weapon System
let weaponClass = null; // 'scythe_master', 'long_sword', 'mage'
let mageElement = null; // for mages: 'poison', 'fire', 'water', 'ice', 'electricity'
let skillPoints = 0;
let skillDifficulty = 0;

const weaponSkills = {
    scythe_master: { name: 'Scythe Master', difficulty: 5, desc: 'Fast attacks with quick strikes.' },
    long_sword: { name: 'Long Sword', difficulty: 2, desc: 'Medium attacks with balanced damage.' },
    mage: { name: 'Mage', difficulty: 8, desc: 'Magical attacks using elements.' },
};

const mageElements = {
    poison: { name: 'Poison Mage', desc: 'Damage over time and debuffs.' },
    fire: { name: 'Fire Mage', desc: 'Burn effects and high damage.' },
    water: { name: 'Water Mage', desc: 'Cooling effects and slowing.' },
    ice: { name: 'Ice Mage', desc: 'Freeze and stun enemies.' },
    electricity: { name: 'Electricity Mage', desc: 'Stun and chain attacks.' },
};

// NPC System with random encounters
const npcs = [
    { name: 'Merchant', desc: 'A mysterious merchant with rare goods.', initiated: false },
    { name: 'Warrior', desc: 'A seasoned warrior offering combat training.', initiated: false },
    { name: 'Sage', desc: 'An ancient sage full of wisdom.', initiated: false },
    { name: 'Thief', desc: 'A cunning thief with secrets to share.', initiated: false },
    { name: 'Healer', desc: 'A kind healer tending to the wounded.', initiated: false },
];

let currentNPC = null;

// trigger random NPC encounter
function triggerRandomNPCEncounter() {
    const chance = Math.random();
    if (chance < 0.3) { // 30% chance
        const npc = npcs[Math.floor(Math.random() * npcs.length)];
        currentNPC = npc;
        npc.initiated = true;
        displayDialogue(`${npc.name} approaches you: "${npc.desc}"`);
    }
}

// interact with current NPC
function interactWithNPC() {
    if (!currentNPC) {
        displayDialogue('No one is around to talk to.');
        return;
    }
    displayDialogue(`You speak with ${currentNPC.name}: "What brings you to these lands?"`);
}

// weapon selection during game
async function selectWeaponClass() {
    const choice = await chatPrompt("What weapon type do you wish to focus on? (scythe_master, long_sword, or mage)");
    const normalized = choice.toLowerCase().trim();
    
    if (normalized === 'scythe_master') {
        weaponClass = 'scythe_master';
        skillDifficulty = weaponSkills.scythe_master.difficulty;
        displayDialogue(`You have chosen the Scythe Master class: ${weaponSkills.scythe_master.desc}`);
    } else if (normalized === 'long_sword') {
        weaponClass = 'long_sword';
        skillDifficulty = weaponSkills.long_sword.difficulty;
        displayDialogue(`You have become a Sword Master: ${weaponSkills.long_sword.desc}`);
    } else if (normalized === 'mage') {
        weaponClass = 'mage';
        skillDifficulty = weaponSkills.mage.difficulty;
        displayDialogue(`You have chosen the Mage class: ${weaponSkills.mage.desc}`);
        
        // select mage element
        const element = await chatPrompt("Select your element: (poison, fire, water, ice, or electricity)");
        const elemNorm = element.toLowerCase().trim();
        if (mageElements[elemNorm]) {
            mageElement = elemNorm;
            displayDialogue(`You become a ${mageElements[elemNorm].name}! ${mageElements[elemNorm].desc}`);
        } else {
            mageElement = 'fire';
            displayDialogue(`You default to Fire Mage.`);
        }
    } else {
        displayDialogue('Invalid choice. Defaulting to Long Sword.');
        weaponClass = 'long_sword';
        skillDifficulty = weaponSkills.long_sword.difficulty;
    }
}