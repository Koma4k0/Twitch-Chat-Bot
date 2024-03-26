const axios = require('axios');
const decimal = require('decimal.js');
const { APIS } = require('../../config.json');

module.exports = {
    name: 'weather',
    use: '<location>',
    description: 'Get current weather information for a location',
    async execute(client, channel, tags, message, args) {
        const argsArray = message.split(' ');
        const place = argsArray.slice(1).join(' ');

        if (place) {
            const url = `http://api.weatherstack.com/current?access_key=${APIS.weatherApiKey}&query=${place}`;

            try {
                const response = await axios.get(url);
                const data = response.data;
                const city = data.location.name;
                const region = data.location.region;
                const country = data.location.country;
                const temp = data.current.temperature;
                const fah = (1.8 * temp) + 32;
                const fahren = new decimal(fah);
                const fahrenheit = fahren.toDecimalPlaces(0);

                await client.say(channel, `It is currently ${fahrenheit}°F or ${temp}°C in ${city}, ${region} ${country}`);
            } catch (error) {
                console.error('Error fetching weather data:', error.message);
                await client.say(channel, 'Error fetching weather data. Please try again later.');
            }
        } else {
            await client.say(channel, 'Please provide a location for the weather command.');
        }
    },
};