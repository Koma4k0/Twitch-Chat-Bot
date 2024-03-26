module.exports = {
    name: 'bed',
    use: '[user]',
    description: 'Check how long someone can last in bed',
    async execute(client, channel, tags, message, args) {
        const time = Math.floor(Math.random() * 59) + 1;
        const timeframes = ['seconds', 'minutes', 'minutes', 'minutes']; // Added minutes twice to increase the chances of getting minutes as a timeframe
        const timeframe = timeframes[Math.floor(Math.random() * timeframes.length)];
        const user = args[0] || tags.username;

        await client.say(channel, `${user} can last ${time} ${timeframe} in bed.`);
    },
};
