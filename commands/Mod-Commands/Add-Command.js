const sqlite3 = require('sqlite3').verbose();
const commandDB = new sqlite3.Database('database/commands.db');
const modDB = new sqlite3.Database('database/twitch_mods.db');

module.exports = {
    name: 'comadd',
    use: '<name> <response>',
    description: '[MODS ONLY] Add a new command',
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
                await client.say(channel, `${tags.username}, you are not authorized to add commands for this channel.`);
                return;
            }

            const commandName = args[0];
            const commandOutput = args.slice(1).join(' ');

            commandDB.run('INSERT OR REPLACE INTO mods (command_name, command_output) VALUES (?, ?)', [commandName, commandOutput]);

            await client.say(channel, `Command ${commandName} added successfully!`);
        } catch (error) {
            console.error('Error querying database:', error);
        }
    },
};
