const sqlite3 = require('sqlite3').verbose();
const pointsDB = new sqlite3.Database('database/points.db');

module.exports = {
    name: 'points',
    use: '[user]',
    description: 'Fetch your points or another user\'s points',
    async execute(client, channel, tags, message, args) {
        let targetUser = args.length > 0 ? args[0].replace('@', '') : tags.username;
        targetUser = targetUser.toLowerCase()

        pointsDB.all('SELECT username, points FROM points WHERE points > 0', async (err, rows) => {
            if (err) {
                console.error('Error fetching users with points:', err);
                return;
            }

            if (!rows || rows.length === 0) {
                await client.say(channel, 'No users found with points.');
                return;
            }

            const usersArray = rows.map(row => ({ username: row.username, points: row.points }));

            usersArray.sort((a, b) => b.points - a.points);

            const targetUserIndex = usersArray.findIndex(user => user.username === targetUser);
            const rank = targetUserIndex + 1;

            if (rank === 0) {
                await client.say(channel, `${targetUser} has no points.`);
                return;
            }

            const points = usersArray[targetUserIndex].points;
            const totalUsers = usersArray.length;
            const rankString = `${rank}/${totalUsers}`;
            
            await client.say(channel, `${targetUser} has ${points} points and is currently ranked ${rankString} on the leaderboard.`);
        });
    },
};