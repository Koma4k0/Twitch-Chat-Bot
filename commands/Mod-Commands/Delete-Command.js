const sqlite3 = require('sqlite3').verbose();
const commandDB = new sqlite3.Database('database/commands.db');
const modDB = new sqlite3.Database('database/twitch_mods.db');

module.exports = {
    name: 'comdel',
    use: '<name>',
    description: '[MODS ONLY] Delete an existing command',
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
                await client.say(channel, `${tags.username}, you are not authorized to delete commands for this channel.`);
                return;
            }

            const commandName = args[0];

            const checkCommand = () => new Promise((resolve, reject) => {
                commandDB.get('SELECT * FROM mods WHERE command_name=?', [commandName], (err, command) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(command);
                    }
                });
            });

            const existingCommand = await checkCommand();

            if (existingCommand) {
                commandDB.run('DELETE FROM mods WHERE command_name=?', [commandName]);
                await client.say(channel, `Command ${commandName} deleted successfully!`);
            } else {
                await client.say(channel, `Command ${commandName} does not exist.`);
            }
        } catch (error) {
            console.error('Error querying database:', error);
        }
    },
};