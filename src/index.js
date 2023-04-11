import './style.css';
import Gameboard from './gameboard';
import Player from './player';
import { highLightGrid, highBig } from './display-ships';
import createClick from './click-board';
// import { convertNum, convertCoord } from './convert';
import rotateShip from './rotate';

const playerBoard = Gameboard();
const computerBoard = Gameboard();
const computerPlayer = Player(playerBoard);
computerPlayer.computerOn();
const humanPlayer = Player(computerBoard, computerPlayer, playerBoard);

playerBoard.placeShip(4, 1, 5, 'vertical');
playerBoard.placeShip(2, 1, 4, 'horizontal');
// playerBoard.placeShip(6, 4, 3, 'horizontal');
playerBoard.placeShip(1, 7, 2, 'vertical');
// playerBoard.placeShip(9, 9, 1, 'vertical');
// playerBoard.placeShip(7, 8, 1, 'vertical');
playerBoard.placeShip(9, 5, 3, 'horizontal');
// playerBoard.placeShip(2, 4, 2, 'horizontal');

highLightGrid(playerBoard.shipRecord);

// computerBoard.placeShip(1, 1, 5, 'vertical');
// computerBoard.placeShip(3, 3, 4, 'vertical');
// computerBoard.placeShip(8, 3, 3, 'horizontal');
// computerBoard.placeShip(1, 5, 2, 'vertical');
// computerBoard.placeShip(4, 6, 2, 'vertical');
// computerBoard.placeShip(3, 9, 1, 'vertical');
// computerBoard.placeShip(7, 0, 1, 'vertical');

highBig(computerBoard.shipRecord);

createClick(humanPlayer, computerBoard, playerBoard);

rotateShip(playerBoard.shipRecord, playerBoard);
