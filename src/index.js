import './style.css';
import Gameboard from './gameboard';
import Player from './player';
import { highlightGrid, highBig } from './display-ships';
import createClick from './click-board';

const playerBoard = Gameboard();
const computerBoard = Gameboard();
const computerPlayer = Player(playerBoard);
computerPlayer.computerOn();
const humanPlayer = Player(computerBoard, computerPlayer, playerBoard);

playerBoard.placeShip(5, 1, 5, 'vertical');
playerBoard.placeShip(4, 3, 4, 'horizontal');
playerBoard.placeShip(6, 4, 3, 'horizontal');
playerBoard.placeShip(1, 7, 2, 'vertical');
playerBoard.placeShip(9, 9, 1, 'vertical');
playerBoard.placeShip(7, 8, 1, 'vertical');
playerBoard.placeShip(9, 5, 3, 'horizontal');
playerBoard.placeShip(2, 4, 2, 'horizontal');

highlightGrid(playerBoard.shipRecord);

// computerBoard.placeShip(1, 1, 5, 'vertical');
// computerBoard.placeShip(3, 3, 4, 'vertical');
// computerBoard.placeShip(8, 3, 3, 'horizontal');
// computerBoard.placeShip(1, 5, 2, 'vertical');
// computerBoard.placeShip(4, 6, 2, 'vertical');
// computerBoard.placeShip(3, 9, 1, 'vertical');
// computerBoard.placeShip(7, 0, 1, 'vertical');

highBig(computerBoard.shipRecord);

createClick(humanPlayer, computerBoard, playerBoard);

// console.log(playerBoard.shipRecord);
// console.log(playerBoard.placeBoundary(playerBoard.shipRecord.Submarine1));

// playerBoard.receiveAttack(5, 1);
// playerBoard.receiveAttack(4, 3);
// playerBoard.receiveAttack(6, 4);
// playerBoard.receiveAttack(1, 7);
// playerBoard.receiveAttack(4, 8);
// playerBoard.receiveAttack(9, 9);
// console.log(playerBoard.hitRecord);
// playerBoard.receiveAttack(7, 8);
// for (let i = 0; i < 100; i++) {
//   const grids = document.querySelectorAll('.big-grid');
//   grids[i].click();
// }
// Make enemy board clickable, invoke attack by clicking,
// display whether hit or miss

// Make player board display wheter hit or miss
