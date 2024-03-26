module.exports = {
    name: 'bang',
    use: '[user]',
    description: 'Bang someone in chat',
    async execute(client, channel, tags, message, args) {
        const outcomes = [
            "isn't pregnant because pull out game is strong af",
            "had to take plan B because pull out game was weak",
            "is pregnant with twins (2)", "is pregnant with triplets (3)",
            "is pregnant with quadruplets (4)",
            "is pregnant with quintuplets (5)",
            "is pregnant with sextuplets (6)",
            "is pregnant with septuplets (7)",
            "is pregnant with octuplets (8)",
            "is pregnant with nonuplets (9)",
            "is pregnant with decuplets (10)"
        ];
        const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];
        const deep = Math.floor(Math.random() * 20) + 1;

        let user;
        if (args && args.length > 0) {
            user = args[0];
            await client.say(channel, `${tags.username} banged ${user} with their ${deep} inch peen and now ${user} ${outcome}.`);
        } else {
            user = tags && tags.username ? tags.username : 'Someone';
            await client.say(channel, `${user} are you seriously trying to bang yourself? That's not how it works 😂`);
        }
    },
};
