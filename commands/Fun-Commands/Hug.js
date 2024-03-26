const sqlite3 = require('sqlite3').verbose();
const hugDB = new sqlite3.Database('database/hug_counts.db');

module.exports = {
    name: 'hug',
    use: '<user>',
    description: 'Send a virtual hug',
    async execute(client, channel, tags, message, args) {
        const huggedUser = args[0] || tags.username;

        hugDB.run(`
            INSERT INTO hug_counts (user, hugged_user, count)
            VALUES (?, ?, 1)
            ON CONFLICT (user, hugged_user) DO UPDATE SET count = count + 1;
        `, [tags.username, huggedUser], (err) => {
            if (err) {
                console.error('Error updating hug count:', err.message);
            } else {
                hugDB.get(`
                    SELECT SUM(count) AS total_hugs
                    FROM hug_counts
                    WHERE hugged_user = ?
                `, [huggedUser], (err, row) => {
                    if (err) {
                        console.error('Error fetching total hugs to user:', err.message);
                    } else if (row) {
                        const totalHugsToUser = row.total_hugs || 0;
                        if (args && args.length > 0) {
                            client.say(channel, `${tags.username} hugged ${huggedUser} <3. ${huggedUser} has been hugged ${totalHugsToUser} times.`);
                        } else {
                            client.say(channel, `${tags.username} hugged themselves <3. ${tags.username} has been hugged ${totalHugsToUser} times.`)
                        } 
                    }
                });
            }
        });
    },
};