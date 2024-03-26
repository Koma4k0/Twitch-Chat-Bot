const axios = require('axios');

module.exports = {
    name: 'hotness',
    use: '[user]',
    description: 'Check your hotness level',
    async execute(client, channel, tags, message, args) {
        const hotnessList = ['you are a 0.01', 'you are a 0.1', 'you are a 0.5', 'you are a 1', 'you are a 2', 'you are a 3', 'you are a 4', 'you are a 5', 'you are a 6', 'you are a 7', 'you are a 8', 'you are a 9', 'you are a 10', 'you broke my scale <3'];
        const hotness = hotnessList[Math.floor(Math.random() * hotnessList.length)];
        const user = args[0] || tags.username;

        await client.say(channel, `${user} on a scale of 1-10, ${hotness}`);
    },
};
