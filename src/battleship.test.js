/* eslint-disable no-undef */
import Ship from './ship';
import Gameboard from './gameboard';

// const newBoard = Gameboard();
// newBoard.placeShip(4, 4, 3);
// console.log(newBoard);

// console.log(newBoard.placeShip(1, 0, 3));
// console.log(newBoard.placeShip(0, 1, 3));
// console.log(newBoard.findGrid(newBoard.fullBoard, 0, 1));

it('should return ship length', () => {
  expect(Ship(3, null, null).length).toBe(3);
});

it('should return ship hits', () => {
  expect(Ship(null, 1, null).hits).toBe(1);
});

it('should return ship been sunk or not', () => {
  expect(Ship(null, null, false).sunk).toBeFalsy();
});

it('should place a ship in specific coord', () => {
  const newBoard = Gameboard();
  newBoard.placeShip(4, 4, 3);
  expect(newBoard.findGrid(newBoard.fullBoard, 4, 4).ship.length).toBe(3);
});
