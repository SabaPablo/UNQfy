
const picklejs = require('picklejs');
const modArtist = require('./unqfy/artist');
const modAlbum = require('./unqfy/album');
const modTrack = require('./unqfy/track');
const modPlayList = require('./unqfy/playlist');
const modStrategys = require('./unqfy/playlist/strategys');
const modConsoleParser = require('./unqfy/consoleParser');
const duplicatedArtistError = require('./customErrors/unqfyModel/duplicatedArtistInModelError')
const duplicatedAlbumError = require('./customErrors/unqfyModel/duplicatedAlbumInModelError')
const spotifyRequest = require('./unqfy/spotifyAPI/spotifyRequests')

class UNQfy {

  constructor(){

    this.artists = [];
    this.tracks = [];
    this.playlists = [];

  }

  getTracksMatchingGenres(genres) {
    // Debe retornar todos los tracks que contengan alguno de los generos en el parametro genres    
    return this.tracks.filter(track => track.containSomeGenre(genres));
  }

  getTracksMatchingArtist(artistName) {
    return this.tracks.filter(trk => trk.matchArtist(artistName.name));
  }


  /* Debe soportar al menos:
     params.name (string)
     params.country (string)
  */
  addArtist(params) {
    // El objeto artista creado debe soportar (al menos) las propiedades name (string) y country (string)
    if (this.getArtistByName(params.name)){
      throw new duplicatedArtistError.DuplicatedArtistInModelError();
    }
    else{
      this.artists.push(new modArtist.Artist(params.name,params.country,params.id));
    }
    
  }


  /* Debe soportar al menos:
      params.name (string)
      params.year (number)
  */
  addAlbum(artistName, params) {
    // El objeto album creado debe tener (al menos) las propiedades name (string) y year
    
    if (this.getAlbumByName(params.name)){
      throw new duplicatedAlbumError.DuplicatedAlbumInModelError();
    }
    else{
      let artist = this.getArtistByName(artistName);
      artist.addAlbum(new modAlbum.Album(params.name,params.year,artistName,params.id));
    }

  
  }


  /* Debe soportar (al menos):
       params.name (string)
       params.duration (number)
       params.genres (lista de strings)
  */
  addTrack(albumName, params) {
    /* El objeto track creado debe soportar (al menos) las propiedades:
         name (string),
         duration (number),
         genres (lista de strings)
    */
    let albumOwner = this.getAlbumByName(albumName);
    let newTrack = new modTrack.Tracki(params.name,params.duration,params.genres,albumOwner);
    albumOwner.addTrack(newTrack);
    //this.tracks.push(newTrack);
  }

  getArtistByName(name) {
    return this.artists.find(art => art.isYourName(name));
  }

  getAlbumByName(name) {

    let albums = [].concat.apply([],this.artists.map(function(art){return art.getAlbums()}));
    return albums.find(alb => alb.isYourName(name));
  }

  getTrackByName(name) {
    return this.tracks.find(track => track.isYourName(name));
  }

  getPlaylistByName(name) {
    return this.playlists.find(playlist => playlist.isYourName(name));
  }

  addPlaylist(name, genresToInclude, maxDuration) {
    /* El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist
    */
    
    let playlist = new modPlayList.PlayList(name,genresToInclude,maxDuration,this);
    playlist.autoGenerate();
    this.playlists.push(playlist);
  }

  getArtistLikeName(pseudoName){
    return this.artists.filter(artist => artist.name.toLowerCase().includes(pseudoName));
  }

  getAlbumLikeName(pseudoName){


    let artistContainAlbum = this.artists.filter(artist => artist.haveAlbumLikeName(pseudoName));
    let albums = [].concat.apply([],artistContainAlbum.map(function(art){return art.getAlbumsLikeName(pseudoName)}));
    return albums;

  }

  getTrackLikeName(pseudoName){
    return this.tracks.filter(track => track.name.includes(pseudoName));
  }

  getArtistById(id){ return this.artists.find(art => art.isYourId(id)); }


  getAllArtists(){ return this.artists; }


  deleteArtist(artist){ this.artists = this.artists.filter(art => art !== artist); }
  
  getAlbumById(id){
    let albums = [].concat.apply([],this.artists.map(function(art){return art.getAlbums()}));
    return albums.find(alb => alb.isYourId(id));
  }

  getAllAlbums(){
    return [].concat.apply([],this.artists.map(function(art){return art.getAlbums()}))
  }

  deleteAlbum(album){
    let artistContainsAlbum = this.artists.filter(art => art.haveAlbumWithName(album.name));
    artistContainsAlbum.forEach(artist => {artist.deleteAlbum(album); });
  }

  populateAlbumsForArtist(artistName){
    spotifyRequest.populateAlbumsForArtist(artistName,this);
  }

  save(filename = 'unqfy.json') {
    new picklejs.FileSerializer().serialize(filename, this);
  }

  static load(filename = 'unqfy.json') {
    const fs = new picklejs.FileSerializer();
    const classes = [UNQfy,
      modAlbum.Album,
      modArtist.Artist,
      modTrack.Tracki,
      modPlayList.PlayList,
      modStrategys.RandomGeneratorPlaylist,
      modConsoleParser.ConsolePar
    ];

    fs.registerClasses(...classes);
    return fs.load(filename);
  }
}

module.exports = {
  UNQfy,
};

