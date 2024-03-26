const axios = require('axios');
const { APIS } = require('../../config.json');

module.exports = {
    name: 'userid',
    use: '<user>',
    description: 'Mod command to get Twitch user ID of mentioned user',
    async execute(client, channel, tags, message, args) {
        const mentionedUsername = args[0];

        if (!mentionedUsername) {
            client.say(channel, 'Please mention a user.');
            return;
        }

        const cleanMentionedUsername = mentionedUsername.replace('@', '');

        const apiOptions = {
            method: 'GET',
            url: 'https://twitch-api8.p.rapidapi.com/get_user_id',
            params: {
                channel: cleanMentionedUsername
            },
            headers: {
                'X-RapidAPI-Key': APIS.rapidApiKey,
                'X-RapidAPI-Host': 'twitch-api8.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(apiOptions);

            if (response) {
                const twitchUserId = response.user.id;
                await client.say(channel, `Twitch User ID of ${cleanMentionedUsername}: ${twitchUserId}`);
            } else {
                await client.say(channel, 'Twitch User ID not found for the mentioned user.');
            }
        } catch (error) {
            console.error('Error fetching Twitch User ID:', error.message);
            await client.say(channel, 'Error fetching Twitch User ID. Please try again later.');
        }
    },
};



