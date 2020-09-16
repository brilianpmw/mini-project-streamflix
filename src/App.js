import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Movie from './movie'



function App() {
  return (

    <BrowserRouter>
      <Route path='/' exact strict component={Movie} />
      <Route path='/detail/:idfilm' strict component={Movie} />
      <Route path='/search' strict component={Movie} />
      <Route path='/search/:idfilm' strict component={Movie} />


    </BrowserRouter>


  );
}

export default App;
