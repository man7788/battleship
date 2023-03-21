/* eslint-disable no-undef */
import Ship from './ship';
import Gameboard from './gameboard';

// const newBoard = Gameboard();
// newBoard.placeShip(4, 4, 3, 'vertical');
// newBoard.placeShip(4, 2, 3, 'horizontal');
// newBoard.placeShip(3, 4, 3, 'vertical');
// console.log(newBoard.findGrid(newBoard.fullBoard, 4, 2));
// console.log(newBoard.findGrid(newBoard.fullBoard, 3, 4));

// console.log(newBoard);

it('should return ship length', () => {
  expect(Ship(3, null, null).length).toBe(3);
});

it('should return ship hits', () => {
  expect(Ship(null, 1, null).hits).toBe(1);
});

it('should return ship been sunk or not', () => {
  expect(Ship(null, null, false).sunk).toBeFalsy();
});

it('should place a ship in specific coord in vertical', () => {
  const newBoard = Gameboard();
  newBoard.placeShip(4, 4, 3, 'vertical');
  expect(newBoard.findGrid(newBoard.fullBoard, 3, 4).ship).toBeUndefined();
  expect(newBoard.findGrid(newBoard.fullBoard, 4, 4).ship.length).toBe(3);
  expect(newBoard.findGrid(newBoard.fullBoard, 5, 4).ship.length).toBe(3);
  expect(newBoard.findGrid(newBoard.fullBoard, 6, 4).ship.length).toBe(3);
  expect(newBoard.findGrid(newBoard.fullBoard, 7, 4).ship).toBeUndefined();
});

it('should place a ship in specific coord in horizontal', () => {
  const newBoard = Gameboard();
  newBoard.placeShip(4, 4, 3, 'horizontal');
  expect(newBoard.findGrid(newBoard.fullBoard, 4, 3).ship).toBeUndefined();
  expect(newBoard.findGrid(newBoard.fullBoard, 4, 4).ship.length).toBe(3);
  expect(newBoard.findGrid(newBoard.fullBoard, 4, 5).ship.length).toBe(3);
  expect(newBoard.findGrid(newBoard.fullBoard, 4, 6).ship.length).toBe(3);
  expect(newBoard.findGrid(newBoard.fullBoard, 4, 7).ship).toBeUndefined();
});

it('should refuse to place ship over border', () => {
  const newBoard = Gameboard();
  expect(newBoard.placeShip(9, 4, 3, 'vertical')).toMatch('Ship over border');
  expect(newBoard.placeShip(4, 9, 3, 'horizontal')).toMatch('Ship over border');
  expect(newBoard.findGrid(newBoard.fullBoard, 9, 4).ship).toBeUndefined();
  expect(newBoard.findGrid(newBoard.fullBoard, 4, 9).ship).toBeUndefined();
});

it('should refuse to place ship in occupied grid', () => {
  const newBoard = Gameboard();
  newBoard.placeShip(4, 4, 3, 'vertical');
  expect(newBoard.placeShip(3, 4, 5, 'vertical')).toMatch(
    'Space already taken'
  );
  expect(newBoard.findGrid(newBoard.fullBoard, 3, 4).ship).toBeUndefined();
  expect(newBoard.findGrid(newBoard.fullBoard, 4, 4).ship.length).toBe(3);
  expect(newBoard.findGrid(newBoard.fullBoard, 5, 4).ship.length).toBe(3);
  expect(newBoard.findGrid(newBoard.fullBoard, 6, 4).ship.length).toBe(3);
  expect(newBoard.findGrid(newBoard.fullBoard, 7, 4).ship).toBeUndefined();
  expect(newBoard.placeShip(4, 3, 4, 'horizontal')).toMatch(
    'Space already taken'
  );
  expect(newBoard.findGrid(newBoard.fullBoard, 4, 3).ship).toBeUndefined();
  expect(newBoard.findGrid(newBoard.fullBoard, 4, 4).ship.length).toBe(3);
  expect(newBoard.findGrid(newBoard.fullBoard, 4, 5).ship).toBeUndefined();
  expect(newBoard.findGrid(newBoard.fullBoard, 4, 6).ship).toBeUndefined();
});
