module.exports = {
    name: 'dad',
    use: '[user]',
    description: 'Get a random dad-related message',
    async execute(client, channel, tags, message, args) {
        const user = args[0] || tags.username;
        const randomDadMessage = dadMessages[Math.floor(Math.random() * dadMessages.length)];

        await client.say(channel, `${user}, ${randomDadMessage}`);
    },
};

const dadMessages = [
    'your dad is robbing a bank in Chicago.',
    'your dad is trying to break the world record for the longest nap.',
    'your dad is challenging Chuck Norris to a beard-growing contest.',
    'your dad is learning how to dance like nobody is watching.',
    'your dad is building a treehouse for squirrels.',
    'your dad is writing a book on "dad jokes 101."',
    'your dad is hosting a barbecue party for the neighborhood.',
    'your dad is practicing his air guitar skills.',
    'your dad is teaching cats how to play fetch.',
    'your dad is on a mission to find the best pizza in town.',
    'your dad is giving motivational speeches to seagulls at the beach.',
    'your dad is attempting to set the record for the most selfies taken in an hour.',
    'your dad is starting a podcast about the history of sock lint.',
    'your dad is training for the next hot dog eating contest.',
    'your dad is inventing a new flavor of ice cream called "Dad Delight."',
    'your dad is growing a garden of dad-approved vegetables.',
    'your dad is competing in a beard styling competition.',
    'your dad is hosting a karaoke night in the garage.',
    'your dad is taking a cross-country road trip on a riding lawnmower.',
    'your dad is challenging the neighbors to a water balloon fight.',
    'your dad is perfecting his secret BBQ sauce recipe.',
    'your dad is starting a rock band with other neighborhood dads.',
    'your dad is practicing dad jokes in front of the mirror.',
    'your dad is designing a line of dad fashion accessories.',
    'your dad is hosting a weekly book club for classic dad literature.',
    'your dad is learning to yodel in the backyard.',
    'your dad is organizing a "Dad Olympics" with events like lawnmower racing and grill flipping.',
    'your dad is building a collection of rare dad mugs.',
    'your dad is participating in a dad dance-off competition.',
    'your dad is starting a vlog about the exciting life of a suburban dad.',
    'your dad is becoming a connoisseur of fine cheeses.',
    'your dad is setting up a hammock in the backyard for ultimate relaxation.',
    'your dad is creating a series of instructional videos on tying the perfect tie.',
    'your dad is forming a neighborhood watch group for suspicious squirrels.',
    'your dad is training for a dad-themed triathlon (grilling, lawn mowing, and dad jokes).',
    'your dad is painting a mural of dad wisdom on the garage door.',
    'your dad is organizing a father-son camping trip with all the dads in the area.',
    'your dad is starting a DIY home improvement project involving excessive amounts of duct tape.',
    'your dad is participating in a dad trivia night at the local pub.',
    'your dad is hosting a "Dad Bod Fitness Challenge" for the community.',
    'your dad is taking up fishing and telling tales of the elusive "one that got away."',
    'your dad is creating a playlist of dad-approved songs for the family road trip.',
    'your dad is attending a support group for dads addicted to grilling.',
    'your dad is working on a scrapbook of family vacations filled with dad-approved captions.',
    'your dad is organizing a neighborhood car wash to raise funds for his lawnmower racing team.',
    'your dad is perfecting his golf swing in the backyard.',
    'your dad is joining a dad choir to showcase his vocal talents.',
    'your dad is developing a line of dad-inspired cologne scents.',
    'your dad is hosting a "Dad Olympics" with events like sock sliding and remote control mastery.',
    'your dad is growing a collection of dad hats for every occasion.',
    'your dad is planning a dad-themed movie marathon with classics like "Dad Hard" and "Dadpool."',
    'your dad is practicing dad magic tricks to entertain the neighborhood kids.',
    'your dad is organizing a dad picnic with sandwiches and dad-approved snacks.',
    'your dad is starting a dad-themed podcast discussing the art of mowing lawns and telling dad jokes.',
    'your dad is hosting a backyard barbecue with a dad-approved playlist.',
    'your dad is training the family pet to respond to dad whistle commands.',
    'your dad is building a dad cave in the basement for ultimate relaxation.',
    'your dad is mastering the art of dad reflexes to catch falling objects with precision.',
];