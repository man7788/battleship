import './style.css';
import Gameboard from './gameboard';
import Player from './player';
import { highlightGrid, highBig } from './display-ships';
import createClick from './click-board';

const playerBoard = Gameboard();
const computerBoard = Gameboard();
const computer = Player(playerBoard);
computer.computerOn();
const player = Player(computerBoard, computer, playerBoard);

playerBoard.placeShip(5, 1, 5, 'vertical');
playerBoard.placeShip(4, 3, 4, 'horizontal');
playerBoard.placeShip(6, 4, 3, 'horizontal');
playerBoard.placeShip(1, 7, 2, 'vertical');
playerBoard.placeShip(4, 8, 2, 'vertical');
playerBoard.placeShip(9, 9, 1, 'vertical');
playerBoard.placeShip(7, 8, 1, 'vertical');

highlightGrid(playerBoard.shipRecord);

computerBoard.placeShip(1, 1, 5, 'vertical');
computerBoard.placeShip(3, 3, 4, 'vertical');
computerBoard.placeShip(8, 3, 3, 'horizontal');
computerBoard.placeShip(1, 5, 2, 'vertical');
computerBoard.placeShip(4, 6, 2, 'vertical');
computerBoard.placeShip(3, 9, 1, 'vertical');
computerBoard.placeShip(7, 0, 1, 'vertical');

highBig(computerBoard.shipRecord);

createClick(player, computerBoard);

// Make enemy board clickable, invoke attack by clicking,
// display whether hit or miss

// Make player board display wheter hit or miss
