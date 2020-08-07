import React from 'react';
import './App.css';
import Header from './Components/Header'
import PlaylistContainer from './Components/PlaylistContainer';
import { Route } from 'react-router-dom'



function App() {
  return (
    <div className="App">
      <Header />
      {/* <Route exact path='/' component={PlaylistContainer} /> */}
      <PlaylistContainer />
    </div>
  );
}

export default App;