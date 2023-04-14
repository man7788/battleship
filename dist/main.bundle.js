/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/click-board.js":
/*!****************************!*\
  !*** ./src/click-board.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _convert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./convert */ "./src/convert.js");
/* harmony import */ var _display_ships__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display-ships */ "./src/display-ships.js");


const gridIndex = grid => {
  const re = /[0-9]+/;
  const num = grid.className;
  const gridNum = re.exec(num.slice(num.length - 2, num.length))[0];
  const coord = (0,_convert__WEBPACK_IMPORTED_MODULE_0__.convertNum)();
  return coord[gridNum];
};
const createClick = (player, computerBoard, playerBoard) => {
  const grids = document.querySelectorAll('.big-grid');
  // const smallWin = document.querySelector('.small-win');
  const bigWin = document.querySelector('.big-win');
  function clickStyle() {
    const target = gridIndex(this);
    player.attack(target[0], target[1]);
    const result = computerBoard.findGrid(computerBoard.fullBoard, target[0], target[1]);
    if (result.miss === true) {
      this.textContent = '/';
      this.style.fontSize = '2rem';
      this.style.color = 'whitesmoke';
    }
    if (result.ship !== undefined) {
      this.textContent = 'X';
      this.style.fontSize = '2rem';
      this.style.color = 'red';
    }
    this.removeEventListener('click', clickStyle);
    const computerSunk = computerBoard.checkSunk();
    if (computerSunk === false) {
      (0,_display_ships__WEBPACK_IMPORTED_MODULE_1__.displayHit)(playerBoard);
      const playerSunk = playerBoard.checkSunk();
      if (playerSunk === true) {
        grids.forEach(grid => {
          grid.removeEventListener('click', clickStyle);
        });
        console.log('Computer win');
        bigWin.textContent = 'Opponent Win';
      }
    }
    if (computerSunk === true) {
      grids.forEach(grid => {
        grid.removeEventListener('click', clickStyle);
      });
      console.log('Human win');
      bigWin.textContent = 'Player win';
    }

    // console.log(computerBoard.shipRecord);
    // console.log(computerBoard.sunkRecord);
  }

  for (let i = 0; i < grids.length; i++) {
    grids[i].classList.add(`grid${i}`);
    grids[i].style.cursor = 'pointer';
    grids[i].addEventListener('click', clickStyle);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createClick);

/***/ }),

/***/ "./src/convert.js":
/*!************************!*\
  !*** ./src/convert.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convertCoord": () => (/* binding */ convertCoord),
/* harmony export */   "convertNum": () => (/* binding */ convertNum)
/* harmony export */ });
const convertCoord = function () {
  let num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  let x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;
  let y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  let table = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  if (num > 99) {
    return table;
  }
  const coord = [x, y];
  table[coord] = num;
  if (y === 9) {
    x -= 1;
    y = -1;
  }
  return convertCoord(num + 1, x, y + 1, table);
};
const convertNum = function () {
  let num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  let x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;
  let y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  let table = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  if (num > 99) {
    return table;
  }
  const coord = [x, y];
  table[num] = coord;
  if (y === 9) {
    x -= 1;
    y = -1;
  }
  return convertNum(num + 1, x, y + 1, table);
};


/***/ }),

/***/ "./src/display-ships.js":
/*!******************************!*\
  !*** ./src/display-ships.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayHit": () => (/* binding */ displayHit),
/* harmony export */   "highBig": () => (/* binding */ highBig),
/* harmony export */   "highLightGrid": () => (/* binding */ highLightGrid)
/* harmony export */ });
/* harmony import */ var _convert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./convert */ "./src/convert.js");

const allGrids = () => {
  const grids = document.querySelectorAll('.small-grid');
  return grids;
};
const highLightGrid = ships => {
  const targets = [];
  const grids = allGrids();
  Object.keys(ships).forEach(key => {
    const coords = ships[key];
    Object.keys(coords).forEach(coord => {
      targets.push(coord);
    });
  });
  const table = (0,_convert__WEBPACK_IMPORTED_MODULE_0__.convertCoord)();
  targets.forEach(target => {
    const index = table[target];
    grids[index].style.border = '2px cyan solid';
  });
};
const highBig = ships => {
  const targets = [];
  const grids = document.querySelectorAll('.big-grid');
  Object.keys(ships).forEach(key => {
    const coords = ships[key];
    Object.keys(coords).forEach(coord => {
      targets.push(coord);
    });
  });
  const table = (0,_convert__WEBPACK_IMPORTED_MODULE_0__.convertCoord)();
  targets.forEach(target => {
    const index = table[target];
    grids[index].style.border = '2px cyan solid';
  });
};
const displayHit = board => {
  const keys = Object.keys(board.hitRecord);
  const coord = board.hitRecord[keys[keys.length - 1]];
  const target = board.findGrid(board.fullBoard, coord[0], coord[1]);
  const grids = allGrids();
  const table = (0,_convert__WEBPACK_IMPORTED_MODULE_0__.convertCoord)();
  const gridNum = table[coord];
  if (target.miss === true) {
    grids[gridNum].textContent = 'X';
    grids[gridNum].style.fontSize = '1.5rem';
    grids[gridNum].style.color = 'whitesmoke';
  }
  if (target.ship !== undefined) {
    grids[gridNum].textContent = 'X';
    grids[gridNum].style.fontSize = '1.5rem';
    grids[gridNum].style.color = 'red';
  }
};


/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");

const Grid = function (x, y, up, right, ship) {
  let miss = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  let boundary = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  const coord = [x, y];
  return {
    coord,
    up,
    right,
    ship,
    miss,
    boundary
  };
};
const Gameboard = () => {
  const makeBoard = function () {
    let x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    let y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
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
  const surveyGrid = function (x, y, length, orient) {
    let count = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
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
  const placeBoundary = (x, y) => {
    const list = [];
    if (x + 1 < 10) {
      list.push(findGrid(fullBoard, x + 1, y));
    }
    if (x - 1 > 0) {
      list.push(findGrid(fullBoard, x - 1, y));
    }
    if (y - 1 > 0) {
      list.push(findGrid(fullBoard, x, y - 1));
    }
    if (y + 1 < 10) {
      list.push(findGrid(fullBoard, x, y + 1));
    }
    if (x + 1 < 10 && y - 1 > 0) {
      list.push(findGrid(fullBoard, x + 1, y - 1));
    }
    if (x + 1 < 10 && y + 1 < 10) {
      list.push(findGrid(fullBoard, x + 1, y + 1));
    }
    if (x - 1 > 0 && y - 1 > 0) {
      list.push(findGrid(fullBoard, x - 1, y - 1));
    }
    if (x - 1 < 10 && y + 1 > 10) {
      list.push(findGrid(fullBoard, x - 1, y + 1));
    }
    list.forEach(ship => {
      ship.boundary = true;
    });
  };
  const placeShip = function (x, y, length, orient) {
    let count = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    let record = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    let checkLength = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
    let survey = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
    if (checkLength === true) {
      if (x + length > 10 && orient === 'vertical') {
        return 'Ship over border';
      }
      if (y + length > 10 && orient === 'horizontal') {
        return 'Ship over border';
      }
    }
    if (survey === null) {
      if (orient === 'vertical') {
        survey = surveyGrid(x, y, length, 'vertical');
      }
      if (orient === 'horizontal') {
        survey = surveyGrid(x, y, length, 'horizontal');
      }
    }
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
    if (findGrid(fullBoard, x, y).ship !== undefined) {
      return `Space already taken`;
    }
    if (orient === 'vertical') {
      if (survey === true) {
        // placeBoundary(x, y);
        const target = findGrid(fullBoard, x, y);
        target.ship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(length, 'vertical');
        const recordKey = target.coord;
        record[recordKey] = recordKey;
        checkLength = false;
        return placeShip(x + 1, y, length, orient, count + 1, record, checkLength, survey);
      }
      if (survey === false) {
        return `Space already taken`;
      }
    }
    if (orient === 'horizontal') {
      if (survey === true) {
        // placeBoundary(x, y);
        const target = findGrid(fullBoard, x, y);
        target.ship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(length, 'horizontal');
        const recordKey = target.coord;
        record[recordKey] = recordKey;
        checkLength = false;
        return placeShip(x, y + 1, length, orient, count + 1, record, checkLength, survey);
      }
      if (survey === false) {
        return `Space already taken`;
      }
    }
  };
  const checkSunk = () => {
    const shipKeys = Object.keys(shipRecord);
    shipKeys.forEach(ship => {
      const coordObj = shipRecord[ship];
      const coordKeys = Object.keys(coordObj);
      const checkShip = findGrid(fullBoard, Number(coordKeys[0][0]), Number(coordKeys[0][2]));
      checkShip.ship.calSunk();
      if (checkShip.ship.isSunk() === true) {
        if (!Object.keys(sunkRecord).includes(ship)) {
          sunkRecord[ship] = ship;
        }
      }
    });
    if (Object.keys(sunkRecord).length === shipKeys.length) {
      return true;
    }
    return false;
  };
  const receiveAttack = (x, y) => {
    const target = findGrid(fullBoard, x, y);
    const coord = [x, y];
    const attackShip = [];
    if (target.ship !== undefined) {
      if (hitRecord[coord] === undefined) {
        hitRecord[coord] = coord;
        const fleet = Object.keys(shipRecord);
        fleet.forEach(ship => {
          const currentShip = shipRecord[ship];
          if (currentShip[coord] !== undefined) {
            attackShip.push(ship);
          }
        });
        const allCoord = shipRecord[attackShip[0]];
        const allKeys = Object.keys(allCoord);
        allKeys.forEach(keys => {
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
        hitRecord[coord] = coord;
        target.miss = true;
      } else {
        return 'Hitting a missed shot again';
      }
    }
  };
  const fullBoard = makeBoard();
  const shipRecord = {};
  const hitRecord = {};
  const sunkRecord = {};
  const fleet = {
    5: 'Carrier',
    4: 'Battleship',
    3: 'Crusier',
    2: 'Destroyer1',
    1: 'Submarine1'
  };
  return {
    fullBoard,
    placeShip,
    findGrid,
    receiveAttack,
    shipRecord,
    hitRecord,
    checkSunk,
    sunkRecord,
    placeBoundary
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./src/hover.js":
/*!**********************!*\
  !*** ./src/hover.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Make grid hover according to current ship length
const hoverGrid = (length, orient) => {
  const grids = document.querySelectorAll('.small-grid');
  const gridIndex = grid => {
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
  function vHover(base) {
    let count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
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
  function vLeave(base) {
    let count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
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
  function hHover(base) {
    let count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    let check = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
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
    if (count > 0 && target !== null && Number(String(check[check.length - 1]).slice(-1)) > Number(String(check[0]).slice(-1))) {
      target.style.background = 'cyan';
      return hHover(target, count + 1, check);
    }
  }
  function hLeave(base) {
    let count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    let check = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
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
    if (count > 0 && target !== null && Number(String(check[check.length - 1]).slice(-1)) > Number(String(check[0]).slice(-1))) {
      target.style.background = 'none';
      return hLeave(target, count + 1, check);
    }
  }
  return {
    display,
    wipe
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hoverGrid);

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Player = (enemyBoard, computerPlayer, ownBoard) => {
  // Add human on
  // Human only for testing, remove after
  let ai = false;
  const computerOn = () => {
    ai = true;
  };
  const computer = () => ai;
  const attack = (x, y) => {
    enemyBoard.receiveAttack(x, y);
    if (computerPlayer !== undefined) {
      if (computerPlayer.computer() === true) {
        // autoMove();
        humanAutoMove();
      }
    }
  };
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Add autoMove if human on, target coord in ship record
  // Human autoMove only for testing, remove after
  const humanAutoMove = () => {
    const coords = [];
    const shipKeys = Object.keys(ownBoard.shipRecord);
    const hitKeys = Object.keys(ownBoard.hitRecord);
    shipKeys.forEach(ship => {
      const coordObj = ownBoard.shipRecord[ship];
      const coordKeys = Object.keys(coordObj);
      coordKeys.forEach(coord => {
        coords.push(coord);
      });
    });
    ownBoard.receiveAttack(Number(coords[hitKeys.length][0]), Number(coords[hitKeys.length][2]));
    // console.log(coords, coords[0][0], coords[0][2], ownBoard.hitRecord);
  };

  const autoMove = () => {
    const x = getRandomInt(0, 9);
    const y = getRandomInt(0, 9);
    const response = ownBoard.receiveAttack(x, y);
    if (response !== undefined) {
      return autoMove();
    }
  };
  return {
    attack,
    computerOn,
    computer,
    getRandomInt
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/set-ship.js":
/*!*************************!*\
  !*** ./src/set-ship.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _hover__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hover */ "./src/hover.js");
/* harmony import */ var _display_ships__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display-ships */ "./src/display-ships.js");
/* harmony import */ var _convert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./convert */ "./src/convert.js");
/* harmony import */ var _click_board__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./click-board */ "./src/click-board.js");




const gridIndex = grid => {
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
  let hover = (0,_hover__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const getHover = () => {
    hover = (0,_hover__WEBPACK_IMPORTED_MODULE_0__["default"])(getLength(), orient);
    hover.display();
  };
  const wipeHover = () => {
    hover.wipe();
    (0,_display_ships__WEBPACK_IMPORTED_MODULE_1__.highLightGrid)(playerBoard.shipRecord);
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
    (0,_click_board__WEBPACK_IMPORTED_MODULE_3__["default"])(humanPlayer, computerBoard, playerBoard);
  };
  function place() {
    const index = gridIndex(this);
    const table = (0,_convert__WEBPACK_IMPORTED_MODULE_2__.convertNum)();
    const promise1 = Promise.resolve(playerBoard.placeShip(table[index][0], table[index][1], getLength(), orient));
    promise1.then(() => {
      wipeHover();
    }).then(() => {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setPlayerShip);

/***/ }),

/***/ "./src/setup.js":
/*!**********************!*\
  !*** ./src/setup.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "computerBoard": () => (/* binding */ computerBoard),
/* harmony export */   "humanPlayer": () => (/* binding */ humanPlayer),
/* harmony export */   "playerBoard": () => (/* binding */ playerBoard)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");


const playerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
const computerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
const computerPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_1__["default"])(playerBoard);
computerPlayer.computerOn();
const humanPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_1__["default"])(computerBoard, computerPlayer, playerBoard);


/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Ship = (length, orient) => {
  let sunk = false;
  let totalHits = 0;
  const hit = () => {
    totalHits += 1;
  };
  const calSunk = () => {
    if (length === totalHits) {
      sunk = true;
    }
  };
  const hits = () => totalHits;
  const isSunk = () => sunk;
  return {
    length,
    hit,
    calSunk,
    hits,
    isSunk,
    orient
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  font-family: sans-serif;\n}\n\nbody {\n  background-color: rgb(30, 30, 30);\n}\n\n.container {\n  border: 1px soild red;\n  display: grid;\n  grid-template-rows: 1fr 10fr 1fr;\n  height: 100vh;\n}\n\n.title-div {\n  border: 2px solid greenyellow;\n  display: flex;\n  grid-row: 1 / 2;\n  justify-content: center;\n  align-items: center;\n  color: gray;\n  font-size: 2.5rem;\n}\n\n.board-div {\n  display: grid;\n  grid-template-columns: 5fr 1fr 1fr 1fr 5fr;\n  width: 100vw;\n  /* height: fit-content; */\n  grid-row: 2 / 3;\n  color: whitesmoke;\n}\n\n.small-container {\n  border: 2px solid tomato;\n  height: fit-content;\n  display: flex;\n  flex-direction: column;\n  grid-column: 2 / 3;\n}\n\n.small-board {\n  border: 2px solid orange;\n  width: 25rem;\n  height: 25rem;\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(11, 1fr);\n\n}\n\n.small-num,\n.small-apl {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.small-grid {\n  border: 2px solid gray;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n} \n\n.small-rotate {\n  width: fit-content;\n  align-self: center;\n}\n\n.small-name,\n.small-win {\n  align-self: center;\n}\n\n.big-container {\n  border: 2px solid tomato;\n  height: fit-content;\n  display: flex;\n  flex-direction: column;\n  grid-column: 4 / 5;\n}\n\n.big-board {\n  border: 2px solid orange;\n  width: 30rem;\n  height: 30rem;\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(11, 1fr);\n}\n\n.big-num,\n.big-alp {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.25rem;\n}\n\n.big-grid {\n  border: 2px solid gray;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n} \n\n.big-name {\n  align-self: center;\n}\n\n.message {\n  color: whitesmoke;\n  font-size: 1rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.small-win,\n.big-win {\n  align-self: center;\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,UAAU;EACV,SAAS;EACT,sBAAsB;EACtB,uBAAuB;AACzB;;AAEA;EACE,iCAAiC;AACnC;;AAEA;EACE,qBAAqB;EACrB,aAAa;EACb,gCAAgC;EAChC,aAAa;AACf;;AAEA;EACE,6BAA6B;EAC7B,aAAa;EACb,eAAe;EACf,uBAAuB;EACvB,mBAAmB;EACnB,WAAW;EACX,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,0CAA0C;EAC1C,YAAY;EACZ,yBAAyB;EACzB,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,wBAAwB;EACxB,mBAAmB;EACnB,aAAa;EACb,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;EACxB,YAAY;EACZ,aAAa;EACb,aAAa;EACb,sCAAsC;EACtC,mCAAmC;;AAErC;;AAEA;;EAEE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,sBAAsB;EACtB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;;EAEE,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;EACxB,mBAAmB;EACnB,aAAa;EACb,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;EACxB,YAAY;EACZ,aAAa;EACb,aAAa;EACb,sCAAsC;EACtC,mCAAmC;AACrC;;AAEA;;EAEE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,sBAAsB;EACtB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;EACjB,eAAe;EACf,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;;EAEE,kBAAkB;AACpB","sourcesContent":["* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  font-family: sans-serif;\n}\n\nbody {\n  background-color: rgb(30, 30, 30);\n}\n\n.container {\n  border: 1px soild red;\n  display: grid;\n  grid-template-rows: 1fr 10fr 1fr;\n  height: 100vh;\n}\n\n.title-div {\n  border: 2px solid greenyellow;\n  display: flex;\n  grid-row: 1 / 2;\n  justify-content: center;\n  align-items: center;\n  color: gray;\n  font-size: 2.5rem;\n}\n\n.board-div {\n  display: grid;\n  grid-template-columns: 5fr 1fr 1fr 1fr 5fr;\n  width: 100vw;\n  /* height: fit-content; */\n  grid-row: 2 / 3;\n  color: whitesmoke;\n}\n\n.small-container {\n  border: 2px solid tomato;\n  height: fit-content;\n  display: flex;\n  flex-direction: column;\n  grid-column: 2 / 3;\n}\n\n.small-board {\n  border: 2px solid orange;\n  width: 25rem;\n  height: 25rem;\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(11, 1fr);\n\n}\n\n.small-num,\n.small-apl {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.small-grid {\n  border: 2px solid gray;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n} \n\n.small-rotate {\n  width: fit-content;\n  align-self: center;\n}\n\n.small-name,\n.small-win {\n  align-self: center;\n}\n\n.big-container {\n  border: 2px solid tomato;\n  height: fit-content;\n  display: flex;\n  flex-direction: column;\n  grid-column: 4 / 5;\n}\n\n.big-board {\n  border: 2px solid orange;\n  width: 30rem;\n  height: 30rem;\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(11, 1fr);\n}\n\n.big-num,\n.big-alp {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.25rem;\n}\n\n.big-grid {\n  border: 2px solid gray;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n} \n\n.big-name {\n  align-self: center;\n}\n\n.message {\n  color: whitesmoke;\n  font-size: 1rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.small-win,\n.big-win {\n  align-self: center;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _set_ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./set-ship */ "./src/set-ship.js");
/* harmony import */ var _setup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./setup */ "./src/setup.js");

// import Gameboard from './gameboard';
// import Player from './player';
// import { highLightGrid, highBig } from './display-ships';
// import createClick from './click-board';
// import { convertNum, convertCoord } from './convert';
// import hoverGrid from './hover';


(0,_set_ship__WEBPACK_IMPORTED_MODULE_1__["default"])(_setup__WEBPACK_IMPORTED_MODULE_2__.playerBoard, _setup__WEBPACK_IMPORTED_MODULE_2__.humanPlayer, _setup__WEBPACK_IMPORTED_MODULE_2__.computerBoard);

// const playerBoard = Gameboard();
// const computerBoard = Gameboard();
// const computerPlayer = Player(playerBoard);
// computerPlayer.computerOn();
// const humanPlayer = Player(computerBoard, computerPlayer, playerBoard);

// playerBoard.placeShip(4, 1, 5, 'vertical');
// playerBoard.placeShip(6, 4, 3, 'horizontal');
// playerBoard.placeShip(1, 7, 2, 'vertical');
// playerBoard.placeShip(4, 4, 2, 'horizontal');
// playerBoard.placeShip(9, 9, 1, 'vertical');
// playerBoard.placeShip(7, 8, 1, 'vertical');
// playerBoard.placeShip(9, 5, 3, 'horizontal');

// highLightGrid(playerBoard.shipRecord);

// computerBoard.placeShip(1, 1, 5, 'vertical');
// computerBoard.placeShip(3, 3, 4, 'vertical');
// computerBoard.placeShip(8, 3, 3, 'horizontal');
// computerBoard.placeShip(1, 5, 2, 'vertical');
// computerBoard.placeShip(4, 6, 2, 'vertical');
// computerBoard.placeShip(3, 9, 1, 'vertical');
// computerBoard.placeShip(7, 0, 1, 'vertical');

// highBig(computerBoard.shipRecord);

// createClick(humanPlayer, computerBoard, playerBoard);

// hoverGrid(5, 'vertical');
// hoverGrid(5, 'horizontal');
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUVDLENBQUMsQ0FBQyxDQUFDO0lBQzFDO0lBQ0EsSUFBSUEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7TUFDYjZCLElBQUksQ0FBQ25CLElBQUksQ0FBQ2xDLFFBQVEsQ0FBQ0MsU0FBUyxFQUFFc0IsQ0FBQyxFQUFFQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDMUM7SUFDQSxJQUFJQSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRTtNQUNkNkIsSUFBSSxDQUFDbkIsSUFBSSxDQUFDbEMsUUFBUSxDQUFDQyxTQUFTLEVBQUVzQixDQUFDLEVBQUVDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMxQztJQUVBLElBQUlELENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtNQUMzQjZCLElBQUksQ0FBQ25CLElBQUksQ0FBQ2xDLFFBQVEsQ0FBQ0MsU0FBUyxFQUFFc0IsQ0FBQyxHQUFHLENBQUMsRUFBRUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzlDO0lBQ0EsSUFBSUQsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUlDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFO01BQzVCNkIsSUFBSSxDQUFDbkIsSUFBSSxDQUFDbEMsUUFBUSxDQUFDQyxTQUFTLEVBQUVzQixDQUFDLEdBQUcsQ0FBQyxFQUFFQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDOUM7SUFDQSxJQUFJRCxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7TUFDMUI2QixJQUFJLENBQUNuQixJQUFJLENBQUNsQyxRQUFRLENBQUNDLFNBQVMsRUFBRXNCLENBQUMsR0FBRyxDQUFDLEVBQUVDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM5QztJQUNBLElBQUlELENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxHQUFH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O0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsOEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvY2xpY2stYm9hcmQuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL2NvbnZlcnQuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL2Rpc3BsYXktc2hpcHMuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvaG92ZXIuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvc2V0LXNoaXAuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL3NldHVwLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25wbS1zZXR1cC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29udmVydE51bSB9IGZyb20gJy4vY29udmVydCc7XG5pbXBvcnQgeyBkaXNwbGF5SGl0IH0gZnJvbSAnLi9kaXNwbGF5LXNoaXBzJztcblxuY29uc3QgZ3JpZEluZGV4ID0gKGdyaWQpID0+IHtcbiAgY29uc3QgcmUgPSAvWzAtOV0rLztcbiAgY29uc3QgbnVtID0gZ3JpZC5jbGFzc05hbWU7XG4gIGNvbnN0IGdyaWROdW0gPSByZS5leGVjKG51bS5zbGljZShudW0ubGVuZ3RoIC0gMiwgbnVtLmxlbmd0aCkpWzBdO1xuICBjb25zdCBjb29yZCA9IGNvbnZlcnROdW0oKTtcbiAgcmV0dXJuIGNvb3JkW2dyaWROdW1dO1xufTtcblxuY29uc3QgY3JlYXRlQ2xpY2sgPSAocGxheWVyLCBjb21wdXRlckJvYXJkLCBwbGF5ZXJCb2FyZCkgPT4ge1xuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iaWctZ3JpZCcpO1xuICAvLyBjb25zdCBzbWFsbFdpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbWFsbC13aW4nKTtcbiAgY29uc3QgYmlnV2luID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJpZy13aW4nKTtcblxuICBmdW5jdGlvbiBjbGlja1N0eWxlKCkge1xuICAgIGNvbnN0IHRhcmdldCA9IGdyaWRJbmRleCh0aGlzKTtcbiAgICBwbGF5ZXIuYXR0YWNrKHRhcmdldFswXSwgdGFyZ2V0WzFdKTtcbiAgICBjb25zdCByZXN1bHQgPSBjb21wdXRlckJvYXJkLmZpbmRHcmlkKFxuICAgICAgY29tcHV0ZXJCb2FyZC5mdWxsQm9hcmQsXG4gICAgICB0YXJnZXRbMF0sXG4gICAgICB0YXJnZXRbMV1cbiAgICApO1xuICAgIGlmIChyZXN1bHQubWlzcyA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy50ZXh0Q29udGVudCA9ICcvJztcbiAgICAgIHRoaXMuc3R5bGUuZm9udFNpemUgPSAnMnJlbSc7XG4gICAgICB0aGlzLnN0eWxlLmNvbG9yID0gJ3doaXRlc21va2UnO1xuICAgIH1cbiAgICBpZiAocmVzdWx0LnNoaXAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy50ZXh0Q29udGVudCA9ICdYJztcbiAgICAgIHRoaXMuc3R5bGUuZm9udFNpemUgPSAnMnJlbSc7XG4gICAgICB0aGlzLnN0eWxlLmNvbG9yID0gJ3JlZCc7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja1N0eWxlKTtcblxuICAgIGNvbnN0IGNvbXB1dGVyU3VuayA9IGNvbXB1dGVyQm9hcmQuY2hlY2tTdW5rKCk7XG5cbiAgICBpZiAoY29tcHV0ZXJTdW5rID09PSBmYWxzZSkge1xuICAgICAgZGlzcGxheUhpdChwbGF5ZXJCb2FyZCk7XG4gICAgICBjb25zdCBwbGF5ZXJTdW5rID0gcGxheWVyQm9hcmQuY2hlY2tTdW5rKCk7XG4gICAgICBpZiAocGxheWVyU3VuayA9PT0gdHJ1ZSkge1xuICAgICAgICBncmlkcy5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgICAgICAgZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrU3R5bGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coJ0NvbXB1dGVyIHdpbicpO1xuICAgICAgICBiaWdXaW4udGV4dENvbnRlbnQgPSAnT3Bwb25lbnQgV2luJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29tcHV0ZXJTdW5rID09PSB0cnVlKSB7XG4gICAgICBncmlkcy5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgICAgIGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja1N0eWxlKTtcbiAgICAgIH0pO1xuICAgICAgY29uc29sZS5sb2coJ0h1bWFuIHdpbicpO1xuICAgICAgYmlnV2luLnRleHRDb250ZW50ID0gJ1BsYXllciB3aW4nO1xuICAgIH1cblxuICAgIC8vIGNvbnNvbGUubG9nKGNvbXB1dGVyQm9hcmQuc2hpcFJlY29yZCk7XG4gICAgLy8gY29uc29sZS5sb2coY29tcHV0ZXJCb2FyZC5zdW5rUmVjb3JkKTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JpZHMubGVuZ3RoOyBpKyspIHtcbiAgICBncmlkc1tpXS5jbGFzc0xpc3QuYWRkKGBncmlkJHtpfWApO1xuICAgIGdyaWRzW2ldLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICBncmlkc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrU3R5bGUpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDbGljaztcbiIsImNvbnN0IGNvbnZlcnRDb29yZCA9IChudW0gPSAwLCB4ID0gOSwgeSA9IDAsIHRhYmxlID0ge30pID0+IHtcbiAgaWYgKG51bSA+IDk5KSB7XG4gICAgcmV0dXJuIHRhYmxlO1xuICB9XG4gIGNvbnN0IGNvb3JkID0gW3gsIHldO1xuICB0YWJsZVtjb29yZF0gPSBudW07XG4gIGlmICh5ID09PSA5KSB7XG4gICAgeCAtPSAxO1xuICAgIHkgPSAtMTtcbiAgfVxuICByZXR1cm4gY29udmVydENvb3JkKG51bSArIDEsIHgsIHkgKyAxLCB0YWJsZSk7XG59O1xuXG5jb25zdCBjb252ZXJ0TnVtID0gKG51bSA9IDAsIHggPSA5LCB5ID0gMCwgdGFibGUgPSB7fSkgPT4ge1xuICBpZiAobnVtID4gOTkpIHtcbiAgICByZXR1cm4gdGFibGU7XG4gIH1cbiAgY29uc3QgY29vcmQgPSBbeCwgeV07XG4gIHRhYmxlW251bV0gPSBjb29yZDtcbiAgaWYgKHkgPT09IDkpIHtcbiAgICB4IC09IDE7XG4gICAgeSA9IC0xO1xuICB9XG4gIHJldHVybiBjb252ZXJ0TnVtKG51bSArIDEsIHgsIHkgKyAxLCB0YWJsZSk7XG59O1xuXG5leHBvcnQgeyBjb252ZXJ0Q29vcmQsIGNvbnZlcnROdW0gfTtcbiIsImltcG9ydCB7IGNvbnZlcnRDb29yZCB9IGZyb20gJy4vY29udmVydCc7XG5cbmNvbnN0IGFsbEdyaWRzID0gKCkgPT4ge1xuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbWFsbC1ncmlkJyk7XG4gIHJldHVybiBncmlkcztcbn07XG5cbmNvbnN0IGhpZ2hMaWdodEdyaWQgPSAoc2hpcHMpID0+IHtcbiAgY29uc3QgdGFyZ2V0cyA9IFtdO1xuICBjb25zdCBncmlkcyA9IGFsbEdyaWRzKCk7XG5cbiAgT2JqZWN0LmtleXMoc2hpcHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGNvbnN0IGNvb3JkcyA9IHNoaXBzW2tleV07XG4gICAgT2JqZWN0LmtleXMoY29vcmRzKS5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgdGFyZ2V0cy5wdXNoKGNvb3JkKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgY29uc3QgdGFibGUgPSBjb252ZXJ0Q29vcmQoKTtcblxuICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gdGFibGVbdGFyZ2V0XTtcbiAgICBncmlkc1tpbmRleF0uc3R5bGUuYm9yZGVyID0gJzJweCBjeWFuIHNvbGlkJztcbiAgfSk7XG59O1xuXG5jb25zdCBoaWdoQmlnID0gKHNoaXBzKSA9PiB7XG4gIGNvbnN0IHRhcmdldHMgPSBbXTtcbiAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmlnLWdyaWQnKTtcblxuICBPYmplY3Qua2V5cyhzaGlwcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgY29uc3QgY29vcmRzID0gc2hpcHNba2V5XTtcbiAgICBPYmplY3Qua2V5cyhjb29yZHMpLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICB0YXJnZXRzLnB1c2goY29vcmQpO1xuICAgIH0pO1xuICB9KTtcblxuICBjb25zdCB0YWJsZSA9IGNvbnZlcnRDb29yZCgpO1xuXG4gIHRhcmdldHMuZm9yRWFjaCgodGFyZ2V0KSA9PiB7XG4gICAgY29uc3QgaW5kZXggPSB0YWJsZVt0YXJnZXRdO1xuICAgIGdyaWRzW2luZGV4XS5zdHlsZS5ib3JkZXIgPSAnMnB4IGN5YW4gc29saWQnO1xuICB9KTtcbn07XG5cbmNvbnN0IGRpc3BsYXlIaXQgPSAoYm9hcmQpID0+IHtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGJvYXJkLmhpdFJlY29yZCk7XG4gIGNvbnN0IGNvb3JkID0gYm9hcmQuaGl0UmVjb3JkW2tleXNba2V5cy5sZW5ndGggLSAxXV07XG4gIGNvbnN0IHRhcmdldCA9IGJvYXJkLmZpbmRHcmlkKGJvYXJkLmZ1bGxCb2FyZCwgY29vcmRbMF0sIGNvb3JkWzFdKTtcblxuICBjb25zdCBncmlkcyA9IGFsbEdyaWRzKCk7XG4gIGNvbnN0IHRhYmxlID0gY29udmVydENvb3JkKCk7XG4gIGNvbnN0IGdyaWROdW0gPSB0YWJsZVtjb29yZF07XG5cbiAgaWYgKHRhcmdldC5taXNzID09PSB0cnVlKSB7XG4gICAgZ3JpZHNbZ3JpZE51bV0udGV4dENvbnRlbnQgPSAnWCc7XG4gICAgZ3JpZHNbZ3JpZE51bV0uc3R5bGUuZm9udFNpemUgPSAnMS41cmVtJztcbiAgICBncmlkc1tncmlkTnVtXS5zdHlsZS5jb2xvciA9ICd3aGl0ZXNtb2tlJztcbiAgfVxuICBpZiAodGFyZ2V0LnNoaXAgIT09IHVuZGVmaW5lZCkge1xuICAgIGdyaWRzW2dyaWROdW1dLnRleHRDb250ZW50ID0gJ1gnO1xuICAgIGdyaWRzW2dyaWROdW1dLnN0eWxlLmZvbnRTaXplID0gJzEuNXJlbSc7XG4gICAgZ3JpZHNbZ3JpZE51bV0uc3R5bGUuY29sb3IgPSAncmVkJztcbiAgfVxufTtcblxuZXhwb3J0IHsgaGlnaExpZ2h0R3JpZCwgaGlnaEJpZywgZGlzcGxheUhpdCB9O1xuIiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwJztcblxuY29uc3QgR3JpZCA9ICh4LCB5LCB1cCwgcmlnaHQsIHNoaXAsIG1pc3MgPSBmYWxzZSwgYm91bmRhcnkgPSBmYWxzZSkgPT4ge1xuICBjb25zdCBjb29yZCA9IFt4LCB5XTtcbiAgcmV0dXJuIHsgY29vcmQsIHVwLCByaWdodCwgc2hpcCwgbWlzcywgYm91bmRhcnkgfTtcbn07XG5cbmNvbnN0IEdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgbWFrZUJvYXJkID0gKHggPSAwLCB5ID0gMCkgPT4ge1xuICAgIGlmICh4ID4gOSB8fCB5ID4gOSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgYm9hcmQgPSBHcmlkKHgsIHksIG1ha2VCb2FyZCh4ICsgMSwgeSksIG1ha2VCb2FyZCh4LCB5ICsgMSkpO1xuXG4gICAgcmV0dXJuIGJvYXJkO1xuICB9O1xuXG4gIGNvbnN0IGZpbmRHcmlkID0gKGdyaWQsIHAsIHEpID0+IHtcbiAgICBpZiAoZ3JpZC5jb29yZFswXSAhPT0gcCkge1xuICAgICAgZ3JpZCA9IGdyaWQudXA7XG4gICAgICByZXR1cm4gZmluZEdyaWQoZ3JpZCwgcCwgcSk7XG4gICAgfVxuXG4gICAgaWYgKGdyaWQuY29vcmRbMF0gPT09IHApIHtcbiAgICAgIGlmIChncmlkLmNvb3JkWzFdICE9PSBxKSB7XG4gICAgICAgIGdyaWQgPSBncmlkLnJpZ2h0O1xuICAgICAgICByZXR1cm4gZmluZEdyaWQoZ3JpZCwgcCwgcSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBncmlkO1xuICB9O1xuXG4gIGNvbnN0IHN1cnZleUdyaWQgPSAoeCwgeSwgbGVuZ3RoLCBvcmllbnQsIGNvdW50ID0gMCkgPT4ge1xuICAgIGlmIChjb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCwgeSkuc2hpcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAob3JpZW50ID09PSAndmVydGljYWwnKSB7XG4gICAgICAgIHJldHVybiBzdXJ2ZXlHcmlkKHggKyAxLCB5LCBsZW5ndGgsIG9yaWVudCwgY291bnQgKyAxKTtcbiAgICAgIH1cbiAgICAgIGlmIChvcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICByZXR1cm4gc3VydmV5R3JpZCh4LCB5ICsgMSwgbGVuZ3RoLCBvcmllbnQsIGNvdW50ICsgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBwbGFjZUJvdW5kYXJ5ID0gKHgsIHkpID0+IHtcbiAgICBjb25zdCBsaXN0ID0gW107XG5cbiAgICBpZiAoeCArIDEgPCAxMCkge1xuICAgICAgbGlzdC5wdXNoKGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCArIDEsIHkpKTtcbiAgICB9XG4gICAgaWYgKHggLSAxID4gMCkge1xuICAgICAgbGlzdC5wdXNoKGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCAtIDEsIHkpKTtcbiAgICB9XG4gICAgaWYgKHkgLSAxID4gMCkge1xuICAgICAgbGlzdC5wdXNoKGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCwgeSAtIDEpKTtcbiAgICB9XG4gICAgaWYgKHkgKyAxIDwgMTApIHtcbiAgICAgIGxpc3QucHVzaChmaW5kR3JpZChmdWxsQm9hcmQsIHgsIHkgKyAxKSk7XG4gICAgfVxuXG4gICAgaWYgKHggKyAxIDwgMTAgJiYgeSAtIDEgPiAwKSB7XG4gICAgICBsaXN0LnB1c2goZmluZEdyaWQoZnVsbEJvYXJkLCB4ICsgMSwgeSAtIDEpKTtcbiAgICB9XG4gICAgaWYgKHggKyAxIDwgMTAgJiYgeSArIDEgPCAxMCkge1xuICAgICAgbGlzdC5wdXNoKGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCArIDEsIHkgKyAxKSk7XG4gICAgfVxuICAgIGlmICh4IC0gMSA+IDAgJiYgeSAtIDEgPiAwKSB7XG4gICAgICBsaXN0LnB1c2goZmluZEdyaWQoZnVsbEJvYXJkLCB4IC0gMSwgeSAtIDEpKTtcbiAgICB9XG4gICAgaWYgKHggLSAxIDwgMTAgJiYgeSArIDEgPiAxMCkge1xuICAgICAgbGlzdC5wdXNoKGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCAtIDEsIHkgKyAxKSk7XG4gICAgfVxuXG4gICAgbGlzdC5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBzaGlwLmJvdW5kYXJ5ID0gdHJ1ZTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoXG4gICAgeCxcbiAgICB5LFxuICAgIGxlbmd0aCxcbiAgICBvcmllbnQsXG4gICAgY291bnQgPSAwLFxuICAgIHJlY29yZCA9IHt9LFxuICAgIGNoZWNrTGVuZ3RoID0gdHJ1ZSxcbiAgICBzdXJ2ZXkgPSBudWxsXG4gICkgPT4ge1xuICAgIGlmIChjaGVja0xlbmd0aCA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHggKyBsZW5ndGggPiAxMCAmJiBvcmllbnQgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgcmV0dXJuICdTaGlwIG92ZXIgYm9yZGVyJztcbiAgICAgIH1cbiAgICAgIGlmICh5ICsgbGVuZ3RoID4gMTAgJiYgb3JpZW50ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgcmV0dXJuICdTaGlwIG92ZXIgYm9yZGVyJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VydmV5ID09PSBudWxsKSB7XG4gICAgICBpZiAob3JpZW50ID09PSAndmVydGljYWwnKSB7XG4gICAgICAgIHN1cnZleSA9IHN1cnZleUdyaWQoeCwgeSwgbGVuZ3RoLCAndmVydGljYWwnKTtcbiAgICAgIH1cbiAgICAgIGlmIChvcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICBzdXJ2ZXkgPSBzdXJ2ZXlHcmlkKHgsIHksIGxlbmd0aCwgJ2hvcml6b250YWwnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzaGlwTmFtZSA9IGZsZWV0W2xlbmd0aF07XG4gICAgaWYgKHNoaXBSZWNvcmRbc2hpcE5hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiAnU2hpcCBub3QgYXZhaWxhYmxlJztcbiAgICB9XG5cbiAgICBpZiAoY291bnQgPT09IGxlbmd0aCkge1xuICAgICAgaWYgKHNoaXBOYW1lID09PSAnRGVzdHJveWVyMScpIHtcbiAgICAgICAgZmxlZXRbbGVuZ3RoXSA9ICdEZXN0cm95ZXIyJztcbiAgICAgIH1cbiAgICAgIGlmIChzaGlwTmFtZSA9PT0gJ1N1Ym1hcmluZTEnKSB7XG4gICAgICAgIGZsZWV0W2xlbmd0aF0gPSAnU3VibWFyaW5lMic7XG4gICAgICB9XG4gICAgICBzaGlwUmVjb3JkW3NoaXBOYW1lXSA9IHJlY29yZDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZmluZEdyaWQoZnVsbEJvYXJkLCB4LCB5KS5zaGlwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBgU3BhY2UgYWxyZWFkeSB0YWtlbmA7XG4gICAgfVxuXG4gICAgaWYgKG9yaWVudCA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgaWYgKHN1cnZleSA9PT0gdHJ1ZSkge1xuICAgICAgICAvLyBwbGFjZUJvdW5kYXJ5KHgsIHkpO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBmaW5kR3JpZChmdWxsQm9hcmQsIHgsIHkpO1xuICAgICAgICB0YXJnZXQuc2hpcCA9IFNoaXAobGVuZ3RoLCAndmVydGljYWwnKTtcbiAgICAgICAgY29uc3QgcmVjb3JkS2V5ID0gdGFyZ2V0LmNvb3JkO1xuICAgICAgICByZWNvcmRbcmVjb3JkS2V5XSA9IHJlY29yZEtleTtcbiAgICAgICAgY2hlY2tMZW5ndGggPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHBsYWNlU2hpcChcbiAgICAgICAgICB4ICsgMSxcbiAgICAgICAgICB5LFxuICAgICAgICAgIGxlbmd0aCxcbiAgICAgICAgICBvcmllbnQsXG4gICAgICAgICAgY291bnQgKyAxLFxuICAgICAgICAgIHJlY29yZCxcbiAgICAgICAgICBjaGVja0xlbmd0aCxcbiAgICAgICAgICBzdXJ2ZXlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdXJ2ZXkgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBgU3BhY2UgYWxyZWFkeSB0YWtlbmA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9yaWVudCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICBpZiAoc3VydmV5ID09PSB0cnVlKSB7XG4gICAgICAgIC8vIHBsYWNlQm91bmRhcnkoeCwgeSk7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCwgeSk7XG4gICAgICAgIHRhcmdldC5zaGlwID0gU2hpcChsZW5ndGgsICdob3Jpem9udGFsJyk7XG4gICAgICAgIGNvbnN0IHJlY29yZEtleSA9IHRhcmdldC5jb29yZDtcbiAgICAgICAgcmVjb3JkW3JlY29yZEtleV0gPSByZWNvcmRLZXk7XG4gICAgICAgIGNoZWNrTGVuZ3RoID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBwbGFjZVNoaXAoXG4gICAgICAgICAgeCxcbiAgICAgICAgICB5ICsgMSxcbiAgICAgICAgICBsZW5ndGgsXG4gICAgICAgICAgb3JpZW50LFxuICAgICAgICAgIGNvdW50ICsgMSxcbiAgICAgICAgICByZWNvcmQsXG4gICAgICAgICAgY2hlY2tMZW5ndGgsXG4gICAgICAgICAgc3VydmV5XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoc3VydmV5ID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gYFNwYWNlIGFscmVhZHkgdGFrZW5gO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBjaGVja1N1bmsgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2hpcEtleXMgPSBPYmplY3Qua2V5cyhzaGlwUmVjb3JkKTtcbiAgICBzaGlwS2V5cy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBjb25zdCBjb29yZE9iaiA9IHNoaXBSZWNvcmRbc2hpcF07XG4gICAgICBjb25zdCBjb29yZEtleXMgPSBPYmplY3Qua2V5cyhjb29yZE9iaik7XG4gICAgICBjb25zdCBjaGVja1NoaXAgPSBmaW5kR3JpZChcbiAgICAgICAgZnVsbEJvYXJkLFxuICAgICAgICBOdW1iZXIoY29vcmRLZXlzWzBdWzBdKSxcbiAgICAgICAgTnVtYmVyKGNvb3JkS2V5c1swXVsyXSlcbiAgICAgICk7XG4gICAgICBjaGVja1NoaXAuc2hpcC5jYWxTdW5rKCk7XG4gICAgICBpZiAoY2hlY2tTaGlwLnNoaXAuaXNTdW5rKCkgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKCFPYmplY3Qua2V5cyhzdW5rUmVjb3JkKS5pbmNsdWRlcyhzaGlwKSkge1xuICAgICAgICAgIHN1bmtSZWNvcmRbc2hpcF0gPSBzaGlwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoT2JqZWN0LmtleXMoc3Vua1JlY29yZCkubGVuZ3RoID09PSBzaGlwS2V5cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZmluZEdyaWQoZnVsbEJvYXJkLCB4LCB5KTtcbiAgICBjb25zdCBjb29yZCA9IFt4LCB5XTtcbiAgICBjb25zdCBhdHRhY2tTaGlwID0gW107XG5cbiAgICBpZiAodGFyZ2V0LnNoaXAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGhpdFJlY29yZFtjb29yZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBoaXRSZWNvcmRbY29vcmRdID0gY29vcmQ7XG4gICAgICAgIGNvbnN0IGZsZWV0ID0gT2JqZWN0LmtleXMoc2hpcFJlY29yZCk7XG4gICAgICAgIGZsZWV0LmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgICAgICBjb25zdCBjdXJyZW50U2hpcCA9IHNoaXBSZWNvcmRbc2hpcF07XG4gICAgICAgICAgaWYgKGN1cnJlbnRTaGlwW2Nvb3JkXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBhdHRhY2tTaGlwLnB1c2goc2hpcCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgYWxsQ29vcmQgPSBzaGlwUmVjb3JkW2F0dGFja1NoaXBbMF1dO1xuICAgICAgICBjb25zdCBhbGxLZXlzID0gT2JqZWN0LmtleXMoYWxsQ29vcmQpO1xuICAgICAgICBhbGxLZXlzLmZvckVhY2goKGtleXMpID0+IHtcbiAgICAgICAgICBjb25zdCBwcm9wZXJ0eSA9IGFsbENvb3JkW2tleXNdO1xuICAgICAgICAgIGNvbnN0IG9uZUhpdCA9IGZpbmRHcmlkKGZ1bGxCb2FyZCwgcHJvcGVydHlbMF0sIHByb3BlcnR5WzFdKTtcbiAgICAgICAgICBvbmVIaXQuc2hpcC5oaXQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKGhpdFJlY29yZFtjb29yZF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gJ1NoaXAgYWxyZWFkeSBoaXQnO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0YXJnZXQuc2hpcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAodGFyZ2V0Lm1pc3MgPT09IGZhbHNlKSB7XG4gICAgICAgIGhpdFJlY29yZFtjb29yZF0gPSBjb29yZDtcbiAgICAgICAgdGFyZ2V0Lm1pc3MgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICdIaXR0aW5nIGEgbWlzc2VkIHNob3QgYWdhaW4nO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBmdWxsQm9hcmQgPSBtYWtlQm9hcmQoKTtcbiAgY29uc3Qgc2hpcFJlY29yZCA9IHt9O1xuICBjb25zdCBoaXRSZWNvcmQgPSB7fTtcbiAgY29uc3Qgc3Vua1JlY29yZCA9IHt9O1xuICBjb25zdCBmbGVldCA9IHtcbiAgICA1OiAnQ2FycmllcicsXG4gICAgNDogJ0JhdHRsZXNoaXAnLFxuICAgIDM6ICdDcnVzaWVyJyxcbiAgICAyOiAnRGVzdHJveWVyMScsXG4gICAgMTogJ1N1Ym1hcmluZTEnLFxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZnVsbEJvYXJkLFxuICAgIHBsYWNlU2hpcCxcbiAgICBmaW5kR3JpZCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIHNoaXBSZWNvcmQsXG4gICAgaGl0UmVjb3JkLFxuICAgIGNoZWNrU3VuayxcbiAgICBzdW5rUmVjb3JkLFxuICAgIHBsYWNlQm91bmRhcnksXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XG4iLCIvLyBNYWtlIGdyaWQgaG92ZXIgYWNjb3JkaW5nIHRvIGN1cnJlbnQgc2hpcCBsZW5ndGhcbmNvbnN0IGhvdmVyR3JpZCA9IChsZW5ndGgsIG9yaWVudCkgPT4ge1xuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbWFsbC1ncmlkJyk7XG5cbiAgY29uc3QgZ3JpZEluZGV4ID0gKGdyaWQpID0+IHtcbiAgICBjb25zdCByZSA9IC9bMC05XSsvO1xuICAgIGNvbnN0IG51bSA9IGdyaWQuY2xhc3NOYW1lO1xuICAgIGNvbnN0IGdyaWROdW0gPSByZS5leGVjKG51bS5zbGljZShudW0ubGVuZ3RoIC0gMiwgbnVtLmxlbmd0aCkpWzBdO1xuICAgIHJldHVybiBncmlkTnVtO1xuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXkgPSAoKSA9PiB7XG4gICAgaWYgKG9yaWVudCA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBncmlkc1tpXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCB2SG92ZXIpO1xuICAgICAgICBncmlkc1tpXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdkxlYXZlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAob3JpZW50ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JpZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZ3JpZHNbaV0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgaEhvdmVyKTtcbiAgICAgICAgZ3JpZHNbaV0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGhMZWF2ZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHdpcGUgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkcy5sZW5ndGg7IGkrKykge1xuICAgICAgZ3JpZHNbaV0uc3R5bGUuYmFja2dyb3VuZCA9ICdub25lJztcbiAgICB9XG5cbiAgICBpZiAob3JpZW50ID09PSAndmVydGljYWwnKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyaWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGdyaWRzW2ldLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIHZIb3Zlcik7XG4gICAgICAgIGdyaWRzW2ldLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB2TGVhdmUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3JpZW50ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JpZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZ3JpZHNbaV0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgaEhvdmVyKTtcbiAgICAgICAgZ3JpZHNbaV0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGhMZWF2ZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIFZlcnRpY2FsXG4gIGZ1bmN0aW9uIHZIb3ZlcihiYXNlLCBjb3VudCA9IDApIHtcbiAgICBpZiAoY291bnQgPT09IGxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBudW0gPSAwO1xuXG4gICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICBudW0gPSBOdW1iZXIoZ3JpZEluZGV4KHRoaXMpKTtcbiAgICB9XG5cbiAgICBpZiAoY291bnQgPiAwKSB7XG4gICAgICBudW0gPSBOdW1iZXIoZ3JpZEluZGV4KGJhc2UpKSAtIDEwO1xuICAgIH1cblxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5ncmlkJHtudW19YCk7XG5cbiAgICBpZiAodGFyZ2V0ICE9PSBudWxsKSB7XG4gICAgICB0YXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9ICdjeWFuJztcbiAgICAgIHJldHVybiB2SG92ZXIodGFyZ2V0LCBjb3VudCArIDEpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHZMZWF2ZShiYXNlLCBjb3VudCA9IDApIHtcbiAgICBpZiAoY291bnQgPT09IGxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBudW0gPSAwO1xuXG4gICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICBudW0gPSBOdW1iZXIoZ3JpZEluZGV4KHRoaXMpKTtcbiAgICB9XG5cbiAgICBpZiAoY291bnQgPiAwKSB7XG4gICAgICBudW0gPSBOdW1iZXIoZ3JpZEluZGV4KGJhc2UpKSAtIDEwO1xuICAgIH1cblxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5ncmlkJHtudW19YCk7XG5cbiAgICBpZiAodGFyZ2V0ICE9PSBudWxsKSB7XG4gICAgICB0YXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9ICdub25lJztcbiAgICAgIHJldHVybiB2TGVhdmUodGFyZ2V0LCBjb3VudCArIDEpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEhvcml6b250YWxcbiAgZnVuY3Rpb24gaEhvdmVyKGJhc2UsIGNvdW50ID0gMCwgY2hlY2sgPSBbXSkge1xuICAgIGlmIChjb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG51bSA9IDA7XG5cbiAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgIG51bSA9IE51bWJlcihncmlkSW5kZXgodGhpcykpO1xuICAgIH1cblxuICAgIGlmIChjb3VudCA+IDApIHtcbiAgICAgIG51bSA9IE51bWJlcihncmlkSW5kZXgoYmFzZSkpICsgMTtcbiAgICB9XG5cbiAgICBjaGVjay5wdXNoKG51bSk7XG5cbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuZ3JpZCR7bnVtfWApO1xuXG4gICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICB0YXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9ICdjeWFuJztcbiAgICAgIHJldHVybiBoSG92ZXIodGFyZ2V0LCBjb3VudCArIDEsIGNoZWNrKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBjb3VudCA+IDAgJiZcbiAgICAgIHRhcmdldCAhPT0gbnVsbCAmJlxuICAgICAgTnVtYmVyKFN0cmluZyhjaGVja1tjaGVjay5sZW5ndGggLSAxXSkuc2xpY2UoLTEpKSA+XG4gICAgICAgIE51bWJlcihTdHJpbmcoY2hlY2tbMF0pLnNsaWNlKC0xKSlcbiAgICApIHtcbiAgICAgIHRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gJ2N5YW4nO1xuICAgICAgcmV0dXJuIGhIb3Zlcih0YXJnZXQsIGNvdW50ICsgMSwgY2hlY2spO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhMZWF2ZShiYXNlLCBjb3VudCA9IDAsIGNoZWNrID0gW10pIHtcbiAgICBpZiAoY291bnQgPT09IGxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBudW0gPSAwO1xuXG4gICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICBudW0gPSBOdW1iZXIoZ3JpZEluZGV4KHRoaXMpKTtcbiAgICB9XG5cbiAgICBpZiAoY291bnQgPiAwKSB7XG4gICAgICBudW0gPSBOdW1iZXIoZ3JpZEluZGV4KGJhc2UpKSArIDE7XG4gICAgfVxuXG4gICAgY2hlY2sucHVzaChudW0pO1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmdyaWQke251bX1gKTtcblxuICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgdGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSAnbm9uZSc7XG4gICAgICByZXR1cm4gaExlYXZlKHRhcmdldCwgY291bnQgKyAxLCBjaGVjayk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgY291bnQgPiAwICYmXG4gICAgICB0YXJnZXQgIT09IG51bGwgJiZcbiAgICAgIE51bWJlcihTdHJpbmcoY2hlY2tbY2hlY2subGVuZ3RoIC0gMV0pLnNsaWNlKC0xKSkgPlxuICAgICAgICBOdW1iZXIoU3RyaW5nKGNoZWNrWzBdKS5zbGljZSgtMSkpXG4gICAgKSB7XG4gICAgICB0YXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9ICdub25lJztcbiAgICAgIHJldHVybiBoTGVhdmUodGFyZ2V0LCBjb3VudCArIDEsIGNoZWNrKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHsgZGlzcGxheSwgd2lwZSB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaG92ZXJHcmlkO1xuIiwiY29uc3QgUGxheWVyID0gKGVuZW15Qm9hcmQsIGNvbXB1dGVyUGxheWVyLCBvd25Cb2FyZCkgPT4ge1xuICAvLyBBZGQgaHVtYW4gb25cbiAgLy8gSHVtYW4gb25seSBmb3IgdGVzdGluZywgcmVtb3ZlIGFmdGVyXG4gIGxldCBhaSA9IGZhbHNlO1xuXG4gIGNvbnN0IGNvbXB1dGVyT24gPSAoKSA9PiB7XG4gICAgYWkgPSB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IGNvbXB1dGVyID0gKCkgPT4gYWk7XG5cbiAgY29uc3QgYXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgaWYgKGNvbXB1dGVyUGxheWVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChjb21wdXRlclBsYXllci5jb21wdXRlcigpID09PSB0cnVlKSB7XG4gICAgICAgIC8vIGF1dG9Nb3ZlKCk7XG4gICAgICAgIGh1bWFuQXV0b01vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0UmFuZG9tSW50ID0gKG1pbiwgbWF4KSA9PiB7XG4gICAgbWluID0gTWF0aC5jZWlsKG1pbik7XG4gICAgbWF4ID0gTWF0aC5mbG9vcihtYXgpO1xuXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XG4gIH07XG5cbiAgLy8gQWRkIGF1dG9Nb3ZlIGlmIGh1bWFuIG9uLCB0YXJnZXQgY29vcmQgaW4gc2hpcCByZWNvcmRcbiAgLy8gSHVtYW4gYXV0b01vdmUgb25seSBmb3IgdGVzdGluZywgcmVtb3ZlIGFmdGVyXG4gIGNvbnN0IGh1bWFuQXV0b01vdmUgPSAoKSA9PiB7XG4gICAgY29uc3QgY29vcmRzID0gW107XG4gICAgY29uc3Qgc2hpcEtleXMgPSBPYmplY3Qua2V5cyhvd25Cb2FyZC5zaGlwUmVjb3JkKTtcbiAgICBjb25zdCBoaXRLZXlzID0gT2JqZWN0LmtleXMob3duQm9hcmQuaGl0UmVjb3JkKTtcbiAgICBzaGlwS2V5cy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBjb25zdCBjb29yZE9iaiA9IG93bkJvYXJkLnNoaXBSZWNvcmRbc2hpcF07XG4gICAgICBjb25zdCBjb29yZEtleXMgPSBPYmplY3Qua2V5cyhjb29yZE9iaik7XG4gICAgICBjb29yZEtleXMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgICAgY29vcmRzLnB1c2goY29vcmQpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBvd25Cb2FyZC5yZWNlaXZlQXR0YWNrKFxuICAgICAgTnVtYmVyKGNvb3Jkc1toaXRLZXlzLmxlbmd0aF1bMF0pLFxuICAgICAgTnVtYmVyKGNvb3Jkc1toaXRLZXlzLmxlbmd0aF1bMl0pXG4gICAgKTtcbiAgICAvLyBjb25zb2xlLmxvZyhjb29yZHMsIGNvb3Jkc1swXVswXSwgY29vcmRzWzBdWzJdLCBvd25Cb2FyZC5oaXRSZWNvcmQpO1xuICB9O1xuXG4gIGNvbnN0IGF1dG9Nb3ZlID0gKCkgPT4ge1xuICAgIGNvbnN0IHggPSBnZXRSYW5kb21JbnQoMCwgOSk7XG4gICAgY29uc3QgeSA9IGdldFJhbmRvbUludCgwLCA5KTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gb3duQm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcblxuICAgIGlmIChyZXNwb25zZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gYXV0b01vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgYXR0YWNrLCBjb21wdXRlck9uLCBjb21wdXRlciwgZ2V0UmFuZG9tSW50IH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCJpbXBvcnQgaG92ZXJHcmlkIGZyb20gJy4vaG92ZXInO1xuaW1wb3J0IHsgaGlnaExpZ2h0R3JpZCB9IGZyb20gJy4vZGlzcGxheS1zaGlwcyc7XG5pbXBvcnQgeyBjb252ZXJ0TnVtIH0gZnJvbSAnLi9jb252ZXJ0JztcbmltcG9ydCBjcmVhdGVDbGljayBmcm9tICcuL2NsaWNrLWJvYXJkJztcblxuY29uc3QgZ3JpZEluZGV4ID0gKGdyaWQpID0+IHtcbiAgY29uc3QgcmUgPSAvWzAtOV0rLztcbiAgY29uc3QgbnVtID0gZ3JpZC5jbGFzc05hbWU7XG4gIGNvbnN0IGdyaWROdW0gPSByZS5leGVjKG51bS5zbGljZShudW0ubGVuZ3RoIC0gMiwgbnVtLmxlbmd0aCkpWzBdO1xuICByZXR1cm4gZ3JpZE51bTtcbn07XG5cbmNvbnN0IHNldFBsYXllclNoaXAgPSAocGxheWVyQm9hcmQsIGh1bWFuUGxheWVyLCBjb21wdXRlckJvYXJkKSA9PiB7XG4gIGNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNtYWxsLWdyaWQnKTtcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNtYWxsLXJvdGF0ZScpO1xuXG4gIGNvbnN0IGNvbnZlcnRMZW5ndGggPSB7fTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICBpZiAoaSA+PSAwICYmIGkgPCAzKSB7XG4gICAgICBjb252ZXJ0TGVuZ3RoW2ldID0gNSAtIGk7XG4gICAgfSBlbHNlIGlmIChpID09PSAzIHx8IGkgPT09IDQpIHtcbiAgICAgIGNvbnZlcnRMZW5ndGhbaV0gPSAyO1xuICAgIH0gZWxzZSBpZiAoaSA9PT0gNSB8fCBpID09PSA2KSB7XG4gICAgICBjb252ZXJ0TGVuZ3RoW2ldID0gMTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGdyaWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgZ3JpZHNbaV0uY2xhc3NMaXN0LmFkZChgZ3JpZCR7aX1gKTtcbiAgfVxuXG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IHtcbiAgICBjb25zdCByZWNvcmRMZW5ndGggPSBPYmplY3Qua2V5cyhwbGF5ZXJCb2FyZC5zaGlwUmVjb3JkKS5sZW5ndGg7XG4gICAgY29uc3QgbGVuZ3RoID0gY29udmVydExlbmd0aFtyZWNvcmRMZW5ndGhdO1xuICAgIHJldHVybiBsZW5ndGg7XG4gIH07XG5cbiAgbGV0IG9yaWVudCA9ICd2ZXJ0aWNhbCc7XG5cbiAgY29uc3Qgcm90YXRlID0gKCkgPT4ge1xuICAgIGlmIChvcmllbnQgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIG9yaWVudCA9ICdob3Jpem9udGFsJztcbiAgICB9IGVsc2UgaWYgKG9yaWVudCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICBvcmllbnQgPSAndmVydGljYWwnO1xuICAgIH1cblxuICAgIGNvbnN0IHByb21pc2UxID0gUHJvbWlzZS5yZXNvbHZlKHdpcGVIb3ZlcigpKTtcblxuICAgIHByb21pc2UxLnRoZW4oKCkgPT4ge1xuICAgICAgZ2V0SG92ZXIoKTtcbiAgICB9KTtcbiAgfTtcblxuICBsZXQgaG92ZXIgPSBob3ZlckdyaWQoKTtcblxuICBjb25zdCBnZXRIb3ZlciA9ICgpID0+IHtcbiAgICBob3ZlciA9IGhvdmVyR3JpZChnZXRMZW5ndGgoKSwgb3JpZW50KTtcbiAgICBob3Zlci5kaXNwbGF5KCk7XG4gIH07XG5cbiAgY29uc3Qgd2lwZUhvdmVyID0gKCkgPT4ge1xuICAgIGhvdmVyLndpcGUoKTtcbiAgICBoaWdoTGlnaHRHcmlkKHBsYXllckJvYXJkLnNoaXBSZWNvcmQpO1xuICB9O1xuXG4gIGNvbnN0IGNsaWNrR3JpZHMgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkcy5sZW5ndGg7IGkrKykge1xuICAgICAgZ3JpZHNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlbW92ZUNsaWNrcyA9ICgpID0+IHtcbiAgICAvLyBTdGFydCBHYW1lXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkcy5sZW5ndGg7IGkrKykge1xuICAgICAgZ3JpZHNbaV0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZSk7XG4gICAgfVxuICAgIGNyZWF0ZUNsaWNrKGh1bWFuUGxheWVyLCBjb21wdXRlckJvYXJkLCBwbGF5ZXJCb2FyZCk7XG4gIH07XG5cbiAgZnVuY3Rpb24gcGxhY2UoKSB7XG4gICAgY29uc3QgaW5kZXggPSBncmlkSW5kZXgodGhpcyk7XG4gICAgY29uc3QgdGFibGUgPSBjb252ZXJ0TnVtKCk7XG5cbiAgICBjb25zdCBwcm9taXNlMSA9IFByb21pc2UucmVzb2x2ZShcbiAgICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcChcbiAgICAgICAgdGFibGVbaW5kZXhdWzBdLFxuICAgICAgICB0YWJsZVtpbmRleF1bMV0sXG4gICAgICAgIGdldExlbmd0aCgpLFxuICAgICAgICBvcmllbnRcbiAgICAgIClcbiAgICApO1xuICAgIHByb21pc2UxXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHdpcGVIb3ZlcigpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgaWYgKGdldExlbmd0aCgpIDwgNykge1xuICAgICAgICAgIGdldEhvdmVyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVtb3ZlQ2xpY2tzKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coYm9hcmQuc2hpcFJlY29yZCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsaWNrU3RhcnQoKSB7XG4gICAgdGhpcy50ZXh0Q29udGVudCA9ICdSb3RhdGUnO1xuICAgIGdldEhvdmVyKCk7XG4gICAgY2xpY2tHcmlkcygpO1xuICAgIGJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrU3RhcnQpO1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJvdGF0ZSk7XG4gIH1cblxuICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja1N0YXJ0KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNldFBsYXllclNoaXA7XG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuXG5jb25zdCBwbGF5ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xuY29uc3QgY29tcHV0ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xuY29uc3QgY29tcHV0ZXJQbGF5ZXIgPSBQbGF5ZXIocGxheWVyQm9hcmQpO1xuY29tcHV0ZXJQbGF5ZXIuY29tcHV0ZXJPbigpO1xuY29uc3QgaHVtYW5QbGF5ZXIgPSBQbGF5ZXIoY29tcHV0ZXJCb2FyZCwgY29tcHV0ZXJQbGF5ZXIsIHBsYXllckJvYXJkKTtcblxuZXhwb3J0IHsgcGxheWVyQm9hcmQsIGNvbXB1dGVyQm9hcmQsIGh1bWFuUGxheWVyIH07XG4iLCJjb25zdCBTaGlwID0gKGxlbmd0aCwgb3JpZW50KSA9PiB7XG4gIGxldCBzdW5rID0gZmFsc2U7XG4gIGxldCB0b3RhbEhpdHMgPSAwO1xuXG4gIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICB0b3RhbEhpdHMgKz0gMTtcbiAgfTtcblxuICBjb25zdCBjYWxTdW5rID0gKCkgPT4ge1xuICAgIGlmIChsZW5ndGggPT09IHRvdGFsSGl0cykge1xuICAgICAgc3VuayA9IHRydWU7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhpdHMgPSAoKSA9PiB0b3RhbEhpdHM7XG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHN1bms7XG5cbiAgcmV0dXJuIHsgbGVuZ3RoLCBoaXQsIGNhbFN1bmssIGhpdHMsIGlzU3Vuaywgb3JpZW50IH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XFxufVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDMwLCAzMCwgMzApO1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gIGJvcmRlcjogMXB4IHNvaWxkIHJlZDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciAxMGZyIDFmcjtcXG4gIGhlaWdodDogMTAwdmg7XFxufVxcblxcbi50aXRsZS1kaXYge1xcbiAgYm9yZGVyOiAycHggc29saWQgZ3JlZW55ZWxsb3c7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ3JpZC1yb3c6IDEgLyAyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgY29sb3I6IGdyYXk7XFxuICBmb250LXNpemU6IDIuNXJlbTtcXG59XFxuXFxuLmJvYXJkLWRpdiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA1ZnIgMWZyIDFmciAxZnIgNWZyO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgLyogaGVpZ2h0OiBmaXQtY29udGVudDsgKi9cXG4gIGdyaWQtcm93OiAyIC8gMztcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbn1cXG5cXG4uc21hbGwtY29udGFpbmVyIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHRvbWF0bztcXG4gIGhlaWdodDogZml0LWNvbnRlbnQ7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdyaWQtY29sdW1uOiAyIC8gMztcXG59XFxuXFxuLnNtYWxsLWJvYXJkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIG9yYW5nZTtcXG4gIHdpZHRoOiAyNXJlbTtcXG4gIGhlaWdodDogMjVyZW07XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMSwgMWZyKTtcXG5cXG59XFxuXFxuLnNtYWxsLW51bSxcXG4uc21hbGwtYXBsIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zbWFsbC1ncmlkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGdyYXk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn0gXFxuXFxuLnNtYWxsLXJvdGF0ZSB7XFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxufVxcblxcbi5zbWFsbC1uYW1lLFxcbi5zbWFsbC13aW4ge1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbn1cXG5cXG4uYmlnLWNvbnRhaW5lciB7XFxuICBib3JkZXI6IDJweCBzb2xpZCB0b21hdG87XFxuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBncmlkLWNvbHVtbjogNCAvIDU7XFxufVxcblxcbi5iaWctYm9hcmQge1xcbiAgYm9yZGVyOiAycHggc29saWQgb3JhbmdlO1xcbiAgd2lkdGg6IDMwcmVtO1xcbiAgaGVpZ2h0OiAzMHJlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpO1xcbn1cXG5cXG4uYmlnLW51bSxcXG4uYmlnLWFscCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xcbn1cXG5cXG4uYmlnLWdyaWQge1xcbiAgYm9yZGVyOiAycHggc29saWQgZ3JheTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufSBcXG5cXG4uYmlnLW5hbWUge1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbn1cXG5cXG4ubWVzc2FnZSB7XFxuICBjb2xvcjogd2hpdGVzbW9rZTtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zbWFsbC13aW4sXFxuLmJpZy13aW4ge1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsVUFBVTtFQUNWLFNBQVM7RUFDVCxzQkFBc0I7RUFDdEIsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsaUNBQWlDO0FBQ25DOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLGFBQWE7RUFDYixnQ0FBZ0M7RUFDaEMsYUFBYTtBQUNmOztBQUVBO0VBQ0UsNkJBQTZCO0VBQzdCLGFBQWE7RUFDYixlQUFlO0VBQ2YsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsYUFBYTtFQUNiLDBDQUEwQztFQUMxQyxZQUFZO0VBQ1oseUJBQXlCO0VBQ3pCLGVBQWU7RUFDZixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSx3QkFBd0I7RUFDeEIsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usd0JBQXdCO0VBQ3hCLFlBQVk7RUFDWixhQUFhO0VBQ2IsYUFBYTtFQUNiLHNDQUFzQztFQUN0QyxtQ0FBbUM7O0FBRXJDOztBQUVBOztFQUVFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGtCQUFrQjtBQUNwQjs7QUFFQTs7RUFFRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSx3QkFBd0I7RUFDeEIsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usd0JBQXdCO0VBQ3hCLFlBQVk7RUFDWixhQUFhO0VBQ2IsYUFBYTtFQUNiLHNDQUFzQztFQUN0QyxtQ0FBbUM7QUFDckM7O0FBRUE7O0VBRUUsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGVBQWU7RUFDZixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjs7QUFFQTs7RUFFRSxrQkFBa0I7QUFDcEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigzMCwgMzAsIDMwKTtcXG59XFxuXFxuLmNvbnRhaW5lciB7XFxuICBib3JkZXI6IDFweCBzb2lsZCByZWQ7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgMTBmciAxZnI7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4udGl0bGUtZGl2IHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGdyZWVueWVsbG93O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdyaWQtcm93OiAxIC8gMjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGNvbG9yOiBncmF5O1xcbiAgZm9udC1zaXplOiAyLjVyZW07XFxufVxcblxcbi5ib2FyZC1kaXYge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogNWZyIDFmciAxZnIgMWZyIDVmcjtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIC8qIGhlaWdodDogZml0LWNvbnRlbnQ7ICovXFxuICBncmlkLXJvdzogMiAvIDM7XFxuICBjb2xvcjogd2hpdGVzbW9rZTtcXG59XFxuXFxuLnNtYWxsLWNvbnRhaW5lciB7XFxuICBib3JkZXI6IDJweCBzb2xpZCB0b21hdG87XFxuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBncmlkLWNvbHVtbjogMiAvIDM7XFxufVxcblxcbi5zbWFsbC1ib2FyZCB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBvcmFuZ2U7XFxuICB3aWR0aDogMjVyZW07XFxuICBoZWlnaHQ6IDI1cmVtO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDExLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTEsIDFmcik7XFxuXFxufVxcblxcbi5zbWFsbC1udW0sXFxuLnNtYWxsLWFwbCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uc21hbGwtZ3JpZCB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBncmF5O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59IFxcblxcbi5zbWFsbC1yb3RhdGUge1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbn1cXG5cXG4uc21hbGwtbmFtZSxcXG4uc21hbGwtd2luIHtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG59XFxuXFxuLmJpZy1jb250YWluZXIge1xcbiAgYm9yZGVyOiAycHggc29saWQgdG9tYXRvO1xcbiAgaGVpZ2h0OiBmaXQtY29udGVudDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ3JpZC1jb2x1bW46IDQgLyA1O1xcbn1cXG5cXG4uYmlnLWJvYXJkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIG9yYW5nZTtcXG4gIHdpZHRoOiAzMHJlbTtcXG4gIGhlaWdodDogMzByZW07XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMSwgMWZyKTtcXG59XFxuXFxuLmJpZy1udW0sXFxuLmJpZy1hbHAge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcXG59XFxuXFxuLmJpZy1ncmlkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGdyYXk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn0gXFxuXFxuLmJpZy1uYW1lIHtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG59XFxuXFxuLm1lc3NhZ2Uge1xcbiAgY29sb3I6IHdoaXRlc21va2U7XFxuICBmb250LXNpemU6IDFyZW07XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uc21hbGwtd2luLFxcbi5iaWctd2luIHtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG4vLyBpbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkJztcbi8vIGltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuLy8gaW1wb3J0IHsgaGlnaExpZ2h0R3JpZCwgaGlnaEJpZyB9IGZyb20gJy4vZGlzcGxheS1zaGlwcyc7XG4vLyBpbXBvcnQgY3JlYXRlQ2xpY2sgZnJvbSAnLi9jbGljay1ib2FyZCc7XG4vLyBpbXBvcnQgeyBjb252ZXJ0TnVtLCBjb252ZXJ0Q29vcmQgfSBmcm9tICcuL2NvbnZlcnQnO1xuLy8gaW1wb3J0IGhvdmVyR3JpZCBmcm9tICcuL2hvdmVyJztcbmltcG9ydCBzZXRQbGF5ZXJTaGlwIGZyb20gJy4vc2V0LXNoaXAnO1xuaW1wb3J0IHsgY29tcHV0ZXJCb2FyZCwgcGxheWVyQm9hcmQsIGh1bWFuUGxheWVyIH0gZnJvbSAnLi9zZXR1cCc7XG5cbnNldFBsYXllclNoaXAocGxheWVyQm9hcmQsIGh1bWFuUGxheWVyLCBjb21wdXRlckJvYXJkKTtcblxuLy8gY29uc3QgcGxheWVyQm9hcmQgPSBHYW1lYm9hcmQoKTtcbi8vIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBHYW1lYm9hcmQoKTtcbi8vIGNvbnN0IGNvbXB1dGVyUGxheWVyID0gUGxheWVyKHBsYXllckJvYXJkKTtcbi8vIGNvbXB1dGVyUGxheWVyLmNvbXB1dGVyT24oKTtcbi8vIGNvbnN0IGh1bWFuUGxheWVyID0gUGxheWVyKGNvbXB1dGVyQm9hcmQsIGNvbXB1dGVyUGxheWVyLCBwbGF5ZXJCb2FyZCk7XG5cbi8vIHBsYXllckJvYXJkLnBsYWNlU2hpcCg0LCAxLCA1LCAndmVydGljYWwnKTtcbi8vIHBsYXllckJvYXJkLnBsYWNlU2hpcCg2LCA0LCAzLCAnaG9yaXpvbnRhbCcpO1xuLy8gcGxheWVyQm9hcmQucGxhY2VTaGlwKDEsIDcsIDIsICd2ZXJ0aWNhbCcpO1xuLy8gcGxheWVyQm9hcmQucGxhY2VTaGlwKDQsIDQsIDIsICdob3Jpem9udGFsJyk7XG4vLyBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoOSwgOSwgMSwgJ3ZlcnRpY2FsJyk7XG4vLyBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoNywgOCwgMSwgJ3ZlcnRpY2FsJyk7XG4vLyBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoOSwgNSwgMywgJ2hvcml6b250YWwnKTtcblxuLy8gaGlnaExpZ2h0R3JpZChwbGF5ZXJCb2FyZC5zaGlwUmVjb3JkKTtcblxuLy8gY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMSwgMSwgNSwgJ3ZlcnRpY2FsJyk7XG4vLyBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCgzLCAzLCA0LCAndmVydGljYWwnKTtcbi8vIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDgsIDMsIDMsICdob3Jpem9udGFsJyk7XG4vLyBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCgxLCA1LCAyLCAndmVydGljYWwnKTtcbi8vIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDQsIDYsIDIsICd2ZXJ0aWNhbCcpO1xuLy8gY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMywgOSwgMSwgJ3ZlcnRpY2FsJyk7XG4vLyBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCg3LCAwLCAxLCAndmVydGljYWwnKTtcblxuLy8gaGlnaEJpZyhjb21wdXRlckJvYXJkLnNoaXBSZWNvcmQpO1xuXG4vLyBjcmVhdGVDbGljayhodW1hblBsYXllciwgY29tcHV0ZXJCb2FyZCwgcGxheWVyQm9hcmQpO1xuXG4vLyBob3ZlckdyaWQoNSwgJ3ZlcnRpY2FsJyk7XG4vLyBob3ZlckdyaWQoNSwgJ2hvcml6b250YWwnKTtcbiJdLCJuYW1lcyI6WyJjb252ZXJ0TnVtIiwiZGlzcGxheUhpdCIsImdyaWRJbmRleCIsImdyaWQiLCJyZSIsIm51bSIsImNsYXNzTmFtZSIsImdyaWROdW0iLCJleGVjIiwic2xpY2UiLCJsZW5ndGgiLCJjb29yZCIsImNyZWF0ZUNsaWNrIiwicGxheWVyIiwiY29tcHV0ZXJCb2FyZCIsInBsYXllckJvYXJkIiwiZ3JpZHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJiaWdXaW4iLCJxdWVyeVNlbGVjdG9yIiwiY2xpY2tTdHlsZSIsInRhcmdldCIsImF0dGFjayIsInJlc3VsdCIsImZpbmRHcmlkIiwiZnVsbEJvYXJkIiwibWlzcyIsInRleHRDb250ZW50Iiwic3R5bGUiLCJmb250U2l6ZSIsImNvbG9yIiwic2hpcCIsInVuZGVmaW5lZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjb21wdXRlclN1bmsiLCJjaGVja1N1bmsiLCJwbGF5ZXJTdW5rIiwiZm9yRWFjaCIsImNvbnNvbGUiLCJsb2ciLCJpIiwiY2xhc3NMaXN0IiwiYWRkIiwiY3Vyc29yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbnZlcnRDb29yZCIsImFyZ3VtZW50cyIsIngiLCJ5IiwidGFibGUiLCJhbGxHcmlkcyIsImhpZ2hMaWdodEdyaWQiLCJzaGlwcyIsInRhcmdldHMiLCJPYmplY3QiLCJrZXlzIiwia2V5IiwiY29vcmRzIiwicHVzaCIsImluZGV4IiwiYm9yZGVyIiwiaGlnaEJpZyIsImJvYXJkIiwiaGl0UmVjb3JkIiwiU2hpcCIsIkdyaWQiLCJ1cCIsInJpZ2h0IiwiYm91bmRhcnkiLCJHYW1lYm9hcmQiLCJtYWtlQm9hcmQiLCJwIiwicSIsInN1cnZleUdyaWQiLCJvcmllbnQiLCJjb3VudCIsInBsYWNlQm91bmRhcnkiLCJsaXN0IiwicGxhY2VTaGlwIiwicmVjb3JkIiwiY2hlY2tMZW5ndGgiLCJzdXJ2ZXkiLCJzaGlwTmFtZSIsImZsZWV0Iiwic2hpcFJlY29yZCIsInJlY29yZEtleSIsInNoaXBLZXlzIiwiY29vcmRPYmoiLCJjb29yZEtleXMiLCJjaGVja1NoaXAiLCJOdW1iZXIiLCJjYWxTdW5rIiwiaXNTdW5rIiwic3Vua1JlY29yZCIsImluY2x1ZGVzIiwicmVjZWl2ZUF0dGFjayIsImF0dGFja1NoaXAiLCJjdXJyZW50U2hpcCIsImFsbENvb3JkIiwiYWxsS2V5cyIsInByb3BlcnR5Iiwib25lSGl0IiwiaGl0IiwiaG92ZXJHcmlkIiwiZGlzcGxheSIsInZIb3ZlciIsInZMZWF2ZSIsImhIb3ZlciIsImhMZWF2ZSIsIndpcGUiLCJiYWNrZ3JvdW5kIiwiYmFzZSIsImNoZWNrIiwiU3RyaW5nIiwiUGxheWVyIiwiZW5lbXlCb2FyZCIsImNvbXB1dGVyUGxheWVyIiwib3duQm9hcmQiLCJhaSIsImNvbXB1dGVyT24iLCJjb21wdXRlciIsImh1bWFuQXV0b01vdmUiLCJnZXRSYW5kb21JbnQiLCJtaW4iLCJtYXgiLCJNYXRoIiwiY2VpbCIsImZsb29yIiwicmFuZG9tIiwiaGl0S2V5cyIsImF1dG9Nb3ZlIiwicmVzcG9uc2UiLCJzZXRQbGF5ZXJTaGlwIiwiaHVtYW5QbGF5ZXIiLCJidXR0b24iLCJjb252ZXJ0TGVuZ3RoIiwiZ2V0TGVuZ3RoIiwicmVjb3JkTGVuZ3RoIiwicm90YXRlIiwicHJvbWlzZTEiLCJQcm9taXNlIiwicmVzb2x2ZSIsIndpcGVIb3ZlciIsInRoZW4iLCJnZXRIb3ZlciIsImhvdmVyIiwiY2xpY2tHcmlkcyIsInBsYWNlIiwicmVtb3ZlQ2xpY2tzIiwiY2xpY2tTdGFydCIsInN1bmsiLCJ0b3RhbEhpdHMiLCJoaXRzIl0sInNvdXJjZVJvb3QiOiIifQ==