module.exports = {
    name: 'heightcheck',
    use: '[user]',
    description: 'Check your height against the list',
    async execute(client, channel, tags, message, args) {
        const heights = [
            "4'0\"",
            "4'1\"",
            "4'2\"",
            "4'3\"",
            "4'4\"",
            "4'5\"",
            "4'6\"",
            "4'7\"",
            "4'8\"",
            "4'9\"",
            "4'10\"",
            "4'11\"",
            "5'0\"",
            "5'1\"",
            "5'2\"",
            "5'3\"",
            "5'4\"",
            "5'5\"",
            "5'6\"",
            "5'7\"",
            "5'8\"",
            "5'9\"",
            "5'10\"",
            "5'11\"",
            "6'0\"",
            "6'1\"",
            "6'2\"",
            "6'3\"",
            "6'4\"",
            "6'5\"",
            "6'6\"",
            "6'7\"",
            "6'8\"",
            "6'9\"",
            "7'0\"",
        ];
        const randomHeight = heights[Math.floor(Math.random() * heights.length)];
        const user = args[0] || tags.username;

        await client.say(channel, `${user} is ${randomHeight}.`);
    },
};