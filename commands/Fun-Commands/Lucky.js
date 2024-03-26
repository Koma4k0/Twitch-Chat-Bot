module.exports = {
    name: 'lucky',
    use: '[user]',
    description: 'Check how much luck you have',
    async execute(client, channel, tags, message, args) {
        const luck = Math.floor(Math.random() * 101);
        const user = args[0] || tags.username;

        await client.say(channel, `${user} has a ${luck}% chance of getting lucky tonight`);
    },
};