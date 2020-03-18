const functions = require('firebase-functions');
const twitter = require('./twitter');
const quakes = require('./quakes');

exports.twitter = functions.region('us-east1').https.onRequest(twitter);
exports.quakes = functions.region('us-east1').https.onRequest(quakes);
