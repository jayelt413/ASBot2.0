const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("./config.json");
const password = require("./password.json");
var setup = require("./setup.js");
var messagePrinter = require("./printMessages.js")

//read in your file
if(typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('pokemon.xlsx');

//load the worksheet with the pokemon names
var worksheet = workbook.Sheets[workbook.SheetNames[4]];
var worksheetNatures = workbook.Sheets[workbook.SheetNames[5]];
var worksheetAbilities = workbook.Sheets[workbook.SheetNames[6]];
var worksheetHeldItems = workbook.Sheets[workbook.SheetNames[9]];
var worksheetTLRItems = workbook.Sheets[workbook.SheetNames[12]];
var worksheetKeyItems = workbook.Sheets[workbook.SheetNames[10]];
var worksheetMoves = workbook.Sheets[workbook.SheetNames[8]];


//make the map of pokemon and their row numbers
var pokemonList = setup.getPokemonList(worksheet);
var natureList = setup.getNatureList(worksheetNatures);
var abilityList = setup.getAbilityList(worksheetAbilities);
var heldItemList = setup.getHeldItemList(worksheetHeldItems);
var tlrItemList = setup.getTlrItemList(worksheetTLRItems);
var keyItemList = setup.getKeyItemList(worksheetKeyItems);
var moveList = setup.getMoveList(worksheetMoves);


//the bot will let you know in console when it is ready
bot.on('ready', () => {
  console.log('Bot is online!');
});


//begin looking for commands
bot.on('message', message => {
  //dont let bot talk to itself
  if (message.author.bot) return;
  //look for the prefix
  if (!message.content.startsWith(config.prefix)) return;
  //simplfy if/else logic for commands
  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length).toLowerCase();
  //grab the arguments and split them by spaces
  let args = message.content.split(" ").slice(1);

  if(command === "asbstats"){

    var tempName = args[0].toLowerCase();

    var i = 1;
    while(args[i] != undefined){
      tempName += " " + args[i].toLowerCase();
      i++;
    }

    var messageContent = messagePrinter.printAsbstats(tempName, worksheet, pokemonList);
    message.channel.sendMessage(messageContent);

  }else if(command ==="asbility"){

    var abilityName = args[0].toLowerCase();
    //second argument for abilities that are two words; Ex Zen Mode
    if(args[1] != undefined){
      abilityName += " " + args[1].toLowerCase();
    }
    var messageContent = messagePrinter.printAbilities(abilityName, worksheetAbilities, abilityList);
    message.channel.sendMessage(messageContent);

  }else if(command ==="asbkitem"){

    var itemName = args[0].toLowerCase();

    var i = 1;
    while(args[i] != undefined){
      itemName += " " + args[i].toLowerCase();
      i++;
    }

    var messageContent = messagePrinter.printKeyItem(itemName, worksheetKeyItems, keyItemList);
    message.channel.sendMessage(messageContent);

  }else if(command ==="asbhitem"){

    var itemName = args[0].toLowerCase();

    if(args[1] != undefined){
      itemName += " " + args[1].toLowerCase();
    }

    var messageContent = messagePrinter.printHeldItem(itemName, worksheetHeldItems, heldItemList);
    message.channel.sendMessage(messageContent);

  }else if(command ==="asbtitem"){

    var itemName = args[0].toLowerCase();

    var i = 1;
    while(args[i] != undefined){
      itemName += " " + args[i].toLowerCase();
      i++;
    }

    var messageContent = messagePrinter.printTLRItem(itemName, worksheetTLRItems, tlrItemList);
    message.channel.sendMessage(messageContent);

  }else if(command ==="asbnature"){

    var natureName = args[0].toLowerCase();
    var messageContent = messagePrinter.printNatures(natureName, worksheetNatures, natureList);
    message.channel.sendMessage(messageContent);

  }else if(command ==="calc"){

    var expression = args[0];
    var i = 1;
    while(args[i] != undefined){
      expression += args[i];
      i++;
    }
    var messageContent = messagePrinter.printExpression(expression);
    message.channel.sendMessage(messageContent);

  }else if(command ==="asbmove"){

    var moveName = args[0].toLowerCase();

    var i = 1;
    while(args[i] != undefined){
      moveName += " " + args[i].toLowerCase();
      i++;
    }
    console.log('input: '+moveName);
    var messageContent = messagePrinter.printMoves(moveName, worksheetMoves, moveList);
    message.channel.sendMessage(messageContent);

  }else if(command ==="roll"){

    var messageContent = messagePrinter.rand(args[0],args[1],args[2]);
    message.channel.sendMessage(messageContent);

  }else if(command === "help"){
    var messageContent = messagePrinter.printHelp();
    message.channel.sendMessage(messageContent);
  }

});
//login info for the bot
bot.login(password.token);
