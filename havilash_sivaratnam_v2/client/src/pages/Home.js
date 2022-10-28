import React from 'react'
import Login from './Login'
import Nav from '../components/Nav'
import { ReactComponent as DevSVG } from '../media/dev.svg';
import {FaGithub, FaLinkedin, FaFacebook} from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='container flex justify-center items-center'>
        {/* Home */}
        <div className='content h-full
        grid grid-rows-2 grid-cols-1 gap-4 lg:grid-rows-1 lg:grid-cols-2 lg:gap-24
        items-center'>
          <div className='h-full w-full
          lg:flex lg:flex-col lg:justify-center'>
            <h1>Havilash Sivaratnam</h1>
            <p>
              Veniam cillum nostrud reprehenderit exercitation occaecat aliquip dolor cillum. Dolor ex nulla laboris ipsum et. Ex anim ad dolore id culpa aliqua consectetur. Labore proident sunt sunt amet. Labore duis velit quis est tempor minim mollit pariatur tempor aliqua esse sint ullamco. Eu eu fugiat id tempor dolore ad nulla sit.
            </p>

            <Link to="./contact" className='button py-3 px-7 mt-7 lg:hidden'>Contact</Link>
          </div>
          <div className='w-full h-full
          flex justify-center items-center 
          row-start-1 lg:col-start-2 gap-8'>
            <div className="home__social
            h-auto lg:hidden grid items-center gap-4">
                <a href="https://github.com/" className="home__link" target="_blank"><FaGithub className="home__icon" /></a>
                <a href="https://linkedin.com/" className="home__link" target="_blank"><FaLinkedin className="home__icon" /></a>
                <a href="https://facebook.com/" className="home__link" target="_blank"><FaFacebook className="home__icon" /></a>
            </div>
            <DevSVG className="fill-main-color-500 h-[80%]"/>
          </div>
        </div>
    </div>
  )
}