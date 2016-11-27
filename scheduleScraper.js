/**
 * Created by dragos on 27/11/16.
 */
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


url = 'http://2016.hacknotts.com/';

request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);
        // Array for timeSlots and the activities scheduled there as strings
        var activities = [];
        var timesAndActivities = [];
        var timeSlots = [];
        // Scrape the data from the website trimming the white spaces into an array where even indexes are time slots
        // and odd indexes are the coresponding activities
        $('td').each( function(i, element)
        {
            timesAndActivities[i] = $(this).text().trim();
        });
        // Shift twice to drop the first two elements("Time" and "Activity")
        timesAndActivities.shift();
        timesAndActivities.shift();
        //console.log(timesAndActivities)
        // if the index is even, put the string into the timeSlot, else put it into the activities
        for (count = 0; count < timesAndActivities.length; count++)
        {
            if (count % 2 == 0)
                timeSlots.push(timesAndActivities[count]);
            else
                activities.push(timesAndActivities[count]);
        }
        // Output
        console.log(timeSlots);
        console.log(activities);
    }
});
