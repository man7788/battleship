import { convertCoord } from './convert';

const allGrids = () => {
  const grids = document.querySelectorAll('.small-grid');
  return grids;
};

const highlightGrid = (ships) => {
  const targets = [];
  const grids = allGrids();

  Object.keys(ships).forEach((key) => {
    const coords = ships[key];
    Object.keys(coords).forEach((coord) => {
      targets.push(coord);
    });
  });

  const table = convertCoord();

  targets.forEach((target) => {
    const index = table[target];
    grids[index].style.border = '2px cyan solid';
  });
};

const highBig = (ships) => {
  const targets = [];
  const grids = document.querySelectorAll('.big-grid');

  Object.keys(ships).forEach((key) => {
    const coords = ships[key];
    Object.keys(coords).forEach((coord) => {
      targets.push(coord);
    });
  });

  const table = convertCoord();

  targets.forEach((target) => {
    const index = table[target];
    grids[index].style.border = '2px cyan solid';
  });
};

const displayHit = (board) => {
  const keys = Object.keys(board.hitRecord);
  const coord = board.hitRecord[keys[keys.length - 1]];
  const target = board.findGrid(board.fullBoard, coord[0], coord[1]);

  const grids = allGrids();
  const table = convertCoord();
  const gridNum = table[coord];

  if (target.miss === true) {
    grids[gridNum].textContent = 'X';
    grids[gridNum].style.fontSize = '1.5rem';
    grids[gridNum].style.color = 'whitesmoke';
  }
  if (target.ship !== undefined) {
    grids[gridNum].textContent = 'X';
    grids[gridNum].style.fontSize = '1.5rem';
    grids[gridNum].style.color = 'red';
  }
};

export { highlightGrid, highBig, displayHit };
