import { convertCoord } from './convert';

const highlightGrid = (ships) => {
  const targets = [];
  const grids = document.querySelectorAll('.small-grid');

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

export { highlightGrid, highBig };
