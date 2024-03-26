module.exports = {
    name: 'cupsize',
    use: '[user]',
    description: 'Check someone\'s cup size',
    async execute(client, channel, tags, message, args) {
        const cupSizes = ['AA', 'A', 'B', 'C', 'D', 'DD', 'DDD'];
        const bandSizes = ['26', '28', '30', '32', '34', '36', '38', '40', '42', '44', '46', '48', '50', '52', '54', '56', '58', '60', '62', '64'];
        const cup = cupSizes[Math.floor(Math.random() * cupSizes.length)];
        const band = bandSizes[Math.floor(Math.random() * bandSizes.length)];
        const user = args[0] || tags.username;

        await client.say(channel, `${user}'s cupsize is ${band}${cup}`);
    },
};
