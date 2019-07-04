const Discord = require('discord.js');

const bot = new Discord.Client();

const registeredUsers = [];
const registeredCommands = [];

const ADMINISTRATOR_PERM = 'ADMINISTRATOR';

function logMessage(message) {
  console.log(`Command received: ${message.content} | by ${message.author.username}`);
}

function joinVCAndPlaySound(voiceChannel) {
  voiceChannel.join().then((connection) => {
    const dispatcher = connection.playFile('./seinfeld.mp3');
    dispatcher.setVolume(0.8);
    dispatcher.on("end", end => {
      voiceChannel.leave();
    });
  }).catch((e) => {
    console.error(e);
  });
}

function getUserFromMention(mention) {
	const matches = mention.match(/^<@!?(\d+)>$/);
	const id = matches[1];
	return bot.users.get(id);
}

bot.on('voiceStateUpdate', (oldMember, newMember) => {
  const newUserChannel = newMember.voiceChannel;
  const oldUserChannel = oldMember.voiceChannel;
  if (oldUserChannel === undefined
  && newUserChannel !== undefined
  && registeredUsers.includes(newMember.user.id)
  && newUserChannel.members.array().length > 1) {
    // User joined a voice channel
    joinVCAndPlaySound(newUserChannel);
  }
});

bot.on('message', message => {
  const args = message.content.match(/('[^']+'|[^ ]+)/g);
  if (args[0] === '!seinfeld') {
    if (!args[1]) {
      joinVCAndPlaySound(message.member.voiceChannel);
    } else {
      switch (args[1]) {
        case 'add':
          logMessage(message.content);
          const user = getUserFromMention(args[2]);
          if (user && user !== bot.user && message.member.hasPermission(ADMINISTRATOR_PERM)) {
            registeredUsers.push(user.id);
            console.log(`Added ${user.username}`);
          }
          break;
        case 'command':
          logMessage(message);
          if (!message.member.hasPermission(ADMINISTRATOR_PERM)) return;
          let command = args[2];
          if (command.startsWith('"') && command.endsWith('"')) {
            command = command.replace(/"/g, '');
            console.log(command);
            registeredCommands.push(command);
          }
          break;
      }
    }
  } else if (registeredCommands.find(cmd => cmd === message.content) && message.member && message.member.voiceChannel) {
    logMessage(message);
    joinVCAndPlaySound(message.member.voiceChannel);
  }
});

bot.login(process.env.SEINFELDENTRANCEBOT_TOKEN);
