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
    })      
};

songSearch();

//////////////////////////////////////////////////////////////////////////////////////

function movieSearch(movie) {
    var movie = process.argv[3];
    var key = "trilogy";
    if (movie == undefined) {
        movie = "Mr Nobody"
    }
    queryURL = "http://www.omdbapi.com/" + "?" + "apikey=" + key + "&t=" + movie + "&plot=short&tomatoes=true&r=json";
	Request(queryURL, function(error, response, body) {
        var data = JSON.parse(body);
        console.log("Title: " + data.Title);
        console.log("Year: " + data.Year);
        console.log("IMDB Rating: " + data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + data.tomatoRating);
        console.log("Country: " + data.Country);
        console.log("Language: " + data.Language);
        console.log("Plot: " + data.Plot);
        console.log("Cast: " + data.Actors);
    })         
}
movieSearch();

////////////////////////////////////////////////////////////////////////////////

