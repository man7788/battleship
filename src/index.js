import './style.css';
import Gameboard from './gameboard';
import Player from './player';
import { highlightGrid, highBig } from './display-ships';
import { convertCoord, convertNum } from './convert';

const playerBoard = Gameboard();
const computerBoard = Gameboard();
const computer = Player(playerBoard);
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

const grids = document.querySelectorAll('.big-grid');

const findGrid = (grid) => {
  const re = /[0-9]+/;
  const num = grid.className;
  const gridNum = re.exec(num.slice(num.length - 2, num.length))[0];
  const coord = convertNum();
  console.log(coord[gridNum]);
  return coord[gridNum];
};

for (let i = 0; i < grids.length; i++) {
  grids[i].classList.add(`grid${i}`);
  grids[i].textContent = '/';
  grids[i].style.fontSize = '2rem';
  grids[i].style.color = 'transparent';

  // grid.textContent = 'X';
  // grid.style.fontSize = '2rem';
  // grid.style.color = 'transparent';

  grids[i].addEventListener('click', () => {
    const target = findGrid(grids[i]);
    player.attack(target[0], target[1]);
    const result = computerBoard.findGrid(
      computerBoard.fullBoard,
      target[0],
      target[1]
    );
    console.log(result);
    if (result.miss === true) {
      grids[i].style.color = 'whitesmoke';
    }
    if (result.ship !== undefined) {
      grids[i].textContent = 'X';
      grids[i].style.color = 'red';
    }

    // grid.style.color = 'whitesmoke';
    // grid.style.color = 'red';
  });
}

// Make enemy board clickable, invoke attack by clicking,
// display whether hit or miss

// Make player board display wheter hit or miss
