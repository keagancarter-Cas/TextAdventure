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
//player stats
let experienceMultiplierBasedOnAge;
if (age < 10){
    experienceMultiplierBasedOnAge=(2.00 * 1);}
else if (age <= 16){
    experienceMultiplierBasedOnAge=(1.5*1);
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
    (+9)
}
//different roles available
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
// //danger levels of both npcs and player (abilities and attacks available and depends on relationships)

// let experienceGain;
// experienceGain=(1*age);


// let statOfCharacter;
// switch (statLevels){
//     case "base damage":
//         (1*{levelInDamage});
//         break;
//     case "healthpoints":
//         (10*{levelInHealth});
//         break;
//     case "defense":
//         (5*{levelInDefense});
//         break;
//     case "magic":
//         (3*{levelInMagic});
// }

// let damageToEnemies;
// damageToEnemies=(role)*(statOfCharacter);

let welcomePlayer;
welcomePlayer=(player);
alert("welcome, we've been waiting for your arrival");
alert("the king is waiting to speak with you");
let question = prompt("do you wish to travel to the palace now? 1/2");
console.log(question);
if (question == "y") {
    alert("you will travel to the palace shortly");
    } if (question == "2"){alert ("Teleport initializing...Please wait momentarily");
    alert("you have been teleported back to your world, Ending: The world gets destroyed and your life is chaos as a result of your choices");}

let king;
//  age = "uncStatus";
//  riskLevel = "high";
//  role="former hero";

//  let healthPoints;
//  healthPoints=(level + role)*{gearType}%(age);

console.log(king);

if (question=1){alert("the king sits on his massive throne infront of you, he's thought to be at least 10 feet tall, with a bulky build and strong manner. hello, player, you have been summoned from your world because of the tyranical leader in the underworld. we need you to stop him");}

 let answerRequest; if(question==1) {answerRequest}{prompt("will you accept the request? y/n");}

 console.log(answerRequest);
 if(answerRequest == "y");{
    alert("the king seems pleased...your training will start soon, note; it will not be easy. But your hard work will pay off.");}
     {if (answerRequest== "n")alert("the king sits up, a worried expression on his face...he pleads but understands if you insist on saying no, implying your consequences will be heavy, but the reward for complying will be handsome.");}
        if(answerRequest=="n");{console.log(answerRequest);
            
       prompt("ONLY PUT nah");

       console.log(answerRequest);
     if (answerRequest== "nah"){

    answerRequest="nah"};prompt("are you sure? yes/no");}

console.log(answerRequest);
if (answerRequest == "yes");{
        if(answerRequest=="yes")alert("then its settled. we will begin your training momentarily, please decide what skill you should specialize in. scythe, magic, long sword")};
if (answerRequest == "no"){
 if (answerRequest=="no")alert("fine, then you shall be a enemy to our kingdom")
    if (answerRequest =="no") alert("you have been outcast and surrounded by guards");}
// console.log(WeaponClass);
// let weaponClass;
// switch(weaponSelection){
// case "scythe master":
//     (skillDifficulty = 5);
// break; 
// case "Long Sword":
//     (skillDifficulty= 2);
// break;
// case "mage":
//     (skillDifficulty=8);
//     let elements;
//     case "poison":
//         break;
//     case "fire":
//         break;
//     case "water":
//         break;
//     case "ice":
//     break;
//     case "electricity":
// }
// let weaponChoice = prompt("what weapon type do you wish to focus on?");
// console.log(weaponChoice);
// if (weaponChoice == "scythe master"){alert("you have successfully chosen the scythe wielding class focusing on fast attacks");} if(weaponChoice=="Long sword"){alert("you have officially became one with the sword focusing on medium attacks and able to deal okay damage");} if (weaponChoice == "mage"){alert ("you have successfully chosen the magic class");} if (weaponChoice == "mage"){alert ("please select one of the following");}
// console.log("mage");
// if ("mage" == "poison"){alert("you have successfully became a poison-type mage, you focus on damaging over time and stacking up debuffs, you can slow down opponents as well due to toxic venom");} if ("mage" == "fire"){alert ("you have officially became a fire mage, you're able to infuse your attacks with burn, and scorch your opponents.");} if ("mage"== "ice"){alert("you have successfully became a ice mage, utilizing the power of ice, and able to freeze enemies stunning them, and solidifying them in a frozen state");} if ("mage"== "electricity"){alert("you have officially became skilled in the arts of electricity, causing enemies to be stunned, infused with deadly water if mixed with electricity as well.");}
// let alert = prompt("Note, you can go back and learn another skill once you've gained enough experience.");
// console.log(alert);