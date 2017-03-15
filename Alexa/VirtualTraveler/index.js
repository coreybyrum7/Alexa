'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = "amzn1.ask.skill.49f71bbf-dcee-45a3-ad4d-82f507ca3348"; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Virtual Traveler';

/**
 * Array containing travel facts.
 */
var FACTS = [
    "Isle of Skye, Scotland is an incomparably beautiful island located off the west coast of Scotland. You can visit the colorful town of Portree, eat fish and chips, drink delicious whisky (without the “e”) and explore Dunvegan castle.",
    "New Orleans, Louisiana isn’t just a city, it’s a way of life. Influenced by Europe, the Caribbean and Africa, its culture is exceptionally dynamic. The food, music, architecture and people are one of a kind.",
    "Okinawa Island, Japan is an historic island roughly 400 miles from mainland Japan. Its tropical climate makes it an ideal place to snorkel, hike and hang on the beach. If you love nature and history, it’s the perfect place for you.",
    "Killarney, Ireland. Killarney is a quaint, yet energetic town in southwestern Ireland. It’s a great place for walking, as it’s located right next to Killarney National Park. If you like whiskey (with the “e”), nature, history and authentic Irish culture, Killarney is an incredible place to visit.",
    "Montreal, Canada is a great place if you want a taste of Europe but don’t have the time or money to get there, check out Montreal. The people are friendly, the food is delicious and there is an endless amount of activities and places to explore. It’s easily one of the most cosmopolitan cities in North America.",
    "Yerevan, Armenia is a magical and historic city with beautiful views of Mount Ararat. With unique architecture, hospitable people and great food and drink, it’s a fantastic place to visit.",
    "Galle, Sri Lanka is a city with a rich colonial history. It’s full of beaches, art and beautiful colonial architecture. In 1663, the Dutch built a fort there that can still be visited.",
    "Located in the northern part of Norway, the Loften Islands are perfect for fishing and hiking. It also has some of the most incredible scenery in the world.",
    "Mestia, Georgia is an isolated town located in Northern Georgia, but it’s completely worth the visit. Drink Georgian wine, hike to a glacier, mingle with the locals and experience the epic beauty of the Caucasus mountains.",
    "Reykjavik is the capital of Iceland and, surprisingly, one of the most artistic cities you’ll find. It’s also the gateway to the incredible and unique nature of Iceland.",
    "Beirut is the historic capital of Lebanon and one of the most cosmopolitan cities in the Middle East. Often called the “Paris of the Middle East,” it’s a great place to eat, explore and party.",
    "If you want to do something really adventurous and enlightening, visit Pyongyang, North Korea. It’s a place that will open your eyes to the eccentricities of humanity while simultaneously reminding you of the immense privileges people have in more free societies.",
    "Gallipoli, Turkey is the sight of one of the bloodiest battles of World War I. It’s also exceptionally beautiful and in addition to its history, it offers incredible views of the Aegean Sea.",
    "Kathmandu is the capital of Nepal and a delight for the senses. Over the years, it’s become a favorite of backpackers, but there are still many parts of the city untouched by foreigners to explore.",
    "There’s nothing quite like watching the waves crash against the rocks in Big Sur, California. It’s a great place to relax, camp and hike.",
    "Freetown Christiania is a city within a city, located in Denmark. It’s a self-governing section of Copenhagen established in 1971 by a group of hippies. It’s colorful, artsy and you can smoke weed in many places.",
    "The Trans-Siberian Railway is the longest railway in the world, extending from Moscow to Siberia. It’s also probably the most incredible way to explore Russia.",
    "Lake Garda, located in Northern Italy, is the largest lake in Italy. It’s a great place to swim, and the views are exceptional. Not to mention, it’s in Italy, where all of the food is amazing.",
    "Corsica is an island in the Mediterranean off the coast of France with epically diverse geography. Not surprisingly, it’s considered one of the most beautiful locations in the world.",
    "Tulum, Mexico is paradise. It’s one of the most beautiful beaches in Mexico, and to top it off, it’s located next to a Mayan ruin.",
    "If you want adventure, culture and beauty, visit Rumbur Valley in Pakistan. Be prepared to live off the grid, however, as there are no phone signals, electricity or newspapers.",
    "Cartagena, Colombia. Cartagena has beautiful beaches, history and vibrant colonial architecture. You won’t want to leave.",
    "Ha Long Bay, Vietnam. Ha Long Bay is renowned for its beauty, and is a UNESCO World Heritage site. It’s mystical waters will take your breath away.",
    "Ulan Bator is the capital of Mongolia and one of the most remote locations in the world. It’s not the most glamorous city, but it makes up for it in culture and history.",
    "Brussels, Belgium. Brussels is often seen simply as a hub of politics and business, but don’t be fooled. The architecture is incredible, the food is delicious and the people know how to have a good time.",
    "Rio de Janeiro, Brazil might be more well known, but Juqueí is certainly just as beautiful, quiet and has some of the most delicious seafood you’ll ever taste.",
    "Tzaneen is a tropical town located in the north of South Africa. It’s beautiful and full of natural attractions, including a monkey sanctuary.",
    "If you like windmills, museums and unique architecture, you’ll love Zaanse Shans in the Netherlands. It’s not too far from Amsterdam.",
    "Eilat, Isreal. Eilat is where the desert meets the sea. It’s a beach town where the weather is always good and the food is excellent.",
    "Belgrade, Serbia. Belgrade may be a poor city, but it’s absolutely beautiful and rich in culture and hospitality.",
    "Monasterio de Piedra Park, Spain. This natural and beautiful waterfall park is also the site of a monastery built by the Moors. It’s the perfect combination of hiking, scenery and history.",
    "Ljubljana, Slovenia. Slovenia’s capital and largest city is full of friendly people who appreciate visitors. Set on the banks of the Ljubljanica River, it’s the perfect place to explore and party during the summer.",
    "Isla de Vieques, Puerto Rico. This rural island is only about 22 miles long and four miles wide, but it’s impossible to be unhappy there with its crystal clear water and glistening beaches.",
    "White Sands, NM, USA. The White Sands National Monument is the world’s largest gypsum dunefield (275 square miles of white sand). There’s not a single place like it anywhere else in the world.",
    "Budva, Montenegro. Budva is a beautiful and historic town with excellent beaches and an endless nightlife. If you like to party, you’ll fit right in.",
    "Coles Bay & Freycinet National Park in Tasmania, Australia. If you like beaches, hiking, camping, great views and adventure, visit this beautiful national park.",
    "Gothenburg, Sweden. Often referred to as one of the friendliest cities in Sweden, Gothenburg is renowned for its food and architecture. It also has quite a creative side, spawning artists and musicians alike.",
    "Taman Negara National Park, Malaysia. This natural park is home to many of the world’s most endangered species, including Asian elephants, tigers, leopards and rhinos. You might even see a flying squirrel in the dense and mystical jungle.",
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random travel fact from the travel facts list
        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];

        // Create speech output
        var speechOutput = "Here's what I have for you: " + randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say, share some knowledge about where I should travel to nextor, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};