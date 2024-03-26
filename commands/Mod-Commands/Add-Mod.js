const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();
const modDB = new sqlite3.Database('database/twitch_mods.db');
const { twitchApi, APIS } = require('../../config.json');


module.exports = {
    name: 'addmod',
    use: '<user>',
    description: '[BOT OWNER ONLY] Mod command to add a user as a moderator',
    async execute(client, channel, tags, message, args) {
        const isOwner = await this.checkIfOwner(tags);

        if (!isOwner) {
            await client.say(channel, 'Sorry, only the owner of the bot can use this command.');
            return;
        }

        const mentionedUsername = args[0];

        if (!mentionedUsername) {
            client.say(channel, 'Please mention the user you want to add as a moderator.');
            return;
        }

        const cleanMentionedUsername = mentionedUsername.replace('@', '');
        const mentionedUserId = await this.getUserID(cleanMentionedUsername);

        if (!mentionedUserId) {
            client.say(channel, 'Error fetching Twitch User ID for the mentioned user. Please try again later.');
            return;
        }

        const isModExist = await this.checkIfModExists(mentionedUserId);

        if (isModExist) {
            client.say(channel, `${cleanMentionedUsername} is already a moderator.`);
            return;
        }

        modDB.run('INSERT OR IGNORE INTO mods (user_id, user_name) VALUES (?, ?)',
            [mentionedUserId, cleanMentionedUsername]);

        await client.say(channel, `Successfully added ${cleanMentionedUsername} as a moderator.`);
    },

    async checkIfOwner(tags) {
        const userId = tags && tags['user-id'];
        return userId === twitchApi.botOwnerId;
    },

    async getUserID(cleanMentionedUsername) {
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
            return response.data && response.data.user.id;
        } catch (error) {
            console.error('Error fetching Twitch User ID:', error.message);
            return null;
        }
    },

    async checkIfModExists(userId) {
        return new Promise(resolve => {
            modDB.get('SELECT * FROM mods WHERE user_id=?', [userId], (err, row) => {
                resolve(row !== undefined);
            });
        });
    },
};