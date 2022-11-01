/**
* LIGHTBOX
*/
import 'fslightbox';

/**************************/
/* STICKY NAV */
/**************************/
const navbar = document.querySelector('.navbar')
const sectionHeroEl = document.querySelector('#hero')
const sectionFeaturedElHeight = document.querySelector('#about').getBoundingClientRect().height; 

const obs = new IntersectionObserver( (entries) => {
    const [entry] = entries
    //* if the hero section is not inside the viewport ( (!ent.isIntersecting)) then show the sticky navigation else if it is then remove the sticky navigation
    if (!entry.isIntersecting) {
        navbar.style.transform = 'translateY(0)';
		navbar.style.borderRadius = '0 0 10px 10px';
        navbar.classList.add('sticky');
        
    }
    else {
        navbar.style.transform = 'translateY(18px)';
		navbar.style.borderRadius = '10px';
        navbar.classList.remove('sticky');
    }
}, {
    // In the viewport
    root: null, 
    threshold: 0, // the observer will start when the hero section is completely out of the viewport
    rootMargin: `-${sectionFeaturedElHeight}px`,
})
obs.observe(sectionHeroEl) // <- the entry

/**************************/
/* NAV LINKs FADE ON HOVER */
/**************************/
const nav = document.querySelector('.main-nav');
const handleHover = function (e) {
if (e.target.classList.contains('main-nav__link')) {
        const link = e.target;
        const siblings = link.closest('.main-nav__list').querySelectorAll('.main-nav__link');
        const logo = link.closest('.header').querySelector('.logo');

        siblings.forEach((el) => {
                if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this
    }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));


/**************************/
/* REVEALING SECTIONS WHILE SCROLLING */
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
        const [entry] = entries;

        if (!entry.isIntersecting) return;

        entry.target.classList.remove('section--hidden');
        observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
});

allSections.forEach(function (section) {
        sectionObserver.observe(section);
        section.classList.add('section--hidden');
});

/**************************/
/* MOBILE NAV FUNCTIONALITY */
/**************************/
const headerEl = document.querySelector('.navbar')
const btnNavEl = document.querySelector('.btn-mobile-nav')
btnNavEl.addEventListener('click', function () {
    headerEl.classList.toggle('nav-open');
    document.querySelectorAll('.main-nav__link').forEach((link) => {
        link.addEventListener('click', () => {
            headerEl.classList.remove('nav-open');
        })
    })
})

/**************************/
/* CAROUSEL */
/**************************/
// DATA
const reviews = [
    {
        id: 1,
        name: "Rebecca Glasgow",
        job: "Software Engineer at Instagram 🧑🏽‍💻",
        img:
        "https://64.media.tumblr.com/cfd6cac0e231470147c069b385eb61b0/3eb23cd9d087e809-88/s400x600/09b6aa0697d2200932dab765d22d0fdf13462335.jpg",
        text:
        "Amazing service and staff. You won’t find better latte in Boston.",
    },
    {
        id: 2,
        name: "Corey Malik",
        job: "Data Scientist at Google",
        img:
        "https://64.media.tumblr.com/a88372f75336a59b3c2702f17d4f7bb4/3eb23cd9d087e809-6c/s400x600/19d6021705fff66b9733c24248900efd81bdce13.jpg",
        text:
        " The best word to describe Déjà Brew is INCREDIBLE!",
    },
    {
        id: 3,
        name: "Jessica Paige ✌🏻",
        job: "Front-End Developer at Netflix",
        img:
        "https://64.media.tumblr.com/7a1270ee3d3010456e663db235856d8b/3eb23cd9d087e809-a0/s400x600/ab43fb61b4438644c9724c4d2ef1cfce53d3445a.jpg",
        text:
        "We visit Déjà Brew as often as we can & the food is delicious.",
    },
    ];

    // ELEMENTS
    const img = document.querySelector(".carousel__testimonial--img");
    const author = document.querySelector(".carousel__testimonial--author");
    const job = document.querySelector(".carousel__testimonial--job");
    const info = document.querySelector(".carousel__testimonial--text");

    const btnRight = document.querySelector('.carousel-btn--right');
    const btnLeft = document.querySelector('.carousel-btn--left');

    const dotContainer = document.querySelector('.dots')

    let currentItem = 0; 

    window.addEventListener('DOMContentLoaded', () => {
        renderPerson()
        createDots()
    });

    // FUNCTIONS:
    const renderPerson = () => {
            const item = reviews[currentItem];
            img.src = item.img; 
            author.textContent = item.name;
            job.textContent = item.job;
            info.textContent = item.text;
    };

    const goToSlide = (slideNum) => {
        const item = reviews[slideNum];
            img.src = item.img; 
            author.textContent = item.name;
            job.textContent = item.job;
            info.textContent = item.text;
    }

    const nextPerson = () => {
            currentItem++;
            if (currentItem > reviews.length - 1) currentItem = 0;
        renderPerson();
        activateDots(currentItem)
    }

    const prevPerson = () => {
            currentItem--;
            if (currentItem < 0) currentItem = reviews.length - 1;
        renderPerson();
        activateDots(currentItem)
    };

    const handleArrKeyClicked = (e) => {
        if (e.key === 'ArrowLeft') prevPerson()
        if (e.key === 'ArrowRight') nextPerson()
    }
    
    const createDots = () => {
        reviews.forEach((_, i) => {
            dotContainer.insertAdjacentHTML('beforeend', `<button class='dot' data-slide='${i}'>&nbsp;</button>`)
            // document.querySelectorAll('.dot').forEach((dot) => {
            //     dot.classList.remove('dot--active')
            // })
            document.querySelectorAll('.dot')[0].classList.add('dot--active')
        } )}

    const activateDots = (slide) => {
    // remove the dot--active class from each dot element
        document.querySelectorAll('.dot').forEach((dot) => {
            dot.classList.remove('dot--active')
        })

        //💡 then select the active slide and add the dot--active class to the corresponding dot element
        document.querySelector(`.dot[data-slide='${slide}'`).classList.add('dot--active')
    }

    const handleDotClicked = (e) => {
        if(e.target.classList.contains('dot') ) {
            const {slide} = e.target.dataset
            goToSlide(+slide)
            activateDots(slide)
        }
    }
    
    // EVENT HANDLERS:
    btnRight.addEventListener('click', nextPerson);
    btnLeft.addEventListener('click', prevPerson);
    document.addEventListener('keydown', handleArrKeyClicked)
    dotContainer.addEventListener('click', handleDotClicked)

/**************************/
/* MODAL */
/**************************/
const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const btnCloseModal = document.querySelector('.close-modal--btn')
const btnsOpenModal = document.querySelectorAll('.res-btn')

// toggles modal on / off
const toggleModal = () => {
        modal.classList.toggle('hidden')
        overlay.classList.toggle('hidden')
}
// opens modal
btnsOpenModal.forEach((btn) => btn.addEventListener('click', toggleModal))

// closes modal
btnCloseModal.addEventListener('click', toggleModal)

// hides overlay & click outside to close modal
overlay.addEventListener('click', toggleModal)

// closes modal by pressing the esc key
document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                toggleModal()
        }
});

/**************************/
/* MAP */
/**************************/
let map

const coords = [42.361145, -71.057083]

const flyToLocal = () => {
    map.flyTo(coords, 19)
}

map = L.map('map', {
    center: coords,
}).setView(coords, 13);

L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
    maxZoom: 19,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
    "pk.eyJ1IjoiYmxhY2tib3gxMSIsImEiOiJjbDF3OGxkYWIwMzcwM2pwOHQwMXQ2OGM0In0.6KQYul7J6Vbh4edRpmgIaA",
    }
).addTo(map);

L.marker(coords, {
    icon:
    L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png',
        className: 'hueChange',
        iconSize: [50, 50],
        popupAnchor: [0, -30],
    })
}).on('click', flyToLocal)
    .addTo(map)
    .bindPopup(
    L.popup({
            maxWidth: 300,
            minWidth: 90,
            autoClose: false,
            closeOnClick: false,
            className: `trip-popup`,
    })
)
.setPopupContent(`
    <strong>700 BC Red Brick Rd</strong><br> 
    Boston MA <br>
    01876

`).openPopup()