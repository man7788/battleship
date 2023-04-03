import { convertNum } from './convert';
import { displayHit } from './display-ships';

const allGrids = () => {
  const grids = document.querySelectorAll('.big-grid');
  return grids;
};

const gridIndex = (grid) => {
  const re = /[0-9]+/;
  const num = grid.className;
  const gridNum = re.exec(num.slice(num.length - 2, num.length))[0];
  const coord = convertNum();
  return coord[gridNum];
};

const createClick = (player, computerBoard, playerBoard) => {
  const grids = allGrids();
  const message = document.querySelector('.message');

  function clickStyle() {
    const target = gridIndex(this);
    player.attack(target[0], target[1]);
    const result = computerBoard.findGrid(
      computerBoard.fullBoard,
      target[0],
      target[1]
    );
    if (result.miss === true) {
      this.textContent = '/';
      this.style.fontSize = '2rem';
      this.style.color = 'whitesmoke';
    }
    if (result.ship !== undefined) {
      this.textContent = 'X';
      this.style.fontSize = '2rem';
      this.style.color = 'red';
    }
    this.removeEventListener('click', clickStyle);

    const computerSunk = computerBoard.checkSunk();

    if (computerSunk === false) {
      displayHit(playerBoard);
      const playerSunk = playerBoard.checkSunk();
      if (playerSunk === true) {
        grids.forEach((grid) => {
          grid.removeEventListener('click', clickStyle);
        });
        console.log('Computer win');
        message.textContent = 'Computer Win';
      }
    }

    if (computerSunk === true) {
      grids.forEach((grid) => {
        grid.removeEventListener('click', clickStyle);
      });
      console.log('Human win');
      message.textContent = 'Human win';
    }

    console.log(computerBoard.shipRecord);
    console.log(computerBoard.sunkRecord);
  }

  for (let i = 0; i < grids.length; i++) {
    grids[i].classList.add(`grid${i}`);
    grids[i].addEventListener('click', clickStyle);
  }
};

export default createClick;
