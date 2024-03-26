module.exports = {
    name: 'date',
    use: '<user>',
    description: 'Generate a random date idea for a user or yourself',
    async execute(client, channel, tags, message, args) {
        const dates = [
            "on a Mcdonalds date",
            "on a date to the strip club",
            "on a picnic in the park",
            "to cook a new recipe together",
            "on a stargazing date",
            "on a movie date",
            "on a museum date",
            "on an indoor rock climbing date",
            "on a date at a fancy restaurant",
            "on a date to watch the sunset",
            "on an ice cream date",
            "on a go-kart racing date",
            "on a horseback riding date",
            "on an escape room date",
            "on a mini-golf date",
            "on a coffee date",
            "on a beach day date",
            "on a hiking date",
            "on a bike ride date",
            "on a cooking class date",
            "on a spa day date",
            "on a road trip date",
            "on a karaoke night date",
            "on a hot air balloon ride date",
            "on a visit to a comedy show date",
            "on a picnic by the lake date",
            "on a pottery class date",
            "on a farmers' market date",
            "on a kayaking adventure date",
            "on a karaoke night date",
            "on a wine tasting date",
            "on a game night date",
            "on a visit to an art gallery date",
            "on a bookshop browsing date",
            "on a laser tag date",
            "on a snowboarding adventure date",
            "on a visit to a botanical garden date",
            "on a hot tub soak date",
            "on a sushi-making class date",
            "on a concert in the park date",
            "on a weekend getaway date",
            "on a visit to a historical landmark date",
            "on a volunteering together date",
            "on a beach bonfire date",
            "on a trampoline park date",
            "on a rooftop dinner date",
            "on a paddleboarding adventure date",
            "on a sunrise hike date",
            "on a visit to a science museum date",
            "on a fishing trip date",
            "on a wine and painting class date",
            "on a visit to a planetarium date",
            "on a visit to a wildlife sanctuary date",
            "on a salsa dancing date",
            "on a zip-lining adventure date",
        ];

        const getRandomDate = () => {
            const randomIndex = Math.floor(Math.random() * dates.length);
            return dates[randomIndex];
        };

        let user;
        if (args && args.length > 0) {
            user = args[0];
            const dateIdea = getRandomDate();
            await client.say(channel, `${tags.username} asked ${user} ${dateIdea}`);
        } else {
            user = tags && tags.username ? tags.username : 'You';
            await client.say(channel, `${user} are you seriously trying to ask yourself on a date?`);
        }
    },
};