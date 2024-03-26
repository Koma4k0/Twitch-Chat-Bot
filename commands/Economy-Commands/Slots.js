const sqlite3 = require('sqlite3');
const pointsDB = new sqlite3.Database('database/points.db');

module.exports = {
    name: 'slots',
    use: '<amount>',
    description: 'Play slots to win points!',
    async execute(client, channel, tags, message, args) {
        const user = tags.username.toLowerCase();
        const amount = parseInt(args[0]);

        if (isNaN(amount) || amount <= 0) {
            client.say(channel, `@${user}, please provide a valid amount as a number.`);
            return;
        }

        const emojis = ['🍒', '🍋', '🍇', '🍉', '🍓', '🍍'];

        const generateSlot = () => {
            return emojis[Math.floor(Math.random() * emojis.length)];
        };

        pointsDB.get('SELECT points FROM points WHERE username = ?', [user], async (err, row) => {
            if (err) {
                console.error('Error getting points:', err);
                return;
            }
            const currentPoints = row ? parseInt(row.points) : 0;

            if (currentPoints < amount) {
                await client.say(channel, `@${user}, you don't have enough points to play slots.`);
                return;
            }

            try {
                const slot1 = generateSlot();
                const slot2 = generateSlot();
                const slot3 = generateSlot();

                const isWin = slot1 === slot2 || slot2 === slot3 || slot1 === slot3;

                const newPoints = isWin ? currentPoints + amount : currentPoints - amount;
                pointsDB.run('INSERT OR REPLACE INTO points (username, points) VALUES (?, ?)', [user, newPoints], (err) => {
                    if (err) {
                        console.error('Error updating points:', err);
                        return;
                    }

                    const resultMessage = isWin ? `Congratulations, @${user}! You won ${amount} points! 🎉 Slots: ${slot1} ${slot2} ${slot3}` : `Sorry, @${user}. You lost ${amount} points. Better luck next time! 💸 Slots: ${slot1} ${slot2} ${slot3}`;
                    client.say(channel, resultMessage);
                });
            } catch (error) {
                console.error('Error executing slots command:', error);
            }
        });
    },
};
