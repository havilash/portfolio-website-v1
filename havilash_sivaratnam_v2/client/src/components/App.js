import React, { useEffect, useRef } from 'react';
import Nav from './Nav.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home.js';
import AboutMe from '../pages/AboutMe.js';
import SignUp from '../pages/SignUp.js';
import Login from '../pages/Login.js';

function App() {
  var foregroundRef = useRef(null);

  return (
    <BrowserRouter>
      <div className="App h-full w-full">
        <div ref={foregroundRef} className='sm:hidden foreground'></div>
        <Nav foregroundRef={foregroundRef}/>
        <section className='section content flex justify-center items-center'>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element={<SignUp/>} />
            <Route exact path="/aboutme" element={<AboutMe/>} />
          </Routes>
        </section>
      </div>
   </BrowserRouter>
  );
}

export default App;
