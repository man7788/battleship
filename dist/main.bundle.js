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
  const allGrids = () => {
    const grids = document.querySelectorAll('.small-grid');
    return grids;
  };
  const gridIndex = grid => {
    const re = /[0-9]+/;
    const num = grid.className;
    const gridNum = re.exec(num.slice(num.length - 2, num.length))[0];
    return gridNum;
  };
  const grids = allGrids();
  if (orient === 'vertical') {
    for (let i = 0; i < grids.length; i++) {
      grids[i].classList.add(`grid${i}`);
      grids[i].addEventListener('mouseover', e => {
        vHover(e.target, length);
      });
      grids[i].addEventListener('mouseleave', e => {
        vLeave(e.target, length);
      });
    }
  }
  if (orient === 'horizontal') {
    for (let i = 0; i < grids.length; i++) {
      grids[i].classList.add(`grid${i}`);
      grids[i].addEventListener('mouseover', e => {
        hHover(e.target, length);
      });
      grids[i].addEventListener('mouseleave', e => {
        hLeave(e.target, length);
      });
    }
  }

  // Vertical
  const vHover = function (base, vLength) {
    let count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
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
  const vLeave = function (base, vLength) {
    let count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
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
  const hHover = function (base, hLength) {
    let count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    let check = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
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
    if (count > 0 && target !== null && Number(String(check[check.length - 1]).slice(-1)) > Number(String(check[0]).slice(-1))) {
      target.style.background = 'cyan';
      return hHover(target, hLength, count + 1, check);
    }
  };
  const hLeave = function (base, hLength) {
    let count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    let check = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
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
    if (count > 0 && target !== null && Number(String(check[check.length - 1]).slice(-1)) > Number(String(check[0]).slice(-1))) {
      target.style.background = 'none';
      return hLeave(target, hLength, count + 1, check);
    }
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  font-family: sans-serif;\n}\n\nbody {\n  background-color: rgb(30, 30, 30);\n}\n\n.container {\n  border: 1px soild red;\n  display: grid;\n  grid-template-rows: 1fr 10fr 1fr;\n  height: 100vh;\n}\n\n.title-div {\n  border: 2px solid greenyellow;\n  display: flex;\n  grid-row: 1 / 2;\n  justify-content: center;\n  align-items: center;\n  color: gray;\n  font-size: 2.5rem;\n}\n\n.board-div {\n  display: grid;\n  grid-template-columns: 5fr 1fr 1fr 1fr 5fr;\n  width: 100vw;\n  /* height: fit-content; */\n  grid-row: 2 / 3;\n  color: whitesmoke;\n}\n\n.small-container {\n  border: 2px solid tomato;\n  height: fit-content;\n  display: flex;\n  flex-direction: column;\n  grid-column: 2 / 3;\n}\n\n.small-board {\n  border: 2px solid orange;\n  width: 25rem;\n  height: 25rem;\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(11, 1fr);\n\n}\n\n.small-num,\n.small-apl {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.small-grid {\n  border: 2px solid gray;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n} \n\n/* .small-grid[style=\"border: 2px solid cyan;\"] {\n  cursor:pointer\n} */\n\n.small-name,\n.small-win {\n  align-self: center;\n}\n\n.big-container {\n  border: 2px solid tomato;\n  height: fit-content;\n  display: flex;\n  flex-direction: column;\n  grid-column: 4 / 5;\n}\n\n.big-board {\n  border: 2px solid orange;\n  width: 30rem;\n  height: 30rem;\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(11, 1fr);\n}\n\n.big-num,\n.big-alp {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.25rem;\n}\n\n.big-grid {\n  border: 2px solid gray;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor:pointer\n} \n\n.big-name {\n  align-self: center;\n}\n\n.message {\n  color: whitesmoke;\n  font-size: 1rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.small-win,\n.big-win {\n  align-self: center;\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,UAAU;EACV,SAAS;EACT,sBAAsB;EACtB,uBAAuB;AACzB;;AAEA;EACE,iCAAiC;AACnC;;AAEA;EACE,qBAAqB;EACrB,aAAa;EACb,gCAAgC;EAChC,aAAa;AACf;;AAEA;EACE,6BAA6B;EAC7B,aAAa;EACb,eAAe;EACf,uBAAuB;EACvB,mBAAmB;EACnB,WAAW;EACX,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,0CAA0C;EAC1C,YAAY;EACZ,yBAAyB;EACzB,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,wBAAwB;EACxB,mBAAmB;EACnB,aAAa;EACb,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;EACxB,YAAY;EACZ,aAAa;EACb,aAAa;EACb,sCAAsC;EACtC,mCAAmC;;AAErC;;AAEA;;EAEE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,sBAAsB;EACtB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;;GAEG;;AAEH;;EAEE,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;EACxB,mBAAmB;EACnB,aAAa;EACb,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;EACxB,YAAY;EACZ,aAAa;EACb,aAAa;EACb,sCAAsC;EACtC,mCAAmC;AACrC;;AAEA;;EAEE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,sBAAsB;EACtB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB;AACF;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;EACjB,eAAe;EACf,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;;EAEE,kBAAkB;AACpB","sourcesContent":["* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  font-family: sans-serif;\n}\n\nbody {\n  background-color: rgb(30, 30, 30);\n}\n\n.container {\n  border: 1px soild red;\n  display: grid;\n  grid-template-rows: 1fr 10fr 1fr;\n  height: 100vh;\n}\n\n.title-div {\n  border: 2px solid greenyellow;\n  display: flex;\n  grid-row: 1 / 2;\n  justify-content: center;\n  align-items: center;\n  color: gray;\n  font-size: 2.5rem;\n}\n\n.board-div {\n  display: grid;\n  grid-template-columns: 5fr 1fr 1fr 1fr 5fr;\n  width: 100vw;\n  /* height: fit-content; */\n  grid-row: 2 / 3;\n  color: whitesmoke;\n}\n\n.small-container {\n  border: 2px solid tomato;\n  height: fit-content;\n  display: flex;\n  flex-direction: column;\n  grid-column: 2 / 3;\n}\n\n.small-board {\n  border: 2px solid orange;\n  width: 25rem;\n  height: 25rem;\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(11, 1fr);\n\n}\n\n.small-num,\n.small-apl {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.small-grid {\n  border: 2px solid gray;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n} \n\n/* .small-grid[style=\"border: 2px solid cyan;\"] {\n  cursor:pointer\n} */\n\n.small-name,\n.small-win {\n  align-self: center;\n}\n\n.big-container {\n  border: 2px solid tomato;\n  height: fit-content;\n  display: flex;\n  flex-direction: column;\n  grid-column: 4 / 5;\n}\n\n.big-board {\n  border: 2px solid orange;\n  width: 30rem;\n  height: 30rem;\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(11, 1fr);\n}\n\n.big-num,\n.big-alp {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.25rem;\n}\n\n.big-grid {\n  border: 2px solid gray;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor:pointer\n} \n\n.big-name {\n  align-self: center;\n}\n\n.message {\n  color: whitesmoke;\n  font-size: 1rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.small-win,\n.big-win {\n  align-self: center;\n}"],"sourceRoot":""}]);
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
/* harmony import */ var _hover__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hover */ "./src/hover.js");





// import { convertNum, convertCoord } from './convert';
// import rotateShip from './rotate';

const playerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
const computerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
const computerPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_2__["default"])(playerBoard);
computerPlayer.computerOn();
const humanPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_2__["default"])(computerBoard, computerPlayer, playerBoard);

// playerBoard.placeShip(4, 1, 5, 'vertical');
// playerBoard.placeShip(2, 1, 4, 'horizontal');
// playerBoard.placeShip(6, 4, 3, 'horizontal');
playerBoard.placeShip(1, 7, 2, 'vertical');
// playerBoard.placeShip(9, 9, 1, 'vertical');
// playerBoard.placeShip(7, 8, 1, 'vertical');
// playerBoard.placeShip(9, 5, 3, 'horizontal');
// playerBoard.placeShip(2, 4, 2, 'horizontal');

(0,_display_ships__WEBPACK_IMPORTED_MODULE_3__.highLightGrid)(playerBoard.shipRecord);

// computerBoard.placeShip(1, 1, 5, 'vertical');
// computerBoard.placeShip(3, 3, 4, 'vertical');
computerBoard.placeShip(8, 3, 3, 'horizontal');
// computerBoard.placeShip(1, 5, 2, 'vertical');
// computerBoard.placeShip(4, 6, 2, 'vertical');
// computerBoard.placeShip(3, 9, 1, 'vertical');
// computerBoard.placeShip(7, 0, 1, 'vertical');

(0,_display_ships__WEBPACK_IMPORTED_MODULE_3__.highBig)(computerBoard.shipRecord);
(0,_click_board__WEBPACK_IMPORTED_MODULE_4__["default"])(humanPlayer, computerBoard, playerBoard);

// rotateShip(playerBoard.shipRecord, playerBoard);

(0,_hover__WEBPACK_IMPORTED_MODULE_5__["default"])(5, 'vertical');
// hoverGrid(1, 'horizontal');
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQXFCO0FBQ2U7QUFDTjtBQUMyQjtBQUNqQjtBQUN4QztBQUNBO0FBQ2dDO0FBRWhDLE1BQU05QyxXQUFXLEdBQUdtRCxzREFBUyxFQUFFO0FBQy9CLE1BQU1wRCxhQUFhLEdBQUdvRCxzREFBUyxFQUFFO0FBQ2pDLE1BQU1nRCxjQUFjLEdBQUdGLG1EQUFNLENBQUNqRyxXQUFXLENBQUM7QUFDMUNtRyxjQUFjLENBQUNHLFVBQVUsRUFBRTtBQUMzQixNQUFNZ0IsV0FBVyxHQUFHckIsbURBQU0sQ0FBQ2xHLGFBQWEsRUFBRW9HLGNBQWMsRUFBRW5HLFdBQVcsQ0FBQzs7QUFFdEU7QUFDQTtBQUNBO0FBQ0FBLFdBQVcsQ0FBQzRELFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUEzQiw2REFBYSxDQUFDakMsV0FBVyxDQUFDa0UsVUFBVSxDQUFDOztBQUVyQztBQUNBO0FBQ0FuRSxhQUFhLENBQUM2RCxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBOztBQUVBakIsdURBQU8sQ0FBQzVDLGFBQWEsQ0FBQ21FLFVBQVUsQ0FBQztBQUVqQ3JFLHdEQUFXLENBQUN5SCxXQUFXLEVBQUV2SCxhQUFhLEVBQUVDLFdBQVcsQ0FBQzs7QUFFcEQ7O0FBRUFxRixrREFBUyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUM7QUFDeEIsOEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvY2xpY2stYm9hcmQuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL2NvbnZlcnQuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL2Rpc3BsYXktc2hpcHMuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvaG92ZXIuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL25wbS1zZXR1cC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL25wbS1zZXR1cC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25wbS1zZXR1cC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25wbS1zZXR1cC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25wbS1zZXR1cC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25wbS1zZXR1cC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbnZlcnROdW0gfSBmcm9tICcuL2NvbnZlcnQnO1xuaW1wb3J0IHsgZGlzcGxheUhpdCB9IGZyb20gJy4vZGlzcGxheS1zaGlwcyc7XG5cbmNvbnN0IGFsbEdyaWRzID0gKCkgPT4ge1xuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iaWctZ3JpZCcpO1xuICByZXR1cm4gZ3JpZHM7XG59O1xuXG5jb25zdCBncmlkSW5kZXggPSAoZ3JpZCkgPT4ge1xuICBjb25zdCByZSA9IC9bMC05XSsvO1xuICBjb25zdCBudW0gPSBncmlkLmNsYXNzTmFtZTtcbiAgY29uc3QgZ3JpZE51bSA9IHJlLmV4ZWMobnVtLnNsaWNlKG51bS5sZW5ndGggLSAyLCBudW0ubGVuZ3RoKSlbMF07XG4gIGNvbnN0IGNvb3JkID0gY29udmVydE51bSgpO1xuICByZXR1cm4gY29vcmRbZ3JpZE51bV07XG59O1xuXG5jb25zdCBjcmVhdGVDbGljayA9IChwbGF5ZXIsIGNvbXB1dGVyQm9hcmQsIHBsYXllckJvYXJkKSA9PiB7XG4gIGNvbnN0IGdyaWRzID0gYWxsR3JpZHMoKTtcbiAgY29uc3Qgc21hbGxXaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc21hbGwtd2luJyk7XG4gIGNvbnN0IGJpZ1dpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iaWctd2luJyk7XG5cbiAgZnVuY3Rpb24gY2xpY2tTdHlsZSgpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBncmlkSW5kZXgodGhpcyk7XG4gICAgcGxheWVyLmF0dGFjayh0YXJnZXRbMF0sIHRhcmdldFsxXSk7XG4gICAgY29uc3QgcmVzdWx0ID0gY29tcHV0ZXJCb2FyZC5maW5kR3JpZChcbiAgICAgIGNvbXB1dGVyQm9hcmQuZnVsbEJvYXJkLFxuICAgICAgdGFyZ2V0WzBdLFxuICAgICAgdGFyZ2V0WzFdXG4gICAgKTtcbiAgICBpZiAocmVzdWx0Lm1pc3MgPT09IHRydWUpIHtcbiAgICAgIHRoaXMudGV4dENvbnRlbnQgPSAnLyc7XG4gICAgICB0aGlzLnN0eWxlLmZvbnRTaXplID0gJzJyZW0nO1xuICAgICAgdGhpcy5zdHlsZS5jb2xvciA9ICd3aGl0ZXNtb2tlJztcbiAgICB9XG4gICAgaWYgKHJlc3VsdC5zaGlwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMudGV4dENvbnRlbnQgPSAnWCc7XG4gICAgICB0aGlzLnN0eWxlLmZvbnRTaXplID0gJzJyZW0nO1xuICAgICAgdGhpcy5zdHlsZS5jb2xvciA9ICdyZWQnO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tTdHlsZSk7XG5cbiAgICBjb25zdCBjb21wdXRlclN1bmsgPSBjb21wdXRlckJvYXJkLmNoZWNrU3VuaygpO1xuXG4gICAgaWYgKGNvbXB1dGVyU3VuayA9PT0gZmFsc2UpIHtcbiAgICAgIGRpc3BsYXlIaXQocGxheWVyQm9hcmQpO1xuICAgICAgY29uc3QgcGxheWVyU3VuayA9IHBsYXllckJvYXJkLmNoZWNrU3VuaygpO1xuICAgICAgaWYgKHBsYXllclN1bmsgPT09IHRydWUpIHtcbiAgICAgICAgZ3JpZHMuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgICAgICAgIGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja1N0eWxlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDb21wdXRlciB3aW4nKTtcbiAgICAgICAgYmlnV2luLnRleHRDb250ZW50ID0gJ09wcG9uZW50IFdpbic7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvbXB1dGVyU3VuayA9PT0gdHJ1ZSkge1xuICAgICAgZ3JpZHMuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgICAgICBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tTdHlsZSk7XG4gICAgICB9KTtcbiAgICAgIGNvbnNvbGUubG9nKCdIdW1hbiB3aW4nKTtcbiAgICAgIHNtYWxsV2luLnRleHRDb250ZW50ID0gJ1BsYXllciB3aW4nO1xuICAgIH1cblxuICAgIC8vIGNvbnNvbGUubG9nKGNvbXB1dGVyQm9hcmQuc2hpcFJlY29yZCk7XG4gICAgLy8gY29uc29sZS5sb2coY29tcHV0ZXJCb2FyZC5zdW5rUmVjb3JkKTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JpZHMubGVuZ3RoOyBpKyspIHtcbiAgICBncmlkc1tpXS5jbGFzc0xpc3QuYWRkKGBncmlkJHtpfWApO1xuICAgIGdyaWRzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tTdHlsZSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNsaWNrO1xuIiwiY29uc3QgY29udmVydENvb3JkID0gKG51bSA9IDAsIHggPSA5LCB5ID0gMCwgdGFibGUgPSB7fSkgPT4ge1xuICBpZiAobnVtID4gOTkpIHtcbiAgICByZXR1cm4gdGFibGU7XG4gIH1cbiAgY29uc3QgY29vcmQgPSBbeCwgeV07XG4gIHRhYmxlW2Nvb3JkXSA9IG51bTtcbiAgaWYgKHkgPT09IDkpIHtcbiAgICB4IC09IDE7XG4gICAgeSA9IC0xO1xuICB9XG4gIHJldHVybiBjb252ZXJ0Q29vcmQobnVtICsgMSwgeCwgeSArIDEsIHRhYmxlKTtcbn07XG5cbmNvbnN0IGNvbnZlcnROdW0gPSAobnVtID0gMCwgeCA9IDksIHkgPSAwLCB0YWJsZSA9IHt9KSA9PiB7XG4gIGlmIChudW0gPiA5OSkge1xuICAgIHJldHVybiB0YWJsZTtcbiAgfVxuICBjb25zdCBjb29yZCA9IFt4LCB5XTtcbiAgdGFibGVbbnVtXSA9IGNvb3JkO1xuICBpZiAoeSA9PT0gOSkge1xuICAgIHggLT0gMTtcbiAgICB5ID0gLTE7XG4gIH1cbiAgcmV0dXJuIGNvbnZlcnROdW0obnVtICsgMSwgeCwgeSArIDEsIHRhYmxlKTtcbn07XG5cbmV4cG9ydCB7IGNvbnZlcnRDb29yZCwgY29udmVydE51bSB9O1xuIiwiaW1wb3J0IHsgY29udmVydENvb3JkIH0gZnJvbSAnLi9jb252ZXJ0JztcblxuY29uc3QgYWxsR3JpZHMgPSAoKSA9PiB7XG4gIGNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNtYWxsLWdyaWQnKTtcbiAgcmV0dXJuIGdyaWRzO1xufTtcblxuY29uc3QgaGlnaExpZ2h0R3JpZCA9IChzaGlwcykgPT4ge1xuICBjb25zdCB0YXJnZXRzID0gW107XG4gIGNvbnN0IGdyaWRzID0gYWxsR3JpZHMoKTtcblxuICBPYmplY3Qua2V5cyhzaGlwcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgY29uc3QgY29vcmRzID0gc2hpcHNba2V5XTtcbiAgICBPYmplY3Qua2V5cyhjb29yZHMpLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICB0YXJnZXRzLnB1c2goY29vcmQpO1xuICAgIH0pO1xuICB9KTtcblxuICBjb25zdCB0YWJsZSA9IGNvbnZlcnRDb29yZCgpO1xuXG4gIHRhcmdldHMuZm9yRWFjaCgodGFyZ2V0KSA9PiB7XG4gICAgY29uc3QgaW5kZXggPSB0YWJsZVt0YXJnZXRdO1xuICAgIGdyaWRzW2luZGV4XS5zdHlsZS5ib3JkZXIgPSAnMnB4IGN5YW4gc29saWQnO1xuICB9KTtcbn07XG5cbmNvbnN0IGhpZ2hCaWcgPSAoc2hpcHMpID0+IHtcbiAgY29uc3QgdGFyZ2V0cyA9IFtdO1xuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iaWctZ3JpZCcpO1xuXG4gIE9iamVjdC5rZXlzKHNoaXBzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBjb25zdCBjb29yZHMgPSBzaGlwc1trZXldO1xuICAgIE9iamVjdC5rZXlzKGNvb3JkcykuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIHRhcmdldHMucHVzaChjb29yZCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGNvbnN0IHRhYmxlID0gY29udmVydENvb3JkKCk7XG5cbiAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IHRhYmxlW3RhcmdldF07XG4gICAgZ3JpZHNbaW5kZXhdLnN0eWxlLmJvcmRlciA9ICcycHggY3lhbiBzb2xpZCc7XG4gIH0pO1xufTtcblxuY29uc3QgZGlzcGxheUhpdCA9IChib2FyZCkgPT4ge1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoYm9hcmQuaGl0UmVjb3JkKTtcbiAgY29uc3QgY29vcmQgPSBib2FyZC5oaXRSZWNvcmRba2V5c1trZXlzLmxlbmd0aCAtIDFdXTtcbiAgY29uc3QgdGFyZ2V0ID0gYm9hcmQuZmluZEdyaWQoYm9hcmQuZnVsbEJvYXJkLCBjb29yZFswXSwgY29vcmRbMV0pO1xuXG4gIGNvbnN0IGdyaWRzID0gYWxsR3JpZHMoKTtcbiAgY29uc3QgdGFibGUgPSBjb252ZXJ0Q29vcmQoKTtcbiAgY29uc3QgZ3JpZE51bSA9IHRhYmxlW2Nvb3JkXTtcblxuICBpZiAodGFyZ2V0Lm1pc3MgPT09IHRydWUpIHtcbiAgICBncmlkc1tncmlkTnVtXS50ZXh0Q29udGVudCA9ICdYJztcbiAgICBncmlkc1tncmlkTnVtXS5zdHlsZS5mb250U2l6ZSA9ICcxLjVyZW0nO1xuICAgIGdyaWRzW2dyaWROdW1dLnN0eWxlLmNvbG9yID0gJ3doaXRlc21va2UnO1xuICB9XG4gIGlmICh0YXJnZXQuc2hpcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZ3JpZHNbZ3JpZE51bV0udGV4dENvbnRlbnQgPSAnWCc7XG4gICAgZ3JpZHNbZ3JpZE51bV0uc3R5bGUuZm9udFNpemUgPSAnMS41cmVtJztcbiAgICBncmlkc1tncmlkTnVtXS5zdHlsZS5jb2xvciA9ICdyZWQnO1xuICB9XG59O1xuXG5leHBvcnQgeyBoaWdoTGlnaHRHcmlkLCBoaWdoQmlnLCBkaXNwbGF5SGl0IH07XG4iLCJpbXBvcnQgU2hpcCBmcm9tICcuL3NoaXAnO1xuXG5jb25zdCBHcmlkID0gKHgsIHksIHVwLCByaWdodCwgc2hpcCwgbWlzcyA9IGZhbHNlLCBib3VuZGFyeSA9IGZhbHNlKSA9PiB7XG4gIGNvbnN0IGNvb3JkID0gW3gsIHldO1xuICByZXR1cm4geyBjb29yZCwgdXAsIHJpZ2h0LCBzaGlwLCBtaXNzLCBib3VuZGFyeSB9O1xufTtcblxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBtYWtlQm9hcmQgPSAoeCA9IDAsIHkgPSAwKSA9PiB7XG4gICAgaWYgKHggPiA5IHx8IHkgPiA5KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBib2FyZCA9IEdyaWQoeCwgeSwgbWFrZUJvYXJkKHggKyAxLCB5KSwgbWFrZUJvYXJkKHgsIHkgKyAxKSk7XG5cbiAgICByZXR1cm4gYm9hcmQ7XG4gIH07XG5cbiAgY29uc3QgZmluZEdyaWQgPSAoZ3JpZCwgcCwgcSkgPT4ge1xuICAgIGlmIChncmlkLmNvb3JkWzBdICE9PSBwKSB7XG4gICAgICBncmlkID0gZ3JpZC51cDtcbiAgICAgIHJldHVybiBmaW5kR3JpZChncmlkLCBwLCBxKTtcbiAgICB9XG5cbiAgICBpZiAoZ3JpZC5jb29yZFswXSA9PT0gcCkge1xuICAgICAgaWYgKGdyaWQuY29vcmRbMV0gIT09IHEpIHtcbiAgICAgICAgZ3JpZCA9IGdyaWQucmlnaHQ7XG4gICAgICAgIHJldHVybiBmaW5kR3JpZChncmlkLCBwLCBxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGdyaWQ7XG4gIH07XG5cbiAgY29uc3Qgc3VydmV5R3JpZCA9ICh4LCB5LCBsZW5ndGgsIG9yaWVudCwgY291bnQgPSAwKSA9PiB7XG4gICAgaWYgKGNvdW50ID09PSBsZW5ndGgpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoZmluZEdyaWQoZnVsbEJvYXJkLCB4LCB5KS5zaGlwID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChvcmllbnQgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgcmV0dXJuIHN1cnZleUdyaWQoeCArIDEsIHksIGxlbmd0aCwgb3JpZW50LCBjb3VudCArIDEpO1xuICAgICAgfVxuICAgICAgaWYgKG9yaWVudCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIHJldHVybiBzdXJ2ZXlHcmlkKHgsIHkgKyAxLCBsZW5ndGgsIG9yaWVudCwgY291bnQgKyAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlQm91bmRhcnkgPSAoeCwgeSkgPT4ge1xuICAgIGNvbnN0IGxpc3QgPSBbXTtcblxuICAgIGlmICh4ICsgMSA8IDEwKSB7XG4gICAgICBsaXN0LnB1c2goZmluZEdyaWQoZnVsbEJvYXJkLCB4ICsgMSwgeSkpO1xuICAgIH1cbiAgICBpZiAoeCAtIDEgPiAwKSB7XG4gICAgICBsaXN0LnB1c2goZmluZEdyaWQoZnVsbEJvYXJkLCB4IC0gMSwgeSkpO1xuICAgIH1cbiAgICBpZiAoeSAtIDEgPiAwKSB7XG4gICAgICBsaXN0LnB1c2goZmluZEdyaWQoZnVsbEJvYXJkLCB4LCB5IC0gMSkpO1xuICAgIH1cbiAgICBpZiAoeSArIDEgPCAxMCkge1xuICAgICAgbGlzdC5wdXNoKGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCwgeSArIDEpKTtcbiAgICB9XG5cbiAgICBpZiAoeCArIDEgPCAxMCAmJiB5IC0gMSA+IDApIHtcbiAgICAgIGxpc3QucHVzaChmaW5kR3JpZChmdWxsQm9hcmQsIHggKyAxLCB5IC0gMSkpO1xuICAgIH1cbiAgICBpZiAoeCArIDEgPCAxMCAmJiB5ICsgMSA8IDEwKSB7XG4gICAgICBsaXN0LnB1c2goZmluZEdyaWQoZnVsbEJvYXJkLCB4ICsgMSwgeSArIDEpKTtcbiAgICB9XG4gICAgaWYgKHggLSAxID4gMCAmJiB5IC0gMSA+IDApIHtcbiAgICAgIGxpc3QucHVzaChmaW5kR3JpZChmdWxsQm9hcmQsIHggLSAxLCB5IC0gMSkpO1xuICAgIH1cbiAgICBpZiAoeCAtIDEgPCAxMCAmJiB5ICsgMSA+IDEwKSB7XG4gICAgICBsaXN0LnB1c2goZmluZEdyaWQoZnVsbEJvYXJkLCB4IC0gMSwgeSArIDEpKTtcbiAgICB9XG5cbiAgICBsaXN0LmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIHNoaXAuYm91bmRhcnkgPSB0cnVlO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChcbiAgICB4LFxuICAgIHksXG4gICAgbGVuZ3RoLFxuICAgIG9yaWVudCxcbiAgICBjb3VudCA9IDAsXG4gICAgcmVjb3JkID0ge30sXG4gICAgY2hlY2tMZW5ndGggPSB0cnVlLFxuICAgIHN1cnZleSA9IG51bGxcbiAgKSA9PiB7XG4gICAgaWYgKGNoZWNrTGVuZ3RoID09PSB0cnVlKSB7XG4gICAgICBpZiAoeCArIGxlbmd0aCA+IDEwICYmIG9yaWVudCA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICByZXR1cm4gJ1NoaXAgb3ZlciBib3JkZXInO1xuICAgICAgfVxuICAgICAgaWYgKHkgKyBsZW5ndGggPiAxMCAmJiBvcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICByZXR1cm4gJ1NoaXAgb3ZlciBib3JkZXInO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXJ2ZXkgPT09IG51bGwpIHtcbiAgICAgIGlmIChvcmllbnQgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgc3VydmV5ID0gc3VydmV5R3JpZCh4LCB5LCBsZW5ndGgsICd2ZXJ0aWNhbCcpO1xuICAgICAgfVxuICAgICAgaWYgKG9yaWVudCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIHN1cnZleSA9IHN1cnZleUdyaWQoeCwgeSwgbGVuZ3RoLCAnaG9yaXpvbnRhbCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNoaXBOYW1lID0gZmxlZXRbbGVuZ3RoXTtcbiAgICBpZiAoc2hpcFJlY29yZFtzaGlwTmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuICdTaGlwIG5vdCBhdmFpbGFibGUnO1xuICAgIH1cblxuICAgIGlmIChjb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICBpZiAoc2hpcE5hbWUgPT09ICdEZXN0cm95ZXIxJykge1xuICAgICAgICBmbGVldFtsZW5ndGhdID0gJ0Rlc3Ryb3llcjInO1xuICAgICAgfVxuICAgICAgaWYgKHNoaXBOYW1lID09PSAnU3VibWFyaW5lMScpIHtcbiAgICAgICAgZmxlZXRbbGVuZ3RoXSA9ICdTdWJtYXJpbmUyJztcbiAgICAgIH1cbiAgICAgIHNoaXBSZWNvcmRbc2hpcE5hbWVdID0gcmVjb3JkO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChmaW5kR3JpZChmdWxsQm9hcmQsIHgsIHkpLnNoaXAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGBTcGFjZSBhbHJlYWR5IHRha2VuYDtcbiAgICB9XG5cbiAgICBpZiAob3JpZW50ID09PSAndmVydGljYWwnKSB7XG4gICAgICBpZiAoc3VydmV5ID09PSB0cnVlKSB7XG4gICAgICAgIC8vIHBsYWNlQm91bmRhcnkoeCwgeSk7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCwgeSk7XG4gICAgICAgIHRhcmdldC5zaGlwID0gU2hpcChsZW5ndGgsICd2ZXJ0aWNhbCcpO1xuICAgICAgICBjb25zdCByZWNvcmRLZXkgPSB0YXJnZXQuY29vcmQ7XG4gICAgICAgIHJlY29yZFtyZWNvcmRLZXldID0gcmVjb3JkS2V5O1xuICAgICAgICBjaGVja0xlbmd0aCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gcGxhY2VTaGlwKFxuICAgICAgICAgIHggKyAxLFxuICAgICAgICAgIHksXG4gICAgICAgICAgbGVuZ3RoLFxuICAgICAgICAgIG9yaWVudCxcbiAgICAgICAgICBjb3VudCArIDEsXG4gICAgICAgICAgcmVjb3JkLFxuICAgICAgICAgIGNoZWNrTGVuZ3RoLFxuICAgICAgICAgIHN1cnZleVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKHN1cnZleSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGBTcGFjZSBhbHJlYWR5IHRha2VuYDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAob3JpZW50ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIGlmIChzdXJ2ZXkgPT09IHRydWUpIHtcbiAgICAgICAgLy8gcGxhY2VCb3VuZGFyeSh4LCB5KTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZmluZEdyaWQoZnVsbEJvYXJkLCB4LCB5KTtcbiAgICAgICAgdGFyZ2V0LnNoaXAgPSBTaGlwKGxlbmd0aCwgJ2hvcml6b250YWwnKTtcbiAgICAgICAgY29uc3QgcmVjb3JkS2V5ID0gdGFyZ2V0LmNvb3JkO1xuICAgICAgICByZWNvcmRbcmVjb3JkS2V5XSA9IHJlY29yZEtleTtcbiAgICAgICAgY2hlY2tMZW5ndGggPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHBsYWNlU2hpcChcbiAgICAgICAgICB4LFxuICAgICAgICAgIHkgKyAxLFxuICAgICAgICAgIGxlbmd0aCxcbiAgICAgICAgICBvcmllbnQsXG4gICAgICAgICAgY291bnQgKyAxLFxuICAgICAgICAgIHJlY29yZCxcbiAgICAgICAgICBjaGVja0xlbmd0aCxcbiAgICAgICAgICBzdXJ2ZXlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdXJ2ZXkgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBgU3BhY2UgYWxyZWFkeSB0YWtlbmA7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNoZWNrU3VuayA9ICgpID0+IHtcbiAgICBjb25zdCBzaGlwS2V5cyA9IE9iamVjdC5rZXlzKHNoaXBSZWNvcmQpO1xuICAgIHNoaXBLZXlzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIGNvbnN0IGNvb3JkT2JqID0gc2hpcFJlY29yZFtzaGlwXTtcbiAgICAgIGNvbnN0IGNvb3JkS2V5cyA9IE9iamVjdC5rZXlzKGNvb3JkT2JqKTtcbiAgICAgIGNvbnN0IGNoZWNrU2hpcCA9IGZpbmRHcmlkKFxuICAgICAgICBmdWxsQm9hcmQsXG4gICAgICAgIE51bWJlcihjb29yZEtleXNbMF1bMF0pLFxuICAgICAgICBOdW1iZXIoY29vcmRLZXlzWzBdWzJdKVxuICAgICAgKTtcbiAgICAgIGNoZWNrU2hpcC5zaGlwLmNhbFN1bmsoKTtcbiAgICAgIGlmIChjaGVja1NoaXAuc2hpcC5pc1N1bmsoKSA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoIU9iamVjdC5rZXlzKHN1bmtSZWNvcmQpLmluY2x1ZGVzKHNoaXApKSB7XG4gICAgICAgICAgc3Vua1JlY29yZFtzaGlwXSA9IHNoaXA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChPYmplY3Qua2V5cyhzdW5rUmVjb3JkKS5sZW5ndGggPT09IHNoaXBLZXlzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBmaW5kR3JpZChmdWxsQm9hcmQsIHgsIHkpO1xuICAgIGNvbnN0IGNvb3JkID0gW3gsIHldO1xuICAgIGNvbnN0IGF0dGFja1NoaXAgPSBbXTtcblxuICAgIGlmICh0YXJnZXQuc2hpcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoaGl0UmVjb3JkW2Nvb3JkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGhpdFJlY29yZFtjb29yZF0gPSBjb29yZDtcbiAgICAgICAgY29uc3QgZmxlZXQgPSBPYmplY3Qua2V5cyhzaGlwUmVjb3JkKTtcbiAgICAgICAgZmxlZXQuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnRTaGlwID0gc2hpcFJlY29yZFtzaGlwXTtcbiAgICAgICAgICBpZiAoY3VycmVudFNoaXBbY29vcmRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGF0dGFja1NoaXAucHVzaChzaGlwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBhbGxDb29yZCA9IHNoaXBSZWNvcmRbYXR0YWNrU2hpcFswXV07XG4gICAgICAgIGNvbnN0IGFsbEtleXMgPSBPYmplY3Qua2V5cyhhbGxDb29yZCk7XG4gICAgICAgIGFsbEtleXMuZm9yRWFjaCgoa2V5cykgPT4ge1xuICAgICAgICAgIGNvbnN0IHByb3BlcnR5ID0gYWxsQ29vcmRba2V5c107XG4gICAgICAgICAgY29uc3Qgb25lSGl0ID0gZmluZEdyaWQoZnVsbEJvYXJkLCBwcm9wZXJ0eVswXSwgcHJvcGVydHlbMV0pO1xuICAgICAgICAgIG9uZUhpdC5zaGlwLmhpdCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoaGl0UmVjb3JkW2Nvb3JkXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiAnU2hpcCBhbHJlYWR5IGhpdCc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRhcmdldC5zaGlwID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0YXJnZXQubWlzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgaGl0UmVjb3JkW2Nvb3JkXSA9IGNvb3JkO1xuICAgICAgICB0YXJnZXQubWlzcyA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gJ0hpdHRpbmcgYSBtaXNzZWQgc2hvdCBhZ2Fpbic7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGZ1bGxCb2FyZCA9IG1ha2VCb2FyZCgpO1xuICBjb25zdCBzaGlwUmVjb3JkID0ge307XG4gIGNvbnN0IGhpdFJlY29yZCA9IHt9O1xuICBjb25zdCBzdW5rUmVjb3JkID0ge307XG4gIGNvbnN0IGZsZWV0ID0ge1xuICAgIDU6ICdDYXJyaWVyJyxcbiAgICA0OiAnQmF0dGxlc2hpcCcsXG4gICAgMzogJ0NydXNpZXInLFxuICAgIDI6ICdEZXN0cm95ZXIxJyxcbiAgICAxOiAnU3VibWFyaW5lMScsXG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBmdWxsQm9hcmQsXG4gICAgcGxhY2VTaGlwLFxuICAgIGZpbmRHcmlkLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgc2hpcFJlY29yZCxcbiAgICBoaXRSZWNvcmQsXG4gICAgY2hlY2tTdW5rLFxuICAgIHN1bmtSZWNvcmQsXG4gICAgcGxhY2VCb3VuZGFyeSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsIi8vIE1ha2UgZ3JpZCBob3ZlciBhY2NvcmRpbmcgdG8gY3VycmVudCBzaGlwIGxlbmd0aFxuY29uc3QgaG92ZXJHcmlkID0gKGxlbmd0aCwgb3JpZW50KSA9PiB7XG4gIGNvbnN0IGFsbEdyaWRzID0gKCkgPT4ge1xuICAgIGNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNtYWxsLWdyaWQnKTtcbiAgICByZXR1cm4gZ3JpZHM7XG4gIH07XG5cbiAgY29uc3QgZ3JpZEluZGV4ID0gKGdyaWQpID0+IHtcbiAgICBjb25zdCByZSA9IC9bMC05XSsvO1xuICAgIGNvbnN0IG51bSA9IGdyaWQuY2xhc3NOYW1lO1xuICAgIGNvbnN0IGdyaWROdW0gPSByZS5leGVjKG51bS5zbGljZShudW0ubGVuZ3RoIC0gMiwgbnVtLmxlbmd0aCkpWzBdO1xuICAgIHJldHVybiBncmlkTnVtO1xuICB9O1xuXG4gIGNvbnN0IGdyaWRzID0gYWxsR3JpZHMoKTtcblxuICBpZiAob3JpZW50ID09PSAndmVydGljYWwnKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkcy5sZW5ndGg7IGkrKykge1xuICAgICAgZ3JpZHNbaV0uY2xhc3NMaXN0LmFkZChgZ3JpZCR7aX1gKTtcbiAgICAgIGdyaWRzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChlKSA9PiB7XG4gICAgICAgIHZIb3ZlcihlLnRhcmdldCwgbGVuZ3RoKTtcbiAgICAgIH0pO1xuICAgICAgZ3JpZHNbaV0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIChlKSA9PiB7XG4gICAgICAgIHZMZWF2ZShlLnRhcmdldCwgbGVuZ3RoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGlmIChvcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JpZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGdyaWRzW2ldLmNsYXNzTGlzdC5hZGQoYGdyaWQke2l9YCk7XG4gICAgICBncmlkc1tpXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoZSkgPT4ge1xuICAgICAgICBoSG92ZXIoZS50YXJnZXQsIGxlbmd0aCk7XG4gICAgICB9KTtcbiAgICAgIGdyaWRzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoZSkgPT4ge1xuICAgICAgICBoTGVhdmUoZS50YXJnZXQsIGxlbmd0aCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBWZXJ0aWNhbFxuICBjb25zdCB2SG92ZXIgPSAoYmFzZSwgdkxlbmd0aCwgY291bnQgPSAwKSA9PiB7XG4gICAgaWYgKGNvdW50ID09PSBsZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgbnVtID0gMDtcblxuICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgbnVtID0gTnVtYmVyKGdyaWRJbmRleChiYXNlKSk7XG4gICAgfVxuXG4gICAgaWYgKGNvdW50ID4gMCkge1xuICAgICAgbnVtID0gTnVtYmVyKGdyaWRJbmRleChiYXNlKSkgLSAxMDtcbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuZ3JpZCR7bnVtfWApO1xuXG4gICAgaWYgKHRhcmdldCAhPT0gbnVsbCkge1xuICAgICAgdGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSAnY3lhbic7XG4gICAgICByZXR1cm4gdkhvdmVyKHRhcmdldCwgdkxlbmd0aCwgY291bnQgKyAxKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdkxlYXZlID0gKGJhc2UsIHZMZW5ndGgsIGNvdW50ID0gMCkgPT4ge1xuICAgIGlmIChjb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG51bSA9IDA7XG5cbiAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgIG51bSA9IE51bWJlcihncmlkSW5kZXgoYmFzZSkpO1xuICAgIH1cblxuICAgIGlmIChjb3VudCA+IDApIHtcbiAgICAgIG51bSA9IE51bWJlcihncmlkSW5kZXgoYmFzZSkpIC0gMTA7XG4gICAgfVxuXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmdyaWQke251bX1gKTtcblxuICAgIGlmICh0YXJnZXQgIT09IG51bGwpIHtcbiAgICAgIHRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gJ25vbmUnO1xuICAgICAgcmV0dXJuIHZMZWF2ZSh0YXJnZXQsIHZMZW5ndGgsIGNvdW50ICsgMSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIEhvcml6b250YWxcbiAgY29uc3QgaEhvdmVyID0gKGJhc2UsIGhMZW5ndGgsIGNvdW50ID0gMCwgY2hlY2sgPSBbXSkgPT4ge1xuICAgIGlmIChjb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG51bSA9IDA7XG5cbiAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgIG51bSA9IE51bWJlcihncmlkSW5kZXgoYmFzZSkpO1xuICAgIH1cblxuICAgIGlmIChjb3VudCA+IDApIHtcbiAgICAgIG51bSA9IE51bWJlcihncmlkSW5kZXgoYmFzZSkpICsgMTtcbiAgICB9XG5cbiAgICBjaGVjay5wdXNoKG51bSk7XG5cbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuZ3JpZCR7bnVtfWApO1xuXG4gICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICB0YXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9ICdjeWFuJztcbiAgICAgIHJldHVybiBoSG92ZXIodGFyZ2V0LCBoTGVuZ3RoLCBjb3VudCArIDEsIGNoZWNrKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBjb3VudCA+IDAgJiZcbiAgICAgIHRhcmdldCAhPT0gbnVsbCAmJlxuICAgICAgTnVtYmVyKFN0cmluZyhjaGVja1tjaGVjay5sZW5ndGggLSAxXSkuc2xpY2UoLTEpKSA+XG4gICAgICAgIE51bWJlcihTdHJpbmcoY2hlY2tbMF0pLnNsaWNlKC0xKSlcbiAgICApIHtcbiAgICAgIHRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gJ2N5YW4nO1xuICAgICAgcmV0dXJuIGhIb3Zlcih0YXJnZXQsIGhMZW5ndGgsIGNvdW50ICsgMSwgY2hlY2spO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoTGVhdmUgPSAoYmFzZSwgaExlbmd0aCwgY291bnQgPSAwLCBjaGVjayA9IFtdKSA9PiB7XG4gICAgaWYgKGNvdW50ID09PSBsZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgbnVtID0gMDtcblxuICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgbnVtID0gTnVtYmVyKGdyaWRJbmRleChiYXNlKSk7XG4gICAgfVxuXG4gICAgaWYgKGNvdW50ID4gMCkge1xuICAgICAgbnVtID0gTnVtYmVyKGdyaWRJbmRleChiYXNlKSkgKyAxO1xuICAgIH1cblxuICAgIGNoZWNrLnB1c2gobnVtKTtcblxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5ncmlkJHtudW19YCk7XG5cbiAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgIHRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gJ25vbmUnO1xuICAgICAgcmV0dXJuIGhMZWF2ZSh0YXJnZXQsIGhMZW5ndGgsIGNvdW50ICsgMSwgY2hlY2spO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIGNvdW50ID4gMCAmJlxuICAgICAgdGFyZ2V0ICE9PSBudWxsICYmXG4gICAgICBOdW1iZXIoU3RyaW5nKGNoZWNrW2NoZWNrLmxlbmd0aCAtIDFdKS5zbGljZSgtMSkpID5cbiAgICAgICAgTnVtYmVyKFN0cmluZyhjaGVja1swXSkuc2xpY2UoLTEpKVxuICAgICkge1xuICAgICAgdGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSAnbm9uZSc7XG4gICAgICByZXR1cm4gaExlYXZlKHRhcmdldCwgaExlbmd0aCwgY291bnQgKyAxLCBjaGVjayk7XG4gICAgfVxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaG92ZXJHcmlkO1xuIiwiY29uc3QgUGxheWVyID0gKGVuZW15Qm9hcmQsIGNvbXB1dGVyUGxheWVyLCBvd25Cb2FyZCkgPT4ge1xuICAvLyBBZGQgaHVtYW4gb25cbiAgLy8gSHVtYW4gb25seSBmb3IgdGVzdGluZywgcmVtb3ZlIGFmdGVyXG4gIGxldCBhaSA9IGZhbHNlO1xuXG4gIGNvbnN0IGNvbXB1dGVyT24gPSAoKSA9PiB7XG4gICAgYWkgPSB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IGNvbXB1dGVyID0gKCkgPT4gYWk7XG5cbiAgY29uc3QgYXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgaWYgKGNvbXB1dGVyUGxheWVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChjb21wdXRlclBsYXllci5jb21wdXRlcigpID09PSB0cnVlKSB7XG4gICAgICAgIC8vIGF1dG9Nb3ZlKCk7XG4gICAgICAgIGh1bWFuQXV0b01vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0UmFuZG9tSW50ID0gKG1pbiwgbWF4KSA9PiB7XG4gICAgbWluID0gTWF0aC5jZWlsKG1pbik7XG4gICAgbWF4ID0gTWF0aC5mbG9vcihtYXgpO1xuXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XG4gIH07XG5cbiAgLy8gQWRkIGF1dG9Nb3ZlIGlmIGh1bWFuIG9uLCB0YXJnZXQgY29vcmQgaW4gc2hpcCByZWNvcmRcbiAgLy8gSHVtYW4gYXV0b01vdmUgb25seSBmb3IgdGVzdGluZywgcmVtb3ZlIGFmdGVyXG4gIGNvbnN0IGh1bWFuQXV0b01vdmUgPSAoKSA9PiB7XG4gICAgY29uc3QgY29vcmRzID0gW107XG4gICAgY29uc3Qgc2hpcEtleXMgPSBPYmplY3Qua2V5cyhvd25Cb2FyZC5zaGlwUmVjb3JkKTtcbiAgICBjb25zdCBoaXRLZXlzID0gT2JqZWN0LmtleXMob3duQm9hcmQuaGl0UmVjb3JkKTtcbiAgICBzaGlwS2V5cy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBjb25zdCBjb29yZE9iaiA9IG93bkJvYXJkLnNoaXBSZWNvcmRbc2hpcF07XG4gICAgICBjb25zdCBjb29yZEtleXMgPSBPYmplY3Qua2V5cyhjb29yZE9iaik7XG4gICAgICBjb29yZEtleXMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgICAgY29vcmRzLnB1c2goY29vcmQpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBvd25Cb2FyZC5yZWNlaXZlQXR0YWNrKFxuICAgICAgTnVtYmVyKGNvb3Jkc1toaXRLZXlzLmxlbmd0aF1bMF0pLFxuICAgICAgTnVtYmVyKGNvb3Jkc1toaXRLZXlzLmxlbmd0aF1bMl0pXG4gICAgKTtcbiAgICAvLyBjb25zb2xlLmxvZyhjb29yZHMsIGNvb3Jkc1swXVswXSwgY29vcmRzWzBdWzJdLCBvd25Cb2FyZC5oaXRSZWNvcmQpO1xuICB9O1xuXG4gIGNvbnN0IGF1dG9Nb3ZlID0gKCkgPT4ge1xuICAgIGNvbnN0IHggPSBnZXRSYW5kb21JbnQoMCwgOSk7XG4gICAgY29uc3QgeSA9IGdldFJhbmRvbUludCgwLCA5KTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gb3duQm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcblxuICAgIGlmIChyZXNwb25zZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gYXV0b01vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgYXR0YWNrLCBjb21wdXRlck9uLCBjb21wdXRlciwgZ2V0UmFuZG9tSW50IH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCJjb25zdCBTaGlwID0gKGxlbmd0aCwgb3JpZW50KSA9PiB7XG4gIGxldCBzdW5rID0gZmFsc2U7XG4gIGxldCB0b3RhbEhpdHMgPSAwO1xuXG4gIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICB0b3RhbEhpdHMgKz0gMTtcbiAgfTtcblxuICBjb25zdCBjYWxTdW5rID0gKCkgPT4ge1xuICAgIGlmIChsZW5ndGggPT09IHRvdGFsSGl0cykge1xuICAgICAgc3VuayA9IHRydWU7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhpdHMgPSAoKSA9PiB0b3RhbEhpdHM7XG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHN1bms7XG5cbiAgcmV0dXJuIHsgbGVuZ3RoLCBoaXQsIGNhbFN1bmssIGhpdHMsIGlzU3Vuaywgb3JpZW50IH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XFxufVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDMwLCAzMCwgMzApO1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gIGJvcmRlcjogMXB4IHNvaWxkIHJlZDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciAxMGZyIDFmcjtcXG4gIGhlaWdodDogMTAwdmg7XFxufVxcblxcbi50aXRsZS1kaXYge1xcbiAgYm9yZGVyOiAycHggc29saWQgZ3JlZW55ZWxsb3c7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ3JpZC1yb3c6IDEgLyAyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgY29sb3I6IGdyYXk7XFxuICBmb250LXNpemU6IDIuNXJlbTtcXG59XFxuXFxuLmJvYXJkLWRpdiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA1ZnIgMWZyIDFmciAxZnIgNWZyO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgLyogaGVpZ2h0OiBmaXQtY29udGVudDsgKi9cXG4gIGdyaWQtcm93OiAyIC8gMztcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbn1cXG5cXG4uc21hbGwtY29udGFpbmVyIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHRvbWF0bztcXG4gIGhlaWdodDogZml0LWNvbnRlbnQ7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdyaWQtY29sdW1uOiAyIC8gMztcXG59XFxuXFxuLnNtYWxsLWJvYXJkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIG9yYW5nZTtcXG4gIHdpZHRoOiAyNXJlbTtcXG4gIGhlaWdodDogMjVyZW07XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMSwgMWZyKTtcXG5cXG59XFxuXFxuLnNtYWxsLW51bSxcXG4uc21hbGwtYXBsIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zbWFsbC1ncmlkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGdyYXk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn0gXFxuXFxuLyogLnNtYWxsLWdyaWRbc3R5bGU9XFxcImJvcmRlcjogMnB4IHNvbGlkIGN5YW47XFxcIl0ge1xcbiAgY3Vyc29yOnBvaW50ZXJcXG59ICovXFxuXFxuLnNtYWxsLW5hbWUsXFxuLnNtYWxsLXdpbiB7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxufVxcblxcbi5iaWctY29udGFpbmVyIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHRvbWF0bztcXG4gIGhlaWdodDogZml0LWNvbnRlbnQ7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdyaWQtY29sdW1uOiA0IC8gNTtcXG59XFxuXFxuLmJpZy1ib2FyZCB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBvcmFuZ2U7XFxuICB3aWR0aDogMzByZW07XFxuICBoZWlnaHQ6IDMwcmVtO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDExLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTEsIDFmcik7XFxufVxcblxcbi5iaWctbnVtLFxcbi5iaWctYWxwIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDEuMjVyZW07XFxufVxcblxcbi5iaWctZ3JpZCB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBncmF5O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGN1cnNvcjpwb2ludGVyXFxufSBcXG5cXG4uYmlnLW5hbWUge1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbn1cXG5cXG4ubWVzc2FnZSB7XFxuICBjb2xvcjogd2hpdGVzbW9rZTtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zbWFsbC13aW4sXFxuLmJpZy13aW4ge1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsVUFBVTtFQUNWLFNBQVM7RUFDVCxzQkFBc0I7RUFDdEIsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsaUNBQWlDO0FBQ25DOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLGFBQWE7RUFDYixnQ0FBZ0M7RUFDaEMsYUFBYTtBQUNmOztBQUVBO0VBQ0UsNkJBQTZCO0VBQzdCLGFBQWE7RUFDYixlQUFlO0VBQ2YsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsYUFBYTtFQUNiLDBDQUEwQztFQUMxQyxZQUFZO0VBQ1oseUJBQXlCO0VBQ3pCLGVBQWU7RUFDZixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSx3QkFBd0I7RUFDeEIsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usd0JBQXdCO0VBQ3hCLFlBQVk7RUFDWixhQUFhO0VBQ2IsYUFBYTtFQUNiLHNDQUFzQztFQUN0QyxtQ0FBbUM7O0FBRXJDOztBQUVBOztFQUVFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBOztHQUVHOztBQUVIOztFQUVFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHdCQUF3QjtFQUN4QixtQkFBbUI7RUFDbkIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSx3QkFBd0I7RUFDeEIsWUFBWTtFQUNaLGFBQWE7RUFDYixhQUFhO0VBQ2Isc0NBQXNDO0VBQ3RDLG1DQUFtQztBQUNyQzs7QUFFQTs7RUFFRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkI7QUFDRjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2YsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7O0VBRUUsa0JBQWtCO0FBQ3BCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcXG59XFxuXFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMzAsIDMwLCAzMCk7XFxufVxcblxcbi5jb250YWluZXIge1xcbiAgYm9yZGVyOiAxcHggc29pbGQgcmVkO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMWZyIDEwZnIgMWZyO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuLnRpdGxlLWRpdiB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBncmVlbnllbGxvdztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBncmlkLXJvdzogMSAvIDI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBjb2xvcjogZ3JheTtcXG4gIGZvbnQtc2l6ZTogMi41cmVtO1xcbn1cXG5cXG4uYm9hcmQtZGl2IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDVmciAxZnIgMWZyIDFmciA1ZnI7XFxuICB3aWR0aDogMTAwdnc7XFxuICAvKiBoZWlnaHQ6IGZpdC1jb250ZW50OyAqL1xcbiAgZ3JpZC1yb3c6IDIgLyAzO1xcbiAgY29sb3I6IHdoaXRlc21va2U7XFxufVxcblxcbi5zbWFsbC1jb250YWluZXIge1xcbiAgYm9yZGVyOiAycHggc29saWQgdG9tYXRvO1xcbiAgaGVpZ2h0OiBmaXQtY29udGVudDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ3JpZC1jb2x1bW46IDIgLyAzO1xcbn1cXG5cXG4uc21hbGwtYm9hcmQge1xcbiAgYm9yZGVyOiAycHggc29saWQgb3JhbmdlO1xcbiAgd2lkdGg6IDI1cmVtO1xcbiAgaGVpZ2h0OiAyNXJlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpO1xcblxcbn1cXG5cXG4uc21hbGwtbnVtLFxcbi5zbWFsbC1hcGwge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnNtYWxsLWdyaWQge1xcbiAgYm9yZGVyOiAycHggc29saWQgZ3JheTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufSBcXG5cXG4vKiAuc21hbGwtZ3JpZFtzdHlsZT1cXFwiYm9yZGVyOiAycHggc29saWQgY3lhbjtcXFwiXSB7XFxuICBjdXJzb3I6cG9pbnRlclxcbn0gKi9cXG5cXG4uc21hbGwtbmFtZSxcXG4uc21hbGwtd2luIHtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG59XFxuXFxuLmJpZy1jb250YWluZXIge1xcbiAgYm9yZGVyOiAycHggc29saWQgdG9tYXRvO1xcbiAgaGVpZ2h0OiBmaXQtY29udGVudDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ3JpZC1jb2x1bW46IDQgLyA1O1xcbn1cXG5cXG4uYmlnLWJvYXJkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIG9yYW5nZTtcXG4gIHdpZHRoOiAzMHJlbTtcXG4gIGhlaWdodDogMzByZW07XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMSwgMWZyKTtcXG59XFxuXFxuLmJpZy1udW0sXFxuLmJpZy1hbHAge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcXG59XFxuXFxuLmJpZy1ncmlkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGdyYXk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgY3Vyc29yOnBvaW50ZXJcXG59IFxcblxcbi5iaWctbmFtZSB7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxufVxcblxcbi5tZXNzYWdlIHtcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnNtYWxsLXdpbixcXG4uYmlnLXdpbiB7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJztcbmltcG9ydCB7IGhpZ2hMaWdodEdyaWQsIGhpZ2hCaWcgfSBmcm9tICcuL2Rpc3BsYXktc2hpcHMnO1xuaW1wb3J0IGNyZWF0ZUNsaWNrIGZyb20gJy4vY2xpY2stYm9hcmQnO1xuLy8gaW1wb3J0IHsgY29udmVydE51bSwgY29udmVydENvb3JkIH0gZnJvbSAnLi9jb252ZXJ0Jztcbi8vIGltcG9ydCByb3RhdGVTaGlwIGZyb20gJy4vcm90YXRlJztcbmltcG9ydCBob3ZlckdyaWQgZnJvbSAnLi9ob3Zlcic7XG5cbmNvbnN0IHBsYXllckJvYXJkID0gR2FtZWJvYXJkKCk7XG5jb25zdCBjb21wdXRlckJvYXJkID0gR2FtZWJvYXJkKCk7XG5jb25zdCBjb21wdXRlclBsYXllciA9IFBsYXllcihwbGF5ZXJCb2FyZCk7XG5jb21wdXRlclBsYXllci5jb21wdXRlck9uKCk7XG5jb25zdCBodW1hblBsYXllciA9IFBsYXllcihjb21wdXRlckJvYXJkLCBjb21wdXRlclBsYXllciwgcGxheWVyQm9hcmQpO1xuXG4vLyBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoNCwgMSwgNSwgJ3ZlcnRpY2FsJyk7XG4vLyBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoMiwgMSwgNCwgJ2hvcml6b250YWwnKTtcbi8vIHBsYXllckJvYXJkLnBsYWNlU2hpcCg2LCA0LCAzLCAnaG9yaXpvbnRhbCcpO1xucGxheWVyQm9hcmQucGxhY2VTaGlwKDEsIDcsIDIsICd2ZXJ0aWNhbCcpO1xuLy8gcGxheWVyQm9hcmQucGxhY2VTaGlwKDksIDksIDEsICd2ZXJ0aWNhbCcpO1xuLy8gcGxheWVyQm9hcmQucGxhY2VTaGlwKDcsIDgsIDEsICd2ZXJ0aWNhbCcpO1xuLy8gcGxheWVyQm9hcmQucGxhY2VTaGlwKDksIDUsIDMsICdob3Jpem9udGFsJyk7XG4vLyBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoMiwgNCwgMiwgJ2hvcml6b250YWwnKTtcblxuaGlnaExpZ2h0R3JpZChwbGF5ZXJCb2FyZC5zaGlwUmVjb3JkKTtcblxuLy8gY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMSwgMSwgNSwgJ3ZlcnRpY2FsJyk7XG4vLyBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCgzLCAzLCA0LCAndmVydGljYWwnKTtcbmNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDgsIDMsIDMsICdob3Jpem9udGFsJyk7XG4vLyBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCgxLCA1LCAyLCAndmVydGljYWwnKTtcbi8vIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDQsIDYsIDIsICd2ZXJ0aWNhbCcpO1xuLy8gY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMywgOSwgMSwgJ3ZlcnRpY2FsJyk7XG4vLyBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCg3LCAwLCAxLCAndmVydGljYWwnKTtcblxuaGlnaEJpZyhjb21wdXRlckJvYXJkLnNoaXBSZWNvcmQpO1xuXG5jcmVhdGVDbGljayhodW1hblBsYXllciwgY29tcHV0ZXJCb2FyZCwgcGxheWVyQm9hcmQpO1xuXG4vLyByb3RhdGVTaGlwKHBsYXllckJvYXJkLnNoaXBSZWNvcmQsIHBsYXllckJvYXJkKTtcblxuaG92ZXJHcmlkKDUsICd2ZXJ0aWNhbCcpO1xuLy8gaG92ZXJHcmlkKDEsICdob3Jpem9udGFsJyk7XG4iXSwibmFtZXMiOlsiY29udmVydE51bSIsImRpc3BsYXlIaXQiLCJhbGxHcmlkcyIsImdyaWRzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZ3JpZEluZGV4IiwiZ3JpZCIsInJlIiwibnVtIiwiY2xhc3NOYW1lIiwiZ3JpZE51bSIsImV4ZWMiLCJzbGljZSIsImxlbmd0aCIsImNvb3JkIiwiY3JlYXRlQ2xpY2siLCJwbGF5ZXIiLCJjb21wdXRlckJvYXJkIiwicGxheWVyQm9hcmQiLCJzbWFsbFdpbiIsInF1ZXJ5U2VsZWN0b3IiLCJiaWdXaW4iLCJjbGlja1N0eWxlIiwidGFyZ2V0IiwiYXR0YWNrIiwicmVzdWx0IiwiZmluZEdyaWQiLCJmdWxsQm9hcmQiLCJtaXNzIiwidGV4dENvbnRlbnQiLCJzdHlsZSIsImZvbnRTaXplIiwiY29sb3IiLCJzaGlwIiwidW5kZWZpbmVkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImNvbXB1dGVyU3VuayIsImNoZWNrU3VuayIsInBsYXllclN1bmsiLCJmb3JFYWNoIiwiY29uc29sZSIsImxvZyIsImkiLCJjbGFzc0xpc3QiLCJhZGQiLCJhZGRFdmVudExpc3RlbmVyIiwiY29udmVydENvb3JkIiwiYXJndW1lbnRzIiwieCIsInkiLCJ0YWJsZSIsImhpZ2hMaWdodEdyaWQiLCJzaGlwcyIsInRhcmdldHMiLCJPYmplY3QiLCJrZXlzIiwia2V5IiwiY29vcmRzIiwicHVzaCIsImluZGV4IiwiYm9yZGVyIiwiaGlnaEJpZyIsImJvYXJkIiwiaGl0UmVjb3JkIiwiU2hpcCIsIkdyaWQiLCJ1cCIsInJpZ2h0IiwiYm91bmRhcnkiLCJHYW1lYm9hcmQiLCJtYWtlQm9hcmQiLCJwIiwicSIsInN1cnZleUdyaWQiLCJvcmllbnQiLCJjb3VudCIsInBsYWNlQm91bmRhcnkiLCJsaXN0IiwicGxhY2VTaGlwIiwicmVjb3JkIiwiY2hlY2tMZW5ndGgiLCJzdXJ2ZXkiLCJzaGlwTmFtZSIsImZsZWV0Iiwic2hpcFJlY29yZCIsInJlY29yZEtleSIsInNoaXBLZXlzIiwiY29vcmRPYmoiLCJjb29yZEtleXMiLCJjaGVja1NoaXAiLCJOdW1iZXIiLCJjYWxTdW5rIiwiaXNTdW5rIiwic3Vua1JlY29yZCIsImluY2x1ZGVzIiwicmVjZWl2ZUF0dGFjayIsImF0dGFja1NoaXAiLCJjdXJyZW50U2hpcCIsImFsbENvb3JkIiwiYWxsS2V5cyIsInByb3BlcnR5Iiwib25lSGl0IiwiaGl0IiwiaG92ZXJHcmlkIiwiZSIsInZIb3ZlciIsInZMZWF2ZSIsImhIb3ZlciIsImhMZWF2ZSIsImJhc2UiLCJ2TGVuZ3RoIiwiYmFja2dyb3VuZCIsImhMZW5ndGgiLCJjaGVjayIsIlN0cmluZyIsIlBsYXllciIsImVuZW15Qm9hcmQiLCJjb21wdXRlclBsYXllciIsIm93bkJvYXJkIiwiYWkiLCJjb21wdXRlck9uIiwiY29tcHV0ZXIiLCJodW1hbkF1dG9Nb3ZlIiwiZ2V0UmFuZG9tSW50IiwibWluIiwibWF4IiwiTWF0aCIsImNlaWwiLCJmbG9vciIsInJhbmRvbSIsImhpdEtleXMiLCJhdXRvTW92ZSIsInJlc3BvbnNlIiwic3VuayIsInRvdGFsSGl0cyIsImhpdHMiLCJodW1hblBsYXllciJdLCJzb3VyY2VSb290IjoiIn0=