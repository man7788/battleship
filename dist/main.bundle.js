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
/* harmony import */ var _convert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./convert */ "./src/convert.js");






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
    target.style.background = 'cyan';
    return hHover(target, hLength, count + 1, check);

    // console.log(
    //   Number(String(check[check.length - 1]).slice(-1)),
    //   Number(String(check[0]).slice(-1))
    // );
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
    target.style.background = 'none';

    // console.log(
    //   Number(String(check[check.length - 1]).slice(-1)),
    //   Number(String(check[0]).slice(-1))
    // );
    return hLeave(target, hLength, count + 1, check);
  };
};

// hoverGrid(1, 'vertical');
hoverGrid(5, 'horizontal');
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxNQUFBLFFBQUFrQyxTQUFBLFFBQUFiLFNBQUEsR0FBQWEsU0FBQSxNQUFHLENBQUM7SUFBQSxJQUFFd0YsS0FBSyxHQUFBeEYsU0FBQSxDQUFBbEMsTUFBQSxRQUFBa0MsU0FBQSxRQUFBYixTQUFBLEdBQUFhLFNBQUEsTUFBRyxFQUFFO0lBQ2xELElBQUk0QixLQUFLLEtBQUs5RCxNQUFNLEVBQUU7TUFDcEI7SUFDRjtJQUVBLElBQUlMLEdBQUcsR0FBRyxDQUFDO0lBRVgsSUFBSW1FLEtBQUssS0FBSyxDQUFDLEVBQUU7TUFDZm5FLEdBQUcsR0FBR2tGLE1BQU0sQ0FBQ3JGLFNBQVMsQ0FBQzhILElBQUksQ0FBQyxDQUFDO0lBQy9CO0lBRUEsSUFBSXhELEtBQUssR0FBRyxDQUFDLEVBQUU7TUFDYm5FLEdBQUcsR0FBR2tGLE1BQU0sQ0FBQ3JGLFNBQVMsQ0FBQzhILElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUNuQztJQUVBSSxLQUFLLENBQUM3RSxJQUFJLENBQUNsRCxHQUFHLENBQUM7SUFFZixNQUFNZSxNQUFNLEdBQUdwQixRQUFRLENBQUNpQixhQUFhLENBQUUsUUFBT1osR0FBSSxFQUFDLENBQUM7SUFDcERlLE1BQU0sQ0FBQ08sS0FBSyxDQUFDdUcsVUFBVSxHQUFHLE1BQU07O0lBRWhDO0lBQ0E7SUFDQTtJQUNBO0lBQ0EsT0FBT0gsTUFBTSxDQUFDM0csTUFBTSxFQUFFK0csT0FBTyxFQUFFM0QsS0FBSyxHQUFHLENBQUMsRUFBRTRELEtBQUssQ0FBQztFQUNsRCxDQUFDO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBVixTQUFTLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL2NsaWNrLWJvYXJkLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9jb252ZXJ0LmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9kaXNwbGF5LXNoaXBzLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL25wbS1zZXR1cC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL25wbS1zZXR1cC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25wbS1zZXR1cC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25wbS1zZXR1cC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25wbS1zZXR1cC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25wbS1zZXR1cC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbnZlcnROdW0gfSBmcm9tICcuL2NvbnZlcnQnO1xuaW1wb3J0IHsgZGlzcGxheUhpdCB9IGZyb20gJy4vZGlzcGxheS1zaGlwcyc7XG5cbmNvbnN0IGFsbEdyaWRzID0gKCkgPT4ge1xuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iaWctZ3JpZCcpO1xuICByZXR1cm4gZ3JpZHM7XG59O1xuXG5jb25zdCBncmlkSW5kZXggPSAoZ3JpZCkgPT4ge1xuICBjb25zdCByZSA9IC9bMC05XSsvO1xuICBjb25zdCBudW0gPSBncmlkLmNsYXNzTmFtZTtcbiAgY29uc3QgZ3JpZE51bSA9IHJlLmV4ZWMobnVtLnNsaWNlKG51bS5sZW5ndGggLSAyLCBudW0ubGVuZ3RoKSlbMF07XG4gIGNvbnN0IGNvb3JkID0gY29udmVydE51bSgpO1xuICByZXR1cm4gY29vcmRbZ3JpZE51bV07XG59O1xuXG5jb25zdCBjcmVhdGVDbGljayA9IChwbGF5ZXIsIGNvbXB1dGVyQm9hcmQsIHBsYXllckJvYXJkKSA9PiB7XG4gIGNvbnN0IGdyaWRzID0gYWxsR3JpZHMoKTtcbiAgY29uc3Qgc21hbGxXaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc21hbGwtd2luJyk7XG4gIGNvbnN0IGJpZ1dpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iaWctd2luJyk7XG5cbiAgZnVuY3Rpb24gY2xpY2tTdHlsZSgpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBncmlkSW5kZXgodGhpcyk7XG4gICAgcGxheWVyLmF0dGFjayh0YXJnZXRbMF0sIHRhcmdldFsxXSk7XG4gICAgY29uc3QgcmVzdWx0ID0gY29tcHV0ZXJCb2FyZC5maW5kR3JpZChcbiAgICAgIGNvbXB1dGVyQm9hcmQuZnVsbEJvYXJkLFxuICAgICAgdGFyZ2V0WzBdLFxuICAgICAgdGFyZ2V0WzFdXG4gICAgKTtcbiAgICBpZiAocmVzdWx0Lm1pc3MgPT09IHRydWUpIHtcbiAgICAgIHRoaXMudGV4dENvbnRlbnQgPSAnLyc7XG4gICAgICB0aGlzLnN0eWxlLmZvbnRTaXplID0gJzJyZW0nO1xuICAgICAgdGhpcy5zdHlsZS5jb2xvciA9ICd3aGl0ZXNtb2tlJztcbiAgICB9XG4gICAgaWYgKHJlc3VsdC5zaGlwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMudGV4dENvbnRlbnQgPSAnWCc7XG4gICAgICB0aGlzLnN0eWxlLmZvbnRTaXplID0gJzJyZW0nO1xuICAgICAgdGhpcy5zdHlsZS5jb2xvciA9ICdyZWQnO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tTdHlsZSk7XG5cbiAgICBjb25zdCBjb21wdXRlclN1bmsgPSBjb21wdXRlckJvYXJkLmNoZWNrU3VuaygpO1xuXG4gICAgaWYgKGNvbXB1dGVyU3VuayA9PT0gZmFsc2UpIHtcbiAgICAgIGRpc3BsYXlIaXQocGxheWVyQm9hcmQpO1xuICAgICAgY29uc3QgcGxheWVyU3VuayA9IHBsYXllckJvYXJkLmNoZWNrU3VuaygpO1xuICAgICAgaWYgKHBsYXllclN1bmsgPT09IHRydWUpIHtcbiAgICAgICAgZ3JpZHMuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgICAgICAgIGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja1N0eWxlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDb21wdXRlciB3aW4nKTtcbiAgICAgICAgYmlnV2luLnRleHRDb250ZW50ID0gJ09wcG9uZW50IFdpbic7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvbXB1dGVyU3VuayA9PT0gdHJ1ZSkge1xuICAgICAgZ3JpZHMuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgICAgICBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tTdHlsZSk7XG4gICAgICB9KTtcbiAgICAgIGNvbnNvbGUubG9nKCdIdW1hbiB3aW4nKTtcbiAgICAgIHNtYWxsV2luLnRleHRDb250ZW50ID0gJ1BsYXllciB3aW4nO1xuICAgIH1cblxuICAgIC8vIGNvbnNvbGUubG9nKGNvbXB1dGVyQm9hcmQuc2hpcFJlY29yZCk7XG4gICAgLy8gY29uc29sZS5sb2coY29tcHV0ZXJCb2FyZC5zdW5rUmVjb3JkKTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JpZHMubGVuZ3RoOyBpKyspIHtcbiAgICBncmlkc1tpXS5jbGFzc0xpc3QuYWRkKGBncmlkJHtpfWApO1xuICAgIGdyaWRzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tTdHlsZSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNsaWNrO1xuIiwiY29uc3QgY29udmVydENvb3JkID0gKG51bSA9IDAsIHggPSA5LCB5ID0gMCwgdGFibGUgPSB7fSkgPT4ge1xuICBpZiAobnVtID4gOTkpIHtcbiAgICByZXR1cm4gdGFibGU7XG4gIH1cbiAgY29uc3QgY29vcmQgPSBbeCwgeV07XG4gIHRhYmxlW2Nvb3JkXSA9IG51bTtcbiAgaWYgKHkgPT09IDkpIHtcbiAgICB4IC09IDE7XG4gICAgeSA9IC0xO1xuICB9XG4gIHJldHVybiBjb252ZXJ0Q29vcmQobnVtICsgMSwgeCwgeSArIDEsIHRhYmxlKTtcbn07XG5cbmNvbnN0IGNvbnZlcnROdW0gPSAobnVtID0gMCwgeCA9IDksIHkgPSAwLCB0YWJsZSA9IHt9KSA9PiB7XG4gIGlmIChudW0gPiA5OSkge1xuICAgIHJldHVybiB0YWJsZTtcbiAgfVxuICBjb25zdCBjb29yZCA9IFt4LCB5XTtcbiAgdGFibGVbbnVtXSA9IGNvb3JkO1xuICBpZiAoeSA9PT0gOSkge1xuICAgIHggLT0gMTtcbiAgICB5ID0gLTE7XG4gIH1cbiAgcmV0dXJuIGNvbnZlcnROdW0obnVtICsgMSwgeCwgeSArIDEsIHRhYmxlKTtcbn07XG5cbmV4cG9ydCB7IGNvbnZlcnRDb29yZCwgY29udmVydE51bSB9O1xuIiwiaW1wb3J0IHsgY29udmVydENvb3JkIH0gZnJvbSAnLi9jb252ZXJ0JztcblxuY29uc3QgYWxsR3JpZHMgPSAoKSA9PiB7XG4gIGNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNtYWxsLWdyaWQnKTtcbiAgcmV0dXJuIGdyaWRzO1xufTtcblxuY29uc3QgaGlnaExpZ2h0R3JpZCA9IChzaGlwcykgPT4ge1xuICBjb25zdCB0YXJnZXRzID0gW107XG4gIGNvbnN0IGdyaWRzID0gYWxsR3JpZHMoKTtcblxuICBPYmplY3Qua2V5cyhzaGlwcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgY29uc3QgY29vcmRzID0gc2hpcHNba2V5XTtcbiAgICBPYmplY3Qua2V5cyhjb29yZHMpLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICB0YXJnZXRzLnB1c2goY29vcmQpO1xuICAgIH0pO1xuICB9KTtcblxuICBjb25zdCB0YWJsZSA9IGNvbnZlcnRDb29yZCgpO1xuXG4gIHRhcmdldHMuZm9yRWFjaCgodGFyZ2V0KSA9PiB7XG4gICAgY29uc3QgaW5kZXggPSB0YWJsZVt0YXJnZXRdO1xuICAgIGdyaWRzW2luZGV4XS5zdHlsZS5ib3JkZXIgPSAnMnB4IGN5YW4gc29saWQnO1xuICB9KTtcbn07XG5cbmNvbnN0IGhpZ2hCaWcgPSAoc2hpcHMpID0+IHtcbiAgY29uc3QgdGFyZ2V0cyA9IFtdO1xuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iaWctZ3JpZCcpO1xuXG4gIE9iamVjdC5rZXlzKHNoaXBzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBjb25zdCBjb29yZHMgPSBzaGlwc1trZXldO1xuICAgIE9iamVjdC5rZXlzKGNvb3JkcykuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIHRhcmdldHMucHVzaChjb29yZCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGNvbnN0IHRhYmxlID0gY29udmVydENvb3JkKCk7XG5cbiAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IHRhYmxlW3RhcmdldF07XG4gICAgZ3JpZHNbaW5kZXhdLnN0eWxlLmJvcmRlciA9ICcycHggY3lhbiBzb2xpZCc7XG4gIH0pO1xufTtcblxuY29uc3QgZGlzcGxheUhpdCA9IChib2FyZCkgPT4ge1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoYm9hcmQuaGl0UmVjb3JkKTtcbiAgY29uc3QgY29vcmQgPSBib2FyZC5oaXRSZWNvcmRba2V5c1trZXlzLmxlbmd0aCAtIDFdXTtcbiAgY29uc3QgdGFyZ2V0ID0gYm9hcmQuZmluZEdyaWQoYm9hcmQuZnVsbEJvYXJkLCBjb29yZFswXSwgY29vcmRbMV0pO1xuXG4gIGNvbnN0IGdyaWRzID0gYWxsR3JpZHMoKTtcbiAgY29uc3QgdGFibGUgPSBjb252ZXJ0Q29vcmQoKTtcbiAgY29uc3QgZ3JpZE51bSA9IHRhYmxlW2Nvb3JkXTtcblxuICBpZiAodGFyZ2V0Lm1pc3MgPT09IHRydWUpIHtcbiAgICBncmlkc1tncmlkTnVtXS50ZXh0Q29udGVudCA9ICdYJztcbiAgICBncmlkc1tncmlkTnVtXS5zdHlsZS5mb250U2l6ZSA9ICcxLjVyZW0nO1xuICAgIGdyaWRzW2dyaWROdW1dLnN0eWxlLmNvbG9yID0gJ3doaXRlc21va2UnO1xuICB9XG4gIGlmICh0YXJnZXQuc2hpcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZ3JpZHNbZ3JpZE51bV0udGV4dENvbnRlbnQgPSAnWCc7XG4gICAgZ3JpZHNbZ3JpZE51bV0uc3R5bGUuZm9udFNpemUgPSAnMS41cmVtJztcbiAgICBncmlkc1tncmlkTnVtXS5zdHlsZS5jb2xvciA9ICdyZWQnO1xuICB9XG59O1xuXG5leHBvcnQgeyBoaWdoTGlnaHRHcmlkLCBoaWdoQmlnLCBkaXNwbGF5SGl0IH07XG4iLCJpbXBvcnQgU2hpcCBmcm9tICcuL3NoaXAnO1xuXG5jb25zdCBHcmlkID0gKHgsIHksIHVwLCByaWdodCwgc2hpcCwgbWlzcyA9IGZhbHNlLCBib3VuZGFyeSA9IGZhbHNlKSA9PiB7XG4gIGNvbnN0IGNvb3JkID0gW3gsIHldO1xuICByZXR1cm4geyBjb29yZCwgdXAsIHJpZ2h0LCBzaGlwLCBtaXNzLCBib3VuZGFyeSB9O1xufTtcblxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBtYWtlQm9hcmQgPSAoeCA9IDAsIHkgPSAwKSA9PiB7XG4gICAgaWYgKHggPiA5IHx8IHkgPiA5KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBib2FyZCA9IEdyaWQoeCwgeSwgbWFrZUJvYXJkKHggKyAxLCB5KSwgbWFrZUJvYXJkKHgsIHkgKyAxKSk7XG5cbiAgICByZXR1cm4gYm9hcmQ7XG4gIH07XG5cbiAgY29uc3QgZmluZEdyaWQgPSAoZ3JpZCwgcCwgcSkgPT4ge1xuICAgIGlmIChncmlkLmNvb3JkWzBdICE9PSBwKSB7XG4gICAgICBncmlkID0gZ3JpZC51cDtcbiAgICAgIHJldHVybiBmaW5kR3JpZChncmlkLCBwLCBxKTtcbiAgICB9XG5cbiAgICBpZiAoZ3JpZC5jb29yZFswXSA9PT0gcCkge1xuICAgICAgaWYgKGdyaWQuY29vcmRbMV0gIT09IHEpIHtcbiAgICAgICAgZ3JpZCA9IGdyaWQucmlnaHQ7XG4gICAgICAgIHJldHVybiBmaW5kR3JpZChncmlkLCBwLCBxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGdyaWQ7XG4gIH07XG5cbiAgY29uc3Qgc3VydmV5R3JpZCA9ICh4LCB5LCBsZW5ndGgsIG9yaWVudCwgY291bnQgPSAwKSA9PiB7XG4gICAgaWYgKGNvdW50ID09PSBsZW5ndGgpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoZmluZEdyaWQoZnVsbEJvYXJkLCB4LCB5KS5zaGlwID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChvcmllbnQgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgcmV0dXJuIHN1cnZleUdyaWQoeCArIDEsIHksIGxlbmd0aCwgb3JpZW50LCBjb3VudCArIDEpO1xuICAgICAgfVxuICAgICAgaWYgKG9yaWVudCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIHJldHVybiBzdXJ2ZXlHcmlkKHgsIHkgKyAxLCBsZW5ndGgsIG9yaWVudCwgY291bnQgKyAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlQm91bmRhcnkgPSAoeCwgeSkgPT4ge1xuICAgIGNvbnN0IGxpc3QgPSBbXTtcblxuICAgIGlmICh4ICsgMSA8IDEwKSB7XG4gICAgICBsaXN0LnB1c2goZmluZEdyaWQoZnVsbEJvYXJkLCB4ICsgMSwgeSkpO1xuICAgIH1cbiAgICBpZiAoeCAtIDEgPiAwKSB7XG4gICAgICBsaXN0LnB1c2goZmluZEdyaWQoZnVsbEJvYXJkLCB4IC0gMSwgeSkpO1xuICAgIH1cbiAgICBpZiAoeSAtIDEgPiAwKSB7XG4gICAgICBsaXN0LnB1c2goZmluZEdyaWQoZnVsbEJvYXJkLCB4LCB5IC0gMSkpO1xuICAgIH1cbiAgICBpZiAoeSArIDEgPCAxMCkge1xuICAgICAgbGlzdC5wdXNoKGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCwgeSArIDEpKTtcbiAgICB9XG5cbiAgICBpZiAoeCArIDEgPCAxMCAmJiB5IC0gMSA+IDApIHtcbiAgICAgIGxpc3QucHVzaChmaW5kR3JpZChmdWxsQm9hcmQsIHggKyAxLCB5IC0gMSkpO1xuICAgIH1cbiAgICBpZiAoeCArIDEgPCAxMCAmJiB5ICsgMSA8IDEwKSB7XG4gICAgICBsaXN0LnB1c2goZmluZEdyaWQoZnVsbEJvYXJkLCB4ICsgMSwgeSArIDEpKTtcbiAgICB9XG4gICAgaWYgKHggLSAxID4gMCAmJiB5IC0gMSA+IDApIHtcbiAgICAgIGxpc3QucHVzaChmaW5kR3JpZChmdWxsQm9hcmQsIHggLSAxLCB5IC0gMSkpO1xuICAgIH1cbiAgICBpZiAoeCAtIDEgPCAxMCAmJiB5ICsgMSA+IDEwKSB7XG4gICAgICBsaXN0LnB1c2goZmluZEdyaWQoZnVsbEJvYXJkLCB4IC0gMSwgeSArIDEpKTtcbiAgICB9XG5cbiAgICBsaXN0LmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIHNoaXAuYm91bmRhcnkgPSB0cnVlO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChcbiAgICB4LFxuICAgIHksXG4gICAgbGVuZ3RoLFxuICAgIG9yaWVudCxcbiAgICBjb3VudCA9IDAsXG4gICAgcmVjb3JkID0ge30sXG4gICAgY2hlY2tMZW5ndGggPSB0cnVlLFxuICAgIHN1cnZleSA9IG51bGxcbiAgKSA9PiB7XG4gICAgaWYgKGNoZWNrTGVuZ3RoID09PSB0cnVlKSB7XG4gICAgICBpZiAoeCArIGxlbmd0aCA+IDEwICYmIG9yaWVudCA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICByZXR1cm4gJ1NoaXAgb3ZlciBib3JkZXInO1xuICAgICAgfVxuICAgICAgaWYgKHkgKyBsZW5ndGggPiAxMCAmJiBvcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICByZXR1cm4gJ1NoaXAgb3ZlciBib3JkZXInO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXJ2ZXkgPT09IG51bGwpIHtcbiAgICAgIGlmIChvcmllbnQgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgc3VydmV5ID0gc3VydmV5R3JpZCh4LCB5LCBsZW5ndGgsICd2ZXJ0aWNhbCcpO1xuICAgICAgfVxuICAgICAgaWYgKG9yaWVudCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIHN1cnZleSA9IHN1cnZleUdyaWQoeCwgeSwgbGVuZ3RoLCAnaG9yaXpvbnRhbCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNoaXBOYW1lID0gZmxlZXRbbGVuZ3RoXTtcbiAgICBpZiAoc2hpcFJlY29yZFtzaGlwTmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuICdTaGlwIG5vdCBhdmFpbGFibGUnO1xuICAgIH1cblxuICAgIGlmIChjb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICBpZiAoc2hpcE5hbWUgPT09ICdEZXN0cm95ZXIxJykge1xuICAgICAgICBmbGVldFtsZW5ndGhdID0gJ0Rlc3Ryb3llcjInO1xuICAgICAgfVxuICAgICAgaWYgKHNoaXBOYW1lID09PSAnU3VibWFyaW5lMScpIHtcbiAgICAgICAgZmxlZXRbbGVuZ3RoXSA9ICdTdWJtYXJpbmUyJztcbiAgICAgIH1cbiAgICAgIHNoaXBSZWNvcmRbc2hpcE5hbWVdID0gcmVjb3JkO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChmaW5kR3JpZChmdWxsQm9hcmQsIHgsIHkpLnNoaXAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGBTcGFjZSBhbHJlYWR5IHRha2VuYDtcbiAgICB9XG5cbiAgICBpZiAob3JpZW50ID09PSAndmVydGljYWwnKSB7XG4gICAgICBpZiAoc3VydmV5ID09PSB0cnVlKSB7XG4gICAgICAgIC8vIHBsYWNlQm91bmRhcnkoeCwgeSk7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCwgeSk7XG4gICAgICAgIHRhcmdldC5zaGlwID0gU2hpcChsZW5ndGgsICd2ZXJ0aWNhbCcpO1xuICAgICAgICBjb25zdCByZWNvcmRLZXkgPSB0YXJnZXQuY29vcmQ7XG4gICAgICAgIHJlY29yZFtyZWNvcmRLZXldID0gcmVjb3JkS2V5O1xuICAgICAgICBjaGVja0xlbmd0aCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gcGxhY2VTaGlwKFxuICAgICAgICAgIHggKyAxLFxuICAgICAgICAgIHksXG4gICAgICAgICAgbGVuZ3RoLFxuICAgICAgICAgIG9yaWVudCxcbiAgICAgICAgICBjb3VudCArIDEsXG4gICAgICAgICAgcmVjb3JkLFxuICAgICAgICAgIGNoZWNrTGVuZ3RoLFxuICAgICAgICAgIHN1cnZleVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKHN1cnZleSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGBTcGFjZSBhbHJlYWR5IHRha2VuYDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAob3JpZW50ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIGlmIChzdXJ2ZXkgPT09IHRydWUpIHtcbiAgICAgICAgLy8gcGxhY2VCb3VuZGFyeSh4LCB5KTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZmluZEdyaWQoZnVsbEJvYXJkLCB4LCB5KTtcbiAgICAgICAgdGFyZ2V0LnNoaXAgPSBTaGlwKGxlbmd0aCwgJ2hvcml6b250YWwnKTtcbiAgICAgICAgY29uc3QgcmVjb3JkS2V5ID0gdGFyZ2V0LmNvb3JkO1xuICAgICAgICByZWNvcmRbcmVjb3JkS2V5XSA9IHJlY29yZEtleTtcbiAgICAgICAgY2hlY2tMZW5ndGggPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHBsYWNlU2hpcChcbiAgICAgICAgICB4LFxuICAgICAgICAgIHkgKyAxLFxuICAgICAgICAgIGxlbmd0aCxcbiAgICAgICAgICBvcmllbnQsXG4gICAgICAgICAgY291bnQgKyAxLFxuICAgICAgICAgIHJlY29yZCxcbiAgICAgICAgICBjaGVja0xlbmd0aCxcbiAgICAgICAgICBzdXJ2ZXlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdXJ2ZXkgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBgU3BhY2UgYWxyZWFkeSB0YWtlbmA7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNoZWNrU3VuayA9ICgpID0+IHtcbiAgICBjb25zdCBzaGlwS2V5cyA9IE9iamVjdC5rZXlzKHNoaXBSZWNvcmQpO1xuICAgIHNoaXBLZXlzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIGNvbnN0IGNvb3JkT2JqID0gc2hpcFJlY29yZFtzaGlwXTtcbiAgICAgIGNvbnN0IGNvb3JkS2V5cyA9IE9iamVjdC5rZXlzKGNvb3JkT2JqKTtcbiAgICAgIGNvbnN0IGNoZWNrU2hpcCA9IGZpbmRHcmlkKFxuICAgICAgICBmdWxsQm9hcmQsXG4gICAgICAgIE51bWJlcihjb29yZEtleXNbMF1bMF0pLFxuICAgICAgICBOdW1iZXIoY29vcmRLZXlzWzBdWzJdKVxuICAgICAgKTtcbiAgICAgIGNoZWNrU2hpcC5zaGlwLmNhbFN1bmsoKTtcbiAgICAgIGlmIChjaGVja1NoaXAuc2hpcC5pc1N1bmsoKSA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoIU9iamVjdC5rZXlzKHN1bmtSZWNvcmQpLmluY2x1ZGVzKHNoaXApKSB7XG4gICAgICAgICAgc3Vua1JlY29yZFtzaGlwXSA9IHNoaXA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChPYmplY3Qua2V5cyhzdW5rUmVjb3JkKS5sZW5ndGggPT09IHNoaXBLZXlzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBmaW5kR3JpZChmdWxsQm9hcmQsIHgsIHkpO1xuICAgIGNvbnN0IGNvb3JkID0gW3gsIHldO1xuICAgIGNvbnN0IGF0dGFja1NoaXAgPSBbXTtcblxuICAgIGlmICh0YXJnZXQuc2hpcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoaGl0UmVjb3JkW2Nvb3JkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGhpdFJlY29yZFtjb29yZF0gPSBjb29yZDtcbiAgICAgICAgY29uc3QgZmxlZXQgPSBPYmplY3Qua2V5cyhzaGlwUmVjb3JkKTtcbiAgICAgICAgZmxlZXQuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnRTaGlwID0gc2hpcFJlY29yZFtzaGlwXTtcbiAgICAgICAgICBpZiAoY3VycmVudFNoaXBbY29vcmRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGF0dGFja1NoaXAucHVzaChzaGlwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBhbGxDb29yZCA9IHNoaXBSZWNvcmRbYXR0YWNrU2hpcFswXV07XG4gICAgICAgIGNvbnN0IGFsbEtleXMgPSBPYmplY3Qua2V5cyhhbGxDb29yZCk7XG4gICAgICAgIGFsbEtleXMuZm9yRWFjaCgoa2V5cykgPT4ge1xuICAgICAgICAgIGNvbnN0IHByb3BlcnR5ID0gYWxsQ29vcmRba2V5c107XG4gICAgICAgICAgY29uc3Qgb25lSGl0ID0gZmluZEdyaWQoZnVsbEJvYXJkLCBwcm9wZXJ0eVswXSwgcHJvcGVydHlbMV0pO1xuICAgICAgICAgIG9uZUhpdC5zaGlwLmhpdCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoaGl0UmVjb3JkW2Nvb3JkXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiAnU2hpcCBhbHJlYWR5IGhpdCc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRhcmdldC5zaGlwID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0YXJnZXQubWlzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgaGl0UmVjb3JkW2Nvb3JkXSA9IGNvb3JkO1xuICAgICAgICB0YXJnZXQubWlzcyA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gJ0hpdHRpbmcgYSBtaXNzZWQgc2hvdCBhZ2Fpbic7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGZ1bGxCb2FyZCA9IG1ha2VCb2FyZCgpO1xuICBjb25zdCBzaGlwUmVjb3JkID0ge307XG4gIGNvbnN0IGhpdFJlY29yZCA9IHt9O1xuICBjb25zdCBzdW5rUmVjb3JkID0ge307XG4gIGNvbnN0IGZsZWV0ID0ge1xuICAgIDU6ICdDYXJyaWVyJyxcbiAgICA0OiAnQmF0dGxlc2hpcCcsXG4gICAgMzogJ0NydXNpZXInLFxuICAgIDI6ICdEZXN0cm95ZXIxJyxcbiAgICAxOiAnU3VibWFyaW5lMScsXG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBmdWxsQm9hcmQsXG4gICAgcGxhY2VTaGlwLFxuICAgIGZpbmRHcmlkLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgc2hpcFJlY29yZCxcbiAgICBoaXRSZWNvcmQsXG4gICAgY2hlY2tTdW5rLFxuICAgIHN1bmtSZWNvcmQsXG4gICAgcGxhY2VCb3VuZGFyeSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImNvbnN0IFBsYXllciA9IChlbmVteUJvYXJkLCBjb21wdXRlclBsYXllciwgb3duQm9hcmQpID0+IHtcbiAgLy8gQWRkIGh1bWFuIG9uXG4gIC8vIEh1bWFuIG9ubHkgZm9yIHRlc3RpbmcsIHJlbW92ZSBhZnRlclxuICBsZXQgYWkgPSBmYWxzZTtcblxuICBjb25zdCBjb21wdXRlck9uID0gKCkgPT4ge1xuICAgIGFpID0gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBjb21wdXRlciA9ICgpID0+IGFpO1xuXG4gIGNvbnN0IGF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIGlmIChjb21wdXRlclBsYXllciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoY29tcHV0ZXJQbGF5ZXIuY29tcHV0ZXIoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAvLyBhdXRvTW92ZSgpO1xuICAgICAgICBodW1hbkF1dG9Nb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldFJhbmRvbUludCA9IChtaW4sIG1heCkgPT4ge1xuICAgIG1pbiA9IE1hdGguY2VpbChtaW4pO1xuICAgIG1heCA9IE1hdGguZmxvb3IobWF4KTtcblxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xuICB9O1xuXG4gIC8vIEFkZCBhdXRvTW92ZSBpZiBodW1hbiBvbiwgdGFyZ2V0IGNvb3JkIGluIHNoaXAgcmVjb3JkXG4gIC8vIEh1bWFuIGF1dG9Nb3ZlIG9ubHkgZm9yIHRlc3RpbmcsIHJlbW92ZSBhZnRlclxuICBjb25zdCBodW1hbkF1dG9Nb3ZlID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvb3JkcyA9IFtdO1xuICAgIGNvbnN0IHNoaXBLZXlzID0gT2JqZWN0LmtleXMob3duQm9hcmQuc2hpcFJlY29yZCk7XG4gICAgY29uc3QgaGl0S2V5cyA9IE9iamVjdC5rZXlzKG93bkJvYXJkLmhpdFJlY29yZCk7XG4gICAgc2hpcEtleXMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgY29uc3QgY29vcmRPYmogPSBvd25Cb2FyZC5zaGlwUmVjb3JkW3NoaXBdO1xuICAgICAgY29uc3QgY29vcmRLZXlzID0gT2JqZWN0LmtleXMoY29vcmRPYmopO1xuICAgICAgY29vcmRLZXlzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICAgIGNvb3Jkcy5wdXNoKGNvb3JkKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgb3duQm9hcmQucmVjZWl2ZUF0dGFjayhcbiAgICAgIE51bWJlcihjb29yZHNbaGl0S2V5cy5sZW5ndGhdWzBdKSxcbiAgICAgIE51bWJlcihjb29yZHNbaGl0S2V5cy5sZW5ndGhdWzJdKVxuICAgICk7XG4gICAgLy8gY29uc29sZS5sb2coY29vcmRzLCBjb29yZHNbMF1bMF0sIGNvb3Jkc1swXVsyXSwgb3duQm9hcmQuaGl0UmVjb3JkKTtcbiAgfTtcblxuICBjb25zdCBhdXRvTW92ZSA9ICgpID0+IHtcbiAgICBjb25zdCB4ID0gZ2V0UmFuZG9tSW50KDAsIDkpO1xuICAgIGNvbnN0IHkgPSBnZXRSYW5kb21JbnQoMCwgOSk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IG93bkJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG5cbiAgICBpZiAocmVzcG9uc2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGF1dG9Nb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IGF0dGFjaywgY29tcHV0ZXJPbiwgY29tcHV0ZXIsIGdldFJhbmRvbUludCB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiY29uc3QgU2hpcCA9IChsZW5ndGgsIG9yaWVudCkgPT4ge1xuICBsZXQgc3VuayA9IGZhbHNlO1xuICBsZXQgdG90YWxIaXRzID0gMDtcblxuICBjb25zdCBoaXQgPSAoKSA9PiB7XG4gICAgdG90YWxIaXRzICs9IDE7XG4gIH07XG5cbiAgY29uc3QgY2FsU3VuayA9ICgpID0+IHtcbiAgICBpZiAobGVuZ3RoID09PSB0b3RhbEhpdHMpIHtcbiAgICAgIHN1bmsgPSB0cnVlO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoaXRzID0gKCkgPT4gdG90YWxIaXRzO1xuICBjb25zdCBpc1N1bmsgPSAoKSA9PiBzdW5rO1xuXG4gIHJldHVybiB7IGxlbmd0aCwgaGl0LCBjYWxTdW5rLCBoaXRzLCBpc1N1bmssIG9yaWVudCB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKiB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigzMCwgMzAsIDMwKTtcXG59XFxuXFxuLmNvbnRhaW5lciB7XFxuICBib3JkZXI6IDFweCBzb2lsZCByZWQ7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgMTBmciAxZnI7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4udGl0bGUtZGl2IHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGdyZWVueWVsbG93O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdyaWQtcm93OiAxIC8gMjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGNvbG9yOiBncmF5O1xcbiAgZm9udC1zaXplOiAyLjVyZW07XFxufVxcblxcbi5ib2FyZC1kaXYge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogNWZyIDFmciAxZnIgMWZyIDVmcjtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIC8qIGhlaWdodDogZml0LWNvbnRlbnQ7ICovXFxuICBncmlkLXJvdzogMiAvIDM7XFxuICBjb2xvcjogd2hpdGVzbW9rZTtcXG59XFxuXFxuLnNtYWxsLWNvbnRhaW5lciB7XFxuICBib3JkZXI6IDJweCBzb2xpZCB0b21hdG87XFxuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBncmlkLWNvbHVtbjogMiAvIDM7XFxufVxcblxcbi5zbWFsbC1ib2FyZCB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBvcmFuZ2U7XFxuICB3aWR0aDogMjVyZW07XFxuICBoZWlnaHQ6IDI1cmVtO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDExLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTEsIDFmcik7XFxuXFxufVxcblxcbi5zbWFsbC1udW0sXFxuLnNtYWxsLWFwbCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uc21hbGwtZ3JpZCB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBncmF5O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59IFxcblxcbi8qIC5zbWFsbC1ncmlkW3N0eWxlPVxcXCJib3JkZXI6IDJweCBzb2xpZCBjeWFuO1xcXCJdIHtcXG4gIGN1cnNvcjpwb2ludGVyXFxufSAqL1xcblxcbi5zbWFsbC1uYW1lLFxcbi5zbWFsbC13aW4ge1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbn1cXG5cXG4uYmlnLWNvbnRhaW5lciB7XFxuICBib3JkZXI6IDJweCBzb2xpZCB0b21hdG87XFxuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBncmlkLWNvbHVtbjogNCAvIDU7XFxufVxcblxcbi5iaWctYm9hcmQge1xcbiAgYm9yZGVyOiAycHggc29saWQgb3JhbmdlO1xcbiAgd2lkdGg6IDMwcmVtO1xcbiAgaGVpZ2h0OiAzMHJlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpO1xcbn1cXG5cXG4uYmlnLW51bSxcXG4uYmlnLWFscCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xcbn1cXG5cXG4uYmlnLWdyaWQge1xcbiAgYm9yZGVyOiAycHggc29saWQgZ3JheTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBjdXJzb3I6cG9pbnRlclxcbn0gXFxuXFxuLmJpZy1uYW1lIHtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG59XFxuXFxuLm1lc3NhZ2Uge1xcbiAgY29sb3I6IHdoaXRlc21va2U7XFxuICBmb250LXNpemU6IDFyZW07XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uc21hbGwtd2luLFxcbi5iaWctd2luIHtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLFVBQVU7RUFDVixTQUFTO0VBQ1Qsc0JBQXNCO0VBQ3RCLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGlDQUFpQztBQUNuQzs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixhQUFhO0VBQ2IsZ0NBQWdDO0VBQ2hDLGFBQWE7QUFDZjs7QUFFQTtFQUNFLDZCQUE2QjtFQUM3QixhQUFhO0VBQ2IsZUFBZTtFQUNmLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsV0FBVztFQUNYLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGFBQWE7RUFDYiwwQ0FBMEM7RUFDMUMsWUFBWTtFQUNaLHlCQUF5QjtFQUN6QixlQUFlO0VBQ2YsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0Usd0JBQXdCO0VBQ3hCLG1CQUFtQjtFQUNuQixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHdCQUF3QjtFQUN4QixZQUFZO0VBQ1osYUFBYTtFQUNiLGFBQWE7RUFDYixzQ0FBc0M7RUFDdEMsbUNBQW1DOztBQUVyQzs7QUFFQTs7RUFFRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjs7QUFFQTs7R0FFRzs7QUFFSDs7RUFFRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSx3QkFBd0I7RUFDeEIsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usd0JBQXdCO0VBQ3hCLFlBQVk7RUFDWixhQUFhO0VBQ2IsYUFBYTtFQUNiLHNDQUFzQztFQUN0QyxtQ0FBbUM7QUFDckM7O0FBRUE7O0VBRUUsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsZUFBZTtFQUNmLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBOztFQUVFLGtCQUFrQjtBQUNwQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XFxufVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDMwLCAzMCwgMzApO1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gIGJvcmRlcjogMXB4IHNvaWxkIHJlZDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciAxMGZyIDFmcjtcXG4gIGhlaWdodDogMTAwdmg7XFxufVxcblxcbi50aXRsZS1kaXYge1xcbiAgYm9yZGVyOiAycHggc29saWQgZ3JlZW55ZWxsb3c7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ3JpZC1yb3c6IDEgLyAyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgY29sb3I6IGdyYXk7XFxuICBmb250LXNpemU6IDIuNXJlbTtcXG59XFxuXFxuLmJvYXJkLWRpdiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA1ZnIgMWZyIDFmciAxZnIgNWZyO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgLyogaGVpZ2h0OiBmaXQtY29udGVudDsgKi9cXG4gIGdyaWQtcm93OiAyIC8gMztcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbn1cXG5cXG4uc21hbGwtY29udGFpbmVyIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHRvbWF0bztcXG4gIGhlaWdodDogZml0LWNvbnRlbnQ7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdyaWQtY29sdW1uOiAyIC8gMztcXG59XFxuXFxuLnNtYWxsLWJvYXJkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIG9yYW5nZTtcXG4gIHdpZHRoOiAyNXJlbTtcXG4gIGhlaWdodDogMjVyZW07XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMSwgMWZyKTtcXG5cXG59XFxuXFxuLnNtYWxsLW51bSxcXG4uc21hbGwtYXBsIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zbWFsbC1ncmlkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGdyYXk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn0gXFxuXFxuLyogLnNtYWxsLWdyaWRbc3R5bGU9XFxcImJvcmRlcjogMnB4IHNvbGlkIGN5YW47XFxcIl0ge1xcbiAgY3Vyc29yOnBvaW50ZXJcXG59ICovXFxuXFxuLnNtYWxsLW5hbWUsXFxuLnNtYWxsLXdpbiB7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxufVxcblxcbi5iaWctY29udGFpbmVyIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHRvbWF0bztcXG4gIGhlaWdodDogZml0LWNvbnRlbnQ7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdyaWQtY29sdW1uOiA0IC8gNTtcXG59XFxuXFxuLmJpZy1ib2FyZCB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBvcmFuZ2U7XFxuICB3aWR0aDogMzByZW07XFxuICBoZWlnaHQ6IDMwcmVtO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDExLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTEsIDFmcik7XFxufVxcblxcbi5iaWctbnVtLFxcbi5iaWctYWxwIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDEuMjVyZW07XFxufVxcblxcbi5iaWctZ3JpZCB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBncmF5O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGN1cnNvcjpwb2ludGVyXFxufSBcXG5cXG4uYmlnLW5hbWUge1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbn1cXG5cXG4ubWVzc2FnZSB7XFxuICBjb2xvcjogd2hpdGVzbW9rZTtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zbWFsbC13aW4sXFxuLmJpZy13aW4ge1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgeyBoaWdoTGlnaHRHcmlkLCBoaWdoQmlnIH0gZnJvbSAnLi9kaXNwbGF5LXNoaXBzJztcbmltcG9ydCBjcmVhdGVDbGljayBmcm9tICcuL2NsaWNrLWJvYXJkJztcbmltcG9ydCB7IGNvbnZlcnROdW0sIGNvbnZlcnRDb29yZCB9IGZyb20gJy4vY29udmVydCc7XG4vLyBpbXBvcnQgcm90YXRlU2hpcCBmcm9tICcuL3JvdGF0ZSc7XG5cbmNvbnN0IHBsYXllckJvYXJkID0gR2FtZWJvYXJkKCk7XG5jb25zdCBjb21wdXRlckJvYXJkID0gR2FtZWJvYXJkKCk7XG5jb25zdCBjb21wdXRlclBsYXllciA9IFBsYXllcihwbGF5ZXJCb2FyZCk7XG5jb21wdXRlclBsYXllci5jb21wdXRlck9uKCk7XG5jb25zdCBodW1hblBsYXllciA9IFBsYXllcihjb21wdXRlckJvYXJkLCBjb21wdXRlclBsYXllciwgcGxheWVyQm9hcmQpO1xuXG4vLyBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoNCwgMSwgNSwgJ3ZlcnRpY2FsJyk7XG4vLyBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoMiwgMSwgNCwgJ2hvcml6b250YWwnKTtcbi8vIHBsYXllckJvYXJkLnBsYWNlU2hpcCg2LCA0LCAzLCAnaG9yaXpvbnRhbCcpO1xucGxheWVyQm9hcmQucGxhY2VTaGlwKDEsIDcsIDIsICd2ZXJ0aWNhbCcpO1xuLy8gcGxheWVyQm9hcmQucGxhY2VTaGlwKDksIDksIDEsICd2ZXJ0aWNhbCcpO1xuLy8gcGxheWVyQm9hcmQucGxhY2VTaGlwKDcsIDgsIDEsICd2ZXJ0aWNhbCcpO1xuLy8gcGxheWVyQm9hcmQucGxhY2VTaGlwKDksIDUsIDMsICdob3Jpem9udGFsJyk7XG4vLyBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoMiwgNCwgMiwgJ2hvcml6b250YWwnKTtcblxuaGlnaExpZ2h0R3JpZChwbGF5ZXJCb2FyZC5zaGlwUmVjb3JkKTtcblxuLy8gY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMSwgMSwgNSwgJ3ZlcnRpY2FsJyk7XG4vLyBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCgzLCAzLCA0LCAndmVydGljYWwnKTtcbmNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDgsIDMsIDMsICdob3Jpem9udGFsJyk7XG4vLyBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCgxLCA1LCAyLCAndmVydGljYWwnKTtcbi8vIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDQsIDYsIDIsICd2ZXJ0aWNhbCcpO1xuLy8gY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMywgOSwgMSwgJ3ZlcnRpY2FsJyk7XG4vLyBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCg3LCAwLCAxLCAndmVydGljYWwnKTtcblxuaGlnaEJpZyhjb21wdXRlckJvYXJkLnNoaXBSZWNvcmQpO1xuXG5jcmVhdGVDbGljayhodW1hblBsYXllciwgY29tcHV0ZXJCb2FyZCwgcGxheWVyQm9hcmQpO1xuXG4vLyByb3RhdGVTaGlwKHBsYXllckJvYXJkLnNoaXBSZWNvcmQsIHBsYXllckJvYXJkKTtcblxuLy8gTWFrZSBncmlkIGhvdmVyIGFjY29yZGluZyB0byBjdXJyZW50IHNoaXAgbGVuZ3RoXG5jb25zdCBob3ZlckdyaWQgPSAobGVuZ3RoLCBvcmllbnQpID0+IHtcbiAgY29uc3QgYWxsR3JpZHMgPSAoKSA9PiB7XG4gICAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc21hbGwtZ3JpZCcpO1xuICAgIHJldHVybiBncmlkcztcbiAgfTtcblxuICBjb25zdCBncmlkSW5kZXggPSAoZ3JpZCkgPT4ge1xuICAgIGNvbnN0IHJlID0gL1swLTldKy87XG4gICAgY29uc3QgbnVtID0gZ3JpZC5jbGFzc05hbWU7XG4gICAgY29uc3QgZ3JpZE51bSA9IHJlLmV4ZWMobnVtLnNsaWNlKG51bS5sZW5ndGggLSAyLCBudW0ubGVuZ3RoKSlbMF07XG4gICAgcmV0dXJuIGdyaWROdW07XG4gIH07XG5cbiAgY29uc3QgZ3JpZHMgPSBhbGxHcmlkcygpO1xuXG4gIGlmIChvcmllbnQgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyaWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBncmlkc1tpXS5jbGFzc0xpc3QuYWRkKGBncmlkJHtpfWApO1xuICAgICAgZ3JpZHNbaV0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKGUpID0+IHtcbiAgICAgICAgdkhvdmVyKGUudGFyZ2V0LCBsZW5ndGgpO1xuICAgICAgfSk7XG4gICAgICBncmlkc1tpXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKGUpID0+IHtcbiAgICAgICAgdkxlYXZlKGUudGFyZ2V0LCBsZW5ndGgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKG9yaWVudCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkcy5sZW5ndGg7IGkrKykge1xuICAgICAgZ3JpZHNbaV0uY2xhc3NMaXN0LmFkZChgZ3JpZCR7aX1gKTtcbiAgICAgIGdyaWRzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChlKSA9PiB7XG4gICAgICAgIGhIb3ZlcihlLnRhcmdldCwgbGVuZ3RoKTtcbiAgICAgIH0pO1xuICAgICAgZ3JpZHNbaV0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIChlKSA9PiB7XG4gICAgICAgIGhMZWF2ZShlLnRhcmdldCwgbGVuZ3RoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIFZlcnRpY2FsXG4gIGNvbnN0IHZIb3ZlciA9IChiYXNlLCB2TGVuZ3RoLCBjb3VudCA9IDApID0+IHtcbiAgICBpZiAoY291bnQgPT09IGxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBudW0gPSAwO1xuXG4gICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICBudW0gPSBOdW1iZXIoZ3JpZEluZGV4KGJhc2UpKTtcbiAgICB9XG5cbiAgICBpZiAoY291bnQgPiAwKSB7XG4gICAgICBudW0gPSBOdW1iZXIoZ3JpZEluZGV4KGJhc2UpKSAtIDEwO1xuICAgIH1cblxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5ncmlkJHtudW19YCk7XG5cbiAgICBpZiAodGFyZ2V0ICE9PSBudWxsKSB7XG4gICAgICB0YXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9ICdjeWFuJztcbiAgICAgIHJldHVybiB2SG92ZXIodGFyZ2V0LCB2TGVuZ3RoLCBjb3VudCArIDEpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCB2TGVhdmUgPSAoYmFzZSwgdkxlbmd0aCwgY291bnQgPSAwKSA9PiB7XG4gICAgaWYgKGNvdW50ID09PSBsZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgbnVtID0gMDtcblxuICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgbnVtID0gTnVtYmVyKGdyaWRJbmRleChiYXNlKSk7XG4gICAgfVxuXG4gICAgaWYgKGNvdW50ID4gMCkge1xuICAgICAgbnVtID0gTnVtYmVyKGdyaWRJbmRleChiYXNlKSkgLSAxMDtcbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuZ3JpZCR7bnVtfWApO1xuXG4gICAgaWYgKHRhcmdldCAhPT0gbnVsbCkge1xuICAgICAgdGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSAnbm9uZSc7XG4gICAgICByZXR1cm4gdkxlYXZlKHRhcmdldCwgdkxlbmd0aCwgY291bnQgKyAxKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gSG9yaXpvbnRhbFxuICBjb25zdCBoSG92ZXIgPSAoYmFzZSwgaExlbmd0aCwgY291bnQgPSAwLCBjaGVjayA9IFtdKSA9PiB7XG4gICAgaWYgKGNvdW50ID09PSBsZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgbnVtID0gMDtcblxuICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgbnVtID0gTnVtYmVyKGdyaWRJbmRleChiYXNlKSk7XG4gICAgfVxuXG4gICAgaWYgKGNvdW50ID4gMCkge1xuICAgICAgbnVtID0gTnVtYmVyKGdyaWRJbmRleChiYXNlKSkgKyAxO1xuICAgIH1cblxuICAgIGNoZWNrLnB1c2gobnVtKTtcblxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5ncmlkJHtudW19YCk7XG4gICAgdGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSAnY3lhbic7XG4gICAgcmV0dXJuIGhIb3Zlcih0YXJnZXQsIGhMZW5ndGgsIGNvdW50ICsgMSwgY2hlY2spO1xuXG4gICAgLy8gY29uc29sZS5sb2coXG4gICAgLy8gICBOdW1iZXIoU3RyaW5nKGNoZWNrW2NoZWNrLmxlbmd0aCAtIDFdKS5zbGljZSgtMSkpLFxuICAgIC8vICAgTnVtYmVyKFN0cmluZyhjaGVja1swXSkuc2xpY2UoLTEpKVxuICAgIC8vICk7XG4gIH07XG5cbiAgY29uc3QgaExlYXZlID0gKGJhc2UsIGhMZW5ndGgsIGNvdW50ID0gMCwgY2hlY2sgPSBbXSkgPT4ge1xuICAgIGlmIChjb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG51bSA9IDA7XG5cbiAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgIG51bSA9IE51bWJlcihncmlkSW5kZXgoYmFzZSkpO1xuICAgIH1cblxuICAgIGlmIChjb3VudCA+IDApIHtcbiAgICAgIG51bSA9IE51bWJlcihncmlkSW5kZXgoYmFzZSkpICsgMTtcbiAgICB9XG5cbiAgICBjaGVjay5wdXNoKG51bSk7XG5cbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuZ3JpZCR7bnVtfWApO1xuICAgIHRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gJ25vbmUnO1xuXG4gICAgLy8gY29uc29sZS5sb2coXG4gICAgLy8gICBOdW1iZXIoU3RyaW5nKGNoZWNrW2NoZWNrLmxlbmd0aCAtIDFdKS5zbGljZSgtMSkpLFxuICAgIC8vICAgTnVtYmVyKFN0cmluZyhjaGVja1swXSkuc2xpY2UoLTEpKVxuICAgIC8vICk7XG4gICAgcmV0dXJuIGhMZWF2ZSh0YXJnZXQsIGhMZW5ndGgsIGNvdW50ICsgMSwgY2hlY2spO1xuICB9O1xufTtcblxuLy8gaG92ZXJHcmlkKDEsICd2ZXJ0aWNhbCcpO1xuaG92ZXJHcmlkKDUsICdob3Jpem9udGFsJyk7XG4iXSwibmFtZXMiOlsiY29udmVydE51bSIsImRpc3BsYXlIaXQiLCJhbGxHcmlkcyIsImdyaWRzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZ3JpZEluZGV4IiwiZ3JpZCIsInJlIiwibnVtIiwiY2xhc3NOYW1lIiwiZ3JpZE51bSIsImV4ZWMiLCJzbGljZSIsImxlbmd0aCIsImNvb3JkIiwiY3JlYXRlQ2xpY2siLCJwbGF5ZXIiLCJjb21wdXRlckJvYXJkIiwicGxheWVyQm9hcmQiLCJzbWFsbFdpbiIsInF1ZXJ5U2VsZWN0b3IiLCJiaWdXaW4iLCJjbGlja1N0eWxlIiwidGFyZ2V0IiwiYXR0YWNrIiwicmVzdWx0IiwiZmluZEdyaWQiLCJmdWxsQm9hcmQiLCJtaXNzIiwidGV4dENvbnRlbnQiLCJzdHlsZSIsImZvbnRTaXplIiwiY29sb3IiLCJzaGlwIiwidW5kZWZpbmVkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImNvbXB1dGVyU3VuayIsImNoZWNrU3VuayIsInBsYXllclN1bmsiLCJmb3JFYWNoIiwiY29uc29sZSIsImxvZyIsImkiLCJjbGFzc0xpc3QiLCJhZGQiLCJhZGRFdmVudExpc3RlbmVyIiwiY29udmVydENvb3JkIiwiYXJndW1lbnRzIiwieCIsInkiLCJ0YWJsZSIsImhpZ2hMaWdodEdyaWQiLCJzaGlwcyIsInRhcmdldHMiLCJPYmplY3QiLCJrZXlzIiwia2V5IiwiY29vcmRzIiwicHVzaCIsImluZGV4IiwiYm9yZGVyIiwiaGlnaEJpZyIsImJvYXJkIiwiaGl0UmVjb3JkIiwiU2hpcCIsIkdyaWQiLCJ1cCIsInJpZ2h0IiwiYm91bmRhcnkiLCJHYW1lYm9hcmQiLCJtYWtlQm9hcmQiLCJwIiwicSIsInN1cnZleUdyaWQiLCJvcmllbnQiLCJjb3VudCIsInBsYWNlQm91bmRhcnkiLCJsaXN0IiwicGxhY2VTaGlwIiwicmVjb3JkIiwiY2hlY2tMZW5ndGgiLCJzdXJ2ZXkiLCJzaGlwTmFtZSIsImZsZWV0Iiwic2hpcFJlY29yZCIsInJlY29yZEtleSIsInNoaXBLZXlzIiwiY29vcmRPYmoiLCJjb29yZEtleXMiLCJjaGVja1NoaXAiLCJOdW1iZXIiLCJjYWxTdW5rIiwiaXNTdW5rIiwic3Vua1JlY29yZCIsImluY2x1ZGVzIiwicmVjZWl2ZUF0dGFjayIsImF0dGFja1NoaXAiLCJjdXJyZW50U2hpcCIsImFsbENvb3JkIiwiYWxsS2V5cyIsInByb3BlcnR5Iiwib25lSGl0IiwiaGl0IiwiUGxheWVyIiwiZW5lbXlCb2FyZCIsImNvbXB1dGVyUGxheWVyIiwib3duQm9hcmQiLCJhaSIsImNvbXB1dGVyT24iLCJjb21wdXRlciIsImh1bWFuQXV0b01vdmUiLCJnZXRSYW5kb21JbnQiLCJtaW4iLCJtYXgiLCJNYXRoIiwiY2VpbCIsImZsb29yIiwicmFuZG9tIiwiaGl0S2V5cyIsImF1dG9Nb3ZlIiwicmVzcG9uc2UiLCJzdW5rIiwidG90YWxIaXRzIiwiaGl0cyIsImh1bWFuUGxheWVyIiwiaG92ZXJHcmlkIiwiZSIsInZIb3ZlciIsInZMZWF2ZSIsImhIb3ZlciIsImhMZWF2ZSIsImJhc2UiLCJ2TGVuZ3RoIiwiYmFja2dyb3VuZCIsImhMZW5ndGgiLCJjaGVjayJdLCJzb3VyY2VSb290IjoiIn0=