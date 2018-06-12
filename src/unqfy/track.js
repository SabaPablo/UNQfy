let musicM = require("./musicMatchAPI");
class Tracki{

  constructor(_name,_duration,_genre,_album){
    this.name = _name;
    this.duration = _duration;
    this.genre = _genre;
    this.album = _album;
    this.lyrics = null;
  }

  matchArtist(artistName){
    return this.album.matchArtist(artistName);
  }

  containSomeGenre(genres){
    return genres.includes(this.genre);
  }

  isYourName(trackName){
    return this.name === trackName;
  }

  getAlbums(){return this.albums;}

  deleteAlbum(album){this.albums = this.albums.filter(alb => alb !== album); }

  getLyrics(){
    
    if (this.lyrics===null){
      musicM.setLyrics(this);
      return this.lyrics;
    }
    else{
      return this.lyrics;
    }
  }

  setLyrics(lyrics){this.lyrics = lyrics;}

}

module.exports = {
  Tracki,
};