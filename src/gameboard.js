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

  const placeShip = (x, y, length) => {
    const target = findGrid(fullBoard, x, y);
    target.ship = Ship(length);
    return fullBoard;
  };

  const fullBoard = makeBoard();

  return { fullBoard, placeShip, findGrid };
};

export default Gameboard;
