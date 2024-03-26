const axios = require('axios');

module.exports = {
    name: 'avatar',
    use: '[user]',
    description: 'Get a users avatar link',
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
            const avatarResponse = await axios.get(`https://decapi.me/twitch/avatar/${user}`);
            const avatar = avatarResponse.data;

            await client.say(channel, `${user}'s avatar: ${avatar}`);
        } catch (error) {
            console.error('Error fetching time:', error);
            await client.say(channel, 'An error occurred while fetching your avatar.');
        }
    },
};