module.exports = {
    name: 'benchpress',
    use: '[user]',
    description: 'Simulate the amount a user can benchpress',
    async execute(client, channel, tags, message, args) {
        const benchpressAmount = Math.floor(Math.random() * 500) + 1;
        const user = args[0] || tags.username;

        await client.say(channel, `${user} can benchpress ${benchpressAmount} lbs!`);
    },
};
