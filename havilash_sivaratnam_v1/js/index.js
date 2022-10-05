const body = document.getElementsByTagName("body")[0];

// === dark / light mode ===
const navThemeButton = document.getElementById("nav__theme-button")

const darkThemeIcon = "uil-moon"
const lightThemeIcon = "uil-sun"

const light = "light"
const dark = "dark"

function loadTheme(){
    if (light == localStorage.getItem("theme")){
        navThemeButton.classList.add(darkThemeIcon)
        navThemeButton.classList.remove(lightThemeIcon)
        body.classList.remove("dark-theme");
    } else if (dark == localStorage.getItem("theme")) {
        navThemeButton.classList.remove(darkThemeIcon)
        navThemeButton.classList.add(lightThemeIcon)
        body.classList.add("dark-theme");
    }
}

window.onload = loadTheme();

navThemeButton.addEventListener("click", function () {
    localStorage.setItem("theme", 
        light == localStorage.getItem("theme") ? dark : light );
    loadTheme();
})

// ==== nav ====
const navBars = document.getElementById("nav__bars");
const aside = document.getElementById("aside");
const focusE = document.getElementById("focus");

function navbarFunc(){
    if (aside.classList.contains("aside--show")){
        aside.classList.remove("aside--show");
        navBars.classList.remove("nav__bars--close");

        navBars.classList.remove("uil-multiply");
        navBars.classList.add("uil-bars");

        focusE.classList.remove("focus--show");
    } else{
        aside.classList.add("aside--show");
        navBars.classList.add("nav__bars--close");

        navBars.classList.add("uil-multiply");
        navBars.classList.remove("uil-bars");

        focusE.classList.add("focus--show");
    }
}

navBars.addEventListener("click", navbarFunc);
focusE.addEventListener("click", navbarFunc);
