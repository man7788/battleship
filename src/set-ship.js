import hoverGrid from './hover';
import { highLightGrid } from './display-ships';
import { convertNum } from './convert';
import createClick from './click-board';

const gridIndex = (grid) => {
  const re = /[0-9]+/;
  const num = grid.className;
  const gridNum = re.exec(num.slice(num.length - 2, num.length))[0];
  return gridNum;
};

const setPlayerShip = (playerBoard, humanPlayer, computerBoard) => {
  const grids = document.querySelectorAll('.small-grid');
  const button = document.querySelector('.small-rotate');

  const convertLength = {};
  for (let i = 0; i < 8; i++) {
    if (i >= 0 && i < 3) {
      convertLength[i] = 5 - i;
    } else if (i === 3 || i === 4) {
      convertLength[i] = 2;
    } else if (i === 5 || i === 6) {
      convertLength[i] = 1;
    }
  }

  for (let i = 0; i < grids.length; i++) {
    grids[i].classList.add(`grid${i}`);
  }

  const getLength = () => {
    const recordLength = Object.keys(playerBoard.shipRecord).length;
    const length = convertLength[recordLength];
    return length;
  };

  let orient = 'vertical';

  const rotate = () => {
    if (orient === 'vertical') {
      orient = 'horizontal';
    } else if (orient === 'horizontal') {
      orient = 'vertical';
    }

    const promise1 = Promise.resolve(wipeHover());

    promise1.then(() => {
      getHover();
    });
  };

  let hover = hoverGrid();

  const getHover = () => {
    hover = hoverGrid(getLength(), orient);
    hover.display();
  };

  const wipeHover = () => {
    hover.wipe();
    highLightGrid(playerBoard.shipRecord);
  };

  const clickGrids = () => {
    for (let i = 0; i < grids.length; i++) {
      grids[i].addEventListener('click', place);
    }
  };

  const removeClicks = () => {
    // Start Game
    for (let i = 0; i < grids.length; i++) {
      grids[i].removeEventListener('click', place);
    }
    createClick(humanPlayer, computerBoard, playerBoard);
  };

  function place() {
    const index = gridIndex(this);
    const table = convertNum();

    const promise1 = Promise.resolve(
      playerBoard.placeShip(
        table[index][0],
        table[index][1],
        getLength(),
        orient
      )
    );
    promise1
      .then(() => {
        wipeHover();
      })
      .then(() => {
        if (getLength() < 7) {
          getHover();
        } else {
          removeClicks();
        }
        // console.log(board.shipRecord);
      });
  }

  function clickStart() {
    this.textContent = 'Rotate';
    getHover();
    clickGrids();
    button.removeEventListener('click', clickStart);
    button.addEventListener('click', rotate);
  }

  button.addEventListener('click', clickStart);
};

export default setPlayerShip;
