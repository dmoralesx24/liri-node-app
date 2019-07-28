
let axios = require("axios");
let Spotify = require("node-spotify-api");
let keys = require("./keys.js");
const moment = require("moment");

const Liri = function() {
    this.findMovie = function(movie) {
        let movieQueryUrl = "http://www.omdbapi.com/?t=" + movie + "=&plot=short&apikey=trilogy";

        axios.get(movieQueryUrl).then(function (response) {
            let jsonData = response.data;

            let movieData = [
                "Title: " + jsonData.Title,
                "Year: " + jsonData.Year,
                "IMBD rating: " + jsonData.imdbRating,
                "Rotten Tomatos: " + jsonData.Ratings[1].Value,
                "Country: " + jsonData.Country,
                "Language: " + jsonData.Language,
                "Plot: " + jsonData.Plot,
                "Actors: " + jsonData.Actors
            ].join("\n\n");
            
            console.log(movieData);
        });
    };
    this.findBand = function (band) {
        let bandQueryUrl = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";

        axios.get(bandQueryUrl).then(function (response) {
            let jsonData = response.data[0];
            let dateFormat = moment(jsonData.datetime).format("MM/DD/YYYY");
            let bandData = [
                "Venue: " + jsonData.venue.name,
                "Location: " + jsonData.venue.city,
                "Date: " + dateFormat,
            ].join("\n\n");

            console.log(bandData);
        });
    };
    this.findSong = function (song) {
        let spotify = new Spotify (keys.spotify);
        

        spotify.search({ type: 'track', query: song, limit: 1})
        .then(function(response) {
            let jsonData = response.tracks.items[0];
            let songData = [
                "Song: " + jsonData.name,
                "Artists: " + jsonData.artists[0].name,
                "URL: " + jsonData.preview_url,
                "Album: " + jsonData.album.name
            ].join("\n\n");

          console.log(songData);

        }).catch(function(err) {
            console.log(err);
          });
    };
};


module.exports = Liri;