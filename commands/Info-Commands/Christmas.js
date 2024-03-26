module.exports = {
    name: 'christmas',
    description: 'Get the number of days until Christmas',
    async execute(client, channel, tags, message, args) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const christmasDate = new Date(currentYear, 11, 25);
        const timeDifference = christmasDate - currentDate;
        const daysUntilChristmas = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        await client.say(channel, `There are ${daysUntilChristmas} days until Christmas! 🎄`);
    },
};