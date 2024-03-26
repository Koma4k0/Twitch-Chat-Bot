module.exports = {
    name: 'suscheck',
    use: '[user]',
    description: 'Check yours or someone elses sus amount',
    execute(client, channel, tags, message, args) {
        const susAmount = Math.floor(Math.random() * 100) + 1;
        const user = args[0] || tags.username;

        client.say(channel, `${user} is ${susAmount}% SUS 🌈`);
    },
};