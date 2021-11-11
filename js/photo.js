const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const avatarUpload = document.querySelector('.ad-form-header__input');
const avatarPhotoContainer = document.querySelector('.ad-form-header__preview');
const avatarPhoto = avatarPhotoContainer.querySelector('img');
const appartmentUpload = document.querySelector('.ad-form__input');
const appartmentPhotoContainer = document.querySelector('.ad-form__photo');

// const chooseFile = (element, photo) => {
//   const file = element.files[0];
//   const fileName = file.name.toLowerCase();
//   const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
//   if(matches) {
//     const avatar = photo.querySelector('img');
//     avatar.src = URL.createObjectURL(file);
//   }
// };

avatarUpload.addEventListener('change', () => {
  const file = avatarUpload.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((value) => fileName.endsWith(value));
  if (matches) {
    avatarPhoto.src = URL.createObjectURL(file);
  }
});

appartmentUpload.addEventListener('change', () => {
  const file = appartmentUpload.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((value) => fileName.endsWith(value));
  if (matches) {
    const appartmentPhoto = document.createElement('img');
    appartmentPhoto.width = '70';
    appartmentPhoto.height = '70';
    appartmentPhoto.alt = 'Фотография жилья';
    appartmentPhoto.src = URL.createObjectURL(file);
    appartmentPhotoContainer.appendChild(appartmentPhoto);
  }
});

export {appartmentPhotoContainer, avatarPhoto};
