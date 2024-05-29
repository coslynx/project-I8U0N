const schedule = require('node-schedule');
const Discord = require('discord.js');

const client = new Discord.Client();

client.login('your-bot-token');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const postScheduledMessage = (channelId, messageContent, scheduleTime) => {
  const channel = client.channels.cache.get(channelId);
  
  const job = schedule.scheduleJob(scheduleTime, () => {
    channel.send(messageContent);
  });
};

module.exports = { postScheduledMessage };