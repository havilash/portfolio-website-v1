// ===== nav =====

const navMenu = document.getElementById('nav__menu');
const navOpen = document.getElementById('nav__open');
const navClose = document.getElementById('nav__close');
const navLinks = document.querySelectorAll('.nav__link');

if (navOpen){
    navOpen.addEventListener('click', () => {
        navMenu.classList.add('nav__menu--show');
    });
}
if (navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('nav__menu--show');
    });
}

navLinks.forEach(i => {
	i.addEventListener('click', () => {
        navMenu.classList.remove('nav__menu--show');
    });
});

