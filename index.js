const Discord = require('discord.js');

const bot = new Discord.Client();

bot.on('voiceStateUpdate', (oldMember, newMember) => {
  const newUserChannel = newMember.voiceChannel;
  const oldUserChannel = oldMember.voiceChannel;

  if (oldUserChannel === undefined && newUserChannel !== undefined && newMember.user.username === 'jgibson02') {
    // User Joins a voice channel
    newUserChannel.join().then((connection) => {
      // Yay, it worked!
      console.log('Successfully connected.');
    }).catch((e) => {
      // Oh no, it errored! Let's log it to console :)
      console.error(e);
    });
  }
});

bot.login(process.env.SEINFELDENTRANCEBOT_TOKEN);
