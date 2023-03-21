import Ship from './ship';

const Grid = (x, y, up, right, ship) => {
  const coord = [x, y];
  return { coord, up, right, ship };
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

  const placeShip = (x, y, length, orient, count = 0) => {
    if (count === length) {
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
        return placeShip(x + 1, y, length, orient, count + 1);
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

    return fullBoard;
  };

  const fullBoard = makeBoard();

  return { fullBoard, placeShip, findGrid };
};

export default Gameboard;
