module.exports = {
    name: 'weightcheck',
    use: '[user]',
    description: 'Check yours or someone elses weight',
    async execute(client, channel, tags, message, args) {
        const weightAmount = Math.floor(Math.random() * 500) + 1;
        const user = args[0] || tags.username;

        await client.say(channel, `${user} is ${weightAmount}lbs!`);
    },
};