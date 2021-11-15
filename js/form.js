import { roomsNumber, apartmentPrice } from './util.js';
import {sendData} from './api.js';

const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const formElement = document.querySelector('.ad-form');
const titleElement = formElement.querySelector('#title');
const typeElement = formElement.querySelector('#type');
const priceElement = formElement.querySelector('#price');
const timeInElement = formElement.querySelector('#timein');
const timeOutElement = formElement.querySelector('#timeout');
const roomNumberElement = formElement.querySelector('#room_number');
const resetButtonElement = formElement.querySelector('.ad-form__reset');
const capacityElement = Array.from(formElement.querySelector('#capacity'));
const successMessageTemplate = document
  .querySelector('#success')
  .content.querySelector('.success');

const successMessageElement = successMessageTemplate.cloneNode(true);
const errorMessageTemplate = document
  .querySelector('#error')
  .content.querySelector('.error');
const errorMessageElement = errorMessageTemplate.cloneNode(true);

const mapFiltresElement = document.querySelector('.map__filters');

const hiddenGuest = () => {
  const currentGuests = roomsNumber[roomNumberElement.value];
  capacityElement.forEach((option) => {
    option.disabled = !currentGuests.includes(option.value);
  });
};
hiddenGuest();

roomNumberElement.addEventListener(('change'), () => {
  hiddenGuest();
});

const timeSync = (timeTo, timeFrom) => {
  timeTo.addEventListener('change', () => {
    timeFrom.value = timeTo.value;
  });
};

const changePrice = (price, type) => {
  price.placeholder = apartmentPrice[type.value];
  price.min = apartmentPrice[type.value];
};

typeElement.addEventListener('change', () =>{
  changePrice(priceElement, typeElement);
});

const resetPrice = () => {
  changePrice(priceElement, typeElement);
};

titleElement.addEventListener('input', () => {
  const valueLength = titleElement.value.length;
  if (valueLength < MIN_NAME_LENGTH) {
    titleElement.style.borderColor = 'red';
    titleElement.setCustomValidity(`Ещё ${  MIN_NAME_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    titleElement.style.borderColor = 'red';
    titleElement.setCustomValidity(`Удалите лишние ${  valueLength - MAX_NAME_LENGTH } симв.`);
  }
  else {
    titleElement.setCustomValidity('');
    titleElement.style.borderColor = 'green';
    titleElement.style.boxShadow = 'none';
  }

  titleElement.reportValidity();
});

timeSync(timeInElement, timeOutElement);
timeSync(timeOutElement, timeInElement);

const deactivateWindow = () => {
  formElement.classList.add('ad-form--disabled');
  mapFiltresElement.classList.add('map__filters--disabled');
};

const activateWindow = () => {
  formElement.classList.remove('ad-form--disabled');
  mapFiltresElement.classList.remove('map__filters--disabled');
};

const onSuccessMessageEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    document.body.removeChild(successMessageElement);
    document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  }
};

const onErrorMessageEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    document.body.removeChild(errorMessageElement);
    document.removeEventListener('keydown', onErrorMessageEscKeydown);
  }
};

const errorMessage = () => {
  document.body.append(errorMessageElement);
  document.addEventListener('keydown', onErrorMessageEscKeydown);
};

const successMessage = () => {
  document.body.append(successMessageElement),
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
};

successMessageElement.addEventListener('click', () => {
  document.body.removeChild(successMessageElement);
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
});


errorMessageElement.addEventListener('click', () => {
  document.body.removeChild(errorMessageElement);
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
});

const sendUserData = (cb) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => successMessage(cb()),
      () => errorMessage(),
      new FormData(evt.target),
    );
  });
};

deactivateWindow();

export {activateWindow, mapFiltresElement, formElement, resetButtonElement, sendUserData, resetPrice};
