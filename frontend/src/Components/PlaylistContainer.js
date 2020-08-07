import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom'
import '../App.css';
import apiUrl from '../apiConfig.js'
import axios from 'axios'
import CreateForm from './CreateForm'


function PlaylistContainer(props) {
    const [songs, setSongs] = useState([])
    const [faves, setFaves] = useState([])
    const [input, setInput] = useState({ title: "", time: "", artist: "" });
    const [item, setItem] = useState(null);
    const [fave, setFave] = useState(null)
    const [isUpdated, setIsUpdated] = useState(false)

console.log(apiUrl)

    useEffect(() => {
      const makeAPICall = async () => {
        try {
          const response = await axios(`${apiUrl}/songs`)
          setSongs(response.data)
          console.log('this', response.data)
        } catch (err) {
          console.error(err)
        }
      }
      makeAPICall()
    }, [isUpdated])

    const handleChange = (event) => {
        console.log("event", event.target.name, event.target.value);
        setInput({
          ...input,
          [event.target.name]: event.target.value,
        });
      };

      const handleSubmit = (event) => {
  
        event.preventDefault();
    
        console.log("handleSubmit");
        axios({
          url: `${apiUrl}/songs`,
          method: "POST",
          data: input,
        })
          .then((res) => {
              setItem({ createdItem: res.data.item })
            })
          .catch(console.error);
          window.location.reload()
      };

    useEffect(() => {
        const makeAPICall = async () => {
          try {
            const response = await axios(`${apiUrl}/songs/faves`)
            setFaves(response.data)
            console.log(response.data)
          } catch (err) {
            console.error(err)
          }
        }
        makeAPICall()
      }, [isUpdated])

    console.log(songs)

   if(!songs) {
       return <p>...loading</p>
   }

    let songList = songs.map(song =>
         (<li key={song.id}>
            <h3>{song.title}</h3>
            <p>{song.time}</p>
            <p>{song.artist}</p>
            <button onClick={() => toggleFaveTrue(song)}>Add to Favorites</button>
        </li>
    ))

    const toggleFaveTrue = (song) => {
        console.log(song)
        axios({
            url: `${apiUrl}/songs/${song._id}/fav`,
            method: "PUT",
            data: { isFavorite: true },
          })
        setIsUpdated(true)
          console.log(song)
          window.location.reload()
    }

    let favesList = faves.map(song => (

        <li key={song.id}>
            <h3>{song.title}</h3>
            <p>{song.time}</p>
            <p className="songArtist">{song.artist}</p>
            <button onClick={() => toggleFaveFalse(song)}>Remove from Favorites</button>
        </li>
    ))

    const toggleFaveFalse = (song) => {
        console.log(song)
        axios({
            url: `${apiUrl}/songs/${song._id}/fav/remove`,
            method: "PUT",
            data: { isFavorite: false },
          })
          console.log(song)
        setIsUpdated(true)
        window.location.reload()
    }


  return (
    <div className="playlist-container">
        <h1>Playlist</h1>
        <ul>{songList}</ul>
        {/* <Songs songs={songs}/> */} 
        <h1>Favorites</h1>
        <ul>{favesList}</ul>
        {/* <Faves faves={faves}/> */}
        <CreateForm 
            item={input}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    </div>
  );
}

export default PlaylistContainer;