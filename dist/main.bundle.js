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
    console.log(computerBoard.shipRecord);
    console.log(computerBoard.sunkRecord);
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
/* harmony export */   "highlightGrid": () => (/* binding */ highlightGrid)
/* harmony export */ });
/* harmony import */ var _convert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./convert */ "./src/convert.js");

const allGrids = () => {
  const grids = document.querySelectorAll('.small-grid');
  return grids;
};
const highlightGrid = ships => {
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
  const coord = [x, y];
  return {
    coord,
    up,
    right,
    ship,
    miss
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
        const target = findGrid(fullBoard, x, y);
        target.ship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(length);
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
        const target = findGrid(fullBoard, x, y);
        target.ship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(length);
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
    sunkRecord
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

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
    console.log(coords, coords[0][0], coords[0][2], ownBoard.hitRecord);
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
const Ship = length => {
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
    isSunk
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  font-family: sans-serif;\n}\n\nbody {\n  background-color: rgb(30, 30, 30);\n}\n\n.container {\n  border: 1px soild red;\n  display: grid;\n  grid-template-rows: 1fr 10fr 1fr;\n  height: 100vh;\n}\n\n.title-div {\n  border: 2px solid greenyellow;\n  display: flex;\n  grid-row: 1 / 2;\n  justify-content: center;\n  align-items: center;\n  color: gray;\n  font-size: 2.5rem;\n}\n\n.board-div {\n  display: grid;\n  grid-template-columns: 5fr 1fr 1fr 1fr 5fr;\n  width: 100vw;\n  /* height: fit-content; */\n  grid-row: 2 / 3;\n  color: whitesmoke;\n}\n\n.small-container {\n  border: 2px solid tomato;\n  height: fit-content;\n  display: flex;\n  flex-direction: column;\n  grid-column: 2 / 3;\n}\n\n.small-board {\n  border: 2px solid orange;\n  width: 25rem;\n  height: 25rem;\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(11, 1fr);\n\n}\n\n.small-num,\n.small-apl {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.small-grid {\n  border: 2px solid gray;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n} \n\n.small-name {\n  align-self: center;\n}\n\n.big-container {\n  border: 2px solid tomato;\n  height: fit-content;\n  display: flex;\n  flex-direction: column;\n  grid-column: 4 / 5;\n}\n\n.big-board {\n  border: 2px solid orange;\n  width: 30rem;\n  height: 30rem;\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(11, 1fr);\n}\n\n.big-num,\n.big-alp {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.25rem;\n}\n\n.big-grid {\n  border: 2px solid gray;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor:pointer\n} \n\n.big-name {\n  align-self: center;\n}\n\n.message {\n  color: whitesmoke;\n  font-size: 1rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.small-win,\n.big-win {\n  align-self: center;\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,UAAU;EACV,SAAS;EACT,sBAAsB;EACtB,uBAAuB;AACzB;;AAEA;EACE,iCAAiC;AACnC;;AAEA;EACE,qBAAqB;EACrB,aAAa;EACb,gCAAgC;EAChC,aAAa;AACf;;AAEA;EACE,6BAA6B;EAC7B,aAAa;EACb,eAAe;EACf,uBAAuB;EACvB,mBAAmB;EACnB,WAAW;EACX,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,0CAA0C;EAC1C,YAAY;EACZ,yBAAyB;EACzB,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,wBAAwB;EACxB,mBAAmB;EACnB,aAAa;EACb,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;EACxB,YAAY;EACZ,aAAa;EACb,aAAa;EACb,sCAAsC;EACtC,mCAAmC;;AAErC;;AAEA;;EAEE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,sBAAsB;EACtB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;EACxB,mBAAmB;EACnB,aAAa;EACb,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;EACxB,YAAY;EACZ,aAAa;EACb,aAAa;EACb,sCAAsC;EACtC,mCAAmC;AACrC;;AAEA;;EAEE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,sBAAsB;EACtB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB;AACF;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;EACjB,eAAe;EACf,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;;EAEE,kBAAkB;AACpB","sourcesContent":["* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  font-family: sans-serif;\n}\n\nbody {\n  background-color: rgb(30, 30, 30);\n}\n\n.container {\n  border: 1px soild red;\n  display: grid;\n  grid-template-rows: 1fr 10fr 1fr;\n  height: 100vh;\n}\n\n.title-div {\n  border: 2px solid greenyellow;\n  display: flex;\n  grid-row: 1 / 2;\n  justify-content: center;\n  align-items: center;\n  color: gray;\n  font-size: 2.5rem;\n}\n\n.board-div {\n  display: grid;\n  grid-template-columns: 5fr 1fr 1fr 1fr 5fr;\n  width: 100vw;\n  /* height: fit-content; */\n  grid-row: 2 / 3;\n  color: whitesmoke;\n}\n\n.small-container {\n  border: 2px solid tomato;\n  height: fit-content;\n  display: flex;\n  flex-direction: column;\n  grid-column: 2 / 3;\n}\n\n.small-board {\n  border: 2px solid orange;\n  width: 25rem;\n  height: 25rem;\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(11, 1fr);\n\n}\n\n.small-num,\n.small-apl {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.small-grid {\n  border: 2px solid gray;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n} \n\n.small-name {\n  align-self: center;\n}\n\n.big-container {\n  border: 2px solid tomato;\n  height: fit-content;\n  display: flex;\n  flex-direction: column;\n  grid-column: 4 / 5;\n}\n\n.big-board {\n  border: 2px solid orange;\n  width: 30rem;\n  height: 30rem;\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(11, 1fr);\n}\n\n.big-num,\n.big-alp {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.25rem;\n}\n\n.big-grid {\n  border: 2px solid gray;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor:pointer\n} \n\n.big-name {\n  align-self: center;\n}\n\n.message {\n  color: whitesmoke;\n  font-size: 1rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.small-win,\n.big-win {\n  align-self: center;\n}"],"sourceRoot":""}]);
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





const playerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
const computerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
const computerPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_2__["default"])(playerBoard);
computerPlayer.computerOn();
const humanPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_2__["default"])(computerBoard, computerPlayer, playerBoard);

// playerBoard.placeShip(5, 1, 5, 'vertical');
// playerBoard.placeShip(4, 3, 4, 'horizontal');
// playerBoard.placeShip(6, 4, 3, 'horizontal');
// playerBoard.placeShip(1, 7, 2, 'vertical');
// playerBoard.placeShip(4, 8, 2, 'vertical');
playerBoard.placeShip(9, 9, 1, 'vertical');
playerBoard.placeShip(7, 8, 1, 'vertical');
(0,_display_ships__WEBPACK_IMPORTED_MODULE_3__.highlightGrid)(playerBoard.shipRecord);

// computerBoard.placeShip(1, 1, 5, 'vertical');
// computerBoard.placeShip(3, 3, 4, 'vertical');
// computerBoard.placeShip(8, 3, 3, 'horizontal');
// computerBoard.placeShip(1, 5, 2, 'vertical');
// computerBoard.placeShip(4, 6, 2, 'vertical');
computerBoard.placeShip(3, 9, 1, 'vertical');
computerBoard.placeShip(7, 0, 1, 'vertical');
(0,_display_ships__WEBPACK_IMPORTED_MODULE_3__.highBig)(computerBoard.shipRecord);
(0,_click_board__WEBPACK_IMPORTED_MODULE_4__["default"])(humanPlayer, computerBoard, playerBoard);

// playerBoard.receiveAttack(5, 1);
// playerBoard.receiveAttack(4, 3);
// playerBoard.receiveAttack(6, 4);
// playerBoard.receiveAttack(1, 7);
// playerBoard.receiveAttack(4, 8);
// playerBoard.receiveAttack(9, 9);
// console.log(playerBoard.hitRecord);
// playerBoard.receiveAttack(7, 8);
// for (let i = 0; i < 100; i++) {
//   const grids = document.querySelectorAll('.big-grid');
//   grids[i].click();
// }
// Make enemy board clickable, invoke attack by clicking,
// display whether hit or miss

// Make player board display wheter hit or miss
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RixjQUFjLEVBQUVwRixXQUFXLENBQUM7O0FBRXRFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUEsV0FBVyxDQUFDMkQsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQztBQUMxQzNELFdBQVcsQ0FBQzJELFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUM7QUFFMUN4Qiw2REFBYSxDQUFDbkMsV0FBVyxDQUFDd0IsVUFBVSxDQUFDOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0F6QixhQUFhLENBQUM0RCxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDO0FBQzVDNUQsYUFBYSxDQUFDNEQsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQztBQUU1Q2QsdURBQU8sQ0FBQzlDLGFBQWEsQ0FBQ3lCLFVBQVUsQ0FBQztBQUVqQzNCLHdEQUFXLENBQUMwRyxXQUFXLEVBQUV4RyxhQUFhLEVBQUVDLFdBQVcsQ0FBQzs7QUFFcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQyIsInNvdXJjZXMiOlsid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9jbGljay1ib2FyZC5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvY29udmVydC5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvZGlzcGxheS1zaGlwcy5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL25wbS1zZXR1cC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb252ZXJ0TnVtIH0gZnJvbSAnLi9jb252ZXJ0JztcbmltcG9ydCB7IGRpc3BsYXlIaXQgfSBmcm9tICcuL2Rpc3BsYXktc2hpcHMnO1xuXG5jb25zdCBhbGxHcmlkcyA9ICgpID0+IHtcbiAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmlnLWdyaWQnKTtcbiAgcmV0dXJuIGdyaWRzO1xufTtcblxuY29uc3QgZ3JpZEluZGV4ID0gKGdyaWQpID0+IHtcbiAgY29uc3QgcmUgPSAvWzAtOV0rLztcbiAgY29uc3QgbnVtID0gZ3JpZC5jbGFzc05hbWU7XG4gIGNvbnN0IGdyaWROdW0gPSByZS5leGVjKG51bS5zbGljZShudW0ubGVuZ3RoIC0gMiwgbnVtLmxlbmd0aCkpWzBdO1xuICBjb25zdCBjb29yZCA9IGNvbnZlcnROdW0oKTtcbiAgcmV0dXJuIGNvb3JkW2dyaWROdW1dO1xufTtcblxuY29uc3QgY3JlYXRlQ2xpY2sgPSAocGxheWVyLCBjb21wdXRlckJvYXJkLCBwbGF5ZXJCb2FyZCkgPT4ge1xuICBjb25zdCBncmlkcyA9IGFsbEdyaWRzKCk7XG4gIGNvbnN0IHNtYWxsV2luID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNtYWxsLXdpbicpO1xuICBjb25zdCBiaWdXaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmlnLXdpbicpO1xuXG4gIGZ1bmN0aW9uIGNsaWNrU3R5bGUoKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZ3JpZEluZGV4KHRoaXMpO1xuICAgIHBsYXllci5hdHRhY2sodGFyZ2V0WzBdLCB0YXJnZXRbMV0pO1xuICAgIGNvbnN0IHJlc3VsdCA9IGNvbXB1dGVyQm9hcmQuZmluZEdyaWQoXG4gICAgICBjb21wdXRlckJvYXJkLmZ1bGxCb2FyZCxcbiAgICAgIHRhcmdldFswXSxcbiAgICAgIHRhcmdldFsxXVxuICAgICk7XG4gICAgaWYgKHJlc3VsdC5taXNzID09PSB0cnVlKSB7XG4gICAgICB0aGlzLnRleHRDb250ZW50ID0gJy8nO1xuICAgICAgdGhpcy5zdHlsZS5mb250U2l6ZSA9ICcycmVtJztcbiAgICAgIHRoaXMuc3R5bGUuY29sb3IgPSAnd2hpdGVzbW9rZSc7XG4gICAgfVxuICAgIGlmIChyZXN1bHQuc2hpcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnRleHRDb250ZW50ID0gJ1gnO1xuICAgICAgdGhpcy5zdHlsZS5mb250U2l6ZSA9ICcycmVtJztcbiAgICAgIHRoaXMuc3R5bGUuY29sb3IgPSAncmVkJztcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrU3R5bGUpO1xuXG4gICAgY29uc3QgY29tcHV0ZXJTdW5rID0gY29tcHV0ZXJCb2FyZC5jaGVja1N1bmsoKTtcblxuICAgIGlmIChjb21wdXRlclN1bmsgPT09IGZhbHNlKSB7XG4gICAgICBkaXNwbGF5SGl0KHBsYXllckJvYXJkKTtcbiAgICAgIGNvbnN0IHBsYXllclN1bmsgPSBwbGF5ZXJCb2FyZC5jaGVja1N1bmsoKTtcbiAgICAgIGlmIChwbGF5ZXJTdW5rID09PSB0cnVlKSB7XG4gICAgICAgIGdyaWRzLmZvckVhY2goKGdyaWQpID0+IHtcbiAgICAgICAgICBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tTdHlsZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZygnQ29tcHV0ZXIgd2luJyk7XG4gICAgICAgIGJpZ1dpbi50ZXh0Q29udGVudCA9ICdPcHBvbmVudCBXaW4nO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb21wdXRlclN1bmsgPT09IHRydWUpIHtcbiAgICAgIGdyaWRzLmZvckVhY2goKGdyaWQpID0+IHtcbiAgICAgICAgZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrU3R5bGUpO1xuICAgICAgfSk7XG4gICAgICBjb25zb2xlLmxvZygnSHVtYW4gd2luJyk7XG4gICAgICBzbWFsbFdpbi50ZXh0Q29udGVudCA9ICdQbGF5ZXIgd2luJztcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhjb21wdXRlckJvYXJkLnNoaXBSZWNvcmQpO1xuICAgIGNvbnNvbGUubG9nKGNvbXB1dGVyQm9hcmQuc3Vua1JlY29yZCk7XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGdyaWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgZ3JpZHNbaV0uY2xhc3NMaXN0LmFkZChgZ3JpZCR7aX1gKTtcbiAgICBncmlkc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrU3R5bGUpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDbGljaztcbiIsImNvbnN0IGNvbnZlcnRDb29yZCA9IChudW0gPSAwLCB4ID0gOSwgeSA9IDAsIHRhYmxlID0ge30pID0+IHtcbiAgaWYgKG51bSA+IDk5KSB7XG4gICAgcmV0dXJuIHRhYmxlO1xuICB9XG4gIGNvbnN0IGNvb3JkID0gW3gsIHldO1xuICB0YWJsZVtjb29yZF0gPSBudW07XG4gIGlmICh5ID09PSA5KSB7XG4gICAgeCAtPSAxO1xuICAgIHkgPSAtMTtcbiAgfVxuICByZXR1cm4gY29udmVydENvb3JkKG51bSArIDEsIHgsIHkgKyAxLCB0YWJsZSk7XG59O1xuXG5jb25zdCBjb252ZXJ0TnVtID0gKG51bSA9IDAsIHggPSA5LCB5ID0gMCwgdGFibGUgPSB7fSkgPT4ge1xuICBpZiAobnVtID4gOTkpIHtcbiAgICByZXR1cm4gdGFibGU7XG4gIH1cbiAgY29uc3QgY29vcmQgPSBbeCwgeV07XG4gIHRhYmxlW251bV0gPSBjb29yZDtcbiAgaWYgKHkgPT09IDkpIHtcbiAgICB4IC09IDE7XG4gICAgeSA9IC0xO1xuICB9XG4gIHJldHVybiBjb252ZXJ0TnVtKG51bSArIDEsIHgsIHkgKyAxLCB0YWJsZSk7XG59O1xuXG5leHBvcnQgeyBjb252ZXJ0Q29vcmQsIGNvbnZlcnROdW0gfTtcbiIsImltcG9ydCB7IGNvbnZlcnRDb29yZCB9IGZyb20gJy4vY29udmVydCc7XG5cbmNvbnN0IGFsbEdyaWRzID0gKCkgPT4ge1xuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbWFsbC1ncmlkJyk7XG4gIHJldHVybiBncmlkcztcbn07XG5cbmNvbnN0IGhpZ2hsaWdodEdyaWQgPSAoc2hpcHMpID0+IHtcbiAgY29uc3QgdGFyZ2V0cyA9IFtdO1xuICBjb25zdCBncmlkcyA9IGFsbEdyaWRzKCk7XG5cbiAgT2JqZWN0LmtleXMoc2hpcHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGNvbnN0IGNvb3JkcyA9IHNoaXBzW2tleV07XG4gICAgT2JqZWN0LmtleXMoY29vcmRzKS5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgdGFyZ2V0cy5wdXNoKGNvb3JkKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgY29uc3QgdGFibGUgPSBjb252ZXJ0Q29vcmQoKTtcblxuICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gdGFibGVbdGFyZ2V0XTtcbiAgICBncmlkc1tpbmRleF0uc3R5bGUuYm9yZGVyID0gJzJweCBjeWFuIHNvbGlkJztcbiAgfSk7XG59O1xuXG5jb25zdCBoaWdoQmlnID0gKHNoaXBzKSA9PiB7XG4gIGNvbnN0IHRhcmdldHMgPSBbXTtcbiAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmlnLWdyaWQnKTtcblxuICBPYmplY3Qua2V5cyhzaGlwcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgY29uc3QgY29vcmRzID0gc2hpcHNba2V5XTtcbiAgICBPYmplY3Qua2V5cyhjb29yZHMpLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICB0YXJnZXRzLnB1c2goY29vcmQpO1xuICAgIH0pO1xuICB9KTtcblxuICBjb25zdCB0YWJsZSA9IGNvbnZlcnRDb29yZCgpO1xuXG4gIHRhcmdldHMuZm9yRWFjaCgodGFyZ2V0KSA9PiB7XG4gICAgY29uc3QgaW5kZXggPSB0YWJsZVt0YXJnZXRdO1xuICAgIGdyaWRzW2luZGV4XS5zdHlsZS5ib3JkZXIgPSAnMnB4IGN5YW4gc29saWQnO1xuICB9KTtcbn07XG5cbmNvbnN0IGRpc3BsYXlIaXQgPSAoYm9hcmQpID0+IHtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGJvYXJkLmhpdFJlY29yZCk7XG4gIGNvbnN0IGNvb3JkID0gYm9hcmQuaGl0UmVjb3JkW2tleXNba2V5cy5sZW5ndGggLSAxXV07XG4gIGNvbnN0IHRhcmdldCA9IGJvYXJkLmZpbmRHcmlkKGJvYXJkLmZ1bGxCb2FyZCwgY29vcmRbMF0sIGNvb3JkWzFdKTtcblxuICBjb25zdCBncmlkcyA9IGFsbEdyaWRzKCk7XG4gIGNvbnN0IHRhYmxlID0gY29udmVydENvb3JkKCk7XG4gIGNvbnN0IGdyaWROdW0gPSB0YWJsZVtjb29yZF07XG5cbiAgaWYgKHRhcmdldC5taXNzID09PSB0cnVlKSB7XG4gICAgZ3JpZHNbZ3JpZE51bV0udGV4dENvbnRlbnQgPSAnWCc7XG4gICAgZ3JpZHNbZ3JpZE51bV0uc3R5bGUuZm9udFNpemUgPSAnMS41cmVtJztcbiAgICBncmlkc1tncmlkTnVtXS5zdHlsZS5jb2xvciA9ICd3aGl0ZXNtb2tlJztcbiAgfVxuICBpZiAodGFyZ2V0LnNoaXAgIT09IHVuZGVmaW5lZCkge1xuICAgIGdyaWRzW2dyaWROdW1dLnRleHRDb250ZW50ID0gJ1gnO1xuICAgIGdyaWRzW2dyaWROdW1dLnN0eWxlLmZvbnRTaXplID0gJzEuNXJlbSc7XG4gICAgZ3JpZHNbZ3JpZE51bV0uc3R5bGUuY29sb3IgPSAncmVkJztcbiAgfVxufTtcblxuZXhwb3J0IHsgaGlnaGxpZ2h0R3JpZCwgaGlnaEJpZywgZGlzcGxheUhpdCB9O1xuIiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwJztcblxuY29uc3QgR3JpZCA9ICh4LCB5LCB1cCwgcmlnaHQsIHNoaXAsIG1pc3MgPSBmYWxzZSkgPT4ge1xuICBjb25zdCBjb29yZCA9IFt4LCB5XTtcbiAgcmV0dXJuIHsgY29vcmQsIHVwLCByaWdodCwgc2hpcCwgbWlzcyB9O1xufTtcblxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBtYWtlQm9hcmQgPSAoeCA9IDAsIHkgPSAwKSA9PiB7XG4gICAgaWYgKHggPiA5IHx8IHkgPiA5KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBib2FyZCA9IEdyaWQoeCwgeSwgbWFrZUJvYXJkKHggKyAxLCB5KSwgbWFrZUJvYXJkKHgsIHkgKyAxKSk7XG5cbiAgICByZXR1cm4gYm9hcmQ7XG4gIH07XG5cbiAgY29uc3QgZmluZEdyaWQgPSAoZ3JpZCwgcCwgcSkgPT4ge1xuICAgIGlmIChncmlkLmNvb3JkWzBdICE9PSBwKSB7XG4gICAgICBncmlkID0gZ3JpZC51cDtcbiAgICAgIHJldHVybiBmaW5kR3JpZChncmlkLCBwLCBxKTtcbiAgICB9XG5cbiAgICBpZiAoZ3JpZC5jb29yZFswXSA9PT0gcCkge1xuICAgICAgaWYgKGdyaWQuY29vcmRbMV0gIT09IHEpIHtcbiAgICAgICAgZ3JpZCA9IGdyaWQucmlnaHQ7XG4gICAgICAgIHJldHVybiBmaW5kR3JpZChncmlkLCBwLCBxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGdyaWQ7XG4gIH07XG5cbiAgY29uc3Qgc3VydmV5R3JpZCA9ICh4LCB5LCBsZW5ndGgsIG9yaWVudCwgY291bnQgPSAwKSA9PiB7XG4gICAgaWYgKGNvdW50ID09PSBsZW5ndGgpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoZmluZEdyaWQoZnVsbEJvYXJkLCB4LCB5KS5zaGlwID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChvcmllbnQgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgcmV0dXJuIHN1cnZleUdyaWQoeCArIDEsIHksIGxlbmd0aCwgb3JpZW50LCBjb3VudCArIDEpO1xuICAgICAgfVxuICAgICAgaWYgKG9yaWVudCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIHJldHVybiBzdXJ2ZXlHcmlkKHgsIHkgKyAxLCBsZW5ndGgsIG9yaWVudCwgY291bnQgKyAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChcbiAgICB4LFxuICAgIHksXG4gICAgbGVuZ3RoLFxuICAgIG9yaWVudCxcbiAgICBjb3VudCA9IDAsXG4gICAgcmVjb3JkID0ge30sXG4gICAgY2hlY2tMZW5ndGggPSB0cnVlLFxuICAgIHN1cnZleSA9IG51bGxcbiAgKSA9PiB7XG4gICAgaWYgKGNoZWNrTGVuZ3RoID09PSB0cnVlKSB7XG4gICAgICBpZiAoeCArIGxlbmd0aCA+IDEwICYmIG9yaWVudCA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICByZXR1cm4gJ1NoaXAgb3ZlciBib3JkZXInO1xuICAgICAgfVxuICAgICAgaWYgKHkgKyBsZW5ndGggPiAxMCAmJiBvcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICByZXR1cm4gJ1NoaXAgb3ZlciBib3JkZXInO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXJ2ZXkgPT09IG51bGwpIHtcbiAgICAgIGlmIChvcmllbnQgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgc3VydmV5ID0gc3VydmV5R3JpZCh4LCB5LCBsZW5ndGgsICd2ZXJ0aWNhbCcpO1xuICAgICAgfVxuICAgICAgaWYgKG9yaWVudCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIHN1cnZleSA9IHN1cnZleUdyaWQoeCwgeSwgbGVuZ3RoLCAnaG9yaXpvbnRhbCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNoaXBOYW1lID0gZmxlZXRbbGVuZ3RoXTtcbiAgICBpZiAoc2hpcFJlY29yZFtzaGlwTmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuICdTaGlwIG5vdCBhdmFpbGFibGUnO1xuICAgIH1cblxuICAgIGlmIChjb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICBpZiAoc2hpcE5hbWUgPT09ICdEZXN0cm95ZXIxJykge1xuICAgICAgICBmbGVldFtsZW5ndGhdID0gJ0Rlc3Ryb3llcjInO1xuICAgICAgfVxuICAgICAgaWYgKHNoaXBOYW1lID09PSAnU3VibWFyaW5lMScpIHtcbiAgICAgICAgZmxlZXRbbGVuZ3RoXSA9ICdTdWJtYXJpbmUyJztcbiAgICAgIH1cbiAgICAgIHNoaXBSZWNvcmRbc2hpcE5hbWVdID0gcmVjb3JkO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChmaW5kR3JpZChmdWxsQm9hcmQsIHgsIHkpLnNoaXAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGBTcGFjZSBhbHJlYWR5IHRha2VuYDtcbiAgICB9XG5cbiAgICBpZiAob3JpZW50ID09PSAndmVydGljYWwnKSB7XG4gICAgICBpZiAoc3VydmV5ID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCwgeSk7XG4gICAgICAgIHRhcmdldC5zaGlwID0gU2hpcChsZW5ndGgpO1xuICAgICAgICBjb25zdCByZWNvcmRLZXkgPSB0YXJnZXQuY29vcmQ7XG4gICAgICAgIHJlY29yZFtyZWNvcmRLZXldID0gcmVjb3JkS2V5O1xuICAgICAgICBjaGVja0xlbmd0aCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gcGxhY2VTaGlwKFxuICAgICAgICAgIHggKyAxLFxuICAgICAgICAgIHksXG4gICAgICAgICAgbGVuZ3RoLFxuICAgICAgICAgIG9yaWVudCxcbiAgICAgICAgICBjb3VudCArIDEsXG4gICAgICAgICAgcmVjb3JkLFxuICAgICAgICAgIGNoZWNrTGVuZ3RoLFxuICAgICAgICAgIHN1cnZleVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKHN1cnZleSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGBTcGFjZSBhbHJlYWR5IHRha2VuYDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAob3JpZW50ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIGlmIChzdXJ2ZXkgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZmluZEdyaWQoZnVsbEJvYXJkLCB4LCB5KTtcbiAgICAgICAgdGFyZ2V0LnNoaXAgPSBTaGlwKGxlbmd0aCk7XG4gICAgICAgIGNvbnN0IHJlY29yZEtleSA9IHRhcmdldC5jb29yZDtcbiAgICAgICAgcmVjb3JkW3JlY29yZEtleV0gPSByZWNvcmRLZXk7XG4gICAgICAgIGNoZWNrTGVuZ3RoID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBwbGFjZVNoaXAoXG4gICAgICAgICAgeCxcbiAgICAgICAgICB5ICsgMSxcbiAgICAgICAgICBsZW5ndGgsXG4gICAgICAgICAgb3JpZW50LFxuICAgICAgICAgIGNvdW50ICsgMSxcbiAgICAgICAgICByZWNvcmQsXG4gICAgICAgICAgY2hlY2tMZW5ndGgsXG4gICAgICAgICAgc3VydmV5XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoc3VydmV5ID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gYFNwYWNlIGFscmVhZHkgdGFrZW5gO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBjaGVja1N1bmsgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2hpcEtleXMgPSBPYmplY3Qua2V5cyhzaGlwUmVjb3JkKTtcbiAgICBzaGlwS2V5cy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBjb25zdCBjb29yZE9iaiA9IHNoaXBSZWNvcmRbc2hpcF07XG4gICAgICBjb25zdCBjb29yZEtleXMgPSBPYmplY3Qua2V5cyhjb29yZE9iaik7XG4gICAgICBjb25zdCBjaGVja1NoaXAgPSBmaW5kR3JpZChcbiAgICAgICAgZnVsbEJvYXJkLFxuICAgICAgICBOdW1iZXIoY29vcmRLZXlzWzBdWzBdKSxcbiAgICAgICAgTnVtYmVyKGNvb3JkS2V5c1swXVsyXSlcbiAgICAgICk7XG4gICAgICBjaGVja1NoaXAuc2hpcC5jYWxTdW5rKCk7XG4gICAgICBpZiAoY2hlY2tTaGlwLnNoaXAuaXNTdW5rKCkgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKCFPYmplY3Qua2V5cyhzdW5rUmVjb3JkKS5pbmNsdWRlcyhzaGlwKSkge1xuICAgICAgICAgIHN1bmtSZWNvcmRbc2hpcF0gPSBzaGlwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoT2JqZWN0LmtleXMoc3Vua1JlY29yZCkubGVuZ3RoID09PSBzaGlwS2V5cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZmluZEdyaWQoZnVsbEJvYXJkLCB4LCB5KTtcbiAgICBjb25zdCBjb29yZCA9IFt4LCB5XTtcbiAgICBjb25zdCBhdHRhY2tTaGlwID0gW107XG5cbiAgICBpZiAodGFyZ2V0LnNoaXAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGhpdFJlY29yZFtjb29yZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBoaXRSZWNvcmRbY29vcmRdID0gY29vcmQ7XG4gICAgICAgIGNvbnN0IGZsZWV0ID0gT2JqZWN0LmtleXMoc2hpcFJlY29yZCk7XG4gICAgICAgIGZsZWV0LmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgICAgICBjb25zdCBjdXJyZW50U2hpcCA9IHNoaXBSZWNvcmRbc2hpcF07XG4gICAgICAgICAgaWYgKGN1cnJlbnRTaGlwW2Nvb3JkXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBhdHRhY2tTaGlwLnB1c2goc2hpcCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgYWxsQ29vcmQgPSBzaGlwUmVjb3JkW2F0dGFja1NoaXBbMF1dO1xuICAgICAgICBjb25zdCBhbGxLZXlzID0gT2JqZWN0LmtleXMoYWxsQ29vcmQpO1xuICAgICAgICBhbGxLZXlzLmZvckVhY2goKGtleXMpID0+IHtcbiAgICAgICAgICBjb25zdCBwcm9wZXJ0eSA9IGFsbENvb3JkW2tleXNdO1xuICAgICAgICAgIGNvbnN0IG9uZUhpdCA9IGZpbmRHcmlkKGZ1bGxCb2FyZCwgcHJvcGVydHlbMF0sIHByb3BlcnR5WzFdKTtcbiAgICAgICAgICBvbmVIaXQuc2hpcC5oaXQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKGhpdFJlY29yZFtjb29yZF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gJ1NoaXAgYWxyZWFkeSBoaXQnO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0YXJnZXQuc2hpcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAodGFyZ2V0Lm1pc3MgPT09IGZhbHNlKSB7XG4gICAgICAgIGhpdFJlY29yZFtjb29yZF0gPSBjb29yZDtcbiAgICAgICAgdGFyZ2V0Lm1pc3MgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICdIaXR0aW5nIGEgbWlzc2VkIHNob3QgYWdhaW4nO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBmdWxsQm9hcmQgPSBtYWtlQm9hcmQoKTtcbiAgY29uc3Qgc2hpcFJlY29yZCA9IHt9O1xuICBjb25zdCBoaXRSZWNvcmQgPSB7fTtcbiAgY29uc3Qgc3Vua1JlY29yZCA9IHt9O1xuICBjb25zdCBmbGVldCA9IHtcbiAgICA1OiAnQ2FycmllcicsXG4gICAgNDogJ0JhdHRsZXNoaXAnLFxuICAgIDM6ICdDcnVzaWVyJyxcbiAgICAyOiAnRGVzdHJveWVyMScsXG4gICAgMTogJ1N1Ym1hcmluZTEnLFxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZnVsbEJvYXJkLFxuICAgIHBsYWNlU2hpcCxcbiAgICBmaW5kR3JpZCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIHNoaXBSZWNvcmQsXG4gICAgaGl0UmVjb3JkLFxuICAgIGNoZWNrU3VuayxcbiAgICBzdW5rUmVjb3JkLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuIiwiY29uc3QgUGxheWVyID0gKGVuZW15Qm9hcmQsIGNvbXB1dGVyUGxheWVyLCBvd25Cb2FyZCkgPT4ge1xuICAvLyBBZGQgaHVtYW4gb25cbiAgLy8gSHVtYW4gb25seSBmb3IgdGVzdGluZywgcmVtb3ZlIGFmdGVyXG4gIGxldCBhaSA9IGZhbHNlO1xuXG4gIGNvbnN0IGNvbXB1dGVyT24gPSAoKSA9PiB7XG4gICAgYWkgPSB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IGNvbXB1dGVyID0gKCkgPT4gYWk7XG5cbiAgY29uc3QgYXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgaWYgKGNvbXB1dGVyUGxheWVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChjb21wdXRlclBsYXllci5jb21wdXRlcigpID09PSB0cnVlKSB7XG4gICAgICAgIC8vIGF1dG9Nb3ZlKCk7XG4gICAgICAgIGh1bWFuQXV0b01vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0UmFuZG9tSW50ID0gKG1pbiwgbWF4KSA9PiB7XG4gICAgbWluID0gTWF0aC5jZWlsKG1pbik7XG4gICAgbWF4ID0gTWF0aC5mbG9vcihtYXgpO1xuXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XG4gIH07XG5cbiAgLy8gQWRkIGF1dG9Nb3ZlIGlmIGh1bWFuIG9uLCB0YXJnZXQgY29vcmQgaW4gc2hpcCByZWNvcmRcbiAgLy8gSHVtYW4gYXV0b01vdmUgb25seSBmb3IgdGVzdGluZywgcmVtb3ZlIGFmdGVyXG4gIGNvbnN0IGh1bWFuQXV0b01vdmUgPSAoKSA9PiB7XG4gICAgY29uc3QgY29vcmRzID0gW107XG4gICAgY29uc3Qgc2hpcEtleXMgPSBPYmplY3Qua2V5cyhvd25Cb2FyZC5zaGlwUmVjb3JkKTtcbiAgICBjb25zdCBoaXRLZXlzID0gT2JqZWN0LmtleXMob3duQm9hcmQuaGl0UmVjb3JkKTtcbiAgICBzaGlwS2V5cy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBjb25zdCBjb29yZE9iaiA9IG93bkJvYXJkLnNoaXBSZWNvcmRbc2hpcF07XG4gICAgICBjb25zdCBjb29yZEtleXMgPSBPYmplY3Qua2V5cyhjb29yZE9iaik7XG4gICAgICBjb29yZEtleXMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgICAgY29vcmRzLnB1c2goY29vcmQpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBvd25Cb2FyZC5yZWNlaXZlQXR0YWNrKFxuICAgICAgTnVtYmVyKGNvb3Jkc1toaXRLZXlzLmxlbmd0aF1bMF0pLFxuICAgICAgTnVtYmVyKGNvb3Jkc1toaXRLZXlzLmxlbmd0aF1bMl0pXG4gICAgKTtcbiAgICBjb25zb2xlLmxvZyhjb29yZHMsIGNvb3Jkc1swXVswXSwgY29vcmRzWzBdWzJdLCBvd25Cb2FyZC5oaXRSZWNvcmQpO1xuICB9O1xuXG4gIGNvbnN0IGF1dG9Nb3ZlID0gKCkgPT4ge1xuICAgIGNvbnN0IHggPSBnZXRSYW5kb21JbnQoMCwgOSk7XG4gICAgY29uc3QgeSA9IGdldFJhbmRvbUludCgwLCA5KTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gb3duQm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcblxuICAgIGlmIChyZXNwb25zZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gYXV0b01vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgYXR0YWNrLCBjb21wdXRlck9uLCBjb21wdXRlciwgZ2V0UmFuZG9tSW50IH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCJjb25zdCBTaGlwID0gKGxlbmd0aCkgPT4ge1xuICBsZXQgc3VuayA9IGZhbHNlO1xuICBsZXQgdG90YWxIaXRzID0gMDtcblxuICBjb25zdCBoaXQgPSAoKSA9PiB7XG4gICAgdG90YWxIaXRzICs9IDE7XG4gIH07XG5cbiAgY29uc3QgY2FsU3VuayA9ICgpID0+IHtcbiAgICBpZiAobGVuZ3RoID09PSB0b3RhbEhpdHMpIHtcbiAgICAgIHN1bmsgPSB0cnVlO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoaXRzID0gKCkgPT4gdG90YWxIaXRzO1xuICBjb25zdCBpc1N1bmsgPSAoKSA9PiBzdW5rO1xuXG4gIHJldHVybiB7IGxlbmd0aCwgaGl0LCBjYWxTdW5rLCBoaXRzLCBpc1N1bmsgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcXG59XFxuXFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMzAsIDMwLCAzMCk7XFxufVxcblxcbi5jb250YWluZXIge1xcbiAgYm9yZGVyOiAxcHggc29pbGQgcmVkO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMWZyIDEwZnIgMWZyO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuLnRpdGxlLWRpdiB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBncmVlbnllbGxvdztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBncmlkLXJvdzogMSAvIDI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBjb2xvcjogZ3JheTtcXG4gIGZvbnQtc2l6ZTogMi41cmVtO1xcbn1cXG5cXG4uYm9hcmQtZGl2IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDVmciAxZnIgMWZyIDFmciA1ZnI7XFxuICB3aWR0aDogMTAwdnc7XFxuICAvKiBoZWlnaHQ6IGZpdC1jb250ZW50OyAqL1xcbiAgZ3JpZC1yb3c6IDIgLyAzO1xcbiAgY29sb3I6IHdoaXRlc21va2U7XFxufVxcblxcbi5zbWFsbC1jb250YWluZXIge1xcbiAgYm9yZGVyOiAycHggc29saWQgdG9tYXRvO1xcbiAgaGVpZ2h0OiBmaXQtY29udGVudDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ3JpZC1jb2x1bW46IDIgLyAzO1xcbn1cXG5cXG4uc21hbGwtYm9hcmQge1xcbiAgYm9yZGVyOiAycHggc29saWQgb3JhbmdlO1xcbiAgd2lkdGg6IDI1cmVtO1xcbiAgaGVpZ2h0OiAyNXJlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpO1xcblxcbn1cXG5cXG4uc21hbGwtbnVtLFxcbi5zbWFsbC1hcGwge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnNtYWxsLWdyaWQge1xcbiAgYm9yZGVyOiAycHggc29saWQgZ3JheTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufSBcXG5cXG4uc21hbGwtbmFtZSB7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxufVxcblxcbi5iaWctY29udGFpbmVyIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHRvbWF0bztcXG4gIGhlaWdodDogZml0LWNvbnRlbnQ7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdyaWQtY29sdW1uOiA0IC8gNTtcXG59XFxuXFxuLmJpZy1ib2FyZCB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBvcmFuZ2U7XFxuICB3aWR0aDogMzByZW07XFxuICBoZWlnaHQ6IDMwcmVtO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDExLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTEsIDFmcik7XFxufVxcblxcbi5iaWctbnVtLFxcbi5iaWctYWxwIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDEuMjVyZW07XFxufVxcblxcbi5iaWctZ3JpZCB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBncmF5O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGN1cnNvcjpwb2ludGVyXFxufSBcXG5cXG4uYmlnLW5hbWUge1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbn1cXG5cXG4ubWVzc2FnZSB7XFxuICBjb2xvcjogd2hpdGVzbW9rZTtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zbWFsbC13aW4sXFxuLmJpZy13aW4ge1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsVUFBVTtFQUNWLFNBQVM7RUFDVCxzQkFBc0I7RUFDdEIsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsaUNBQWlDO0FBQ25DOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLGFBQWE7RUFDYixnQ0FBZ0M7RUFDaEMsYUFBYTtBQUNmOztBQUVBO0VBQ0UsNkJBQTZCO0VBQzdCLGFBQWE7RUFDYixlQUFlO0VBQ2YsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsYUFBYTtFQUNiLDBDQUEwQztFQUMxQyxZQUFZO0VBQ1oseUJBQXlCO0VBQ3pCLGVBQWU7RUFDZixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSx3QkFBd0I7RUFDeEIsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usd0JBQXdCO0VBQ3hCLFlBQVk7RUFDWixhQUFhO0VBQ2IsYUFBYTtFQUNiLHNDQUFzQztFQUN0QyxtQ0FBbUM7O0FBRXJDOztBQUVBOztFQUVFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usd0JBQXdCO0VBQ3hCLG1CQUFtQjtFQUNuQixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHdCQUF3QjtFQUN4QixZQUFZO0VBQ1osYUFBYTtFQUNiLGFBQWE7RUFDYixzQ0FBc0M7RUFDdEMsbUNBQW1DO0FBQ3JDOztBQUVBOztFQUVFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQjtBQUNGOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGVBQWU7RUFDZixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjs7QUFFQTs7RUFFRSxrQkFBa0I7QUFDcEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigzMCwgMzAsIDMwKTtcXG59XFxuXFxuLmNvbnRhaW5lciB7XFxuICBib3JkZXI6IDFweCBzb2lsZCByZWQ7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgMTBmciAxZnI7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4udGl0bGUtZGl2IHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGdyZWVueWVsbG93O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdyaWQtcm93OiAxIC8gMjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGNvbG9yOiBncmF5O1xcbiAgZm9udC1zaXplOiAyLjVyZW07XFxufVxcblxcbi5ib2FyZC1kaXYge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogNWZyIDFmciAxZnIgMWZyIDVmcjtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIC8qIGhlaWdodDogZml0LWNvbnRlbnQ7ICovXFxuICBncmlkLXJvdzogMiAvIDM7XFxuICBjb2xvcjogd2hpdGVzbW9rZTtcXG59XFxuXFxuLnNtYWxsLWNvbnRhaW5lciB7XFxuICBib3JkZXI6IDJweCBzb2xpZCB0b21hdG87XFxuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBncmlkLWNvbHVtbjogMiAvIDM7XFxufVxcblxcbi5zbWFsbC1ib2FyZCB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBvcmFuZ2U7XFxuICB3aWR0aDogMjVyZW07XFxuICBoZWlnaHQ6IDI1cmVtO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDExLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTEsIDFmcik7XFxuXFxufVxcblxcbi5zbWFsbC1udW0sXFxuLnNtYWxsLWFwbCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uc21hbGwtZ3JpZCB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBncmF5O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59IFxcblxcbi5zbWFsbC1uYW1lIHtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG59XFxuXFxuLmJpZy1jb250YWluZXIge1xcbiAgYm9yZGVyOiAycHggc29saWQgdG9tYXRvO1xcbiAgaGVpZ2h0OiBmaXQtY29udGVudDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ3JpZC1jb2x1bW46IDQgLyA1O1xcbn1cXG5cXG4uYmlnLWJvYXJkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIG9yYW5nZTtcXG4gIHdpZHRoOiAzMHJlbTtcXG4gIGhlaWdodDogMzByZW07XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMSwgMWZyKTtcXG59XFxuXFxuLmJpZy1udW0sXFxuLmJpZy1hbHAge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcXG59XFxuXFxuLmJpZy1ncmlkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGdyYXk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgY3Vyc29yOnBvaW50ZXJcXG59IFxcblxcbi5iaWctbmFtZSB7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxufVxcblxcbi5tZXNzYWdlIHtcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnNtYWxsLXdpbixcXG4uYmlnLXdpbiB7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJztcbmltcG9ydCB7IGhpZ2hsaWdodEdyaWQsIGhpZ2hCaWcgfSBmcm9tICcuL2Rpc3BsYXktc2hpcHMnO1xuaW1wb3J0IGNyZWF0ZUNsaWNrIGZyb20gJy4vY2xpY2stYm9hcmQnO1xuXG5jb25zdCBwbGF5ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xuY29uc3QgY29tcHV0ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xuY29uc3QgY29tcHV0ZXJQbGF5ZXIgPSBQbGF5ZXIocGxheWVyQm9hcmQpO1xuY29tcHV0ZXJQbGF5ZXIuY29tcHV0ZXJPbigpO1xuY29uc3QgaHVtYW5QbGF5ZXIgPSBQbGF5ZXIoY29tcHV0ZXJCb2FyZCwgY29tcHV0ZXJQbGF5ZXIsIHBsYXllckJvYXJkKTtcblxuLy8gcGxheWVyQm9hcmQucGxhY2VTaGlwKDUsIDEsIDUsICd2ZXJ0aWNhbCcpO1xuLy8gcGxheWVyQm9hcmQucGxhY2VTaGlwKDQsIDMsIDQsICdob3Jpem9udGFsJyk7XG4vLyBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoNiwgNCwgMywgJ2hvcml6b250YWwnKTtcbi8vIHBsYXllckJvYXJkLnBsYWNlU2hpcCgxLCA3LCAyLCAndmVydGljYWwnKTtcbi8vIHBsYXllckJvYXJkLnBsYWNlU2hpcCg0LCA4LCAyLCAndmVydGljYWwnKTtcbnBsYXllckJvYXJkLnBsYWNlU2hpcCg5LCA5LCAxLCAndmVydGljYWwnKTtcbnBsYXllckJvYXJkLnBsYWNlU2hpcCg3LCA4LCAxLCAndmVydGljYWwnKTtcblxuaGlnaGxpZ2h0R3JpZChwbGF5ZXJCb2FyZC5zaGlwUmVjb3JkKTtcblxuLy8gY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMSwgMSwgNSwgJ3ZlcnRpY2FsJyk7XG4vLyBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCgzLCAzLCA0LCAndmVydGljYWwnKTtcbi8vIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDgsIDMsIDMsICdob3Jpem9udGFsJyk7XG4vLyBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCgxLCA1LCAyLCAndmVydGljYWwnKTtcbi8vIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDQsIDYsIDIsICd2ZXJ0aWNhbCcpO1xuY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMywgOSwgMSwgJ3ZlcnRpY2FsJyk7XG5jb21wdXRlckJvYXJkLnBsYWNlU2hpcCg3LCAwLCAxLCAndmVydGljYWwnKTtcblxuaGlnaEJpZyhjb21wdXRlckJvYXJkLnNoaXBSZWNvcmQpO1xuXG5jcmVhdGVDbGljayhodW1hblBsYXllciwgY29tcHV0ZXJCb2FyZCwgcGxheWVyQm9hcmQpO1xuXG4vLyBwbGF5ZXJCb2FyZC5yZWNlaXZlQXR0YWNrKDUsIDEpO1xuLy8gcGxheWVyQm9hcmQucmVjZWl2ZUF0dGFjayg0LCAzKTtcbi8vIHBsYXllckJvYXJkLnJlY2VpdmVBdHRhY2soNiwgNCk7XG4vLyBwbGF5ZXJCb2FyZC5yZWNlaXZlQXR0YWNrKDEsIDcpO1xuLy8gcGxheWVyQm9hcmQucmVjZWl2ZUF0dGFjayg0LCA4KTtcbi8vIHBsYXllckJvYXJkLnJlY2VpdmVBdHRhY2soOSwgOSk7XG4vLyBjb25zb2xlLmxvZyhwbGF5ZXJCb2FyZC5oaXRSZWNvcmQpO1xuLy8gcGxheWVyQm9hcmQucmVjZWl2ZUF0dGFjayg3LCA4KTtcbi8vIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbi8vICAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmlnLWdyaWQnKTtcbi8vICAgZ3JpZHNbaV0uY2xpY2soKTtcbi8vIH1cbi8vIE1ha2UgZW5lbXkgYm9hcmQgY2xpY2thYmxlLCBpbnZva2UgYXR0YWNrIGJ5IGNsaWNraW5nLFxuLy8gZGlzcGxheSB3aGV0aGVyIGhpdCBvciBtaXNzXG5cbi8vIE1ha2UgcGxheWVyIGJvYXJkIGRpc3BsYXkgd2hldGVyIGhpdCBvciBtaXNzXG4iXSwibmFtZXMiOlsiY29udmVydE51bSIsImRpc3BsYXlIaXQiLCJhbGxHcmlkcyIsImdyaWRzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZ3JpZEluZGV4IiwiZ3JpZCIsInJlIiwibnVtIiwiY2xhc3NOYW1lIiwiZ3JpZE51bSIsImV4ZWMiLCJzbGljZSIsImxlbmd0aCIsImNvb3JkIiwiY3JlYXRlQ2xpY2siLCJwbGF5ZXIiLCJjb21wdXRlckJvYXJkIiwicGxheWVyQm9hcmQiLCJzbWFsbFdpbiIsInF1ZXJ5U2VsZWN0b3IiLCJiaWdXaW4iLCJjbGlja1N0eWxlIiwidGFyZ2V0IiwiYXR0YWNrIiwicmVzdWx0IiwiZmluZEdyaWQiLCJmdWxsQm9hcmQiLCJtaXNzIiwidGV4dENvbnRlbnQiLCJzdHlsZSIsImZvbnRTaXplIiwiY29sb3IiLCJzaGlwIiwidW5kZWZpbmVkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImNvbXB1dGVyU3VuayIsImNoZWNrU3VuayIsInBsYXllclN1bmsiLCJmb3JFYWNoIiwiY29uc29sZSIsImxvZyIsInNoaXBSZWNvcmQiLCJzdW5rUmVjb3JkIiwiaSIsImNsYXNzTGlzdCIsImFkZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb252ZXJ0Q29vcmQiLCJhcmd1bWVudHMiLCJ4IiwieSIsInRhYmxlIiwiaGlnaGxpZ2h0R3JpZCIsInNoaXBzIiwidGFyZ2V0cyIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJjb29yZHMiLCJwdXNoIiwiaW5kZXgiLCJib3JkZXIiLCJoaWdoQmlnIiwiYm9hcmQiLCJoaXRSZWNvcmQiLCJTaGlwIiwiR3JpZCIsInVwIiwicmlnaHQiLCJHYW1lYm9hcmQiLCJtYWtlQm9hcmQiLCJwIiwicSIsInN1cnZleUdyaWQiLCJvcmllbnQiLCJjb3VudCIsInBsYWNlU2hpcCIsInJlY29yZCIsImNoZWNrTGVuZ3RoIiwic3VydmV5Iiwic2hpcE5hbWUiLCJmbGVldCIsInJlY29yZEtleSIsInNoaXBLZXlzIiwiY29vcmRPYmoiLCJjb29yZEtleXMiLCJjaGVja1NoaXAiLCJOdW1iZXIiLCJjYWxTdW5rIiwiaXNTdW5rIiwiaW5jbHVkZXMiLCJyZWNlaXZlQXR0YWNrIiwiYXR0YWNrU2hpcCIsImN1cnJlbnRTaGlwIiwiYWxsQ29vcmQiLCJhbGxLZXlzIiwicHJvcGVydHkiLCJvbmVIaXQiLCJoaXQiLCJQbGF5ZXIiLCJlbmVteUJvYXJkIiwiY29tcHV0ZXJQbGF5ZXIiLCJvd25Cb2FyZCIsImFpIiwiY29tcHV0ZXJPbiIsImNvbXB1dGVyIiwiaHVtYW5BdXRvTW92ZSIsImdldFJhbmRvbUludCIsIm1pbiIsIm1heCIsIk1hdGgiLCJjZWlsIiwiZmxvb3IiLCJyYW5kb20iLCJoaXRLZXlzIiwiYXV0b01vdmUiLCJyZXNwb25zZSIsInN1bmsiLCJ0b3RhbEhpdHMiLCJoaXRzIiwiaHVtYW5QbGF5ZXIiXSwic291cmNlUm9vdCI6IiJ9