// still need to do node install for this!

require("dotenv").config();
var keys = require("keys.js");

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var omdb = require("omdb");
var Request = require("request");

//KEYS
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

//console.log(keys.spotify) //works

var twitterParams = {
    screen_name: "mjz_test",
    count: 10
};

client.get("statuses/user_timeline", twitterParams, getTweets)

function getTweets(err, data, response) {
    for (var i = 0; i<data.length; i++) { //CHANGE TO 20!!!!
        //console.log(data); //works
        console.log(data[i].text); //undefined? just because i only have 2 tweets?????
        console.log(data[i].created_at);
        //var tweet = JSON.stringify(data[i]); //is this necessary?????
    }
}

//SWITCH STATEMENTS SO THAT IT ONLY PROVIDES RESULTS FOR THE API YOU WANT!!!!!!!!!!!!!!

//for spotify
//var params = "hello";

//console.log(params)

function songSearch() {
    spotify.search({
        type: 'track',
        query: process.argv[3]
    }).then (function(data) {
        var songInfo = data.tracks.items[0];
        var artist = songInfo.artists[0].name;
        var songName = songInfo.name;
        var album = songInfo.album.name;
        var preview = songInfo.preview_url;
        console.log("Artist: " + artist + "\n" + "Song: " + songName + "\n" + "Album: " + album + "\n" + "Song Preview: " + preview)
        debugger;
    })      
};

songSearch();



function movieSearch() {
    var terms = process.argv[3];
    omdb.search(terms, function(terms, movie) {
        console.log('%s (%d)', movie.title, movie.year);
    });
}

movieSearch();