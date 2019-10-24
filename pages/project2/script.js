//Scroll
const aboutSection = document.querySelector('.about-us');

document.getElementById('learn-more').addEventListener('click', () => {
    aboutSection.scrollIntoView({block: 'start', behavior: 'smooth'});
});

function scrollFromNav() {
    const mainNav = document.querySelector('.main-nav');
    const serviceSection = document.querySelector('.services');
    const ourWorkSection = document.querySelector('.what-we-do');
    const blogSection = document.querySelector('.stories');
    const contactSection = document.querySelector('.map');

    mainNav.addEventListener('click', () => {
        const {target} = event;

        if (target.id === 'about') aboutSection.scrollIntoView({block: 'start', behavior: 'smooth'});

        if (target.id === 'service') serviceSection.scrollIntoView({block: 'start', behavior: 'smooth'});
    
        if (target.id === 'work') ourWorkSection.scrollIntoView({block: 'start', behavior: 'smooth'});

        if (target.id === 'blog') blogSection.scrollIntoView({block: 'start', behavior: 'smooth'});

        if (target.id === 'contact') contactSection.scrollIntoView({block: 'start', behavior: 'smooth'});
    });
}

//-------------------------------------------------------------------------------------------------------------------
//Tabs 

function setTabs() {
    const tabs = document.querySelectorAll('.description-name') 
     
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const content = document.querySelectorAll('.description-content');
            const arrows = document.querySelectorAll('.arrow');
            const tabNumber = tab.dataset.tab;
            const index = tabNumber - 1;

            content.forEach(item => {
                item.classList.remove('content-active');     
            });

            arrows.forEach(arrow => {
                arrow.classList.remove('active-arrow');
            });

            content[index].classList.add('content-active');
            arrows[index].classList.add('active-arrow');
        });
    });
}

//-------------------------------------------------------------------------------------------------------------------

(function() {
    scrollFromNav();
    setTabs();
})();

