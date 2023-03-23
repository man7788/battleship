/* eslint-disable no-undef */
import Ship from './ship';
import Gameboard from './gameboard';

// const newBoard = Gameboard();
// newBoard.placeShip(4, 4, 3, 'vertical');
// newBoard.placeShip(4, 2, 3, 'horizontal');
// newBoard.placeShip(3, 4, 3, 'vertical');
// console.log(newBoard.findGrid(newBoard.fullBoard, 4, 2));
// console.log(newBoard.findGrid(newBoard.fullBoard, 3, 4));
// const key = [4, 4];
// newBoard.hitRecord[key] = key;
// console.log(newBoard.shipRecord);
// console.log(newBoard.hitRecord);
// console.log(newBoard.receiveAttack(4, 4));

it('should return ship length', () => {
  expect(Ship(3).length).toBe(3);
});

it('should return ship hits', () => {
  expect(Ship().hits()).toBe(0);
});

it('should return ship been sunk or not', () => {
  expect(Ship().sunk).toBeFalsy();
});

it('should increase ship hits by 1', () => {
  const newShip = Ship();
  newShip.hit();
  expect(newShip.hits()).toBe(1);
});

// it('should place a ship in specific coord in vertical', () => {
//   const newBoard = Gameboard();
//   newBoard.placeShip(4, 4, 3, 'vertical');
//   expect(newBoard.findGrid(newBoard.fullBoard, 3, 4).ship).toBeUndefined();
//   expect(newBoard.findGrid(newBoard.fullBoard, 4, 4).ship.length).toBe(3);
//   expect(newBoard.findGrid(newBoard.fullBoard, 5, 4).ship.length).toBe(3);
//   expect(newBoard.findGrid(newBoard.fullBoard, 6, 4).ship.length).toBe(3);
//   expect(newBoard.findGrid(newBoard.fullBoard, 7, 4).ship).toBeUndefined();
// });

// it('should place a ship in specific coord in horizontal', () => {
//   const newBoard = Gameboard();
//   newBoard.placeShip(4, 4, 3, 'horizontal');
//   expect(newBoard.findGrid(newBoard.fullBoard, 4, 3).ship).toBeUndefined();
//   expect(newBoard.findGrid(newBoard.fullBoard, 4, 4).ship.length).toBe(3);
//   expect(newBoard.findGrid(newBoard.fullBoard, 4, 5).ship.length).toBe(3);
//   expect(newBoard.findGrid(newBoard.fullBoard, 4, 6).ship.length).toBe(3);
//   expect(newBoard.findGrid(newBoard.fullBoard, 4, 7).ship).toBeUndefined();
// });

// it('should refuse to place ship over border', () => {
//   const newBoard = Gameboard();
//   expect(newBoard.placeShip(9, 4, 3, 'vertical')).toMatch('Ship over border');
//   expect(newBoard.placeShip(4, 9, 3, 'horizontal')).toMatch('Ship over border');
//   expect(newBoard.findGrid(newBoard.fullBoard, 9, 4).ship).toBeUndefined();
//   expect(newBoard.findGrid(newBoard.fullBoard, 4, 9).ship).toBeUndefined();
// });

// it('should refuse to place ship in occupied grid', () => {
//   const newBoard = Gameboard();
//   newBoard.placeShip(4, 4, 3, 'vertical');
//   expect(newBoard.placeShip(3, 4, 5, 'vertical')).toMatch(
//     'Space already taken'
//   );
//   expect(newBoard.findGrid(newBoard.fullBoard, 3, 4).ship).toBeUndefined();
//   expect(newBoard.findGrid(newBoard.fullBoard, 4, 4).ship.length).toBe(3);
//   expect(newBoard.findGrid(newBoard.fullBoard, 5, 4).ship.length).toBe(3);
//   expect(newBoard.findGrid(newBoard.fullBoard, 6, 4).ship.length).toBe(3);
//   expect(newBoard.findGrid(newBoard.fullBoard, 7, 4).ship).toBeUndefined();
//   expect(newBoard.placeShip(4, 3, 4, 'horizontal')).toMatch(
//     'Space already taken'
//   );
//   expect(newBoard.findGrid(newBoard.fullBoard, 4, 3).ship).toBeUndefined();
//   expect(newBoard.findGrid(newBoard.fullBoard, 4, 4).ship.length).toBe(3);
//   expect(newBoard.findGrid(newBoard.fullBoard, 4, 5).ship).toBeUndefined();
//   expect(newBoard.findGrid(newBoard.fullBoard, 4, 6).ship).toBeUndefined();
// });

it('should increase ship hit by 1', () => {
  const newBoard = Gameboard();
  newBoard.placeShip(4, 4, 3, 'vertical');
  newBoard.receiveAttack(4, 4);
  expect(newBoard.findGrid(newBoard.fullBoard, 4, 4).ship.hits()).toBe(1);
  expect(newBoard.findGrid(newBoard.fullBoard, 5, 4).ship.hits()).toBe(1);
  expect(newBoard.findGrid(newBoard.fullBoard, 6, 4).ship.hits()).toBe(1);
});

// it('should refuse to hit a ship already been hit', () => {
//   const newBoard = Gameboard();
//   newBoard.placeShip(4, 4, 3, 'vertical');
//   newBoard.receiveAttack(4, 4);
//   expect(newBoard.receiveAttack(4, 4)).toMatch('Ship already hit');
// });

// it('should record the coordinates of the missed shot', () => {
//   const newBoard = Gameboard();
//   newBoard.placeShip(4, 4, 3, 'vertical');
//   newBoard.receiveAttack(3, 3);
//   expect(newBoard.findGrid(newBoard.fullBoard, 3, 3).miss).toBeTruthy();
// });

// it('should refuse to hit again on missed shot', () => {
//   const newBoard = Gameboard();
//   newBoard.placeShip(4, 4, 3, 'vertical');
//   newBoard.receiveAttack(3, 3);
//   expect(newBoard.receiveAttack(3, 3)).toMatch('Hitting a missed shot again');
// });

// it('should report whether all ships have been sunk', () => {
// const newBoard = Gameboard();
// newBoard.placeShip(4, 4, 3, 'vertical');
// newBoard.receiveAttack(4, 4);
// newBoard.receiveAttack(5, 4);
// expect(newBoard.receiveAttack(6, 4)).toMatch('All ships sunk');
// });
