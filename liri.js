// still need to do node install for this!

require("dotenv").config();

var keys = require("keys.js");
var twitter = require("twitter");
var spotify = require("spotify");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var myTweets = ;