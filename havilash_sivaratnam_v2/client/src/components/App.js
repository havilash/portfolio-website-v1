import React from 'react';
import Nav from './Nav.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home.js';
import AboutMe from '../pages/AboutMe.js';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <div className='content'>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/aboutme" element={<AboutMe/>} />
          </Routes>
        </div>
      </div>
   </BrowserRouter>
  );
}

export default App;
