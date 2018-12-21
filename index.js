const fs = require('fs');
const path = require('path');
const stream = require('stream');
const readline = require('readline');
const Timer = require('./timer');
const _ = require('lodash');

const { Tracks } = require('./tracks');
const { Users } = require('./users');
const { Artists } = require('./artists');
const { Views } = require('./views');

const timer = new Timer();

// const users = {};
const sounds = {};
const tracks = new Tracks();
const users = new Users();
const artists = new Artists();
const mostFamousArtist = {};
const monthViews = {};
// const views = new Views();

let tempArtist;


// Unikalne utwory [trackId, execId, artist, title]
const instream = fs.createReadStream("unique_tracks.txt");
const outstream = new stream();
const readLineTrack = readline.createInterface(instream, outstream);

readLineTrack.on('line', function (line) {
  const [ id, exec_id, artist, title ] = line.split('<SEP>');
  tracks.addTrack(id, exec_id, artist, title)
});

readLineTrack.on('close', () => {
  console.log('Finish reading Unique Tracks in', timer.result(), "ms");

  // Odsłuchane utwory [userId, trackId, date]

  const readSoundsLines = readline.createInterface({
    input: require('fs').createReadStream(path.join(__dirname, "triplets_sample_20p.txt"))
  });

  let sampleLineCounter = 0;
  readSoundsLines.on('line', function (line) {
    sampleLineCounter += 1;



    const [ user_id, sound_id, date ] = line.split('<SEP>');
    sounds[sound_id] ? 
      sounds[sound_id].views += 1 : 
      sounds[sound_id] = { 
        id: sound_id, 
        views: 1, 
        artist: tracks.getTrack(sound_id).artist,
        title: tracks.getTrack(sound_id).title
      }
    users.addUser(user_id, sound_id);
    
    tempArtist = tracks.getTrack(sound_id).artist
    mostFamousArtist[tempArtist] = (mostFamousArtist[tempArtist] || 0) + 1;


    let tempDate = new Date(+date * 1000).getMonth();
    monthViews[tempDate] = (monthViews[tempDate] || 0) + 1


    // if (sampleLineCounter === 1e6) { readSoundsLines.close() }
  });

  readSoundsLines.on('close', () => {
    console.log(`Finish reading Triplets Sample in ${timer.result()} ms`);
    
    // Wyświetlenie 10 najczęstszych utworów
    const soundsViewed = _.orderBy(Object.values(sounds), 'views', 'desc')
    for (let i = 0; i < 10; i++) {
      const track = tracks.getTrack(soundsViewed[i].id)
      
      console.log({title: track.title, artist: track.artist, views: soundsViewed[i].views});
    }

    const myUsers = {}
    // Ranking 10 uzytkowników
    _.forEach(users.getUsers(), (val, key) => {
      myUsers[key] = { id: key, uniqueViews: Object.keys(val).length };
    })
    const sortedUsers = _.orderBy(Object.values(myUsers), 'uniqueViews', 'desc')
    for (let i = 0; i < 10; i++) {
      console.log(Object.values(sortedUsers[i]));
    }

    // Top artists
    let sortMostFamousArtist =  [];
    sortMostFamousArtist = Object.entries(mostFamousArtist)
    sortMostFamousArtist.sort((a, b) => b[1] - a[1]);
    
    console.log(sortMostFamousArtist[0]);      
    
    const soundsQueenViewed = _.filter(Object.values(sounds), sound => sound.artist === "Queen")
    const sortedQueenViewed = _.pullAt(_.orderBy(Object.values(soundsQueenViewed), 'views', 'desc'), [0,1,2])
    // console.log(sortedQueenViewed);
    console.log("Wyświetlenia w miesiącu", monthViews);
    console.log(users.getUsersThatListenSpecifisSongs(sortedQueenViewed));

    console.log('Viewed sounds length', Object.keys(sounds).length)
    console.log(`Execution Time: ${timer.result()} ms`);
  })
})


