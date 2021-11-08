import {activateWindow, formElement} from './form.js';
import {renderCard} from './card.js';
import { getData } from './api.js';


const addressElement = document.querySelector('#address');
const DEFAULT_LOCATION = {
  lat: 35.69324,
  lng: 139.7628,
};
const ZOOM = 11;

const SIMILAR_USERS_COUNT = 10;
const map = L.map('map-canvas').on('load', () => {
  activateWindow();
  addressElement.value = `${DEFAULT_LOCATION.lat}, ${DEFAULT_LOCATION.lng}`;
})
  .setView({
    lat: DEFAULT_LOCATION.lat,
    lng: DEFAULT_LOCATION.lng,
  }, ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const mainMarkerIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: DEFAULT_LOCATION.lat,
    lng: DEFAULT_LOCATION.lng,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  const newLocation = evt.target.getLatLng();
  addressElement.value = `${(newLocation.lat).toFixed(5)}, ${(newLocation.lng).toFixed(5)}`;
});

const markerGroup = L.layerGroup().addTo(map);

const clearWindow = () => {
  formElement.reset();
  addressElement.value = `${DEFAULT_LOCATION.lat}, ${DEFAULT_LOCATION.lng}`;
  mainMarker.setLatLng(DEFAULT_LOCATION);
  map.setView(DEFAULT_LOCATION, ZOOM);
  map.closePopup();
};

getData((usersData) => {
  usersData.slice(0,SIMILAR_USERS_COUNT).forEach((data) => {
    const lat = data.location.lat;
    const lng = data.location.lng;
    const userMarkerIcon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
    const userMarker = L.marker(
      {
        lat,
        lng,
      },
      {
        userMarkerIcon,
      },
    );

    userMarker.addTo(markerGroup);
    userMarker.bindPopup(renderCard(data));
  });
});


export {clearWindow};
