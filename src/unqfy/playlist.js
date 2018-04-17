const modStrategys = require('./playlist/strategys');

class PlayList{

  constructor(_name,_genresToInclude,_maxDuration,_unqfy){
    this.name = _name;
    this.genresToInclude = _genresToInclude;
    this.maxDuration = _maxDuration;
    this.tracks = [];
    this.unqfy = _unqfy;
    this.strategy = this.strategy= new modStrategys.RandomGeneratorPlaylist(this.unqfy,this.genresToInclude,this.maxDuration);
  }

  duration(){
    return this.tracks.map(elem => elem.duration).reduce( (number, initialValue) => initialValue + number,0);
  }

  autoGenerate(strategy = null){
    if(strategy){
      this.strategy = new strategy(this.unqfy,this.genresToInclude,this.maxDuration)
    }
    this.tracks = this.strategy.autoGenerate();

  }

  hasTrack(aTrack){
    return this.tracks.includes(aTrack);
  }

  isYourName(playlistName){
    return this.name === playlistName;
  }

}

module.exports = {
  PlayList
};