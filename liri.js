// still need to do node install for this!

require("dotenv").config();
var keys = require("keys.js");

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var omdbReq = require("omdb");

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
    for (var i = 0; i<20; i++) {
        console.log(data[i].text);
        console.log(data[i].created_at);
        var tweet = JSON.stringify(data[i]);
    }
}

//for spotify
var params = process.argv[3] + " " + process.argv[4] + " " + process.argv[5] + " " + process.argv[6] + " " + process.argv[7] + " " + process.argv[8] + " " + process.argv[9];
params = params.trim();

//console.log(params)

function songSearch() {
    spotify.search({ //////////////?????????????????
        type: 'track',
        query: params
    }).then (function(data) {
        console.log(data);
        console.log(data.tracks.items[0]);
        var songInfo = data.tracks.items[0];
        var artist = songInfo.artists[0].name;
        var songName = songInfo.name;
        var album = songInfo.album.name;
        var preview = songInfo.preview_url;
    })      
};

songSearch();


/*
function songRequest() {
    Spotify.request("https://api.spotify.com/v1/tracks")
    .then(function(response) {
        console.log(response);
        console.log(data.tracks.items[0]);
    });
};
*/

//songRequest();

//request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx'
//{
//    type: 'track',
//    query: 'All the Small Things'
//search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);