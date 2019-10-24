//show/hide mobile menu

const menu = document.querySelector('.main-nav');
const menuBtn = document.getElementById('menu-button');

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
});

//--------------------------------------------------------------
//scroll to
//getting menu elements

const featuresSection = document.getElementById('features');
const worksSection = document.getElementById('works');
const teamSection = document.getElementById('team');
const reviewSection = document.getElementById('reviews');
const downloadSection = document.getElementById('download');
const toFeatureBtn = document.getElementById('toFeatureBtn');

menu.addEventListener('click', (event) => {
    const {target} = event;
    event.preventDefault();

    if (target.id === 'toFeatures') {
        featuresSection.scrollIntoView({block: 'center', behavior: 'smooth'});
    }

    if (target.id === 'toWorks') {
        worksSection.scrollIntoView({block: 'center', behavior: 'smooth'});
    }

    if (target.id === 'toTeam') {
        teamSection.scrollIntoView({block: 'center', behavior: 'smooth'});
    }

    if (target.id === 'toReview') {
        reviewSection.scrollIntoView({block: 'center', behavior: 'smooth'});
    }

    if (target.id === 'toDownload') {
        downloadSection.scrollIntoView({block: 'center', behavior: 'smooth'});
    }
});

toFeatureBtn.addEventListener('click', (event) => {
    event.preventDefault();
    featuresSection.scrollIntoView({block: 'start', behavior: 'smooth'});
});
//--------------------------------------------------------------
//tabs

function setTabs() {
    const tabs = document.querySelectorAll('.tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabsBlock = tab.parentElement;
            const tabsContainer = tabsBlock.parentElement;
            const tabNumber = tab.dataset.fortab;
            const tabToActivate = tabsContainer.querySelector(`.review[data-tab='${tabNumber}']`);

            tabsBlock.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active-tab');  
            });

            tabsContainer.querySelectorAll('.review').forEach(review => {
                review.classList.remove('review-active')
            });

            tab.classList.add('active-tab');
            tabToActivate.classList.add('review-active');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setTabs();
});