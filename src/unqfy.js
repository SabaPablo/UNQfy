
const picklejs = require('picklejs');
const modArtist = require('./unqfy/artist');
const modAlbum = require('./unqfy/album');
const modTrack = require('./unqfy/track');
const modPlayList = require('./unqfy/playlist');
const modStrategys = require('./unqfy/playlist/strategys');
const modConsoleParser = require('./unqfy/consoleParser');

class UNQfy {

  constructor(){
    this.albums = [];
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
    this.artists.push(new modArtist.Artist(params.name,params.country));
  }


  /* Debe soportar al menos:
      params.name (string)
      params.year (number)
  */
  addAlbum(artistName, params) {
    // El objeto album creado debe tener (al menos) las propiedades name (string) y year
    this.albums.push(new modAlbum.Album(params.name,params.year,artistName));
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
    this.tracks.push(newTrack);
  }

  getArtistByName(name) {
    return this.artists.find(art => art.isYourName(name));
  }

  getAlbumByName(name) {
    return this.albums.find(album => album.isYourName(name));
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
    return this.artists.filter(artist => artist.name.includes(pseudoName));
  }

  getAlbumLikeName(pseudoName){
    return this.albums.filter(album => album.name.includes(pseudoName));
  }

  getTrackLikeName(pseudoName){
    return this.tracks.filter(track => track.name.includes(pseudoName));
  }

  save(filename = 'unqfy.json') {
    new picklejs.FileSerializer().serialize(filename, this);
  }

  static load(filename = 'unqfy.json') {
    const fs = new picklejs.FileSerializer();
    // TODO: Agregar a la lista todas las clases que necesitan ser instanciadas
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

// TODO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy,
};

