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


const grids = document.querySelectorAll('.big-grid');
const gridIndex = grid => {
  const re = /[0-9]+/;
  const num = grid.className;
  const gridNum = re.exec(num.slice(num.length - 2, num.length))[0];
  const coord = (0,_convert__WEBPACK_IMPORTED_MODULE_0__.convertNum)();
  return coord[gridNum];
};
const createClick = (player, computerBoard, playerBoard) => {
  const bigWin = document.querySelector('.big-win');
  function clickStyle(element) {
    const target = gridIndex(element);
    player.attack(target[0], target[1]);
    const result = computerBoard.findGrid(computerBoard.fullBoard, target[0], target[1]);
    if (result.miss === true) {
      element.textContent = '/';
      element.style.fontSize = '2rem';
      element.style.color = 'whitesmoke';
    }
    if (result.ship !== undefined) {
      element.textContent = 'X';
      element.style.fontSize = '2rem';
      element.style.color = 'red';
    }
    element.removeEventListener('click', clickStyle);
    const computerSunk = computerBoard.checkSunk();
    if (computerSunk === false) {
      (0,_display_ships__WEBPACK_IMPORTED_MODULE_1__.displayHit)(playerBoard);
      const playerSunk = playerBoard.checkSunk();
      if (playerSunk === true) {
        grids.forEach(grid => {
          // grid.removeEventListener('click', clickStyle);
          grid.onclick = null;
        });
        console.log('Computer win');
        bigWin.textContent = 'Opponent Win';
      }
    }
    if (computerSunk === true) {
      grids.forEach(grid => {
        // grid.removeEventListener('click', clickStyle);
        grid.onclick = null;
      });
      console.log('Human win');
      bigWin.textContent = 'Player win';
    }
  }
  for (let i = 0; i < grids.length; i++) {
    grids[i].classList.add(`grid${i}`);
    grids[i].style.cursor = 'pointer';
    // grids[i].addEventListener('click', active);
    grids[i].onclick = function active() {
      console.log(this);
      clickStyle(this);
    };
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
  let fullBoard = makeBoard();
  let shipRecord = {};
  let hitRecord = {};
  let sunkRecord = {};
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
    placeBoundary,
    makeBoard
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

/***/ "./src/set-computer-ship.js":
/*!**********************************!*\
  !*** ./src/set-computer-ship.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _display_ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display-ships */ "./src/display-ships.js");

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const setComputerShip = board => {
  const x = getRandomInt(0, 9);
  const y = getRandomInt(0, 9);
  const z = getRandomInt(0, 1);
  let orient;
  if (z === 0) {
    orient = 'vertical';
  } else if (z === 1) {
    orient = 'horizontal';
  }
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
  const getLength = () => {
    const recordLength = Object.keys(board.shipRecord).length;
    const length = convertLength[recordLength];
    return length;
  };
  board.placeShip(x, y, getLength(), orient);
  if (Object.keys(board.shipRecord).length < 7) {
    return setComputerShip(board);
  }
  (0,_display_ships__WEBPACK_IMPORTED_MODULE_0__.highBig)(board.shipRecord);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setComputerShip);

/***/ }),

/***/ "./src/set-player-ship.js":
/*!********************************!*\
  !*** ./src/set-player-ship.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _hover__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hover */ "./src/hover.js");
/* harmony import */ var _display_ships__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display-ships */ "./src/display-ships.js");
/* harmony import */ var _convert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./convert */ "./src/convert.js");
/* harmony import */ var _click_board__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./click-board */ "./src/click-board.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _set_computer_ship__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./set-computer-ship */ "./src/set-computer-ship.js");







const setGame = () => {
  const playerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_4__["default"])();
  const computerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_4__["default"])();
  const computerPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_5__["default"])(playerBoard);
  computerPlayer.computerOn();
  const humanPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_5__["default"])(computerBoard, computerPlayer, playerBoard);
  setPlayerShip(playerBoard, humanPlayer, computerBoard);
  (0,_set_computer_ship__WEBPACK_IMPORTED_MODULE_6__["default"])(computerBoard);
};
const restart = () => {
  const button = document.querySelector('.small-rotate');
  const smallGrids = document.querySelectorAll('.small-grid');
  const bigGrids = document.querySelectorAll('.big-grid');
  const clearAll = () => {
    button.removeEventListener('click', clearAll);
    button.textContent = 'Start';
    console.dir((0,_click_board__WEBPACK_IMPORTED_MODULE_3__["default"])().clickStyle);
    for (let i = 0; i < smallGrids.length; i++) {
      smallGrids[i].style.border = '2px solid gray';
      smallGrids[i].textContent = '';
      bigGrids[i].style.border = '2px solid gray';
      bigGrids[i].textContent = '';
      bigGrids[i].style.cursor = 'default';
      // bigGrids[i].removeEventListener('click', createClick().clickStyle);
      bigGrids[i].onclick = null;
    }
    setGame();
  };
  button.textContent = 'Restart';
  button.addEventListener('click', clearAll);
};
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
        // Reset Game
        button.removeEventListener('click', rotate);
        restart();
      }
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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _set_player_ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./set-player-ship */ "./src/set-player-ship.js");
/* harmony import */ var _set_computer_ship__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./set-computer-ship */ "./src/set-computer-ship.js");




const setGame = () => {
  const playerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const computerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const computerPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_1__["default"])(playerBoard);
  computerPlayer.computerOn();
  const humanPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_1__["default"])(computerBoard, computerPlayer, playerBoard);
  (0,_set_player_ship__WEBPACK_IMPORTED_MODULE_2__["default"])(playerBoard, humanPlayer, computerBoard);
  (0,_set_computer_ship__WEBPACK_IMPORTED_MODULE_3__["default"])(computerBoard);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setGame);

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
/* harmony import */ var _click_board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./click-board */ "./src/click-board.js");
/* harmony import */ var _set_player_ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./set-player-ship */ "./src/set-player-ship.js");
/* harmony import */ var _set_computer_ship__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./set-computer-ship */ "./src/set-computer-ship.js");
/* harmony import */ var _setup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./setup */ "./src/setup.js");

// import Gameboard from './gameboard';
// import Player from './player';
// import { highLightGrid, highBig } from './display-ships';

// import { convertNum, convertCoord } from './convert';
// import hoverGrid from './hover';



(0,_setup__WEBPACK_IMPORTED_MODULE_4__["default"])();
// console.log(createClick().clickStyle.remove);

// const button = document.querySelector('.small-rotate');
// button.addEventListener('click', game);

// setPlayerShip(game.playerBoard, game.humanPlayer, game.computerBoard);

// setComputerShip(game.computerBoard);

// console.log(game.computerBoard.shipRecord);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQUksQ0FBQ25CLElBQUksQ0FBQ25DLFFBQVEsQ0FBQ0MsU0FBUyxFQUFFdUIsQ0FBQyxHQUFHLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUM7SUFDMUM7SUFDQSxJQUFJQSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtNQUNiNkIsSUFBSSxDQUFDbkIsSUFBSSxDQUFDbkMsUUFBUSxDQUFDQyxTQUFTLEVBQUV1QixDQUFDLEVBQUVDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMxQztJQUNBLElBQUlBLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFO01BQ2Q2QixJQUFJLENBQUNuQixJQUFJLENBQUNuQyxRQUFRLENBQUNDLFNBQVMsRUFBRXVCLENBQUMsRUFBRUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzFDO0lBRUEsSUFBSUQsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUlDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO01BQzNCNkIsSUFBSSxDQUFDbkIsSUFBSSxDQUFDbkMsUUFBUSxDQUFDQyxTQUFTLEVBQUV1QixDQUFDLEdBQUcsQ0FBQyxFQUFFQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDOUM7SUFDQSxJQUFJRCxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUU7TUFDNUI2QixJQUFJLENBQUNuQixJQUFJLENBQUNuQyxRQUFRLENBQUNDLFNBQVMsRUFBRXVCLENBQUMsR0FBRyxDQUFDLEVBQUVDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM5QztJQUNBLElBQUlELENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtNQUMxQjZCLElBQUksQ0FBQ25CLElBQUksQ0FBQ25DLFFBQVEsQ0FBQ0MsU0FBUyxFQUFFdUIsQ0FBQyxHQUFHLENBQUMsRUFBRUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzlD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QUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7Ozs7Ozs7O0FDQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUN3QztBQUN4QztBQUNBO0FBQzhDO0FBQ0k7QUFDcEI7QUFFOUIwRSxrREFBTyxFQUFFO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsOEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvY2xpY2stYm9hcmQuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL2NvbnZlcnQuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL2Rpc3BsYXktc2hpcHMuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvaG92ZXIuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvc2V0LWNvbXB1dGVyLXNoaXAuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL3NldC1wbGF5ZXItc2hpcC5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvc2V0dXAuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL25wbS1zZXR1cC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb252ZXJ0TnVtIH0gZnJvbSAnLi9jb252ZXJ0JztcbmltcG9ydCB7IGRpc3BsYXlIaXQgfSBmcm9tICcuL2Rpc3BsYXktc2hpcHMnO1xuXG5jb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iaWctZ3JpZCcpO1xuXG5jb25zdCBncmlkSW5kZXggPSAoZ3JpZCkgPT4ge1xuICBjb25zdCByZSA9IC9bMC05XSsvO1xuICBjb25zdCBudW0gPSBncmlkLmNsYXNzTmFtZTtcbiAgY29uc3QgZ3JpZE51bSA9IHJlLmV4ZWMobnVtLnNsaWNlKG51bS5sZW5ndGggLSAyLCBudW0ubGVuZ3RoKSlbMF07XG4gIGNvbnN0IGNvb3JkID0gY29udmVydE51bSgpO1xuICByZXR1cm4gY29vcmRbZ3JpZE51bV07XG59O1xuXG5jb25zdCBjcmVhdGVDbGljayA9IChwbGF5ZXIsIGNvbXB1dGVyQm9hcmQsIHBsYXllckJvYXJkKSA9PiB7XG4gIGNvbnN0IGJpZ1dpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iaWctd2luJyk7XG5cbiAgZnVuY3Rpb24gY2xpY2tTdHlsZShlbGVtZW50KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZ3JpZEluZGV4KGVsZW1lbnQpO1xuICAgIHBsYXllci5hdHRhY2sodGFyZ2V0WzBdLCB0YXJnZXRbMV0pO1xuICAgIGNvbnN0IHJlc3VsdCA9IGNvbXB1dGVyQm9hcmQuZmluZEdyaWQoXG4gICAgICBjb21wdXRlckJvYXJkLmZ1bGxCb2FyZCxcbiAgICAgIHRhcmdldFswXSxcbiAgICAgIHRhcmdldFsxXVxuICAgICk7XG4gICAgaWYgKHJlc3VsdC5taXNzID09PSB0cnVlKSB7XG4gICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gJy8nO1xuICAgICAgZWxlbWVudC5zdHlsZS5mb250U2l6ZSA9ICcycmVtJztcbiAgICAgIGVsZW1lbnQuc3R5bGUuY29sb3IgPSAnd2hpdGVzbW9rZSc7XG4gICAgfVxuICAgIGlmIChyZXN1bHQuc2hpcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gJ1gnO1xuICAgICAgZWxlbWVudC5zdHlsZS5mb250U2l6ZSA9ICcycmVtJztcbiAgICAgIGVsZW1lbnQuc3R5bGUuY29sb3IgPSAncmVkJztcbiAgICB9XG5cbiAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tTdHlsZSk7XG5cbiAgICBjb25zdCBjb21wdXRlclN1bmsgPSBjb21wdXRlckJvYXJkLmNoZWNrU3VuaygpO1xuXG4gICAgaWYgKGNvbXB1dGVyU3VuayA9PT0gZmFsc2UpIHtcbiAgICAgIGRpc3BsYXlIaXQocGxheWVyQm9hcmQpO1xuICAgICAgY29uc3QgcGxheWVyU3VuayA9IHBsYXllckJvYXJkLmNoZWNrU3VuaygpO1xuICAgICAgaWYgKHBsYXllclN1bmsgPT09IHRydWUpIHtcbiAgICAgICAgZ3JpZHMuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgICAgICAgIC8vIGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja1N0eWxlKTtcbiAgICAgICAgICBncmlkLm9uY2xpY2sgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coJ0NvbXB1dGVyIHdpbicpO1xuICAgICAgICBiaWdXaW4udGV4dENvbnRlbnQgPSAnT3Bwb25lbnQgV2luJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29tcHV0ZXJTdW5rID09PSB0cnVlKSB7XG4gICAgICBncmlkcy5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgICAgIC8vIGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja1N0eWxlKTtcbiAgICAgICAgZ3JpZC5vbmNsaWNrID0gbnVsbDtcbiAgICAgIH0pO1xuICAgICAgY29uc29sZS5sb2coJ0h1bWFuIHdpbicpO1xuICAgICAgYmlnV2luLnRleHRDb250ZW50ID0gJ1BsYXllciB3aW4nO1xuICAgIH1cbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JpZHMubGVuZ3RoOyBpKyspIHtcbiAgICBncmlkc1tpXS5jbGFzc0xpc3QuYWRkKGBncmlkJHtpfWApO1xuICAgIGdyaWRzW2ldLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAvLyBncmlkc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFjdGl2ZSk7XG4gICAgZ3JpZHNbaV0ub25jbGljayA9IGZ1bmN0aW9uIGFjdGl2ZSgpIHtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICAgICAgY2xpY2tTdHlsZSh0aGlzKTtcbiAgICB9O1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDbGljaztcbiIsImNvbnN0IGNvbnZlcnRDb29yZCA9IChudW0gPSAwLCB4ID0gOSwgeSA9IDAsIHRhYmxlID0ge30pID0+IHtcbiAgaWYgKG51bSA+IDk5KSB7XG4gICAgcmV0dXJuIHRhYmxlO1xuICB9XG4gIGNvbnN0IGNvb3JkID0gW3gsIHldO1xuICB0YWJsZVtjb29yZF0gPSBudW07XG4gIGlmICh5ID09PSA5KSB7XG4gICAgeCAtPSAxO1xuICAgIHkgPSAtMTtcbiAgfVxuICByZXR1cm4gY29udmVydENvb3JkKG51bSArIDEsIHgsIHkgKyAxLCB0YWJsZSk7XG59O1xuXG5jb25zdCBjb252ZXJ0TnVtID0gKG51bSA9IDAsIHggPSA5LCB5ID0gMCwgdGFibGUgPSB7fSkgPT4ge1xuICBpZiAobnVtID4gOTkpIHtcbiAgICByZXR1cm4gdGFibGU7XG4gIH1cbiAgY29uc3QgY29vcmQgPSBbeCwgeV07XG4gIHRhYmxlW251bV0gPSBjb29yZDtcbiAgaWYgKHkgPT09IDkpIHtcbiAgICB4IC09IDE7XG4gICAgeSA9IC0xO1xuICB9XG4gIHJldHVybiBjb252ZXJ0TnVtKG51bSArIDEsIHgsIHkgKyAxLCB0YWJsZSk7XG59O1xuXG5leHBvcnQgeyBjb252ZXJ0Q29vcmQsIGNvbnZlcnROdW0gfTtcbiIsImltcG9ydCB7IGNvbnZlcnRDb29yZCB9IGZyb20gJy4vY29udmVydCc7XG5cbmNvbnN0IGFsbEdyaWRzID0gKCkgPT4ge1xuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbWFsbC1ncmlkJyk7XG4gIHJldHVybiBncmlkcztcbn07XG5cbmNvbnN0IGhpZ2hMaWdodEdyaWQgPSAoc2hpcHMpID0+IHtcbiAgY29uc3QgdGFyZ2V0cyA9IFtdO1xuICBjb25zdCBncmlkcyA9IGFsbEdyaWRzKCk7XG5cbiAgT2JqZWN0LmtleXMoc2hpcHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGNvbnN0IGNvb3JkcyA9IHNoaXBzW2tleV07XG4gICAgT2JqZWN0LmtleXMoY29vcmRzKS5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgdGFyZ2V0cy5wdXNoKGNvb3JkKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgY29uc3QgdGFibGUgPSBjb252ZXJ0Q29vcmQoKTtcblxuICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gdGFibGVbdGFyZ2V0XTtcbiAgICBncmlkc1tpbmRleF0uc3R5bGUuYm9yZGVyID0gJzJweCBjeWFuIHNvbGlkJztcbiAgfSk7XG59O1xuXG5jb25zdCBoaWdoQmlnID0gKHNoaXBzKSA9PiB7XG4gIGNvbnN0IHRhcmdldHMgPSBbXTtcbiAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmlnLWdyaWQnKTtcblxuICBPYmplY3Qua2V5cyhzaGlwcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgY29uc3QgY29vcmRzID0gc2hpcHNba2V5XTtcbiAgICBPYmplY3Qua2V5cyhjb29yZHMpLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICB0YXJnZXRzLnB1c2goY29vcmQpO1xuICAgIH0pO1xuICB9KTtcblxuICBjb25zdCB0YWJsZSA9IGNvbnZlcnRDb29yZCgpO1xuXG4gIHRhcmdldHMuZm9yRWFjaCgodGFyZ2V0KSA9PiB7XG4gICAgY29uc3QgaW5kZXggPSB0YWJsZVt0YXJnZXRdO1xuICAgIGdyaWRzW2luZGV4XS5zdHlsZS5ib3JkZXIgPSAnMnB4IGN5YW4gc29saWQnO1xuICB9KTtcbn07XG5cbmNvbnN0IGRpc3BsYXlIaXQgPSAoYm9hcmQpID0+IHtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGJvYXJkLmhpdFJlY29yZCk7XG4gIGNvbnN0IGNvb3JkID0gYm9hcmQuaGl0UmVjb3JkW2tleXNba2V5cy5sZW5ndGggLSAxXV07XG4gIGNvbnN0IHRhcmdldCA9IGJvYXJkLmZpbmRHcmlkKGJvYXJkLmZ1bGxCb2FyZCwgY29vcmRbMF0sIGNvb3JkWzFdKTtcblxuICBjb25zdCBncmlkcyA9IGFsbEdyaWRzKCk7XG4gIGNvbnN0IHRhYmxlID0gY29udmVydENvb3JkKCk7XG4gIGNvbnN0IGdyaWROdW0gPSB0YWJsZVtjb29yZF07XG5cbiAgaWYgKHRhcmdldC5taXNzID09PSB0cnVlKSB7XG4gICAgZ3JpZHNbZ3JpZE51bV0udGV4dENvbnRlbnQgPSAnWCc7XG4gICAgZ3JpZHNbZ3JpZE51bV0uc3R5bGUuZm9udFNpemUgPSAnMS41cmVtJztcbiAgICBncmlkc1tncmlkTnVtXS5zdHlsZS5jb2xvciA9ICd3aGl0ZXNtb2tlJztcbiAgfVxuICBpZiAodGFyZ2V0LnNoaXAgIT09IHVuZGVmaW5lZCkge1xuICAgIGdyaWRzW2dyaWROdW1dLnRleHRDb250ZW50ID0gJ1gnO1xuICAgIGdyaWRzW2dyaWROdW1dLnN0eWxlLmZvbnRTaXplID0gJzEuNXJlbSc7XG4gICAgZ3JpZHNbZ3JpZE51bV0uc3R5bGUuY29sb3IgPSAncmVkJztcbiAgfVxufTtcblxuZXhwb3J0IHsgaGlnaExpZ2h0R3JpZCwgaGlnaEJpZywgZGlzcGxheUhpdCB9O1xuIiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwJztcblxuY29uc3QgR3JpZCA9ICh4LCB5LCB1cCwgcmlnaHQsIHNoaXAsIG1pc3MgPSBmYWxzZSwgYm91bmRhcnkgPSBmYWxzZSkgPT4ge1xuICBjb25zdCBjb29yZCA9IFt4LCB5XTtcbiAgcmV0dXJuIHsgY29vcmQsIHVwLCByaWdodCwgc2hpcCwgbWlzcywgYm91bmRhcnkgfTtcbn07XG5cbmNvbnN0IEdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgbWFrZUJvYXJkID0gKHggPSAwLCB5ID0gMCkgPT4ge1xuICAgIGlmICh4ID4gOSB8fCB5ID4gOSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgYm9hcmQgPSBHcmlkKHgsIHksIG1ha2VCb2FyZCh4ICsgMSwgeSksIG1ha2VCb2FyZCh4LCB5ICsgMSkpO1xuXG4gICAgcmV0dXJuIGJvYXJkO1xuICB9O1xuXG4gIGNvbnN0IGZpbmRHcmlkID0gKGdyaWQsIHAsIHEpID0+IHtcbiAgICBpZiAoZ3JpZC5jb29yZFswXSAhPT0gcCkge1xuICAgICAgZ3JpZCA9IGdyaWQudXA7XG4gICAgICByZXR1cm4gZmluZEdyaWQoZ3JpZCwgcCwgcSk7XG4gICAgfVxuXG4gICAgaWYgKGdyaWQuY29vcmRbMF0gPT09IHApIHtcbiAgICAgIGlmIChncmlkLmNvb3JkWzFdICE9PSBxKSB7XG4gICAgICAgIGdyaWQgPSBncmlkLnJpZ2h0O1xuICAgICAgICByZXR1cm4gZmluZEdyaWQoZ3JpZCwgcCwgcSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBncmlkO1xuICB9O1xuXG4gIGNvbnN0IHN1cnZleUdyaWQgPSAoeCwgeSwgbGVuZ3RoLCBvcmllbnQsIGNvdW50ID0gMCkgPT4ge1xuICAgIGlmIChjb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCwgeSkuc2hpcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAob3JpZW50ID09PSAndmVydGljYWwnKSB7XG4gICAgICAgIHJldHVybiBzdXJ2ZXlHcmlkKHggKyAxLCB5LCBsZW5ndGgsIG9yaWVudCwgY291bnQgKyAxKTtcbiAgICAgIH1cbiAgICAgIGlmIChvcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICByZXR1cm4gc3VydmV5R3JpZCh4LCB5ICsgMSwgbGVuZ3RoLCBvcmllbnQsIGNvdW50ICsgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBwbGFjZUJvdW5kYXJ5ID0gKHgsIHkpID0+IHtcbiAgICBjb25zdCBsaXN0ID0gW107XG5cbiAgICBpZiAoeCArIDEgPCAxMCkge1xuICAgICAgbGlzdC5wdXNoKGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCArIDEsIHkpKTtcbiAgICB9XG4gICAgaWYgKHggLSAxID4gMCkge1xuICAgICAgbGlzdC5wdXNoKGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCAtIDEsIHkpKTtcbiAgICB9XG4gICAgaWYgKHkgLSAxID4gMCkge1xuICAgICAgbGlzdC5wdXNoKGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCwgeSAtIDEpKTtcbiAgICB9XG4gICAgaWYgKHkgKyAxIDwgMTApIHtcbiAgICAgIGxpc3QucHVzaChmaW5kR3JpZChmdWxsQm9hcmQsIHgsIHkgKyAxKSk7XG4gICAgfVxuXG4gICAgaWYgKHggKyAxIDwgMTAgJiYgeSAtIDEgPiAwKSB7XG4gICAgICBsaXN0LnB1c2goZmluZEdyaWQoZnVsbEJvYXJkLCB4ICsgMSwgeSAtIDEpKTtcbiAgICB9XG4gICAgaWYgKHggKyAxIDwgMTAgJiYgeSArIDEgPCAxMCkge1xuICAgICAgbGlzdC5wdXNoKGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCArIDEsIHkgKyAxKSk7XG4gICAgfVxuICAgIGlmICh4IC0gMSA+IDAgJiYgeSAtIDEgPiAwKSB7XG4gICAgICBsaXN0LnB1c2goZmluZEdyaWQoZnVsbEJvYXJkLCB4IC0gMSwgeSAtIDEpKTtcbiAgICB9XG4gICAgaWYgKHggLSAxIDwgMTAgJiYgeSArIDEgPiAxMCkge1xuICAgICAgbGlzdC5wdXNoKGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCAtIDEsIHkgKyAxKSk7XG4gICAgfVxuXG4gICAgbGlzdC5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBzaGlwLmJvdW5kYXJ5ID0gdHJ1ZTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoXG4gICAgeCxcbiAgICB5LFxuICAgIGxlbmd0aCxcbiAgICBvcmllbnQsXG4gICAgY291bnQgPSAwLFxuICAgIHJlY29yZCA9IHt9LFxuICAgIGNoZWNrTGVuZ3RoID0gdHJ1ZSxcbiAgICBzdXJ2ZXkgPSBudWxsXG4gICkgPT4ge1xuICAgIGlmIChjaGVja0xlbmd0aCA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHggKyBsZW5ndGggPiAxMCAmJiBvcmllbnQgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgcmV0dXJuICdTaGlwIG92ZXIgYm9yZGVyJztcbiAgICAgIH1cbiAgICAgIGlmICh5ICsgbGVuZ3RoID4gMTAgJiYgb3JpZW50ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgcmV0dXJuICdTaGlwIG92ZXIgYm9yZGVyJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VydmV5ID09PSBudWxsKSB7XG4gICAgICBpZiAob3JpZW50ID09PSAndmVydGljYWwnKSB7XG4gICAgICAgIHN1cnZleSA9IHN1cnZleUdyaWQoeCwgeSwgbGVuZ3RoLCAndmVydGljYWwnKTtcbiAgICAgIH1cbiAgICAgIGlmIChvcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICBzdXJ2ZXkgPSBzdXJ2ZXlHcmlkKHgsIHksIGxlbmd0aCwgJ2hvcml6b250YWwnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzaGlwTmFtZSA9IGZsZWV0W2xlbmd0aF07XG4gICAgaWYgKHNoaXBSZWNvcmRbc2hpcE5hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiAnU2hpcCBub3QgYXZhaWxhYmxlJztcbiAgICB9XG5cbiAgICBpZiAoY291bnQgPT09IGxlbmd0aCkge1xuICAgICAgaWYgKHNoaXBOYW1lID09PSAnRGVzdHJveWVyMScpIHtcbiAgICAgICAgZmxlZXRbbGVuZ3RoXSA9ICdEZXN0cm95ZXIyJztcbiAgICAgIH1cbiAgICAgIGlmIChzaGlwTmFtZSA9PT0gJ1N1Ym1hcmluZTEnKSB7XG4gICAgICAgIGZsZWV0W2xlbmd0aF0gPSAnU3VibWFyaW5lMic7XG4gICAgICB9XG4gICAgICBzaGlwUmVjb3JkW3NoaXBOYW1lXSA9IHJlY29yZDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZmluZEdyaWQoZnVsbEJvYXJkLCB4LCB5KS5zaGlwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBgU3BhY2UgYWxyZWFkeSB0YWtlbmA7XG4gICAgfVxuXG4gICAgaWYgKG9yaWVudCA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgaWYgKHN1cnZleSA9PT0gdHJ1ZSkge1xuICAgICAgICAvLyBwbGFjZUJvdW5kYXJ5KHgsIHkpO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBmaW5kR3JpZChmdWxsQm9hcmQsIHgsIHkpO1xuICAgICAgICB0YXJnZXQuc2hpcCA9IFNoaXAobGVuZ3RoLCAndmVydGljYWwnKTtcbiAgICAgICAgY29uc3QgcmVjb3JkS2V5ID0gdGFyZ2V0LmNvb3JkO1xuICAgICAgICByZWNvcmRbcmVjb3JkS2V5XSA9IHJlY29yZEtleTtcbiAgICAgICAgY2hlY2tMZW5ndGggPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHBsYWNlU2hpcChcbiAgICAgICAgICB4ICsgMSxcbiAgICAgICAgICB5LFxuICAgICAgICAgIGxlbmd0aCxcbiAgICAgICAgICBvcmllbnQsXG4gICAgICAgICAgY291bnQgKyAxLFxuICAgICAgICAgIHJlY29yZCxcbiAgICAgICAgICBjaGVja0xlbmd0aCxcbiAgICAgICAgICBzdXJ2ZXlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdXJ2ZXkgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBgU3BhY2UgYWxyZWFkeSB0YWtlbmA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9yaWVudCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICBpZiAoc3VydmV5ID09PSB0cnVlKSB7XG4gICAgICAgIC8vIHBsYWNlQm91bmRhcnkoeCwgeSk7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCwgeSk7XG4gICAgICAgIHRhcmdldC5zaGlwID0gU2hpcChsZW5ndGgsICdob3Jpem9udGFsJyk7XG4gICAgICAgIGNvbnN0IHJlY29yZEtleSA9IHRhcmdldC5jb29yZDtcbiAgICAgICAgcmVjb3JkW3JlY29yZEtleV0gPSByZWNvcmRLZXk7XG4gICAgICAgIGNoZWNrTGVuZ3RoID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBwbGFjZVNoaXAoXG4gICAgICAgICAgeCxcbiAgICAgICAgICB5ICsgMSxcbiAgICAgICAgICBsZW5ndGgsXG4gICAgICAgICAgb3JpZW50LFxuICAgICAgICAgIGNvdW50ICsgMSxcbiAgICAgICAgICByZWNvcmQsXG4gICAgICAgICAgY2hlY2tMZW5ndGgsXG4gICAgICAgICAgc3VydmV5XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoc3VydmV5ID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gYFNwYWNlIGFscmVhZHkgdGFrZW5gO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBjaGVja1N1bmsgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2hpcEtleXMgPSBPYmplY3Qua2V5cyhzaGlwUmVjb3JkKTtcbiAgICBzaGlwS2V5cy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBjb25zdCBjb29yZE9iaiA9IHNoaXBSZWNvcmRbc2hpcF07XG4gICAgICBjb25zdCBjb29yZEtleXMgPSBPYmplY3Qua2V5cyhjb29yZE9iaik7XG4gICAgICBjb25zdCBjaGVja1NoaXAgPSBmaW5kR3JpZChcbiAgICAgICAgZnVsbEJvYXJkLFxuICAgICAgICBOdW1iZXIoY29vcmRLZXlzWzBdWzBdKSxcbiAgICAgICAgTnVtYmVyKGNvb3JkS2V5c1swXVsyXSlcbiAgICAgICk7XG4gICAgICBjaGVja1NoaXAuc2hpcC5jYWxTdW5rKCk7XG4gICAgICBpZiAoY2hlY2tTaGlwLnNoaXAuaXNTdW5rKCkgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKCFPYmplY3Qua2V5cyhzdW5rUmVjb3JkKS5pbmNsdWRlcyhzaGlwKSkge1xuICAgICAgICAgIHN1bmtSZWNvcmRbc2hpcF0gPSBzaGlwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoT2JqZWN0LmtleXMoc3Vua1JlY29yZCkubGVuZ3RoID09PSBzaGlwS2V5cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZmluZEdyaWQoZnVsbEJvYXJkLCB4LCB5KTtcbiAgICBjb25zdCBjb29yZCA9IFt4LCB5XTtcbiAgICBjb25zdCBhdHRhY2tTaGlwID0gW107XG5cbiAgICBpZiAodGFyZ2V0LnNoaXAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGhpdFJlY29yZFtjb29yZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBoaXRSZWNvcmRbY29vcmRdID0gY29vcmQ7XG4gICAgICAgIGNvbnN0IGZsZWV0ID0gT2JqZWN0LmtleXMoc2hpcFJlY29yZCk7XG4gICAgICAgIGZsZWV0LmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgICAgICBjb25zdCBjdXJyZW50U2hpcCA9IHNoaXBSZWNvcmRbc2hpcF07XG4gICAgICAgICAgaWYgKGN1cnJlbnRTaGlwW2Nvb3JkXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBhdHRhY2tTaGlwLnB1c2goc2hpcCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgYWxsQ29vcmQgPSBzaGlwUmVjb3JkW2F0dGFja1NoaXBbMF1dO1xuICAgICAgICBjb25zdCBhbGxLZXlzID0gT2JqZWN0LmtleXMoYWxsQ29vcmQpO1xuICAgICAgICBhbGxLZXlzLmZvckVhY2goKGtleXMpID0+IHtcbiAgICAgICAgICBjb25zdCBwcm9wZXJ0eSA9IGFsbENvb3JkW2tleXNdO1xuICAgICAgICAgIGNvbnN0IG9uZUhpdCA9IGZpbmRHcmlkKGZ1bGxCb2FyZCwgcHJvcGVydHlbMF0sIHByb3BlcnR5WzFdKTtcbiAgICAgICAgICBvbmVIaXQuc2hpcC5oaXQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKGhpdFJlY29yZFtjb29yZF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gJ1NoaXAgYWxyZWFkeSBoaXQnO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0YXJnZXQuc2hpcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAodGFyZ2V0Lm1pc3MgPT09IGZhbHNlKSB7XG4gICAgICAgIGhpdFJlY29yZFtjb29yZF0gPSBjb29yZDtcbiAgICAgICAgdGFyZ2V0Lm1pc3MgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICdIaXR0aW5nIGEgbWlzc2VkIHNob3QgYWdhaW4nO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBsZXQgZnVsbEJvYXJkID0gbWFrZUJvYXJkKCk7XG4gIGxldCBzaGlwUmVjb3JkID0ge307XG4gIGxldCBoaXRSZWNvcmQgPSB7fTtcbiAgbGV0IHN1bmtSZWNvcmQgPSB7fTtcbiAgY29uc3QgZmxlZXQgPSB7XG4gICAgNTogJ0NhcnJpZXInLFxuICAgIDQ6ICdCYXR0bGVzaGlwJyxcbiAgICAzOiAnQ3J1c2llcicsXG4gICAgMjogJ0Rlc3Ryb3llcjEnLFxuICAgIDE6ICdTdWJtYXJpbmUxJyxcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGZ1bGxCb2FyZCxcbiAgICBwbGFjZVNoaXAsXG4gICAgZmluZEdyaWQsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBzaGlwUmVjb3JkLFxuICAgIGhpdFJlY29yZCxcbiAgICBjaGVja1N1bmssXG4gICAgc3Vua1JlY29yZCxcbiAgICBwbGFjZUJvdW5kYXJ5LFxuICAgIG1ha2VCb2FyZCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsIi8vIE1ha2UgZ3JpZCBob3ZlciBhY2NvcmRpbmcgdG8gY3VycmVudCBzaGlwIGxlbmd0aFxuY29uc3QgaG92ZXJHcmlkID0gKGxlbmd0aCwgb3JpZW50KSA9PiB7XG4gIGNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNtYWxsLWdyaWQnKTtcblxuICBjb25zdCBncmlkSW5kZXggPSAoZ3JpZCkgPT4ge1xuICAgIGNvbnN0IHJlID0gL1swLTldKy87XG4gICAgY29uc3QgbnVtID0gZ3JpZC5jbGFzc05hbWU7XG4gICAgY29uc3QgZ3JpZE51bSA9IHJlLmV4ZWMobnVtLnNsaWNlKG51bS5sZW5ndGggLSAyLCBudW0ubGVuZ3RoKSlbMF07XG4gICAgcmV0dXJuIGdyaWROdW07XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheSA9ICgpID0+IHtcbiAgICBpZiAob3JpZW50ID09PSAndmVydGljYWwnKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyaWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGdyaWRzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIHZIb3Zlcik7XG4gICAgICAgIGdyaWRzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB2TGVhdmUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBncmlkc1tpXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBoSG92ZXIpO1xuICAgICAgICBncmlkc1tpXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgaExlYXZlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgd2lwZSA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyaWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBncmlkc1tpXS5zdHlsZS5iYWNrZ3JvdW5kID0gJ25vbmUnO1xuICAgIH1cblxuICAgIGlmIChvcmllbnQgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JpZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZ3JpZHNbaV0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgdkhvdmVyKTtcbiAgICAgICAgZ3JpZHNbaV0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHZMZWF2ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBncmlkc1tpXS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBoSG92ZXIpO1xuICAgICAgICBncmlkc1tpXS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgaExlYXZlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gVmVydGljYWxcbiAgZnVuY3Rpb24gdkhvdmVyKGJhc2UsIGNvdW50ID0gMCkge1xuICAgIGlmIChjb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG51bSA9IDA7XG5cbiAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgIG51bSA9IE51bWJlcihncmlkSW5kZXgodGhpcykpO1xuICAgIH1cblxuICAgIGlmIChjb3VudCA+IDApIHtcbiAgICAgIG51bSA9IE51bWJlcihncmlkSW5kZXgoYmFzZSkpIC0gMTA7XG4gICAgfVxuXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmdyaWQke251bX1gKTtcblxuICAgIGlmICh0YXJnZXQgIT09IG51bGwpIHtcbiAgICAgIHRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gJ2N5YW4nO1xuICAgICAgcmV0dXJuIHZIb3Zlcih0YXJnZXQsIGNvdW50ICsgMSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdkxlYXZlKGJhc2UsIGNvdW50ID0gMCkge1xuICAgIGlmIChjb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG51bSA9IDA7XG5cbiAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgIG51bSA9IE51bWJlcihncmlkSW5kZXgodGhpcykpO1xuICAgIH1cblxuICAgIGlmIChjb3VudCA+IDApIHtcbiAgICAgIG51bSA9IE51bWJlcihncmlkSW5kZXgoYmFzZSkpIC0gMTA7XG4gICAgfVxuXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmdyaWQke251bX1gKTtcblxuICAgIGlmICh0YXJnZXQgIT09IG51bGwpIHtcbiAgICAgIHRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gJ25vbmUnO1xuICAgICAgcmV0dXJuIHZMZWF2ZSh0YXJnZXQsIGNvdW50ICsgMSk7XG4gICAgfVxuICB9XG5cbiAgLy8gSG9yaXpvbnRhbFxuICBmdW5jdGlvbiBoSG92ZXIoYmFzZSwgY291bnQgPSAwLCBjaGVjayA9IFtdKSB7XG4gICAgaWYgKGNvdW50ID09PSBsZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgbnVtID0gMDtcblxuICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgbnVtID0gTnVtYmVyKGdyaWRJbmRleCh0aGlzKSk7XG4gICAgfVxuXG4gICAgaWYgKGNvdW50ID4gMCkge1xuICAgICAgbnVtID0gTnVtYmVyKGdyaWRJbmRleChiYXNlKSkgKyAxO1xuICAgIH1cblxuICAgIGNoZWNrLnB1c2gobnVtKTtcblxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5ncmlkJHtudW19YCk7XG5cbiAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgIHRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gJ2N5YW4nO1xuICAgICAgcmV0dXJuIGhIb3Zlcih0YXJnZXQsIGNvdW50ICsgMSwgY2hlY2spO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIGNvdW50ID4gMCAmJlxuICAgICAgdGFyZ2V0ICE9PSBudWxsICYmXG4gICAgICBOdW1iZXIoU3RyaW5nKGNoZWNrW2NoZWNrLmxlbmd0aCAtIDFdKS5zbGljZSgtMSkpID5cbiAgICAgICAgTnVtYmVyKFN0cmluZyhjaGVja1swXSkuc2xpY2UoLTEpKVxuICAgICkge1xuICAgICAgdGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSAnY3lhbic7XG4gICAgICByZXR1cm4gaEhvdmVyKHRhcmdldCwgY291bnQgKyAxLCBjaGVjayk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaExlYXZlKGJhc2UsIGNvdW50ID0gMCwgY2hlY2sgPSBbXSkge1xuICAgIGlmIChjb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG51bSA9IDA7XG5cbiAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgIG51bSA9IE51bWJlcihncmlkSW5kZXgodGhpcykpO1xuICAgIH1cblxuICAgIGlmIChjb3VudCA+IDApIHtcbiAgICAgIG51bSA9IE51bWJlcihncmlkSW5kZXgoYmFzZSkpICsgMTtcbiAgICB9XG5cbiAgICBjaGVjay5wdXNoKG51bSk7XG5cbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuZ3JpZCR7bnVtfWApO1xuXG4gICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICB0YXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9ICdub25lJztcbiAgICAgIHJldHVybiBoTGVhdmUodGFyZ2V0LCBjb3VudCArIDEsIGNoZWNrKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBjb3VudCA+IDAgJiZcbiAgICAgIHRhcmdldCAhPT0gbnVsbCAmJlxuICAgICAgTnVtYmVyKFN0cmluZyhjaGVja1tjaGVjay5sZW5ndGggLSAxXSkuc2xpY2UoLTEpKSA+XG4gICAgICAgIE51bWJlcihTdHJpbmcoY2hlY2tbMF0pLnNsaWNlKC0xKSlcbiAgICApIHtcbiAgICAgIHRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gJ25vbmUnO1xuICAgICAgcmV0dXJuIGhMZWF2ZSh0YXJnZXQsIGNvdW50ICsgMSwgY2hlY2spO1xuICAgIH1cbiAgfVxuICByZXR1cm4geyBkaXNwbGF5LCB3aXBlIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBob3ZlckdyaWQ7XG4iLCJjb25zdCBQbGF5ZXIgPSAoZW5lbXlCb2FyZCwgY29tcHV0ZXJQbGF5ZXIsIG93bkJvYXJkKSA9PiB7XG4gIC8vIEFkZCBodW1hbiBvblxuICAvLyBIdW1hbiBvbmx5IGZvciB0ZXN0aW5nLCByZW1vdmUgYWZ0ZXJcbiAgbGV0IGFpID0gZmFsc2U7XG5cbiAgY29uc3QgY29tcHV0ZXJPbiA9ICgpID0+IHtcbiAgICBhaSA9IHRydWU7XG4gIH07XG5cbiAgY29uc3QgY29tcHV0ZXIgPSAoKSA9PiBhaTtcblxuICBjb25zdCBhdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICBpZiAoY29tcHV0ZXJQbGF5ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGNvbXB1dGVyUGxheWVyLmNvbXB1dGVyKCkgPT09IHRydWUpIHtcbiAgICAgICAgLy8gYXV0b01vdmUoKTtcbiAgICAgICAgaHVtYW5BdXRvTW92ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXRSYW5kb21JbnQgPSAobWluLCBtYXgpID0+IHtcbiAgICBtaW4gPSBNYXRoLmNlaWwobWluKTtcbiAgICBtYXggPSBNYXRoLmZsb29yKG1heCk7XG5cbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcbiAgfTtcblxuICAvLyBBZGQgYXV0b01vdmUgaWYgaHVtYW4gb24sIHRhcmdldCBjb29yZCBpbiBzaGlwIHJlY29yZFxuICAvLyBIdW1hbiBhdXRvTW92ZSBvbmx5IGZvciB0ZXN0aW5nLCByZW1vdmUgYWZ0ZXJcbiAgY29uc3QgaHVtYW5BdXRvTW92ZSA9ICgpID0+IHtcbiAgICBjb25zdCBjb29yZHMgPSBbXTtcbiAgICBjb25zdCBzaGlwS2V5cyA9IE9iamVjdC5rZXlzKG93bkJvYXJkLnNoaXBSZWNvcmQpO1xuICAgIGNvbnN0IGhpdEtleXMgPSBPYmplY3Qua2V5cyhvd25Cb2FyZC5oaXRSZWNvcmQpO1xuICAgIHNoaXBLZXlzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIGNvbnN0IGNvb3JkT2JqID0gb3duQm9hcmQuc2hpcFJlY29yZFtzaGlwXTtcbiAgICAgIGNvbnN0IGNvb3JkS2V5cyA9IE9iamVjdC5rZXlzKGNvb3JkT2JqKTtcbiAgICAgIGNvb3JkS2V5cy5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgICBjb29yZHMucHVzaChjb29yZCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIG93bkJvYXJkLnJlY2VpdmVBdHRhY2soXG4gICAgICBOdW1iZXIoY29vcmRzW2hpdEtleXMubGVuZ3RoXVswXSksXG4gICAgICBOdW1iZXIoY29vcmRzW2hpdEtleXMubGVuZ3RoXVsyXSlcbiAgICApO1xuICAgIC8vIGNvbnNvbGUubG9nKGNvb3JkcywgY29vcmRzWzBdWzBdLCBjb29yZHNbMF1bMl0sIG93bkJvYXJkLmhpdFJlY29yZCk7XG4gIH07XG5cbiAgY29uc3QgYXV0b01vdmUgPSAoKSA9PiB7XG4gICAgY29uc3QgeCA9IGdldFJhbmRvbUludCgwLCA5KTtcbiAgICBjb25zdCB5ID0gZ2V0UmFuZG9tSW50KDAsIDkpO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBvd25Cb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuXG4gICAgaWYgKHJlc3BvbnNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBhdXRvTW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4geyBhdHRhY2ssIGNvbXB1dGVyT24sIGNvbXB1dGVyLCBnZXRSYW5kb21JbnQgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImltcG9ydCB7IGhpZ2hCaWcgfSBmcm9tICcuL2Rpc3BsYXktc2hpcHMnO1xuXG5jb25zdCBnZXRSYW5kb21JbnQgPSAobWluLCBtYXgpID0+IHtcbiAgbWluID0gTWF0aC5jZWlsKG1pbik7XG4gIG1heCA9IE1hdGguZmxvb3IobWF4KTtcblxuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcbn07XG5cbmNvbnN0IHNldENvbXB1dGVyU2hpcCA9IChib2FyZCkgPT4ge1xuICBjb25zdCB4ID0gZ2V0UmFuZG9tSW50KDAsIDkpO1xuICBjb25zdCB5ID0gZ2V0UmFuZG9tSW50KDAsIDkpO1xuICBjb25zdCB6ID0gZ2V0UmFuZG9tSW50KDAsIDEpO1xuXG4gIGxldCBvcmllbnQ7XG4gIGlmICh6ID09PSAwKSB7XG4gICAgb3JpZW50ID0gJ3ZlcnRpY2FsJztcbiAgfSBlbHNlIGlmICh6ID09PSAxKSB7XG4gICAgb3JpZW50ID0gJ2hvcml6b250YWwnO1xuICB9XG5cbiAgY29uc3QgY29udmVydExlbmd0aCA9IHt9O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgIGlmIChpID49IDAgJiYgaSA8IDMpIHtcbiAgICAgIGNvbnZlcnRMZW5ndGhbaV0gPSA1IC0gaTtcbiAgICB9IGVsc2UgaWYgKGkgPT09IDMgfHwgaSA9PT0gNCkge1xuICAgICAgY29udmVydExlbmd0aFtpXSA9IDI7XG4gICAgfSBlbHNlIGlmIChpID09PSA1IHx8IGkgPT09IDYpIHtcbiAgICAgIGNvbnZlcnRMZW5ndGhbaV0gPSAxO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IHtcbiAgICBjb25zdCByZWNvcmRMZW5ndGggPSBPYmplY3Qua2V5cyhib2FyZC5zaGlwUmVjb3JkKS5sZW5ndGg7XG4gICAgY29uc3QgbGVuZ3RoID0gY29udmVydExlbmd0aFtyZWNvcmRMZW5ndGhdO1xuICAgIHJldHVybiBsZW5ndGg7XG4gIH07XG5cbiAgYm9hcmQucGxhY2VTaGlwKHgsIHksIGdldExlbmd0aCgpLCBvcmllbnQpO1xuXG4gIGlmIChPYmplY3Qua2V5cyhib2FyZC5zaGlwUmVjb3JkKS5sZW5ndGggPCA3KSB7XG4gICAgcmV0dXJuIHNldENvbXB1dGVyU2hpcChib2FyZCk7XG4gIH1cblxuICBoaWdoQmlnKGJvYXJkLnNoaXBSZWNvcmQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgc2V0Q29tcHV0ZXJTaGlwO1xuIiwiaW1wb3J0IGhvdmVyR3JpZCBmcm9tICcuL2hvdmVyJztcbmltcG9ydCB7IGhpZ2hMaWdodEdyaWQgfSBmcm9tICcuL2Rpc3BsYXktc2hpcHMnO1xuaW1wb3J0IHsgY29udmVydE51bSB9IGZyb20gJy4vY29udmVydCc7XG5pbXBvcnQgY3JlYXRlQ2xpY2sgZnJvbSAnLi9jbGljay1ib2FyZCc7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHNldENvbXB1dGVyU2hpcCBmcm9tICcuL3NldC1jb21wdXRlci1zaGlwJztcblxuY29uc3Qgc2V0R2FtZSA9ICgpID0+IHtcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBHYW1lYm9hcmQoKTtcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xuICBjb25zdCBjb21wdXRlclBsYXllciA9IFBsYXllcihwbGF5ZXJCb2FyZCk7XG4gIGNvbXB1dGVyUGxheWVyLmNvbXB1dGVyT24oKTtcbiAgY29uc3QgaHVtYW5QbGF5ZXIgPSBQbGF5ZXIoY29tcHV0ZXJCb2FyZCwgY29tcHV0ZXJQbGF5ZXIsIHBsYXllckJvYXJkKTtcblxuICBzZXRQbGF5ZXJTaGlwKHBsYXllckJvYXJkLCBodW1hblBsYXllciwgY29tcHV0ZXJCb2FyZCk7XG4gIHNldENvbXB1dGVyU2hpcChjb21wdXRlckJvYXJkKTtcbn07XG5cbmNvbnN0IHJlc3RhcnQgPSAoKSA9PiB7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbWFsbC1yb3RhdGUnKTtcbiAgY29uc3Qgc21hbGxHcmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbWFsbC1ncmlkJyk7XG4gIGNvbnN0IGJpZ0dyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJpZy1ncmlkJyk7XG5cbiAgY29uc3QgY2xlYXJBbGwgPSAoKSA9PiB7XG4gICAgYnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xlYXJBbGwpO1xuXG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gJ1N0YXJ0JztcbiAgICBjb25zb2xlLmRpcihjcmVhdGVDbGljaygpLmNsaWNrU3R5bGUpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbWFsbEdyaWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzbWFsbEdyaWRzW2ldLnN0eWxlLmJvcmRlciA9ICcycHggc29saWQgZ3JheSc7XG4gICAgICBzbWFsbEdyaWRzW2ldLnRleHRDb250ZW50ID0gJyc7XG4gICAgICBiaWdHcmlkc1tpXS5zdHlsZS5ib3JkZXIgPSAnMnB4IHNvbGlkIGdyYXknO1xuICAgICAgYmlnR3JpZHNbaV0udGV4dENvbnRlbnQgPSAnJztcbiAgICAgIGJpZ0dyaWRzW2ldLnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcbiAgICAgIC8vIGJpZ0dyaWRzW2ldLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3JlYXRlQ2xpY2soKS5jbGlja1N0eWxlKTtcbiAgICAgIGJpZ0dyaWRzW2ldLm9uY2xpY2sgPSBudWxsO1xuICAgIH1cblxuICAgIHNldEdhbWUoKTtcbiAgfTtcbiAgYnV0dG9uLnRleHRDb250ZW50ID0gJ1Jlc3RhcnQnO1xuICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGVhckFsbCk7XG59O1xuXG5jb25zdCBncmlkSW5kZXggPSAoZ3JpZCkgPT4ge1xuICBjb25zdCByZSA9IC9bMC05XSsvO1xuICBjb25zdCBudW0gPSBncmlkLmNsYXNzTmFtZTtcbiAgY29uc3QgZ3JpZE51bSA9IHJlLmV4ZWMobnVtLnNsaWNlKG51bS5sZW5ndGggLSAyLCBudW0ubGVuZ3RoKSlbMF07XG4gIHJldHVybiBncmlkTnVtO1xufTtcblxuY29uc3Qgc2V0UGxheWVyU2hpcCA9IChwbGF5ZXJCb2FyZCwgaHVtYW5QbGF5ZXIsIGNvbXB1dGVyQm9hcmQpID0+IHtcbiAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc21hbGwtZ3JpZCcpO1xuICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc21hbGwtcm90YXRlJyk7XG5cbiAgY29uc3QgY29udmVydExlbmd0aCA9IHt9O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgIGlmIChpID49IDAgJiYgaSA8IDMpIHtcbiAgICAgIGNvbnZlcnRMZW5ndGhbaV0gPSA1IC0gaTtcbiAgICB9IGVsc2UgaWYgKGkgPT09IDMgfHwgaSA9PT0gNCkge1xuICAgICAgY29udmVydExlbmd0aFtpXSA9IDI7XG4gICAgfSBlbHNlIGlmIChpID09PSA1IHx8IGkgPT09IDYpIHtcbiAgICAgIGNvbnZlcnRMZW5ndGhbaV0gPSAxO1xuICAgIH1cbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JpZHMubGVuZ3RoOyBpKyspIHtcbiAgICBncmlkc1tpXS5jbGFzc0xpc3QuYWRkKGBncmlkJHtpfWApO1xuICB9XG5cbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4ge1xuICAgIGNvbnN0IHJlY29yZExlbmd0aCA9IE9iamVjdC5rZXlzKHBsYXllckJvYXJkLnNoaXBSZWNvcmQpLmxlbmd0aDtcbiAgICBjb25zdCBsZW5ndGggPSBjb252ZXJ0TGVuZ3RoW3JlY29yZExlbmd0aF07XG4gICAgcmV0dXJuIGxlbmd0aDtcbiAgfTtcblxuICBsZXQgb3JpZW50ID0gJ3ZlcnRpY2FsJztcblxuICBjb25zdCByb3RhdGUgPSAoKSA9PiB7XG4gICAgaWYgKG9yaWVudCA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgb3JpZW50ID0gJ2hvcml6b250YWwnO1xuICAgIH0gZWxzZSBpZiAob3JpZW50ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIG9yaWVudCA9ICd2ZXJ0aWNhbCc7XG4gICAgfVxuXG4gICAgY29uc3QgcHJvbWlzZTEgPSBQcm9taXNlLnJlc29sdmUod2lwZUhvdmVyKCkpO1xuXG4gICAgcHJvbWlzZTEudGhlbigoKSA9PiB7XG4gICAgICBnZXRIb3ZlcigpO1xuICAgIH0pO1xuICB9O1xuXG4gIGxldCBob3ZlciA9IGhvdmVyR3JpZCgpO1xuXG4gIGNvbnN0IGdldEhvdmVyID0gKCkgPT4ge1xuICAgIGhvdmVyID0gaG92ZXJHcmlkKGdldExlbmd0aCgpLCBvcmllbnQpO1xuICAgIGhvdmVyLmRpc3BsYXkoKTtcbiAgfTtcblxuICBjb25zdCB3aXBlSG92ZXIgPSAoKSA9PiB7XG4gICAgaG92ZXIud2lwZSgpO1xuICAgIGhpZ2hMaWdodEdyaWQocGxheWVyQm9hcmQuc2hpcFJlY29yZCk7XG4gIH07XG5cbiAgY29uc3QgY2xpY2tHcmlkcyA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyaWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBncmlkc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYWNlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlQ2xpY2tzID0gKCkgPT4ge1xuICAgIC8vIFN0YXJ0IEdhbWVcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyaWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBncmlkc1tpXS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYWNlKTtcbiAgICB9XG4gICAgY3JlYXRlQ2xpY2soaHVtYW5QbGF5ZXIsIGNvbXB1dGVyQm9hcmQsIHBsYXllckJvYXJkKTtcbiAgfTtcblxuICBmdW5jdGlvbiBwbGFjZSgpIHtcbiAgICBjb25zdCBpbmRleCA9IGdyaWRJbmRleCh0aGlzKTtcbiAgICBjb25zdCB0YWJsZSA9IGNvbnZlcnROdW0oKTtcblxuICAgIGNvbnN0IHByb21pc2UxID0gUHJvbWlzZS5yZXNvbHZlKFxuICAgICAgcGxheWVyQm9hcmQucGxhY2VTaGlwKFxuICAgICAgICB0YWJsZVtpbmRleF1bMF0sXG4gICAgICAgIHRhYmxlW2luZGV4XVsxXSxcbiAgICAgICAgZ2V0TGVuZ3RoKCksXG4gICAgICAgIG9yaWVudFxuICAgICAgKVxuICAgICk7XG4gICAgcHJvbWlzZTFcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgd2lwZUhvdmVyKCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBpZiAoZ2V0TGVuZ3RoKCkgPCA3KSB7XG4gICAgICAgICAgZ2V0SG92ZXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZW1vdmVDbGlja3MoKTtcbiAgICAgICAgICAvLyBSZXNldCBHYW1lXG4gICAgICAgICAgYnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcm90YXRlKTtcbiAgICAgICAgICByZXN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xpY2tTdGFydCgpIHtcbiAgICB0aGlzLnRleHRDb250ZW50ID0gJ1JvdGF0ZSc7XG4gICAgZ2V0SG92ZXIoKTtcbiAgICBjbGlja0dyaWRzKCk7XG4gICAgYnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tTdGFydCk7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcm90YXRlKTtcbiAgfVxuXG4gIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrU3RhcnQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgc2V0UGxheWVyU2hpcDtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgc2V0UGxheWVyU2hpcCBmcm9tICcuL3NldC1wbGF5ZXItc2hpcCc7XG5pbXBvcnQgc2V0Q29tcHV0ZXJTaGlwIGZyb20gJy4vc2V0LWNvbXB1dGVyLXNoaXAnO1xuXG5jb25zdCBzZXRHYW1lID0gKCkgPT4ge1xuICBjb25zdCBwbGF5ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xuICBjb25zdCBjb21wdXRlckJvYXJkID0gR2FtZWJvYXJkKCk7XG4gIGNvbnN0IGNvbXB1dGVyUGxheWVyID0gUGxheWVyKHBsYXllckJvYXJkKTtcbiAgY29tcHV0ZXJQbGF5ZXIuY29tcHV0ZXJPbigpO1xuICBjb25zdCBodW1hblBsYXllciA9IFBsYXllcihjb21wdXRlckJvYXJkLCBjb21wdXRlclBsYXllciwgcGxheWVyQm9hcmQpO1xuXG4gIHNldFBsYXllclNoaXAocGxheWVyQm9hcmQsIGh1bWFuUGxheWVyLCBjb21wdXRlckJvYXJkKTtcbiAgc2V0Q29tcHV0ZXJTaGlwKGNvbXB1dGVyQm9hcmQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgc2V0R2FtZTtcbiIsImNvbnN0IFNoaXAgPSAobGVuZ3RoLCBvcmllbnQpID0+IHtcbiAgbGV0IHN1bmsgPSBmYWxzZTtcbiAgbGV0IHRvdGFsSGl0cyA9IDA7XG5cbiAgY29uc3QgaGl0ID0gKCkgPT4ge1xuICAgIHRvdGFsSGl0cyArPSAxO1xuICB9O1xuXG4gIGNvbnN0IGNhbFN1bmsgPSAoKSA9PiB7XG4gICAgaWYgKGxlbmd0aCA9PT0gdG90YWxIaXRzKSB7XG4gICAgICBzdW5rID0gdHJ1ZTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGl0cyA9ICgpID0+IHRvdGFsSGl0cztcbiAgY29uc3QgaXNTdW5rID0gKCkgPT4gc3VuaztcblxuICByZXR1cm4geyBsZW5ndGgsIGhpdCwgY2FsU3VuaywgaGl0cywgaXNTdW5rLCBvcmllbnQgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcXG59XFxuXFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMzAsIDMwLCAzMCk7XFxufVxcblxcbi5jb250YWluZXIge1xcbiAgYm9yZGVyOiAxcHggc29pbGQgcmVkO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMWZyIDEwZnIgMWZyO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuLnRpdGxlLWRpdiB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBncmVlbnllbGxvdztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBncmlkLXJvdzogMSAvIDI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBjb2xvcjogZ3JheTtcXG4gIGZvbnQtc2l6ZTogMi41cmVtO1xcbn1cXG5cXG4uYm9hcmQtZGl2IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDVmciAxZnIgMWZyIDFmciA1ZnI7XFxuICB3aWR0aDogMTAwdnc7XFxuICAvKiBoZWlnaHQ6IGZpdC1jb250ZW50OyAqL1xcbiAgZ3JpZC1yb3c6IDIgLyAzO1xcbiAgY29sb3I6IHdoaXRlc21va2U7XFxufVxcblxcbi5zbWFsbC1jb250YWluZXIge1xcbiAgYm9yZGVyOiAycHggc29saWQgdG9tYXRvO1xcbiAgaGVpZ2h0OiBmaXQtY29udGVudDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ3JpZC1jb2x1bW46IDIgLyAzO1xcbn1cXG5cXG4uc21hbGwtYm9hcmQge1xcbiAgYm9yZGVyOiAycHggc29saWQgb3JhbmdlO1xcbiAgd2lkdGg6IDI1cmVtO1xcbiAgaGVpZ2h0OiAyNXJlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpO1xcblxcbn1cXG5cXG4uc21hbGwtbnVtLFxcbi5zbWFsbC1hcGwge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnNtYWxsLWdyaWQge1xcbiAgYm9yZGVyOiAycHggc29saWQgZ3JheTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufSBcXG5cXG4uc21hbGwtcm90YXRlIHtcXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG59XFxuXFxuLnNtYWxsLW5hbWUsXFxuLnNtYWxsLXdpbiB7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxufVxcblxcbi5iaWctY29udGFpbmVyIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHRvbWF0bztcXG4gIGhlaWdodDogZml0LWNvbnRlbnQ7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdyaWQtY29sdW1uOiA0IC8gNTtcXG59XFxuXFxuLmJpZy1ib2FyZCB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBvcmFuZ2U7XFxuICB3aWR0aDogMzByZW07XFxuICBoZWlnaHQ6IDMwcmVtO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDExLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTEsIDFmcik7XFxufVxcblxcbi5iaWctbnVtLFxcbi5iaWctYWxwIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDEuMjVyZW07XFxufVxcblxcbi5iaWctZ3JpZCB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBncmF5O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59IFxcblxcbi5iaWctbmFtZSB7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxufVxcblxcbi5tZXNzYWdlIHtcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnNtYWxsLXdpbixcXG4uYmlnLXdpbiB7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxVQUFVO0VBQ1YsU0FBUztFQUNULHNCQUFzQjtFQUN0Qix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxpQ0FBaUM7QUFDbkM7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsYUFBYTtFQUNiLGdDQUFnQztFQUNoQyxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSw2QkFBNkI7RUFDN0IsYUFBYTtFQUNiLGVBQWU7RUFDZix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFdBQVc7RUFDWCxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsMENBQTBDO0VBQzFDLFlBQVk7RUFDWix5QkFBeUI7RUFDekIsZUFBZTtFQUNmLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLHdCQUF3QjtFQUN4QixtQkFBbUI7RUFDbkIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSx3QkFBd0I7RUFDeEIsWUFBWTtFQUNaLGFBQWE7RUFDYixhQUFhO0VBQ2Isc0NBQXNDO0VBQ3RDLG1DQUFtQzs7QUFFckM7O0FBRUE7O0VBRUUsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsa0JBQWtCO0FBQ3BCOztBQUVBOztFQUVFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHdCQUF3QjtFQUN4QixtQkFBbUI7RUFDbkIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSx3QkFBd0I7RUFDeEIsWUFBWTtFQUNaLGFBQWE7RUFDYixhQUFhO0VBQ2Isc0NBQXNDO0VBQ3RDLG1DQUFtQztBQUNyQzs7QUFFQTs7RUFFRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsZUFBZTtFQUNmLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBOztFQUVFLGtCQUFrQjtBQUNwQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XFxufVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDMwLCAzMCwgMzApO1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gIGJvcmRlcjogMXB4IHNvaWxkIHJlZDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciAxMGZyIDFmcjtcXG4gIGhlaWdodDogMTAwdmg7XFxufVxcblxcbi50aXRsZS1kaXYge1xcbiAgYm9yZGVyOiAycHggc29saWQgZ3JlZW55ZWxsb3c7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ3JpZC1yb3c6IDEgLyAyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgY29sb3I6IGdyYXk7XFxuICBmb250LXNpemU6IDIuNXJlbTtcXG59XFxuXFxuLmJvYXJkLWRpdiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA1ZnIgMWZyIDFmciAxZnIgNWZyO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgLyogaGVpZ2h0OiBmaXQtY29udGVudDsgKi9cXG4gIGdyaWQtcm93OiAyIC8gMztcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbn1cXG5cXG4uc21hbGwtY29udGFpbmVyIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHRvbWF0bztcXG4gIGhlaWdodDogZml0LWNvbnRlbnQ7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdyaWQtY29sdW1uOiAyIC8gMztcXG59XFxuXFxuLnNtYWxsLWJvYXJkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIG9yYW5nZTtcXG4gIHdpZHRoOiAyNXJlbTtcXG4gIGhlaWdodDogMjVyZW07XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMSwgMWZyKTtcXG5cXG59XFxuXFxuLnNtYWxsLW51bSxcXG4uc21hbGwtYXBsIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zbWFsbC1ncmlkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGdyYXk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn0gXFxuXFxuLnNtYWxsLXJvdGF0ZSB7XFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxufVxcblxcbi5zbWFsbC1uYW1lLFxcbi5zbWFsbC13aW4ge1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbn1cXG5cXG4uYmlnLWNvbnRhaW5lciB7XFxuICBib3JkZXI6IDJweCBzb2xpZCB0b21hdG87XFxuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBncmlkLWNvbHVtbjogNCAvIDU7XFxufVxcblxcbi5iaWctYm9hcmQge1xcbiAgYm9yZGVyOiAycHggc29saWQgb3JhbmdlO1xcbiAgd2lkdGg6IDMwcmVtO1xcbiAgaGVpZ2h0OiAzMHJlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpO1xcbn1cXG5cXG4uYmlnLW51bSxcXG4uYmlnLWFscCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xcbn1cXG5cXG4uYmlnLWdyaWQge1xcbiAgYm9yZGVyOiAycHggc29saWQgZ3JheTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufSBcXG5cXG4uYmlnLW5hbWUge1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbn1cXG5cXG4ubWVzc2FnZSB7XFxuICBjb2xvcjogd2hpdGVzbW9rZTtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zbWFsbC13aW4sXFxuLmJpZy13aW4ge1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vc3R5bGUuY3NzJztcbi8vIGltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmQnO1xuLy8gaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllcic7XG4vLyBpbXBvcnQgeyBoaWdoTGlnaHRHcmlkLCBoaWdoQmlnIH0gZnJvbSAnLi9kaXNwbGF5LXNoaXBzJztcbmltcG9ydCBjcmVhdGVDbGljayBmcm9tICcuL2NsaWNrLWJvYXJkJztcbi8vIGltcG9ydCB7IGNvbnZlcnROdW0sIGNvbnZlcnRDb29yZCB9IGZyb20gJy4vY29udmVydCc7XG4vLyBpbXBvcnQgaG92ZXJHcmlkIGZyb20gJy4vaG92ZXInO1xuaW1wb3J0IHNldFBsYXllclNoaXAgZnJvbSAnLi9zZXQtcGxheWVyLXNoaXAnO1xuaW1wb3J0IHNldENvbXB1dGVyU2hpcCBmcm9tICcuL3NldC1jb21wdXRlci1zaGlwJztcbmltcG9ydCBzZXRHYW1lIGZyb20gJy4vc2V0dXAnO1xuXG5zZXRHYW1lKCk7XG4vLyBjb25zb2xlLmxvZyhjcmVhdGVDbGljaygpLmNsaWNrU3R5bGUucmVtb3ZlKTtcblxuLy8gY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNtYWxsLXJvdGF0ZScpO1xuLy8gYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZ2FtZSk7XG5cbi8vIHNldFBsYXllclNoaXAoZ2FtZS5wbGF5ZXJCb2FyZCwgZ2FtZS5odW1hblBsYXllciwgZ2FtZS5jb21wdXRlckJvYXJkKTtcblxuLy8gc2V0Q29tcHV0ZXJTaGlwKGdhbWUuY29tcHV0ZXJCb2FyZCk7XG5cbi8vIGNvbnNvbGUubG9nKGdhbWUuY29tcHV0ZXJCb2FyZC5zaGlwUmVjb3JkKTtcblxuLy8gY29uc3QgcGxheWVyQm9hcmQgPSBHYW1lYm9hcmQoKTtcbi8vIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBHYW1lYm9hcmQoKTtcbi8vIGNvbnN0IGNvbXB1dGVyUGxheWVyID0gUGxheWVyKHBsYXllckJvYXJkKTtcbi8vIGNvbXB1dGVyUGxheWVyLmNvbXB1dGVyT24oKTtcbi8vIGNvbnN0IGh1bWFuUGxheWVyID0gUGxheWVyKGNvbXB1dGVyQm9hcmQsIGNvbXB1dGVyUGxheWVyLCBwbGF5ZXJCb2FyZCk7XG5cbi8vIHBsYXllckJvYXJkLnBsYWNlU2hpcCg0LCAxLCA1LCAndmVydGljYWwnKTtcbi8vIHBsYXllckJvYXJkLnBsYWNlU2hpcCg2LCA0LCAzLCAnaG9yaXpvbnRhbCcpO1xuLy8gcGxheWVyQm9hcmQucGxhY2VTaGlwKDEsIDcsIDIsICd2ZXJ0aWNhbCcpO1xuLy8gcGxheWVyQm9hcmQucGxhY2VTaGlwKDQsIDQsIDIsICdob3Jpem9udGFsJyk7XG4vLyBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoOSwgOSwgMSwgJ3ZlcnRpY2FsJyk7XG4vLyBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoNywgOCwgMSwgJ3ZlcnRpY2FsJyk7XG4vLyBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoOSwgNSwgMywgJ2hvcml6b250YWwnKTtcblxuLy8gaGlnaExpZ2h0R3JpZChwbGF5ZXJCb2FyZC5zaGlwUmVjb3JkKTtcblxuLy8gY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMSwgMSwgNSwgJ3ZlcnRpY2FsJyk7XG4vLyBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCgzLCAzLCA0LCAndmVydGljYWwnKTtcbi8vIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDgsIDMsIDMsICdob3Jpem9udGFsJyk7XG4vLyBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCgxLCA1LCAyLCAndmVydGljYWwnKTtcbi8vIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDQsIDYsIDIsICd2ZXJ0aWNhbCcpO1xuLy8gY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMywgOSwgMSwgJ3ZlcnRpY2FsJyk7XG4vLyBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCg3LCAwLCAxLCAndmVydGljYWwnKTtcblxuLy8gaGlnaEJpZyhjb21wdXRlckJvYXJkLnNoaXBSZWNvcmQpO1xuXG4vLyBjcmVhdGVDbGljayhodW1hblBsYXllciwgY29tcHV0ZXJCb2FyZCwgcGxheWVyQm9hcmQpO1xuXG4vLyBob3ZlckdyaWQoNSwgJ3ZlcnRpY2FsJyk7XG4vLyBob3ZlckdyaWQoNSwgJ2hvcml6b250YWwnKTtcbiJdLCJuYW1lcyI6WyJjb252ZXJ0TnVtIiwiZGlzcGxheUhpdCIsImdyaWRzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZ3JpZEluZGV4IiwiZ3JpZCIsInJlIiwibnVtIiwiY2xhc3NOYW1lIiwiZ3JpZE51bSIsImV4ZWMiLCJzbGljZSIsImxlbmd0aCIsImNvb3JkIiwiY3JlYXRlQ2xpY2siLCJwbGF5ZXIiLCJjb21wdXRlckJvYXJkIiwicGxheWVyQm9hcmQiLCJiaWdXaW4iLCJxdWVyeVNlbGVjdG9yIiwiY2xpY2tTdHlsZSIsImVsZW1lbnQiLCJ0YXJnZXQiLCJhdHRhY2siLCJyZXN1bHQiLCJmaW5kR3JpZCIsImZ1bGxCb2FyZCIsIm1pc3MiLCJ0ZXh0Q29udGVudCIsInN0eWxlIiwiZm9udFNpemUiLCJjb2xvciIsInNoaXAiLCJ1bmRlZmluZWQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY29tcHV0ZXJTdW5rIiwiY2hlY2tTdW5rIiwicGxheWVyU3VuayIsImZvckVhY2giLCJvbmNsaWNrIiwiY29uc29sZSIsImxvZyIsImkiLCJjbGFzc0xpc3QiLCJhZGQiLCJjdXJzb3IiLCJhY3RpdmUiLCJjb252ZXJ0Q29vcmQiLCJhcmd1bWVudHMiLCJ4IiwieSIsInRhYmxlIiwiYWxsR3JpZHMiLCJoaWdoTGlnaHRHcmlkIiwic2hpcHMiLCJ0YXJnZXRzIiwiT2JqZWN0Iiwia2V5cyIsImtleSIsImNvb3JkcyIsInB1c2giLCJpbmRleCIsImJvcmRlciIsImhpZ2hCaWciLCJib2FyZCIsImhpdFJlY29yZCIsIlNoaXAiLCJHcmlkIiwidXAiLCJyaWdodCIsImJvdW5kYXJ5IiwiR2FtZWJvYXJkIiwibWFrZUJvYXJkIiwicCIsInEiLCJzdXJ2ZXlHcmlkIiwib3JpZW50IiwiY291bnQiLCJwbGFjZUJvdW5kYXJ5IiwibGlzdCIsInBsYWNlU2hpcCIsInJlY29yZCIsImNoZWNrTGVuZ3RoIiwic3VydmV5Iiwic2hpcE5hbWUiLCJmbGVldCIsInNoaXBSZWNvcmQiLCJyZWNvcmRLZXkiLCJzaGlwS2V5cyIsImNvb3JkT2JqIiwiY29vcmRLZXlzIiwiY2hlY2tTaGlwIiwiTnVtYmVyIiwiY2FsU3VuayIsImlzU3VuayIsInN1bmtSZWNvcmQiLCJpbmNsdWRlcyIsInJlY2VpdmVBdHRhY2siLCJhdHRhY2tTaGlwIiwiY3VycmVudFNoaXAiLCJhbGxDb29yZCIsImFsbEtleXMiLCJwcm9wZXJ0eSIsIm9uZUhpdCIsImhpdCIsImhvdmVyR3JpZCIsImRpc3BsYXkiLCJhZGRFdmVudExpc3RlbmVyIiwidkhvdmVyIiwidkxlYXZlIiwiaEhvdmVyIiwiaExlYXZlIiwid2lwZSIsImJhY2tncm91bmQiLCJiYXNlIiwiY2hlY2siLCJTdHJpbmciLCJQbGF5ZXIiLCJlbmVteUJvYXJkIiwiY29tcHV0ZXJQbGF5ZXIiLCJvd25Cb2FyZCIsImFpIiwiY29tcHV0ZXJPbiIsImNvbXB1dGVyIiwiaHVtYW5BdXRvTW92ZSIsImdldFJhbmRvbUludCIsIm1pbiIsIm1heCIsIk1hdGgiLCJjZWlsIiwiZmxvb3IiLCJyYW5kb20iLCJoaXRLZXlzIiwiYXV0b01vdmUiLCJyZXNwb25zZSIsInNldENvbXB1dGVyU2hpcCIsInoiLCJjb252ZXJ0TGVuZ3RoIiwiZ2V0TGVuZ3RoIiwicmVjb3JkTGVuZ3RoIiwic2V0R2FtZSIsImh1bWFuUGxheWVyIiwic2V0UGxheWVyU2hpcCIsInJlc3RhcnQiLCJidXR0b24iLCJzbWFsbEdyaWRzIiwiYmlnR3JpZHMiLCJjbGVhckFsbCIsImRpciIsInJvdGF0ZSIsInByb21pc2UxIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ3aXBlSG92ZXIiLCJ0aGVuIiwiZ2V0SG92ZXIiLCJob3ZlciIsImNsaWNrR3JpZHMiLCJwbGFjZSIsInJlbW92ZUNsaWNrcyIsImNsaWNrU3RhcnQiLCJzdW5rIiwidG90YWxIaXRzIiwiaGl0cyJdLCJzb3VyY2VSb290IjoiIn0=