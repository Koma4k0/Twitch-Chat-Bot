const sqlite3 = require('sqlite3').verbose();
const kissDB = new sqlite3.Database('database/kiss_counts.db');

module.exports = {
    name: 'kiss',
    use: '<user>',
    description: 'Send a virtual kiss',
    async execute(client, channel, tags, message, args) {
        const kissedUser = args[0] || tags.username;

        kissDB.run(`
            INSERT INTO kiss_counts (user, kissed_user, count)
            VALUES (?, ?, 1)
            ON CONFLICT (user, kissed_user) DO UPDATE SET count = count + 1;
        `, [tags.username, kissedUser], (err) => {
            if (err) {
                console.error('Error updating kiss count:', err.message);
            } else {
                kissDB.get(`
                    SELECT SUM(count) AS total_kisses
                    FROM kiss_counts
                    WHERE kissed_user = ?
                `, [kissedUser], (err, row) => {
                    if (err) {
                        console.error('Error fetching total kisses to user:', err.message);
                    } else if (row) {
                        const totalKissesToUser = row.total_kisses || 0;
                        if (args && args.length > 0) {
                            client.say(channel, `${tags.username} kissed ${kissedUser} <3. ${kissedUser} has been kissed ${totalKissesToUser} times.`);
                        } else {
                            client.say(channel, `${tags.username} kissed themselves <3. ${tags.username} has been kissed ${totalKissesToUser} times.`)
                        }
                    }
                });
            }
        });
    },
};
