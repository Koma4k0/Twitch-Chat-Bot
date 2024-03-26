const axios = require('axios');
const { APIS } = require('../../config.json')

module.exports = {
    name: 'lovecalc',
    use: '<name-1> <name-2>',
    description: 'Calculate love percentage between two names',
    async execute(client, channel, tags, message, args) {
        if (args && args.length >= 2) {
            const name1 = args[0];
            const name2 = args[1];
            const url = 'https://the-love-calculator.p.rapidapi.com/love-calculator';

            const querystring = {
                fname: name1,
                sname: name2
            };

            const headers = {
                'X-RapidAPI-Key': APIS.rapidApiKey,
                'X-RapidAPI-Host': 'the-love-calculator.p.rapidapi.com'
            };

            try {
                const response = await axios.get(url, { headers, params: querystring });
                const love = response.data;

                const match = love['percentage match: '];
                const result = love['result: '];

                await client.say(channel, `${name1} and ${name2} are a ${match}% match. ${result}`);
            } catch (error) {
                console.error('Error calculating love:', error.message);
                console.error('API Response:', error.response ? error.response.data : 'No response data');
                await client.say(channel, 'Error calculating love. Please try again later.');
            }
        } else {
            await client.say(channel, 'Please provide two names for the lovecalc command.');
        }
    },
};
