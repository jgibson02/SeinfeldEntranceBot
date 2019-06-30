const Discord = require('discord.js');

const bot = new Discord.Client();

bot.on('voiceStateUpdate', (oldMember, newMember) => {
  const newUserChannel = newMember.voiceChannel;
  const oldUserChannel = oldMember.voiceChannel;

  if (oldUserChannel === undefined && newUserChannel !== undefined && newMember.user.username === 'jgibson02') {
    // User Joins a voice channel
    newUserChannel.send('Buenos dias muchachalatas');
  }
});

bot.login(process.env.TOKEN);

require('http').createServer().listen(3000);
