import Ship from './ship';

const Grid = (x, y, up, right, ship, miss = false) => {
  const coord = [x, y];
  return { coord, up, right, ship, miss };
};

const Gameboard = () => {
  const makeBoard = (x = 0, y = 0) => {
    if (x > 9 || y > 9) {
      return null;
    }

    const board = Grid(x, y, makeBoard(x + 1, y), makeBoard(x, y + 1));

    return board;
  };

  const findGrid = (grid, p, q) => {
    if (grid.coord[0] !== p) {
      grid = grid.up;
      return findGrid(grid, p, q);
    }

    if (grid.coord[0] === p) {
      if (grid.coord[1] !== q) {
        grid = grid.right;
        return findGrid(grid, p, q);
      }
    }
    return grid;
  };

  const surveyGrid = (x, y, length, orient, count = 0) => {
    if (count === length) {
      return true;
    }
    if (findGrid(fullBoard, x, y).ship === undefined) {
      if (orient === 'vertical') {
        return surveyGrid(x + 1, y, length, orient, count + 1);
      }
      if (orient === 'horizontal') {
        return surveyGrid(x, y + 1, length, orient, count + 1);
      }
    }
    return false;
  };

  const placeShip = (x, y, length, orient, count = 0, record = []) => {
    if (count === length) {
      const shipName = fleet[length];
      shipRecord[shipName] = record;
      return;
    }

    if (x + length > 9 || y + length > 9) {
      return 'Ship over border';
    }

    if (findGrid(fullBoard, x, y).ship !== undefined) {
      return `Space already taken`;
    }

    if (orient === 'vertical') {
      if (surveyGrid(x, y, length, 'vertical') === true) {
        const target = findGrid(fullBoard, x, y);
        target.ship = Ship(length);
        const recordKey = target.coord;
        record[recordKey] = recordKey;
        return placeShip(x + 1, y, length, orient, count + 1, record);
      }
      if (surveyGrid(x, y, length, 'vertical') === false) {
        return `Space already taken`;
      }
    }

    if (orient === 'horizontal') {
      if (surveyGrid(x, y, length, 'horizontal') === true) {
        const target = findGrid(fullBoard, x, y);
        target.ship = Ship(length);
        return placeShip(x, y + 1, length, orient, count + 1);
      }
      if (surveyGrid(x, y, length, 'horizontal') === false) {
        return `Space already taken`;
      }
    }
  };

  // const findSunk = () => {
  //   let allSunk = false;
  //   const sunkCount = [];
  //   shipRecord.forEach((grid) => {
  //     if (grid.ship.hit === true) {
  //       sunkCount.push(grid);
  //     }
  //   });
  //   if (sunkCount.length === shipRecord.length) {
  //     allSunk = true;
  //   }
  //   return allSunk;
  // };

  const receiveAttack = (x, y) => {
    const target = findGrid(fullBoard, x, y);
    const coord = [x, y];
    const attackShip = [];
    if (target.ship !== undefined) {
      if (hitRecord[coord] === undefined) {
        const fleet = Object.keys(shipRecord);
        fleet.forEach((ship) => {
          const currentShip = shipRecord[ship];
          if (currentShip[coord] !== undefined) {
            attackShip.push(ship);
            console.log(attackShip);
          }
        });
      }
      const allCoord = shipRecord[attackShip[0]];
      const allKeys = Object.keys(allCoord);
      allKeys.forEach((keys) => {
        const property = allCoord[keys];
        const oneHit = findGrid(fullBoard, property[0], property[1]);
        oneHit.ship.hit();
      });
    }

    // if (target.ship === undefined) {
    //   if (target.miss === false) {
    //     target.miss = true;
    //   } else {
    //     return 'Hitting a missed shot again';
    //   }
    // }

    // if (findSunk() === true) {
    //   return 'All ships sunk';
    // }
  };

  const fullBoard = makeBoard();
  const shipRecord = {};
  const hitRecord = {};
  const fleet = { 3: 'Crusier' };

  return {
    fullBoard,
    placeShip,
    findGrid,
    receiveAttack,
    shipRecord,
    hitRecord,
  };
};

export default Gameboard;
