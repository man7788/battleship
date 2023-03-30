import { convertCoord, convertNum } from './convert';

const allGrids = () => {
  const grids = document.querySelectorAll('.small-grid');
  return grids;
};

const preStyle = () => {
  const grids = allGrids();
  for (let i = 0; i < grids.length; i++) {
    grids[i].classList.add(`grid${i}`);
    grids[i].textContent = '/';
    grids[i].style.fontSize = '1.5rem';
    grids[i].style.color = 'transparent';
    // grids[i].style.color = 'whitesmoke';
  }
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

  preStyle();
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

  // console.log(target);
  if (target.miss === true) {
    grids[gridNum].style.color = 'whitesmoke';
  }
  if (target.ship !== undefined) {
    grids[gridNum].textContent = 'X';
    grids[gridNum].style.color = 'red';
  }

  // grids[i].addEventListener('click', () => {
  //   const target = findGrid(grids[i]);
  //   player.attack(target[0], target[1]);
  //   const result = computerBoard.findGrid(
  //     computerBoard.fullBoard,
  //     target[0],
  //     target[1]
  //   );
  //   console.log(result);
  // });
};

export { highlightGrid, highBig, displayHit };
