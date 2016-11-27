(function() {
    "use strict";

    const Alexa = require('alexa-sdk');

    const APP_ID = undefined; // TODO replace with your app ID (OPTIONAL).

    var express = require('express');
    var fs = require('fs');
    var request = require('request');
    var cheerio = require('cheerio');
    var app = express();

    const languageStrings = {
        'en-US': {
            translation: {
                OPEN_MESS: 'Hello, Welcome to HackNotts 2016. You can ask me about a range of things, from our hardware, to the wifi, even down to the game of wearwolf.',
                NIGHT_SNACKS: 'If you\'re feeling peckish they\'ll be a large array of sweets available at midnight in the castle.',
                FOOD_DRINK: 'There is food and drinks in the castle, we\'ll be keeping it stocked through out the event.',
                HARASS: 'We\'re sorry to hear that, please please speak to an organiser. If you\'d rather email us then email incident@mlh.io',
                WEAR_INFO: 'The wearwolf game will be held in the Hub, after dinner by Joe. It\'ll be announced when it\'s ready',
                WIFI_INFO: "If you're a student please connect to eduroam. If you're having issues, please talk to an event organiser.",
                // HARDWARE_LIST: 'TEST, ' + hardware.toString() + ' Count: ' + hardware.length,
                TWEET: 'Feel free to tweet us @HackNotts, and use the #HackNotts',
                EGG: 'Thanks for looking at this demo, if you\'ve got any questions feel free to ask my creators.',
                SLACK: 'The slack channel is a great place to ask for help, if you\'re not on it, then ask an event organiser to send you an invite.',
                EMERGENCY: 'In the unlikely event of an emergency, contact Richard on <say-as interpret-as="digits">075 17 <break time="1s"/> 403 988</say-as>, that\'s, <say-as interpret-as="digits">075 17 <break time="1s"/>403 988</say-as>. If it\'s a fire, exit to the carpark through the back doors.',
                SPONSERS: 'We\'d like to give a huge thank you to our sponsers, who are: Capital One, Nationwide, digital economy network, Algolia, Major League Hacking, the University of Nottingham School of Computer Science and the University of Nottingham Information Services',
                SLEEP: 'The sleeping rooms are upstairs on the top floor, just follow the signs or ask an organiser. Be sure to bring your own pillow',
                HARDWARE_LIST: 'We\'ve got loads of hardware for you to play with! We have the Amazon Echo, the Amazon Fire Phone, the Arduino 101, a Base Shield, some Estimote Beacons, some Intel Edisons, a couple of Leap Motions, Muse Headbands, Oculus Rifts CV1, Pebble, Pebble Time, Samsung Gear VR and the Spark Core',
                HELP_MESSAGE: 'If you\'re having trouble feel free to flag down an organiser, or post in the slack group.',
                HELP_REPROMPT: 'Feel free to ask me anything, I\'ll do my best to answer',
                STOP_MESSAGE: 'Happy hacking, and may the odds be ever in your favour!'
            }
        }
    };

    const handlers = {
        'LaunchRequest': function() {
            const hi = this.t('OPEN_MESS');
            const reprompt = this.t('HELP_REPROMPT');
            this.emit(':ask', hi, reprompt);
        },
        'GetHardwareList': function() {
            // const hardwareList = 'The hardware we have available is, '.concat(hardware.toString());
            const hardwareList = this.t('HARDWARE_LIST');
            const reprompt = this.t('HELP_REPROMPT');
            this.emit(':ask', hardwareList, reprompt);
        },
        'NightSnacks': function() {
            const speechOutput = this.t('NIGHT_SNACKS');
            const reprompt = this.t('HELP_REPROMPT');
            this.emit(':ask', speechOutput, reprompt);
        },
        'WifiInfo': function() {
            const wifiInfo = this.t('WIFI_INFO');
            const reprompt = this.t('HELP_REPROMPT');
            this.emit(':ask', wifiInfo, reprompt);
        },
        'GetSchedule': function() {
            var activityThing = String(this.event.request.intent.slots.event.value);
            var outStr = '';
            switch(activityThing) {
                case 'doors open':
                    outStr='10:00 am';
                    break;
                case 'registration begins':
                    outStr='10:00 am';
                    break;
                case 'opening ceremony':
                    outStr='11:00 am';
                    break;
                case 'hacking starts':
                    outStr='12:00 pm';
                    break;
                case 'team building session':
                    outStr='12:00 pm';
                    break;
                case 'lunch':
                    outStr='1:00 pm';
                    break;
                case 'dinner':
                    outStr='7:00 pm';
                    break;
                case 'breakfast':
                    outStr='8:00 am';
                    break;
                case 'hacking stops':
                    outStr='12:00 pm';
                    break;
                case 'demoes start':
                    outStr='1:00 pm';
                    break;
                case 'doors closing':
                    outStr='4:00 pm';
                    break;
                default:
                    outStr='Sorry, I couldn\'t find that event.';
                    break;
}
            const speechOutput = outStr;
            // const speechOutput = activityThing;
            const reprompt = this.t('HELP_REPROMPT');
            this.emit(':ask', speechOutput, reprompt);
        },
        'WereWolf': function() {
            const wearInfo = this.t('WEAR_INFO');
            const reprompt = this.t('HELP_REPROMPT');
            this.emit(':ask', wearInfo, reprompt);
        },
        'FoodDrink': function() {
            const foodDrinkInfo = this.t('FOOD_DRINK');
            const reprompt = this.t('HELP_REPROMPT');
            this.emit(':ask', foodDrinkInfo, reprompt);
        },
        'Harass': function() {
            const harass = this.t('HARASS');
            const reprompt = this.t('HELP_REPROMPT');
            this.emit(':ask', harass, reprompt);
        },
        'Sleep': function() {
            const sleep = this.t('SLEEP');
            const reprompt = this.t('HELP_REPROMPT');
            this.emit(':ask', sleep, reprompt);
        },
        'Sponsors': function() {
            const sponsers = this.t('SPONSERS');
            const reprompt = this.t('HELP_REPROMPT');
            this.emit(':ask', sponsers, reprompt);
        },
        'Emergency': function() {
            const emergency = this.t('EMERGENCY');
            const reprompt = this.t('HELP_REPROMPT');
            this.emit(':ask', emergency, reprompt);
        },
        'Twitter': function() {
            const tweet = this.t('TWEET');
            const reprompt = this.t('HELP_REPROMPT');
            this.emit(':ask', tweet, reprompt);
        },
        'Slack': function() {
            const slack = this.t('SLACK');
            const reprompt = this.t('HELP_REPROMPT');
            this.emit(':ask', slack, reprompt);
        },
        'Egg': function() {
            const egg = this.t('EGG');
            const reprompt = this.t('HELP_REPROMPT');
            this.emit(':ask', egg, reprompt);
        },
        'AMAZON.HelpIntent': function() {
            const speechOutput = this.t('HELP_MESSAGE');
            // const reprompt = this.t('HELP_MESSAGE');
            this.emit(':ask', speechOutput);
        },
        'AMAZON.CancelIntent': function() {
            this.emit(':tell', this.t('STOP_MESSAGE'));
        },
        'AMAZON.StopIntent': function() {
            this.emit(':tell', this.t('STOP_MESSAGE'));
        },
        'SessionEndedRequest': function() {
            this.emit(':tell', this.t('STOP_MESSAGE'));
        },
    };

    exports.handler = (event, context) => {
        const alexa = Alexa.handler(event, context);
        alexa.APP_ID = APP_ID;
        // To enable string internationalization (i18n) features, set a resources object.
        alexa.resources = languageStrings;
        alexa.registerHandlers(handlers);
        alexa.execute();
    };


})();
