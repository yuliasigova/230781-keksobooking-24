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
const renderPhoto = (container, element, value) => {
  const userFragment = document.createDocumentFragment();
  if(value) {
    value.forEach((photo) => {
      element.src = photo;
      const clonePhoto = element.cloneNode(true);
      userFragment.appendChild(clonePhoto);
    });
    container.innerHTML = '';
    container.append(userFragment);
  }
  else {
    container.innerHTML = '';
  }
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
  renderPhoto(userElement.querySelector('.popup__photos'), userElement.querySelector('.popup__photo'),
    card.offer.photos);

  return userElement;
};

export {renderCard};
