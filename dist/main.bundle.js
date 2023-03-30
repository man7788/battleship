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
const createClick = (player, computerBoard) => {
  const grids = allGrids();
  for (let i = 0; i < grids.length; i++) {
    grids[i].classList.add(`grid${i}`);
    grids[i].textContent = '/';
    grids[i].style.fontSize = '2rem';
    grids[i].style.color = 'transparent';
    grids[i].addEventListener('click', () => {
      const target = gridIndex(grids[i]);
      player.attack(target[0], target[1]);
      const result = computerBoard.findGrid(computerBoard.fullBoard, target[0], target[1]);
      if (result.miss === true) {
        grids[i].style.color = 'whitesmoke';
      }
      if (result.ship !== undefined) {
        grids[i].textContent = 'X';
        grids[i].style.color = 'red';
      }
    });
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
    // grids[i].style.color = 'whitesmoke';
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

  // console.log(target);
  if (target.miss === true) {
    grids[gridNum].style.color = 'whitesmoke';
  }
  if (target.ship !== undefined) {
    grids[gridNum].textContent = 'X';
    grids[gridNum].style.color = 'red';
  }

  // grids[i].addEventListener('click', () => {
  //   const target = findGrid(grids[i]);
  //   player.attack(target[0], target[1]);
  //   const result = computerBoard.findGrid(
  //     computerBoard.fullBoard,
  //     target[0],
  //     target[1]
  //   );
  //   console.log(result);
  // });
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
        sunkRecord.push(ship);
      }
    });
    if (sunkRecord.length === shipKeys.length) {
      return 'All ships sunk';
    }
    return 'Not all ships sunk';
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
  const sunkRecord = [];
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
    checkSunk
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
/* harmony import */ var _display_ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display-ships */ "./src/display-ships.js");

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
    (0,_display_ships__WEBPACK_IMPORTED_MODULE_0__.displayHit)(ownBoard);
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
const computer = (0,_player__WEBPACK_IMPORTED_MODULE_2__["default"])(playerBoard);
computer.computerOn();
const player = (0,_player__WEBPACK_IMPORTED_MODULE_2__["default"])(computerBoard, computer, playerBoard);
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
(0,_click_board__WEBPACK_IMPORTED_MODULE_4__["default"])(player, computerBoard);

// Make enemy board clickable, invoke attack by clicking,
// display whether hit or miss

// Make player board display wheter hit or miss
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQztBQUMxQzRDLFdBQVcsQ0FBQzVDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUM7QUFDMUM0QyxXQUFXLENBQUM1QyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDO0FBRTFDMUIsNkRBQWEsQ0FBQ3NFLFdBQVcsQ0FBQ3RDLFVBQVUsQ0FBQztBQUVyQ3ZELGFBQWEsQ0FBQ2lELFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUM7QUFDNUNqRCxhQUFhLENBQUNpRCxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDO0FBQzVDakQsYUFBYSxDQUFDaUQsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQztBQUM5Q2pELGFBQWEsQ0FBQ2lELFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUM7QUFDNUNqRCxhQUFhLENBQUNpRCxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDO0FBQzVDakQsYUFBYSxDQUFDaUQsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQztBQUM1Q2pELGFBQWEsQ0FBQ2lELFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUM7QUFFNUNmLHVEQUFPLENBQUNsQyxhQUFhLENBQUN1RCxVQUFVLENBQUM7QUFFakN6RCx3REFBVyxDQUFDQyxNQUFNLEVBQUVDLGFBQWEsQ0FBQzs7QUFFbEM7QUFDQTs7QUFFQSwrQyIsInNvdXJjZXMiOlsid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9jbGljay1ib2FyZC5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvY29udmVydC5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvZGlzcGxheS1zaGlwcy5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL25wbS1zZXR1cC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb252ZXJ0TnVtIH0gZnJvbSAnLi9jb252ZXJ0JztcblxuY29uc3QgYWxsR3JpZHMgPSAoKSA9PiB7XG4gIGNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJpZy1ncmlkJyk7XG4gIHJldHVybiBncmlkcztcbn07XG5cbmNvbnN0IGdyaWRJbmRleCA9IChncmlkKSA9PiB7XG4gIGNvbnN0IHJlID0gL1swLTldKy87XG4gIGNvbnN0IG51bSA9IGdyaWQuY2xhc3NOYW1lO1xuICBjb25zdCBncmlkTnVtID0gcmUuZXhlYyhudW0uc2xpY2UobnVtLmxlbmd0aCAtIDIsIG51bS5sZW5ndGgpKVswXTtcbiAgY29uc3QgY29vcmQgPSBjb252ZXJ0TnVtKCk7XG4gIHJldHVybiBjb29yZFtncmlkTnVtXTtcbn07XG5cbmNvbnN0IGNyZWF0ZUNsaWNrID0gKHBsYXllciwgY29tcHV0ZXJCb2FyZCkgPT4ge1xuICBjb25zdCBncmlkcyA9IGFsbEdyaWRzKCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JpZHMubGVuZ3RoOyBpKyspIHtcbiAgICBncmlkc1tpXS5jbGFzc0xpc3QuYWRkKGBncmlkJHtpfWApO1xuICAgIGdyaWRzW2ldLnRleHRDb250ZW50ID0gJy8nO1xuICAgIGdyaWRzW2ldLnN0eWxlLmZvbnRTaXplID0gJzJyZW0nO1xuICAgIGdyaWRzW2ldLnN0eWxlLmNvbG9yID0gJ3RyYW5zcGFyZW50JztcblxuICAgIGdyaWRzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZ3JpZEluZGV4KGdyaWRzW2ldKTtcbiAgICAgIHBsYXllci5hdHRhY2sodGFyZ2V0WzBdLCB0YXJnZXRbMV0pO1xuICAgICAgY29uc3QgcmVzdWx0ID0gY29tcHV0ZXJCb2FyZC5maW5kR3JpZChcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5mdWxsQm9hcmQsXG4gICAgICAgIHRhcmdldFswXSxcbiAgICAgICAgdGFyZ2V0WzFdXG4gICAgICApO1xuICAgICAgaWYgKHJlc3VsdC5taXNzID09PSB0cnVlKSB7XG4gICAgICAgIGdyaWRzW2ldLnN0eWxlLmNvbG9yID0gJ3doaXRlc21va2UnO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdC5zaGlwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZ3JpZHNbaV0udGV4dENvbnRlbnQgPSAnWCc7XG4gICAgICAgIGdyaWRzW2ldLnN0eWxlLmNvbG9yID0gJ3JlZCc7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNsaWNrO1xuIiwiY29uc3QgY29udmVydENvb3JkID0gKG51bSA9IDAsIHggPSA5LCB5ID0gMCwgdGFibGUgPSB7fSkgPT4ge1xuICBpZiAobnVtID4gOTkpIHtcbiAgICByZXR1cm4gdGFibGU7XG4gIH1cbiAgY29uc3QgY29vcmQgPSBbeCwgeV07XG4gIHRhYmxlW2Nvb3JkXSA9IG51bTtcbiAgaWYgKHkgPT09IDkpIHtcbiAgICB4IC09IDE7XG4gICAgeSA9IC0xO1xuICB9XG4gIHJldHVybiBjb252ZXJ0Q29vcmQobnVtICsgMSwgeCwgeSArIDEsIHRhYmxlKTtcbn07XG5cbmNvbnN0IGNvbnZlcnROdW0gPSAobnVtID0gMCwgeCA9IDksIHkgPSAwLCB0YWJsZSA9IHt9KSA9PiB7XG4gIGlmIChudW0gPiA5OSkge1xuICAgIHJldHVybiB0YWJsZTtcbiAgfVxuICBjb25zdCBjb29yZCA9IFt4LCB5XTtcbiAgdGFibGVbbnVtXSA9IGNvb3JkO1xuICBpZiAoeSA9PT0gOSkge1xuICAgIHggLT0gMTtcbiAgICB5ID0gLTE7XG4gIH1cbiAgcmV0dXJuIGNvbnZlcnROdW0obnVtICsgMSwgeCwgeSArIDEsIHRhYmxlKTtcbn07XG5cbmV4cG9ydCB7IGNvbnZlcnRDb29yZCwgY29udmVydE51bSB9O1xuIiwiaW1wb3J0IHsgY29udmVydENvb3JkLCBjb252ZXJ0TnVtIH0gZnJvbSAnLi9jb252ZXJ0JztcblxuY29uc3QgYWxsR3JpZHMgPSAoKSA9PiB7XG4gIGNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNtYWxsLWdyaWQnKTtcbiAgcmV0dXJuIGdyaWRzO1xufTtcblxuY29uc3QgcHJlU3R5bGUgPSAoKSA9PiB7XG4gIGNvbnN0IGdyaWRzID0gYWxsR3JpZHMoKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkcy5sZW5ndGg7IGkrKykge1xuICAgIGdyaWRzW2ldLmNsYXNzTGlzdC5hZGQoYGdyaWQke2l9YCk7XG4gICAgZ3JpZHNbaV0udGV4dENvbnRlbnQgPSAnLyc7XG4gICAgZ3JpZHNbaV0uc3R5bGUuZm9udFNpemUgPSAnMS41cmVtJztcbiAgICBncmlkc1tpXS5zdHlsZS5jb2xvciA9ICd0cmFuc3BhcmVudCc7XG4gICAgLy8gZ3JpZHNbaV0uc3R5bGUuY29sb3IgPSAnd2hpdGVzbW9rZSc7XG4gIH1cbn07XG5cbmNvbnN0IGhpZ2hsaWdodEdyaWQgPSAoc2hpcHMpID0+IHtcbiAgY29uc3QgdGFyZ2V0cyA9IFtdO1xuICBjb25zdCBncmlkcyA9IGFsbEdyaWRzKCk7XG5cbiAgT2JqZWN0LmtleXMoc2hpcHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGNvbnN0IGNvb3JkcyA9IHNoaXBzW2tleV07XG4gICAgT2JqZWN0LmtleXMoY29vcmRzKS5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgdGFyZ2V0cy5wdXNoKGNvb3JkKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgY29uc3QgdGFibGUgPSBjb252ZXJ0Q29vcmQoKTtcblxuICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gdGFibGVbdGFyZ2V0XTtcbiAgICBncmlkc1tpbmRleF0uc3R5bGUuYm9yZGVyID0gJzJweCBjeWFuIHNvbGlkJztcbiAgfSk7XG5cbiAgcHJlU3R5bGUoKTtcbn07XG5cbmNvbnN0IGhpZ2hCaWcgPSAoc2hpcHMpID0+IHtcbiAgY29uc3QgdGFyZ2V0cyA9IFtdO1xuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iaWctZ3JpZCcpO1xuXG4gIE9iamVjdC5rZXlzKHNoaXBzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBjb25zdCBjb29yZHMgPSBzaGlwc1trZXldO1xuICAgIE9iamVjdC5rZXlzKGNvb3JkcykuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIHRhcmdldHMucHVzaChjb29yZCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGNvbnN0IHRhYmxlID0gY29udmVydENvb3JkKCk7XG5cbiAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IHRhYmxlW3RhcmdldF07XG4gICAgZ3JpZHNbaW5kZXhdLnN0eWxlLmJvcmRlciA9ICcycHggY3lhbiBzb2xpZCc7XG4gIH0pO1xufTtcblxuY29uc3QgZGlzcGxheUhpdCA9IChib2FyZCkgPT4ge1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoYm9hcmQuaGl0UmVjb3JkKTtcbiAgY29uc3QgY29vcmQgPSBib2FyZC5oaXRSZWNvcmRba2V5c1trZXlzLmxlbmd0aCAtIDFdXTtcbiAgY29uc3QgdGFyZ2V0ID0gYm9hcmQuZmluZEdyaWQoYm9hcmQuZnVsbEJvYXJkLCBjb29yZFswXSwgY29vcmRbMV0pO1xuXG4gIGNvbnN0IGdyaWRzID0gYWxsR3JpZHMoKTtcbiAgY29uc3QgdGFibGUgPSBjb252ZXJ0Q29vcmQoKTtcbiAgY29uc3QgZ3JpZE51bSA9IHRhYmxlW2Nvb3JkXTtcblxuICAvLyBjb25zb2xlLmxvZyh0YXJnZXQpO1xuICBpZiAodGFyZ2V0Lm1pc3MgPT09IHRydWUpIHtcbiAgICBncmlkc1tncmlkTnVtXS5zdHlsZS5jb2xvciA9ICd3aGl0ZXNtb2tlJztcbiAgfVxuICBpZiAodGFyZ2V0LnNoaXAgIT09IHVuZGVmaW5lZCkge1xuICAgIGdyaWRzW2dyaWROdW1dLnRleHRDb250ZW50ID0gJ1gnO1xuICAgIGdyaWRzW2dyaWROdW1dLnN0eWxlLmNvbG9yID0gJ3JlZCc7XG4gIH1cblxuICAvLyBncmlkc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgLy8gICBjb25zdCB0YXJnZXQgPSBmaW5kR3JpZChncmlkc1tpXSk7XG4gIC8vICAgcGxheWVyLmF0dGFjayh0YXJnZXRbMF0sIHRhcmdldFsxXSk7XG4gIC8vICAgY29uc3QgcmVzdWx0ID0gY29tcHV0ZXJCb2FyZC5maW5kR3JpZChcbiAgLy8gICAgIGNvbXB1dGVyQm9hcmQuZnVsbEJvYXJkLFxuICAvLyAgICAgdGFyZ2V0WzBdLFxuICAvLyAgICAgdGFyZ2V0WzFdXG4gIC8vICAgKTtcbiAgLy8gICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAvLyB9KTtcbn07XG5cbmV4cG9ydCB7IGhpZ2hsaWdodEdyaWQsIGhpZ2hCaWcsIGRpc3BsYXlIaXQgfTtcbiIsImltcG9ydCBTaGlwIGZyb20gJy4vc2hpcCc7XG5cbmNvbnN0IEdyaWQgPSAoeCwgeSwgdXAsIHJpZ2h0LCBzaGlwLCBtaXNzID0gZmFsc2UpID0+IHtcbiAgY29uc3QgY29vcmQgPSBbeCwgeV07XG4gIHJldHVybiB7IGNvb3JkLCB1cCwgcmlnaHQsIHNoaXAsIG1pc3MgfTtcbn07XG5cbmNvbnN0IEdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgbWFrZUJvYXJkID0gKHggPSAwLCB5ID0gMCkgPT4ge1xuICAgIGlmICh4ID4gOSB8fCB5ID4gOSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgYm9hcmQgPSBHcmlkKHgsIHksIG1ha2VCb2FyZCh4ICsgMSwgeSksIG1ha2VCb2FyZCh4LCB5ICsgMSkpO1xuXG4gICAgcmV0dXJuIGJvYXJkO1xuICB9O1xuXG4gIGNvbnN0IGZpbmRHcmlkID0gKGdyaWQsIHAsIHEpID0+IHtcbiAgICBpZiAoZ3JpZC5jb29yZFswXSAhPT0gcCkge1xuICAgICAgZ3JpZCA9IGdyaWQudXA7XG4gICAgICByZXR1cm4gZmluZEdyaWQoZ3JpZCwgcCwgcSk7XG4gICAgfVxuXG4gICAgaWYgKGdyaWQuY29vcmRbMF0gPT09IHApIHtcbiAgICAgIGlmIChncmlkLmNvb3JkWzFdICE9PSBxKSB7XG4gICAgICAgIGdyaWQgPSBncmlkLnJpZ2h0O1xuICAgICAgICByZXR1cm4gZmluZEdyaWQoZ3JpZCwgcCwgcSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBncmlkO1xuICB9O1xuXG4gIGNvbnN0IHN1cnZleUdyaWQgPSAoeCwgeSwgbGVuZ3RoLCBvcmllbnQsIGNvdW50ID0gMCkgPT4ge1xuICAgIGlmIChjb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCwgeSkuc2hpcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAob3JpZW50ID09PSAndmVydGljYWwnKSB7XG4gICAgICAgIHJldHVybiBzdXJ2ZXlHcmlkKHggKyAxLCB5LCBsZW5ndGgsIG9yaWVudCwgY291bnQgKyAxKTtcbiAgICAgIH1cbiAgICAgIGlmIChvcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICByZXR1cm4gc3VydmV5R3JpZCh4LCB5ICsgMSwgbGVuZ3RoLCBvcmllbnQsIGNvdW50ICsgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoXG4gICAgeCxcbiAgICB5LFxuICAgIGxlbmd0aCxcbiAgICBvcmllbnQsXG4gICAgY291bnQgPSAwLFxuICAgIHJlY29yZCA9IHt9LFxuICAgIGNoZWNrTGVuZ3RoID0gdHJ1ZSxcbiAgICBzdXJ2ZXkgPSBudWxsXG4gICkgPT4ge1xuICAgIGlmIChjaGVja0xlbmd0aCA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHggKyBsZW5ndGggPiAxMCAmJiBvcmllbnQgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgcmV0dXJuICdTaGlwIG92ZXIgYm9yZGVyJztcbiAgICAgIH1cbiAgICAgIGlmICh5ICsgbGVuZ3RoID4gMTAgJiYgb3JpZW50ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgcmV0dXJuICdTaGlwIG92ZXIgYm9yZGVyJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VydmV5ID09PSBudWxsKSB7XG4gICAgICBpZiAob3JpZW50ID09PSAndmVydGljYWwnKSB7XG4gICAgICAgIHN1cnZleSA9IHN1cnZleUdyaWQoeCwgeSwgbGVuZ3RoLCAndmVydGljYWwnKTtcbiAgICAgIH1cbiAgICAgIGlmIChvcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICBzdXJ2ZXkgPSBzdXJ2ZXlHcmlkKHgsIHksIGxlbmd0aCwgJ2hvcml6b250YWwnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzaGlwTmFtZSA9IGZsZWV0W2xlbmd0aF07XG4gICAgaWYgKHNoaXBSZWNvcmRbc2hpcE5hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiAnU2hpcCBub3QgYXZhaWxhYmxlJztcbiAgICB9XG5cbiAgICBpZiAoY291bnQgPT09IGxlbmd0aCkge1xuICAgICAgaWYgKHNoaXBOYW1lID09PSAnRGVzdHJveWVyMScpIHtcbiAgICAgICAgZmxlZXRbbGVuZ3RoXSA9ICdEZXN0cm95ZXIyJztcbiAgICAgIH1cbiAgICAgIGlmIChzaGlwTmFtZSA9PT0gJ1N1Ym1hcmluZTEnKSB7XG4gICAgICAgIGZsZWV0W2xlbmd0aF0gPSAnU3VibWFyaW5lMic7XG4gICAgICB9XG4gICAgICBzaGlwUmVjb3JkW3NoaXBOYW1lXSA9IHJlY29yZDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZmluZEdyaWQoZnVsbEJvYXJkLCB4LCB5KS5zaGlwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBgU3BhY2UgYWxyZWFkeSB0YWtlbmA7XG4gICAgfVxuXG4gICAgaWYgKG9yaWVudCA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgaWYgKHN1cnZleSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBmaW5kR3JpZChmdWxsQm9hcmQsIHgsIHkpO1xuICAgICAgICB0YXJnZXQuc2hpcCA9IFNoaXAobGVuZ3RoKTtcbiAgICAgICAgY29uc3QgcmVjb3JkS2V5ID0gdGFyZ2V0LmNvb3JkO1xuICAgICAgICByZWNvcmRbcmVjb3JkS2V5XSA9IHJlY29yZEtleTtcbiAgICAgICAgY2hlY2tMZW5ndGggPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHBsYWNlU2hpcChcbiAgICAgICAgICB4ICsgMSxcbiAgICAgICAgICB5LFxuICAgICAgICAgIGxlbmd0aCxcbiAgICAgICAgICBvcmllbnQsXG4gICAgICAgICAgY291bnQgKyAxLFxuICAgICAgICAgIHJlY29yZCxcbiAgICAgICAgICBjaGVja0xlbmd0aCxcbiAgICAgICAgICBzdXJ2ZXlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdXJ2ZXkgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBgU3BhY2UgYWxyZWFkeSB0YWtlbmA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9yaWVudCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICBpZiAoc3VydmV5ID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCwgeSk7XG4gICAgICAgIHRhcmdldC5zaGlwID0gU2hpcChsZW5ndGgpO1xuICAgICAgICBjb25zdCByZWNvcmRLZXkgPSB0YXJnZXQuY29vcmQ7XG4gICAgICAgIHJlY29yZFtyZWNvcmRLZXldID0gcmVjb3JkS2V5O1xuICAgICAgICBjaGVja0xlbmd0aCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gcGxhY2VTaGlwKFxuICAgICAgICAgIHgsXG4gICAgICAgICAgeSArIDEsXG4gICAgICAgICAgbGVuZ3RoLFxuICAgICAgICAgIG9yaWVudCxcbiAgICAgICAgICBjb3VudCArIDEsXG4gICAgICAgICAgcmVjb3JkLFxuICAgICAgICAgIGNoZWNrTGVuZ3RoLFxuICAgICAgICAgIHN1cnZleVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKHN1cnZleSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGBTcGFjZSBhbHJlYWR5IHRha2VuYDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY2hlY2tTdW5rID0gKCkgPT4ge1xuICAgIGNvbnN0IHNoaXBLZXlzID0gT2JqZWN0LmtleXMoc2hpcFJlY29yZCk7XG4gICAgc2hpcEtleXMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgY29uc3QgY29vcmRPYmogPSBzaGlwUmVjb3JkW3NoaXBdO1xuICAgICAgY29uc3QgY29vcmRLZXlzID0gT2JqZWN0LmtleXMoY29vcmRPYmopO1xuICAgICAgY29uc3QgY2hlY2tTaGlwID0gZmluZEdyaWQoXG4gICAgICAgIGZ1bGxCb2FyZCxcbiAgICAgICAgTnVtYmVyKGNvb3JkS2V5c1swXVswXSksXG4gICAgICAgIE51bWJlcihjb29yZEtleXNbMF1bMl0pXG4gICAgICApO1xuICAgICAgY2hlY2tTaGlwLnNoaXAuY2FsU3VuaygpO1xuICAgICAgaWYgKGNoZWNrU2hpcC5zaGlwLmlzU3VuaygpID09PSB0cnVlKSB7XG4gICAgICAgIHN1bmtSZWNvcmQucHVzaChzaGlwKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChzdW5rUmVjb3JkLmxlbmd0aCA9PT0gc2hpcEtleXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gJ0FsbCBzaGlwcyBzdW5rJztcbiAgICB9XG4gICAgcmV0dXJuICdOb3QgYWxsIHNoaXBzIHN1bmsnO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCwgeSk7XG4gICAgY29uc3QgY29vcmQgPSBbeCwgeV07XG4gICAgY29uc3QgYXR0YWNrU2hpcCA9IFtdO1xuXG4gICAgaWYgKHRhcmdldC5zaGlwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChoaXRSZWNvcmRbY29vcmRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaGl0UmVjb3JkW2Nvb3JkXSA9IGNvb3JkO1xuICAgICAgICBjb25zdCBmbGVldCA9IE9iamVjdC5rZXlzKHNoaXBSZWNvcmQpO1xuICAgICAgICBmbGVldC5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgICAgY29uc3QgY3VycmVudFNoaXAgPSBzaGlwUmVjb3JkW3NoaXBdO1xuICAgICAgICAgIGlmIChjdXJyZW50U2hpcFtjb29yZF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYXR0YWNrU2hpcC5wdXNoKHNoaXApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGFsbENvb3JkID0gc2hpcFJlY29yZFthdHRhY2tTaGlwWzBdXTtcbiAgICAgICAgY29uc3QgYWxsS2V5cyA9IE9iamVjdC5rZXlzKGFsbENvb3JkKTtcbiAgICAgICAgYWxsS2V5cy5mb3JFYWNoKChrZXlzKSA9PiB7XG4gICAgICAgICAgY29uc3QgcHJvcGVydHkgPSBhbGxDb29yZFtrZXlzXTtcbiAgICAgICAgICBjb25zdCBvbmVIaXQgPSBmaW5kR3JpZChmdWxsQm9hcmQsIHByb3BlcnR5WzBdLCBwcm9wZXJ0eVsxXSk7XG4gICAgICAgICAgb25lSGl0LnNoaXAuaGl0KCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChoaXRSZWNvcmRbY29vcmRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuICdTaGlwIGFscmVhZHkgaGl0JztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGFyZ2V0LnNoaXAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHRhcmdldC5taXNzID09PSBmYWxzZSkge1xuICAgICAgICBoaXRSZWNvcmRbY29vcmRdID0gY29vcmQ7XG4gICAgICAgIHRhcmdldC5taXNzID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAnSGl0dGluZyBhIG1pc3NlZCBzaG90IGFnYWluJztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZnVsbEJvYXJkID0gbWFrZUJvYXJkKCk7XG4gIGNvbnN0IHNoaXBSZWNvcmQgPSB7fTtcbiAgY29uc3QgaGl0UmVjb3JkID0ge307XG4gIGNvbnN0IHN1bmtSZWNvcmQgPSBbXTtcbiAgY29uc3QgZmxlZXQgPSB7XG4gICAgNTogJ0NhcnJpZXInLFxuICAgIDQ6ICdCYXR0bGVzaGlwJyxcbiAgICAzOiAnQ3J1c2llcicsXG4gICAgMjogJ0Rlc3Ryb3llcjEnLFxuICAgIDE6ICdTdWJtYXJpbmUxJyxcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGZ1bGxCb2FyZCxcbiAgICBwbGFjZVNoaXAsXG4gICAgZmluZEdyaWQsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBzaGlwUmVjb3JkLFxuICAgIGhpdFJlY29yZCxcbiAgICBjaGVja1N1bmssXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XG4iLCJpbXBvcnQgeyBkaXNwbGF5SGl0IH0gZnJvbSAnLi9kaXNwbGF5LXNoaXBzJztcblxuY29uc3QgUGxheWVyID0gKGVuZW15Qm9hcmQsIGNvbXB1dGVyUGxheWVyLCBvd25Cb2FyZCkgPT4ge1xuICBsZXQgYWkgPSBmYWxzZTtcblxuICBjb25zdCBjb21wdXRlck9uID0gKCkgPT4ge1xuICAgIGFpID0gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBjb21wdXRlciA9ICgpID0+IGFpO1xuXG4gIGNvbnN0IGF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIGlmIChjb21wdXRlclBsYXllciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoY29tcHV0ZXJQbGF5ZXIuY29tcHV0ZXIoKSA9PT0gdHJ1ZSkge1xuICAgICAgICBhdXRvTW92ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXRSYW5kb21JbnQgPSAobWluLCBtYXgpID0+IHtcbiAgICBtaW4gPSBNYXRoLmNlaWwobWluKTtcbiAgICBtYXggPSBNYXRoLmZsb29yKG1heCk7XG5cbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcbiAgfTtcblxuICBjb25zdCBhdXRvTW92ZSA9ICgpID0+IHtcbiAgICBjb25zdCB4ID0gZ2V0UmFuZG9tSW50KDAsIDkpO1xuICAgIGNvbnN0IHkgPSBnZXRSYW5kb21JbnQoMCwgOSk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IG93bkJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG5cbiAgICBpZiAocmVzcG9uc2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGF1dG9Nb3ZlKCk7XG4gICAgfVxuICAgIGRpc3BsYXlIaXQob3duQm9hcmQpO1xuICB9O1xuXG4gIHJldHVybiB7IGF0dGFjaywgY29tcHV0ZXJPbiwgY29tcHV0ZXIsIGdldFJhbmRvbUludCB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiY29uc3QgU2hpcCA9IChsZW5ndGgpID0+IHtcbiAgbGV0IHN1bmsgPSBmYWxzZTtcbiAgbGV0IHRvdGFsSGl0cyA9IDA7XG5cbiAgY29uc3QgaGl0ID0gKCkgPT4ge1xuICAgIHRvdGFsSGl0cyArPSAxO1xuICB9O1xuXG4gIGNvbnN0IGNhbFN1bmsgPSAoKSA9PiB7XG4gICAgaWYgKGxlbmd0aCA9PT0gdG90YWxIaXRzKSB7XG4gICAgICBzdW5rID0gdHJ1ZTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGl0cyA9ICgpID0+IHRvdGFsSGl0cztcbiAgY29uc3QgaXNTdW5rID0gKCkgPT4gc3VuaztcblxuICByZXR1cm4geyBsZW5ndGgsIGhpdCwgY2FsU3VuaywgaGl0cywgaXNTdW5rIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XFxufVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDMwLCAzMCwgMzApO1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gIGJvcmRlcjogMXB4IHNvaWxkIHJlZDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciA0ZnI7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4udGl0bGUtZGl2IHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGdyZWVueWVsbG93O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdyaWQtcm93OiAxIC8gMjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGNvbG9yOiBncmF5O1xcbiAgZm9udC1zaXplOiAyLjVyZW07XFxufVxcblxcbi5ib2FyZC1kaXYge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGdyaWQtcm93OiAyIC8gMztcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbn1cXG5cXG4uc21hbGwtYm9hcmQge1xcbiAgYm9yZGVyOiAycHggc29saWQgb3JhbmdlO1xcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxuICB3aWR0aDogMjVyZW07XFxuICBoZWlnaHQ6IDI1cmVtO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbn1cXG5cXG4uc21hbGwtZ3JpZCB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBncmF5O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59IFxcblxcbi5iaWctYm9hcmQge1xcbiAgYm9yZGVyOiAycHggc29saWQgb3JhbmdlO1xcbiAgZ3JpZC1jb2x1bW46IDIgLyAzO1xcbiAgd2lkdGg6IDMwcmVtO1xcbiAgaGVpZ2h0OiAzMHJlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIHJlc2l6ZTogbm9uZTtcXG59XFxuXFxuLmJpZy1ncmlkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGdyYXk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgY3Vyc29yOnBvaW50ZXJcXG59IFxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxVQUFVO0VBQ1YsU0FBUztFQUNULHNCQUFzQjtFQUN0Qix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxpQ0FBaUM7QUFDbkM7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsYUFBYTtFQUNiLDJCQUEyQjtFQUMzQixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSw2QkFBNkI7RUFDN0IsYUFBYTtFQUNiLGVBQWU7RUFDZix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFdBQVc7RUFDWCxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLFlBQVk7RUFDWixlQUFlO0VBQ2YsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0Usd0JBQXdCO0VBQ3hCLG9CQUFvQjtFQUNwQixZQUFZO0VBQ1osYUFBYTtFQUNiLGFBQWE7RUFDYixzQ0FBc0M7QUFDeEM7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSx3QkFBd0I7RUFDeEIsa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixhQUFhO0VBQ2IsYUFBYTtFQUNiLHNDQUFzQztFQUN0QyxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkI7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XFxufVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDMwLCAzMCwgMzApO1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gIGJvcmRlcjogMXB4IHNvaWxkIHJlZDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciA0ZnI7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4udGl0bGUtZGl2IHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGdyZWVueWVsbG93O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdyaWQtcm93OiAxIC8gMjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGNvbG9yOiBncmF5O1xcbiAgZm9udC1zaXplOiAyLjVyZW07XFxufVxcblxcbi5ib2FyZC1kaXYge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGdyaWQtcm93OiAyIC8gMztcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbn1cXG5cXG4uc21hbGwtYm9hcmQge1xcbiAgYm9yZGVyOiAycHggc29saWQgb3JhbmdlO1xcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxuICB3aWR0aDogMjVyZW07XFxuICBoZWlnaHQ6IDI1cmVtO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbn1cXG5cXG4uc21hbGwtZ3JpZCB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBncmF5O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59IFxcblxcbi5iaWctYm9hcmQge1xcbiAgYm9yZGVyOiAycHggc29saWQgb3JhbmdlO1xcbiAgZ3JpZC1jb2x1bW46IDIgLyAzO1xcbiAgd2lkdGg6IDMwcmVtO1xcbiAgaGVpZ2h0OiAzMHJlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIHJlc2l6ZTogbm9uZTtcXG59XFxuXFxuLmJpZy1ncmlkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGdyYXk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgY3Vyc29yOnBvaW50ZXJcXG59IFxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJztcbmltcG9ydCB7IGhpZ2hsaWdodEdyaWQsIGhpZ2hCaWcgfSBmcm9tICcuL2Rpc3BsYXktc2hpcHMnO1xuaW1wb3J0IGNyZWF0ZUNsaWNrIGZyb20gJy4vY2xpY2stYm9hcmQnO1xuXG5jb25zdCBwbGF5ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xuY29uc3QgY29tcHV0ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xuY29uc3QgY29tcHV0ZXIgPSBQbGF5ZXIocGxheWVyQm9hcmQpO1xuY29tcHV0ZXIuY29tcHV0ZXJPbigpO1xuY29uc3QgcGxheWVyID0gUGxheWVyKGNvbXB1dGVyQm9hcmQsIGNvbXB1dGVyLCBwbGF5ZXJCb2FyZCk7XG5cbnBsYXllckJvYXJkLnBsYWNlU2hpcCg1LCAxLCA1LCAndmVydGljYWwnKTtcbnBsYXllckJvYXJkLnBsYWNlU2hpcCg0LCAzLCA0LCAnaG9yaXpvbnRhbCcpO1xucGxheWVyQm9hcmQucGxhY2VTaGlwKDYsIDQsIDMsICdob3Jpem9udGFsJyk7XG5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoMSwgNywgMiwgJ3ZlcnRpY2FsJyk7XG5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoNCwgOCwgMiwgJ3ZlcnRpY2FsJyk7XG5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoOSwgOSwgMSwgJ3ZlcnRpY2FsJyk7XG5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoNywgOCwgMSwgJ3ZlcnRpY2FsJyk7XG5cbmhpZ2hsaWdodEdyaWQocGxheWVyQm9hcmQuc2hpcFJlY29yZCk7XG5cbmNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDEsIDEsIDUsICd2ZXJ0aWNhbCcpO1xuY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMywgMywgNCwgJ3ZlcnRpY2FsJyk7XG5jb21wdXRlckJvYXJkLnBsYWNlU2hpcCg4LCAzLCAzLCAnaG9yaXpvbnRhbCcpO1xuY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMSwgNSwgMiwgJ3ZlcnRpY2FsJyk7XG5jb21wdXRlckJvYXJkLnBsYWNlU2hpcCg0LCA2LCAyLCAndmVydGljYWwnKTtcbmNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDMsIDksIDEsICd2ZXJ0aWNhbCcpO1xuY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoNywgMCwgMSwgJ3ZlcnRpY2FsJyk7XG5cbmhpZ2hCaWcoY29tcHV0ZXJCb2FyZC5zaGlwUmVjb3JkKTtcblxuY3JlYXRlQ2xpY2socGxheWVyLCBjb21wdXRlckJvYXJkKTtcblxuLy8gTWFrZSBlbmVteSBib2FyZCBjbGlja2FibGUsIGludm9rZSBhdHRhY2sgYnkgY2xpY2tpbmcsXG4vLyBkaXNwbGF5IHdoZXRoZXIgaGl0IG9yIG1pc3NcblxuLy8gTWFrZSBwbGF5ZXIgYm9hcmQgZGlzcGxheSB3aGV0ZXIgaGl0IG9yIG1pc3NcbiJdLCJuYW1lcyI6WyJjb252ZXJ0TnVtIiwiYWxsR3JpZHMiLCJncmlkcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImdyaWRJbmRleCIsImdyaWQiLCJyZSIsIm51bSIsImNsYXNzTmFtZSIsImdyaWROdW0iLCJleGVjIiwic2xpY2UiLCJsZW5ndGgiLCJjb29yZCIsImNyZWF0ZUNsaWNrIiwicGxheWVyIiwiY29tcHV0ZXJCb2FyZCIsImkiLCJjbGFzc0xpc3QiLCJhZGQiLCJ0ZXh0Q29udGVudCIsInN0eWxlIiwiZm9udFNpemUiLCJjb2xvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0YXJnZXQiLCJhdHRhY2siLCJyZXN1bHQiLCJmaW5kR3JpZCIsImZ1bGxCb2FyZCIsIm1pc3MiLCJzaGlwIiwidW5kZWZpbmVkIiwiY29udmVydENvb3JkIiwiYXJndW1lbnRzIiwieCIsInkiLCJ0YWJsZSIsInByZVN0eWxlIiwiaGlnaGxpZ2h0R3JpZCIsInNoaXBzIiwidGFyZ2V0cyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiY29vcmRzIiwicHVzaCIsImluZGV4IiwiYm9yZGVyIiwiaGlnaEJpZyIsImRpc3BsYXlIaXQiLCJib2FyZCIsImhpdFJlY29yZCIsIlNoaXAiLCJHcmlkIiwidXAiLCJyaWdodCIsIkdhbWVib2FyZCIsIm1ha2VCb2FyZCIsInAiLCJxIiwic3VydmV5R3JpZCIsIm9yaWVudCIsImNvdW50IiwicGxhY2VTaGlwIiwicmVjb3JkIiwiY2hlY2tMZW5ndGgiLCJzdXJ2ZXkiLCJzaGlwTmFtZSIsImZsZWV0Iiwic2hpcFJlY29yZCIsInJlY29yZEtleSIsImNoZWNrU3VuayIsInNoaXBLZXlzIiwiY29vcmRPYmoiLCJjb29yZEtleXMiLCJjaGVja1NoaXAiLCJOdW1iZXIiLCJjYWxTdW5rIiwiaXNTdW5rIiwic3Vua1JlY29yZCIsInJlY2VpdmVBdHRhY2siLCJhdHRhY2tTaGlwIiwiY3VycmVudFNoaXAiLCJhbGxDb29yZCIsImFsbEtleXMiLCJwcm9wZXJ0eSIsIm9uZUhpdCIsImhpdCIsIlBsYXllciIsImVuZW15Qm9hcmQiLCJjb21wdXRlclBsYXllciIsIm93bkJvYXJkIiwiYWkiLCJjb21wdXRlck9uIiwiY29tcHV0ZXIiLCJhdXRvTW92ZSIsImdldFJhbmRvbUludCIsIm1pbiIsIm1heCIsIk1hdGgiLCJjZWlsIiwiZmxvb3IiLCJyYW5kb20iLCJyZXNwb25zZSIsInN1bmsiLCJ0b3RhbEhpdHMiLCJoaXRzIiwicGxheWVyQm9hcmQiXSwic291cmNlUm9vdCI6IiJ9