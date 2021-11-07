import {showAlert} from './util.js';
import {mapFiltresElement} from './form.js';


const getData = (onSuccess, onError) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((users) => onSuccess(users))
    .catch(() => onError(showAlert('Данные не получены'), mapFiltresElement.classList.add('map__filters--disabled')));
};

const sendData = (onSucsess, onError, body) => {
  fetch('https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSucsess();
      } else {
        onError();
      }
    })
    .catch(() => onError());
};

export {getData, sendData};
