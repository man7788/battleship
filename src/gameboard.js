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

  const placeShip = (x, y, length, orient, count = 0, record = {}) => {
    const shipName = fleet[length];
    if (shipRecord[shipName] !== undefined) {
      return 'Ship not available';
    }

    if (count === length) {
      if (shipName === 'Destroyer1') {
        fleet[length] = 'Destroyer2';
      }
      if (shipName === 'Submarine1') {
        fleet[length] = 'Submarine2';
      }
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
        const recordKey = target.coord;
        record[recordKey] = recordKey;
        return placeShip(x, y + 1, length, orient, count + 1, record);
      }
      if (surveyGrid(x, y, length, 'horizontal') === false) {
        return `Space already taken`;
      }
    }
  };

  const checkSunk = () => {
    const shipKeys = Object.keys(shipRecord);
    shipKeys.forEach((ship) => {
      const coordObj = shipRecord[ship];
      const coordKeys = Object.keys(coordObj);
      const checkShip = findGrid(
        fullBoard,
        Number(coordKeys[0][0]),
        Number(coordKeys[0][2])
      );
      checkShip.ship.calSunk();
      if (checkShip.ship.isSunk() === true) {
        sunkRecord.push(ship);
      }
    });

    if (sunkRecord.length === shipKeys.length) {
      return 'All ships sunk';
    }
    return 'Not all ships sunk';
  };

  const receiveAttack = (x, y) => {
    const target = findGrid(fullBoard, x, y);
    const coord = [x, y];
    const attackShip = [];

    if (target.ship !== undefined) {
      if (hitRecord[coord] === undefined) {
        hitRecord[coord] = coord;
        const fleet = Object.keys(shipRecord);
        fleet.forEach((ship) => {
          const currentShip = shipRecord[ship];
          if (currentShip[coord] !== undefined) {
            attackShip.push(ship);
          }
        });
        const allCoord = shipRecord[attackShip[0]];
        const allKeys = Object.keys(allCoord);
        allKeys.forEach((keys) => {
          const property = allCoord[keys];
          const oneHit = findGrid(fullBoard, property[0], property[1]);
          oneHit.ship.hit();
        });
      } else if (hitRecord[coord] !== undefined) {
        return 'Ship already hit';
      }
    }

    if (target.ship === undefined) {
      if (target.miss === false) {
        target.miss = true;
      } else {
        return 'Hitting a missed shot again';
      }
    }
  };

  const fullBoard = makeBoard();
  const shipRecord = {};
  const hitRecord = {};
  const sunkRecord = [];
  const fleet = {
    5: 'Carrier',
    4: 'Battleship',
    3: 'Crusier',
    2: 'Destroyer1',
    1: 'Submarine1',
  };

  return {
    fullBoard,
    placeShip,
    findGrid,
    receiveAttack,
    shipRecord,
    hitRecord,
    checkSunk,
  };
};

export default Gameboard;
