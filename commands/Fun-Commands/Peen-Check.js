module.exports = {
    name: 'peencheck',
    use: '[user]',
    description: 'Check your peen size',
    async execute(client, channel, tags, message, args) {
        const sizes = [
        'is non existant',
        'size is 0.1 inches',
        'size is 0.5 inches',
        'size is 1 inches',
        'size is 2 inches',
        'size is 3 inches',
        'size is 4 inches',
        'size is 5 inches',
        'size is 6 inches',
        'size is 7 inches',
        'size is 8 inches',
        'size is 9 inches',
        'size is 10 inches',
        'size is 11 inches',
        'size is 12 inches',
        'size is 13 inches',
        'size is 14 inches',
        'size is 15 inches',
        'size is 16 inches',
        'size is 17 inches',
        'size is 18 inches',
        'size is 19 inches',
        'size is 20 inches'
        ];

        const size = sizes[Math.floor(Math.random() * sizes.length)];
        const user = args[0] || tags.username;

        await client.say(channel, `${user}'s dick ${size}`);
    },
};
