import {mapFiltresElement} from './form.js';
import {debounce} from './util.js';

const DEFAULT_TYPE = 'any';
const housingTypeElement = mapFiltresElement.querySelector('#housing-type');
const housingPriceElement = mapFiltresElement.querySelector('#housing-price');
const housingRoomElement = mapFiltresElement.querySelector('#housing-rooms');
const housingGuestElement = mapFiltresElement.querySelector('#housing-guests');
const housingFuturesElement = mapFiltresElement.querySelector('#housing-features');
const price = {
  low: 10000,
  high: 50000,
};


const filterType = (item) => housingTypeElement.value === item.offer.type || housingTypeElement.value === DEFAULT_TYPE;

const filterRoom = (item) => Number(housingRoomElement.value) === Number(item.offer.rooms) || housingRoomElement.value === DEFAULT_TYPE;

const filterGuest = (item) => Number(housingGuestElement.value) === Number(item.offer.guests) || housingGuestElement.value === DEFAULT_TYPE;

const filterPrice = (item) => {
  if (housingPriceElement.value === 'low') {
    return item.offer.price < price.low;
  } else if (housingPriceElement.value === 'high') {
    return item.offer.price > price.high;
  } else if (housingPriceElement.value === 'middle') {
    return price.low <= item.offer.price && item.offer.price <= price.high;
  } else if (housingPriceElement.value === DEFAULT_TYPE) {
    return true;
  } else {
    return false;}
};

const housingFutures = (item) => {
  const checkedInput = Array.from(housingFuturesElement.querySelectorAll('input:checked'));
  if (checkedInput.length === 0) {
    return true;
  } else if (!item.offer.features) {
    return false;
  }
  return checkedInput.every((input) => item.offer.features.includes(input.value));
};

const filterAllData = (offers) => {
  const result = [];
  for (const offer of offers) {
    if (filterType(offer) && filterPrice(offer) && filterRoom(offer) && filterGuest(offer) && housingFutures(offer)) {
      result.push(offer);
      if(result.length === 10) {
        break;
      }
    }
  }
  return result;
};

const changeFiltersElement = (cb) => {
  mapFiltresElement.addEventListener('change', debounce(() => cb()));
};

export{filterAllData, changeFiltersElement};
