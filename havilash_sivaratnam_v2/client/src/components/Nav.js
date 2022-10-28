import React, {useState, useRef, useEffect} from 'react'
import { FaSignInAlt, FaBars, FaTimes, FaHome, FaUser, FaWrench, FaBriefcase, FaFileAlt, FaPhoneAlt, FaGithub, FaLinkedin, FaFacebook, FaMoon, FaSun } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Nav({ foregroundRef }) {

    const [theme, setTheme] = useState(null)
    const [isNavOpen, setIsNavOpen] = useState(false)

    const asideRef = useRef(null);

    const navMoonRef = useRef(null);
    const navSunRef = useRef(null);

    function navOpenClose(){
        setIsNavOpen(!isNavOpen);
    }

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
        const rawResponse = await fetch('/api/auth/logout', {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: localStorage.refreshToken })
        });

        if (rawResponse.ok){
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
            // window.location.href = "/login";
        }    
    }

    function renderLogo() {
        if (localStorage.user == undefined) 
            return <Link to="/login" title="Login" className="nav__logo nav__icon p-3 m-4 text-white button hover:text-white"><FaSignInAlt /></Link>;   // <MdOutlineLogin /> 
        else
            return <Link onClick={handleLogout} to="/login" title="Logout" className="nav__logo nav__icon p-3 m-4">{JSON.parse(localStorage.user)?.username?.charAt(0).toUpperCase()}</Link>
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
                                <FaFileAlt className="nav__icon" />
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
                        <i ref={navMoonRef} className=""> <FaMoon onClick={() => changeTheme('dark')} className="nav__theme-button nav__icon" id="nav__theme-button" /> </i>
                        <i ref={navSunRef} className="hidden"> <FaSun onClick={() => changeTheme('light')} className="nav__theme-button nav__icon" id="nav__theme-button" /> </i>
                    </div>
                </nav>
            </aside>

        </div>
    )
}
