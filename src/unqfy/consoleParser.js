
class ConsolePar{
  constructor(_argvDict,_unqfy){
    this.argvDict = _argvDict;
    this.unqfy = _unqfy;
    this.commands = {addArtist: this.addArtist};
  }
  execute(){
     
    if (this.argvDict.addArtist){
      console.log(this.argvDict);
      let name = this.argvDict.addArtist[0];
      let country = this.argvDict.addArtist[1];
      this.unqfy.addArtist({name: name,country: country});
    }

    if (this.argvDict.addAlbum){
      let artistName = this.argvDict.addAlbum[0];
      let name = this.argvDict.addAlbum[1];
      let year = this.argvDict.addAlbum[2];

      if(this.unqfy.getArtistByName(artistName)){
        this.unqfy.addAlbum(artistName,{name,year});
      }
      else{
        console.log('\nThe artist %s not exists',artistName);
      }
      
    }

    if (this.argvDict.addTrack){
      let name = this.argvDict.addTrack[0];
      let albumOwner = this.argvDict.addTrack[1];
      let duration = this.argvDict.addTrack[2];
      let genres = this.argvDict.addTrack[3];

      if(this.unqfy.getAlbumByName(albumOwner)){
        this.unqfy.addTrack(albumOwner,{name,duration,genres});
      }
      else{
        console.log('\nThe album %s not exists',albumOwner);
      }
    }


    if (this.argvDict.showArtistWithName){
      let pseudoName = this.argvDict.showArtistWithName;
      console.log('\nArtists with name like %s',pseudoName);
      console.log(this.unqfy.getArtistLikeName(pseudoName));
    }

    if (this.argvDict.showAlbumWithName){
      let pseudoName = this.argvDict.showAlbumWithName;
      console.log('\nAlbumns with name like %s',pseudoName);
      console.log(this.unqfy.getAlbumLikeName(pseudoName));
    }

    if (this.argvDict.showTrackWithName){
      let pseudoName = this.argvDict.showTrackWithName;
      console.log('\nTracks with name like %s',pseudoName);
      console.log(this.unqfy.getTrackLikeName(pseudoName));
    }

    if (this.argvDict.showTrackWithArtist){
      let artistName = this.argvDict.showTrackWithArtist;
      console.log('\nTracks with artist %s',artistName);
      console.log(this.unqfy.getTracksMatchingArtist({name:artistName}));
    }

    if (this.argvDict.showTrackWithGenre){
      let genre = this.argvDict.showTrackWithGenre;
      console.log('\nTracks with genre %s',genre);
      console.log(this.unqfy.getTracksMatchingGenres(genre));
    }

    if (this.argvDict.createPlaylist){
      const name = this.argvDict.createPlaylist[0];
      const maxDuration = this.argvDict.createPlaylist[1];
      const genres = this.argvDict.createPlaylist[2];
      this.unqfy.addPlaylist(name, genres, maxDuration);
      console.log('\nPlaylist %s created',name);
    }

    if (this.argvDict.showPlayList){
      let playlistName = this.argvDict.showPlayList;
      console.log('\nDatails for playlist %s',playlistName);
      console.log(this.unqfy.getPlaylistByName(playlistName));
    }

    if (this.argvDict.populateAlbumsForArtist){
      let artistName = this.argvDict.populateAlbumsForArtist;
      console.log('\nPopulating albums for artist %s',artistName);
      this.unqfy.populateAlbumsForArtist(artistName);
    }
    
  }
}


module.exports = {
  ConsolePar,
};