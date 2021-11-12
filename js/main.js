import './photo.js';
import './map.js';
import './form.js';
import './filter.js';
import { clearWindow, renderUsers } from './map.js';
import { resetButtonElement, sendUserData} from './form.js';
import { getData } from './api.js';
import {changeFiltersElement} from './filter.js';

sendUserData(clearWindow);

resetButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  clearWindow();
});

getData((users) => {
  renderUsers(users);
  changeFiltersElement (() => renderUsers(users));
});

