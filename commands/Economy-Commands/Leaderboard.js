const sqlite3 = require('sqlite3').verbose();
const pointsDB = new sqlite3.Database('database/points.db');
const { WEBSITE } = require('../../config.json');


module.exports = {
    name: 'leaderboard',
    description: 'Displays the top 3 users with the most points',
    async execute(client, channel, tags, message, args) {
        try {
            pointsDB.all('SELECT username, points FROM points WHERE points > 0 ORDER BY points DESC LIMIT 3', async (err, rows) => {
                if (err) {
                    console.error('Error fetching users with points:', err);
                    return;
                }

                if (!rows || rows.length === 0) {
                    await client.say(channel, 'No users found with points.');
                    return;
                }

                let leaderboardMessage = '🏆 Top 3 Users with the Most Points: ';
                rows.forEach((row, index) => {
                    let place = (index + 1) + '';
                    switch (place) {
                        case '1':
                            place += 'st';
                            break;
                        case '2':
                            place += 'nd';
                            break;
                        case '3':
                            place += 'rd';
                            break;
                        default:
                            place += 'th';
                            break;
                    }
                    leaderboardMessage += `${place}. ${row.username} `;
                });
                
                const website = `Checkout the full leaderboard here <3 ${WEBSITE.domain}/leaderboard`
                await client.say(channel, leaderboardMessage + '| ' + website);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    },
};
