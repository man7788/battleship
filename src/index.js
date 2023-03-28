import './style.css';
import Gameboard from './gameboard';
import Player from './player';
import highlightGrid from './display-ships';

const playerBoard = Gameboard();
const computerBoard = Gameboard();
const computer = Player();
const player = Player(computerBoard, computer, playerBoard);
playerBoard.placeShip(5, 1, 5, 'vertical');
playerBoard.placeShip(4, 3, 4, 'horizontal');
playerBoard.placeShip(6, 4, 3, 'horizontal');
playerBoard.placeShip(1, 7, 2, 'vertical');
playerBoard.placeShip(4, 8, 2, 'vertical');
playerBoard.placeShip(9, 9, 1, 'vertical');
playerBoard.placeShip(7, 8, 1, 'vertical');

highlightGrid(playerBoard.shipRecord);

// Designate coord to grid display
// Put predetermined coord in both boards
// Use ship record to display ships in boards

// playerShip = Board()
// player = Player()
// ship.place(5)
// ship.place(4)
// ship.place(3)
// ship.place(2)
// ship.place(2)
// ship.place(1)
// ship.place(1)

// computerShip = Board()
// computer = Player()
// ship.place(5)
// ship.place(4)
// ship.place(3)
// ship.place(2)
// ship.place(2)
// ship.place(1)
// ship.place(1)

// For coord in Player.record
// var = dom.select(coord[0], coord[1])
// var.style.border = 'highlight'
