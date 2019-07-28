require("dotenv").config();
const Liri = require("./ajax.js");

let liri = new Liri();

let search = process.argv[2];
let term = process.argv.slice(3).join(" ");


if(!search) {
  search = 'actor';
}
if(!term) {
  term = 'Kit Harrington';
}

if(search === 'movie-this') {
  console.log('Searching for movie');
  liri.findMovie(term);
} else if(search === 'concert-this') {
  console.log('Searching for band')
  liri.findBand(term);
} else {
  console.log('Searching for song');
  liri.findSong(term);
};

