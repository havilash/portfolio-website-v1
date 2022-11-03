import React, { useEffect, useRef } from 'react';
import Nav from './components/Nav.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import SignUp from './pages/SignUp.js';
import AboutMe from './pages/AboutMe.js';
import Projects from './pages/Projects.js';
import Contact from './pages/Contact.js';
import Portfolio from './pages/Portfolio.js';
import Skills from './pages/Skills.js';
import Impressum from './pages/Impressum.js';
import ColorPalette from './components/ColorPalette.js';


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
            <Route exact path="/skills" element={<Skills/>} />
            <Route exact path="/projects" element={<Projects/>} />
            <Route exact path="/portfolio" element={<Portfolio/>} />
            <Route exact path="/contact" element={<Contact/>} />
            <Route exact path="/impressum" element={<Impressum/>} />
          </Routes>
        </section>
        <ColorPalette />
      </div>
   </BrowserRouter>
  );
}

export default App;
