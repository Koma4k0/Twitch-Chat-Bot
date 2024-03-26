const axios = require('axios');

module.exports = {
    name: 'joke',
    description: 'Fetch a random joke',
    async execute(client, channel, tags, message, args) {
        const response =  await axios.get('https://some-random-api.com/others/joke')
        const joke = response.data.joke

        await client.say(channel, joke)
    },
};