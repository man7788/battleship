// Make grid hover according to current ship length
const hoverGrid = (length, orient) => {
  const grids = document.querySelectorAll('.small-grid');

  const gridIndex = (grid) => {
    const re = /[0-9]+/;
    const num = grid.className;
    const gridNum = re.exec(num.slice(num.length - 2, num.length))[0];
    return gridNum;
  };

  const display = () => {
    if (orient === 'vertical') {
      for (let i = 0; i < grids.length; i++) {
        grids[i].addEventListener('mouseover', vHover);
        grids[i].addEventListener('mouseleave', vLeave);
      }
    }

    if (orient === 'horizontal') {
      for (let i = 0; i < grids.length; i++) {
        grids[i].addEventListener('mouseover', hHover);
        grids[i].addEventListener('mouseleave', hLeave);
      }
    }
  };

  const wipe = () => {
    for (let i = 0; i < grids.length; i++) {
      grids[i].style.background = 'none';
    }

    if (orient === 'vertical') {
      for (let i = 0; i < grids.length; i++) {
        grids[i].removeEventListener('mouseover', vHover);
        grids[i].removeEventListener('mouseleave', vLeave);
      }
    }
    if (orient === 'horizontal') {
      for (let i = 0; i < grids.length; i++) {
        grids[i].removeEventListener('mouseover', hHover);
        grids[i].removeEventListener('mouseleave', hLeave);
      }
    }
  };

  // Vertical
  function vHover(base, count = 0) {
    if (count === length) {
      return;
    }

    let num = 0;

    if (count === 0) {
      num = Number(gridIndex(this));
    }

    if (count > 0) {
      num = Number(gridIndex(base)) - 10;
    }

    const target = document.querySelector(`.grid${num}`);

    if (target !== null) {
      target.style.background = 'cyan';
      return vHover(target, count + 1);
    }
  }

  function vLeave(base, count = 0) {
    if (count === length) {
      return;
    }

    let num = 0;

    if (count === 0) {
      num = Number(gridIndex(this));
    }

    if (count > 0) {
      num = Number(gridIndex(base)) - 10;
    }

    const target = document.querySelector(`.grid${num}`);

    if (target !== null) {
      target.style.background = 'none';
      return vLeave(target, count + 1);
    }
  }

  // Horizontal
  function hHover(base, count = 0, check = []) {
    if (count === length) {
      return;
    }

    let num = 0;

    if (count === 0) {
      num = Number(gridIndex(this));
    }

    if (count > 0) {
      num = Number(gridIndex(base)) + 1;
    }

    check.push(num);

    const target = document.querySelector(`.grid${num}`);

    if (count === 0) {
      target.style.background = 'cyan';
      return hHover(target, count + 1, check);
    }

    if (
      count > 0 &&
      target !== null &&
      Number(String(check[check.length - 1]).slice(-1)) >
        Number(String(check[0]).slice(-1))
    ) {
      target.style.background = 'cyan';
      return hHover(target, count + 1, check);
    }
  }

  function hLeave(base, count = 0, check = []) {
    if (count === length) {
      return;
    }

    let num = 0;

    if (count === 0) {
      num = Number(gridIndex(this));
    }

    if (count > 0) {
      num = Number(gridIndex(base)) + 1;
    }

    check.push(num);

    const target = document.querySelector(`.grid${num}`);

    if (count === 0) {
      target.style.background = 'none';
      return hLeave(target, count + 1, check);
    }

    if (
      count > 0 &&
      target !== null &&
      Number(String(check[check.length - 1]).slice(-1)) >
        Number(String(check[0]).slice(-1))
    ) {
      target.style.background = 'none';
      return hLeave(target, count + 1, check);
    }
  }
  return { display, wipe };
};

export default hoverGrid;
