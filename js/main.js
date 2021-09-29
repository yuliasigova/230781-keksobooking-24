const getRandomNumber = function (min, max, sign = 0) {
  if (max > min && min >= 0) {
    if (sign === 0) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    } else {
      return (Math.random() * (max - min + 1) + min).toFixed(sign);
    }
  }
  return 'Неверный диапазон';
};

getRandomNumber();
