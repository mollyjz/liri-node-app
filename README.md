# Liri Node App

Code: https://github.com/mollyjz/liri-node-app

LIRI is a Language Interpretation and Recognition Interface. It is a multifunctional command-line node.js app that prints the user's latest tweets as well as information about a movie or song of their choice. The user must enter `node liri` in the terminal line before each of the following commands.


## Twitter Functionality

When the user enters `my-tweets` in the command line, LIRI displays the user's last 20 tweets and when they were created.



## Spotify Functionality

When the uses enters `spotify-this-song "songname"`, LIRI will show the following information about the song in the terminal window:

- Artist(s)
- The song's name
- A preview link of the song from Spotify
- The name of the album that the song is from

If no song is provided, LIRI defaults to "The Sign" by Ace of Base.


## OMDB Functionality

When the user enters `movie-this "moviename"`, LIRI displays the following information in the terminal:

- Title of the movie.
- Year the movie came out.
- IMDB Rating of the movie.
- Rotten Tomatoes Rating of the movie.
- Country where the movie was produced.
- Language of the movie.
- Plot of the movie.
- Actors in the movie.

If no movie is provided, LIRI will output data for the movie 'Mr. Nobody.'