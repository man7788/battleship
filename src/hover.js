// Make grid hover according to current ship length
const hoverGrid = (length, orient) => {
  const allGrids = () => {
    const grids = document.querySelectorAll('.small-grid');
    return grids;
  };

  const gridIndex = (grid) => {
    const re = /[0-9]+/;
    const num = grid.className;
    const gridNum = re.exec(num.slice(num.length - 2, num.length))[0];
    return gridNum;
  };

  const grids = allGrids();

  if (orient === 'vertical') {
    for (let i = 0; i < grids.length; i++) {
      grids[i].classList.add(`grid${i}`);
      grids[i].addEventListener('mouseover', (e) => {
        vHover(e.target, length);
      });
      grids[i].addEventListener('mouseleave', (e) => {
        vLeave(e.target, length);
      });
    }
  }

  if (orient === 'horizontal') {
    for (let i = 0; i < grids.length; i++) {
      grids[i].classList.add(`grid${i}`);
      grids[i].addEventListener('mouseover', (e) => {
        hHover(e.target, length);
      });
      grids[i].addEventListener('mouseleave', (e) => {
        hLeave(e.target, length);
      });
    }
  }

  // Vertical
  const vHover = (base, vLength, count = 0) => {
    if (count === length) {
      return;
    }

    let num = 0;

    if (count === 0) {
      num = Number(gridIndex(base));
    }

    if (count > 0) {
      num = Number(gridIndex(base)) - 10;
    }

    const target = document.querySelector(`.grid${num}`);

    if (target !== null) {
      target.style.background = 'cyan';
      return vHover(target, vLength, count + 1);
    }
  };

  const vLeave = (base, vLength, count = 0) => {
    if (count === length) {
      return;
    }

    let num = 0;

    if (count === 0) {
      num = Number(gridIndex(base));
    }

    if (count > 0) {
      num = Number(gridIndex(base)) - 10;
    }

    const target = document.querySelector(`.grid${num}`);

    if (target !== null) {
      target.style.background = 'none';
      return vLeave(target, vLength, count + 1);
    }
  };

  // Horizontal
  const hHover = (base, hLength, count = 0, check = []) => {
    if (count === length) {
      return;
    }

    let num = 0;

    if (count === 0) {
      num = Number(gridIndex(base));
    }

    if (count > 0) {
      num = Number(gridIndex(base)) + 1;
    }

    check.push(num);

    const target = document.querySelector(`.grid${num}`);

    if (count === 0) {
      target.style.background = 'cyan';
      return hHover(target, hLength, count + 1, check);
    }

    if (
      count > 0 &&
      target !== null &&
      Number(String(check[check.length - 1]).slice(-1)) >
        Number(String(check[0]).slice(-1))
    ) {
      target.style.background = 'cyan';
      return hHover(target, hLength, count + 1, check);
    }
  };

  const hLeave = (base, hLength, count = 0, check = []) => {
    if (count === length) {
      return;
    }

    let num = 0;

    if (count === 0) {
      num = Number(gridIndex(base));
    }

    if (count > 0) {
      num = Number(gridIndex(base)) + 1;
    }

    check.push(num);

    const target = document.querySelector(`.grid${num}`);

    if (count === 0) {
      target.style.background = 'none';
      return hLeave(target, hLength, count + 1, check);
    }

    if (
      count > 0 &&
      target !== null &&
      Number(String(check[check.length - 1]).slice(-1)) >
        Number(String(check[0]).slice(-1))
    ) {
      target.style.background = 'none';
      return hLeave(target, hLength, count + 1, check);
    }
  };
};

export default hoverGrid;
