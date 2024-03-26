module.exports = {
    name: 'rizz',
    use: '[user]',
    description: 'Check your rizz percentage',
    async execute(client, channel, tags, message, args) {
        const rizzAmount = Math.floor(Math.random() * 101);
        const user = args[0] || tags.username;

        await client.say(channel, `${user} has ${rizzAmount}% rizz`);
    },
};