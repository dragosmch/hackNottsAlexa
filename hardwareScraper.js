/**
 * Created by dragos on 26/11/16.
 */
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


    url = 'https://hardware.mlh.io/events/hacknotts';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            // Array of string results
            var hardware = [];
            // Scrape hardware from site as strings and trim white spaces
            $('h4').each( function(i, element)
            {
                hardware[i] = $(this).text().trim();
            });
            // Delete first element
            hardware.shift();
            // Output
            console.log(hardware);
        }
    });
