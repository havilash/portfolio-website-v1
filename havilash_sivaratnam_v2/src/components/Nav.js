import React from 'react'
import './Nav.css'
import { FaBars, FaTimes, FaHome, FaUser, FaWrench, FaBriefcase, FaFileAlt, FaPhoneAlt, FaGithub, FaLinkedin, FaFacebook, FaMoon, FaSun } from 'react-icons/fa';

export default function Nav() {
  return (
    <div>
        <FaBars className="nav__bars nav__icon" id="nav__bars" />
        <aside className="aside" id="aside">
            <nav className="nav">
                <a href="./index.php" className="nav__logo">H</a>
                <div className="nav__menu" id="nav__menu">
                    <ul className="nav__list grid">
                        <li className="nav__item">
                            <a href="./index.php" className="nav__link" title="Home">
                                <FaHome className="nav__icon" />
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="./aboutme.php" className="nav__link" title="About Me">
                                <FaUser className="nav__icon" />
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#skills" className="nav__link" title="Skills">
                                <FaWrench className="nav__icon" />
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#services" className="nav__link" title="Services">
                                <FaBriefcase className="nav__icon" />
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#portfolio" className="nav__link" title="Portfolio">
                                <FaFileAlt className="nav__icon" />
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#contact" className="nav__link" title="Contact">
                                <FaPhoneAlt className="nav__icon" />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="nav__buttons">
                    <div className="nav__social">
                        <a href="#github" className="nav__social__link" target="_blank"><FaGithub className="nav__social__icon" /></a>
                        <a href="#linkedin" className="nav__social__link" target="_blank"><FaLinkedin className="nav__social__icon" /></a>
                        <a href="#facebook" className="nav__social__link" target="_blank"><FaFacebook className="nav__social__icon" /></a>
                    </div>
                    <FaMoon className="nav__theme-button nav__icon" id="nav__theme-button" /> {/* <!-- uil-moon / uil-sun --> */}
                </div>
            </nav>
        </aside>

    </div>
  )
}
