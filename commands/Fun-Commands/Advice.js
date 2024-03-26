const axios = require('axios');

module.exports = {
    name: 'advice',
    description: 'Get some random advice, not to be taken seriously',
    async execute(client, channel, tags, message, args) {
        const response =  await axios.get('https://api.adviceslip.com/advice')
        const advice = response.data.slip.advice

        await client.say(channel, advice)
    },
};