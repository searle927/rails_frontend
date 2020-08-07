import React from 'react';
import '../App.css';

function Songs({songs}) {

    console.log(songs)

    // if(!songs) {
    //     return <p>...loading</p>
    // }
    // let songList = songs.map((song) => {
    //     <div key={song.id}>
    //         <h3>{song.title}</h3>
    //         <p>{song.time}</p>
    //         <p>{song.artist}</p>
    //         <button>Edit Song</button>
    //         <button>Remove Song</button>
    //         <button>Add to Favorites</button>

    //     </div>
    // })

  return (
    <div className="songs">
        {/* {songList} */}
    </div>
  );
}

export default Songs;