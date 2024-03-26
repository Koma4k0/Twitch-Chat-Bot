const sqlite3 = require('sqlite3')

const commandDB = new sqlite3.Database('database/commands.db');
commandDB.run(`
    CREATE TABLE IF NOT EXISTS mods (
        command_name TEXT PRIMARY KEY,
        command_output TEXT
    )
`);

const pointsDB = new sqlite3.Database('database/points.db');
pointsDB.run(`
    CREATE TABLE IF NOT EXISTS points (
        username TEXT PRIMARY KEY,
        points TEXT
    )
`)

const giveawayDB = new sqlite3.Database('database/giveaway.db');
giveawayDB.run(`
    CREATE TABLE IF NOT EXISTS users (
        username TEXT PRIMARY KEY
    )
`)
giveawayDB.run(`
    CREATE TABLE IF NOT EXISTS running (
        channel TEXT PRIMARY KEY,
        giveaway TEXT
    )
`)

const modDB = new sqlite3.Database('database/twitch_mods.db');
modDB.run(`
    CREATE TABLE IF NOT EXISTS mods (
        user_id TEXT PRIMARY KEY,
        user_name TEXT
    )
`);

const hugDB = new sqlite3.Database('database/hug_counts.db');
hugDB.run(`
    CREATE TABLE IF NOT EXISTS hug_counts (
        user TEXT,
        hugged_user TEXT,
        count INTEGER DEFAULT 0,
        PRIMARY KEY (user, hugged_user)
    );
`);

const kissDB = new sqlite3.Database('database/kiss_counts.db');
kissDB.run(`
    CREATE TABLE IF NOT EXISTS kiss_counts (
        user TEXT,
        kissed_user TEXT,
        count INTEGER DEFAULT 0,
        PRIMARY KEY (user, kissed_user)
    );
`);