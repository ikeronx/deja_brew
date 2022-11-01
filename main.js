/**
* LIGHTBOX
*/
import 'fslightbox';
import 'leaflet.smooth_marker_bouncing'

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

    // GLOBAL VARIABLE
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

// closes modal when overlay is clicked
overlay.addEventListener('click', toggleModal)

// closes modal when esc key is pressed
document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                toggleModal()
        }
});

/**************************/
/* MAP */
/**************************/
let map
const coords = [42.3633, -71.0582]
const flyToLocation = () => map.flyTo(coords, 19)

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
        iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
        className: 'hueChange',
        iconSize: [50, 50],
        popupAnchor: [0, -30],
    })
}).on('click', function () {
    this.toggleBouncing();
    flyToLocation()
    }
)
    .addTo(map)
    .bindPopup(
    L.popup({
            maxWidth: 300,
            minWidth: 90,
            autoClose: true,
            closeOnClick: false,
            className: `trip-popup`,
    })
)
.setPopupContent(`
    <strong>700 BC Red Brick Rd</strong><br> 
    Boston, MA <br>
    01876 <br>
    Tel: +1 (617) 754 43 7I


`).bounce();

/**************************/
/* ESRI LEAFLET FIND PLACES */
/**************************/
const apiKey = "AAPKdec506a2a45242168858f4b1bdd8bc83U3L-BFCyxIRNCMccr-A9Ww_dzna7wRD9H-Ap3GNvX8ZF6RBh9hXKqMgBFezUMC7a";

L.Control.PlacesSelect = L.Control.extend({
    onAdd: function (map) {
        const placeCategories = [
            ["", "Choose a category..."],
            ["Coffee shop", "Coffee shop"],
            ["Gas station", "Gas station"],
            ["Food", "Food"],
            ["Hotel", "Hotel"],
            ["Parks and Outdoors", "Parks and Outdoors"]
        ];

    const select = L.DomUtil.create("select", "");
        select.setAttribute("id", "optionsSelect");
        select.setAttribute("class", "btn");
    // select.setAttribute("style", "font-size: 18px;color:white;font-family:Josefin Sans;padding:4px 8px;background-color:#7B341E;");

    placeCategories.forEach((category) => {
        let option = L.DomUtil.create("option");
        option.value = category[0];
        option.innerHTML = category[1];
        select.appendChild(option);
    });
    return select;
    },

    onRemove: function (map) {
      // Nothing to do here
    }
});

L.control.placesSelect = function (opts) {
    return new L.Control.PlacesSelect(opts);
};

L.control.placesSelect({
    position: "topright"
}).addTo(map);

const layerGroup = L.layerGroup().addTo(map);

function showPlaces(category) {
    L.esri.Geocoding
    .geocode({
        apikey: apiKey
    })
    .category(category)
        .nearby(map.getCenter(), 10)
        .run(function (error, response) {
        if (error) {
            return;
        }
        layerGroup.clearLayers();
        response.results.forEach((searchResult) => {
            L.marker(searchResult.latlng, {
                    icon:
                    L.icon({
                    iconUrl: 'https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png',
                        // className: 'hueChange',
                        iconSize: [30, 30],
                    })
                })
                .addTo(layerGroup)
                .bindPopup(`<b>${searchResult.properties.PlaceName}</b></br>${searchResult.properties.Place_addr}`);
        });
    });
}

const select = document.getElementById("optionsSelect");
select.addEventListener("change", () => {
    if (select.value !== "") {
    showPlaces(select.value);
    }
});