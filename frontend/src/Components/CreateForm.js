import React from 'react'

const CreateForm = ({ item, handleSubmit, handleChange }) => {
  
  return (
    <form onSubmit={handleSubmit}>
        <label>Title</label><br />
        <input
        placeholder='add a title' value={item.title} name="title" onChange={handleChange}/>
        <br />
        
        <label>Artist</label><br />
        <input placeholder='add an artist' value={item.artist} name="artist" onChange={handleChange} />
        <br />
        
        <label>Duration</label><br />
        <input placeholder='add a duration' value={item.duration} name="duration" onChange={handleChange} />
        <br />
        <br />
        
        <button type="submit">ADD NEW SONG</button>
    </form>
    )
}

export default CreateForm
