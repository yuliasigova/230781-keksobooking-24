import {getRandomNumber, getRandomList} from './util.js';

const PINS_AMOUNT = 10;
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN_TIME = ['12:00', '13:00', '14:00'];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const generatePins = () => {
  const pins = [];

  for (let index = 1; index <= PINS_AMOUNT; index++) {
    const LAT = getRandomNumber(35.6, 35.7, 5);
    const LNG = getRandomNumber(139.7, 139.8, 5);
    pins.push({
      author: {
        avatar: `img/avatars/user0${index}.png`,
      },
      offer: {
        title: `Предложение № ${index}`,
        address: `${LAT}, ${LNG}`,
        price: getRandomNumber(1000, 10000),
        type: TYPES[getRandomNumber(0, TYPES.length - 1)],
        rooms: getRandomNumber(1, 3),
        guests: getRandomNumber(1, 10),
        checkin: CHECKIN_TIME[getRandomNumber(0, CHECKIN_TIME.length - 1)],
        checkout: CHECKIN_TIME[getRandomNumber(0, CHECKIN_TIME.length - 1)],
        features: getRandomList(FEATURES),
        description: `Описание № ${index}`,
        photos: getRandomList(PHOTOS),
      },
      location: {
        lat: LAT,
        lng: LNG,
      },
    });
  }
  return pins;
};

generatePins();
