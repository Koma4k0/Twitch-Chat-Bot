const axios = require('axios');
const { twitchApi } = require('../../config.json');

module.exports = {
    name: 'viewcount',
    description: 'Fetches the viewercount',
    async execute(client, channel, tags, message, args) {
        const response = await axios.get(`https://decapi.me/twitch/viewercount/${twitchApi.channelName}`)
        let viewers = response.data;

        if (viewers === `${twitchApi.channelName} is offline`) {
            viewers = `${twitchApi.channelName} is currently offline!`
        } else {
            viewers = `Viewer Count: ${viewers}`
        }

        await client.say(channel, `${viewers}`)
    },
};