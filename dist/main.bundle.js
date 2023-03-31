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
  function clickStyle() {
    const target = gridIndex(this);
    player.attack(target[0], target[1]);
    const result = computerBoard.findGrid(computerBoard.fullBoard, target[0], target[1]);
    if (result.miss === true) {
      this.style.color = 'whitesmoke';
    }
    if (result.ship !== undefined) {
      this.textContent = 'X';
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
      }
    }
    if (computerSunk === true) {
      grids.forEach(grid => {
        grid.removeEventListener('click', clickStyle);
      });
      console.log('Human win');
    }
    console.log(computerBoard.shipRecord);
    console.log(computerBoard.sunkRecord);
  }
  for (let i = 0; i < grids.length; i++) {
    grids[i].classList.add(`grid${i}`);
    grids[i].textContent = '/';
    grids[i].style.fontSize = '2rem';
    grids[i].style.color = 'transparent';
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
const preStyle = () => {
  const grids = allGrids();
  for (let i = 0; i < grids.length; i++) {
    grids[i].classList.add(`grid${i}`);
    grids[i].textContent = '/';
    grids[i].style.fontSize = '1.5rem';
    grids[i].style.color = 'transparent';
  }
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
  preStyle();
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
    grids[gridNum].style.color = 'whitesmoke';
  }
  if (target.ship !== undefined) {
    grids[gridNum].textContent = 'X';
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
  let ai = false;
  const computerOn = () => {
    ai = true;
  };
  const computer = () => ai;
  const attack = (x, y) => {
    enemyBoard.receiveAttack(x, y);
    if (computerPlayer !== undefined) {
      if (computerPlayer.computer() === true) {
        autoMove();
      }
    }
  };
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  font-family: sans-serif;\n}\n\nbody {\n  background-color: rgb(30, 30, 30);\n}\n\n.container {\n  border: 1px soild red;\n  display: grid;\n  grid-template-rows: 1fr 4fr;\n  height: 100vh;\n}\n\n.title-div {\n  border: 2px solid greenyellow;\n  display: flex;\n  grid-row: 1 / 2;\n  justify-content: center;\n  align-items: center;\n  color: gray;\n  font-size: 2.5rem;\n}\n\n.board-div {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  width: 100vw;\n  grid-row: 2 / 3;\n  color: whitesmoke;\n}\n\n.small-board {\n  border: 2px solid orange;\n  justify-self: center;\n  width: 25rem;\n  height: 25rem;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.small-grid {\n  border: 2px solid gray;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n} \n\n.big-board {\n  border: 2px solid orange;\n  grid-column: 2 / 3;\n  width: 30rem;\n  height: 30rem;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  resize: none;\n}\n\n.big-grid {\n  border: 2px solid gray;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor:pointer\n} \n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,UAAU;EACV,SAAS;EACT,sBAAsB;EACtB,uBAAuB;AACzB;;AAEA;EACE,iCAAiC;AACnC;;AAEA;EACE,qBAAqB;EACrB,aAAa;EACb,2BAA2B;EAC3B,aAAa;AACf;;AAEA;EACE,6BAA6B;EAC7B,aAAa;EACb,eAAe;EACf,uBAAuB;EACvB,mBAAmB;EACnB,WAAW;EACX,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,YAAY;EACZ,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,wBAAwB;EACxB,oBAAoB;EACpB,YAAY;EACZ,aAAa;EACb,aAAa;EACb,sCAAsC;AACxC;;AAEA;EACE,sBAAsB;EACtB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,wBAAwB;EACxB,kBAAkB;EAClB,YAAY;EACZ,aAAa;EACb,aAAa;EACb,sCAAsC;EACtC,YAAY;AACd;;AAEA;EACE,sBAAsB;EACtB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB;AACF","sourcesContent":["* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  font-family: sans-serif;\n}\n\nbody {\n  background-color: rgb(30, 30, 30);\n}\n\n.container {\n  border: 1px soild red;\n  display: grid;\n  grid-template-rows: 1fr 4fr;\n  height: 100vh;\n}\n\n.title-div {\n  border: 2px solid greenyellow;\n  display: flex;\n  grid-row: 1 / 2;\n  justify-content: center;\n  align-items: center;\n  color: gray;\n  font-size: 2.5rem;\n}\n\n.board-div {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  width: 100vw;\n  grid-row: 2 / 3;\n  color: whitesmoke;\n}\n\n.small-board {\n  border: 2px solid orange;\n  justify-self: center;\n  width: 25rem;\n  height: 25rem;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.small-grid {\n  border: 2px solid gray;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n} \n\n.big-board {\n  border: 2px solid orange;\n  grid-column: 2 / 3;\n  width: 30rem;\n  height: 30rem;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  resize: none;\n}\n\n.big-grid {\n  border: 2px solid gray;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor:pointer\n} \n"],"sourceRoot":""}]);
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
playerBoard.placeShip(5, 1, 5, 'vertical');
playerBoard.placeShip(4, 3, 4, 'horizontal');
playerBoard.placeShip(6, 4, 3, 'horizontal');
playerBoard.placeShip(1, 7, 2, 'vertical');
playerBoard.placeShip(4, 8, 2, 'vertical');
playerBoard.placeShip(9, 9, 1, 'vertical');
playerBoard.placeShip(7, 8, 1, 'vertical');
(0,_display_ships__WEBPACK_IMPORTED_MODULE_3__.highlightGrid)(playerBoard.shipRecord);
computerBoard.placeShip(1, 1, 5, 'vertical');
computerBoard.placeShip(3, 3, 4, 'vertical');
computerBoard.placeShip(8, 3, 3, 'horizontal');
computerBoard.placeShip(1, 5, 2, 'vertical');
computerBoard.placeShip(4, 6, 2, 'vertical');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxFQUFFLFVBQVUsQ0FBQztBQUUxQ3hCLDZEQUFhLENBQUNqQyxXQUFXLENBQUNvQixVQUFVLENBQUM7QUFFckNyQixhQUFhLENBQUMwRCxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDO0FBQzVDMUQsYUFBYSxDQUFDMEQsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQztBQUM1QzFELGFBQWEsQ0FBQzBELFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxZQUFZLENBQUM7QUFDOUMxRCxhQUFhLENBQUMwRCxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDO0FBQzVDMUQsYUFBYSxDQUFDMEQsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQztBQUM1QzFELGFBQWEsQ0FBQzBELFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUM7QUFDNUMxRCxhQUFhLENBQUMwRCxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDO0FBRTVDZCx1REFBTyxDQUFDNUMsYUFBYSxDQUFDcUIsVUFBVSxDQUFDO0FBRWpDdkIsd0RBQVcsQ0FBQ3NHLFdBQVcsRUFBRXBHLGFBQWEsRUFBRUMsV0FBVyxDQUFDOztBQUVwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL2NsaWNrLWJvYXJkLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9jb252ZXJ0LmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9kaXNwbGF5LXNoaXBzLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL25wbS1zZXR1cC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL25wbS1zZXR1cC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25wbS1zZXR1cC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25wbS1zZXR1cC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25wbS1zZXR1cC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25wbS1zZXR1cC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbnZlcnROdW0gfSBmcm9tICcuL2NvbnZlcnQnO1xuaW1wb3J0IHsgZGlzcGxheUhpdCB9IGZyb20gJy4vZGlzcGxheS1zaGlwcyc7XG5cbmNvbnN0IGFsbEdyaWRzID0gKCkgPT4ge1xuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iaWctZ3JpZCcpO1xuICByZXR1cm4gZ3JpZHM7XG59O1xuXG5jb25zdCBncmlkSW5kZXggPSAoZ3JpZCkgPT4ge1xuICBjb25zdCByZSA9IC9bMC05XSsvO1xuICBjb25zdCBudW0gPSBncmlkLmNsYXNzTmFtZTtcbiAgY29uc3QgZ3JpZE51bSA9IHJlLmV4ZWMobnVtLnNsaWNlKG51bS5sZW5ndGggLSAyLCBudW0ubGVuZ3RoKSlbMF07XG4gIGNvbnN0IGNvb3JkID0gY29udmVydE51bSgpO1xuICByZXR1cm4gY29vcmRbZ3JpZE51bV07XG59O1xuXG5jb25zdCBjcmVhdGVDbGljayA9IChwbGF5ZXIsIGNvbXB1dGVyQm9hcmQsIHBsYXllckJvYXJkKSA9PiB7XG4gIGNvbnN0IGdyaWRzID0gYWxsR3JpZHMoKTtcblxuICBmdW5jdGlvbiBjbGlja1N0eWxlKCkge1xuICAgIGNvbnN0IHRhcmdldCA9IGdyaWRJbmRleCh0aGlzKTtcbiAgICBwbGF5ZXIuYXR0YWNrKHRhcmdldFswXSwgdGFyZ2V0WzFdKTtcbiAgICBjb25zdCByZXN1bHQgPSBjb21wdXRlckJvYXJkLmZpbmRHcmlkKFxuICAgICAgY29tcHV0ZXJCb2FyZC5mdWxsQm9hcmQsXG4gICAgICB0YXJnZXRbMF0sXG4gICAgICB0YXJnZXRbMV1cbiAgICApO1xuICAgIGlmIChyZXN1bHQubWlzcyA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5zdHlsZS5jb2xvciA9ICd3aGl0ZXNtb2tlJztcbiAgICB9XG4gICAgaWYgKHJlc3VsdC5zaGlwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMudGV4dENvbnRlbnQgPSAnWCc7XG4gICAgICB0aGlzLnN0eWxlLmNvbG9yID0gJ3JlZCc7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja1N0eWxlKTtcblxuICAgIGNvbnN0IGNvbXB1dGVyU3VuayA9IGNvbXB1dGVyQm9hcmQuY2hlY2tTdW5rKCk7XG5cbiAgICBpZiAoY29tcHV0ZXJTdW5rID09PSBmYWxzZSkge1xuICAgICAgZGlzcGxheUhpdChwbGF5ZXJCb2FyZCk7XG4gICAgICBjb25zdCBwbGF5ZXJTdW5rID0gcGxheWVyQm9hcmQuY2hlY2tTdW5rKCk7XG4gICAgICBpZiAocGxheWVyU3VuayA9PT0gdHJ1ZSkge1xuICAgICAgICBncmlkcy5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgICAgICAgZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrU3R5bGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coJ0NvbXB1dGVyIHdpbicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb21wdXRlclN1bmsgPT09IHRydWUpIHtcbiAgICAgIGdyaWRzLmZvckVhY2goKGdyaWQpID0+IHtcbiAgICAgICAgZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrU3R5bGUpO1xuICAgICAgfSk7XG4gICAgICBjb25zb2xlLmxvZygnSHVtYW4gd2luJyk7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coY29tcHV0ZXJCb2FyZC5zaGlwUmVjb3JkKTtcbiAgICBjb25zb2xlLmxvZyhjb21wdXRlckJvYXJkLnN1bmtSZWNvcmQpO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkcy5sZW5ndGg7IGkrKykge1xuICAgIGdyaWRzW2ldLmNsYXNzTGlzdC5hZGQoYGdyaWQke2l9YCk7XG4gICAgZ3JpZHNbaV0udGV4dENvbnRlbnQgPSAnLyc7XG4gICAgZ3JpZHNbaV0uc3R5bGUuZm9udFNpemUgPSAnMnJlbSc7XG4gICAgZ3JpZHNbaV0uc3R5bGUuY29sb3IgPSAndHJhbnNwYXJlbnQnO1xuICAgIGdyaWRzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tTdHlsZSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNsaWNrO1xuIiwiY29uc3QgY29udmVydENvb3JkID0gKG51bSA9IDAsIHggPSA5LCB5ID0gMCwgdGFibGUgPSB7fSkgPT4ge1xuICBpZiAobnVtID4gOTkpIHtcbiAgICByZXR1cm4gdGFibGU7XG4gIH1cbiAgY29uc3QgY29vcmQgPSBbeCwgeV07XG4gIHRhYmxlW2Nvb3JkXSA9IG51bTtcbiAgaWYgKHkgPT09IDkpIHtcbiAgICB4IC09IDE7XG4gICAgeSA9IC0xO1xuICB9XG4gIHJldHVybiBjb252ZXJ0Q29vcmQobnVtICsgMSwgeCwgeSArIDEsIHRhYmxlKTtcbn07XG5cbmNvbnN0IGNvbnZlcnROdW0gPSAobnVtID0gMCwgeCA9IDksIHkgPSAwLCB0YWJsZSA9IHt9KSA9PiB7XG4gIGlmIChudW0gPiA5OSkge1xuICAgIHJldHVybiB0YWJsZTtcbiAgfVxuICBjb25zdCBjb29yZCA9IFt4LCB5XTtcbiAgdGFibGVbbnVtXSA9IGNvb3JkO1xuICBpZiAoeSA9PT0gOSkge1xuICAgIHggLT0gMTtcbiAgICB5ID0gLTE7XG4gIH1cbiAgcmV0dXJuIGNvbnZlcnROdW0obnVtICsgMSwgeCwgeSArIDEsIHRhYmxlKTtcbn07XG5cbmV4cG9ydCB7IGNvbnZlcnRDb29yZCwgY29udmVydE51bSB9O1xuIiwiaW1wb3J0IHsgY29udmVydENvb3JkIH0gZnJvbSAnLi9jb252ZXJ0JztcblxuY29uc3QgYWxsR3JpZHMgPSAoKSA9PiB7XG4gIGNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNtYWxsLWdyaWQnKTtcbiAgcmV0dXJuIGdyaWRzO1xufTtcblxuY29uc3QgcHJlU3R5bGUgPSAoKSA9PiB7XG4gIGNvbnN0IGdyaWRzID0gYWxsR3JpZHMoKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkcy5sZW5ndGg7IGkrKykge1xuICAgIGdyaWRzW2ldLmNsYXNzTGlzdC5hZGQoYGdyaWQke2l9YCk7XG4gICAgZ3JpZHNbaV0udGV4dENvbnRlbnQgPSAnLyc7XG4gICAgZ3JpZHNbaV0uc3R5bGUuZm9udFNpemUgPSAnMS41cmVtJztcbiAgICBncmlkc1tpXS5zdHlsZS5jb2xvciA9ICd0cmFuc3BhcmVudCc7XG4gIH1cbn07XG5cbmNvbnN0IGhpZ2hsaWdodEdyaWQgPSAoc2hpcHMpID0+IHtcbiAgY29uc3QgdGFyZ2V0cyA9IFtdO1xuICBjb25zdCBncmlkcyA9IGFsbEdyaWRzKCk7XG5cbiAgT2JqZWN0LmtleXMoc2hpcHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGNvbnN0IGNvb3JkcyA9IHNoaXBzW2tleV07XG4gICAgT2JqZWN0LmtleXMoY29vcmRzKS5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgdGFyZ2V0cy5wdXNoKGNvb3JkKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgY29uc3QgdGFibGUgPSBjb252ZXJ0Q29vcmQoKTtcblxuICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gdGFibGVbdGFyZ2V0XTtcbiAgICBncmlkc1tpbmRleF0uc3R5bGUuYm9yZGVyID0gJzJweCBjeWFuIHNvbGlkJztcbiAgfSk7XG5cbiAgcHJlU3R5bGUoKTtcbn07XG5cbmNvbnN0IGhpZ2hCaWcgPSAoc2hpcHMpID0+IHtcbiAgY29uc3QgdGFyZ2V0cyA9IFtdO1xuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iaWctZ3JpZCcpO1xuXG4gIE9iamVjdC5rZXlzKHNoaXBzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBjb25zdCBjb29yZHMgPSBzaGlwc1trZXldO1xuICAgIE9iamVjdC5rZXlzKGNvb3JkcykuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIHRhcmdldHMucHVzaChjb29yZCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGNvbnN0IHRhYmxlID0gY29udmVydENvb3JkKCk7XG5cbiAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IHRhYmxlW3RhcmdldF07XG4gICAgZ3JpZHNbaW5kZXhdLnN0eWxlLmJvcmRlciA9ICcycHggY3lhbiBzb2xpZCc7XG4gIH0pO1xufTtcblxuY29uc3QgZGlzcGxheUhpdCA9IChib2FyZCkgPT4ge1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoYm9hcmQuaGl0UmVjb3JkKTtcbiAgY29uc3QgY29vcmQgPSBib2FyZC5oaXRSZWNvcmRba2V5c1trZXlzLmxlbmd0aCAtIDFdXTtcbiAgY29uc3QgdGFyZ2V0ID0gYm9hcmQuZmluZEdyaWQoYm9hcmQuZnVsbEJvYXJkLCBjb29yZFswXSwgY29vcmRbMV0pO1xuXG4gIGNvbnN0IGdyaWRzID0gYWxsR3JpZHMoKTtcbiAgY29uc3QgdGFibGUgPSBjb252ZXJ0Q29vcmQoKTtcbiAgY29uc3QgZ3JpZE51bSA9IHRhYmxlW2Nvb3JkXTtcblxuICBpZiAodGFyZ2V0Lm1pc3MgPT09IHRydWUpIHtcbiAgICBncmlkc1tncmlkTnVtXS5zdHlsZS5jb2xvciA9ICd3aGl0ZXNtb2tlJztcbiAgfVxuICBpZiAodGFyZ2V0LnNoaXAgIT09IHVuZGVmaW5lZCkge1xuICAgIGdyaWRzW2dyaWROdW1dLnRleHRDb250ZW50ID0gJ1gnO1xuICAgIGdyaWRzW2dyaWROdW1dLnN0eWxlLmNvbG9yID0gJ3JlZCc7XG4gIH1cbn07XG5cbmV4cG9ydCB7IGhpZ2hsaWdodEdyaWQsIGhpZ2hCaWcsIGRpc3BsYXlIaXQgfTtcbiIsImltcG9ydCBTaGlwIGZyb20gJy4vc2hpcCc7XG5cbmNvbnN0IEdyaWQgPSAoeCwgeSwgdXAsIHJpZ2h0LCBzaGlwLCBtaXNzID0gZmFsc2UpID0+IHtcbiAgY29uc3QgY29vcmQgPSBbeCwgeV07XG4gIHJldHVybiB7IGNvb3JkLCB1cCwgcmlnaHQsIHNoaXAsIG1pc3MgfTtcbn07XG5cbmNvbnN0IEdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgbWFrZUJvYXJkID0gKHggPSAwLCB5ID0gMCkgPT4ge1xuICAgIGlmICh4ID4gOSB8fCB5ID4gOSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgYm9hcmQgPSBHcmlkKHgsIHksIG1ha2VCb2FyZCh4ICsgMSwgeSksIG1ha2VCb2FyZCh4LCB5ICsgMSkpO1xuXG4gICAgcmV0dXJuIGJvYXJkO1xuICB9O1xuXG4gIGNvbnN0IGZpbmRHcmlkID0gKGdyaWQsIHAsIHEpID0+IHtcbiAgICBpZiAoZ3JpZC5jb29yZFswXSAhPT0gcCkge1xuICAgICAgZ3JpZCA9IGdyaWQudXA7XG4gICAgICByZXR1cm4gZmluZEdyaWQoZ3JpZCwgcCwgcSk7XG4gICAgfVxuXG4gICAgaWYgKGdyaWQuY29vcmRbMF0gPT09IHApIHtcbiAgICAgIGlmIChncmlkLmNvb3JkWzFdICE9PSBxKSB7XG4gICAgICAgIGdyaWQgPSBncmlkLnJpZ2h0O1xuICAgICAgICByZXR1cm4gZmluZEdyaWQoZ3JpZCwgcCwgcSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBncmlkO1xuICB9O1xuXG4gIGNvbnN0IHN1cnZleUdyaWQgPSAoeCwgeSwgbGVuZ3RoLCBvcmllbnQsIGNvdW50ID0gMCkgPT4ge1xuICAgIGlmIChjb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCwgeSkuc2hpcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAob3JpZW50ID09PSAndmVydGljYWwnKSB7XG4gICAgICAgIHJldHVybiBzdXJ2ZXlHcmlkKHggKyAxLCB5LCBsZW5ndGgsIG9yaWVudCwgY291bnQgKyAxKTtcbiAgICAgIH1cbiAgICAgIGlmIChvcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICByZXR1cm4gc3VydmV5R3JpZCh4LCB5ICsgMSwgbGVuZ3RoLCBvcmllbnQsIGNvdW50ICsgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoXG4gICAgeCxcbiAgICB5LFxuICAgIGxlbmd0aCxcbiAgICBvcmllbnQsXG4gICAgY291bnQgPSAwLFxuICAgIHJlY29yZCA9IHt9LFxuICAgIGNoZWNrTGVuZ3RoID0gdHJ1ZSxcbiAgICBzdXJ2ZXkgPSBudWxsXG4gICkgPT4ge1xuICAgIGlmIChjaGVja0xlbmd0aCA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHggKyBsZW5ndGggPiAxMCAmJiBvcmllbnQgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgcmV0dXJuICdTaGlwIG92ZXIgYm9yZGVyJztcbiAgICAgIH1cbiAgICAgIGlmICh5ICsgbGVuZ3RoID4gMTAgJiYgb3JpZW50ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgcmV0dXJuICdTaGlwIG92ZXIgYm9yZGVyJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VydmV5ID09PSBudWxsKSB7XG4gICAgICBpZiAob3JpZW50ID09PSAndmVydGljYWwnKSB7XG4gICAgICAgIHN1cnZleSA9IHN1cnZleUdyaWQoeCwgeSwgbGVuZ3RoLCAndmVydGljYWwnKTtcbiAgICAgIH1cbiAgICAgIGlmIChvcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICBzdXJ2ZXkgPSBzdXJ2ZXlHcmlkKHgsIHksIGxlbmd0aCwgJ2hvcml6b250YWwnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzaGlwTmFtZSA9IGZsZWV0W2xlbmd0aF07XG4gICAgaWYgKHNoaXBSZWNvcmRbc2hpcE5hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiAnU2hpcCBub3QgYXZhaWxhYmxlJztcbiAgICB9XG5cbiAgICBpZiAoY291bnQgPT09IGxlbmd0aCkge1xuICAgICAgaWYgKHNoaXBOYW1lID09PSAnRGVzdHJveWVyMScpIHtcbiAgICAgICAgZmxlZXRbbGVuZ3RoXSA9ICdEZXN0cm95ZXIyJztcbiAgICAgIH1cbiAgICAgIGlmIChzaGlwTmFtZSA9PT0gJ1N1Ym1hcmluZTEnKSB7XG4gICAgICAgIGZsZWV0W2xlbmd0aF0gPSAnU3VibWFyaW5lMic7XG4gICAgICB9XG4gICAgICBzaGlwUmVjb3JkW3NoaXBOYW1lXSA9IHJlY29yZDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZmluZEdyaWQoZnVsbEJvYXJkLCB4LCB5KS5zaGlwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBgU3BhY2UgYWxyZWFkeSB0YWtlbmA7XG4gICAgfVxuXG4gICAgaWYgKG9yaWVudCA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgaWYgKHN1cnZleSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBmaW5kR3JpZChmdWxsQm9hcmQsIHgsIHkpO1xuICAgICAgICB0YXJnZXQuc2hpcCA9IFNoaXAobGVuZ3RoKTtcbiAgICAgICAgY29uc3QgcmVjb3JkS2V5ID0gdGFyZ2V0LmNvb3JkO1xuICAgICAgICByZWNvcmRbcmVjb3JkS2V5XSA9IHJlY29yZEtleTtcbiAgICAgICAgY2hlY2tMZW5ndGggPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHBsYWNlU2hpcChcbiAgICAgICAgICB4ICsgMSxcbiAgICAgICAgICB5LFxuICAgICAgICAgIGxlbmd0aCxcbiAgICAgICAgICBvcmllbnQsXG4gICAgICAgICAgY291bnQgKyAxLFxuICAgICAgICAgIHJlY29yZCxcbiAgICAgICAgICBjaGVja0xlbmd0aCxcbiAgICAgICAgICBzdXJ2ZXlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdXJ2ZXkgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBgU3BhY2UgYWxyZWFkeSB0YWtlbmA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9yaWVudCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICBpZiAoc3VydmV5ID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCwgeSk7XG4gICAgICAgIHRhcmdldC5zaGlwID0gU2hpcChsZW5ndGgpO1xuICAgICAgICBjb25zdCByZWNvcmRLZXkgPSB0YXJnZXQuY29vcmQ7XG4gICAgICAgIHJlY29yZFtyZWNvcmRLZXldID0gcmVjb3JkS2V5O1xuICAgICAgICBjaGVja0xlbmd0aCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gcGxhY2VTaGlwKFxuICAgICAgICAgIHgsXG4gICAgICAgICAgeSArIDEsXG4gICAgICAgICAgbGVuZ3RoLFxuICAgICAgICAgIG9yaWVudCxcbiAgICAgICAgICBjb3VudCArIDEsXG4gICAgICAgICAgcmVjb3JkLFxuICAgICAgICAgIGNoZWNrTGVuZ3RoLFxuICAgICAgICAgIHN1cnZleVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKHN1cnZleSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGBTcGFjZSBhbHJlYWR5IHRha2VuYDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY2hlY2tTdW5rID0gKCkgPT4ge1xuICAgIGNvbnN0IHNoaXBLZXlzID0gT2JqZWN0LmtleXMoc2hpcFJlY29yZCk7XG4gICAgc2hpcEtleXMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgY29uc3QgY29vcmRPYmogPSBzaGlwUmVjb3JkW3NoaXBdO1xuICAgICAgY29uc3QgY29vcmRLZXlzID0gT2JqZWN0LmtleXMoY29vcmRPYmopO1xuICAgICAgY29uc3QgY2hlY2tTaGlwID0gZmluZEdyaWQoXG4gICAgICAgIGZ1bGxCb2FyZCxcbiAgICAgICAgTnVtYmVyKGNvb3JkS2V5c1swXVswXSksXG4gICAgICAgIE51bWJlcihjb29yZEtleXNbMF1bMl0pXG4gICAgICApO1xuICAgICAgY2hlY2tTaGlwLnNoaXAuY2FsU3VuaygpO1xuICAgICAgaWYgKGNoZWNrU2hpcC5zaGlwLmlzU3VuaygpID09PSB0cnVlKSB7XG4gICAgICAgIGlmICghT2JqZWN0LmtleXMoc3Vua1JlY29yZCkuaW5jbHVkZXMoc2hpcCkpIHtcbiAgICAgICAgICBzdW5rUmVjb3JkW3NoaXBdID0gc2hpcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKE9iamVjdC5rZXlzKHN1bmtSZWNvcmQpLmxlbmd0aCA9PT0gc2hpcEtleXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCwgeSk7XG4gICAgY29uc3QgY29vcmQgPSBbeCwgeV07XG4gICAgY29uc3QgYXR0YWNrU2hpcCA9IFtdO1xuXG4gICAgaWYgKHRhcmdldC5zaGlwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChoaXRSZWNvcmRbY29vcmRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaGl0UmVjb3JkW2Nvb3JkXSA9IGNvb3JkO1xuICAgICAgICBjb25zdCBmbGVldCA9IE9iamVjdC5rZXlzKHNoaXBSZWNvcmQpO1xuICAgICAgICBmbGVldC5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgICAgY29uc3QgY3VycmVudFNoaXAgPSBzaGlwUmVjb3JkW3NoaXBdO1xuICAgICAgICAgIGlmIChjdXJyZW50U2hpcFtjb29yZF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYXR0YWNrU2hpcC5wdXNoKHNoaXApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGFsbENvb3JkID0gc2hpcFJlY29yZFthdHRhY2tTaGlwWzBdXTtcbiAgICAgICAgY29uc3QgYWxsS2V5cyA9IE9iamVjdC5rZXlzKGFsbENvb3JkKTtcbiAgICAgICAgYWxsS2V5cy5mb3JFYWNoKChrZXlzKSA9PiB7XG4gICAgICAgICAgY29uc3QgcHJvcGVydHkgPSBhbGxDb29yZFtrZXlzXTtcbiAgICAgICAgICBjb25zdCBvbmVIaXQgPSBmaW5kR3JpZChmdWxsQm9hcmQsIHByb3BlcnR5WzBdLCBwcm9wZXJ0eVsxXSk7XG4gICAgICAgICAgb25lSGl0LnNoaXAuaGl0KCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChoaXRSZWNvcmRbY29vcmRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuICdTaGlwIGFscmVhZHkgaGl0JztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGFyZ2V0LnNoaXAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHRhcmdldC5taXNzID09PSBmYWxzZSkge1xuICAgICAgICBoaXRSZWNvcmRbY29vcmRdID0gY29vcmQ7XG4gICAgICAgIHRhcmdldC5taXNzID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAnSGl0dGluZyBhIG1pc3NlZCBzaG90IGFnYWluJztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZnVsbEJvYXJkID0gbWFrZUJvYXJkKCk7XG4gIGNvbnN0IHNoaXBSZWNvcmQgPSB7fTtcbiAgY29uc3QgaGl0UmVjb3JkID0ge307XG4gIGNvbnN0IHN1bmtSZWNvcmQgPSB7fTtcbiAgY29uc3QgZmxlZXQgPSB7XG4gICAgNTogJ0NhcnJpZXInLFxuICAgIDQ6ICdCYXR0bGVzaGlwJyxcbiAgICAzOiAnQ3J1c2llcicsXG4gICAgMjogJ0Rlc3Ryb3llcjEnLFxuICAgIDE6ICdTdWJtYXJpbmUxJyxcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGZ1bGxCb2FyZCxcbiAgICBwbGFjZVNoaXAsXG4gICAgZmluZEdyaWQsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBzaGlwUmVjb3JkLFxuICAgIGhpdFJlY29yZCxcbiAgICBjaGVja1N1bmssXG4gICAgc3Vua1JlY29yZCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImNvbnN0IFBsYXllciA9IChlbmVteUJvYXJkLCBjb21wdXRlclBsYXllciwgb3duQm9hcmQpID0+IHtcbiAgbGV0IGFpID0gZmFsc2U7XG5cbiAgY29uc3QgY29tcHV0ZXJPbiA9ICgpID0+IHtcbiAgICBhaSA9IHRydWU7XG4gIH07XG5cbiAgY29uc3QgY29tcHV0ZXIgPSAoKSA9PiBhaTtcblxuICBjb25zdCBhdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICBpZiAoY29tcHV0ZXJQbGF5ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGNvbXB1dGVyUGxheWVyLmNvbXB1dGVyKCkgPT09IHRydWUpIHtcbiAgICAgICAgYXV0b01vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0UmFuZG9tSW50ID0gKG1pbiwgbWF4KSA9PiB7XG4gICAgbWluID0gTWF0aC5jZWlsKG1pbik7XG4gICAgbWF4ID0gTWF0aC5mbG9vcihtYXgpO1xuXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XG4gIH07XG5cbiAgY29uc3QgYXV0b01vdmUgPSAoKSA9PiB7XG4gICAgY29uc3QgeCA9IGdldFJhbmRvbUludCgwLCA5KTtcbiAgICBjb25zdCB5ID0gZ2V0UmFuZG9tSW50KDAsIDkpO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBvd25Cb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuXG4gICAgaWYgKHJlc3BvbnNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBhdXRvTW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4geyBhdHRhY2ssIGNvbXB1dGVyT24sIGNvbXB1dGVyLCBnZXRSYW5kb21JbnQgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImNvbnN0IFNoaXAgPSAobGVuZ3RoKSA9PiB7XG4gIGxldCBzdW5rID0gZmFsc2U7XG4gIGxldCB0b3RhbEhpdHMgPSAwO1xuXG4gIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICB0b3RhbEhpdHMgKz0gMTtcbiAgfTtcblxuICBjb25zdCBjYWxTdW5rID0gKCkgPT4ge1xuICAgIGlmIChsZW5ndGggPT09IHRvdGFsSGl0cykge1xuICAgICAgc3VuayA9IHRydWU7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhpdHMgPSAoKSA9PiB0b3RhbEhpdHM7XG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHN1bms7XG5cbiAgcmV0dXJuIHsgbGVuZ3RoLCBoaXQsIGNhbFN1bmssIGhpdHMsIGlzU3VuayB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKiB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigzMCwgMzAsIDMwKTtcXG59XFxuXFxuLmNvbnRhaW5lciB7XFxuICBib3JkZXI6IDFweCBzb2lsZCByZWQ7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgNGZyO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuLnRpdGxlLWRpdiB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBncmVlbnllbGxvdztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBncmlkLXJvdzogMSAvIDI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBjb2xvcjogZ3JheTtcXG4gIGZvbnQtc2l6ZTogMi41cmVtO1xcbn1cXG5cXG4uYm9hcmQtZGl2IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICB3aWR0aDogMTAwdnc7XFxuICBncmlkLXJvdzogMiAvIDM7XFxuICBjb2xvcjogd2hpdGVzbW9rZTtcXG59XFxuXFxuLnNtYWxsLWJvYXJkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIG9yYW5nZTtcXG4gIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbiAgd2lkdGg6IDI1cmVtO1xcbiAgaGVpZ2h0OiAyNXJlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG59XFxuXFxuLnNtYWxsLWdyaWQge1xcbiAgYm9yZGVyOiAycHggc29saWQgZ3JheTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufSBcXG5cXG4uYmlnLWJvYXJkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIG9yYW5nZTtcXG4gIGdyaWQtY29sdW1uOiAyIC8gMztcXG4gIHdpZHRoOiAzMHJlbTtcXG4gIGhlaWdodDogMzByZW07XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICByZXNpemU6IG5vbmU7XFxufVxcblxcbi5iaWctZ3JpZCB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBncmF5O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGN1cnNvcjpwb2ludGVyXFxufSBcXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsVUFBVTtFQUNWLFNBQVM7RUFDVCxzQkFBc0I7RUFDdEIsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsaUNBQWlDO0FBQ25DOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLGFBQWE7RUFDYiwyQkFBMkI7RUFDM0IsYUFBYTtBQUNmOztBQUVBO0VBQ0UsNkJBQTZCO0VBQzdCLGFBQWE7RUFDYixlQUFlO0VBQ2YsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixZQUFZO0VBQ1osZUFBZTtFQUNmLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLHdCQUF3QjtFQUN4QixvQkFBb0I7RUFDcEIsWUFBWTtFQUNaLGFBQWE7RUFDYixhQUFhO0VBQ2Isc0NBQXNDO0FBQ3hDOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usd0JBQXdCO0VBQ3hCLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osYUFBYTtFQUNiLGFBQWE7RUFDYixzQ0FBc0M7RUFDdEMsWUFBWTtBQUNkOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigzMCwgMzAsIDMwKTtcXG59XFxuXFxuLmNvbnRhaW5lciB7XFxuICBib3JkZXI6IDFweCBzb2lsZCByZWQ7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgNGZyO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuLnRpdGxlLWRpdiB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBncmVlbnllbGxvdztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBncmlkLXJvdzogMSAvIDI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBjb2xvcjogZ3JheTtcXG4gIGZvbnQtc2l6ZTogMi41cmVtO1xcbn1cXG5cXG4uYm9hcmQtZGl2IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICB3aWR0aDogMTAwdnc7XFxuICBncmlkLXJvdzogMiAvIDM7XFxuICBjb2xvcjogd2hpdGVzbW9rZTtcXG59XFxuXFxuLnNtYWxsLWJvYXJkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIG9yYW5nZTtcXG4gIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbiAgd2lkdGg6IDI1cmVtO1xcbiAgaGVpZ2h0OiAyNXJlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG59XFxuXFxuLnNtYWxsLWdyaWQge1xcbiAgYm9yZGVyOiAycHggc29saWQgZ3JheTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufSBcXG5cXG4uYmlnLWJvYXJkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIG9yYW5nZTtcXG4gIGdyaWQtY29sdW1uOiAyIC8gMztcXG4gIHdpZHRoOiAzMHJlbTtcXG4gIGhlaWdodDogMzByZW07XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICByZXNpemU6IG5vbmU7XFxufVxcblxcbi5iaWctZ3JpZCB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBncmF5O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGN1cnNvcjpwb2ludGVyXFxufSBcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgeyBoaWdobGlnaHRHcmlkLCBoaWdoQmlnIH0gZnJvbSAnLi9kaXNwbGF5LXNoaXBzJztcbmltcG9ydCBjcmVhdGVDbGljayBmcm9tICcuL2NsaWNrLWJvYXJkJztcblxuY29uc3QgcGxheWVyQm9hcmQgPSBHYW1lYm9hcmQoKTtcbmNvbnN0IGNvbXB1dGVyQm9hcmQgPSBHYW1lYm9hcmQoKTtcbmNvbnN0IGNvbXB1dGVyUGxheWVyID0gUGxheWVyKHBsYXllckJvYXJkKTtcbmNvbXB1dGVyUGxheWVyLmNvbXB1dGVyT24oKTtcbmNvbnN0IGh1bWFuUGxheWVyID0gUGxheWVyKGNvbXB1dGVyQm9hcmQsIGNvbXB1dGVyUGxheWVyLCBwbGF5ZXJCb2FyZCk7XG5cbnBsYXllckJvYXJkLnBsYWNlU2hpcCg1LCAxLCA1LCAndmVydGljYWwnKTtcbnBsYXllckJvYXJkLnBsYWNlU2hpcCg0LCAzLCA0LCAnaG9yaXpvbnRhbCcpO1xucGxheWVyQm9hcmQucGxhY2VTaGlwKDYsIDQsIDMsICdob3Jpem9udGFsJyk7XG5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoMSwgNywgMiwgJ3ZlcnRpY2FsJyk7XG5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoNCwgOCwgMiwgJ3ZlcnRpY2FsJyk7XG5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoOSwgOSwgMSwgJ3ZlcnRpY2FsJyk7XG5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoNywgOCwgMSwgJ3ZlcnRpY2FsJyk7XG5cbmhpZ2hsaWdodEdyaWQocGxheWVyQm9hcmQuc2hpcFJlY29yZCk7XG5cbmNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDEsIDEsIDUsICd2ZXJ0aWNhbCcpO1xuY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMywgMywgNCwgJ3ZlcnRpY2FsJyk7XG5jb21wdXRlckJvYXJkLnBsYWNlU2hpcCg4LCAzLCAzLCAnaG9yaXpvbnRhbCcpO1xuY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMSwgNSwgMiwgJ3ZlcnRpY2FsJyk7XG5jb21wdXRlckJvYXJkLnBsYWNlU2hpcCg0LCA2LCAyLCAndmVydGljYWwnKTtcbmNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDMsIDksIDEsICd2ZXJ0aWNhbCcpO1xuY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoNywgMCwgMSwgJ3ZlcnRpY2FsJyk7XG5cbmhpZ2hCaWcoY29tcHV0ZXJCb2FyZC5zaGlwUmVjb3JkKTtcblxuY3JlYXRlQ2xpY2soaHVtYW5QbGF5ZXIsIGNvbXB1dGVyQm9hcmQsIHBsYXllckJvYXJkKTtcblxuLy8gcGxheWVyQm9hcmQucmVjZWl2ZUF0dGFjayg1LCAxKTtcbi8vIHBsYXllckJvYXJkLnJlY2VpdmVBdHRhY2soNCwgMyk7XG4vLyBwbGF5ZXJCb2FyZC5yZWNlaXZlQXR0YWNrKDYsIDQpO1xuLy8gcGxheWVyQm9hcmQucmVjZWl2ZUF0dGFjaygxLCA3KTtcbi8vIHBsYXllckJvYXJkLnJlY2VpdmVBdHRhY2soNCwgOCk7XG4vLyBwbGF5ZXJCb2FyZC5yZWNlaXZlQXR0YWNrKDksIDkpO1xuLy8gY29uc29sZS5sb2cocGxheWVyQm9hcmQuaGl0UmVjb3JkKTtcbi8vIHBsYXllckJvYXJkLnJlY2VpdmVBdHRhY2soNywgOCk7XG4vLyBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4vLyAgIGNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJpZy1ncmlkJyk7XG4vLyAgIGdyaWRzW2ldLmNsaWNrKCk7XG4vLyB9XG4vLyBNYWtlIGVuZW15IGJvYXJkIGNsaWNrYWJsZSwgaW52b2tlIGF0dGFjayBieSBjbGlja2luZyxcbi8vIGRpc3BsYXkgd2hldGhlciBoaXQgb3IgbWlzc1xuXG4vLyBNYWtlIHBsYXllciBib2FyZCBkaXNwbGF5IHdoZXRlciBoaXQgb3IgbWlzc1xuIl0sIm5hbWVzIjpbImNvbnZlcnROdW0iLCJkaXNwbGF5SGl0IiwiYWxsR3JpZHMiLCJncmlkcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImdyaWRJbmRleCIsImdyaWQiLCJyZSIsIm51bSIsImNsYXNzTmFtZSIsImdyaWROdW0iLCJleGVjIiwic2xpY2UiLCJsZW5ndGgiLCJjb29yZCIsImNyZWF0ZUNsaWNrIiwicGxheWVyIiwiY29tcHV0ZXJCb2FyZCIsInBsYXllckJvYXJkIiwiY2xpY2tTdHlsZSIsInRhcmdldCIsImF0dGFjayIsInJlc3VsdCIsImZpbmRHcmlkIiwiZnVsbEJvYXJkIiwibWlzcyIsInN0eWxlIiwiY29sb3IiLCJzaGlwIiwidW5kZWZpbmVkIiwidGV4dENvbnRlbnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY29tcHV0ZXJTdW5rIiwiY2hlY2tTdW5rIiwicGxheWVyU3VuayIsImZvckVhY2giLCJjb25zb2xlIiwibG9nIiwic2hpcFJlY29yZCIsInN1bmtSZWNvcmQiLCJpIiwiY2xhc3NMaXN0IiwiYWRkIiwiZm9udFNpemUiLCJhZGRFdmVudExpc3RlbmVyIiwiY29udmVydENvb3JkIiwiYXJndW1lbnRzIiwieCIsInkiLCJ0YWJsZSIsInByZVN0eWxlIiwiaGlnaGxpZ2h0R3JpZCIsInNoaXBzIiwidGFyZ2V0cyIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJjb29yZHMiLCJwdXNoIiwiaW5kZXgiLCJib3JkZXIiLCJoaWdoQmlnIiwiYm9hcmQiLCJoaXRSZWNvcmQiLCJTaGlwIiwiR3JpZCIsInVwIiwicmlnaHQiLCJHYW1lYm9hcmQiLCJtYWtlQm9hcmQiLCJwIiwicSIsInN1cnZleUdyaWQiLCJvcmllbnQiLCJjb3VudCIsInBsYWNlU2hpcCIsInJlY29yZCIsImNoZWNrTGVuZ3RoIiwic3VydmV5Iiwic2hpcE5hbWUiLCJmbGVldCIsInJlY29yZEtleSIsInNoaXBLZXlzIiwiY29vcmRPYmoiLCJjb29yZEtleXMiLCJjaGVja1NoaXAiLCJOdW1iZXIiLCJjYWxTdW5rIiwiaXNTdW5rIiwiaW5jbHVkZXMiLCJyZWNlaXZlQXR0YWNrIiwiYXR0YWNrU2hpcCIsImN1cnJlbnRTaGlwIiwiYWxsQ29vcmQiLCJhbGxLZXlzIiwicHJvcGVydHkiLCJvbmVIaXQiLCJoaXQiLCJQbGF5ZXIiLCJlbmVteUJvYXJkIiwiY29tcHV0ZXJQbGF5ZXIiLCJvd25Cb2FyZCIsImFpIiwiY29tcHV0ZXJPbiIsImNvbXB1dGVyIiwiYXV0b01vdmUiLCJnZXRSYW5kb21JbnQiLCJtaW4iLCJtYXgiLCJNYXRoIiwiY2VpbCIsImZsb29yIiwicmFuZG9tIiwicmVzcG9uc2UiLCJzdW5rIiwidG90YWxIaXRzIiwiaGl0cyIsImh1bWFuUGxheWVyIl0sInNvdXJjZVJvb3QiOiIifQ==