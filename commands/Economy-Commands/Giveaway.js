const sqlite3 = require('sqlite3').verbose();
const pointsDB = new sqlite3.Database('database/points.db');
const giveawayDB = new sqlite3.Database('database/giveaway.db');
const modDB = new sqlite3.Database('database/twitch_mods.db');

module.exports = {
    name: 'giveaway',
    use: '<amount>',
    description: '[MODS ONLY] Start a giveaway for points.',
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

        const userInModDB = await checkMod();
        if (!userInModDB) {
            await client.say(channel, `${tags.username}, you are not authorized to start a giveaway for this channel.`);
            return;
        }

        let giveawayPoints = args[0];
        if (giveawayPoints.toLowerCase().includes('k')) {
            giveawayPoints = parseInt(giveawayPoints) * 1000;
        }
        if (!giveawayPoints || isNaN(giveawayPoints)) {
            await client.say(channel, `Please provide a valid amount for the giveaway.`);
            return;
        }

        giveawayDB.run('INSERT OR REPLACE INTO running (channel, giveaway) VALUES (?, ?)', ['#netflixandchilly_', 'true'], async (err) => {
            if (err) {
                console.error('Error setting giveaway status:', err);
                return;
            }

            let timeLeft = 60;
            await client.say(channel, `Giveaway started for ${giveawayPoints} points! Type 'join' in chat to enter the giveaway! 60 seconds left to enter.`)
            const countdownInterval = setInterval(async () => {
                if (timeLeft > 0) {
                    await client.say(channel, `${giveawayPoints} points are up for grabs. Type 'join' in chat to enter the giveaway. ${timeLeft} seconds left to enter.`);
                }

                timeLeft -= 15;

                if (timeLeft === 0) {
                    clearInterval(countdownInterval);
                    giveawayDB.all('SELECT * FROM users', async (err, rows) => {
                        if (err) {
                            console.error('Error selecting giveaway winner:', err);
                            return;
                        }
                        const winner = rows[Math.floor(Math.random() * rows.length)];

                        pointsDB.run('UPDATE points SET points = points + ? WHERE username = ?', [giveawayPoints, winner.username]);
                        await client.say(channel, `Congratulations ${winner.username}! You won ${giveawayPoints} points!`);
                        giveawayDB.run('DELETE FROM users');
                    });

                    giveawayDB.run('UPDATE running SET giveaway = ? WHERE channel = ?', ['false', '#netflixandchilly_']);
                }
            }, 15000);
        });
    },
};