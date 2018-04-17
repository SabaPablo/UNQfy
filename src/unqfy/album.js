class Album{

  constructor(_albumName,_albumYear,_artist){
    this.name = _albumName;
    this.year = _albumYear;
    this.tracks = [];
    this.artist = _artist;
  }

  addTrack(trackName){
    this.tracks.push(trackName);
  }

  matchArtist(artistName){
    return this.artist.includes(artistName);
  }

  isYourName(albumName){
    return this.name === albumName;
  }

}

module.exports = {
  Album,
};