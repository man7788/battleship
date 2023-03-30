import { convertNum } from './convert';

const allGrids = () => {
  const grids = document.querySelectorAll('.big-grid');
  return grids;
};

const findGrid = (grid) => {
  const re = /[0-9]+/;
  const num = grid.className;
  const gridNum = re.exec(num.slice(num.length - 2, num.length))[0];
  const coord = convertNum();
  console.log(coord[gridNum]);
  return coord[gridNum];
};

const createClick = (player, computerBoard) => {
  const grids = allGrids();
  for (let i = 0; i < grids.length; i++) {
    grids[i].classList.add(`grid${i}`);
    grids[i].textContent = '/';
    grids[i].style.fontSize = '2rem';
    grids[i].style.color = 'transparent';

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
    });
  }
};

export default createClick;
