const getRandomInt = function (min, max) {
  if (max <= min || min < 0) {
    return 'Неверный диапазон';
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};

getRandomInt();

const getRandomFloat = function (min, max, sign) {
  if (max <= min || min < 0) {
    return 'Неверный диапазон';
  }
  return (Math.random() * (max - min + 1) + min).toFixed(sign);
};

getRandomFloat();
