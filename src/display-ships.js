const convert = (num = 0, x = 9, y = 0, table = {}) => {
  if (num > 99) {
    return table;
  }
  const coord = [x, y];
  table[coord] = num;
  if (y === 9) {
    x -= 1;
    y = -1;
  }
  return convert(num + 1, x, y + 1, table);
};

const highlightGrid = (ships) => {
  const targets = [];
  const grids = document.querySelectorAll('.small-grid');

  Object.keys(ships).forEach((key) => {
    const coords = ships[key];
    Object.keys(coords).forEach((coord) => {
      targets.push(coord);
    });
  });

  const table = convert();

  targets.forEach((target) => {
    const index = table[target];
    grids[index].style.border = '2px cyan solid';
  });
};

export default highlightGrid;
