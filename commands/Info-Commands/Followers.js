const axios = require('axios');
const { twitchApi } = require('../../config.json');

module.exports = {
    name: 'followers',
    description: `Get the Twitch follower count of ${twitchApi.channelName}`,
    async execute(client, channel, tags, message, args) {
        try {
            const response = await axios.get(`https://decapi.me/twitch/followcount/${twitchApi.channelName}`);
            const followerCount = response.data;

            await client.say(channel, `Netflixandchilly currently has ${followerCount} followers! Thank you all for the support <3`);
        } catch (error) {
            console.error('Error fetching Twitch follower count:', error.message);
            await client.say(channel, 'Error fetching Twitch follower count. Please try again later.');
        }
    },
};