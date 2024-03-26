const { WEBSITE } = require('../../config.json');

module.exports = {
    name: 'commands',
    description: 'Get a list of commands',
    async execute(client, channel, tags, message, args) {
        try {
           const rawUrl = `${WEBSITE.domain}/commands`
           await client.say(channel, `${tags.username}, you can find a list of my commands here <3 ` + rawUrl)
        } catch (error) {
            console.error('Error:', error);
        }
    },
};
