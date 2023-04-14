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


const allGrids = () => {
  const grids = document.querySelectorAll('.big-grid');
  return grids;
};
const gridIndex = grid => {
  const re = /[0-9]+/;
  const num = grid.className;
  const gridNum = re.exec(num.slice(num.length - 2, num.length))[0];
  const coord = (0,_convert__WEBPACK_IMPORTED_MODULE_0__.convertNum)();
  return coord[gridNum];
};
const createClick = (player, computerBoard, playerBoard) => {
  const grids = allGrids();
  const smallWin = document.querySelector('.small-win');
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
      smallWin.textContent = 'Player win';
    }

    // console.log(computerBoard.shipRecord);
    // console.log(computerBoard.sunkRecord);
  }

  for (let i = 0; i < grids.length; i++) {
    grids[i].classList.add(`grid${i}`);
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



const gridIndex = grid => {
  const re = /[0-9]+/;
  const num = grid.className;
  const gridNum = re.exec(num.slice(num.length - 2, num.length))[0];
  return gridNum;
};
const setPlayerShip = board => {
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
    const recordLength = Object.keys(board.shipRecord).length;
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
    (0,_display_ships__WEBPACK_IMPORTED_MODULE_1__.highLightGrid)(board.shipRecord);
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
  };
  function place() {
    const index = gridIndex(this);
    const table = (0,_convert__WEBPACK_IMPORTED_MODULE_2__.convertNum)();
    const promise1 = Promise.resolve(console.log(board.placeShip(table[index][0], table[index][1], getLength(), orient)));
    promise1.then(() => {
      wipeHover();
    }).then(() => {
      if (getLength() < 7) {
        getHover();
      } else {
        removeClicks();
      }
      console.log(board.shipRecord);
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  font-family: sans-serif;\n}\n\nbody {\n  background-color: rgb(30, 30, 30);\n}\n\n.container {\n  border: 1px soild red;\n  display: grid;\n  grid-template-rows: 1fr 10fr 1fr;\n  height: 100vh;\n}\n\n.title-div {\n  border: 2px solid greenyellow;\n  display: flex;\n  grid-row: 1 / 2;\n  justify-content: center;\n  align-items: center;\n  color: gray;\n  font-size: 2.5rem;\n}\n\n.board-div {\n  display: grid;\n  grid-template-columns: 5fr 1fr 1fr 1fr 5fr;\n  width: 100vw;\n  /* height: fit-content; */\n  grid-row: 2 / 3;\n  color: whitesmoke;\n}\n\n.small-container {\n  border: 2px solid tomato;\n  height: fit-content;\n  display: flex;\n  flex-direction: column;\n  grid-column: 2 / 3;\n}\n\n.small-board {\n  border: 2px solid orange;\n  width: 25rem;\n  height: 25rem;\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(11, 1fr);\n\n}\n\n.small-num,\n.small-apl {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.small-grid {\n  border: 2px solid gray;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n} \n\n/* .small-grid[style=\"border: 2px solid cyan;\"] {\n  cursor:pointer\n} */\n\n.small-rotate {\n  width: fit-content;\n  align-self: center;\n}\n\n.small-name,\n.small-win {\n  align-self: center;\n}\n\n.big-container {\n  border: 2px solid tomato;\n  height: fit-content;\n  display: flex;\n  flex-direction: column;\n  grid-column: 4 / 5;\n}\n\n.big-board {\n  border: 2px solid orange;\n  width: 30rem;\n  height: 30rem;\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(11, 1fr);\n}\n\n.big-num,\n.big-alp {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.25rem;\n}\n\n.big-grid {\n  border: 2px solid gray;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor:pointer\n} \n\n.big-name {\n  align-self: center;\n}\n\n.message {\n  color: whitesmoke;\n  font-size: 1rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.small-win,\n.big-win {\n  align-self: center;\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,UAAU;EACV,SAAS;EACT,sBAAsB;EACtB,uBAAuB;AACzB;;AAEA;EACE,iCAAiC;AACnC;;AAEA;EACE,qBAAqB;EACrB,aAAa;EACb,gCAAgC;EAChC,aAAa;AACf;;AAEA;EACE,6BAA6B;EAC7B,aAAa;EACb,eAAe;EACf,uBAAuB;EACvB,mBAAmB;EACnB,WAAW;EACX,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,0CAA0C;EAC1C,YAAY;EACZ,yBAAyB;EACzB,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,wBAAwB;EACxB,mBAAmB;EACnB,aAAa;EACb,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;EACxB,YAAY;EACZ,aAAa;EACb,aAAa;EACb,sCAAsC;EACtC,mCAAmC;;AAErC;;AAEA;;EAEE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,sBAAsB;EACtB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;;GAEG;;AAEH;EACE,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;;EAEE,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;EACxB,mBAAmB;EACnB,aAAa;EACb,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;EACxB,YAAY;EACZ,aAAa;EACb,aAAa;EACb,sCAAsC;EACtC,mCAAmC;AACrC;;AAEA;;EAEE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,sBAAsB;EACtB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB;AACF;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;EACjB,eAAe;EACf,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;;EAEE,kBAAkB;AACpB","sourcesContent":["* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  font-family: sans-serif;\n}\n\nbody {\n  background-color: rgb(30, 30, 30);\n}\n\n.container {\n  border: 1px soild red;\n  display: grid;\n  grid-template-rows: 1fr 10fr 1fr;\n  height: 100vh;\n}\n\n.title-div {\n  border: 2px solid greenyellow;\n  display: flex;\n  grid-row: 1 / 2;\n  justify-content: center;\n  align-items: center;\n  color: gray;\n  font-size: 2.5rem;\n}\n\n.board-div {\n  display: grid;\n  grid-template-columns: 5fr 1fr 1fr 1fr 5fr;\n  width: 100vw;\n  /* height: fit-content; */\n  grid-row: 2 / 3;\n  color: whitesmoke;\n}\n\n.small-container {\n  border: 2px solid tomato;\n  height: fit-content;\n  display: flex;\n  flex-direction: column;\n  grid-column: 2 / 3;\n}\n\n.small-board {\n  border: 2px solid orange;\n  width: 25rem;\n  height: 25rem;\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(11, 1fr);\n\n}\n\n.small-num,\n.small-apl {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.small-grid {\n  border: 2px solid gray;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n} \n\n/* .small-grid[style=\"border: 2px solid cyan;\"] {\n  cursor:pointer\n} */\n\n.small-rotate {\n  width: fit-content;\n  align-self: center;\n}\n\n.small-name,\n.small-win {\n  align-self: center;\n}\n\n.big-container {\n  border: 2px solid tomato;\n  height: fit-content;\n  display: flex;\n  flex-direction: column;\n  grid-column: 4 / 5;\n}\n\n.big-board {\n  border: 2px solid orange;\n  width: 30rem;\n  height: 30rem;\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(11, 1fr);\n}\n\n.big-num,\n.big-alp {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.25rem;\n}\n\n.big-grid {\n  border: 2px solid gray;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor:pointer\n} \n\n.big-name {\n  align-self: center;\n}\n\n.message {\n  color: whitesmoke;\n  font-size: 1rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.small-win,\n.big-win {\n  align-self: center;\n}"],"sourceRoot":""}]);
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
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _display_ships__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./display-ships */ "./src/display-ships.js");
/* harmony import */ var _click_board__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./click-board */ "./src/click-board.js");
/* harmony import */ var _convert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./convert */ "./src/convert.js");
/* harmony import */ var _hover__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./hover */ "./src/hover.js");
/* harmony import */ var _set_ship__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./set-ship */ "./src/set-ship.js");








const playerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
const computerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
const computerPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_2__["default"])(playerBoard);
computerPlayer.computerOn();
const humanPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_2__["default"])(computerBoard, computerPlayer, playerBoard);

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

(0,_click_board__WEBPACK_IMPORTED_MODULE_4__["default"])(humanPlayer, computerBoard, playerBoard);

// hoverGrid(5, 'vertical');
// hoverGrid(5, 'horizontal');

(0,_set_ship__WEBPACK_IMPORTED_MODULE_7__["default"])(playerBoard);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDOztBQUV0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQUgsd0RBQVcsQ0FBQ3lJLFdBQVcsRUFBRXZJLGFBQWEsRUFBRUMsV0FBVyxDQUFDOztBQUVwRDtBQUNBOztBQUVBa0gscURBQWEsQ0FBQ2xILFdBQVcsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL2NsaWNrLWJvYXJkLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9jb252ZXJ0LmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9kaXNwbGF5LXNoaXBzLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL2hvdmVyLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL3NldC1zaGlwLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25wbS1zZXR1cC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29udmVydE51bSB9IGZyb20gJy4vY29udmVydCc7XG5pbXBvcnQgeyBkaXNwbGF5SGl0IH0gZnJvbSAnLi9kaXNwbGF5LXNoaXBzJztcblxuY29uc3QgYWxsR3JpZHMgPSAoKSA9PiB7XG4gIGNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJpZy1ncmlkJyk7XG4gIHJldHVybiBncmlkcztcbn07XG5cbmNvbnN0IGdyaWRJbmRleCA9IChncmlkKSA9PiB7XG4gIGNvbnN0IHJlID0gL1swLTldKy87XG4gIGNvbnN0IG51bSA9IGdyaWQuY2xhc3NOYW1lO1xuICBjb25zdCBncmlkTnVtID0gcmUuZXhlYyhudW0uc2xpY2UobnVtLmxlbmd0aCAtIDIsIG51bS5sZW5ndGgpKVswXTtcbiAgY29uc3QgY29vcmQgPSBjb252ZXJ0TnVtKCk7XG4gIHJldHVybiBjb29yZFtncmlkTnVtXTtcbn07XG5cbmNvbnN0IGNyZWF0ZUNsaWNrID0gKHBsYXllciwgY29tcHV0ZXJCb2FyZCwgcGxheWVyQm9hcmQpID0+IHtcbiAgY29uc3QgZ3JpZHMgPSBhbGxHcmlkcygpO1xuICBjb25zdCBzbWFsbFdpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbWFsbC13aW4nKTtcbiAgY29uc3QgYmlnV2luID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJpZy13aW4nKTtcblxuICBmdW5jdGlvbiBjbGlja1N0eWxlKCkge1xuICAgIGNvbnN0IHRhcmdldCA9IGdyaWRJbmRleCh0aGlzKTtcbiAgICBwbGF5ZXIuYXR0YWNrKHRhcmdldFswXSwgdGFyZ2V0WzFdKTtcbiAgICBjb25zdCByZXN1bHQgPSBjb21wdXRlckJvYXJkLmZpbmRHcmlkKFxuICAgICAgY29tcHV0ZXJCb2FyZC5mdWxsQm9hcmQsXG4gICAgICB0YXJnZXRbMF0sXG4gICAgICB0YXJnZXRbMV1cbiAgICApO1xuICAgIGlmIChyZXN1bHQubWlzcyA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy50ZXh0Q29udGVudCA9ICcvJztcbiAgICAgIHRoaXMuc3R5bGUuZm9udFNpemUgPSAnMnJlbSc7XG4gICAgICB0aGlzLnN0eWxlLmNvbG9yID0gJ3doaXRlc21va2UnO1xuICAgIH1cbiAgICBpZiAocmVzdWx0LnNoaXAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy50ZXh0Q29udGVudCA9ICdYJztcbiAgICAgIHRoaXMuc3R5bGUuZm9udFNpemUgPSAnMnJlbSc7XG4gICAgICB0aGlzLnN0eWxlLmNvbG9yID0gJ3JlZCc7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja1N0eWxlKTtcblxuICAgIGNvbnN0IGNvbXB1dGVyU3VuayA9IGNvbXB1dGVyQm9hcmQuY2hlY2tTdW5rKCk7XG5cbiAgICBpZiAoY29tcHV0ZXJTdW5rID09PSBmYWxzZSkge1xuICAgICAgZGlzcGxheUhpdChwbGF5ZXJCb2FyZCk7XG4gICAgICBjb25zdCBwbGF5ZXJTdW5rID0gcGxheWVyQm9hcmQuY2hlY2tTdW5rKCk7XG4gICAgICBpZiAocGxheWVyU3VuayA9PT0gdHJ1ZSkge1xuICAgICAgICBncmlkcy5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgICAgICAgZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrU3R5bGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coJ0NvbXB1dGVyIHdpbicpO1xuICAgICAgICBiaWdXaW4udGV4dENvbnRlbnQgPSAnT3Bwb25lbnQgV2luJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29tcHV0ZXJTdW5rID09PSB0cnVlKSB7XG4gICAgICBncmlkcy5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgICAgIGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja1N0eWxlKTtcbiAgICAgIH0pO1xuICAgICAgY29uc29sZS5sb2coJ0h1bWFuIHdpbicpO1xuICAgICAgc21hbGxXaW4udGV4dENvbnRlbnQgPSAnUGxheWVyIHdpbic7XG4gICAgfVxuXG4gICAgLy8gY29uc29sZS5sb2coY29tcHV0ZXJCb2FyZC5zaGlwUmVjb3JkKTtcbiAgICAvLyBjb25zb2xlLmxvZyhjb21wdXRlckJvYXJkLnN1bmtSZWNvcmQpO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkcy5sZW5ndGg7IGkrKykge1xuICAgIGdyaWRzW2ldLmNsYXNzTGlzdC5hZGQoYGdyaWQke2l9YCk7XG4gICAgZ3JpZHNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja1N0eWxlKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ2xpY2s7XG4iLCJjb25zdCBjb252ZXJ0Q29vcmQgPSAobnVtID0gMCwgeCA9IDksIHkgPSAwLCB0YWJsZSA9IHt9KSA9PiB7XG4gIGlmIChudW0gPiA5OSkge1xuICAgIHJldHVybiB0YWJsZTtcbiAgfVxuICBjb25zdCBjb29yZCA9IFt4LCB5XTtcbiAgdGFibGVbY29vcmRdID0gbnVtO1xuICBpZiAoeSA9PT0gOSkge1xuICAgIHggLT0gMTtcbiAgICB5ID0gLTE7XG4gIH1cbiAgcmV0dXJuIGNvbnZlcnRDb29yZChudW0gKyAxLCB4LCB5ICsgMSwgdGFibGUpO1xufTtcblxuY29uc3QgY29udmVydE51bSA9IChudW0gPSAwLCB4ID0gOSwgeSA9IDAsIHRhYmxlID0ge30pID0+IHtcbiAgaWYgKG51bSA+IDk5KSB7XG4gICAgcmV0dXJuIHRhYmxlO1xuICB9XG4gIGNvbnN0IGNvb3JkID0gW3gsIHldO1xuICB0YWJsZVtudW1dID0gY29vcmQ7XG4gIGlmICh5ID09PSA5KSB7XG4gICAgeCAtPSAxO1xuICAgIHkgPSAtMTtcbiAgfVxuICByZXR1cm4gY29udmVydE51bShudW0gKyAxLCB4LCB5ICsgMSwgdGFibGUpO1xufTtcblxuZXhwb3J0IHsgY29udmVydENvb3JkLCBjb252ZXJ0TnVtIH07XG4iLCJpbXBvcnQgeyBjb252ZXJ0Q29vcmQgfSBmcm9tICcuL2NvbnZlcnQnO1xuXG5jb25zdCBhbGxHcmlkcyA9ICgpID0+IHtcbiAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc21hbGwtZ3JpZCcpO1xuICByZXR1cm4gZ3JpZHM7XG59O1xuXG5jb25zdCBoaWdoTGlnaHRHcmlkID0gKHNoaXBzKSA9PiB7XG4gIGNvbnN0IHRhcmdldHMgPSBbXTtcbiAgY29uc3QgZ3JpZHMgPSBhbGxHcmlkcygpO1xuXG4gIE9iamVjdC5rZXlzKHNoaXBzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBjb25zdCBjb29yZHMgPSBzaGlwc1trZXldO1xuICAgIE9iamVjdC5rZXlzKGNvb3JkcykuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIHRhcmdldHMucHVzaChjb29yZCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGNvbnN0IHRhYmxlID0gY29udmVydENvb3JkKCk7XG5cbiAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IHRhYmxlW3RhcmdldF07XG4gICAgZ3JpZHNbaW5kZXhdLnN0eWxlLmJvcmRlciA9ICcycHggY3lhbiBzb2xpZCc7XG4gIH0pO1xufTtcblxuY29uc3QgaGlnaEJpZyA9IChzaGlwcykgPT4ge1xuICBjb25zdCB0YXJnZXRzID0gW107XG4gIGNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJpZy1ncmlkJyk7XG5cbiAgT2JqZWN0LmtleXMoc2hpcHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGNvbnN0IGNvb3JkcyA9IHNoaXBzW2tleV07XG4gICAgT2JqZWN0LmtleXMoY29vcmRzKS5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgdGFyZ2V0cy5wdXNoKGNvb3JkKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgY29uc3QgdGFibGUgPSBjb252ZXJ0Q29vcmQoKTtcblxuICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gdGFibGVbdGFyZ2V0XTtcbiAgICBncmlkc1tpbmRleF0uc3R5bGUuYm9yZGVyID0gJzJweCBjeWFuIHNvbGlkJztcbiAgfSk7XG59O1xuXG5jb25zdCBkaXNwbGF5SGl0ID0gKGJvYXJkKSA9PiB7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhib2FyZC5oaXRSZWNvcmQpO1xuICBjb25zdCBjb29yZCA9IGJvYXJkLmhpdFJlY29yZFtrZXlzW2tleXMubGVuZ3RoIC0gMV1dO1xuICBjb25zdCB0YXJnZXQgPSBib2FyZC5maW5kR3JpZChib2FyZC5mdWxsQm9hcmQsIGNvb3JkWzBdLCBjb29yZFsxXSk7XG5cbiAgY29uc3QgZ3JpZHMgPSBhbGxHcmlkcygpO1xuICBjb25zdCB0YWJsZSA9IGNvbnZlcnRDb29yZCgpO1xuICBjb25zdCBncmlkTnVtID0gdGFibGVbY29vcmRdO1xuXG4gIGlmICh0YXJnZXQubWlzcyA9PT0gdHJ1ZSkge1xuICAgIGdyaWRzW2dyaWROdW1dLnRleHRDb250ZW50ID0gJ1gnO1xuICAgIGdyaWRzW2dyaWROdW1dLnN0eWxlLmZvbnRTaXplID0gJzEuNXJlbSc7XG4gICAgZ3JpZHNbZ3JpZE51bV0uc3R5bGUuY29sb3IgPSAnd2hpdGVzbW9rZSc7XG4gIH1cbiAgaWYgKHRhcmdldC5zaGlwICE9PSB1bmRlZmluZWQpIHtcbiAgICBncmlkc1tncmlkTnVtXS50ZXh0Q29udGVudCA9ICdYJztcbiAgICBncmlkc1tncmlkTnVtXS5zdHlsZS5mb250U2l6ZSA9ICcxLjVyZW0nO1xuICAgIGdyaWRzW2dyaWROdW1dLnN0eWxlLmNvbG9yID0gJ3JlZCc7XG4gIH1cbn07XG5cbmV4cG9ydCB7IGhpZ2hMaWdodEdyaWQsIGhpZ2hCaWcsIGRpc3BsYXlIaXQgfTtcbiIsImltcG9ydCBTaGlwIGZyb20gJy4vc2hpcCc7XG5cbmNvbnN0IEdyaWQgPSAoeCwgeSwgdXAsIHJpZ2h0LCBzaGlwLCBtaXNzID0gZmFsc2UsIGJvdW5kYXJ5ID0gZmFsc2UpID0+IHtcbiAgY29uc3QgY29vcmQgPSBbeCwgeV07XG4gIHJldHVybiB7IGNvb3JkLCB1cCwgcmlnaHQsIHNoaXAsIG1pc3MsIGJvdW5kYXJ5IH07XG59O1xuXG5jb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IG1ha2VCb2FyZCA9ICh4ID0gMCwgeSA9IDApID0+IHtcbiAgICBpZiAoeCA+IDkgfHwgeSA+IDkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGJvYXJkID0gR3JpZCh4LCB5LCBtYWtlQm9hcmQoeCArIDEsIHkpLCBtYWtlQm9hcmQoeCwgeSArIDEpKTtcblxuICAgIHJldHVybiBib2FyZDtcbiAgfTtcblxuICBjb25zdCBmaW5kR3JpZCA9IChncmlkLCBwLCBxKSA9PiB7XG4gICAgaWYgKGdyaWQuY29vcmRbMF0gIT09IHApIHtcbiAgICAgIGdyaWQgPSBncmlkLnVwO1xuICAgICAgcmV0dXJuIGZpbmRHcmlkKGdyaWQsIHAsIHEpO1xuICAgIH1cblxuICAgIGlmIChncmlkLmNvb3JkWzBdID09PSBwKSB7XG4gICAgICBpZiAoZ3JpZC5jb29yZFsxXSAhPT0gcSkge1xuICAgICAgICBncmlkID0gZ3JpZC5yaWdodDtcbiAgICAgICAgcmV0dXJuIGZpbmRHcmlkKGdyaWQsIHAsIHEpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZ3JpZDtcbiAgfTtcblxuICBjb25zdCBzdXJ2ZXlHcmlkID0gKHgsIHksIGxlbmd0aCwgb3JpZW50LCBjb3VudCA9IDApID0+IHtcbiAgICBpZiAoY291bnQgPT09IGxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChmaW5kR3JpZChmdWxsQm9hcmQsIHgsIHkpLnNoaXAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKG9yaWVudCA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICByZXR1cm4gc3VydmV5R3JpZCh4ICsgMSwgeSwgbGVuZ3RoLCBvcmllbnQsIGNvdW50ICsgMSk7XG4gICAgICB9XG4gICAgICBpZiAob3JpZW50ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgcmV0dXJuIHN1cnZleUdyaWQoeCwgeSArIDEsIGxlbmd0aCwgb3JpZW50LCBjb3VudCArIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VCb3VuZGFyeSA9ICh4LCB5KSA9PiB7XG4gICAgY29uc3QgbGlzdCA9IFtdO1xuXG4gICAgaWYgKHggKyAxIDwgMTApIHtcbiAgICAgIGxpc3QucHVzaChmaW5kR3JpZChmdWxsQm9hcmQsIHggKyAxLCB5KSk7XG4gICAgfVxuICAgIGlmICh4IC0gMSA+IDApIHtcbiAgICAgIGxpc3QucHVzaChmaW5kR3JpZChmdWxsQm9hcmQsIHggLSAxLCB5KSk7XG4gICAgfVxuICAgIGlmICh5IC0gMSA+IDApIHtcbiAgICAgIGxpc3QucHVzaChmaW5kR3JpZChmdWxsQm9hcmQsIHgsIHkgLSAxKSk7XG4gICAgfVxuICAgIGlmICh5ICsgMSA8IDEwKSB7XG4gICAgICBsaXN0LnB1c2goZmluZEdyaWQoZnVsbEJvYXJkLCB4LCB5ICsgMSkpO1xuICAgIH1cblxuICAgIGlmICh4ICsgMSA8IDEwICYmIHkgLSAxID4gMCkge1xuICAgICAgbGlzdC5wdXNoKGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCArIDEsIHkgLSAxKSk7XG4gICAgfVxuICAgIGlmICh4ICsgMSA8IDEwICYmIHkgKyAxIDwgMTApIHtcbiAgICAgIGxpc3QucHVzaChmaW5kR3JpZChmdWxsQm9hcmQsIHggKyAxLCB5ICsgMSkpO1xuICAgIH1cbiAgICBpZiAoeCAtIDEgPiAwICYmIHkgLSAxID4gMCkge1xuICAgICAgbGlzdC5wdXNoKGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCAtIDEsIHkgLSAxKSk7XG4gICAgfVxuICAgIGlmICh4IC0gMSA8IDEwICYmIHkgKyAxID4gMTApIHtcbiAgICAgIGxpc3QucHVzaChmaW5kR3JpZChmdWxsQm9hcmQsIHggLSAxLCB5ICsgMSkpO1xuICAgIH1cblxuICAgIGxpc3QuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgc2hpcC5ib3VuZGFyeSA9IHRydWU7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKFxuICAgIHgsXG4gICAgeSxcbiAgICBsZW5ndGgsXG4gICAgb3JpZW50LFxuICAgIGNvdW50ID0gMCxcbiAgICByZWNvcmQgPSB7fSxcbiAgICBjaGVja0xlbmd0aCA9IHRydWUsXG4gICAgc3VydmV5ID0gbnVsbFxuICApID0+IHtcbiAgICBpZiAoY2hlY2tMZW5ndGggPT09IHRydWUpIHtcbiAgICAgIGlmICh4ICsgbGVuZ3RoID4gMTAgJiYgb3JpZW50ID09PSAndmVydGljYWwnKSB7XG4gICAgICAgIHJldHVybiAnU2hpcCBvdmVyIGJvcmRlcic7XG4gICAgICB9XG4gICAgICBpZiAoeSArIGxlbmd0aCA+IDEwICYmIG9yaWVudCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIHJldHVybiAnU2hpcCBvdmVyIGJvcmRlcic7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cnZleSA9PT0gbnVsbCkge1xuICAgICAgaWYgKG9yaWVudCA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICBzdXJ2ZXkgPSBzdXJ2ZXlHcmlkKHgsIHksIGxlbmd0aCwgJ3ZlcnRpY2FsJyk7XG4gICAgICB9XG4gICAgICBpZiAob3JpZW50ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgc3VydmV5ID0gc3VydmV5R3JpZCh4LCB5LCBsZW5ndGgsICdob3Jpem9udGFsJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc2hpcE5hbWUgPSBmbGVldFtsZW5ndGhdO1xuICAgIGlmIChzaGlwUmVjb3JkW3NoaXBOYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gJ1NoaXAgbm90IGF2YWlsYWJsZSc7XG4gICAgfVxuXG4gICAgaWYgKGNvdW50ID09PSBsZW5ndGgpIHtcbiAgICAgIGlmIChzaGlwTmFtZSA9PT0gJ0Rlc3Ryb3llcjEnKSB7XG4gICAgICAgIGZsZWV0W2xlbmd0aF0gPSAnRGVzdHJveWVyMic7XG4gICAgICB9XG4gICAgICBpZiAoc2hpcE5hbWUgPT09ICdTdWJtYXJpbmUxJykge1xuICAgICAgICBmbGVldFtsZW5ndGhdID0gJ1N1Ym1hcmluZTInO1xuICAgICAgfVxuICAgICAgc2hpcFJlY29yZFtzaGlwTmFtZV0gPSByZWNvcmQ7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCwgeSkuc2hpcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gYFNwYWNlIGFscmVhZHkgdGFrZW5gO1xuICAgIH1cblxuICAgIGlmIChvcmllbnQgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIGlmIChzdXJ2ZXkgPT09IHRydWUpIHtcbiAgICAgICAgLy8gcGxhY2VCb3VuZGFyeSh4LCB5KTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZmluZEdyaWQoZnVsbEJvYXJkLCB4LCB5KTtcbiAgICAgICAgdGFyZ2V0LnNoaXAgPSBTaGlwKGxlbmd0aCwgJ3ZlcnRpY2FsJyk7XG4gICAgICAgIGNvbnN0IHJlY29yZEtleSA9IHRhcmdldC5jb29yZDtcbiAgICAgICAgcmVjb3JkW3JlY29yZEtleV0gPSByZWNvcmRLZXk7XG4gICAgICAgIGNoZWNrTGVuZ3RoID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBwbGFjZVNoaXAoXG4gICAgICAgICAgeCArIDEsXG4gICAgICAgICAgeSxcbiAgICAgICAgICBsZW5ndGgsXG4gICAgICAgICAgb3JpZW50LFxuICAgICAgICAgIGNvdW50ICsgMSxcbiAgICAgICAgICByZWNvcmQsXG4gICAgICAgICAgY2hlY2tMZW5ndGgsXG4gICAgICAgICAgc3VydmV5XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoc3VydmV5ID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gYFNwYWNlIGFscmVhZHkgdGFrZW5gO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgaWYgKHN1cnZleSA9PT0gdHJ1ZSkge1xuICAgICAgICAvLyBwbGFjZUJvdW5kYXJ5KHgsIHkpO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBmaW5kR3JpZChmdWxsQm9hcmQsIHgsIHkpO1xuICAgICAgICB0YXJnZXQuc2hpcCA9IFNoaXAobGVuZ3RoLCAnaG9yaXpvbnRhbCcpO1xuICAgICAgICBjb25zdCByZWNvcmRLZXkgPSB0YXJnZXQuY29vcmQ7XG4gICAgICAgIHJlY29yZFtyZWNvcmRLZXldID0gcmVjb3JkS2V5O1xuICAgICAgICBjaGVja0xlbmd0aCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gcGxhY2VTaGlwKFxuICAgICAgICAgIHgsXG4gICAgICAgICAgeSArIDEsXG4gICAgICAgICAgbGVuZ3RoLFxuICAgICAgICAgIG9yaWVudCxcbiAgICAgICAgICBjb3VudCArIDEsXG4gICAgICAgICAgcmVjb3JkLFxuICAgICAgICAgIGNoZWNrTGVuZ3RoLFxuICAgICAgICAgIHN1cnZleVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKHN1cnZleSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGBTcGFjZSBhbHJlYWR5IHRha2VuYDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY2hlY2tTdW5rID0gKCkgPT4ge1xuICAgIGNvbnN0IHNoaXBLZXlzID0gT2JqZWN0LmtleXMoc2hpcFJlY29yZCk7XG4gICAgc2hpcEtleXMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgY29uc3QgY29vcmRPYmogPSBzaGlwUmVjb3JkW3NoaXBdO1xuICAgICAgY29uc3QgY29vcmRLZXlzID0gT2JqZWN0LmtleXMoY29vcmRPYmopO1xuICAgICAgY29uc3QgY2hlY2tTaGlwID0gZmluZEdyaWQoXG4gICAgICAgIGZ1bGxCb2FyZCxcbiAgICAgICAgTnVtYmVyKGNvb3JkS2V5c1swXVswXSksXG4gICAgICAgIE51bWJlcihjb29yZEtleXNbMF1bMl0pXG4gICAgICApO1xuICAgICAgY2hlY2tTaGlwLnNoaXAuY2FsU3VuaygpO1xuICAgICAgaWYgKGNoZWNrU2hpcC5zaGlwLmlzU3VuaygpID09PSB0cnVlKSB7XG4gICAgICAgIGlmICghT2JqZWN0LmtleXMoc3Vua1JlY29yZCkuaW5jbHVkZXMoc2hpcCkpIHtcbiAgICAgICAgICBzdW5rUmVjb3JkW3NoaXBdID0gc2hpcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKE9iamVjdC5rZXlzKHN1bmtSZWNvcmQpLmxlbmd0aCA9PT0gc2hpcEtleXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCwgeSk7XG4gICAgY29uc3QgY29vcmQgPSBbeCwgeV07XG4gICAgY29uc3QgYXR0YWNrU2hpcCA9IFtdO1xuXG4gICAgaWYgKHRhcmdldC5zaGlwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChoaXRSZWNvcmRbY29vcmRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaGl0UmVjb3JkW2Nvb3JkXSA9IGNvb3JkO1xuICAgICAgICBjb25zdCBmbGVldCA9IE9iamVjdC5rZXlzKHNoaXBSZWNvcmQpO1xuICAgICAgICBmbGVldC5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgICAgY29uc3QgY3VycmVudFNoaXAgPSBzaGlwUmVjb3JkW3NoaXBdO1xuICAgICAgICAgIGlmIChjdXJyZW50U2hpcFtjb29yZF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYXR0YWNrU2hpcC5wdXNoKHNoaXApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGFsbENvb3JkID0gc2hpcFJlY29yZFthdHRhY2tTaGlwWzBdXTtcbiAgICAgICAgY29uc3QgYWxsS2V5cyA9IE9iamVjdC5rZXlzKGFsbENvb3JkKTtcbiAgICAgICAgYWxsS2V5cy5mb3JFYWNoKChrZXlzKSA9PiB7XG4gICAgICAgICAgY29uc3QgcHJvcGVydHkgPSBhbGxDb29yZFtrZXlzXTtcbiAgICAgICAgICBjb25zdCBvbmVIaXQgPSBmaW5kR3JpZChmdWxsQm9hcmQsIHByb3BlcnR5WzBdLCBwcm9wZXJ0eVsxXSk7XG4gICAgICAgICAgb25lSGl0LnNoaXAuaGl0KCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChoaXRSZWNvcmRbY29vcmRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuICdTaGlwIGFscmVhZHkgaGl0JztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGFyZ2V0LnNoaXAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHRhcmdldC5taXNzID09PSBmYWxzZSkge1xuICAgICAgICBoaXRSZWNvcmRbY29vcmRdID0gY29vcmQ7XG4gICAgICAgIHRhcmdldC5taXNzID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAnSGl0dGluZyBhIG1pc3NlZCBzaG90IGFnYWluJztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZnVsbEJvYXJkID0gbWFrZUJvYXJkKCk7XG4gIGNvbnN0IHNoaXBSZWNvcmQgPSB7fTtcbiAgY29uc3QgaGl0UmVjb3JkID0ge307XG4gIGNvbnN0IHN1bmtSZWNvcmQgPSB7fTtcbiAgY29uc3QgZmxlZXQgPSB7XG4gICAgNTogJ0NhcnJpZXInLFxuICAgIDQ6ICdCYXR0bGVzaGlwJyxcbiAgICAzOiAnQ3J1c2llcicsXG4gICAgMjogJ0Rlc3Ryb3llcjEnLFxuICAgIDE6ICdTdWJtYXJpbmUxJyxcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGZ1bGxCb2FyZCxcbiAgICBwbGFjZVNoaXAsXG4gICAgZmluZEdyaWQsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBzaGlwUmVjb3JkLFxuICAgIGhpdFJlY29yZCxcbiAgICBjaGVja1N1bmssXG4gICAgc3Vua1JlY29yZCxcbiAgICBwbGFjZUJvdW5kYXJ5LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuIiwiLy8gTWFrZSBncmlkIGhvdmVyIGFjY29yZGluZyB0byBjdXJyZW50IHNoaXAgbGVuZ3RoXG5jb25zdCBob3ZlckdyaWQgPSAobGVuZ3RoLCBvcmllbnQpID0+IHtcbiAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc21hbGwtZ3JpZCcpO1xuXG4gIGNvbnN0IGdyaWRJbmRleCA9IChncmlkKSA9PiB7XG4gICAgY29uc3QgcmUgPSAvWzAtOV0rLztcbiAgICBjb25zdCBudW0gPSBncmlkLmNsYXNzTmFtZTtcbiAgICBjb25zdCBncmlkTnVtID0gcmUuZXhlYyhudW0uc2xpY2UobnVtLmxlbmd0aCAtIDIsIG51bS5sZW5ndGgpKVswXTtcbiAgICByZXR1cm4gZ3JpZE51bTtcbiAgfTtcblxuICBjb25zdCBkaXNwbGF5ID0gKCkgPT4ge1xuICAgIGlmIChvcmllbnQgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JpZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZ3JpZHNbaV0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgdkhvdmVyKTtcbiAgICAgICAgZ3JpZHNbaV0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHZMZWF2ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9yaWVudCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyaWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGdyaWRzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGhIb3Zlcik7XG4gICAgICAgIGdyaWRzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBoTGVhdmUpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCB3aXBlID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JpZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGdyaWRzW2ldLnN0eWxlLmJhY2tncm91bmQgPSAnbm9uZSc7XG4gICAgfVxuXG4gICAgaWYgKG9yaWVudCA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBncmlkc1tpXS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCB2SG92ZXIpO1xuICAgICAgICBncmlkc1tpXS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdkxlYXZlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9yaWVudCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyaWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGdyaWRzW2ldLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGhIb3Zlcik7XG4gICAgICAgIGdyaWRzW2ldLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBoTGVhdmUpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyBWZXJ0aWNhbFxuICBmdW5jdGlvbiB2SG92ZXIoYmFzZSwgY291bnQgPSAwKSB7XG4gICAgaWYgKGNvdW50ID09PSBsZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgbnVtID0gMDtcblxuICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgbnVtID0gTnVtYmVyKGdyaWRJbmRleCh0aGlzKSk7XG4gICAgfVxuXG4gICAgaWYgKGNvdW50ID4gMCkge1xuICAgICAgbnVtID0gTnVtYmVyKGdyaWRJbmRleChiYXNlKSkgLSAxMDtcbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuZ3JpZCR7bnVtfWApO1xuXG4gICAgaWYgKHRhcmdldCAhPT0gbnVsbCkge1xuICAgICAgdGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSAnY3lhbic7XG4gICAgICByZXR1cm4gdkhvdmVyKHRhcmdldCwgY291bnQgKyAxKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB2TGVhdmUoYmFzZSwgY291bnQgPSAwKSB7XG4gICAgaWYgKGNvdW50ID09PSBsZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgbnVtID0gMDtcblxuICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgbnVtID0gTnVtYmVyKGdyaWRJbmRleCh0aGlzKSk7XG4gICAgfVxuXG4gICAgaWYgKGNvdW50ID4gMCkge1xuICAgICAgbnVtID0gTnVtYmVyKGdyaWRJbmRleChiYXNlKSkgLSAxMDtcbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuZ3JpZCR7bnVtfWApO1xuXG4gICAgaWYgKHRhcmdldCAhPT0gbnVsbCkge1xuICAgICAgdGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSAnbm9uZSc7XG4gICAgICByZXR1cm4gdkxlYXZlKHRhcmdldCwgY291bnQgKyAxKTtcbiAgICB9XG4gIH1cblxuICAvLyBIb3Jpem9udGFsXG4gIGZ1bmN0aW9uIGhIb3ZlcihiYXNlLCBjb3VudCA9IDAsIGNoZWNrID0gW10pIHtcbiAgICBpZiAoY291bnQgPT09IGxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBudW0gPSAwO1xuXG4gICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICBudW0gPSBOdW1iZXIoZ3JpZEluZGV4KHRoaXMpKTtcbiAgICB9XG5cbiAgICBpZiAoY291bnQgPiAwKSB7XG4gICAgICBudW0gPSBOdW1iZXIoZ3JpZEluZGV4KGJhc2UpKSArIDE7XG4gICAgfVxuXG4gICAgY2hlY2sucHVzaChudW0pO1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmdyaWQke251bX1gKTtcblxuICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgdGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSAnY3lhbic7XG4gICAgICByZXR1cm4gaEhvdmVyKHRhcmdldCwgY291bnQgKyAxLCBjaGVjayk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgY291bnQgPiAwICYmXG4gICAgICB0YXJnZXQgIT09IG51bGwgJiZcbiAgICAgIE51bWJlcihTdHJpbmcoY2hlY2tbY2hlY2subGVuZ3RoIC0gMV0pLnNsaWNlKC0xKSkgPlxuICAgICAgICBOdW1iZXIoU3RyaW5nKGNoZWNrWzBdKS5zbGljZSgtMSkpXG4gICAgKSB7XG4gICAgICB0YXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9ICdjeWFuJztcbiAgICAgIHJldHVybiBoSG92ZXIodGFyZ2V0LCBjb3VudCArIDEsIGNoZWNrKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoTGVhdmUoYmFzZSwgY291bnQgPSAwLCBjaGVjayA9IFtdKSB7XG4gICAgaWYgKGNvdW50ID09PSBsZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgbnVtID0gMDtcblxuICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgbnVtID0gTnVtYmVyKGdyaWRJbmRleCh0aGlzKSk7XG4gICAgfVxuXG4gICAgaWYgKGNvdW50ID4gMCkge1xuICAgICAgbnVtID0gTnVtYmVyKGdyaWRJbmRleChiYXNlKSkgKyAxO1xuICAgIH1cblxuICAgIGNoZWNrLnB1c2gobnVtKTtcblxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5ncmlkJHtudW19YCk7XG5cbiAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgIHRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gJ25vbmUnO1xuICAgICAgcmV0dXJuIGhMZWF2ZSh0YXJnZXQsIGNvdW50ICsgMSwgY2hlY2spO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIGNvdW50ID4gMCAmJlxuICAgICAgdGFyZ2V0ICE9PSBudWxsICYmXG4gICAgICBOdW1iZXIoU3RyaW5nKGNoZWNrW2NoZWNrLmxlbmd0aCAtIDFdKS5zbGljZSgtMSkpID5cbiAgICAgICAgTnVtYmVyKFN0cmluZyhjaGVja1swXSkuc2xpY2UoLTEpKVxuICAgICkge1xuICAgICAgdGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSAnbm9uZSc7XG4gICAgICByZXR1cm4gaExlYXZlKHRhcmdldCwgY291bnQgKyAxLCBjaGVjayk7XG4gICAgfVxuICB9XG4gIHJldHVybiB7IGRpc3BsYXksIHdpcGUgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGhvdmVyR3JpZDtcbiIsImNvbnN0IFBsYXllciA9IChlbmVteUJvYXJkLCBjb21wdXRlclBsYXllciwgb3duQm9hcmQpID0+IHtcbiAgLy8gQWRkIGh1bWFuIG9uXG4gIC8vIEh1bWFuIG9ubHkgZm9yIHRlc3RpbmcsIHJlbW92ZSBhZnRlclxuICBsZXQgYWkgPSBmYWxzZTtcblxuICBjb25zdCBjb21wdXRlck9uID0gKCkgPT4ge1xuICAgIGFpID0gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBjb21wdXRlciA9ICgpID0+IGFpO1xuXG4gIGNvbnN0IGF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIGlmIChjb21wdXRlclBsYXllciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoY29tcHV0ZXJQbGF5ZXIuY29tcHV0ZXIoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAvLyBhdXRvTW92ZSgpO1xuICAgICAgICBodW1hbkF1dG9Nb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldFJhbmRvbUludCA9IChtaW4sIG1heCkgPT4ge1xuICAgIG1pbiA9IE1hdGguY2VpbChtaW4pO1xuICAgIG1heCA9IE1hdGguZmxvb3IobWF4KTtcblxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xuICB9O1xuXG4gIC8vIEFkZCBhdXRvTW92ZSBpZiBodW1hbiBvbiwgdGFyZ2V0IGNvb3JkIGluIHNoaXAgcmVjb3JkXG4gIC8vIEh1bWFuIGF1dG9Nb3ZlIG9ubHkgZm9yIHRlc3RpbmcsIHJlbW92ZSBhZnRlclxuICBjb25zdCBodW1hbkF1dG9Nb3ZlID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvb3JkcyA9IFtdO1xuICAgIGNvbnN0IHNoaXBLZXlzID0gT2JqZWN0LmtleXMob3duQm9hcmQuc2hpcFJlY29yZCk7XG4gICAgY29uc3QgaGl0S2V5cyA9IE9iamVjdC5rZXlzKG93bkJvYXJkLmhpdFJlY29yZCk7XG4gICAgc2hpcEtleXMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgY29uc3QgY29vcmRPYmogPSBvd25Cb2FyZC5zaGlwUmVjb3JkW3NoaXBdO1xuICAgICAgY29uc3QgY29vcmRLZXlzID0gT2JqZWN0LmtleXMoY29vcmRPYmopO1xuICAgICAgY29vcmRLZXlzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICAgIGNvb3Jkcy5wdXNoKGNvb3JkKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgb3duQm9hcmQucmVjZWl2ZUF0dGFjayhcbiAgICAgIE51bWJlcihjb29yZHNbaGl0S2V5cy5sZW5ndGhdWzBdKSxcbiAgICAgIE51bWJlcihjb29yZHNbaGl0S2V5cy5sZW5ndGhdWzJdKVxuICAgICk7XG4gICAgLy8gY29uc29sZS5sb2coY29vcmRzLCBjb29yZHNbMF1bMF0sIGNvb3Jkc1swXVsyXSwgb3duQm9hcmQuaGl0UmVjb3JkKTtcbiAgfTtcblxuICBjb25zdCBhdXRvTW92ZSA9ICgpID0+IHtcbiAgICBjb25zdCB4ID0gZ2V0UmFuZG9tSW50KDAsIDkpO1xuICAgIGNvbnN0IHkgPSBnZXRSYW5kb21JbnQoMCwgOSk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IG93bkJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG5cbiAgICBpZiAocmVzcG9uc2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGF1dG9Nb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IGF0dGFjaywgY29tcHV0ZXJPbiwgY29tcHV0ZXIsIGdldFJhbmRvbUludCB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiaW1wb3J0IGhvdmVyR3JpZCBmcm9tICcuL2hvdmVyJztcbmltcG9ydCB7IGhpZ2hMaWdodEdyaWQgfSBmcm9tICcuL2Rpc3BsYXktc2hpcHMnO1xuaW1wb3J0IHsgY29udmVydE51bSB9IGZyb20gJy4vY29udmVydCc7XG5cbmNvbnN0IGdyaWRJbmRleCA9IChncmlkKSA9PiB7XG4gIGNvbnN0IHJlID0gL1swLTldKy87XG4gIGNvbnN0IG51bSA9IGdyaWQuY2xhc3NOYW1lO1xuICBjb25zdCBncmlkTnVtID0gcmUuZXhlYyhudW0uc2xpY2UobnVtLmxlbmd0aCAtIDIsIG51bS5sZW5ndGgpKVswXTtcbiAgcmV0dXJuIGdyaWROdW07XG59O1xuXG5jb25zdCBzZXRQbGF5ZXJTaGlwID0gKGJvYXJkKSA9PiB7XG4gIGNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNtYWxsLWdyaWQnKTtcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNtYWxsLXJvdGF0ZScpO1xuXG4gIGNvbnN0IGNvbnZlcnRMZW5ndGggPSB7fTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICBpZiAoaSA+PSAwICYmIGkgPCAzKSB7XG4gICAgICBjb252ZXJ0TGVuZ3RoW2ldID0gNSAtIGk7XG4gICAgfSBlbHNlIGlmIChpID09PSAzIHx8IGkgPT09IDQpIHtcbiAgICAgIGNvbnZlcnRMZW5ndGhbaV0gPSAyO1xuICAgIH0gZWxzZSBpZiAoaSA9PT0gNSB8fCBpID09PSA2KSB7XG4gICAgICBjb252ZXJ0TGVuZ3RoW2ldID0gMTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGdyaWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgZ3JpZHNbaV0uY2xhc3NMaXN0LmFkZChgZ3JpZCR7aX1gKTtcbiAgfVxuXG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IHtcbiAgICBjb25zdCByZWNvcmRMZW5ndGggPSBPYmplY3Qua2V5cyhib2FyZC5zaGlwUmVjb3JkKS5sZW5ndGg7XG4gICAgY29uc3QgbGVuZ3RoID0gY29udmVydExlbmd0aFtyZWNvcmRMZW5ndGhdO1xuICAgIHJldHVybiBsZW5ndGg7XG4gIH07XG5cbiAgbGV0IG9yaWVudCA9ICd2ZXJ0aWNhbCc7XG5cbiAgY29uc3Qgcm90YXRlID0gKCkgPT4ge1xuICAgIGlmIChvcmllbnQgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIG9yaWVudCA9ICdob3Jpem9udGFsJztcbiAgICB9IGVsc2UgaWYgKG9yaWVudCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICBvcmllbnQgPSAndmVydGljYWwnO1xuICAgIH1cblxuICAgIGNvbnN0IHByb21pc2UxID0gUHJvbWlzZS5yZXNvbHZlKHdpcGVIb3ZlcigpKTtcblxuICAgIHByb21pc2UxLnRoZW4oKCkgPT4ge1xuICAgICAgZ2V0SG92ZXIoKTtcbiAgICB9KTtcbiAgfTtcblxuICBsZXQgaG92ZXIgPSBob3ZlckdyaWQoKTtcblxuICBjb25zdCBnZXRIb3ZlciA9ICgpID0+IHtcbiAgICBob3ZlciA9IGhvdmVyR3JpZChnZXRMZW5ndGgoKSwgb3JpZW50KTtcbiAgICBob3Zlci5kaXNwbGF5KCk7XG4gIH07XG5cbiAgY29uc3Qgd2lwZUhvdmVyID0gKCkgPT4ge1xuICAgIGhvdmVyLndpcGUoKTtcbiAgICBoaWdoTGlnaHRHcmlkKGJvYXJkLnNoaXBSZWNvcmQpO1xuICB9O1xuXG4gIGNvbnN0IGNsaWNrR3JpZHMgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkcy5sZW5ndGg7IGkrKykge1xuICAgICAgZ3JpZHNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlbW92ZUNsaWNrcyA9ICgpID0+IHtcbiAgICAvLyBTdGFydCBHYW1lXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkcy5sZW5ndGg7IGkrKykge1xuICAgICAgZ3JpZHNbaV0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZSk7XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIHBsYWNlKCkge1xuICAgIGNvbnN0IGluZGV4ID0gZ3JpZEluZGV4KHRoaXMpO1xuICAgIGNvbnN0IHRhYmxlID0gY29udmVydE51bSgpO1xuXG4gICAgY29uc3QgcHJvbWlzZTEgPSBQcm9taXNlLnJlc29sdmUoXG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYm9hcmQucGxhY2VTaGlwKHRhYmxlW2luZGV4XVswXSwgdGFibGVbaW5kZXhdWzFdLCBnZXRMZW5ndGgoKSwgb3JpZW50KVxuICAgICAgKVxuICAgICk7XG4gICAgcHJvbWlzZTFcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgd2lwZUhvdmVyKCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBpZiAoZ2V0TGVuZ3RoKCkgPCA3KSB7XG4gICAgICAgICAgZ2V0SG92ZXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZW1vdmVDbGlja3MoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhib2FyZC5zaGlwUmVjb3JkKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xpY2tTdGFydCgpIHtcbiAgICB0aGlzLnRleHRDb250ZW50ID0gJ1JvdGF0ZSc7XG4gICAgZ2V0SG92ZXIoKTtcbiAgICBjbGlja0dyaWRzKCk7XG4gICAgYnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tTdGFydCk7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcm90YXRlKTtcbiAgfVxuXG4gIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrU3RhcnQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgc2V0UGxheWVyU2hpcDtcbiIsImNvbnN0IFNoaXAgPSAobGVuZ3RoLCBvcmllbnQpID0+IHtcbiAgbGV0IHN1bmsgPSBmYWxzZTtcbiAgbGV0IHRvdGFsSGl0cyA9IDA7XG5cbiAgY29uc3QgaGl0ID0gKCkgPT4ge1xuICAgIHRvdGFsSGl0cyArPSAxO1xuICB9O1xuXG4gIGNvbnN0IGNhbFN1bmsgPSAoKSA9PiB7XG4gICAgaWYgKGxlbmd0aCA9PT0gdG90YWxIaXRzKSB7XG4gICAgICBzdW5rID0gdHJ1ZTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGl0cyA9ICgpID0+IHRvdGFsSGl0cztcbiAgY29uc3QgaXNTdW5rID0gKCkgPT4gc3VuaztcblxuICByZXR1cm4geyBsZW5ndGgsIGhpdCwgY2FsU3VuaywgaGl0cywgaXNTdW5rLCBvcmllbnQgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcXG59XFxuXFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMzAsIDMwLCAzMCk7XFxufVxcblxcbi5jb250YWluZXIge1xcbiAgYm9yZGVyOiAxcHggc29pbGQgcmVkO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMWZyIDEwZnIgMWZyO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuLnRpdGxlLWRpdiB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBncmVlbnllbGxvdztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBncmlkLXJvdzogMSAvIDI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBjb2xvcjogZ3JheTtcXG4gIGZvbnQtc2l6ZTogMi41cmVtO1xcbn1cXG5cXG4uYm9hcmQtZGl2IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDVmciAxZnIgMWZyIDFmciA1ZnI7XFxuICB3aWR0aDogMTAwdnc7XFxuICAvKiBoZWlnaHQ6IGZpdC1jb250ZW50OyAqL1xcbiAgZ3JpZC1yb3c6IDIgLyAzO1xcbiAgY29sb3I6IHdoaXRlc21va2U7XFxufVxcblxcbi5zbWFsbC1jb250YWluZXIge1xcbiAgYm9yZGVyOiAycHggc29saWQgdG9tYXRvO1xcbiAgaGVpZ2h0OiBmaXQtY29udGVudDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ3JpZC1jb2x1bW46IDIgLyAzO1xcbn1cXG5cXG4uc21hbGwtYm9hcmQge1xcbiAgYm9yZGVyOiAycHggc29saWQgb3JhbmdlO1xcbiAgd2lkdGg6IDI1cmVtO1xcbiAgaGVpZ2h0OiAyNXJlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpO1xcblxcbn1cXG5cXG4uc21hbGwtbnVtLFxcbi5zbWFsbC1hcGwge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnNtYWxsLWdyaWQge1xcbiAgYm9yZGVyOiAycHggc29saWQgZ3JheTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufSBcXG5cXG4vKiAuc21hbGwtZ3JpZFtzdHlsZT1cXFwiYm9yZGVyOiAycHggc29saWQgY3lhbjtcXFwiXSB7XFxuICBjdXJzb3I6cG9pbnRlclxcbn0gKi9cXG5cXG4uc21hbGwtcm90YXRlIHtcXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG59XFxuXFxuLnNtYWxsLW5hbWUsXFxuLnNtYWxsLXdpbiB7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxufVxcblxcbi5iaWctY29udGFpbmVyIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHRvbWF0bztcXG4gIGhlaWdodDogZml0LWNvbnRlbnQ7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdyaWQtY29sdW1uOiA0IC8gNTtcXG59XFxuXFxuLmJpZy1ib2FyZCB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBvcmFuZ2U7XFxuICB3aWR0aDogMzByZW07XFxuICBoZWlnaHQ6IDMwcmVtO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDExLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTEsIDFmcik7XFxufVxcblxcbi5iaWctbnVtLFxcbi5iaWctYWxwIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDEuMjVyZW07XFxufVxcblxcbi5iaWctZ3JpZCB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBncmF5O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGN1cnNvcjpwb2ludGVyXFxufSBcXG5cXG4uYmlnLW5hbWUge1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbn1cXG5cXG4ubWVzc2FnZSB7XFxuICBjb2xvcjogd2hpdGVzbW9rZTtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zbWFsbC13aW4sXFxuLmJpZy13aW4ge1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsVUFBVTtFQUNWLFNBQVM7RUFDVCxzQkFBc0I7RUFDdEIsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsaUNBQWlDO0FBQ25DOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLGFBQWE7RUFDYixnQ0FBZ0M7RUFDaEMsYUFBYTtBQUNmOztBQUVBO0VBQ0UsNkJBQTZCO0VBQzdCLGFBQWE7RUFDYixlQUFlO0VBQ2YsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsYUFBYTtFQUNiLDBDQUEwQztFQUMxQyxZQUFZO0VBQ1oseUJBQXlCO0VBQ3pCLGVBQWU7RUFDZixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSx3QkFBd0I7RUFDeEIsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usd0JBQXdCO0VBQ3hCLFlBQVk7RUFDWixhQUFhO0VBQ2IsYUFBYTtFQUNiLHNDQUFzQztFQUN0QyxtQ0FBbUM7O0FBRXJDOztBQUVBOztFQUVFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBOztHQUVHOztBQUVIO0VBQ0Usa0JBQWtCO0VBQ2xCLGtCQUFrQjtBQUNwQjs7QUFFQTs7RUFFRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSx3QkFBd0I7RUFDeEIsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usd0JBQXdCO0VBQ3hCLFlBQVk7RUFDWixhQUFhO0VBQ2IsYUFBYTtFQUNiLHNDQUFzQztFQUN0QyxtQ0FBbUM7QUFDckM7O0FBRUE7O0VBRUUsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsZUFBZTtFQUNmLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBOztFQUVFLGtCQUFrQjtBQUNwQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XFxufVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDMwLCAzMCwgMzApO1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gIGJvcmRlcjogMXB4IHNvaWxkIHJlZDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciAxMGZyIDFmcjtcXG4gIGhlaWdodDogMTAwdmg7XFxufVxcblxcbi50aXRsZS1kaXYge1xcbiAgYm9yZGVyOiAycHggc29saWQgZ3JlZW55ZWxsb3c7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ3JpZC1yb3c6IDEgLyAyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgY29sb3I6IGdyYXk7XFxuICBmb250LXNpemU6IDIuNXJlbTtcXG59XFxuXFxuLmJvYXJkLWRpdiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA1ZnIgMWZyIDFmciAxZnIgNWZyO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgLyogaGVpZ2h0OiBmaXQtY29udGVudDsgKi9cXG4gIGdyaWQtcm93OiAyIC8gMztcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbn1cXG5cXG4uc21hbGwtY29udGFpbmVyIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHRvbWF0bztcXG4gIGhlaWdodDogZml0LWNvbnRlbnQ7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdyaWQtY29sdW1uOiAyIC8gMztcXG59XFxuXFxuLnNtYWxsLWJvYXJkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIG9yYW5nZTtcXG4gIHdpZHRoOiAyNXJlbTtcXG4gIGhlaWdodDogMjVyZW07XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMSwgMWZyKTtcXG5cXG59XFxuXFxuLnNtYWxsLW51bSxcXG4uc21hbGwtYXBsIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zbWFsbC1ncmlkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGdyYXk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn0gXFxuXFxuLyogLnNtYWxsLWdyaWRbc3R5bGU9XFxcImJvcmRlcjogMnB4IHNvbGlkIGN5YW47XFxcIl0ge1xcbiAgY3Vyc29yOnBvaW50ZXJcXG59ICovXFxuXFxuLnNtYWxsLXJvdGF0ZSB7XFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxufVxcblxcbi5zbWFsbC1uYW1lLFxcbi5zbWFsbC13aW4ge1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbn1cXG5cXG4uYmlnLWNvbnRhaW5lciB7XFxuICBib3JkZXI6IDJweCBzb2xpZCB0b21hdG87XFxuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBncmlkLWNvbHVtbjogNCAvIDU7XFxufVxcblxcbi5iaWctYm9hcmQge1xcbiAgYm9yZGVyOiAycHggc29saWQgb3JhbmdlO1xcbiAgd2lkdGg6IDMwcmVtO1xcbiAgaGVpZ2h0OiAzMHJlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpO1xcbn1cXG5cXG4uYmlnLW51bSxcXG4uYmlnLWFscCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xcbn1cXG5cXG4uYmlnLWdyaWQge1xcbiAgYm9yZGVyOiAycHggc29saWQgZ3JheTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBjdXJzb3I6cG9pbnRlclxcbn0gXFxuXFxuLmJpZy1uYW1lIHtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG59XFxuXFxuLm1lc3NhZ2Uge1xcbiAgY29sb3I6IHdoaXRlc21va2U7XFxuICBmb250LXNpemU6IDFyZW07XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uc21hbGwtd2luLFxcbi5iaWctd2luIHtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHsgaGlnaExpZ2h0R3JpZCwgaGlnaEJpZyB9IGZyb20gJy4vZGlzcGxheS1zaGlwcyc7XG5pbXBvcnQgY3JlYXRlQ2xpY2sgZnJvbSAnLi9jbGljay1ib2FyZCc7XG5pbXBvcnQgeyBjb252ZXJ0TnVtLCBjb252ZXJ0Q29vcmQgfSBmcm9tICcuL2NvbnZlcnQnO1xuaW1wb3J0IGhvdmVyR3JpZCBmcm9tICcuL2hvdmVyJztcbmltcG9ydCBzZXRQbGF5ZXJTaGlwIGZyb20gJy4vc2V0LXNoaXAnO1xuXG5jb25zdCBwbGF5ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xuY29uc3QgY29tcHV0ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xuY29uc3QgY29tcHV0ZXJQbGF5ZXIgPSBQbGF5ZXIocGxheWVyQm9hcmQpO1xuY29tcHV0ZXJQbGF5ZXIuY29tcHV0ZXJPbigpO1xuY29uc3QgaHVtYW5QbGF5ZXIgPSBQbGF5ZXIoY29tcHV0ZXJCb2FyZCwgY29tcHV0ZXJQbGF5ZXIsIHBsYXllckJvYXJkKTtcblxuLy8gcGxheWVyQm9hcmQucGxhY2VTaGlwKDQsIDEsIDUsICd2ZXJ0aWNhbCcpO1xuLy8gcGxheWVyQm9hcmQucGxhY2VTaGlwKDYsIDQsIDMsICdob3Jpem9udGFsJyk7XG4vLyBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoMSwgNywgMiwgJ3ZlcnRpY2FsJyk7XG4vLyBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoNCwgNCwgMiwgJ2hvcml6b250YWwnKTtcbi8vIHBsYXllckJvYXJkLnBsYWNlU2hpcCg5LCA5LCAxLCAndmVydGljYWwnKTtcbi8vIHBsYXllckJvYXJkLnBsYWNlU2hpcCg3LCA4LCAxLCAndmVydGljYWwnKTtcbi8vIHBsYXllckJvYXJkLnBsYWNlU2hpcCg5LCA1LCAzLCAnaG9yaXpvbnRhbCcpO1xuXG4vLyBoaWdoTGlnaHRHcmlkKHBsYXllckJvYXJkLnNoaXBSZWNvcmQpO1xuXG4vLyBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCgxLCAxLCA1LCAndmVydGljYWwnKTtcbi8vIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDMsIDMsIDQsICd2ZXJ0aWNhbCcpO1xuLy8gY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoOCwgMywgMywgJ2hvcml6b250YWwnKTtcbi8vIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDEsIDUsIDIsICd2ZXJ0aWNhbCcpO1xuLy8gY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoNCwgNiwgMiwgJ3ZlcnRpY2FsJyk7XG4vLyBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCgzLCA5LCAxLCAndmVydGljYWwnKTtcbi8vIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDcsIDAsIDEsICd2ZXJ0aWNhbCcpO1xuXG4vLyBoaWdoQmlnKGNvbXB1dGVyQm9hcmQuc2hpcFJlY29yZCk7XG5cbmNyZWF0ZUNsaWNrKGh1bWFuUGxheWVyLCBjb21wdXRlckJvYXJkLCBwbGF5ZXJCb2FyZCk7XG5cbi8vIGhvdmVyR3JpZCg1LCAndmVydGljYWwnKTtcbi8vIGhvdmVyR3JpZCg1LCAnaG9yaXpvbnRhbCcpO1xuXG5zZXRQbGF5ZXJTaGlwKHBsYXllckJvYXJkKTtcbiJdLCJuYW1lcyI6WyJjb252ZXJ0TnVtIiwiZGlzcGxheUhpdCIsImFsbEdyaWRzIiwiZ3JpZHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJncmlkSW5kZXgiLCJncmlkIiwicmUiLCJudW0iLCJjbGFzc05hbWUiLCJncmlkTnVtIiwiZXhlYyIsInNsaWNlIiwibGVuZ3RoIiwiY29vcmQiLCJjcmVhdGVDbGljayIsInBsYXllciIsImNvbXB1dGVyQm9hcmQiLCJwbGF5ZXJCb2FyZCIsInNtYWxsV2luIiwicXVlcnlTZWxlY3RvciIsImJpZ1dpbiIsImNsaWNrU3R5bGUiLCJ0YXJnZXQiLCJhdHRhY2siLCJyZXN1bHQiLCJmaW5kR3JpZCIsImZ1bGxCb2FyZCIsIm1pc3MiLCJ0ZXh0Q29udGVudCIsInN0eWxlIiwiZm9udFNpemUiLCJjb2xvciIsInNoaXAiLCJ1bmRlZmluZWQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY29tcHV0ZXJTdW5rIiwiY2hlY2tTdW5rIiwicGxheWVyU3VuayIsImZvckVhY2giLCJjb25zb2xlIiwibG9nIiwiaSIsImNsYXNzTGlzdCIsImFkZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb252ZXJ0Q29vcmQiLCJhcmd1bWVudHMiLCJ4IiwieSIsInRhYmxlIiwiaGlnaExpZ2h0R3JpZCIsInNoaXBzIiwidGFyZ2V0cyIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJjb29yZHMiLCJwdXNoIiwiaW5kZXgiLCJib3JkZXIiLCJoaWdoQmlnIiwiYm9hcmQiLCJoaXRSZWNvcmQiLCJTaGlwIiwiR3JpZCIsInVwIiwicmlnaHQiLCJib3VuZGFyeSIsIkdhbWVib2FyZCIsIm1ha2VCb2FyZCIsInAiLCJxIiwic3VydmV5R3JpZCIsIm9yaWVudCIsImNvdW50IiwicGxhY2VCb3VuZGFyeSIsImxpc3QiLCJwbGFjZVNoaXAiLCJyZWNvcmQiLCJjaGVja0xlbmd0aCIsInN1cnZleSIsInNoaXBOYW1lIiwiZmxlZXQiLCJzaGlwUmVjb3JkIiwicmVjb3JkS2V5Iiwic2hpcEtleXMiLCJjb29yZE9iaiIsImNvb3JkS2V5cyIsImNoZWNrU2hpcCIsIk51bWJlciIsImNhbFN1bmsiLCJpc1N1bmsiLCJzdW5rUmVjb3JkIiwiaW5jbHVkZXMiLCJyZWNlaXZlQXR0YWNrIiwiYXR0YWNrU2hpcCIsImN1cnJlbnRTaGlwIiwiYWxsQ29vcmQiLCJhbGxLZXlzIiwicHJvcGVydHkiLCJvbmVIaXQiLCJoaXQiLCJob3ZlckdyaWQiLCJkaXNwbGF5IiwidkhvdmVyIiwidkxlYXZlIiwiaEhvdmVyIiwiaExlYXZlIiwid2lwZSIsImJhY2tncm91bmQiLCJiYXNlIiwiY2hlY2siLCJTdHJpbmciLCJQbGF5ZXIiLCJlbmVteUJvYXJkIiwiY29tcHV0ZXJQbGF5ZXIiLCJvd25Cb2FyZCIsImFpIiwiY29tcHV0ZXJPbiIsImNvbXB1dGVyIiwiaHVtYW5BdXRvTW92ZSIsImdldFJhbmRvbUludCIsIm1pbiIsIm1heCIsIk1hdGgiLCJjZWlsIiwiZmxvb3IiLCJyYW5kb20iLCJoaXRLZXlzIiwiYXV0b01vdmUiLCJyZXNwb25zZSIsInNldFBsYXllclNoaXAiLCJidXR0b24iLCJjb252ZXJ0TGVuZ3RoIiwiZ2V0TGVuZ3RoIiwicmVjb3JkTGVuZ3RoIiwicm90YXRlIiwicHJvbWlzZTEiLCJQcm9taXNlIiwicmVzb2x2ZSIsIndpcGVIb3ZlciIsInRoZW4iLCJnZXRIb3ZlciIsImhvdmVyIiwiY2xpY2tHcmlkcyIsInBsYWNlIiwicmVtb3ZlQ2xpY2tzIiwiY2xpY2tTdGFydCIsInN1bmsiLCJ0b3RhbEhpdHMiLCJoaXRzIiwiaHVtYW5QbGF5ZXIiXSwic291cmNlUm9vdCI6IiJ9