class Tracki{

  constructor(_name,_duration,_genre,_album){
    this.name = _name;
    this.duration = _duration;
    this.genre = _genre;
    this.album = _album;
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

}

module.exports = {
  Tracki,
};