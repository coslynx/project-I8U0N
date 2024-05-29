const Discord = require('discord.js');

class VotingSystem {
    constructor(client) {
        this.client = client;
        this.votes = new Map();
    }

    startVote(voteMessage, options) {
        const voteEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Vote')
            .setDescription(voteMessage)
            .addField('Options', options.join('\n'));

        const voteChannel = this.client.channels.cache.find(channel => channel.name === 'voting');

        if (!voteChannel) {
            console.log('Voting channel not found');
            return;
        }

        voteChannel.send(voteEmbed)
            .then(message => {
                options.forEach((option, index) => {
                    message.react(`${index + 1}️⃣`);
                });

                this.votes.set(message.id, { options, votes: new Array(options.length).fill(0) });
            })
            .catch(error => {
                console.error('Error starting vote:', error);
            });
    }

    registerVote(reaction, user) {
        const message = reaction.message;
        const vote = this.votes.get(message.id);

        if (!vote) {
            console.log('Vote not found');
            return;
        }

        const optionIndex = reaction.emoji.name.charCodeAt(0) - 49; // Convert emoji to option index
        if (optionIndex >= 0 && optionIndex < vote.options.length) {
            vote.votes[optionIndex]++;
        } else {
            console.log('Invalid vote option');
            return;
        }

        this.votes.set(message.id, vote);
    }

    endVote(messageID) {
        const vote = this.votes.get(messageID);

        if (!vote) {
            console.log('Vote not found');
            return;
        }

        const winningIndex = vote.votes.indexOf(Math.max(...vote.votes));
        const winningOption = vote.options[winningIndex];

        const resultEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Vote Result')
            .setDescription(`Winner: ${winningOption}`)
            .addField('Results', vote.options.map((option, index) => `${option}: ${vote.votes[index]} votes`).join('\n'));

        const voteChannel = this.client.channels.cache.find(channel => channel.name === 'voting');

        if (!voteChannel) {
            console.log('Voting channel not found');
            return;
        }

        voteChannel.send(resultEmbed);

        this.votes.delete(messageID);
    }
}

module.exports = VotingSystem;