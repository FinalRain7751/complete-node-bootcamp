'use strict';

const bringPopupToFront = function (e) {
  console.log(e.target);
  e.target.openPopup();
};

const locations = JSON.parse(document.querySelector('#map').dataset.locations);

// Initializing a map using Leaflet
const map = L.map('map', {
  zoomControl: false,
  closePopupOnClick: false,
  scrollWheelZoom: false,
});

// Using Maptiler Cloud as the basemap provider
const key = 'qdEkSuB4INzAuV7cx10X';
const mtLayer = L.maptilerLayer({
  apiKey: key,
  style: L.MaptilerStyle.VOYAGER.LIGHT, // optional
}).addTo(map);

// To be used to set up bounds on the map
let bounds = [];

// Creating markers for each location on the tour
locations.forEach((location, i) => {
  const [lng, lat] = location.coordinates;
  const myIcon = L.divIcon({ className: 'marker' });
  const popup = L.popup([lat, lng], {
    autoClose: false,
    closeOnClick: false,
    closeOnEscapeKey: false,
    content: `<span class='mapboxgl-popup-content'>Day ${location.day}: ${location.description}</span>`,
    className: 'mapboxgl-popup ',
    interactive: true,
  }).openOn(map);

  L.marker([lat, lng], {
    icon: myIcon,
  })
    .addTo(map)
    .bindPopup(popup)
    .on('click', bringPopupToFront);

  bounds.push([lat, lng]);
});

// Bounding the map to the locations on the tour
const latlngBound = L.latLngBounds(bounds);
map.fitBounds(latlngBound, {
  animate: true,
  duration: 3,
  padding: [100, 100],
  noMoveStart: false,
});
