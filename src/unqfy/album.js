class Album{

  constructor(_albumName,_albumYear,_artist,_id=null){
    this.name = _albumName;
    this.year = _albumYear;
    this.tracks = [];
    this.artist = _artist;
    this.id = _id;
  }

  addTrack(trackName){this.tracks.push(trackName);}

  matchArtist(artistName){return this.artist.includes(artistName);}

  isYourName(albumName){return this.name === albumName;}

  isYourId(albumId){return parseInt(albumId) === this.id;}

  toJSON(){return {'id':this.id,'name': this.name,'year':this.year,'tracks':this.tracks}; }

}

module.exports = {
  Album,
};