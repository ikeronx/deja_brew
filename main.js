/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import '@skyraptor/leaflet.bouncemarker';
import 'fslightbox';
import 'leaflet.smooth_marker_bouncing';

/** *********************** */
/* STICKY NAV */
/** *********************** */
const navbar = document.querySelector('.navbar');
const sectionHeroEl = document.querySelector('#hero');
const sectionFeaturedElHeight = document.querySelector('#about').getBoundingClientRect().height;

const obs = new IntersectionObserver((entries) => {
  const [entry] = entries;
  //* if hero section is not inside the viewport ( (!ent.isIntersecting)) then show the sticky navigation else if it is then remove the sticky navigation
  if (entry.isIntersecting) {
    navbar.style.transform = 'translateY(18px)';
    navbar.style.borderRadius = '10px';
    navbar.classList.remove('sticky');
  } else {
    navbar.style.transform = 'translateY(0px)';
    navbar.style.borderRadius = '0 0 10px 10px';
    navbar.classList.add('sticky');
  }
}, {
  // In the viewport
  root: null,
  threshold: 0, // the observer will start when the hero section is completely out of the viewport
  // rootMargin: `-${sectionFeaturedElHeight}px`,
});
obs.observe(sectionHeroEl); // <- the entry

/** *********************** */
/* NAV LINKs FADE ON HOVER */
/** *********************** */
const nav = document.querySelector('.main-nav');
const handleHover = function (e) {
  if (e.target.classList.contains('main-nav__link')) {
    const link = e.target;
    const siblings = link.closest('.main-nav__list').querySelectorAll('.main-nav__link');
    const logo = link.closest('.header').querySelector('.logo');

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

/** *********************** */
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

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

/** *********************** */
/* MOBILE NAV FUNCTIONALITY */
/** *********************** */
const headerEl = document.querySelector('.navbar');
const btnNavEl = document.querySelector('.btn-mobile-nav');
btnNavEl.addEventListener('click', () => {
  headerEl.classList.toggle('nav-open');
  document.querySelectorAll('.main-nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      headerEl.classList.remove('nav-open');
    });
  });
});

/** *********************** */
/* CAROUSEL */
/** *********************** */
// DATA
const reviews = [
  {
    id: 1,
    name: 'Rebecca Glasgow',
    job: 'Software Engineer at Instagram 🧑🏽‍💻',
    img:
        'https://64.media.tumblr.com/cfd6cac0e231470147c069b385eb61b0/3eb23cd9d087e809-88/s400x600/09b6aa0697d2200932dab765d22d0fdf13462335.jpg',
    text:
        'Amazing service and staff. You won’t find better latte in Boston.',
  },
  {
    id: 2,
    name: 'Corey Malik',
    job: 'Data Scientist at Google',
    img:
        'https://64.media.tumblr.com/a88372f75336a59b3c2702f17d4f7bb4/3eb23cd9d087e809-6c/s400x600/19d6021705fff66b9733c24248900efd81bdce13.jpg',
    text:
        ' The best word to describe Déjà Brew is INCREDIBLE!',
  },
  {
    id: 3,
    name: 'Jessica Paige ✌🏻',
    job: 'Front-End Developer at Netflix',
    img:
        'https://64.media.tumblr.com/7a1270ee3d3010456e663db235856d8b/3eb23cd9d087e809-a0/s400x600/ab43fb61b4438644c9724c4d2ef1cfce53d3445a.jpg',
    text:
        'We visit Déjà Brew as often as we can & the food is delicious.',
  },
];

// ELEMENTS
const img = document.querySelector('.carousel__testimonial--img');
const author = document.querySelector('.carousel__testimonial--author');
const job = document.querySelector('.carousel__testimonial--job');
const info = document.querySelector('.carousel__testimonial--text');

const btnRight = document.querySelector('.carousel-btn--right');
const btnLeft = document.querySelector('.carousel-btn--left');

const dotContainer = document.querySelector('.dots');

// GLOBAL VARIABLE
let currentItem = 0;

window.addEventListener('DOMContentLoaded', () => {
  renderPerson();
  createDots();
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
};

const nextPerson = () => {
  currentItem++;
  if (currentItem > reviews.length - 1) currentItem = 0;
  renderPerson();
  activateDots(currentItem);
};

const prevPerson = () => {
  currentItem--;
  if (currentItem < 0) currentItem = reviews.length - 1;
  renderPerson();
  activateDots(currentItem);
};

const handleArrKeyClicked = (e) => {
  if (e.key === 'ArrowLeft') prevPerson();
  if (e.key === 'ArrowRight') nextPerson();
};

const createDots = () => {
  reviews.forEach((_, i) => {
    dotContainer.insertAdjacentHTML('beforeend', `<button class='dot' data-slide='${i}'>&nbsp;</button>`);
    // document.querySelectorAll('.dot').forEach((dot) => {
    //     dot.classList.remove('dot--active')
    // })
    document.querySelectorAll('.dot')[0].classList.add('dot--active');
  });
};

const activateDots = (slide) => {
  // remove the dot--active class from each dot element
  document.querySelectorAll('.dot').forEach((dot) => {
    dot.classList.remove('dot--active');
  });

  // 💡 then select the active slide and add the dot--active class to the corresponding dot element
  document.querySelector(`.dot[data-slide='${slide}'`).classList.add('dot--active');
};

const handleDotClicked = (e) => {
  if (e.target.classList.contains('dot')) {
    const { slide } = e.target.dataset;
    goToSlide(+slide);
    activateDots(slide);
  }
};

// EVENT HANDLERS:
btnRight.addEventListener('click', nextPerson);
btnLeft.addEventListener('click', prevPerson);
document.addEventListener('keydown', handleArrKeyClicked);
dotContainer.addEventListener('click', handleDotClicked);

/** *********************** */
/* MODAL */
/** *********************** */
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal--btn');
const btnsOpenModal = document.querySelectorAll('.res-btn');

// toggles modal on / off
const toggleModal = () => {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
};

// opens modal
btnsOpenModal.forEach((btn) => btn.addEventListener('click', toggleModal));

// closes modal
btnCloseModal.addEventListener('click', toggleModal);

// closes modal when overlay is clicked
overlay.addEventListener('click', toggleModal);

// closes modal when esc key is pressed
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    toggleModal();
  }
});

/** *********************** */
/* MAP */
/** *********************** */
let map;
const coords = [42.3633, -71.0582];
const flyToLocation = (markerCoords, zoomLevel) => map.flyTo(markerCoords, zoomLevel);

map = L.map('map', {
  center: coords,
  zoomControl: false,
}).setView(coords, 13);

L.tileLayer(
  'https://api.mapbox.com/styles/v1/keron31/cla4i5g51001t15rr03ghahqv/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2Vyb24zMSIsImEiOiJjbDFpaG1yMmgwYzk2M2ltMWU3eTI5NW5nIn0.hNnKi3Dl8KiNEsZC8IR1_A',
  {
    maxZoom: 19,
    // id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    // accessToken:
    // 'pk.eyJ1IjoiYmxhY2tib3gxMSIsImEiOiJjbDF3OGxkYWIwMzcwM2pwOHQwMXQ2OGM0In0.6KQYul7J6Vbh4edRpmgIaA',
  },
).addTo(map);

L.control.zoom({ position: 'bottomleft' }).addTo(map);

const markerIcon = {
  icon: L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  }),
};

const animatedCircleIcon = {
  icon: L.divIcon({
    className: 'css-icon',
    html: '<div class="gps_ring"></div>',
    iconSize: [18, 22],
  }),
};

L.marker(coords, markerIcon).on('click', function () {
  this.bounce(2);
  flyToLocation(coords, 19);
})
  .addTo(map)
  .bindPopup(
    L.popup({
      maxWidth: 300,
      minWidth: 90,
      autoClose: false,
      closeOnClick: false,
      className: 'main-popup',
    }),
  )
  .setPopupContent(`
    <strong>Déjà Brew</strong><br> 
    700 BC Red Brick Rd<br> 
    Boston, MA, 01876 <br>
    Tel: +1 (617) 754 43 7I
`)
  .openPopup()._icon.classList.add('hueChangeBrown');
L.marker(coords, animatedCircleIcon).on('click', () => flyToLocation(coords, 19))
  .addTo(map);

/** *********************** */
/* ESRI LEAFLET FIND PLACES */
/** *********************** */
const apiKey = 'AAPKdec506a2a45242168858f4b1bdd8bc83U3L-BFCyxIRNCMccr-A9Ww_dzna7wRD9H-Ap3GNvX8ZF6RBh9hXKqMgBFezUMC7a';

L.Control.PlacesSelect = L.Control.extend({
  onAdd(map) {
    const placeCategories = [
      ['', 'Find places nearby'],
      ['Coffee shop', 'Coffee shop'],
      ['Airport', 'Airport'],
      ['Nightlife Spot', 'Nightlife Spot'],
      ['Arts and Entertainment', 'Arts & Entertainment'],
      ['Shops and Service', 'Shops & Service'],
      ['Gas station', 'Gas station'],
      ['Travel and Transport', 'Travel & Transport'],
      ['Train station', 'Train station'],
      ['Food', 'Food'],
      ['Hotel', 'Hotel'],
      ['Parks and Outdoors', 'Parks & Outdoors'],
      ['Hospital', 'Hospital'],
    ];

    const select = L.DomUtil.create('select', '');
    select.setAttribute('id', 'optionsSelect');
    select.setAttribute('class', 'btn');
    select.setAttribute('style', 'padding:16px 3.2px;text-align:center;max-width: 250px;');
    // select.setAttribute("style", "font-size: 18px;color:white;font-family:Josefin Sans;padding:4px 8px;background-color:#7B341E;");

    placeCategories.forEach((category) => {
      const option = L.DomUtil.create('option');
      option.value = category[0];
      option.innerHTML = category[1];
      select.appendChild(option);
    });
    return select;
  },

  onRemove(map) {
    // Nothing to do here
  },
});

L.control.placesSelect = function (opts) {
  return new L.Control.PlacesSelect(opts);
};

L.control.placesSelect({
  position: 'bottomright',
}).addTo(map);

const layerGroup = L.layerGroup().addTo(map);

function showPlaces(category) {
  L.esri.Geocoding
    .geocode({
      apikey: apiKey,
    })
    .category(category)
    .nearby(map.getCenter(), 10)
    .run((error, response) => {
      if (error) {
        return;
      }
      layerGroup.clearLayers();
      response.results.forEach((searchResult) => {
        L.marker(searchResult.latlng, {
          bounceOnAdd: true,
        }).on('click', function () {
          this.bounce(3);
          flyToLocation(searchResult.latlng, 16);
        })
          .addTo(layerGroup)
          .bindPopup(
            L.popup({
              maxWidth: 300,
              minWidth: 30,
              autoClose: true,
              closeOnClick: true,
              className: 'places-popup',
            }),
          )
          .setPopupContent(`<strong class='places'>${searchResult.properties.PlaceName}</strong></br>${searchResult.properties.Place_addr}`)
          .openPopup()
          .bounce(1)
          ._icon.classList.add('hueChangeBlue');
      });
    });
}

const select = document.getElementById('optionsSelect');
select.addEventListener('change', () => {
  if (select.value !== '') {
    showPlaces(select.value);
  }
});

/** ******************************** */
/* ESRI LEAFLET SEARCH FOR PLACES */
/** ******************************** */
// create the geocoding control and add it to the map
const searchControl = L.esri.Geocoding.geosearch({
  position: 'topleft',
  placeholder: 'Find address or place',
  useMapBounds: false,

  // Set the providers to arcgisOnlineProvider in order to access the       geocoding service.
  providers: [
    L.esri.Geocoding.arcgisOnlineProvider({
      apikey: apiKey,
      nearby: {
        lat: 42.3633,
        lng: -71.0582,
      },
    }),
  ],
}).addTo(map);

// Display the results of the search using a Marker and Popup
// 1. Add a LayerGroup to the map to contain the geocoding results.
const results = L.layerGroup().addTo(map);

// 2. Create an event handler to access the data from the search results. Call the clearLayers method to remove the previous data from the LayerGroup.
searchControl.on('results', (data) => {
  results.clearLayers();

  // 3. Create a loop that adds the coordinates of a selected search       results to a Marker.
  for (let i = data.results.length - 1; i >= 0; i--) {
    const marker = L.marker(data.results[i].latlng);

    // 4. Add a lngLatString variable that stores the rounded search result   coordinates. Append the bindPopup method to the marker to display the     coordinates and address of the result.
    const lngLatString = `${Math.round(data.results[i].latlng.lng * 100000) / 100000}, ${
      Math.round(data.results[i].latlng.lat * 100000) / 100000
    }`;
    marker.bindPopup(`<p>${data.results[i].properties.LongLabel}</p>`);
    marker.openPopup()._icon.classList.add('hueChangeBrown');
    results.addLayer(marker);
  }
});

/** *********************** */
/* LEAFLET ROUTING */
/** *********************** */
L.Routing.control({
  position: 'topright',
  show: false,
  waypoints: [null],
  showAlternatives: true,
  lineOptions: {
    styles: [{ color: '#7B341E', opacity: 1, weight: 5 }],
  },
  altLineOptions: {
    styles: [
      { color: '955d4b', opacity: 0.15, weight: 9 },
      { color: 'white', opacity: 0.8, weight: 6 },
      { color: '955d4b', opacity: 0.5, weight: 6 },
    ],
  },
  createMarker: (i, wp) => {
    if (i === 0) {
      return L.marker(wp.latLng, {
        icon: L.icon.pulse({
          iconUrl: 'https://unpkg.com/leaflet@1.9.2/dist/images/marker-icon-2x.png',
          color: '#7B341E',
          fillColor: '#7B341E',
        }),
        draggable: true,
        bounceOnAdd: false,
        bounceOnAddOptions: {
          duration: 1000,
          height: 800,
        },

      });
    }
    return L.marker(wp.latLng, {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        className: 'hueChangeBrown',
      }),
      draggable: true,
      bounceOnAdd: false,
      bounceOnAddOptions: {
        duration: 1000,
        height: 800,
      },
    });
  },
  routeWhileDragging: true,
  geocoder: L.Control.Geocoder.nominatim(),
}).addTo(map);

/** *********************** */
/* ESRI LEAFLET FIND A ROUTE */
/** *********************** */
const directions = document.createElement('div');
directions.id = 'directions';
directions.innerHTML = 'Click on the map to create a start and end for the route.';
// document.body.appendChild(directions);

const startLayerGroup = L.layerGroup().addTo(map);
const endLayerGroup = L.layerGroup().addTo(map);
const routeLines = L.layerGroup().addTo(map);

let currentStep = 'start';
let startCoords;
let endCoords;

function updateRoute() {
  // Create the arcgis-rest-js authentication object to use later.
  const authentication = arcgisRest.ApiKeyManager.fromKey(apiKey);

  // make the API request
  arcgisRest
    .solveRoute({
      stops: [startCoords, endCoords],
      endpoint: 'https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve',
      authentication,
    })
    .then((response) => {
      routeLines.clearLayers();
      L.geoJSON(response.routes.geoJson).addTo(routeLines);

      const directionsHTML = response.directions[0].features.map((f) => f.attributes.text).join('<br/>');
      directions.innerHTML = directionsHTML;
      startCoords = null;
      endCoords = null;
    })

    .catch((error) => {
      console.error(error);
      alert('There was a problem using the route service. See the console for details.');
    });
}

map.on('dblclick', (e) => {
  const coordinates = [e.latlng.lng, e.latlng.lat];

  if (currentStep === 'start') {
    startLayerGroup.clearLayers();
    endLayerGroup.clearLayers();
    routeLines.clearLayers();

    L.marker(
      e.latlng,
      {
        bounceOnAdd: true,
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [10, 41],
          popupAnchor: [2, -40],
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
        }),
      },
    )
      .on('click', function () {
        this.remove();
        this.bounce(3);
        flyToLocation(searchResult.latlng, 16);
      })
      .addTo(startLayerGroup)
      .bindPopup(
        L.popup({
          maxWidth: 300,
          minWidth: 30,
          autoClose: true,
          closeOnClick: true,
          className: 'places-popup',
        }),
      )
      // .setPopupContent(`<strong class='places'>${searchResult.properties.PlaceName}</strong></br>${searchResult.properties.Place_addr}`)
      .openPopup()
      .bounce(1)
      ._icon.classList.add('hueChangeBrown');

    startCoords = coordinates;
    currentStep = 'end';
  } else {
    L.marker(
      e.latlng,
      {
        bounceOnAdd: true,
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [10, 41],
          popupAnchor: [2, -40],
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
        }),
      },
    )
      .on('dblclick', function () {
        this.remove();
        this.bounce(3);
        flyToLocation(searchResult.latlng, 16);
      })
      .addTo(endLayerGroup)
      .bindPopup(
        L.popup({
          maxWidth: 300,
          minWidth: 30,
          autoClose: true,
          closeOnClick: true,
          className: 'places-popup',
        }),
      )
      // .setPopupContent(`<strong class='places'>${searchResult.properties.PlaceName}</strong></br>${searchResult.properties.Place_addr}`)
      .openPopup()
      .bounce(1)
      ._icon.classList.add('hueChangeBrown');

    endCoords = coordinates;
    currentStep = 'start';
  }

  if (startCoords && endCoords) {
    updateRoute();
  }
});