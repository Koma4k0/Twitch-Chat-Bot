const axios = require('axios');

module.exports = {
    name: 'affirmation',
    description: 'Fetch a random affirmation',
    async execute(client, channel, tags, message, args) {
        const response =  await axios.get('https://www.affirmations.dev')
        const affirmation = response.data.affirmation

        await client.say(channel, affirmation)
    },
};