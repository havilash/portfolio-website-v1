import React, {useState, useRef, useEffect, useReducer} from 'react'
import { FaSignInAlt, FaBars, FaTimes, FaHome, FaUser, FaWrench, FaBriefcase, FaFileAlt, FaPhoneAlt, FaGithub, FaLinkedin, FaFacebook, FaMoon, FaSun, FaFileContract } from 'react-icons/fa';
import { Link, Navigate } from 'react-router-dom';
import { logout } from '../functions';
import { useNavigate, useLocation } from 'react-router-dom'



export default function Nav({ foregroundRef }) {
    const [ignore, forceUpdate] = useReducer(x => x + 1, 0);
    const navigate = useNavigate();
    const location = useLocation();

    const [theme, setTheme] = useState(null)
    const [isNavOpen, setIsNavOpen] = useState(false)

    const asideRef = useRef(null);

    const navMoonRef = useRef(null);
    const navSunRef = useRef(null);

    function navOpenClose(){
        setIsNavOpen(!isNavOpen);
    }

    useEffect(() => {
        forceUpdate()
    }, [location])

    useEffect(() => {
        foregroundRef.current.onclick = () => {
            setIsNavOpen(false);
        };
    }, [])

    useEffect(() => {
        loadTheme();
    }, [theme])

    useEffect(() => {
        isNavOpen ? asideRef.current.classList.add("left-0") : asideRef.current.classList.remove("left-0");
        isNavOpen ? foregroundRef.current.classList.remove("hidden") : foregroundRef.current.classList.add("hidden");
    }, [isNavOpen])

    function changeTheme(theme){
        localStorage.theme = theme;
        loadTheme()
        setTheme(theme)
    }

    function loadTheme(){
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            navMoonRef.current.classList.add("hidden");
            navSunRef.current.classList.remove("hidden");
          } else {
            document.documentElement.classList.remove('dark');
            navMoonRef.current.classList.remove("hidden");
            navSunRef.current.classList.add("hidden");
          }
    }

    async function handleLogout() {
        await logout()
        navigate("/login")
    }

    function renderLogo() {
        if (localStorage.user == undefined) 
            return <Link to="/login" title="Login" className="nav__logo nav__icon p-3 m-4 text-white button hover:text-white"><FaSignInAlt /></Link>;
        try {
            return <Link onClick={handleLogout} to="#login" title="Logout" className="nav__logo nav__icon p-3 m-4">{JSON.parse(localStorage.user)?.username?.charAt(0).toUpperCase()}</Link>
        } catch {
            logout()
            forceUpdate()
        }
    }

    function renderOpenCloseIcon() {
        if (isNavOpen)
            return <FaTimes onClick={() => navOpenClose()} 
            className="nav__icon absolute left-nav-width sm:left-0 m-10 z-[45] 
            transition-all text-3xl" />
        else
            return <FaBars onClick={() => navOpenClose()} 
            className="nav__icon absolute left-nav-width sm:left-0 m-10 z-[45] 
            transition-all text-3xl" />
    }

    function renderPortfolioIcon() {
        if (localStorage.user == undefined)
            return <FaFileAlt className="nav__icon text-text-color-700 hover:text-text-color-700 dark:text-text-color-100 dark:hover:text-text-color-100 cursor-default" />
        return <FaFileAlt className="nav__icon" />
    }

    return (
        <div>
            <aside ref={asideRef} className="aside" id="aside">

                {renderOpenCloseIcon()}

                <nav className="nav 
                relative w-full h-full shadow-xl bg-nav-color
                flex flex-col justify-between items-center z-50
                transition-all">
                    {renderLogo()}
                    <ul className="nav__list
                    gap-1">
                        <li className="nav__item">
                            <Link to="/" className="nav__link nav__icon" title="Home">
                                <FaHome className="nav__icon" />
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/aboutme" className="nav__link" title="About Me">
                                <FaUser className="nav__icon" />
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/skills" className="nav__link" title="Skills">
                                <FaWrench className="nav__icon" />
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/projects" className="nav__link" title="Projects">
                                <FaBriefcase className="nav__icon" />
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/portfolio" className="nav__link" title="Portfolio">
                                {renderPortfolioIcon()}
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/contact" className="nav__link" title="Contact">
                                <FaPhoneAlt className="nav__icon" />
                            </Link>
                        </li>
                    </ul>
                    <div className="nav__buttons
                    p-4 h-auto flex flex-col justify-between gap-6">
                        <div className="nav__social
                        h-auto hidden lg:block grid items-center">
                            <a href="https://github.com/" className="nav__social__link nav__link" target="_blank"><FaGithub className="nav__social__icon nav__icon" /></a>
                            <a href="https://linkedin.com" className="nav__social__link nav__link" target="_blank"><FaLinkedin className="nav__social__icon nav__icon" /></a>
                            <a href="https://facebook.com" className="nav__social__link nav__link" target="_blank"><FaFacebook className="nav__social__icon nav__icon" /></a>
                        </div>
                        <Link to="/impressum" className="nav__link" title="Impressum">
                                <FaFileContract className="nav__icon text-2xl sm:text-xl" />
                        </Link>
                        <i ref={navMoonRef} className=""> <FaMoon onClick={() => changeTheme('dark')} className="nav__theme-button nav__icon" id="nav__theme-button" /> </i>
                        <i ref={navSunRef} className="hidden"> <FaSun onClick={() => changeTheme('light')} className="nav__theme-button nav__icon" id="nav__theme-button" /> </i>
                    </div>
                </nav>
            </aside>

        </div>
    )
}
