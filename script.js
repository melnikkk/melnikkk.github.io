//show/hide side elements

let scrollTopBtn = document.querySelector('.scroll-top');

function showSideElements() {
    let y = window.scrollY;
    let displayHeight = window.innerHeight;
    let sideBar = document.getElementById('side-menu');

    if (y > displayHeight) {
        sideBar.className = 'side-bar show';
    } else {
        sideBar.className = 'side-bar hide';
    }
}

window.addEventListener('scroll', showSideElements);

//---------------------------------------------------------------------
//first screen menu
let menu = document.querySelector('.main-menu');
//first screen
let firstScreen = document.querySelector('.first-screen');
//scroll down button
let scrollDownBtn = document.querySelector('.down-button');
//portfolio button
let portfolioBtn = document.getElementById('portfolioBtn');
//section about me
let aboutMe = document.querySelector('.about-me');
//skills section
let skills = document.querySelector('.my-skills');
//portfolio section
let myWorks = document.querySelector('.my-works');
//footer menu
let footerMenu = document.querySelector('.footer-nav');

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
    let burgerBtn = document.querySelector('.menu-icon');
    let burgerNav = document.querySelector('.main-menu'); 
    let links = document.querySelectorAll('.nav-link');

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
    let projects = document.querySelectorAll('.work-block');

    function addLink(projectIndex, link) {
        projects[projectIndex].addEventListener('click', () => {
            window.open(link, "_blank");
        });
    }

    addLink(0, 'pages/project1/activebox.html');
    addLink(1, 'pages/project2/mogo.html');
    addLink(2, 'pages/toDoList/todolist.html');
}

//---------------------------------------------------------------------
//call functions

(function() {
    burgerMenu();

    scrollFunction(scrollDownBtn, aboutMe);
    scrollFunction(portfolioBtn, myWorks);
    scrollFunction(scrollTopBtn, firstScreen);

    showPage();
})();

//---------------------------------------------------------------------