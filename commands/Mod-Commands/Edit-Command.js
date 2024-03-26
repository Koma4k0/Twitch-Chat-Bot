const sqlite3 = require('sqlite3').verbose();
const commandDB = new sqlite3.Database('database/commands.db');
const modDB = new sqlite3.Database('database/twitch_mods.db');

module.exports = {
    name: 'comedit',
    use: '<name> <response>',
    description: '[MODS ONLY] Edit an existing command',
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
                await client.say(channel, `${tags.username}, you are not authorized to edit commands for this channel.`);
                return;
            }

            const commandName = args[0];
            const commandOutput = args.slice(1).join(' ');

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
                commandDB.run('UPDATE mods SET command_output=? WHERE command_name=?', [commandOutput, commandName]);
                await client.say(channel, `Command ${commandName} edited successfully!`);
            } else {
                await client.say(channel, `Command ${commandName} does not exist in the database. Use !comadd to add a new command.`);
            }
        } catch (error) {
            console.error('Error querying database:', error);
        }
    },
};