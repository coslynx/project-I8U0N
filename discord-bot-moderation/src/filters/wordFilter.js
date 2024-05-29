const wordFilter = {
  filterWords: ["badword1", "badword2", "badword3"],

  checkMessage: function(message) {
    let words = message.content.toLowerCase().split(" ");
    for (let word of words) {
      if (this.filterWords.includes(word)) {
        message.delete();
        message.channel.send(`@${message.author.username}, Please refrain from using inappropriate language.`);
        return;
      }
    }
  }
};

module.exports = wordFilter;