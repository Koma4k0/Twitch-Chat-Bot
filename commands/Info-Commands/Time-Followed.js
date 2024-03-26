const axios = require('axios');
const { APIS, twitchApi } = require('../../config.json');

module.exports = {
    name: 'followed',
    use: '[user]',
    description: 'Get date followed and followage',
    async execute(client, channel, tags, message, args) {
        let user;
        if (args && args.length > 0) {
            user = args[0];
            if (user.startsWith('@')) {
                user = user.substring(1);
            }
        } else {
            user = tags && tags.username ? tags.username : 'Someone';
        }

        try {
            const followedResponse = await axios.get(`https://decapi.me/twitch/followed/${twitchApi.channelName}/${user}`, {
                params: {
                    token: APIS.decapiMeKey,
                    tz: 'America/Chicago'
                }
            });

            const followageResponse = await axios.get(`https://decapi.me/twitch/followage/${twitchApi.channelName}/${user}`, {
                params: {
                    token: APIS.decapiMeKey,
                    precision: 7
                }
            });

            const followed = followedResponse.data;
            const followedTime = followed.replace('-', 'at').replace('(America/Chicago)', 'CST');
            const followageTime = followageResponse.data;

            await client.say(channel, `${user} you have been following Chilly since ${followedTime} and it has been ${followageTime} since you followed!`);
        } catch (error) {
            console.error('Error fetching time:', error);
            await client.say(channel, 'An error occurred while fetching your follow time and followage.');
        }
    },
};