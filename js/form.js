const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const formElement = document.querySelector('.ad-form');
const titleElement = document.querySelector('#title');
const typeElement = formElement.querySelector('#type');
const priceElement = formElement.querySelector('#price');
const timeInElement = formElement.querySelector('#timein');
const timeOutElement = formElement.querySelector('#timeout');
const roomNumberElement = formElement.querySelector('#room_number');
const capacityElement = Array.from(formElement.querySelector('#capacity'));
const roomsNumber = {
  '1' : ['1'],
  '2' : ['1', '2'],
  '3' : ['1', '2', '3'],
  '100' : ['0'],
};
const apartmentPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const messageTemplate = document
  .querySelector('#success')
  .content.querySelector('.success');

const messageElement = messageTemplate.cloneNode(true);

roomNumberElement.addEventListener(('change'), () => {
  const currentGuests = roomsNumber[roomNumberElement.value];
  capacityElement.forEach((option) => {
    option.disabled = !currentGuests.includes(option.value);
  });
});

const timeSync = (timeTo, timeFrom) => {
  timeTo.addEventListener('change', () => {
    timeFrom.value = timeTo.value;
  });
};

typeElement.addEventListener('change', () =>  {
  priceElement.placeholder = apartmentPrice[typeElement.value];
  priceElement.min = apartmentPrice[typeElement.value];
});

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

const onFormSubmit = (evt) => {
  evt.preventDefault();
  formElement.append(messageElement);
};

formElement.addEventListener('submit', onFormSubmit);

formElement.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    formElement.removeChild(messageElement);
  }
});

const mapFiltresElement = document.querySelector('.map__filters');

const deactivateWindow = () => {
  formElement.classList.add('ad-form--disabled');
  mapFiltresElement.classList.add('map__filters--disabled');
};

const activateWindow = () => {
  formElement.classList.remove('ad-form--disabled');
  mapFiltresElement.classList.remove('map__filters--disabled');
};

deactivateWindow();

export {activateWindow};

