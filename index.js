'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en-US': {
        translation: {
            OPEN_MESS: 'Hello, Welcome to HackNotts 2016. You can ask me about a range of things such as what hardware we have, or what the timings are.',
            NIGHT_SNACKS: 'If you\'re feeling peckish they\'ll be snacks available at midnight in the castle.',
            HARDWARE_LIST: 'We\'ve got loads of hardware for you to play with! We have the Amazon Echo, the Amazon Fire Phone, the Arduino 101, Base Shield, some Estimote Beacons, some Intel Edisons, a couple of Leap Motions, Muse Headbands, Oculus Rifts CV1, Pebble, Pebble Time, Samsung Gear VR and the Spark Core',
            HELP_MESSAGE: 'If you\'re having trouble feel free to flag down an organiser, or post in the slack group.',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Till the next time, happy hacking!'
        }
    }
}

const handlers = {
    'LaunchRequest': function () {
        const hi = this.t('OPEN_MESS');
        this.emit(':ask', hi);
    },
    'GetHardwareList': function () {
        const speechOutput = this.t('HARDWARE_LIST');
        this.emit(':tell', speechOutput);
    },
    'NightSnacks': function() {
        const speechOutput = this.t('NIGHT_SNACKS');
        this.emit(':tell', speechOutput);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        // const reprompt = this.t('HELP_MESSAGE');
        this.emit(':tell', speechOutput);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
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
