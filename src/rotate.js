import { convertNum, convertCoord } from './convert';
import { highLightGrid } from './display-ships';

// Make a function to rotate ship
const rotate = (coord, ships, board, grids, table) => {
  const shipBase = [];
  // Find ship from coord
  Object.keys(ships).forEach((key) => {
    const oneShip = ships[key];
    const shipCoords = Object.keys(oneShip);
    const shipLength = shipCoords.length;
    shipCoords.forEach((part) => {
      if (Number(part[0]) === coord[0] && Number(part[2]) === coord[1]) {
        shipBase.push([Number(shipCoords[0][0]), Number(shipCoords[0][2])]);
        shipBase.push(shipLength);
        shipBase.push(
          board.findGrid(board.fullBoard, shipBase[0][0], shipBase[0][1]).ship
            .orient
        );
        delete ships[key];

        for (let i = 0; i < shipCoords.length; i++) {
          const newX = Number(shipCoords[i][0]);
          const newY = Number(shipCoords[i][2]);
          // Set fullboard ships to undefined
          board.findGrid(board.fullBoard, newX, newY).ship = undefined;
          // Set grid to not hightlight
          const index = table[[newX, newY]];
          grids[index].style.border = '2px solid gray';
        }
      }
    });
  });

  // if vertical, place ship horizontal using first coord
  if (shipBase[2] === 'vertical') {
    const check = board.placeShip(
      shipBase[0][0],
      shipBase[0][1],
      shipBase[1],
      'horizontal'
    );
    if (check === undefined) {
      board.placeShip(
        shipBase[0][0],
        shipBase[0][1],
        shipBase[1],
        'horizontal'
      );
    }
    if (check !== undefined) {
      board.placeShip(shipBase[0][0], shipBase[0][1], shipBase[1], 'vertical');
    }

    console.log(check);
  }
  // if horizontal, place ship vertical using first coord
  if (shipBase[2] === 'horizontal') {
    const check = board.placeShip(
      shipBase[0][0],
      shipBase[0][1],
      shipBase[1],
      'vertical'
    );
    if (check === undefined) {
      board.placeShip(shipBase[0][0], shipBase[0][1], shipBase[1], 'vertical');
    }
    if (check !== undefined) {
      board.placeShip(
        shipBase[0][0],
        shipBase[0][1],
        shipBase[1],
        'horizontal'
      );
    }
    console.log(ships);
  }
  // Place ship back to original if out of range/place occupied
};
// Go to ship record, create click event to rotate ship

const rotateShip = (ships, board) => {
  const allGrids = () => {
    const grids = document.querySelectorAll('.small-grid');
    return grids;
  };

  const gridIndex = (grid) => {
    const re = /[0-9]+/;
    const num = grid.className;
    const gridNum = re.exec(num.slice(num.length - 2, num.length))[0];
    const coord = convertNum();
    return coord[gridNum];
  };

  const targets = [];
  const grids = allGrids();

  for (let i = 0; i < grids.length; i++) {
    grids[i].classList.add(`grid${i}`);
  }

  Object.keys(ships).forEach((key) => {
    const coords = ships[key];
    Object.keys(coords).forEach((coord) => {
      targets.push(coord);
    });
  });

  const table = convertCoord();

  targets.forEach((target) => {
    const index = table[target];
    // Rotate function goes here
    grids[index].addEventListener('click', (e) => {
      const coord = gridIndex(e.target);
      rotate(coord, ships, board, grids, table);
      highLightGrid(ships);
    });
  });
};

export default rotateShip;
