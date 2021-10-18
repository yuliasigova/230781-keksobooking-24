import { generatePins } from './data.js';

const usersData = generatePins();

const similarListElement = document.querySelector('.map__canvas');
const similarUserTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');

const apartmentType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const renderText = (element, value) => {
  if (value) {
    element.textContent = value;
  } else {
    element.style.display = 'none';}
};
const renderImg = (element, value) => {
  if (value) {
    element.src = value;
  } else {
    element.style.display = 'none';}
};

const renderCard = (card) => {
  const userElement = similarUserTemplate.cloneNode(true);
  renderText(userElement.querySelector('.popup__title'), card.offer.title);
  renderText(userElement.querySelector('.popup__text--address'), card.offer.address);
  renderText(userElement.querySelector('.popup__text--price'), `${card.offer.price} ₽/ночь`);
  renderText(userElement.querySelector('.popup__type'), apartmentType[card.offer.type]);
  renderText(userElement.querySelector('.popup__text--capacity'), `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`);
  renderText(userElement.querySelector('.popup__text--time'),`Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`);
  renderText(userElement.querySelector('.popup__description'), card.offer.description);

  const listFeatures = userElement.querySelectorAll('.popup__feature');
  const userFeatures = card.offer.features.map(
    (userFeature) => `popup__feature--${userFeature}`);
  listFeatures.forEach((item) => {
    if (!userFeatures.includes(item.classList[1])) {
      item.remove();
    }
  });

  renderImg(userElement.querySelector('.popup__avatar'), card.author.avatar);
  const photosContainer = userElement.querySelector('.popup__photos');
  const listPhotos = photosContainer.querySelector('.popup__photo');
  const photoUsers = card.offer.photos;
  const userFragment = document.createDocumentFragment();
  photoUsers.forEach((photo) => {
    listPhotos.src = photo;
    const clonePhoto = listPhotos.cloneNode(true);
    userFragment.appendChild(clonePhoto);
  });
  photosContainer.innerHTML = '';
  photosContainer.append(userFragment);

  return userElement;

};

const similarElem = usersData.map((user) => renderCard(user));
similarListElement.appendChild(similarElem[0]);

