class Artist{

  constructor(_name, _country){
    this.name = _name;
    this.country = _country;
  }

  isYourName(artistName){
    return artistName === this.name;
  }

}

module.exports = {
  Artist,
};