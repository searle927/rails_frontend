import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom'
import '../App.css';
import apiUrl from '../apiConfig.js'
import axios from 'axios'
import CreateForm from './CreateForm'



function PlaylistContainer(props) {
    const [songs, setSongs] = useState([])
    const [faves, setFaves] = useState([])
    const [input, setInput] = useState({ title: "", duration: "", artist: "" });
    const [item, setItem] = useState(null);
    const [fave, setFave] = useState(null)
    const [isUpdated, setIsUpdated] = useState(false)
    const [isDeleted,setIsDeleted] = useState(false)

console.log(apiUrl)

    useEffect(() => {
      const makeAPICall = async () => {
        try {
          const response = await axios(`http://localhost:3000/songs`)
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
          url: `http://localhost:3000/songs`,
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
            const response = await axios(`http://localhost:3000/songs/faves`)
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
            <p className='duration'>{song.duration}</p>
            <p>{song.artist}</p>
            <button onClick={() => toggleFaveTrue(song)}>Add to Favorites</button>
            <button className="Destroy" onClick={()=>props.destroy({item})}>Delete</button>
        </li>
    ))

    const toggleFaveTrue = (song) => {
        console.log(song)
        axios({
            url: `http://localhost:3000/songs/${song._id}/fav`,
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
            <p>{song.duration}</p>
            <p className="songArtist">{song.artist}</p>
            <button onClick={() => toggleFaveFalse(song)}>Remove from Favorites</button>
        </li>
    ))

    const toggleFaveFalse = (song) => {
        console.log(song)
        axios({
            url: `http://localhost:3000/songs/${song._id}/fav/remove`,
            method: "PUT",
            data: { isFavorite: false },
          })
          console.log(song)
        setIsUpdated(true)
        window.location.reload()
    }


    const destroy = async (song) => {
      await axios({
        url: `${apiUrl}/${song.song.id}`,
        method: 'DELETE'
      })
      setIsDeleted(true)
      window.location.reload()
    }
    
      if (!songs) {
        return <p>Loading...</p>
      }
      if (isDeleted) {
      return null
      } 


  return (
    <div className="playlist-container">
        <h1>Playlist 1</h1>
        <ul>{songList}</ul>
        <h2>Favorite Song List</h2>
        <ul>{favesList}</ul>
        <CreateForm 
            item={input}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    </div>
  );
}

export default PlaylistContainer;