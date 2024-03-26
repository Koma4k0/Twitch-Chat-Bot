const tmi = require('tmi.js');
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const colors = require('colors');
const axios = require('axios');
const config = require('./config.json');
const getAllCommandsInfo = require('./web/getCommandInfo');

const commandDB = new sqlite3.Database('database/commands.db');
const pointsDB = new sqlite3.Database('database/points.db');
const giveawayDB = new sqlite3.Database('database/giveaway.db');

const client = new tmi.Client({
    options: { debug: true },
    connection: { reconnect: true },
    identity: {
        username: config.twitchApi.botNickname,
        password: config.twitchApi.oauthToken,
    },
    channels: [config.twitchApi.channelName],
});

client.commands = new Map();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    console.log(`Loaded Command: ${command.name}`);
    client.commands.set(command.name, command);
}

const economyCommandFiles = fs.readdirSync('./commands/Economy-Commands').filter(file => file.endsWith('.js'));
for (const file of economyCommandFiles) {
    const economyCommand = require(`./commands/Economy-Commands/${file}`);
    console.log(`Economy Command Loaded: ${economyCommand.name}`.bold.brightMagenta);
    client.commands.set(economyCommand.name, economyCommand);
}

const funCommandFiles = fs.readdirSync('./commands/Fun-Commands').filter(file => file.endsWith('.js'));
for (const file of funCommandFiles) {
    const funCommand = require(`./commands/Fun-Commands/${file}`);
    console.log(`Fun Command Loaded: ${funCommand.name}`.bold.brightYellow);
    client.commands.set(funCommand.name, funCommand);
}

const infoCommandFiles = fs.readdirSync('./commands/Info-Commands').filter(file => file.endsWith('.js'));
for (const file of infoCommandFiles) {
    const infoCommand = require(`./commands/Info-Commands/${file}`);
    console.log(`Info Command Loaded: ${infoCommand.name}`.bold.brightGreen);
    client.commands.set(infoCommand.name, infoCommand);
}

const modCommandFiles = fs.readdirSync('./commands/Mod-Commands').filter(file => file.endsWith('.js'));
for (const file of modCommandFiles) {
    const modCommand = require(`./commands/Mod-Commands/${file}`);
    console.log(`Mod Command Loaded: ${modCommand.name}`.bold.brightRed);
    client.commands.set(modCommand.name, modCommand);
}

client.on('message', (channel, tags, message, self) => {
    if (self) return;

    if (message.toLowerCase() === 'join') {
        giveawayDB.get('SELECT giveaway FROM running WHERE channel = ?', [`#${config.twitchApi.channelName}`], (err, row) => {
            if (err) {
                console.error('Error:', err.message);
                return;
            }

            if (row && row.giveaway === 'true') {
                giveawayDB.run('INSERT OR IGNORE INTO users (username) VALUES (?)', [tags.username.toLowerCase()], (err) => {
                    if (err) {
                        console.error('Error adding user to the users table:', err.message);
                    } else {
                        console.log(`${tags.username.toLowerCase()} joined the giveaway.`);
                    }
                });
            } else {
                console.log('No giveaway is currently running.');
            }
        });
    }

    const args = message.slice(1).split(' ');
    const commandName = args.shift().toLowerCase();
    const fullCommandName = message;
    const tu_commandName = `!${commandName}`;
    const elseCommandName_before = message.split(' ');
    const elseCommandName_after = elseCommandName_before[0]

    const command = client.commands.get(commandName);

    if (command) {
        command.execute(client, channel, tags, message, args);
    } else {
        // Check if the command exists in the database (with and without the prefix)
        commandDB.get('SELECT command_output FROM mods WHERE command_name=? OR command_name=? OR command_name=? OR command_name=?', [fullCommandName, commandName, tu_commandName, elseCommandName_after], (err, row) => {
            if (err) {
                console.error('Error querying database:', err);
                return;
            }

            if (row) {
                let commandOutput = row.command_output;

                commandOutput = commandOutput.replace(/\${user}/g, tags.username);

                if (args && args.length > 0) {
                    commandOutput = commandOutput.replace(/\${touser}/g, args[0]);
                } else {
                    commandOutput = commandOutput.replace(/\${touser}/g, tags && tags.username ? tags.username : 'Someone');
                }

                client.say(channel, `${commandOutput}`);
            } else {
                return;
            }
        });
    }
});

client.on('cheer', (channel, userstate, message) => {
    console.log(`${userstate.username} cheered ${userstate.bits} bits in ${channel}`);

    const pointsToAdd = Math.floor(userstate.bits / 100) * config.ECONOMY.cheerPoints;

    addPoints(userstate.username, pointsToAdd)
        .then(() => {
            client.say(channel, `${userstate.username}, thank you for the ${userstate.bits} bits <3`);
        })
        .catch(err => {
            console.error('Error adding points:', err);
        });
});

client.on('subscription', (channel, username, method, message, userstate) => {
    console.log(`${username} subscribed to ${channel} using ${method}`);

    const pointsToAdd = config.ECONOMY.subPoints;

    addPoints(username, pointsToAdd)
        .then(() => {
            client.say(channel, `${username} just subscribed! Thank you for all the support <3`);
        })
        .catch(err => {
            console.error('Error adding points:', err);
        });
});

client.on('subgift', (channel, username, streakMonths, recipient, methods, userstate) => {
    console.log(`${username} gifted a subscription to ${recipient} in ${channel}`);

    const pointsToAdd = config.ECONOMY.giftSubPoints;

    addPoints(username, pointsToAdd)
        .then(() => {
            client.say(channel, `${username} gifted a subscription to ${recipient}!`);
        })
        .catch(err => {
            console.error('Error adding points:', err);
        });
});

client.on('resub', (channel, username, months, message, userstate, methods) => {
    console.log(`${username} resubscribed for ${months} months in ${channel}`);

    const pointsToAdd = config.ECONOMY.resubPoints;

    addPoints(username, pointsToAdd)
        .then(() => {
            client.say(channel, `${username} just resubscribed for ${months} months! Thank you for all the support <3`);
        })
        .catch(err => {
            console.error('Error adding points:', err);
        });
});

client.on('raided', (channel, username, viewers) => {

    const pointsToAdd = config.ECONOMY.raidPoints;

    addPoints(username, pointsToAdd)
        .then(() => {
            client.say(channel, `${username}, thank you for the raid of ${viewers} <3`);
            client.say(channel, `!so @${username}`);
        })
        .catch(err => {
            console.error('Error adding points:', err);
        });
});

client.on('join', (channel, username, self) => {
    if (self) {
        console.log(`Joined channel: ${channel}`);
        return;
    }

    function addPointsToUser(username) {
        axios.get(`https://decapi.me/twitch/uptime/${config.twitchApi.channelName}`)
            .then(response => {
                const uptime = response.data;
                if (uptime === `${config.twitchApi.channelName} is offline`) {
                    return;
                }

                pointsDB.get('SELECT points FROM points WHERE username = ?', [username], (err, row) => {
                    if (err) {
                        console.error('Error getting points:', err);
                        return;
                    }
                    let currentPoints = row ? parseInt(row.points) : 0;
                    currentPoints += 50;
                    pointsDB.run('INSERT OR REPLACE INTO points (username, points) VALUES (?, ?)', [username, currentPoints], (err) => {
                        if (err) {
                            console.error('Error adding points:', err);
                        } else {
                            console.log(`Added 50 points to ${username}`.bold.brightYellow);
                        }
                    });
                });
            })
            .catch(error => {
                console.error('Error checking user status:', error);
            });
    }
    addPointsToUser(username);
    const interval = setInterval(() => {
        addPointsToUser(username);
    }, 5 * 60 * 1000); // 5 minutes

    client.on('part', (partChannel, partUsername) => {
        if (channel === partChannel && username === partUsername) {
            clearInterval(interval);
        }
    });
});

function addPoints(username, points) {
    return new Promise((resolve, reject) => {
        pointsDB.run('INSERT OR REPLACE INTO points (username, points) VALUES (?, COALESCE((SELECT points FROM points WHERE username = ?), 0) + ?)', [username, username, points], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'web'));

app.use(express.static(path.join(__dirname, 'web')));

app.get('/commands', async (req, res) => {
    try {
        const commands = await getAllCommandsFromDB();
        commands.sort((a, b) => a.command_name.localeCompare(b.command_name));
        const commandInfo = getAllCommandsInfo();
        commandInfo.sort((a, b) => a.name.localeCompare(b.name));

        res.render('commands', { commands, commandInfo });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

function getAllCommandsFromDB() {
    return new Promise((resolve, reject) => {
        commandDB.all('SELECT command_name, command_output FROM mods', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

app.get('/leaderboard', async (req, res) => {
    try {
        const users = await getPointsDB();

        res.render('leaderboard', { users });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

function getPointsDB() {
    return new Promise((resolve, reject) => {
        pointsDB.all('SELECT username, points FROM points ORDER BY points DESC', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

app.listen(config.WEBSITE.port, () => {
    console.log(`Server is running on port ${config.WEBSITE.port}`);
});

client.connect();