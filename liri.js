// still need to do node install for this!

require("dotenv").config();
var keys = require("keys.js");
var Twitter = require("twitter");
//var Spotify = require("node-spotify.api");
//var omdbReq = require("omdb");
var client = new Twitter(keys.twitter);
//console.log(client) //works
//var spotifyKeys = new Spotify(keys.spotify);

//var tweetUrl = "https://api.twitter.com/1.1/statuses/user_timeline.json";
/* tweetUrl += $.param({
    screen_name: "mjz_test",
    count: 10
});
console.log(tweetUrl);
*/

var params = {
    screen_name: "mjz_test",
    count: 10
    //oauth_token: "VC76K39lVWgLJCcUrkyDJOzxO"
};

//"statuses/user_timeline"
//https://api.twitter.com/1.1/statuses/lookup.json
//https://api.twitter.com/1.1/statuses/user_timeline.json
//http://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=2&oauth_token=vZ9JO07zz0J5TaToGCrdyYeQT
//id: 995734633852661766

client.get("statuses/user_timeline", params, getTweets)

function getTweets(err, data, response) {
    for (var i = 0; i<data.length; i++) {
        //console.log("hi")
        //console.log(data)
        //console.log("heyyyy")
        //var tweetRawArray = data;
        console.log(data[i].text)
        console.log(data[i].created_at)
        var tweet = JSON.stringify(data[i]);
        //console.log(tweet)
        //console.log(response)
        //console.log(data[0])
        //console.log(tweetRaw)
    }
}