const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();
const { twitchApi } = require('../../config.json');

const modDB = new sqlite3.Database('database/twitch_mods.db');

module.exports = {
    name: 'shoutout',
    use: '<user>',
    description: '[MODS ONLY] Shoutout someone in chat',
    async execute(client, channel, tags, message, args) {
        const userId = tags['user-id'];

        const checkMod = () => new Promise((resolve, reject) => {
            modDB.get('SELECT * FROM mods WHERE user_id=?', [userId], (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        });

        try {
            const userInModDB = await checkMod();

            if (!userInModDB) {
                await client.say(channel, `${tags.username}, you are not authorized to use this command.`);
                return;
            }

            const targetUser = args[0].replace('@', '');

            const announcementMessage = `Shoutout to ${targetUser}! Be sure to follow them here: https://twitch.tv/${targetUser}`;
            const response = await axios.post(`https://api.twitch.tv/helix/chat/announcements`, {
                broadcaster_id: tags['room-id'],
                moderator_id: twitchApi.botId,
                message: announcementMessage,
                color: 'blue'
            }, {
                headers: {
                    'Client-ID': twitchApi.clientId,
                    'Authorization': `Bearer ${twitchApi.bearer_token}`,
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Error executing shoutout command:', error.response.data || error.message);
        }
    },
};