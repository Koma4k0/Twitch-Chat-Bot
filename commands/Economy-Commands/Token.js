const axios = require('axios');
const sqlite3 = require('sqlite3');
const pointsDB = new sqlite3.Database('database/points.db');
const { twitchApi } = require('../../config.json');

module.exports = {
    name: 'token',
    use: '<amount>',
    description: 'Token a user in chat with your points',
    async execute(client, channel, tags, message, args) {
        const user = tags.username.toLowerCase();
        const amount = parseInt(args[0]);
        const accessToken = await refreshAccessToken();

        if (isNaN(amount) || amount <= 0) {
            client.say(channel, `@${user}, please provide a valid amount as a number.`);
            return;
        }

        const getChatters = async () => {
            try {
                const response = await axios.get('https://api.twitch.tv/helix/chat/chatters', {
                    params: {
                        broadcaster_id: tags['room-id'],
                        moderator_id: twitchApi.botId
                    },
                    headers: {
                        'Client-ID': twitchApi.clientId,
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                const chatters = response.data.data;
                return chatters.map(chatter => chatter.user_name);
            } catch (error) {
                console.error('Error fetching chatters:', error.response.data || error.message);
                return [];
            }
        };

        const pickRandomUser = (users) => {
            return users[Math.floor(Math.random() * users.length)];
        };

        const updatePoints = (username, points) => {
            pointsDB.run('INSERT OR REPLACE INTO points (username, points) VALUES (?, ?)', [username, points], (err) => {
                if (err) {
                    console.error('Error updating points:', err);
                }
            });
        };

        pointsDB.get('SELECT points FROM points WHERE username = ?', [user], async (err, row) => {
            if (err) {
                console.error('Error getting points:', err);
                return;
            }
            const currentPoints = row ? parseInt(row.points) : 0;

            if (currentPoints < amount) {
                await client.say(channel, `@${user}, you don't have enough points to token.`);
                return;
            }

            try {
                const chatters = await getChatters();

                if (chatters.length === 0) {
                    client.say(channel, 'There are no other chatters to token.');
                    return;
                }

                const index = chatters.indexOf(user);
                if (index !== -1) {
                    chatters.splice(index, 1);
                }

                const randomUser = pickRandomUser(chatters);

                const isWin = Math.random() < 0.4;
                const result = isWin ? 'won' : 'lost';

                const newPoints = isWin ? currentPoints + amount : currentPoints - amount;
                updatePoints(user, newPoints);

                client.say(channel, `@${user} tokened ${randomUser} and ${result} ${amount} points. You now have ${newPoints} points.`);
            } catch (error) {
                console.error('Error executing token command:', error);
            }
        });
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