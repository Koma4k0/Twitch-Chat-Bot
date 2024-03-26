const axios = require('axios');

module.exports = {
    name: 'accountage',
    use: '[user]',
    description: 'Get date your account was created along with age',
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
            const accCreateResponse = await axios.get(`https://decapi.me/twitch/creation/${user}`);
            const accResponse = await axios.get(`https://decapi.me/twitch/accountage/${user}`, {
                params: {
                    precision: 7
                }
            });

            const acc = accCreateResponse.data;
            const accCreate = acc.replace('-', 'at').replace('(UTC)', 'UTC');
            const accAge = accResponse.data;

            await client.say(channel, `${user}'s account was created on ${accCreate} and it has been ${accAge} since you created your account!`);
        } catch (error) {
            console.error('Error fetching time:', error);
            await client.say(channel, 'An error occurred while fetching your account age.');
        }
    },
};