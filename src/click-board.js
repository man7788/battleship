import { convertNum } from './convert';
import { displayHit } from './display-ships';

const grids = document.querySelectorAll('.big-grid');

const gridIndex = (grid) => {
  const re = /[0-9]+/;
  const num = grid.className;
  const gridNum = re.exec(num.slice(num.length - 2, num.length))[0];
  const coord = convertNum();
  return coord[gridNum];
};

const createClick = (player, computerBoard, playerBoard) => {
  const bigWin = document.querySelector('.big-win');

  function clickStyle(element) {
    const target = gridIndex(element);
    player.attack(target[0], target[1]);
    const result = computerBoard.findGrid(
      computerBoard.fullBoard,
      target[0],
      target[1]
    );
    if (result.miss === true) {
      element.textContent = '/';
      element.style.fontSize = '2rem';
      element.style.color = 'whitesmoke';
    }
    if (result.ship !== undefined) {
      element.textContent = 'X';
      element.style.fontSize = '2rem';
      element.style.color = 'red';
    }

    element.removeEventListener('click', clickStyle);

    const computerSunk = computerBoard.checkSunk();

    if (computerSunk === false) {
      displayHit(playerBoard);
      const playerSunk = playerBoard.checkSunk();
      if (playerSunk === true) {
        grids.forEach((grid) => {
          // grid.removeEventListener('click', clickStyle);
          grid.onclick = null;
        });
        console.log('Computer win');
        bigWin.textContent = 'Opponent Win';
      }
    }

    if (computerSunk === true) {
      grids.forEach((grid) => {
        // grid.removeEventListener('click', clickStyle);
        grid.onclick = null;
      });
      console.log('Human win');
      bigWin.textContent = 'Player win';
    }
  }

  for (let i = 0; i < grids.length; i++) {
    grids[i].classList.add(`grid${i}`);
    grids[i].style.cursor = 'pointer';
    // grids[i].addEventListener('click', active);
    grids[i].onclick = function active() {
      console.log(this);
      clickStyle(this);
    };
  }
};

export default createClick;
