// Helper function to show text on the page
function showMessage(text) {
    const output = document.getElementById("gameOutput");
    output.innerHTML += `<p>${text}</p>`;
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

let player;
player = prompt("what is your name?");
console.log(player);
let age;
age = prompt("what age do you wish to be? young, youngAdult, uncStatus");
console.log(age);
let role;
role=prompt("You can choose from 3 classes; knight, adventurer, or hero");
console.log(role);
let riskLevel;
riskLevel = alert("How dangerous do you wish to be?");
prompt("low risk, medium, high");
console.log(riskLevel);
let race;
role= alert("race selection imminent");
prompt("human, elf, demon");
console.log(race);
let statLevels;
statLevels = prompt("what stat do you wish to focus on? base damage, healthpoints, defense, magic");
console.log(statLevels);
//player creation

let experienceMultiplierBasedOnAge;
if (age < 10){
    experienceMultiplierBasedOnAge=(0.5*2);}
else if (age <= 16){
    experienceMultiplierBasedOnAge=(2*1);
} else{
    experienceMultiplierBasedOnAge=(3*1);
} 
 age;
if (age < 10){ 
    age="young"; 
} else if (age <= 16){ 
    age="youngAdult"; 
} else if (age >= 20){
    age="uncStatus";
}
// //player and npc age ranges
// //Damage or stat increase based on these roles
switch(role){
case "knight":
    (+6);
break;
case "adventurer":
    (+4);
break;
case "hero":
    (+14);
    break;
case "former hero":
    (+9);
    break;
}
//different roles available
race;
switch(race){
case "human":
    (+1);
    break;
case "elf":
    (+2);
    break;
case "demon":
    (+3);
    break;
    case "arch angel":
    (+5);
    break;
    case "ogre":
    (+4);
    break;
    case "dragonborn":
    (+5);
    break;
}
//different races possible, with stat increases
riskLevel;
switch(riskLevel){
case "low risk":
(riskLevel = 1-3);
break;
case "medium":
(riskLevel =4-7);
break;
case "high":
(riskLevel =8-10);
}
//danger levels of both npcs and player (abilities and attacks available and depends on relationships)

let experienceGain;
experienceGain=(1*age);

let areasOfTheWorld;
kingdom = prompt("what kingdom do you wish to be in? training grounds, town, tavern, forest");
console.log(kingdom);
let statOfCharacter;
switch (statLevels){
    case "base damage":
        (1*{levelInDamage}+(race));
        break;
    case "healthpoints":
        (10*{levelInHealth}+(race));
        break;
    case "defense":
        (5*{levelInDefense}+(race));
        break;
    case "magic":
        (3*{levelInMagic}+(race));
}
let levelInDamage;
levelInDamage=(1*experienceGain);
let levelInHealth;
levelInHealth=(10*experienceGain);
let levelInDefense;
levelInDefense=(5*experienceGain);
let levelInMagic;
levelInMagic=(3*experienceGain);

let damageToEnemies;
damageToEnemies=(role)*(statOfCharacter);

let welcomePlayer;
welcomePlayer=(player);
alert("welcome, we've been waiting for your arrival");
alert("the king is waiting to speak with you");
let question = prompt("do you wish to travel to the palace now? 1=yes 2=no ");
console.log(question);

if (question === "1") {
    question = "y";}
    else if (question === "2") {
        question = "n";
    }

if (question === "y") {
    alert("you will travel to the palace shortly");
    alert("the king sits on his massive throne infront of you, he's thought to be at least 10 feet tall, with a bulky build and strong manner. hello, player, you have been summoned from your world because of the tyranical leader in the underworld. we need you to stop him");
    let answerRequest = prompt("will you accept the request? y/n");
    console.log(answerRequest);

    if (answerRequest === "y") {
        alert("the king seems pleased…your training will start soon");
        let weapon = prompt("choose your choice of warfare: scythe, long sword, magic");
    } else if (answerRequest === "n") {
        alert("the king sits up, a worried expression on his face...he pleads but understands if you insist on saying no, implying your consequences will be heavy, but the reward for complying will be handsome");
        let nah = prompt("ONLY PUT nah");
        if (nah === "nah") {
            let sure = prompt("are you sure? yes/no");
            if (sure === "yes") {
                alert("then its settled. we will begin your training momentarily, please decide what skill you should specialize in. scythe, magic, long sword");
            } else if (sure === "no") {
                alert("fine, then you shall be a enemy to our kingdom");
                let execution = prompt("you have been publically executed, do you accept your fate? yes/no");
                if (execution === "yes") {
                    alert("you have been executed, you have failed the king's request");
                } else if (execution === "no") {
                    alert("you have been reborn as a demon, and will be forced to serve the tyranical leader in the underworld");
                }
            }
        }
    }
} else if (question === "n") {
    alert("Teleport initializing…");
    alert("you have been teleported back to your world…");
}
let training;
training = prompt("you have been teleported to the training grounds, do you wish to train your base damage, healthpoints, defense, or magic?");
console.log(training);
switch(training){
    case "base damage":
        (1*{levelInDamage});
        break;
    case "healthpoints":
        (10*{levelInHealth});
        break;
    case "defense":
        (5*{levelInDefense});
        break;
    case "magic":
        (3*{levelInMagic});
}
function showStats() {
    alert(
        `name: ${player}\n` +
        `age: ${age}\n` +
        `class: ${role}\n` +
        `race: ${race}\n` +
        `risk: ${riskLevel}`
    );
}

// let currency;
// currency = prompt("what currency do you wish to use? gold, silver, bronze");
// console.log(currency);
// let balance;
// switch (currency){
//     case "gold":
//         balance = 0;
//         break;
//     case "silver":
//         balance = 10;
//         break;
//     case "bronze":
//         balance = 50;
//         break;
// }   

// let exchangeRate;
// switch (currency){
//     case "gold":
//         exchangeRate = 1 / 5; // 1 gold = 5 silver
//         exchangeRate = 1 / 25; // 1 gold = 25 bronze
//         break;
//     case "silver":
//         exchangeRate = 1 / 5; // 1 silver = 5 bronze
//         break;
// }   

// function convertCurrency(amount, fromCurrency, toCurrency) {
//     let exchangeRate;
//     switch (fromCurrency) {
//         case "gold":
//             if (toCurrency === "silver") {
//                 exchangeRate = 5; // 1 gold = 5 silver
//             } else if (toCurrency === "bronze") {
//                 exchangeRate = 25; // 1 gold = 25 bronze
//             }
//             break;
//         case "silver":
//             if (toCurrency === "bronze") {
//                 exchangeRate = 5; // 1 silver = 5 bronze
//             }
//             break;
//         case "bronze":
//             if (toCurrency === "silver") {
//                 exchangeRate = 1 / 5; // 1 bronze = 0.2 silver
//             } else if (toCurrency === "gold") {
//                 exchangeRate = 1 / 25; // 1 bronze = 0.04 gold
//             }
//             break;
//     }
//     return amount * exchangeRate;
// }

// function npcInterface() {
//     const reply = prompt("A mage approaches you, do you wish to speak with her? y/n");
//     if (reply === "y") {
//         alert("Mage: Welcome, traveller!, i have some valuables you might enjoy yourself to.");
//     } else {
//         alert("The stranger walks away.");
//     }
// }

// function teleport() {
//     const place = prompt("Enter the name of the area you wish to teleport to");
//     if (place === kingdom) {
//         alert(`Teleporting to ${kingdom}…`);}
//     if (place === "training grounds") {
//         alert(`Teleporting to ${trainingGrounds}…`);
//     }
//      if (place === town) {
//         alert(`Teleporting to ${town}…`);
//      }
//          if (place === tavern) {
//         alert(`Teleporting to ${tavern}…`);
//     }
//         if (place === forest) {
//             alert(`Teleporting to ${forest}…`);
// }

// }
// wire the buttons up when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnStats").addEventListener("click", showStats);
    document.getElementById("btnNPC").addEventListener("click", npcInterface);
    document.getElementById("btnLocation").addEventListener("click", teleport);
});
