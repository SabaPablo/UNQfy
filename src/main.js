

const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./unqfy');
const consoleParser = require('./unqfy/consoleParser');
const modMinim = require('minimist');
const stdio = require('stdio');

function getUNQfy(filename) {
  let unqfy = new unqmod.UNQfy();
  if (fs.existsSync(filename)) {
    unqfy = unqmod.UNQfy.load(filename);
  }
  return unqfy;
}


function saveUNQfy(unqfy, filename) {
  unqfy.save(filename);
}

function main() {

  let unqfy = getUNQfy('db_UNQFy');
  let ops = stdio.getopt({
    addArtist: {args: 2, description: 'Create and add new artist'  },
    addAlbum : {args: 3, description: 'Create and add new album'   },
    addTrack : {args: 4, description: 'Create and add a new track' },
    showArtistWithName : {args: 1, description: 'Show several data'},
    showAlbumWithName  : {args: 1, description: 'Show several data'},
    showTrackWithName  : {args: 1, description: 'Show several data'},
    showTrackWithArtist: {args: 1, description: 'Show several data'},
    showTrackWithGenre : {args: 1, description: 'Show several data'},
    createPlaylist: {args: 3, description: 'Create a new playlist' },
    showPlayList  : {args: 1, description: 'Show playlist data'    },
    populateAlbumsForArtist  : {args: 1, description: 'Populate album for artist'},
    h   : {args: 0,description: 'Help'                            }
    
  });
  
  let parser = new consoleParser.ConsolePar(ops,unqfy);
  parser.execute();
  saveUNQfy(unqfy,'db_UNQFy');

}

main();