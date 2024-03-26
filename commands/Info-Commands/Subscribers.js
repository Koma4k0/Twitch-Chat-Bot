const axios = require('axios');
const { twitchApi } = require('../../config.json');

module.exports = {
    name: 'subscribers',
    description: 'Get total subscribers for a Twitch channel',
    async execute(client, channel) {
        try {
            const response = await axios.get(`https://decapi.me/twitch/subcount/${twitchApi.channelName}`);
            const subsCount = response.data;

            await client.say(channel, `Total subscribers: ${subsCount}`);
        } catch (error) {
            console.error('Error fetching Twitch subscribers count:', error.message);
            await client.say(channel, 'Error fetching Twitch subscribers count. Please try again later.');
        }
    },
};