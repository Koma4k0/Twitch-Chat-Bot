module.exports = {
    name: 'pregocheck',
    use: '[user]',
    description: 'Check how far along someone is prego',
    async execute(client, channel, tags, message, args) {
        const length = Math.floor(Math.random() * 11);
        const user = args[0] || tags.username;

        if (length === 1) {
            await client.say(channel, `${user} is 1 Month Pregnant`);
        } else {
            await client.say(channel, `${user} is ${length} Months Pregnant`)
        }
    },
};