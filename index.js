const Discord = require('discord.js');

const bot = new Discord.Client();

bot.on('voiceStateUpdate', (oldMember, newMember) => {
  const newUserChannel = newMember.voiceChannel;
  const oldUserChannel = oldMember.voiceChannel;

  if (oldUserChannel === undefined && newUserChannel !== undefined && newMember.user.username === process.env.DISCORD_USERNAME) {
    // User Joins a voice channel
    newUserChannel.join().then((connection) => {
      // Yay, it worked!
      console.log('Successfully connected.');
      const dispatcher = connection.playFile('./seinfeld.mp3');
      dispatcher.on("end", end => {
          newUserChannel.leave();
      });
    }).catch((e) => {
      // Oh no, it errored! Let's log it to console :)
      console.error(e);
    });
  }
});

bot.login(process.env.SEINFELDENTRANCEBOT_TOKEN);
