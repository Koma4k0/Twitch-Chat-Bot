const sqlite3 = require('sqlite3').verbose();
const pointsDB = new sqlite3.Database('database/points.db');

module.exports = {
    name: 'pointsgive',
    use: '<user> <amount>',
    description: 'Give points to another user',
    async execute(client, channel, tags, message, args) {
        try {
            const targetUser = args[0].replace('@', '').toLowerCase();
            let pointsToGive = args[1];

            const senderPoints = await getUserPoints(tags.username);

            if (pointsToGive.toLowerCase() === 'all') {
                pointsToGive = senderPoints;
            } else if (pointsToGive.toLowerCase().includes('k')) {
                const multiplier = parseInt(pointsToGive)
                pointsToGive = multiplier * 1000
            } else {
                pointsToGive = parseInt(pointsToGive);
            }

            if (isNaN(pointsToGive) || (pointsToGive !== 'all' && pointsToGive <= 0)) {
                await client.say(channel, 'Usage: !pointsgive <user> <amount>');
                return;
            }

            if (senderPoints < pointsToGive && pointsToGive !== 'all') {
                await client.say(channel, `You don't have enough points to give ${pointsToGive} to ${targetUser}.`);
                return;
            }

            const targetPoints = await getUserPoints(targetUser);

            const newSenderPoints = pointsToGive === 'all' ? 0 : senderPoints - pointsToGive;
            const newTargetPoints = pointsToGive === 'all' ? targetPoints + senderPoints : targetPoints + pointsToGive;

            await updateUserPoints(tags.username, newSenderPoints);
            await updateUserPoints(targetUser, newTargetPoints);

            await client.say(channel, `Successfully gave ${pointsToGive === 'all' ? senderPoints : pointsToGive} points to ${targetUser}.`);
        } catch (error) {
            console.error('Error:', error);
        }
    },
};

// Function to fetch user's points from the database
function getUserPoints(username) {
    return new Promise((resolve, reject) => {
        pointsDB.get('SELECT points FROM points WHERE username = ?', [username], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row ? row.points : 0); // Return 0 if user not found
            }
        });
    });
}

// Function to update user's points in the database
function updateUserPoints(username, points) {
    return new Promise((resolve, reject) => {
        pointsDB.run('UPDATE points SET points = ? WHERE username = ?', [points, username], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
