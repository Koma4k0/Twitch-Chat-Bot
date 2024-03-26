module.exports = {
    name: 'ping',
    description: 'Pong! Gets the bots latency to the server',
    async execute(client, channel, tags, message, args) {
        client.ping()
        .then((data) => {
            const ping = data * 100
            client.say(channel, `Pong! The bot's ping is: ${ping}ms`)
        }).catch((err) =>{
            client.say(channel, 'There was an error getting the bots ping.')
            console.log('Error getting bots ping: ' + err)
        });
    },
};