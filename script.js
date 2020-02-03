//show/hide side elements

const scrollTopBtn = document.querySelector('.scroll-top');

function showSideElements() {
    let y = window.scrollY;
    const displayHeight = window.innerHeight;
    const sideBar = document.getElementById('side-menu');

    if (y > displayHeight) {
        sideBar.className = 'side-bar show';
    } else {
        sideBar.className = 'side-bar hide';
    }
}

window.addEventListener('scroll', showSideElements);

//---------------------------------------------------------------------
//first screen menu
const menu = document.querySelector('.main-menu');
//first screen
const firstScreen = document.querySelector('.first-screen');
//scroll down button
const scrollDownBtn = document.querySelector('.down-button');
//portfolio button
const portfolioBtn = document.getElementById('portfolioBtn');
//section about me
const aboutMe = document.querySelector('.about-me');
//skills section
const skills = document.querySelector('.my-skills');
//portfolio section
const myWorks = document.querySelector('.my-works');
//footer menu
const footerMenu = document.querySelector('.footer-nav');

menu.addEventListener('click', (event) => {
    const {target} = event;

    if (!target.matches('a')) {
        return;
    }

    if (target.id === 'mainPaigeLink') {
        event.preventDefault();
        firstScreen.scrollIntoView({block: 'start', behavior: 'smooth'}); 
        return;
    }

    if (target.id === 'aboutMeLink') {
        event.preventDefault();
        aboutMe.scrollIntoView({block: 'center', behavior: 'smooth'}); 
        return;
    }

    if (target.id === 'skillsLink') {
        event.preventDefault();
        skills.scrollIntoView({block: 'center', behavior: 'smooth'}); 
        return;
    }

    if (target.id === 'portfolioLink') {
        event.preventDefault();
        myWorks.scrollIntoView({block: 'center', behavior: 'smooth'}); 
        return;
    }
});

footerMenu.addEventListener('click', () => {
    const {target} = event;

    if (!target.matches('a')) {
        return;
    }

    if (target.id === 'mainPageFooterLink') {
        event.preventDefault();
        firstScreen.scrollIntoView({block: 'start', behavior: 'smooth'}); 
        return;
    }

    if (target.id === 'aboutMeFooterLink') {
        event.preventDefault();
        aboutMe.scrollIntoView({block: 'center', behavior: 'smooth'}); 
        return;
    }

    if (target.id === 'skillsFooterLink') {
        event.preventDefault();
        skills.scrollIntoView({block: 'center', behavior: 'smooth'}); 
        return;
    }

    if (target.id === 'portfolioFooterLink') {
        event.preventDefault();
        myWorks.scrollIntoView({block: 'center', behavior: 'smooth'}); 
        return;
    }
});

function scrollFunction(scrollFrom, scrollTo) {
    scrollFrom.addEventListener('click', () => {
       scrollTo.scrollIntoView({block: 'center', behavior: 'smooth'}); 
    });
}

//---------------------------------------------------------------------
//show/hide mobile menu

function burgerMenu() {
    const burgerBtn = document.querySelector('.menu-icon');
    const burgerNav = document.querySelector('.main-menu'); 
    const links = document.querySelectorAll('.nav-link');

    burgerBtn.addEventListener('click', () => {
        burgerNav.classList.toggle('active');
    });

    links.forEach((link, i) => {
        if (link.style.animation) link.style.animation = '';
        else link.style.animation = `animateLink 0.5s ease forwards ${i / 7}s`;
    });
}

//---------------------------------------------------------------------
//my works

function showPage() {
    const projects = document.querySelectorAll('.work-block');

    function addLink(projectIndex, link) {
        projects[projectIndex].addEventListener('click', () => {
            if (!event.target.classList.contains('fab')) window.open(link, "_blank");
        });
    }

    addLink(0, 'pages/project1/activebox.html');
    addLink(1, 'pages/project2/mogo.html');
    addLink(2, 'pages/toDoList/todolist.html');
    addLink(3, 'pages/weatherApp/weather_app.html');
    addLink(4, 'pages/calculator/calculator.html');
    addLink(5, 'pages/game/game.html');
}
//---------------------------------------------------------------------
//show elements on scroll

function showOnScroll() {
    const scroll = window.requestAnimationFrame || function(callback) { window.setTimeout(callback, 1000 / 60)};
    const elemShow = document.querySelectorAll('.show-on-scroll');

    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document. documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document. documentElement.clientWidth)
        );
      }

    function loop() {
        elemShow.forEach(elem => {
            if (isElementInViewport(elem)) {
                elem.classList.add('is-visible');
            } else {
                elem.classList.remove('is-visible');
            }
        })

        scroll(loop);
    }

    loop();
}

//---------------------------------------------------------------------
//call functions

(function() {
    burgerMenu();

    scrollFunction(scrollDownBtn, aboutMe);
    scrollFunction(portfolioBtn, myWorks);
    scrollFunction(scrollTopBtn, firstScreen);

    showPage();

    showOnScroll();
})();

//---------------------------------------------------------------------