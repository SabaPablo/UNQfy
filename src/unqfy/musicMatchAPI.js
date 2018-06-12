const rp = require('request-promise');

function setLyrics(track){
const options = {
 url: 'http://api.musixmatch.com/ws/1.1/track.search?q_track='+ track.trackName +'&apikey=34b0f9122d5acd426be82165cc049b16',
 json: true,
};
let reqResponse = null;
rp.get(options)
.then(function(response){  
    let tracks = response.message.body.track_list;
    let trackId = (tracks.length > 1) ? tracks.shift().track.track_id : 0
    return trackId;
})
.then(function (trackId){
    const options = {
    url: 'http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id='+trackId+'&apikey=34b0f9122d5acd426be82165cc049b16',
    json: true,
    };
    let reqResponse = null;
    rp.get(options)
    .then(function(response){  
        let lyrics = response.message.body.lyrics.lyrics_body;
        track.setLyrics(lyrics);
    });
    }
);
};

module.exports.setLyrics = setLyrics;