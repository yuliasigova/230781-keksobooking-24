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
  const renderFeatures = () => {
    const featuresContainer  = userElement.querySelector('.popup__features');
    if (card.offer.features) {
      const listFeatures = userElement.querySelectorAll('.popup__feature');
      const userFeatures = card.offer.features.map(
        (userFeature) => `popup__feature--${userFeature}`);
      listFeatures.forEach((item) => {
        if (!userFeatures.includes(item.classList[1])) {
          item.remove();
        }
      });
    } else {
      featuresContainer.innerHTML = '';
    }
  };
  renderFeatures();
  renderImg(userElement.querySelector('.popup__avatar'), card.author.avatar);
  const photosContainer = userElement.querySelector('.popup__photos');
  const listPhotos = photosContainer.querySelector('.popup__photo');
  const photoUsers = card.offer.photos;
  const userFragment = document.createDocumentFragment();
  if(photoUsers) {
    photoUsers.forEach((photo) => {
      listPhotos.src = photo;
      const clonePhoto = listPhotos.cloneNode(true);
      userFragment.appendChild(clonePhoto);
    });
    photosContainer.innerHTML = '';
    photosContainer.append(userFragment);
  }
  else {
    photosContainer.innerHTML = '';
  }
  return userElement;

};

export {renderCard};
