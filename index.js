const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

const size    = config.colors;
const rainbow = new Array(size);

for (var i=0; i<size; i++) {
  var red   = sin_to_hex(i, 0 * Math.PI * 2/3); // 0   deg
  var blue  = sin_to_hex(i, 1 * Math.PI * 2/3); // 120 deg
  var green = sin_to_hex(i, 2 * Math.PI * 2/3); // 240 deg

  rainbow[i] = '#'+ red + green + blue;
}

function sin_to_hex(i, phase) {
  var sin = Math.sin(Math.PI / size * 2 * i + phase);
  var int = Math.floor(sin * 127) + 128;
  var hex = int.toString(16);

  return hex.length === 1 ? '0'+hex : hex;
}

let place = 0;
const servers = config.servers;

function changeColor() {
  for (let index = 0; index < servers.length; ++index) {		
    client.guilds.get(servers[index]).roles.find('name', config.roleName).setColor(rainbow[place])
		.catch(console.error);
		
    if(config.logging){
      console.log(`[ColorChanger] Changed color to ${rainbow[place]} in server: ${servers[index]}`);
    }
    if(place == (size - 1)){
      place = 0;
    }else{
      place++;
    }
  }
}

const activities_list = [
    "https://discord.gg/HSNEcyj", 
    "Hi,Discord:HSNEcyj",
    "Armin", 
    "!help Vampire", 
    "Gaming Mode", 
    "Persian GAP", 
    "!invite", 
    "https://discord.gg/HSNEcyj"
    ]; // creates an arraylist containing phrases you want your bot to switch through.

client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
    }, 5000); // Runs this every 10 seconds.
});


client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
  if(config.speed < 2){console.log("The minimum speed is 60.000, if this gets abused your bot might get IP-banned"); process.exit(1);}
  setInterval(changeColor, config.speed);
});

client.on('message', msg => {
  if (msg.content === '!invite') {
    msg.reply('https://discord.gg/HSNEcyj');
  }
});

client.on('message', msg => {
  if (msg.content === '!help') {
    msg.reply('https://discord.gg/HSNEcyj');
  }
});

client.login(config.token);
