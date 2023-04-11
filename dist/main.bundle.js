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

/***/ "./src/rotate.js":
/*!***********************!*\
  !*** ./src/rotate.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _convert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./convert */ "./src/convert.js");
/* harmony import */ var _display_ships__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display-ships */ "./src/display-ships.js");



// Make a function to rotate ship
const rotate = (coord, ships, board, grids, table) => {
  const shipBase = [];
  // Find ship from coord
  Object.keys(ships).forEach(key => {
    const oneShip = ships[key];
    const shipCoords = Object.keys(oneShip);
    const shipLength = shipCoords.length;
    shipCoords.forEach(part => {
      if (Number(part[0]) === coord[0] && Number(part[2]) === coord[1]) {
        shipBase.push([Number(shipCoords[0][0]), Number(shipCoords[0][2])]);
        shipBase.push(shipLength);
        shipBase.push(board.findGrid(board.fullBoard, shipBase[0][0], shipBase[0][1]).ship.orient);
        delete ships[key];
        for (let i = 0; i < shipCoords.length; i++) {
          const newX = Number(shipCoords[i][0]);
          const newY = Number(shipCoords[i][2]);
          // Set fullboard ships to undefined
          board.findGrid(board.fullBoard, newX, newY).ship = undefined;
          // Set grid to not hightlight
          const index = table[[newX, newY]];
          grids[index].style.border = '2px solid gray';
        }
      }
    });
  });

  // if vertical, place ship horizontal using first coord
  if (shipBase[2] === 'vertical') {
    const check = board.placeShip(shipBase[0][0], shipBase[0][1], shipBase[1], 'horizontal');
    if (check === undefined) {
      board.placeShip(shipBase[0][0], shipBase[0][1], shipBase[1], 'horizontal');
    }
    if (check !== undefined) {
      board.placeShip(shipBase[0][0], shipBase[0][1], shipBase[1], 'vertical');
    }
    console.log(check);
  }
  // if horizontal, place ship vertical using first coord
  if (shipBase[2] === 'horizontal') {
    const check = board.placeShip(shipBase[0][0], shipBase[0][1], shipBase[1], 'vertical');
    if (check === undefined) {
      board.placeShip(shipBase[0][0], shipBase[0][1], shipBase[1], 'vertical');
    }
    if (check !== undefined) {
      board.placeShip(shipBase[0][0], shipBase[0][1], shipBase[1], 'horizontal');
    }
    console.log(ships);
  }
  // Place ship back to original if out of range/place occupied
};
// Go to ship record, create click event to rotate ship

const rotateShip = (ships, board) => {
  const allGrids = () => {
    const grids = document.querySelectorAll('.small-grid');
    return grids;
  };
  const gridIndex = grid => {
    const re = /[0-9]+/;
    const num = grid.className;
    const gridNum = re.exec(num.slice(num.length - 2, num.length))[0];
    const coord = (0,_convert__WEBPACK_IMPORTED_MODULE_0__.convertNum)();
    return coord[gridNum];
  };
  const targets = [];
  const grids = allGrids();
  for (let i = 0; i < grids.length; i++) {
    grids[i].classList.add(`grid${i}`);
  }
  Object.keys(ships).forEach(key => {
    const coords = ships[key];
    Object.keys(coords).forEach(coord => {
      targets.push(coord);
    });
  });
  const table = (0,_convert__WEBPACK_IMPORTED_MODULE_0__.convertCoord)();
  targets.forEach(target => {
    const index = table[target];
    // Rotate function goes here
    grids[index].addEventListener('click', e => {
      const coord = gridIndex(e.target);
      rotate(coord, ships, board, grids, table);
      (0,_display_ships__WEBPACK_IMPORTED_MODULE_1__.highLightGrid)(ships);
    });
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rotateShip);

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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  font-family: sans-serif;\n}\n\nbody {\n  background-color: rgb(30, 30, 30);\n}\n\n.container {\n  border: 1px soild red;\n  display: grid;\n  grid-template-rows: 1fr 10fr 1fr;\n  height: 100vh;\n}\n\n.title-div {\n  border: 2px solid greenyellow;\n  display: flex;\n  grid-row: 1 / 2;\n  justify-content: center;\n  align-items: center;\n  color: gray;\n  font-size: 2.5rem;\n}\n\n.board-div {\n  display: grid;\n  grid-template-columns: 5fr 1fr 1fr 1fr 5fr;\n  width: 100vw;\n  /* height: fit-content; */\n  grid-row: 2 / 3;\n  color: whitesmoke;\n}\n\n.small-container {\n  border: 2px solid tomato;\n  height: fit-content;\n  display: flex;\n  flex-direction: column;\n  grid-column: 2 / 3;\n}\n\n.small-board {\n  border: 2px solid orange;\n  width: 25rem;\n  height: 25rem;\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(11, 1fr);\n\n}\n\n.small-num,\n.small-apl {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.small-grid {\n  border: 2px solid gray;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n} \n\n.small-grid[style=\"border: 2px solid cyan;\"] {\n  cursor:pointer\n}\n\n.small-name,\n.small-win {\n  align-self: center;\n}\n\n.big-container {\n  border: 2px solid tomato;\n  height: fit-content;\n  display: flex;\n  flex-direction: column;\n  grid-column: 4 / 5;\n}\n\n.big-board {\n  border: 2px solid orange;\n  width: 30rem;\n  height: 30rem;\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(11, 1fr);\n}\n\n.big-num,\n.big-alp {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.25rem;\n}\n\n.big-grid {\n  border: 2px solid gray;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor:pointer\n} \n\n.big-name {\n  align-self: center;\n}\n\n.message {\n  color: whitesmoke;\n  font-size: 1rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.small-win,\n.big-win {\n  align-self: center;\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,UAAU;EACV,SAAS;EACT,sBAAsB;EACtB,uBAAuB;AACzB;;AAEA;EACE,iCAAiC;AACnC;;AAEA;EACE,qBAAqB;EACrB,aAAa;EACb,gCAAgC;EAChC,aAAa;AACf;;AAEA;EACE,6BAA6B;EAC7B,aAAa;EACb,eAAe;EACf,uBAAuB;EACvB,mBAAmB;EACnB,WAAW;EACX,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,0CAA0C;EAC1C,YAAY;EACZ,yBAAyB;EACzB,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,wBAAwB;EACxB,mBAAmB;EACnB,aAAa;EACb,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;EACxB,YAAY;EACZ,aAAa;EACb,aAAa;EACb,sCAAsC;EACtC,mCAAmC;;AAErC;;AAEA;;EAEE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,sBAAsB;EACtB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE;AACF;;AAEA;;EAEE,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;EACxB,mBAAmB;EACnB,aAAa;EACb,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;EACxB,YAAY;EACZ,aAAa;EACb,aAAa;EACb,sCAAsC;EACtC,mCAAmC;AACrC;;AAEA;;EAEE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,sBAAsB;EACtB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB;AACF;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;EACjB,eAAe;EACf,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;;EAEE,kBAAkB;AACpB","sourcesContent":["* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  font-family: sans-serif;\n}\n\nbody {\n  background-color: rgb(30, 30, 30);\n}\n\n.container {\n  border: 1px soild red;\n  display: grid;\n  grid-template-rows: 1fr 10fr 1fr;\n  height: 100vh;\n}\n\n.title-div {\n  border: 2px solid greenyellow;\n  display: flex;\n  grid-row: 1 / 2;\n  justify-content: center;\n  align-items: center;\n  color: gray;\n  font-size: 2.5rem;\n}\n\n.board-div {\n  display: grid;\n  grid-template-columns: 5fr 1fr 1fr 1fr 5fr;\n  width: 100vw;\n  /* height: fit-content; */\n  grid-row: 2 / 3;\n  color: whitesmoke;\n}\n\n.small-container {\n  border: 2px solid tomato;\n  height: fit-content;\n  display: flex;\n  flex-direction: column;\n  grid-column: 2 / 3;\n}\n\n.small-board {\n  border: 2px solid orange;\n  width: 25rem;\n  height: 25rem;\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(11, 1fr);\n\n}\n\n.small-num,\n.small-apl {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.small-grid {\n  border: 2px solid gray;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n} \n\n.small-grid[style=\"border: 2px solid cyan;\"] {\n  cursor:pointer\n}\n\n.small-name,\n.small-win {\n  align-self: center;\n}\n\n.big-container {\n  border: 2px solid tomato;\n  height: fit-content;\n  display: flex;\n  flex-direction: column;\n  grid-column: 4 / 5;\n}\n\n.big-board {\n  border: 2px solid orange;\n  width: 30rem;\n  height: 30rem;\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(11, 1fr);\n}\n\n.big-num,\n.big-alp {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.25rem;\n}\n\n.big-grid {\n  border: 2px solid gray;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor:pointer\n} \n\n.big-name {\n  align-self: center;\n}\n\n.message {\n  color: whitesmoke;\n  font-size: 1rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.small-win,\n.big-win {\n  align-self: center;\n}"],"sourceRoot":""}]);
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
/* harmony import */ var _rotate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rotate */ "./src/rotate.js");





// import { convertNum, convertCoord } from './convert';

const playerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
const computerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
const computerPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_2__["default"])(playerBoard);
computerPlayer.computerOn();
const humanPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_2__["default"])(computerBoard, computerPlayer, playerBoard);
playerBoard.placeShip(4, 1, 5, 'vertical');
playerBoard.placeShip(2, 1, 4, 'horizontal');
// playerBoard.placeShip(6, 4, 3, 'horizontal');
playerBoard.placeShip(1, 7, 2, 'vertical');
// playerBoard.placeShip(9, 9, 1, 'vertical');
// playerBoard.placeShip(7, 8, 1, 'vertical');
playerBoard.placeShip(9, 5, 3, 'horizontal');
// playerBoard.placeShip(2, 4, 2, 'horizontal');

(0,_display_ships__WEBPACK_IMPORTED_MODULE_3__.highLightGrid)(playerBoard.shipRecord);

// computerBoard.placeShip(1, 1, 5, 'vertical');
// computerBoard.placeShip(3, 3, 4, 'vertical');
// computerBoard.placeShip(8, 3, 3, 'horizontal');
// computerBoard.placeShip(1, 5, 2, 'vertical');
// computerBoard.placeShip(4, 6, 2, 'vertical');
// computerBoard.placeShip(3, 9, 1, 'vertical');
// computerBoard.placeShip(7, 0, 1, 'vertical');

(0,_display_ships__WEBPACK_IMPORTED_MODULE_3__.highBig)(computerBoard.shipRecord);
(0,_click_board__WEBPACK_IMPORTED_MODULE_4__["default"])(humanPlayer, computerBoard, playerBoard);
(0,_rotate__WEBPACK_IMPORTED_MODULE_5__["default"])(playerBoard.shipRecord, playerBoard);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFJLENBQUNsQyxRQUFRLENBQUNDLFNBQVMsRUFBRXVCLENBQUMsR0FBRyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDO0lBQzFDO0lBQ0EsSUFBSUQsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7TUFDYjZCLElBQUksQ0FBQ25CLElBQUksQ0FBQ2xDLFFBQVEsQ0FBQ0MsU0FBUyxFQUFFdUIsQ0FBQyxHQUFHLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUM7SUFDMUM7SUFDQSxJQUFJQSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtNQUNiNEIsSUFBSSxDQUFDbkIsSUFBSSxDQUFDbEMsUUFBUSxDQUFDQyxTQUFTLEVBQUV1QixDQUFDLEVBQUVDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMxQztJQUNBLElBQUlBLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFO01BQ2Q0QixJQUFJLENBQUNuQixJQUFJLENBQUNsQyxRQUFRLENBQUNDLFNBQVMsRUFBRXVCLENBQUMsRUFBRUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzFDO0lBRUEsSUFBSUQsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUlDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO01BQzNCNEIsSUFBSSxDQUFDbkIsSUFBSSxDQUFDbEMsUUFBUSxDQUFDQyxTQUFTLEVBQUV1QixDQUFDLEdBQUcsQ0FBQyxFQUFFQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDOUM7SUFDQSxJQUFJRCxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUU7TUFDNUI0QixJQUFJLENBQUNuQixJQUFJLENBQUNsQyxRQUFRLENBQUNDLFNBQVMsRUFBRXVCLENBQUMsR0FBRyxDQUFDLEVBQUVDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM5QztJQUNBLElBQUlELENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJQyxDQUFDLEdBQUcsQ0FB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QWEsQ0FBQ3lCLFVBQVUsQ0FBQztBQUVqQzNCLHdEQUFXLENBQUN3SCxXQUFXLEVBQUV0SCxhQUFhLEVBQUVDLFdBQVcsQ0FBQztBQUVwRGdILG1EQUFVLENBQUNoSCxXQUFXLENBQUN3QixVQUFVLEVBQUV4QixXQUFXLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9jbGljay1ib2FyZC5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvY29udmVydC5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvZGlzcGxheS1zaGlwcy5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL3JvdGF0ZS5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL25wbS1zZXR1cC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL25wbS1zZXR1cC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25wbS1zZXR1cC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25wbS1zZXR1cC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25wbS1zZXR1cC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25wbS1zZXR1cC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbnZlcnROdW0gfSBmcm9tICcuL2NvbnZlcnQnO1xuaW1wb3J0IHsgZGlzcGxheUhpdCB9IGZyb20gJy4vZGlzcGxheS1zaGlwcyc7XG5cbmNvbnN0IGFsbEdyaWRzID0gKCkgPT4ge1xuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iaWctZ3JpZCcpO1xuICByZXR1cm4gZ3JpZHM7XG59O1xuXG5jb25zdCBncmlkSW5kZXggPSAoZ3JpZCkgPT4ge1xuICBjb25zdCByZSA9IC9bMC05XSsvO1xuICBjb25zdCBudW0gPSBncmlkLmNsYXNzTmFtZTtcbiAgY29uc3QgZ3JpZE51bSA9IHJlLmV4ZWMobnVtLnNsaWNlKG51bS5sZW5ndGggLSAyLCBudW0ubGVuZ3RoKSlbMF07XG4gIGNvbnN0IGNvb3JkID0gY29udmVydE51bSgpO1xuICByZXR1cm4gY29vcmRbZ3JpZE51bV07XG59O1xuXG5jb25zdCBjcmVhdGVDbGljayA9IChwbGF5ZXIsIGNvbXB1dGVyQm9hcmQsIHBsYXllckJvYXJkKSA9PiB7XG4gIGNvbnN0IGdyaWRzID0gYWxsR3JpZHMoKTtcbiAgY29uc3Qgc21hbGxXaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc21hbGwtd2luJyk7XG4gIGNvbnN0IGJpZ1dpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iaWctd2luJyk7XG5cbiAgZnVuY3Rpb24gY2xpY2tTdHlsZSgpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBncmlkSW5kZXgodGhpcyk7XG4gICAgcGxheWVyLmF0dGFjayh0YXJnZXRbMF0sIHRhcmdldFsxXSk7XG4gICAgY29uc3QgcmVzdWx0ID0gY29tcHV0ZXJCb2FyZC5maW5kR3JpZChcbiAgICAgIGNvbXB1dGVyQm9hcmQuZnVsbEJvYXJkLFxuICAgICAgdGFyZ2V0WzBdLFxuICAgICAgdGFyZ2V0WzFdXG4gICAgKTtcbiAgICBpZiAocmVzdWx0Lm1pc3MgPT09IHRydWUpIHtcbiAgICAgIHRoaXMudGV4dENvbnRlbnQgPSAnLyc7XG4gICAgICB0aGlzLnN0eWxlLmZvbnRTaXplID0gJzJyZW0nO1xuICAgICAgdGhpcy5zdHlsZS5jb2xvciA9ICd3aGl0ZXNtb2tlJztcbiAgICB9XG4gICAgaWYgKHJlc3VsdC5zaGlwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMudGV4dENvbnRlbnQgPSAnWCc7XG4gICAgICB0aGlzLnN0eWxlLmZvbnRTaXplID0gJzJyZW0nO1xuICAgICAgdGhpcy5zdHlsZS5jb2xvciA9ICdyZWQnO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tTdHlsZSk7XG5cbiAgICBjb25zdCBjb21wdXRlclN1bmsgPSBjb21wdXRlckJvYXJkLmNoZWNrU3VuaygpO1xuXG4gICAgaWYgKGNvbXB1dGVyU3VuayA9PT0gZmFsc2UpIHtcbiAgICAgIGRpc3BsYXlIaXQocGxheWVyQm9hcmQpO1xuICAgICAgY29uc3QgcGxheWVyU3VuayA9IHBsYXllckJvYXJkLmNoZWNrU3VuaygpO1xuICAgICAgaWYgKHBsYXllclN1bmsgPT09IHRydWUpIHtcbiAgICAgICAgZ3JpZHMuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgICAgICAgIGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja1N0eWxlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDb21wdXRlciB3aW4nKTtcbiAgICAgICAgYmlnV2luLnRleHRDb250ZW50ID0gJ09wcG9uZW50IFdpbic7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvbXB1dGVyU3VuayA9PT0gdHJ1ZSkge1xuICAgICAgZ3JpZHMuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgICAgICBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tTdHlsZSk7XG4gICAgICB9KTtcbiAgICAgIGNvbnNvbGUubG9nKCdIdW1hbiB3aW4nKTtcbiAgICAgIHNtYWxsV2luLnRleHRDb250ZW50ID0gJ1BsYXllciB3aW4nO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKGNvbXB1dGVyQm9hcmQuc2hpcFJlY29yZCk7XG4gICAgY29uc29sZS5sb2coY29tcHV0ZXJCb2FyZC5zdW5rUmVjb3JkKTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JpZHMubGVuZ3RoOyBpKyspIHtcbiAgICBncmlkc1tpXS5jbGFzc0xpc3QuYWRkKGBncmlkJHtpfWApO1xuICAgIGdyaWRzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tTdHlsZSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNsaWNrO1xuIiwiY29uc3QgY29udmVydENvb3JkID0gKG51bSA9IDAsIHggPSA5LCB5ID0gMCwgdGFibGUgPSB7fSkgPT4ge1xuICBpZiAobnVtID4gOTkpIHtcbiAgICByZXR1cm4gdGFibGU7XG4gIH1cbiAgY29uc3QgY29vcmQgPSBbeCwgeV07XG4gIHRhYmxlW2Nvb3JkXSA9IG51bTtcbiAgaWYgKHkgPT09IDkpIHtcbiAgICB4IC09IDE7XG4gICAgeSA9IC0xO1xuICB9XG4gIHJldHVybiBjb252ZXJ0Q29vcmQobnVtICsgMSwgeCwgeSArIDEsIHRhYmxlKTtcbn07XG5cbmNvbnN0IGNvbnZlcnROdW0gPSAobnVtID0gMCwgeCA9IDksIHkgPSAwLCB0YWJsZSA9IHt9KSA9PiB7XG4gIGlmIChudW0gPiA5OSkge1xuICAgIHJldHVybiB0YWJsZTtcbiAgfVxuICBjb25zdCBjb29yZCA9IFt4LCB5XTtcbiAgdGFibGVbbnVtXSA9IGNvb3JkO1xuICBpZiAoeSA9PT0gOSkge1xuICAgIHggLT0gMTtcbiAgICB5ID0gLTE7XG4gIH1cbiAgcmV0dXJuIGNvbnZlcnROdW0obnVtICsgMSwgeCwgeSArIDEsIHRhYmxlKTtcbn07XG5cbmV4cG9ydCB7IGNvbnZlcnRDb29yZCwgY29udmVydE51bSB9O1xuIiwiaW1wb3J0IHsgY29udmVydENvb3JkIH0gZnJvbSAnLi9jb252ZXJ0JztcblxuY29uc3QgYWxsR3JpZHMgPSAoKSA9PiB7XG4gIGNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNtYWxsLWdyaWQnKTtcbiAgcmV0dXJuIGdyaWRzO1xufTtcblxuY29uc3QgaGlnaExpZ2h0R3JpZCA9IChzaGlwcykgPT4ge1xuICBjb25zdCB0YXJnZXRzID0gW107XG4gIGNvbnN0IGdyaWRzID0gYWxsR3JpZHMoKTtcblxuICBPYmplY3Qua2V5cyhzaGlwcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgY29uc3QgY29vcmRzID0gc2hpcHNba2V5XTtcbiAgICBPYmplY3Qua2V5cyhjb29yZHMpLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICB0YXJnZXRzLnB1c2goY29vcmQpO1xuICAgIH0pO1xuICB9KTtcblxuICBjb25zdCB0YWJsZSA9IGNvbnZlcnRDb29yZCgpO1xuXG4gIHRhcmdldHMuZm9yRWFjaCgodGFyZ2V0KSA9PiB7XG4gICAgY29uc3QgaW5kZXggPSB0YWJsZVt0YXJnZXRdO1xuICAgIGdyaWRzW2luZGV4XS5zdHlsZS5ib3JkZXIgPSAnMnB4IGN5YW4gc29saWQnO1xuICB9KTtcbn07XG5cbmNvbnN0IGhpZ2hCaWcgPSAoc2hpcHMpID0+IHtcbiAgY29uc3QgdGFyZ2V0cyA9IFtdO1xuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iaWctZ3JpZCcpO1xuXG4gIE9iamVjdC5rZXlzKHNoaXBzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBjb25zdCBjb29yZHMgPSBzaGlwc1trZXldO1xuICAgIE9iamVjdC5rZXlzKGNvb3JkcykuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIHRhcmdldHMucHVzaChjb29yZCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGNvbnN0IHRhYmxlID0gY29udmVydENvb3JkKCk7XG5cbiAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IHRhYmxlW3RhcmdldF07XG4gICAgZ3JpZHNbaW5kZXhdLnN0eWxlLmJvcmRlciA9ICcycHggY3lhbiBzb2xpZCc7XG4gIH0pO1xufTtcblxuY29uc3QgZGlzcGxheUhpdCA9IChib2FyZCkgPT4ge1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoYm9hcmQuaGl0UmVjb3JkKTtcbiAgY29uc3QgY29vcmQgPSBib2FyZC5oaXRSZWNvcmRba2V5c1trZXlzLmxlbmd0aCAtIDFdXTtcbiAgY29uc3QgdGFyZ2V0ID0gYm9hcmQuZmluZEdyaWQoYm9hcmQuZnVsbEJvYXJkLCBjb29yZFswXSwgY29vcmRbMV0pO1xuXG4gIGNvbnN0IGdyaWRzID0gYWxsR3JpZHMoKTtcbiAgY29uc3QgdGFibGUgPSBjb252ZXJ0Q29vcmQoKTtcbiAgY29uc3QgZ3JpZE51bSA9IHRhYmxlW2Nvb3JkXTtcblxuICBpZiAodGFyZ2V0Lm1pc3MgPT09IHRydWUpIHtcbiAgICBncmlkc1tncmlkTnVtXS50ZXh0Q29udGVudCA9ICdYJztcbiAgICBncmlkc1tncmlkTnVtXS5zdHlsZS5mb250U2l6ZSA9ICcxLjVyZW0nO1xuICAgIGdyaWRzW2dyaWROdW1dLnN0eWxlLmNvbG9yID0gJ3doaXRlc21va2UnO1xuICB9XG4gIGlmICh0YXJnZXQuc2hpcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZ3JpZHNbZ3JpZE51bV0udGV4dENvbnRlbnQgPSAnWCc7XG4gICAgZ3JpZHNbZ3JpZE51bV0uc3R5bGUuZm9udFNpemUgPSAnMS41cmVtJztcbiAgICBncmlkc1tncmlkTnVtXS5zdHlsZS5jb2xvciA9ICdyZWQnO1xuICB9XG59O1xuXG5leHBvcnQgeyBoaWdoTGlnaHRHcmlkLCBoaWdoQmlnLCBkaXNwbGF5SGl0IH07XG4iLCJpbXBvcnQgU2hpcCBmcm9tICcuL3NoaXAnO1xuXG5jb25zdCBHcmlkID0gKHgsIHksIHVwLCByaWdodCwgc2hpcCwgbWlzcyA9IGZhbHNlLCBib3VuZGFyeSA9IGZhbHNlKSA9PiB7XG4gIGNvbnN0IGNvb3JkID0gW3gsIHldO1xuICByZXR1cm4geyBjb29yZCwgdXAsIHJpZ2h0LCBzaGlwLCBtaXNzLCBib3VuZGFyeSB9O1xufTtcblxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBtYWtlQm9hcmQgPSAoeCA9IDAsIHkgPSAwKSA9PiB7XG4gICAgaWYgKHggPiA5IHx8IHkgPiA5KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBib2FyZCA9IEdyaWQoeCwgeSwgbWFrZUJvYXJkKHggKyAxLCB5KSwgbWFrZUJvYXJkKHgsIHkgKyAxKSk7XG5cbiAgICByZXR1cm4gYm9hcmQ7XG4gIH07XG5cbiAgY29uc3QgZmluZEdyaWQgPSAoZ3JpZCwgcCwgcSkgPT4ge1xuICAgIGlmIChncmlkLmNvb3JkWzBdICE9PSBwKSB7XG4gICAgICBncmlkID0gZ3JpZC51cDtcbiAgICAgIHJldHVybiBmaW5kR3JpZChncmlkLCBwLCBxKTtcbiAgICB9XG5cbiAgICBpZiAoZ3JpZC5jb29yZFswXSA9PT0gcCkge1xuICAgICAgaWYgKGdyaWQuY29vcmRbMV0gIT09IHEpIHtcbiAgICAgICAgZ3JpZCA9IGdyaWQucmlnaHQ7XG4gICAgICAgIHJldHVybiBmaW5kR3JpZChncmlkLCBwLCBxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGdyaWQ7XG4gIH07XG5cbiAgY29uc3Qgc3VydmV5R3JpZCA9ICh4LCB5LCBsZW5ndGgsIG9yaWVudCwgY291bnQgPSAwKSA9PiB7XG4gICAgaWYgKGNvdW50ID09PSBsZW5ndGgpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoZmluZEdyaWQoZnVsbEJvYXJkLCB4LCB5KS5zaGlwID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChvcmllbnQgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgcmV0dXJuIHN1cnZleUdyaWQoeCArIDEsIHksIGxlbmd0aCwgb3JpZW50LCBjb3VudCArIDEpO1xuICAgICAgfVxuICAgICAgaWYgKG9yaWVudCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIHJldHVybiBzdXJ2ZXlHcmlkKHgsIHkgKyAxLCBsZW5ndGgsIG9yaWVudCwgY291bnQgKyAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlQm91bmRhcnkgPSAoeCwgeSkgPT4ge1xuICAgIGNvbnN0IGxpc3QgPSBbXTtcblxuICAgIGlmICh4ICsgMSA8IDEwKSB7XG4gICAgICBsaXN0LnB1c2goZmluZEdyaWQoZnVsbEJvYXJkLCB4ICsgMSwgeSkpO1xuICAgIH1cbiAgICBpZiAoeCAtIDEgPiAwKSB7XG4gICAgICBsaXN0LnB1c2goZmluZEdyaWQoZnVsbEJvYXJkLCB4IC0gMSwgeSkpO1xuICAgIH1cbiAgICBpZiAoeSAtIDEgPiAwKSB7XG4gICAgICBsaXN0LnB1c2goZmluZEdyaWQoZnVsbEJvYXJkLCB4LCB5IC0gMSkpO1xuICAgIH1cbiAgICBpZiAoeSArIDEgPCAxMCkge1xuICAgICAgbGlzdC5wdXNoKGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCwgeSArIDEpKTtcbiAgICB9XG5cbiAgICBpZiAoeCArIDEgPCAxMCAmJiB5IC0gMSA+IDApIHtcbiAgICAgIGxpc3QucHVzaChmaW5kR3JpZChmdWxsQm9hcmQsIHggKyAxLCB5IC0gMSkpO1xuICAgIH1cbiAgICBpZiAoeCArIDEgPCAxMCAmJiB5ICsgMSA8IDEwKSB7XG4gICAgICBsaXN0LnB1c2goZmluZEdyaWQoZnVsbEJvYXJkLCB4ICsgMSwgeSArIDEpKTtcbiAgICB9XG4gICAgaWYgKHggLSAxID4gMCAmJiB5IC0gMSA+IDApIHtcbiAgICAgIGxpc3QucHVzaChmaW5kR3JpZChmdWxsQm9hcmQsIHggLSAxLCB5IC0gMSkpO1xuICAgIH1cbiAgICBpZiAoeCAtIDEgPCAxMCAmJiB5ICsgMSA+IDEwKSB7XG4gICAgICBsaXN0LnB1c2goZmluZEdyaWQoZnVsbEJvYXJkLCB4IC0gMSwgeSArIDEpKTtcbiAgICB9XG5cbiAgICBsaXN0LmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIHNoaXAuYm91bmRhcnkgPSB0cnVlO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChcbiAgICB4LFxuICAgIHksXG4gICAgbGVuZ3RoLFxuICAgIG9yaWVudCxcbiAgICBjb3VudCA9IDAsXG4gICAgcmVjb3JkID0ge30sXG4gICAgY2hlY2tMZW5ndGggPSB0cnVlLFxuICAgIHN1cnZleSA9IG51bGxcbiAgKSA9PiB7XG4gICAgaWYgKGNoZWNrTGVuZ3RoID09PSB0cnVlKSB7XG4gICAgICBpZiAoeCArIGxlbmd0aCA+IDEwICYmIG9yaWVudCA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICByZXR1cm4gJ1NoaXAgb3ZlciBib3JkZXInO1xuICAgICAgfVxuICAgICAgaWYgKHkgKyBsZW5ndGggPiAxMCAmJiBvcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICByZXR1cm4gJ1NoaXAgb3ZlciBib3JkZXInO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXJ2ZXkgPT09IG51bGwpIHtcbiAgICAgIGlmIChvcmllbnQgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgc3VydmV5ID0gc3VydmV5R3JpZCh4LCB5LCBsZW5ndGgsICd2ZXJ0aWNhbCcpO1xuICAgICAgfVxuICAgICAgaWYgKG9yaWVudCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIHN1cnZleSA9IHN1cnZleUdyaWQoeCwgeSwgbGVuZ3RoLCAnaG9yaXpvbnRhbCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNoaXBOYW1lID0gZmxlZXRbbGVuZ3RoXTtcbiAgICBpZiAoc2hpcFJlY29yZFtzaGlwTmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuICdTaGlwIG5vdCBhdmFpbGFibGUnO1xuICAgIH1cblxuICAgIGlmIChjb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICBpZiAoc2hpcE5hbWUgPT09ICdEZXN0cm95ZXIxJykge1xuICAgICAgICBmbGVldFtsZW5ndGhdID0gJ0Rlc3Ryb3llcjInO1xuICAgICAgfVxuICAgICAgaWYgKHNoaXBOYW1lID09PSAnU3VibWFyaW5lMScpIHtcbiAgICAgICAgZmxlZXRbbGVuZ3RoXSA9ICdTdWJtYXJpbmUyJztcbiAgICAgIH1cbiAgICAgIHNoaXBSZWNvcmRbc2hpcE5hbWVdID0gcmVjb3JkO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChmaW5kR3JpZChmdWxsQm9hcmQsIHgsIHkpLnNoaXAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGBTcGFjZSBhbHJlYWR5IHRha2VuYDtcbiAgICB9XG5cbiAgICBpZiAob3JpZW50ID09PSAndmVydGljYWwnKSB7XG4gICAgICBpZiAoc3VydmV5ID09PSB0cnVlKSB7XG4gICAgICAgIC8vIHBsYWNlQm91bmRhcnkoeCwgeSk7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCwgeSk7XG4gICAgICAgIHRhcmdldC5zaGlwID0gU2hpcChsZW5ndGgsICd2ZXJ0aWNhbCcpO1xuICAgICAgICBjb25zdCByZWNvcmRLZXkgPSB0YXJnZXQuY29vcmQ7XG4gICAgICAgIHJlY29yZFtyZWNvcmRLZXldID0gcmVjb3JkS2V5O1xuICAgICAgICBjaGVja0xlbmd0aCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gcGxhY2VTaGlwKFxuICAgICAgICAgIHggKyAxLFxuICAgICAgICAgIHksXG4gICAgICAgICAgbGVuZ3RoLFxuICAgICAgICAgIG9yaWVudCxcbiAgICAgICAgICBjb3VudCArIDEsXG4gICAgICAgICAgcmVjb3JkLFxuICAgICAgICAgIGNoZWNrTGVuZ3RoLFxuICAgICAgICAgIHN1cnZleVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKHN1cnZleSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGBTcGFjZSBhbHJlYWR5IHRha2VuYDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAob3JpZW50ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIGlmIChzdXJ2ZXkgPT09IHRydWUpIHtcbiAgICAgICAgLy8gcGxhY2VCb3VuZGFyeSh4LCB5KTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZmluZEdyaWQoZnVsbEJvYXJkLCB4LCB5KTtcbiAgICAgICAgdGFyZ2V0LnNoaXAgPSBTaGlwKGxlbmd0aCwgJ2hvcml6b250YWwnKTtcbiAgICAgICAgY29uc3QgcmVjb3JkS2V5ID0gdGFyZ2V0LmNvb3JkO1xuICAgICAgICByZWNvcmRbcmVjb3JkS2V5XSA9IHJlY29yZEtleTtcbiAgICAgICAgY2hlY2tMZW5ndGggPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHBsYWNlU2hpcChcbiAgICAgICAgICB4LFxuICAgICAgICAgIHkgKyAxLFxuICAgICAgICAgIGxlbmd0aCxcbiAgICAgICAgICBvcmllbnQsXG4gICAgICAgICAgY291bnQgKyAxLFxuICAgICAgICAgIHJlY29yZCxcbiAgICAgICAgICBjaGVja0xlbmd0aCxcbiAgICAgICAgICBzdXJ2ZXlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdXJ2ZXkgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBgU3BhY2UgYWxyZWFkeSB0YWtlbmA7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNoZWNrU3VuayA9ICgpID0+IHtcbiAgICBjb25zdCBzaGlwS2V5cyA9IE9iamVjdC5rZXlzKHNoaXBSZWNvcmQpO1xuICAgIHNoaXBLZXlzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIGNvbnN0IGNvb3JkT2JqID0gc2hpcFJlY29yZFtzaGlwXTtcbiAgICAgIGNvbnN0IGNvb3JkS2V5cyA9IE9iamVjdC5rZXlzKGNvb3JkT2JqKTtcbiAgICAgIGNvbnN0IGNoZWNrU2hpcCA9IGZpbmRHcmlkKFxuICAgICAgICBmdWxsQm9hcmQsXG4gICAgICAgIE51bWJlcihjb29yZEtleXNbMF1bMF0pLFxuICAgICAgICBOdW1iZXIoY29vcmRLZXlzWzBdWzJdKVxuICAgICAgKTtcbiAgICAgIGNoZWNrU2hpcC5zaGlwLmNhbFN1bmsoKTtcbiAgICAgIGlmIChjaGVja1NoaXAuc2hpcC5pc1N1bmsoKSA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoIU9iamVjdC5rZXlzKHN1bmtSZWNvcmQpLmluY2x1ZGVzKHNoaXApKSB7XG4gICAgICAgICAgc3Vua1JlY29yZFtzaGlwXSA9IHNoaXA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChPYmplY3Qua2V5cyhzdW5rUmVjb3JkKS5sZW5ndGggPT09IHNoaXBLZXlzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBmaW5kR3JpZChmdWxsQm9hcmQsIHgsIHkpO1xuICAgIGNvbnN0IGNvb3JkID0gW3gsIHldO1xuICAgIGNvbnN0IGF0dGFja1NoaXAgPSBbXTtcblxuICAgIGlmICh0YXJnZXQuc2hpcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoaGl0UmVjb3JkW2Nvb3JkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGhpdFJlY29yZFtjb29yZF0gPSBjb29yZDtcbiAgICAgICAgY29uc3QgZmxlZXQgPSBPYmplY3Qua2V5cyhzaGlwUmVjb3JkKTtcbiAgICAgICAgZmxlZXQuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnRTaGlwID0gc2hpcFJlY29yZFtzaGlwXTtcbiAgICAgICAgICBpZiAoY3VycmVudFNoaXBbY29vcmRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGF0dGFja1NoaXAucHVzaChzaGlwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBhbGxDb29yZCA9IHNoaXBSZWNvcmRbYXR0YWNrU2hpcFswXV07XG4gICAgICAgIGNvbnN0IGFsbEtleXMgPSBPYmplY3Qua2V5cyhhbGxDb29yZCk7XG4gICAgICAgIGFsbEtleXMuZm9yRWFjaCgoa2V5cykgPT4ge1xuICAgICAgICAgIGNvbnN0IHByb3BlcnR5ID0gYWxsQ29vcmRba2V5c107XG4gICAgICAgICAgY29uc3Qgb25lSGl0ID0gZmluZEdyaWQoZnVsbEJvYXJkLCBwcm9wZXJ0eVswXSwgcHJvcGVydHlbMV0pO1xuICAgICAgICAgIG9uZUhpdC5zaGlwLmhpdCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoaGl0UmVjb3JkW2Nvb3JkXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiAnU2hpcCBhbHJlYWR5IGhpdCc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRhcmdldC5zaGlwID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0YXJnZXQubWlzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgaGl0UmVjb3JkW2Nvb3JkXSA9IGNvb3JkO1xuICAgICAgICB0YXJnZXQubWlzcyA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gJ0hpdHRpbmcgYSBtaXNzZWQgc2hvdCBhZ2Fpbic7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGZ1bGxCb2FyZCA9IG1ha2VCb2FyZCgpO1xuICBjb25zdCBzaGlwUmVjb3JkID0ge307XG4gIGNvbnN0IGhpdFJlY29yZCA9IHt9O1xuICBjb25zdCBzdW5rUmVjb3JkID0ge307XG4gIGNvbnN0IGZsZWV0ID0ge1xuICAgIDU6ICdDYXJyaWVyJyxcbiAgICA0OiAnQmF0dGxlc2hpcCcsXG4gICAgMzogJ0NydXNpZXInLFxuICAgIDI6ICdEZXN0cm95ZXIxJyxcbiAgICAxOiAnU3VibWFyaW5lMScsXG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBmdWxsQm9hcmQsXG4gICAgcGxhY2VTaGlwLFxuICAgIGZpbmRHcmlkLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgc2hpcFJlY29yZCxcbiAgICBoaXRSZWNvcmQsXG4gICAgY2hlY2tTdW5rLFxuICAgIHN1bmtSZWNvcmQsXG4gICAgcGxhY2VCb3VuZGFyeSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImNvbnN0IFBsYXllciA9IChlbmVteUJvYXJkLCBjb21wdXRlclBsYXllciwgb3duQm9hcmQpID0+IHtcbiAgLy8gQWRkIGh1bWFuIG9uXG4gIC8vIEh1bWFuIG9ubHkgZm9yIHRlc3RpbmcsIHJlbW92ZSBhZnRlclxuICBsZXQgYWkgPSBmYWxzZTtcblxuICBjb25zdCBjb21wdXRlck9uID0gKCkgPT4ge1xuICAgIGFpID0gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBjb21wdXRlciA9ICgpID0+IGFpO1xuXG4gIGNvbnN0IGF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIGlmIChjb21wdXRlclBsYXllciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoY29tcHV0ZXJQbGF5ZXIuY29tcHV0ZXIoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAvLyBhdXRvTW92ZSgpO1xuICAgICAgICBodW1hbkF1dG9Nb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldFJhbmRvbUludCA9IChtaW4sIG1heCkgPT4ge1xuICAgIG1pbiA9IE1hdGguY2VpbChtaW4pO1xuICAgIG1heCA9IE1hdGguZmxvb3IobWF4KTtcblxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xuICB9O1xuXG4gIC8vIEFkZCBhdXRvTW92ZSBpZiBodW1hbiBvbiwgdGFyZ2V0IGNvb3JkIGluIHNoaXAgcmVjb3JkXG4gIC8vIEh1bWFuIGF1dG9Nb3ZlIG9ubHkgZm9yIHRlc3RpbmcsIHJlbW92ZSBhZnRlclxuICBjb25zdCBodW1hbkF1dG9Nb3ZlID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvb3JkcyA9IFtdO1xuICAgIGNvbnN0IHNoaXBLZXlzID0gT2JqZWN0LmtleXMob3duQm9hcmQuc2hpcFJlY29yZCk7XG4gICAgY29uc3QgaGl0S2V5cyA9IE9iamVjdC5rZXlzKG93bkJvYXJkLmhpdFJlY29yZCk7XG4gICAgc2hpcEtleXMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgY29uc3QgY29vcmRPYmogPSBvd25Cb2FyZC5zaGlwUmVjb3JkW3NoaXBdO1xuICAgICAgY29uc3QgY29vcmRLZXlzID0gT2JqZWN0LmtleXMoY29vcmRPYmopO1xuICAgICAgY29vcmRLZXlzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICAgIGNvb3Jkcy5wdXNoKGNvb3JkKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgb3duQm9hcmQucmVjZWl2ZUF0dGFjayhcbiAgICAgIE51bWJlcihjb29yZHNbaGl0S2V5cy5sZW5ndGhdWzBdKSxcbiAgICAgIE51bWJlcihjb29yZHNbaGl0S2V5cy5sZW5ndGhdWzJdKVxuICAgICk7XG4gICAgY29uc29sZS5sb2coY29vcmRzLCBjb29yZHNbMF1bMF0sIGNvb3Jkc1swXVsyXSwgb3duQm9hcmQuaGl0UmVjb3JkKTtcbiAgfTtcblxuICBjb25zdCBhdXRvTW92ZSA9ICgpID0+IHtcbiAgICBjb25zdCB4ID0gZ2V0UmFuZG9tSW50KDAsIDkpO1xuICAgIGNvbnN0IHkgPSBnZXRSYW5kb21JbnQoMCwgOSk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IG93bkJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG5cbiAgICBpZiAocmVzcG9uc2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGF1dG9Nb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IGF0dGFjaywgY29tcHV0ZXJPbiwgY29tcHV0ZXIsIGdldFJhbmRvbUludCB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiaW1wb3J0IHsgY29udmVydE51bSwgY29udmVydENvb3JkIH0gZnJvbSAnLi9jb252ZXJ0JztcbmltcG9ydCB7IGhpZ2hMaWdodEdyaWQgfSBmcm9tICcuL2Rpc3BsYXktc2hpcHMnO1xuXG4vLyBNYWtlIGEgZnVuY3Rpb24gdG8gcm90YXRlIHNoaXBcbmNvbnN0IHJvdGF0ZSA9IChjb29yZCwgc2hpcHMsIGJvYXJkLCBncmlkcywgdGFibGUpID0+IHtcbiAgY29uc3Qgc2hpcEJhc2UgPSBbXTtcbiAgLy8gRmluZCBzaGlwIGZyb20gY29vcmRcbiAgT2JqZWN0LmtleXMoc2hpcHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGNvbnN0IG9uZVNoaXAgPSBzaGlwc1trZXldO1xuICAgIGNvbnN0IHNoaXBDb29yZHMgPSBPYmplY3Qua2V5cyhvbmVTaGlwKTtcbiAgICBjb25zdCBzaGlwTGVuZ3RoID0gc2hpcENvb3Jkcy5sZW5ndGg7XG4gICAgc2hpcENvb3Jkcy5mb3JFYWNoKChwYXJ0KSA9PiB7XG4gICAgICBpZiAoTnVtYmVyKHBhcnRbMF0pID09PSBjb29yZFswXSAmJiBOdW1iZXIocGFydFsyXSkgPT09IGNvb3JkWzFdKSB7XG4gICAgICAgIHNoaXBCYXNlLnB1c2goW051bWJlcihzaGlwQ29vcmRzWzBdWzBdKSwgTnVtYmVyKHNoaXBDb29yZHNbMF1bMl0pXSk7XG4gICAgICAgIHNoaXBCYXNlLnB1c2goc2hpcExlbmd0aCk7XG4gICAgICAgIHNoaXBCYXNlLnB1c2goXG4gICAgICAgICAgYm9hcmQuZmluZEdyaWQoYm9hcmQuZnVsbEJvYXJkLCBzaGlwQmFzZVswXVswXSwgc2hpcEJhc2VbMF1bMV0pLnNoaXBcbiAgICAgICAgICAgIC5vcmllbnRcbiAgICAgICAgKTtcbiAgICAgICAgZGVsZXRlIHNoaXBzW2tleV07XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwQ29vcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgbmV3WCA9IE51bWJlcihzaGlwQ29vcmRzW2ldWzBdKTtcbiAgICAgICAgICBjb25zdCBuZXdZID0gTnVtYmVyKHNoaXBDb29yZHNbaV1bMl0pO1xuICAgICAgICAgIC8vIFNldCBmdWxsYm9hcmQgc2hpcHMgdG8gdW5kZWZpbmVkXG4gICAgICAgICAgYm9hcmQuZmluZEdyaWQoYm9hcmQuZnVsbEJvYXJkLCBuZXdYLCBuZXdZKS5zaGlwID0gdW5kZWZpbmVkO1xuICAgICAgICAgIC8vIFNldCBncmlkIHRvIG5vdCBoaWdodGxpZ2h0XG4gICAgICAgICAgY29uc3QgaW5kZXggPSB0YWJsZVtbbmV3WCwgbmV3WV1dO1xuICAgICAgICAgIGdyaWRzW2luZGV4XS5zdHlsZS5ib3JkZXIgPSAnMnB4IHNvbGlkIGdyYXknO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIGlmIHZlcnRpY2FsLCBwbGFjZSBzaGlwIGhvcml6b250YWwgdXNpbmcgZmlyc3QgY29vcmRcbiAgaWYgKHNoaXBCYXNlWzJdID09PSAndmVydGljYWwnKSB7XG4gICAgY29uc3QgY2hlY2sgPSBib2FyZC5wbGFjZVNoaXAoXG4gICAgICBzaGlwQmFzZVswXVswXSxcbiAgICAgIHNoaXBCYXNlWzBdWzFdLFxuICAgICAgc2hpcEJhc2VbMV0sXG4gICAgICAnaG9yaXpvbnRhbCdcbiAgICApO1xuICAgIGlmIChjaGVjayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBib2FyZC5wbGFjZVNoaXAoXG4gICAgICAgIHNoaXBCYXNlWzBdWzBdLFxuICAgICAgICBzaGlwQmFzZVswXVsxXSxcbiAgICAgICAgc2hpcEJhc2VbMV0sXG4gICAgICAgICdob3Jpem9udGFsJ1xuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGNoZWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGJvYXJkLnBsYWNlU2hpcChzaGlwQmFzZVswXVswXSwgc2hpcEJhc2VbMF1bMV0sIHNoaXBCYXNlWzFdLCAndmVydGljYWwnKTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhjaGVjayk7XG4gIH1cbiAgLy8gaWYgaG9yaXpvbnRhbCwgcGxhY2Ugc2hpcCB2ZXJ0aWNhbCB1c2luZyBmaXJzdCBjb29yZFxuICBpZiAoc2hpcEJhc2VbMl0gPT09ICdob3Jpem9udGFsJykge1xuICAgIGNvbnN0IGNoZWNrID0gYm9hcmQucGxhY2VTaGlwKFxuICAgICAgc2hpcEJhc2VbMF1bMF0sXG4gICAgICBzaGlwQmFzZVswXVsxXSxcbiAgICAgIHNoaXBCYXNlWzFdLFxuICAgICAgJ3ZlcnRpY2FsJ1xuICAgICk7XG4gICAgaWYgKGNoZWNrID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGJvYXJkLnBsYWNlU2hpcChzaGlwQmFzZVswXVswXSwgc2hpcEJhc2VbMF1bMV0sIHNoaXBCYXNlWzFdLCAndmVydGljYWwnKTtcbiAgICB9XG4gICAgaWYgKGNoZWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGJvYXJkLnBsYWNlU2hpcChcbiAgICAgICAgc2hpcEJhc2VbMF1bMF0sXG4gICAgICAgIHNoaXBCYXNlWzBdWzFdLFxuICAgICAgICBzaGlwQmFzZVsxXSxcbiAgICAgICAgJ2hvcml6b250YWwnXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhzaGlwcyk7XG4gIH1cbiAgLy8gUGxhY2Ugc2hpcCBiYWNrIHRvIG9yaWdpbmFsIGlmIG91dCBvZiByYW5nZS9wbGFjZSBvY2N1cGllZFxufTtcbi8vIEdvIHRvIHNoaXAgcmVjb3JkLCBjcmVhdGUgY2xpY2sgZXZlbnQgdG8gcm90YXRlIHNoaXBcblxuY29uc3Qgcm90YXRlU2hpcCA9IChzaGlwcywgYm9hcmQpID0+IHtcbiAgY29uc3QgYWxsR3JpZHMgPSAoKSA9PiB7XG4gICAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc21hbGwtZ3JpZCcpO1xuICAgIHJldHVybiBncmlkcztcbiAgfTtcblxuICBjb25zdCBncmlkSW5kZXggPSAoZ3JpZCkgPT4ge1xuICAgIGNvbnN0IHJlID0gL1swLTldKy87XG4gICAgY29uc3QgbnVtID0gZ3JpZC5jbGFzc05hbWU7XG4gICAgY29uc3QgZ3JpZE51bSA9IHJlLmV4ZWMobnVtLnNsaWNlKG51bS5sZW5ndGggLSAyLCBudW0ubGVuZ3RoKSlbMF07XG4gICAgY29uc3QgY29vcmQgPSBjb252ZXJ0TnVtKCk7XG4gICAgcmV0dXJuIGNvb3JkW2dyaWROdW1dO1xuICB9O1xuXG4gIGNvbnN0IHRhcmdldHMgPSBbXTtcbiAgY29uc3QgZ3JpZHMgPSBhbGxHcmlkcygpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JpZHMubGVuZ3RoOyBpKyspIHtcbiAgICBncmlkc1tpXS5jbGFzc0xpc3QuYWRkKGBncmlkJHtpfWApO1xuICB9XG5cbiAgT2JqZWN0LmtleXMoc2hpcHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGNvbnN0IGNvb3JkcyA9IHNoaXBzW2tleV07XG4gICAgT2JqZWN0LmtleXMoY29vcmRzKS5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgdGFyZ2V0cy5wdXNoKGNvb3JkKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgY29uc3QgdGFibGUgPSBjb252ZXJ0Q29vcmQoKTtcblxuICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gdGFibGVbdGFyZ2V0XTtcbiAgICAvLyBSb3RhdGUgZnVuY3Rpb24gZ29lcyBoZXJlXG4gICAgZ3JpZHNbaW5kZXhdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IGNvb3JkID0gZ3JpZEluZGV4KGUudGFyZ2V0KTtcbiAgICAgIHJvdGF0ZShjb29yZCwgc2hpcHMsIGJvYXJkLCBncmlkcywgdGFibGUpO1xuICAgICAgaGlnaExpZ2h0R3JpZChzaGlwcyk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcm90YXRlU2hpcDtcbiIsImNvbnN0IFNoaXAgPSAobGVuZ3RoLCBvcmllbnQpID0+IHtcbiAgbGV0IHN1bmsgPSBmYWxzZTtcbiAgbGV0IHRvdGFsSGl0cyA9IDA7XG5cbiAgY29uc3QgaGl0ID0gKCkgPT4ge1xuICAgIHRvdGFsSGl0cyArPSAxO1xuICB9O1xuXG4gIGNvbnN0IGNhbFN1bmsgPSAoKSA9PiB7XG4gICAgaWYgKGxlbmd0aCA9PT0gdG90YWxIaXRzKSB7XG4gICAgICBzdW5rID0gdHJ1ZTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGl0cyA9ICgpID0+IHRvdGFsSGl0cztcbiAgY29uc3QgaXNTdW5rID0gKCkgPT4gc3VuaztcblxuICByZXR1cm4geyBsZW5ndGgsIGhpdCwgY2FsU3VuaywgaGl0cywgaXNTdW5rLCBvcmllbnQgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcXG59XFxuXFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMzAsIDMwLCAzMCk7XFxufVxcblxcbi5jb250YWluZXIge1xcbiAgYm9yZGVyOiAxcHggc29pbGQgcmVkO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMWZyIDEwZnIgMWZyO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuLnRpdGxlLWRpdiB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBncmVlbnllbGxvdztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBncmlkLXJvdzogMSAvIDI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBjb2xvcjogZ3JheTtcXG4gIGZvbnQtc2l6ZTogMi41cmVtO1xcbn1cXG5cXG4uYm9hcmQtZGl2IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDVmciAxZnIgMWZyIDFmciA1ZnI7XFxuICB3aWR0aDogMTAwdnc7XFxuICAvKiBoZWlnaHQ6IGZpdC1jb250ZW50OyAqL1xcbiAgZ3JpZC1yb3c6IDIgLyAzO1xcbiAgY29sb3I6IHdoaXRlc21va2U7XFxufVxcblxcbi5zbWFsbC1jb250YWluZXIge1xcbiAgYm9yZGVyOiAycHggc29saWQgdG9tYXRvO1xcbiAgaGVpZ2h0OiBmaXQtY29udGVudDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ3JpZC1jb2x1bW46IDIgLyAzO1xcbn1cXG5cXG4uc21hbGwtYm9hcmQge1xcbiAgYm9yZGVyOiAycHggc29saWQgb3JhbmdlO1xcbiAgd2lkdGg6IDI1cmVtO1xcbiAgaGVpZ2h0OiAyNXJlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpO1xcblxcbn1cXG5cXG4uc21hbGwtbnVtLFxcbi5zbWFsbC1hcGwge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnNtYWxsLWdyaWQge1xcbiAgYm9yZGVyOiAycHggc29saWQgZ3JheTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufSBcXG5cXG4uc21hbGwtZ3JpZFtzdHlsZT1cXFwiYm9yZGVyOiAycHggc29saWQgY3lhbjtcXFwiXSB7XFxuICBjdXJzb3I6cG9pbnRlclxcbn1cXG5cXG4uc21hbGwtbmFtZSxcXG4uc21hbGwtd2luIHtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG59XFxuXFxuLmJpZy1jb250YWluZXIge1xcbiAgYm9yZGVyOiAycHggc29saWQgdG9tYXRvO1xcbiAgaGVpZ2h0OiBmaXQtY29udGVudDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ3JpZC1jb2x1bW46IDQgLyA1O1xcbn1cXG5cXG4uYmlnLWJvYXJkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIG9yYW5nZTtcXG4gIHdpZHRoOiAzMHJlbTtcXG4gIGhlaWdodDogMzByZW07XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMSwgMWZyKTtcXG59XFxuXFxuLmJpZy1udW0sXFxuLmJpZy1hbHAge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcXG59XFxuXFxuLmJpZy1ncmlkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGdyYXk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgY3Vyc29yOnBvaW50ZXJcXG59IFxcblxcbi5iaWctbmFtZSB7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxufVxcblxcbi5tZXNzYWdlIHtcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnNtYWxsLXdpbixcXG4uYmlnLXdpbiB7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxVQUFVO0VBQ1YsU0FBUztFQUNULHNCQUFzQjtFQUN0Qix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxpQ0FBaUM7QUFDbkM7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsYUFBYTtFQUNiLGdDQUFnQztFQUNoQyxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSw2QkFBNkI7RUFDN0IsYUFBYTtFQUNiLGVBQWU7RUFDZix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFdBQVc7RUFDWCxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsMENBQTBDO0VBQzFDLFlBQVk7RUFDWix5QkFBeUI7RUFDekIsZUFBZTtFQUNmLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLHdCQUF3QjtFQUN4QixtQkFBbUI7RUFDbkIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSx3QkFBd0I7RUFDeEIsWUFBWTtFQUNaLGFBQWE7RUFDYixhQUFhO0VBQ2Isc0NBQXNDO0VBQ3RDLG1DQUFtQzs7QUFFckM7O0FBRUE7O0VBRUUsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRTtBQUNGOztBQUVBOztFQUVFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHdCQUF3QjtFQUN4QixtQkFBbUI7RUFDbkIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSx3QkFBd0I7RUFDeEIsWUFBWTtFQUNaLGFBQWE7RUFDYixhQUFhO0VBQ2Isc0NBQXNDO0VBQ3RDLG1DQUFtQztBQUNyQzs7QUFFQTs7RUFFRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkI7QUFDRjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2YsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7O0VBRUUsa0JBQWtCO0FBQ3BCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcXG59XFxuXFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMzAsIDMwLCAzMCk7XFxufVxcblxcbi5jb250YWluZXIge1xcbiAgYm9yZGVyOiAxcHggc29pbGQgcmVkO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMWZyIDEwZnIgMWZyO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuLnRpdGxlLWRpdiB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBncmVlbnllbGxvdztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBncmlkLXJvdzogMSAvIDI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBjb2xvcjogZ3JheTtcXG4gIGZvbnQtc2l6ZTogMi41cmVtO1xcbn1cXG5cXG4uYm9hcmQtZGl2IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDVmciAxZnIgMWZyIDFmciA1ZnI7XFxuICB3aWR0aDogMTAwdnc7XFxuICAvKiBoZWlnaHQ6IGZpdC1jb250ZW50OyAqL1xcbiAgZ3JpZC1yb3c6IDIgLyAzO1xcbiAgY29sb3I6IHdoaXRlc21va2U7XFxufVxcblxcbi5zbWFsbC1jb250YWluZXIge1xcbiAgYm9yZGVyOiAycHggc29saWQgdG9tYXRvO1xcbiAgaGVpZ2h0OiBmaXQtY29udGVudDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ3JpZC1jb2x1bW46IDIgLyAzO1xcbn1cXG5cXG4uc21hbGwtYm9hcmQge1xcbiAgYm9yZGVyOiAycHggc29saWQgb3JhbmdlO1xcbiAgd2lkdGg6IDI1cmVtO1xcbiAgaGVpZ2h0OiAyNXJlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpO1xcblxcbn1cXG5cXG4uc21hbGwtbnVtLFxcbi5zbWFsbC1hcGwge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnNtYWxsLWdyaWQge1xcbiAgYm9yZGVyOiAycHggc29saWQgZ3JheTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufSBcXG5cXG4uc21hbGwtZ3JpZFtzdHlsZT1cXFwiYm9yZGVyOiAycHggc29saWQgY3lhbjtcXFwiXSB7XFxuICBjdXJzb3I6cG9pbnRlclxcbn1cXG5cXG4uc21hbGwtbmFtZSxcXG4uc21hbGwtd2luIHtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG59XFxuXFxuLmJpZy1jb250YWluZXIge1xcbiAgYm9yZGVyOiAycHggc29saWQgdG9tYXRvO1xcbiAgaGVpZ2h0OiBmaXQtY29udGVudDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ3JpZC1jb2x1bW46IDQgLyA1O1xcbn1cXG5cXG4uYmlnLWJvYXJkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIG9yYW5nZTtcXG4gIHdpZHRoOiAzMHJlbTtcXG4gIGhlaWdodDogMzByZW07XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMSwgMWZyKTtcXG59XFxuXFxuLmJpZy1udW0sXFxuLmJpZy1hbHAge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcXG59XFxuXFxuLmJpZy1ncmlkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGdyYXk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgY3Vyc29yOnBvaW50ZXJcXG59IFxcblxcbi5iaWctbmFtZSB7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxufVxcblxcbi5tZXNzYWdlIHtcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnNtYWxsLXdpbixcXG4uYmlnLXdpbiB7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJztcbmltcG9ydCB7IGhpZ2hMaWdodEdyaWQsIGhpZ2hCaWcgfSBmcm9tICcuL2Rpc3BsYXktc2hpcHMnO1xuaW1wb3J0IGNyZWF0ZUNsaWNrIGZyb20gJy4vY2xpY2stYm9hcmQnO1xuLy8gaW1wb3J0IHsgY29udmVydE51bSwgY29udmVydENvb3JkIH0gZnJvbSAnLi9jb252ZXJ0JztcbmltcG9ydCByb3RhdGVTaGlwIGZyb20gJy4vcm90YXRlJztcblxuY29uc3QgcGxheWVyQm9hcmQgPSBHYW1lYm9hcmQoKTtcbmNvbnN0IGNvbXB1dGVyQm9hcmQgPSBHYW1lYm9hcmQoKTtcbmNvbnN0IGNvbXB1dGVyUGxheWVyID0gUGxheWVyKHBsYXllckJvYXJkKTtcbmNvbXB1dGVyUGxheWVyLmNvbXB1dGVyT24oKTtcbmNvbnN0IGh1bWFuUGxheWVyID0gUGxheWVyKGNvbXB1dGVyQm9hcmQsIGNvbXB1dGVyUGxheWVyLCBwbGF5ZXJCb2FyZCk7XG5cbnBsYXllckJvYXJkLnBsYWNlU2hpcCg0LCAxLCA1LCAndmVydGljYWwnKTtcbnBsYXllckJvYXJkLnBsYWNlU2hpcCgyLCAxLCA0LCAnaG9yaXpvbnRhbCcpO1xuLy8gcGxheWVyQm9hcmQucGxhY2VTaGlwKDYsIDQsIDMsICdob3Jpem9udGFsJyk7XG5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoMSwgNywgMiwgJ3ZlcnRpY2FsJyk7XG4vLyBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoOSwgOSwgMSwgJ3ZlcnRpY2FsJyk7XG4vLyBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoNywgOCwgMSwgJ3ZlcnRpY2FsJyk7XG5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoOSwgNSwgMywgJ2hvcml6b250YWwnKTtcbi8vIHBsYXllckJvYXJkLnBsYWNlU2hpcCgyLCA0LCAyLCAnaG9yaXpvbnRhbCcpO1xuXG5oaWdoTGlnaHRHcmlkKHBsYXllckJvYXJkLnNoaXBSZWNvcmQpO1xuXG4vLyBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCgxLCAxLCA1LCAndmVydGljYWwnKTtcbi8vIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDMsIDMsIDQsICd2ZXJ0aWNhbCcpO1xuLy8gY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoOCwgMywgMywgJ2hvcml6b250YWwnKTtcbi8vIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDEsIDUsIDIsICd2ZXJ0aWNhbCcpO1xuLy8gY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoNCwgNiwgMiwgJ3ZlcnRpY2FsJyk7XG4vLyBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCgzLCA5LCAxLCAndmVydGljYWwnKTtcbi8vIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDcsIDAsIDEsICd2ZXJ0aWNhbCcpO1xuXG5oaWdoQmlnKGNvbXB1dGVyQm9hcmQuc2hpcFJlY29yZCk7XG5cbmNyZWF0ZUNsaWNrKGh1bWFuUGxheWVyLCBjb21wdXRlckJvYXJkLCBwbGF5ZXJCb2FyZCk7XG5cbnJvdGF0ZVNoaXAocGxheWVyQm9hcmQuc2hpcFJlY29yZCwgcGxheWVyQm9hcmQpO1xuIl0sIm5hbWVzIjpbImNvbnZlcnROdW0iLCJkaXNwbGF5SGl0IiwiYWxsR3JpZHMiLCJncmlkcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImdyaWRJbmRleCIsImdyaWQiLCJyZSIsIm51bSIsImNsYXNzTmFtZSIsImdyaWROdW0iLCJleGVjIiwic2xpY2UiLCJsZW5ndGgiLCJjb29yZCIsImNyZWF0ZUNsaWNrIiwicGxheWVyIiwiY29tcHV0ZXJCb2FyZCIsInBsYXllckJvYXJkIiwic21hbGxXaW4iLCJxdWVyeVNlbGVjdG9yIiwiYmlnV2luIiwiY2xpY2tTdHlsZSIsInRhcmdldCIsImF0dGFjayIsInJlc3VsdCIsImZpbmRHcmlkIiwiZnVsbEJvYXJkIiwibWlzcyIsInRleHRDb250ZW50Iiwic3R5bGUiLCJmb250U2l6ZSIsImNvbG9yIiwic2hpcCIsInVuZGVmaW5lZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjb21wdXRlclN1bmsiLCJjaGVja1N1bmsiLCJwbGF5ZXJTdW5rIiwiZm9yRWFjaCIsImNvbnNvbGUiLCJsb2ciLCJzaGlwUmVjb3JkIiwic3Vua1JlY29yZCIsImkiLCJjbGFzc0xpc3QiLCJhZGQiLCJhZGRFdmVudExpc3RlbmVyIiwiY29udmVydENvb3JkIiwiYXJndW1lbnRzIiwieCIsInkiLCJ0YWJsZSIsImhpZ2hMaWdodEdyaWQiLCJzaGlwcyIsInRhcmdldHMiLCJPYmplY3QiLCJrZXlzIiwia2V5IiwiY29vcmRzIiwicHVzaCIsImluZGV4IiwiYm9yZGVyIiwiaGlnaEJpZyIsImJvYXJkIiwiaGl0UmVjb3JkIiwiU2hpcCIsIkdyaWQiLCJ1cCIsInJpZ2h0IiwiYm91bmRhcnkiLCJHYW1lYm9hcmQiLCJtYWtlQm9hcmQiLCJwIiwicSIsInN1cnZleUdyaWQiLCJvcmllbnQiLCJjb3VudCIsInBsYWNlQm91bmRhcnkiLCJsaXN0IiwicGxhY2VTaGlwIiwicmVjb3JkIiwiY2hlY2tMZW5ndGgiLCJzdXJ2ZXkiLCJzaGlwTmFtZSIsImZsZWV0IiwicmVjb3JkS2V5Iiwic2hpcEtleXMiLCJjb29yZE9iaiIsImNvb3JkS2V5cyIsImNoZWNrU2hpcCIsIk51bWJlciIsImNhbFN1bmsiLCJpc1N1bmsiLCJpbmNsdWRlcyIsInJlY2VpdmVBdHRhY2siLCJhdHRhY2tTaGlwIiwiY3VycmVudFNoaXAiLCJhbGxDb29yZCIsImFsbEtleXMiLCJwcm9wZXJ0eSIsIm9uZUhpdCIsImhpdCIsIlBsYXllciIsImVuZW15Qm9hcmQiLCJjb21wdXRlclBsYXllciIsIm93bkJvYXJkIiwiYWkiLCJjb21wdXRlck9uIiwiY29tcHV0ZXIiLCJodW1hbkF1dG9Nb3ZlIiwiZ2V0UmFuZG9tSW50IiwibWluIiwibWF4IiwiTWF0aCIsImNlaWwiLCJmbG9vciIsInJhbmRvbSIsImhpdEtleXMiLCJhdXRvTW92ZSIsInJlc3BvbnNlIiwicm90YXRlIiwic2hpcEJhc2UiLCJvbmVTaGlwIiwic2hpcENvb3JkcyIsInNoaXBMZW5ndGgiLCJwYXJ0IiwibmV3WCIsIm5ld1kiLCJjaGVjayIsInJvdGF0ZVNoaXAiLCJlIiwic3VuayIsInRvdGFsSGl0cyIsImhpdHMiLCJodW1hblBsYXllciJdLCJzb3VyY2VSb290IjoiIn0=