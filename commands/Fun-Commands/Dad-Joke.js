const axios = require('axios');
const { APIS } = require('../../config.json')

module.exports = {
    name: 'dadjoke',
    description: 'Get a random dad joke',
    async execute(client, channel, tags, message, args) {
        const url = 'https://dad-jokes.p.rapidapi.com/random/joke';

        const headers = {
            'X-RapidAPI-Key': APIS.rapidApiKey,
            'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
        };

        try {
            const response = await axios.get(url, { headers });
            const joke = response.data.body[0];
            const setup = joke.setup;
            const punchline = joke.punchline;

            await client.say(channel, `${setup} ${punchline}`);
        } catch (error) {
            console.error('Error fetching dad joke:', error.message);
            await client.say(channel, 'Error fetching dad joke. Please try again later.');
        }
    },
};