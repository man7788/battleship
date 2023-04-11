import './style.css';
import Gameboard from './gameboard';
import Player from './player';
import { highLightGrid, highBig } from './display-ships';
import createClick from './click-board';
import { convertNum, convertCoord } from './convert';
// import rotateShip from './rotate';

const playerBoard = Gameboard();
const computerBoard = Gameboard();
const computerPlayer = Player(playerBoard);
computerPlayer.computerOn();
const humanPlayer = Player(computerBoard, computerPlayer, playerBoard);

// playerBoard.placeShip(4, 1, 5, 'vertical');
// playerBoard.placeShip(2, 1, 4, 'horizontal');
// playerBoard.placeShip(6, 4, 3, 'horizontal');
playerBoard.placeShip(1, 7, 2, 'vertical');
// playerBoard.placeShip(9, 9, 1, 'vertical');
// playerBoard.placeShip(7, 8, 1, 'vertical');
// playerBoard.placeShip(9, 5, 3, 'horizontal');
// playerBoard.placeShip(2, 4, 2, 'horizontal');

highLightGrid(playerBoard.shipRecord);

// computerBoard.placeShip(1, 1, 5, 'vertical');
// computerBoard.placeShip(3, 3, 4, 'vertical');
computerBoard.placeShip(8, 3, 3, 'horizontal');
// computerBoard.placeShip(1, 5, 2, 'vertical');
// computerBoard.placeShip(4, 6, 2, 'vertical');
// computerBoard.placeShip(3, 9, 1, 'vertical');
// computerBoard.placeShip(7, 0, 1, 'vertical');

highBig(computerBoard.shipRecord);

createClick(humanPlayer, computerBoard, playerBoard);

// rotateShip(playerBoard.shipRecord, playerBoard);

// Make grid hover according to current ship length
const hoverGrid = (length, orient) => {
  const allGrids = () => {
    const grids = document.querySelectorAll('.small-grid');
    return grids;
  };

  const gridIndex = (grid) => {
    const re = /[0-9]+/;
    const num = grid.className;
    const gridNum = re.exec(num.slice(num.length - 2, num.length))[0];
    return gridNum;
  };

  const grids = allGrids();

  if (orient === 'vertical') {
    for (let i = 0; i < grids.length; i++) {
      grids[i].classList.add(`grid${i}`);
      grids[i].addEventListener('mouseover', (e) => {
        vHover(e.target, length);
      });
      grids[i].addEventListener('mouseleave', (e) => {
        vLeave(e.target, length);
      });
    }
  }

  if (orient === 'horizontal') {
    for (let i = 0; i < grids.length; i++) {
      grids[i].classList.add(`grid${i}`);
      grids[i].addEventListener('mouseover', (e) => {
        hHover(e.target, length);
      });
      grids[i].addEventListener('mouseleave', (e) => {
        hLeave(e.target, length);
      });
    }
  }

  // Vertical
  const vHover = (base, vLength, count = 0) => {
    if (count === length) {
      return;
    }

    let num = 0;

    if (count === 0) {
      num = Number(gridIndex(base));
    }

    if (count > 0) {
      num = Number(gridIndex(base)) - 10;
    }

    const target = document.querySelector(`.grid${num}`);

    if (target !== null) {
      target.style.background = 'cyan';
      return vHover(target, vLength, count + 1);
    }
  };

  const vLeave = (base, vLength, count = 0) => {
    if (count === length) {
      return;
    }

    let num = 0;

    if (count === 0) {
      num = Number(gridIndex(base));
    }

    if (count > 0) {
      num = Number(gridIndex(base)) - 10;
    }

    const target = document.querySelector(`.grid${num}`);

    if (target !== null) {
      target.style.background = 'none';
      return vLeave(target, vLength, count + 1);
    }
  };

  // Horizontal
  const hHover = (base, hLength, count = 0, check = []) => {
    if (count === length) {
      return;
    }

    let num = 0;

    if (count === 0) {
      num = Number(gridIndex(base));
    }

    if (count > 0) {
      num = Number(gridIndex(base)) + 1;
    }

    check.push(num);

    const target = document.querySelector(`.grid${num}`);
    target.style.background = 'cyan';
    return hHover(target, hLength, count + 1, check);

    // console.log(
    //   Number(String(check[check.length - 1]).slice(-1)),
    //   Number(String(check[0]).slice(-1))
    // );
  };

  const hLeave = (base, hLength, count = 0, check = []) => {
    if (count === length) {
      return;
    }

    let num = 0;

    if (count === 0) {
      num = Number(gridIndex(base));
    }

    if (count > 0) {
      num = Number(gridIndex(base)) + 1;
    }

    check.push(num);

    const target = document.querySelector(`.grid${num}`);
    target.style.background = 'none';

    // console.log(
    //   Number(String(check[check.length - 1]).slice(-1)),
    //   Number(String(check[0]).slice(-1))
    // );
    return hLeave(target, hLength, count + 1, check);
  };
};

// hoverGrid(1, 'vertical');
hoverGrid(5, 'horizontal');
