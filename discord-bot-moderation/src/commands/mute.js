const Discord = require('discord.js');

module.exports = {
    name: 'mute',
    description: 'Mute a user in the server',
    execute(message, args) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.reply('You do not have the permission to mute users.');
        }

        const target = message.mentions.users.first();
        if (target) {
            const targetMember = message.guild.members.cache.get(target.id);
            if (targetMember) {
                let mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');
                if (!mutedRole) {
                    mutedRole = message.guild.roles.create({
                        data: {
                            name: 'Muted',
                            permissions: []
                        }
                    });
                }

                targetMember.roles.add(mutedRole);
                message.channel.send(`<@${targetMember.user.id}> has been muted.`);
            } else {
                message.reply('That user is not in this server.');
            }
        } else {
            message.reply('Please specify a user to mute.');
        }
    }
};