module.exports = {
    name: 'newyears',
    description: 'Get the number of days until New Year\'s Day',
    async execute(client, channel, tags, message, args) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const newYearDate = new Date(currentYear + 1, 0, 1);
        const timeDifference = newYearDate - currentDate;
        const daysUntilNewYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        await client.say(channel, `There are ${daysUntilNewYear} days until New Year's Day! 🎉`);
    },
};
