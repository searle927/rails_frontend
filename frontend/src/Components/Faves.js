import React from 'react';
import '../App.css';
import './Faves.css'

function Faves({ faves }) {

    if(!faves) {
        return <p>You have no favorites yet!</p>
    }
    let favesList = faves.map(song => {
        <div key={song.id}>
            <h3 className="songTitle">{song.title}</h3>
            <p className="songTime">{song.time}</p>
            <p className="songArtist">{song.artist}</p>
            <button>Edit Song</button>
            <button>Remove from Favorites</button>

        </div>
    })

  return (
    <div className="songs">
        {favesList}
    </div>
  );
}

export default Faves;