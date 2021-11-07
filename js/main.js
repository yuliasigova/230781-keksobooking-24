import './card.js';
import './map.js';
import './form.js';
import { clearWindow } from './map.js';
import { resetButtonElement, sendUserData } from './form.js';


sendUserData(clearWindow);

resetButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  clearWindow();
});
