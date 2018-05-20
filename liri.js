var command = process.argv[2];
var userSearch = process.argv[3];

//CALLS
require("dotenv").config();
var keys = require("keys.js");
var fs = require("fs");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var omdb = require("omdb");
var Request = require("request");

//KEYS
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);


///////////////////////////////// TWITTER ////////////////////////////////////////

var twitterParams = {
    screen_name: "mjz_test",
    count: 10
};

function getTweets(err, data, response) {
    for (var i = 0; i<data.length; i++) { //CHANGE TO 20!!!!
        //console.log(data); //works
        console.log(data[i].text);
        console.log(data[i].created_at);
        //var tweet = JSON.stringify(data[i]); //is this necessary?????
    }
}


///////////////////////////////// SPOTIFY //////////////////////////////////////

function songSearch(song) {
    if (song == undefined) {
        song = "The Sign"
    };
    spotify.search({
        type: 'track',
        query: song
    }).then (function(data) {
        var songInfo = data.tracks.items[0];
        var artist = songInfo.artists[0].name;
        var songName = songInfo.name;
        var album = songInfo.album.name;
        var preview = songInfo.preview_url;
        console.log("Artist: " + artist + "\n" + "Song: " + songName + "\n" + "Album: " + album + "\n" + "Song Preview: " + preview)
    })      
};


////////////////////////////////// OMDB //////////////////////////////////////

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


//////////////////////////////////// FS /////////////////////////////////////////

function doWhatItSays() { //take text from txt file to determine which function to run
    fs.readFile("random.txt", "utf8", function(error, data) {
        var textArray = data.split(",");
        var fsCommand = textArray[0];
        //var searchTerm = textArray[1]; //json parse??
        //console.log(fsCommand); //works
        if (fsCommand == "movie-this") {
            movieSearch(textArray[1]);
        }
        else if (fsCommand == "spotify-this-song") {
            songSearch({ type: 'track', query: textArray[1] });
        } else if (fsCommand == "my-tweets") {
            client.get("statuses/user_timeline", twitterParams, getTweets);
        }
    });
}


//////////////////////////////////// IF STATEMENTS /////////////////////////////////////////

if (command == "my-tweets") {
    client.get("statuses/user_timeline", twitterParams, getTweets);
} else if (command == "movie-this") {
    movieSearch(process.argv[3]);
} else if (command == "spotify-this-song") {
    songSearch({ type: 'track', query: process.argv[3] })
} else if (command == "do-what-it-says") {
    doWhatItSays();
}