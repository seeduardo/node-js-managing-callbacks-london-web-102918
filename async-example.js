const prompt  = require('prompt');
const request = require('request');
const async   = require('async');

const WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather?q='
const WEATHER_API_KEY = '88bfde3533d98e8a300a138ef668cda2';

async.waterfall([
  (callback) => {
    prompt.get({
      name: 'city',
      description: 'Please enter a city to see its weather'
    }, (error, result) => {
      if (error) return callback(error);
      callback(null, result.city);
    });
  },
  (city, callback) => {
    const url = WEATHER_API_URL + city + '&APPID=' + WEATHER_API_KEY + '&units=metric';
    request(url, (error, response, body) => {
      if (error) return callback(error);
      callback(null, city, body);
    });
  }
], (error, city, weather) => {
  if (error) console.error(error);
  console.log(`The weather in ${city} is: \n ${weather}`);
});
