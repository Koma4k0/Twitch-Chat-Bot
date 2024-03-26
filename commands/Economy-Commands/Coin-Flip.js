const sqlite3 = require('sqlite3');
const pointsDB = new sqlite3.Database('database/points.db');

module.exports = {
    name: 'coinflip',
    use: '<amount> <heads/tails>',
    description: 'Do a coin flip to possibly get some free points',
    async execute(client, channel, tags, message, args) {
        const user = tags.username.toLowerCase();
        const amount = parseInt(args[0]);
        const choice = args[1];

        if (isNaN(amount) || amount <= 0) {
            client.say(channel, `@${user}, please enter a valid positive number as the amount.`);
            return;
        }

        pointsDB.get('SELECT points FROM points WHERE username = ?', [user], (err, row) => {
            if (err) {
                console.error('Error getting points:', err);
                return;
            }

            const currentPoints = row ? parseInt(row.points) : 0;

            if (currentPoints < amount) {
                client.say(channel, `@${user}, you don't have enough points for this coin flip.`);
                return;
            }

            if (choice !== 'heads' && choice !== 'tails') {
                client.say(channel, `@${user}, please choose either 'heads' or 'tails'.`);
                return;
            }

            const outcomes = ['heads', 'tails'];
            const result = outcomes[Math.floor(Math.random() * outcomes.length)];

            if (result === choice) {
                const wonPoints = currentPoints + amount;
                updatePoints(user, wonPoints);
                client.say(channel, `@${user} flipped ${result} and won ${amount} points. You now have ${wonPoints} points.`);
            } else {
                const lostPoints = currentPoints - amount;
                updatePoints(user, lostPoints);
                client.say(channel, `@${user} flipped ${result} and lost all ${amount} points.`);
            }
        });
    },
};

function updatePoints(username, points) {
    pointsDB.run('INSERT OR REPLACE INTO points (username, points) VALUES (?, ?)', [username, points], (err) => {
        if (err) {
            console.error('Error updating points:', err);
        }
    });
}
