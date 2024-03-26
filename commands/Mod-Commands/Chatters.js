const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();
const modDB = new sqlite3.Database('database/twitch_mods.db');
const { twitchApi } = require('../../config.json');

module.exports = {
    name: 'chatters',
    description: '[MODS ONLY] Get information about chatters in the chat',
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

            const accessToken = await refreshAccessToken();

            const response = await axios.get('https://api.twitch.tv/helix/chat/chatters', {
                params: {
                    broadcaster_id: tags['room-id'],
                    moderator_id: '981786774'
                },
                headers: {
                    'Client-ID': twitchApi.clientId,
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            const chatters = response.data.data;
            const usernames = chatters.map(chatter => chatter.user_name).join(', ');

            const message = `Chatters: ${usernames} | Total chatters: ${chatters.length}`;
            await client.say(channel, message);
        } catch (error) {
            console.error('Error retrieving chatters information:', error.response.data || error.message);
        }
    },
};

async function refreshAccessToken() {
    try {
        const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
            params: {
                client_id: twitchApi.clientId,
                client_secret: twitchApi.clientSecret,
                grant_type: 'refresh_token',
                refresh_token: twitchApi.bearer_refresh_token
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error refreshing access token:', error.response.data || error.message);
        throw error;
    }
}
