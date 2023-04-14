import { highBig } from './display-ships';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const setComputerShip = (board) => {
  const x = getRandomInt(0, 9);
  const y = getRandomInt(0, 9);
  const z = getRandomInt(0, 1);

  let orient;
  if (z === 0) {
    orient = 'vertical';
  } else if (z === 1) {
    orient = 'horizontal';
  }

  const convertLength = {};
  for (let i = 0; i < 8; i++) {
    if (i >= 0 && i < 3) {
      convertLength[i] = 5 - i;
    } else if (i === 3 || i === 4) {
      convertLength[i] = 2;
    } else if (i === 5 || i === 6) {
      convertLength[i] = 1;
    }
  }

  const getLength = () => {
    const recordLength = Object.keys(board.shipRecord).length;
    const length = convertLength[recordLength];
    return length;
  };

  board.placeShip(x, y, getLength(), orient);

  if (Object.keys(board.shipRecord).length < 7) {
    return setComputerShip(board);
  }

  highBig(board.shipRecord);
};

export default setComputerShip;
