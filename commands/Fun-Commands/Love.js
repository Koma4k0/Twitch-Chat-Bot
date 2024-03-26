module.exports = {
    name: 'love',
    use: '<user>',
    description: 'Check how much you love someone',
    async execute(client, channel, tags, message, args) {
        const love = Math.floor(Math.random() * 101);

        let user;
        if (args && args.length > 0) {
            user = args[0];
            await client.say(channel, `${tags.username} has ${love}% love for ${user} <3`);
        } else {
            user = tags && tags.username ? tags.username : 'Someone';
            await client.say(channel, `${user} has ${love}% love for themselves <3`);
        }  
    },
};