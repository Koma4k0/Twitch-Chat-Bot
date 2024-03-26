module.exports = {
    name: 'balls',
    use: '[user]',
    description: 'Go balls deep in someone',
    async execute(client, channel, tags, message, args) {
        const size = Math.floor(Math.random() * 20) + 1;

        let user;
        if (args && args.length > 0) {
            user = args[0];
            await client.say(channel, `${tags.username} is ${size} inches deep in ${user}.`);
        } else {
            user = tags && tags.username ? tags.username : 'Someone';
            await client.say(channel, `${user} are you seriously trying to go balls deep in yourself? 😂`);
        }
    },
};