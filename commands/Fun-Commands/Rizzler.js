const axios = require('axios');

module.exports = {
    name: 'rizzler',
    use: '<user>',
    description: 'Get a random pickup line',
    async execute(client, channel, tags, message, args) {
        const user = args[0] || tags.username;
        const url = 'https://vinuxd.vercel.app/api/pickup';

        try {
            const response = await axios.get(url);
            const pickup = response.data;
            const rizz = pickup.pickup;

            await client.say(channel, `${user}, ${rizz}`);
        } catch (error) {
            console.error('Error fetching pickup line:', error.message);
            console.error('API Response:', error.response ? error.response.data : 'No response data');
            await client.say(channel, 'Error fetching pickup line. Please try again later.');
        }
    },
};