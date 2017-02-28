const Discord = require('discord.js');
const config = require("./config.json");

module.exports = {
  printAsbstats: function(name, worksheet, pokemonList){

    if(pokemonList.has(name)){

      //get the row of the pokemon
      var row = pokemonList.get(name);

      //begin collecting the information
      var messageContent = name.charAt(0).toUpperCase() + name.slice(1) + " - " + worksheet['C'+row].v + " | " + worksheet['D'+row].v;

      //if the pokemon has hidden ability, print it
      if(worksheet['E'+row].v != 'x'){
        messageContent += "/" + worksheet['E'+row].v;
      }
      //finish collecting information
      messageContent+= " | " + worksheet['F'+row].v + "/" + worksheet['G'+row].v + "/"
      + worksheet['H'+row].v+ "/" + worksheet['I'+row].v+ "/" + worksheet['J'+row].v+ "/" + worksheet['K'+row].v+ "/" + worksheet['L'+row].v
      + " | Size: " + worksheet['M'+row].v + " | Weight: " + worksheet['N'+row].v + " | +Spe nat. Acc Boost: " + worksheet['O'+row].v+ "% ";

      //print addional information for non megas
      if(worksheet['Q' + row] != undefined){
        messageContent += " | CC cost: "+ worksheet['Q'+row].v + " | CHP: " + worksheet['R'+row].v + " | Sig. Item(s): " + worksheet['S'+row].v + " | Boosted Stats: " + worksheet['T'+row].v;
      }


    }else{
      messageContent = "That's not a pokemon! Did you make a typo?";
    }

    return messageContent;
  },

  printNatures: function(nature, worksheet, natureList){

    if(natureList.has(nature)){
      var row = natureList.get(nature);
      var messageContent = nature.charAt(0).toUpperCase() + nature.slice(1) + " - " + worksheet['B'+row].v + " | Moody: " + worksheet['C'+row].v;
    }else{
      messageContent = "That's not a nature! Did you make a typo?";
    }

    return messageContent;
  },

  printAbilities: function(ability, worksheet, abilityList){

    if(abilityList.has(ability)){
      var row = abilityList.get(ability);
      var messageContent = ability.charAt(0).toUpperCase() + ability.slice(1) + " - Type: " + worksheet['B'+row].v + " | Description: " + worksheet['C'+row].v + " | Mold Breaker: " + worksheet['D'+row].v;
    }else{
      messageContent = "That's not an ability! Did you make a typo?";
    }

    return messageContent;
  },

  printHeldItem: function(item, worksheet, itemList){

    if(itemList.has(item)){
      var row = itemList.get(item);
      var messageContent = item.charAt(0).toUpperCase() + item.slice(1) + " - Item Cost: " + worksheet['C' + row].v + " | Effect: " + worksheet['D' + row].v;
    }else{
      messageContent = "That's not a held item! Did you make a typo?";
    }

    return messageContent;
  },

  printTLRItem: function(item, worksheet, itemList){

    if(itemList.has(item)){
      var row = itemList.get(item);
      var messageContent = item.charAt(0).toUpperCase() + item.slice(1) + " - Item Cost: " + worksheet['C' + row].v + " | Effect: " + worksheet['D' + row].v + " | Trigger: " + worksheet['G' + row].v;
    }else{
      messageContent = "That's not a TLR item! Did you make a typo?";
    }

    return messageContent;
  },

  printKeyItem: function(item, worksheet, itemList){

    if(itemList.has(item)){
      var row = itemList.get(item);
      var messageContent = item.charAt(0).toUpperCase() + item.slice(1) + " - Item Type: " + worksheet['B' + row].v + " | Item Cost: " + worksheet['C' + row].v
      + " | Effect: " + worksheet['D' + row].v + " | Affected Pokemon: " + worksheet['E' + row].v;
    }else{
      messageContent = "That's not a key item! Did you make a typo?";
    }
    return messageContent;
  },

  printMoves: function(move, worksheet, moveList){


    if(moveList.has(move)){

      var rows = moveList.get(move);
      var messageContent = move.charAt(0).toUpperCase() + move.slice(1) + " - Type: " + worksheet['B' + rows[0]].v + " | Category: " + worksheet['C' + rows[0]].v
      + " | Target: " + worksheet['D' + rows[0]].v;

      if(worksheet['G' + rows[0]].v != '-'){
        messageContent+= " | BAP: " + worksheet['G' + rows[0]].v;
      }

      messageContent += " | Acc: " + worksheet['I' + rows[0]].v + " | Energy Cost: " + worksheet['J' + rows[0]].v;

      if(worksheet['K' + rows[0]].v != '-'){
        messageContent += " | Effect Chance: " + worksheet['K' + rows[0]].v;
      }

      messageContent += " | Contact: " + worksheet['L' + rows[0]].v + " | Priority: " + worksheet['M' + rows[0]].v
      + " | Combo Type: " + worksheet['N' + rows[0]].v + " | Snatch: " + worksheet['O' + rows[0]].v + " | Magic Coat/Bounce: " + worksheet['P' + rows[0]].v + " | Description: ";

      var counter = rows[0] + 1;
      while(counter <= rows[1] ){
        messageContent += " " + worksheet['B' + counter].v;
        counter++;
      }

    }else{
      messageContent = "That's not a move or a command! Did you make a typo?";
    }

    return messageContent;
  },

  rand: function(low,high,next){
    var messageContent;
    if(low == undefined){
      messageContent = Math.floor((Math.random() * 10000) + 1);
    }else if(low != undefined && high !=undefined && next == undefined){
      messageContent = Math.floor((Math.random() * high) + low);
    }else{
      messageContent = "Invalid parameters try again.";
    }

    return messageContent;
  },

  printHelp: function(){
    var messageContent = "Made by Skyler Reimer. https://github.com/skylerreimer/ASBot2.0-\n";
    messageContent += "To add this bot to your server: http://bit.ly/2l0H4EB\n";
    messageContent += "Please message me @comic67 or make an issue on the bot's github if you find a bug\n";
    messageContent += "\n"
    messageContent += "Command List:\n";
    messageContent += "%asbstats pokemon name\n";
    messageContent += "%asbility ability nane\n";
    messageContent += "%asbkitem key item name\n";
    messageContent += "%asbhitem held item name\n";
    messageContent += "%asbtitem TLR item name\n";
    messageContent += "%asbnature nature name\n";
    messageContent += "%asbmove move name\n";
    messageContent += "%roll lowestNum highestNum (no arguments defaults to 1 to 10000)\n";
    messageContent += "%help\n";

    return messageContent;
  }



};
