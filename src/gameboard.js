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

  const placeShip = (x, y, length, orient, count = 0) => {
    if (count === length) {
      return;
    }

    if (x + length > 9 || y + length > 9) {
      return 'Ship over border';
    }

    if (findGrid(fullBoard, x, y).ship !== undefined) {
      return 'Space already taken';
    }

    if (orient === 'vertical') {
      const target = findGrid(fullBoard, x, y);
      if (x + length <= 9) {
        target.ship = Ship(length);
        return placeShip(x + 1, y, length, orient, count + 1);
      }
    }
    if (orient === 'horizontal') {
      const target = findGrid(fullBoard, x, y);
      if (y + length <= 9) {
        target.ship = Ship(length);
        return placeShip(x, y + 1, length, orient, count + 1);
      }
    }

    return fullBoard;
  };

  const fullBoard = makeBoard();

  return { fullBoard, placeShip, findGrid };
};

export default Gameboard;
