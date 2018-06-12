const rp = require('request-promise');
const fs = require('fs');
let duplicatedAlbumError = require('../../customErrors/unqfyModel/duplicatedAlbumInModelError');

function getToken(){
    return JSON.parse(fs.readFileSync('./unqfy/spotifyAPI/spotifyCreds.json','utf8')).access_token;
};

function populateAlbumsForArtist(artistName,unqfy){
const options = {
 url: 'https://api.spotify.com/v1/search?q='+artistName+'&type=artist',
 headers: { Authorization: 'Bearer ' + getToken() },
 json: true,
};
let reqResponse = null;
rp.get(options)
.then(function(response){  
    let artists = response.artists;
    let artistId = (artists.items.length > 1) ? artists.items.shift().id : 0
    return artistId;
})
.then(function (artistId){
    const options = {
    url: 'https://api.spotify.com/v1/artists/'+artistId+'/albums',
    headers: { Authorization: 'Bearer ' + getToken() },
    json: true,
    };
    let reqResponse = null;
    rp.get(options)
    .then(function(response){  
        let albums = response.items.map(function(item){return {'name':item.name,'year':item.release_date}});        
        albums.forEach(album => {
            try{
                unqfy.addAlbum(artistName,{name:album.name,year:album.year});
            }
            catch (e){
            if (! e instanceof duplicatedAlbumError.DuplicatedAlbumInModelError){throw e};
            }
        });
        
    });
    }
)
};

module.exports = {
    populateAlbumsForArtist,
  };
  