class Artist{

  constructor(_name, _country,_id=null){
    this.name = _name;
    this.country = _country;
    this.id = _id;
    this.albums = [];   
  }

  isYourName(artistName){return artistName === this.name;}

  isYourId(artistId){return parseInt(artistId) === this.id;}

  addAlbum(album){this.albums.push(album);}
  haveAlbumWithName(albumName){
    return this.albums.filter(album => album.name === albumName).length > 0;  
  }

  getAlbumWithName(albumName){return this.albums.find(album => album.isYourName(albumName));}

  haveAlbumLikeName(albumName){
    return this.albums.filter(album => album.name.toLowerCase().includes(albumName.toLowerCase())).length > 0;
  }
  getAlbumsLikeName(albumName){
    return this.albums.filter(album => album.name.toLowerCase().includes(albumName.toLowerCase()));
  }

  deleteAlbum(album){
    this.albums = this.albums.filter(alb => alb !== album);
  }

  getAlbums(){return this.albums;}

  toJSON(){return {'id': this.id,'name': this.name,'country': this.country,'albums': this.albums};}

}

module.exports = {
  Artist,
};