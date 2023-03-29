/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/* harmony export */   "highBig": () => (/* binding */ highBig),
/* harmony export */   "highlightGrid": () => (/* binding */ highlightGrid)
/* harmony export */ });
/* harmony import */ var _convert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./convert */ "./src/convert.js");

const highlightGrid = ships => {
  const targets = [];
  const grids = document.querySelectorAll('.small-grid');
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  font-family: sans-serif;\n}\n\nbody {\n  background-color: rgb(30, 30, 30);\n}\n\n.container {\n  border: 1px soild red;\n  display: grid;\n  grid-template-rows: 1fr 4fr;\n  height: 100vh;\n}\n\n.title-div {\n  border: 2px solid greenyellow;\n  display: flex;\n  grid-row: 1 / 2;\n  justify-content: center;\n  align-items: center;\n  color: gray;\n  font-size: 2.5rem;\n}\n\n.board-div {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  width: 100vw;\n  grid-row: 2 / 3;\n  color: whitesmoke;\n}\n\n.small-board {\n  border: 2px solid orange;\n  justify-self: center;\n  width: 25rem;\n  height: 25rem;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.small-grid {\n  border: 2px solid gray;\n} \n\n.big-board {\n  border: 2px solid orange;\n  grid-column: 2 / 3;\n  width: 30rem;\n  height: 30rem;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  resize: none;\n}\n\n.big-grid {\n  border: 2px solid gray;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n} \n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,UAAU;EACV,SAAS;EACT,sBAAsB;EACtB,uBAAuB;AACzB;;AAEA;EACE,iCAAiC;AACnC;;AAEA;EACE,qBAAqB;EACrB,aAAa;EACb,2BAA2B;EAC3B,aAAa;AACf;;AAEA;EACE,6BAA6B;EAC7B,aAAa;EACb,eAAe;EACf,uBAAuB;EACvB,mBAAmB;EACnB,WAAW;EACX,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,YAAY;EACZ,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,wBAAwB;EACxB,oBAAoB;EACpB,YAAY;EACZ,aAAa;EACb,aAAa;EACb,sCAAsC;AACxC;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,wBAAwB;EACxB,kBAAkB;EAClB,YAAY;EACZ,aAAa;EACb,aAAa;EACb,sCAAsC;EACtC,YAAY;AACd;;AAEA;EACE,sBAAsB;EACtB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB","sourcesContent":["* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  font-family: sans-serif;\n}\n\nbody {\n  background-color: rgb(30, 30, 30);\n}\n\n.container {\n  border: 1px soild red;\n  display: grid;\n  grid-template-rows: 1fr 4fr;\n  height: 100vh;\n}\n\n.title-div {\n  border: 2px solid greenyellow;\n  display: flex;\n  grid-row: 1 / 2;\n  justify-content: center;\n  align-items: center;\n  color: gray;\n  font-size: 2.5rem;\n}\n\n.board-div {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  width: 100vw;\n  grid-row: 2 / 3;\n  color: whitesmoke;\n}\n\n.small-board {\n  border: 2px solid orange;\n  justify-self: center;\n  width: 25rem;\n  height: 25rem;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.small-grid {\n  border: 2px solid gray;\n} \n\n.big-board {\n  border: 2px solid orange;\n  grid-column: 2 / 3;\n  width: 30rem;\n  height: 30rem;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  resize: none;\n}\n\n.big-grid {\n  border: 2px solid gray;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n} \n"],"sourceRoot":""}]);
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
/* harmony import */ var _convert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./convert */ "./src/convert.js");





const playerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
const computerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
const computer = (0,_player__WEBPACK_IMPORTED_MODULE_2__["default"])(playerBoard);
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
const grids = document.querySelectorAll('.big-grid');
const findGrid = grid => {
  const re = /[0-9]+/;
  const num = grid.className;
  const gridNum = re.exec(num.slice(num.length - 2, num.length))[0];
  const coord = (0,_convert__WEBPACK_IMPORTED_MODULE_4__.convertNum)();
  console.log(coord[gridNum]);
  return coord[gridNum];
};
for (let i = 0; i < grids.length; i++) {
  grids[i].classList.add(`grid${i}`);
  grids[i].textContent = '/';
  grids[i].style.fontSize = '2rem';
  grids[i].style.color = 'transparent';

  // grid.textContent = 'X';
  // grid.style.fontSize = '2rem';
  // grid.style.color = 'transparent';

  grids[i].addEventListener('click', () => {
    const target = findGrid(grids[i]);
    player.attack(target[0], target[1]);
    const result = computerBoard.findGrid(computerBoard.fullBoard, target[0], target[1]);
    console.log(result);
    if (result.miss === true) {
      grids[i].style.color = 'whitesmoke';
    }
    if (result.ship !== undefined) {
      grids[i].textContent = 'X';
      grids[i].style.color = 'red';
    }

    // grid.style.color = 'whitesmoke';
    // grid.style.color = 'red';
  });
}

// Make enemy board clickable, invoke attack by clicking,
// display whether hit or miss

// Make player board display wheter hit or miss
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUNpRixLQUFLLEdBQUcsS0FBSztJQUM5Qjs7SUFFQTtJQUNBO0VBQ0YsQ0FBQyxDQUFDO0FBQ0o7O0FBRUE7QUFDQTs7QUFFQSwrQyIsInNvdXJjZXMiOlsid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9jb252ZXJ0LmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9kaXNwbGF5LXNoaXBzLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL25wbS1zZXR1cC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL25wbS1zZXR1cC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL25wbS1zZXR1cC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25wbS1zZXR1cC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9ucG0tc2V0dXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25wbS1zZXR1cC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25wbS1zZXR1cC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25wbS1zZXR1cC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vbnBtLXNldHVwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGNvbnZlcnRDb29yZCA9IChudW0gPSAwLCB4ID0gOSwgeSA9IDAsIHRhYmxlID0ge30pID0+IHtcbiAgaWYgKG51bSA+IDk5KSB7XG4gICAgcmV0dXJuIHRhYmxlO1xuICB9XG4gIGNvbnN0IGNvb3JkID0gW3gsIHldO1xuICB0YWJsZVtjb29yZF0gPSBudW07XG4gIGlmICh5ID09PSA5KSB7XG4gICAgeCAtPSAxO1xuICAgIHkgPSAtMTtcbiAgfVxuICByZXR1cm4gY29udmVydENvb3JkKG51bSArIDEsIHgsIHkgKyAxLCB0YWJsZSk7XG59O1xuXG5jb25zdCBjb252ZXJ0TnVtID0gKG51bSA9IDAsIHggPSA5LCB5ID0gMCwgdGFibGUgPSB7fSkgPT4ge1xuICBpZiAobnVtID4gOTkpIHtcbiAgICByZXR1cm4gdGFibGU7XG4gIH1cbiAgY29uc3QgY29vcmQgPSBbeCwgeV07XG4gIHRhYmxlW251bV0gPSBjb29yZDtcbiAgaWYgKHkgPT09IDkpIHtcbiAgICB4IC09IDE7XG4gICAgeSA9IC0xO1xuICB9XG4gIHJldHVybiBjb252ZXJ0TnVtKG51bSArIDEsIHgsIHkgKyAxLCB0YWJsZSk7XG59O1xuXG5leHBvcnQgeyBjb252ZXJ0Q29vcmQsIGNvbnZlcnROdW0gfTtcbiIsImltcG9ydCB7IGNvbnZlcnRDb29yZCB9IGZyb20gJy4vY29udmVydCc7XG5cbmNvbnN0IGhpZ2hsaWdodEdyaWQgPSAoc2hpcHMpID0+IHtcbiAgY29uc3QgdGFyZ2V0cyA9IFtdO1xuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbWFsbC1ncmlkJyk7XG5cbiAgT2JqZWN0LmtleXMoc2hpcHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGNvbnN0IGNvb3JkcyA9IHNoaXBzW2tleV07XG4gICAgT2JqZWN0LmtleXMoY29vcmRzKS5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgdGFyZ2V0cy5wdXNoKGNvb3JkKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgY29uc3QgdGFibGUgPSBjb252ZXJ0Q29vcmQoKTtcblxuICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gdGFibGVbdGFyZ2V0XTtcbiAgICBncmlkc1tpbmRleF0uc3R5bGUuYm9yZGVyID0gJzJweCBjeWFuIHNvbGlkJztcbiAgfSk7XG59O1xuXG5jb25zdCBoaWdoQmlnID0gKHNoaXBzKSA9PiB7XG4gIGNvbnN0IHRhcmdldHMgPSBbXTtcbiAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmlnLWdyaWQnKTtcblxuICBPYmplY3Qua2V5cyhzaGlwcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgY29uc3QgY29vcmRzID0gc2hpcHNba2V5XTtcbiAgICBPYmplY3Qua2V5cyhjb29yZHMpLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICB0YXJnZXRzLnB1c2goY29vcmQpO1xuICAgIH0pO1xuICB9KTtcblxuICBjb25zdCB0YWJsZSA9IGNvbnZlcnRDb29yZCgpO1xuXG4gIHRhcmdldHMuZm9yRWFjaCgodGFyZ2V0KSA9PiB7XG4gICAgY29uc3QgaW5kZXggPSB0YWJsZVt0YXJnZXRdO1xuICAgIGdyaWRzW2luZGV4XS5zdHlsZS5ib3JkZXIgPSAnMnB4IGN5YW4gc29saWQnO1xuICB9KTtcbn07XG5cbmV4cG9ydCB7IGhpZ2hsaWdodEdyaWQsIGhpZ2hCaWcgfTtcbiIsImltcG9ydCBTaGlwIGZyb20gJy4vc2hpcCc7XG5cbmNvbnN0IEdyaWQgPSAoeCwgeSwgdXAsIHJpZ2h0LCBzaGlwLCBtaXNzID0gZmFsc2UpID0+IHtcbiAgY29uc3QgY29vcmQgPSBbeCwgeV07XG4gIHJldHVybiB7IGNvb3JkLCB1cCwgcmlnaHQsIHNoaXAsIG1pc3MgfTtcbn07XG5cbmNvbnN0IEdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgbWFrZUJvYXJkID0gKHggPSAwLCB5ID0gMCkgPT4ge1xuICAgIGlmICh4ID4gOSB8fCB5ID4gOSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgYm9hcmQgPSBHcmlkKHgsIHksIG1ha2VCb2FyZCh4ICsgMSwgeSksIG1ha2VCb2FyZCh4LCB5ICsgMSkpO1xuXG4gICAgcmV0dXJuIGJvYXJkO1xuICB9O1xuXG4gIGNvbnN0IGZpbmRHcmlkID0gKGdyaWQsIHAsIHEpID0+IHtcbiAgICBpZiAoZ3JpZC5jb29yZFswXSAhPT0gcCkge1xuICAgICAgZ3JpZCA9IGdyaWQudXA7XG4gICAgICByZXR1cm4gZmluZEdyaWQoZ3JpZCwgcCwgcSk7XG4gICAgfVxuXG4gICAgaWYgKGdyaWQuY29vcmRbMF0gPT09IHApIHtcbiAgICAgIGlmIChncmlkLmNvb3JkWzFdICE9PSBxKSB7XG4gICAgICAgIGdyaWQgPSBncmlkLnJpZ2h0O1xuICAgICAgICByZXR1cm4gZmluZEdyaWQoZ3JpZCwgcCwgcSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBncmlkO1xuICB9O1xuXG4gIGNvbnN0IHN1cnZleUdyaWQgPSAoeCwgeSwgbGVuZ3RoLCBvcmllbnQsIGNvdW50ID0gMCkgPT4ge1xuICAgIGlmIChjb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCwgeSkuc2hpcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAob3JpZW50ID09PSAndmVydGljYWwnKSB7XG4gICAgICAgIHJldHVybiBzdXJ2ZXlHcmlkKHggKyAxLCB5LCBsZW5ndGgsIG9yaWVudCwgY291bnQgKyAxKTtcbiAgICAgIH1cbiAgICAgIGlmIChvcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICByZXR1cm4gc3VydmV5R3JpZCh4LCB5ICsgMSwgbGVuZ3RoLCBvcmllbnQsIGNvdW50ICsgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoXG4gICAgeCxcbiAgICB5LFxuICAgIGxlbmd0aCxcbiAgICBvcmllbnQsXG4gICAgY291bnQgPSAwLFxuICAgIHJlY29yZCA9IHt9LFxuICAgIGNoZWNrTGVuZ3RoID0gdHJ1ZSxcbiAgICBzdXJ2ZXkgPSBudWxsXG4gICkgPT4ge1xuICAgIGlmIChjaGVja0xlbmd0aCA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHggKyBsZW5ndGggPiAxMCAmJiBvcmllbnQgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgcmV0dXJuICdTaGlwIG92ZXIgYm9yZGVyJztcbiAgICAgIH1cbiAgICAgIGlmICh5ICsgbGVuZ3RoID4gMTAgJiYgb3JpZW50ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgcmV0dXJuICdTaGlwIG92ZXIgYm9yZGVyJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VydmV5ID09PSBudWxsKSB7XG4gICAgICBpZiAob3JpZW50ID09PSAndmVydGljYWwnKSB7XG4gICAgICAgIHN1cnZleSA9IHN1cnZleUdyaWQoeCwgeSwgbGVuZ3RoLCAndmVydGljYWwnKTtcbiAgICAgIH1cbiAgICAgIGlmIChvcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICBzdXJ2ZXkgPSBzdXJ2ZXlHcmlkKHgsIHksIGxlbmd0aCwgJ2hvcml6b250YWwnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzaGlwTmFtZSA9IGZsZWV0W2xlbmd0aF07XG4gICAgaWYgKHNoaXBSZWNvcmRbc2hpcE5hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiAnU2hpcCBub3QgYXZhaWxhYmxlJztcbiAgICB9XG5cbiAgICBpZiAoY291bnQgPT09IGxlbmd0aCkge1xuICAgICAgaWYgKHNoaXBOYW1lID09PSAnRGVzdHJveWVyMScpIHtcbiAgICAgICAgZmxlZXRbbGVuZ3RoXSA9ICdEZXN0cm95ZXIyJztcbiAgICAgIH1cbiAgICAgIGlmIChzaGlwTmFtZSA9PT0gJ1N1Ym1hcmluZTEnKSB7XG4gICAgICAgIGZsZWV0W2xlbmd0aF0gPSAnU3VibWFyaW5lMic7XG4gICAgICB9XG4gICAgICBzaGlwUmVjb3JkW3NoaXBOYW1lXSA9IHJlY29yZDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZmluZEdyaWQoZnVsbEJvYXJkLCB4LCB5KS5zaGlwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBgU3BhY2UgYWxyZWFkeSB0YWtlbmA7XG4gICAgfVxuXG4gICAgaWYgKG9yaWVudCA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgaWYgKHN1cnZleSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBmaW5kR3JpZChmdWxsQm9hcmQsIHgsIHkpO1xuICAgICAgICB0YXJnZXQuc2hpcCA9IFNoaXAobGVuZ3RoKTtcbiAgICAgICAgY29uc3QgcmVjb3JkS2V5ID0gdGFyZ2V0LmNvb3JkO1xuICAgICAgICByZWNvcmRbcmVjb3JkS2V5XSA9IHJlY29yZEtleTtcbiAgICAgICAgY2hlY2tMZW5ndGggPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHBsYWNlU2hpcChcbiAgICAgICAgICB4ICsgMSxcbiAgICAgICAgICB5LFxuICAgICAgICAgIGxlbmd0aCxcbiAgICAgICAgICBvcmllbnQsXG4gICAgICAgICAgY291bnQgKyAxLFxuICAgICAgICAgIHJlY29yZCxcbiAgICAgICAgICBjaGVja0xlbmd0aCxcbiAgICAgICAgICBzdXJ2ZXlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdXJ2ZXkgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBgU3BhY2UgYWxyZWFkeSB0YWtlbmA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9yaWVudCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICBpZiAoc3VydmV5ID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCwgeSk7XG4gICAgICAgIHRhcmdldC5zaGlwID0gU2hpcChsZW5ndGgpO1xuICAgICAgICBjb25zdCByZWNvcmRLZXkgPSB0YXJnZXQuY29vcmQ7XG4gICAgICAgIHJlY29yZFtyZWNvcmRLZXldID0gcmVjb3JkS2V5O1xuICAgICAgICBjaGVja0xlbmd0aCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gcGxhY2VTaGlwKFxuICAgICAgICAgIHgsXG4gICAgICAgICAgeSArIDEsXG4gICAgICAgICAgbGVuZ3RoLFxuICAgICAgICAgIG9yaWVudCxcbiAgICAgICAgICBjb3VudCArIDEsXG4gICAgICAgICAgcmVjb3JkLFxuICAgICAgICAgIGNoZWNrTGVuZ3RoLFxuICAgICAgICAgIHN1cnZleVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKHN1cnZleSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGBTcGFjZSBhbHJlYWR5IHRha2VuYDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY2hlY2tTdW5rID0gKCkgPT4ge1xuICAgIGNvbnN0IHNoaXBLZXlzID0gT2JqZWN0LmtleXMoc2hpcFJlY29yZCk7XG4gICAgc2hpcEtleXMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgY29uc3QgY29vcmRPYmogPSBzaGlwUmVjb3JkW3NoaXBdO1xuICAgICAgY29uc3QgY29vcmRLZXlzID0gT2JqZWN0LmtleXMoY29vcmRPYmopO1xuICAgICAgY29uc3QgY2hlY2tTaGlwID0gZmluZEdyaWQoXG4gICAgICAgIGZ1bGxCb2FyZCxcbiAgICAgICAgTnVtYmVyKGNvb3JkS2V5c1swXVswXSksXG4gICAgICAgIE51bWJlcihjb29yZEtleXNbMF1bMl0pXG4gICAgICApO1xuICAgICAgY2hlY2tTaGlwLnNoaXAuY2FsU3VuaygpO1xuICAgICAgaWYgKGNoZWNrU2hpcC5zaGlwLmlzU3VuaygpID09PSB0cnVlKSB7XG4gICAgICAgIHN1bmtSZWNvcmQucHVzaChzaGlwKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChzdW5rUmVjb3JkLmxlbmd0aCA9PT0gc2hpcEtleXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gJ0FsbCBzaGlwcyBzdW5rJztcbiAgICB9XG4gICAgcmV0dXJuICdOb3QgYWxsIHNoaXBzIHN1bmsnO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGZpbmRHcmlkKGZ1bGxCb2FyZCwgeCwgeSk7XG4gICAgY29uc3QgY29vcmQgPSBbeCwgeV07XG4gICAgY29uc3QgYXR0YWNrU2hpcCA9IFtdO1xuXG4gICAgaWYgKHRhcmdldC5zaGlwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChoaXRSZWNvcmRbY29vcmRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaGl0UmVjb3JkW2Nvb3JkXSA9IGNvb3JkO1xuICAgICAgICBjb25zdCBmbGVldCA9IE9iamVjdC5rZXlzKHNoaXBSZWNvcmQpO1xuICAgICAgICBmbGVldC5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgICAgY29uc3QgY3VycmVudFNoaXAgPSBzaGlwUmVjb3JkW3NoaXBdO1xuICAgICAgICAgIGlmIChjdXJyZW50U2hpcFtjb29yZF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYXR0YWNrU2hpcC5wdXNoKHNoaXApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGFsbENvb3JkID0gc2hpcFJlY29yZFthdHRhY2tTaGlwWzBdXTtcbiAgICAgICAgY29uc3QgYWxsS2V5cyA9IE9iamVjdC5rZXlzKGFsbENvb3JkKTtcbiAgICAgICAgYWxsS2V5cy5mb3JFYWNoKChrZXlzKSA9PiB7XG4gICAgICAgICAgY29uc3QgcHJvcGVydHkgPSBhbGxDb29yZFtrZXlzXTtcbiAgICAgICAgICBjb25zdCBvbmVIaXQgPSBmaW5kR3JpZChmdWxsQm9hcmQsIHByb3BlcnR5WzBdLCBwcm9wZXJ0eVsxXSk7XG4gICAgICAgICAgb25lSGl0LnNoaXAuaGl0KCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChoaXRSZWNvcmRbY29vcmRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuICdTaGlwIGFscmVhZHkgaGl0JztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGFyZ2V0LnNoaXAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHRhcmdldC5taXNzID09PSBmYWxzZSkge1xuICAgICAgICBoaXRSZWNvcmRbY29vcmRdID0gY29vcmQ7XG4gICAgICAgIHRhcmdldC5taXNzID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAnSGl0dGluZyBhIG1pc3NlZCBzaG90IGFnYWluJztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZnVsbEJvYXJkID0gbWFrZUJvYXJkKCk7XG4gIGNvbnN0IHNoaXBSZWNvcmQgPSB7fTtcbiAgY29uc3QgaGl0UmVjb3JkID0ge307XG4gIGNvbnN0IHN1bmtSZWNvcmQgPSBbXTtcbiAgY29uc3QgZmxlZXQgPSB7XG4gICAgNTogJ0NhcnJpZXInLFxuICAgIDQ6ICdCYXR0bGVzaGlwJyxcbiAgICAzOiAnQ3J1c2llcicsXG4gICAgMjogJ0Rlc3Ryb3llcjEnLFxuICAgIDE6ICdTdWJtYXJpbmUxJyxcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGZ1bGxCb2FyZCxcbiAgICBwbGFjZVNoaXAsXG4gICAgZmluZEdyaWQsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBzaGlwUmVjb3JkLFxuICAgIGhpdFJlY29yZCxcbiAgICBjaGVja1N1bmssXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XG4iLCJjb25zdCBQbGF5ZXIgPSAoZW5lbXlCb2FyZCwgY29tcHV0ZXJQbGF5ZXIsIG93bkJvYXJkKSA9PiB7XG4gIGxldCBhaSA9IGZhbHNlO1xuXG4gIGNvbnN0IGNvbXB1dGVyT24gPSAoKSA9PiB7XG4gICAgYWkgPSB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IGNvbXB1dGVyID0gKCkgPT4gYWk7XG5cbiAgY29uc3QgYXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgaWYgKGNvbXB1dGVyUGxheWVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChjb21wdXRlclBsYXllci5jb21wdXRlcigpID09PSB0cnVlKSB7XG4gICAgICAgIGF1dG9Nb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldFJhbmRvbUludCA9IChtaW4sIG1heCkgPT4ge1xuICAgIG1pbiA9IE1hdGguY2VpbChtaW4pO1xuICAgIG1heCA9IE1hdGguZmxvb3IobWF4KTtcblxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xuICB9O1xuXG4gIGNvbnN0IGF1dG9Nb3ZlID0gKCkgPT4ge1xuICAgIGNvbnN0IHggPSBnZXRSYW5kb21JbnQoMCwgOSk7XG4gICAgY29uc3QgeSA9IGdldFJhbmRvbUludCgwLCA5KTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gb3duQm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcblxuICAgIGlmIChyZXNwb25zZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gYXV0b01vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgYXR0YWNrLCBjb21wdXRlck9uLCBjb21wdXRlciwgZ2V0UmFuZG9tSW50IH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCJjb25zdCBTaGlwID0gKGxlbmd0aCkgPT4ge1xuICBsZXQgc3VuayA9IGZhbHNlO1xuICBsZXQgdG90YWxIaXRzID0gMDtcblxuICBjb25zdCBoaXQgPSAoKSA9PiB7XG4gICAgdG90YWxIaXRzICs9IDE7XG4gIH07XG5cbiAgY29uc3QgY2FsU3VuayA9ICgpID0+IHtcbiAgICBpZiAobGVuZ3RoID09PSB0b3RhbEhpdHMpIHtcbiAgICAgIHN1bmsgPSB0cnVlO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoaXRzID0gKCkgPT4gdG90YWxIaXRzO1xuICBjb25zdCBpc1N1bmsgPSAoKSA9PiBzdW5rO1xuXG4gIHJldHVybiB7IGxlbmd0aCwgaGl0LCBjYWxTdW5rLCBoaXRzLCBpc1N1bmsgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcXG59XFxuXFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMzAsIDMwLCAzMCk7XFxufVxcblxcbi5jb250YWluZXIge1xcbiAgYm9yZGVyOiAxcHggc29pbGQgcmVkO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMWZyIDRmcjtcXG4gIGhlaWdodDogMTAwdmg7XFxufVxcblxcbi50aXRsZS1kaXYge1xcbiAgYm9yZGVyOiAycHggc29saWQgZ3JlZW55ZWxsb3c7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ3JpZC1yb3c6IDEgLyAyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgY29sb3I6IGdyYXk7XFxuICBmb250LXNpemU6IDIuNXJlbTtcXG59XFxuXFxuLmJvYXJkLWRpdiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgZ3JpZC1yb3c6IDIgLyAzO1xcbiAgY29sb3I6IHdoaXRlc21va2U7XFxufVxcblxcbi5zbWFsbC1ib2FyZCB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBvcmFuZ2U7XFxuICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXG4gIHdpZHRoOiAyNXJlbTtcXG4gIGhlaWdodDogMjVyZW07XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxufVxcblxcbi5zbWFsbC1ncmlkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGdyYXk7XFxufSBcXG5cXG4uYmlnLWJvYXJkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIG9yYW5nZTtcXG4gIGdyaWQtY29sdW1uOiAyIC8gMztcXG4gIHdpZHRoOiAzMHJlbTtcXG4gIGhlaWdodDogMzByZW07XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICByZXNpemU6IG5vbmU7XFxufVxcblxcbi5iaWctZ3JpZCB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBncmF5O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59IFxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxVQUFVO0VBQ1YsU0FBUztFQUNULHNCQUFzQjtFQUN0Qix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxpQ0FBaUM7QUFDbkM7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsYUFBYTtFQUNiLDJCQUEyQjtFQUMzQixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSw2QkFBNkI7RUFDN0IsYUFBYTtFQUNiLGVBQWU7RUFDZix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFdBQVc7RUFDWCxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLFlBQVk7RUFDWixlQUFlO0VBQ2YsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0Usd0JBQXdCO0VBQ3hCLG9CQUFvQjtFQUNwQixZQUFZO0VBQ1osYUFBYTtFQUNiLGFBQWE7RUFDYixzQ0FBc0M7QUFDeEM7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSx3QkFBd0I7RUFDeEIsa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixhQUFhO0VBQ2IsYUFBYTtFQUNiLHNDQUFzQztFQUN0QyxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigzMCwgMzAsIDMwKTtcXG59XFxuXFxuLmNvbnRhaW5lciB7XFxuICBib3JkZXI6IDFweCBzb2lsZCByZWQ7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgNGZyO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuLnRpdGxlLWRpdiB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBncmVlbnllbGxvdztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBncmlkLXJvdzogMSAvIDI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBjb2xvcjogZ3JheTtcXG4gIGZvbnQtc2l6ZTogMi41cmVtO1xcbn1cXG5cXG4uYm9hcmQtZGl2IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICB3aWR0aDogMTAwdnc7XFxuICBncmlkLXJvdzogMiAvIDM7XFxuICBjb2xvcjogd2hpdGVzbW9rZTtcXG59XFxuXFxuLnNtYWxsLWJvYXJkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIG9yYW5nZTtcXG4gIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbiAgd2lkdGg6IDI1cmVtO1xcbiAgaGVpZ2h0OiAyNXJlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG59XFxuXFxuLnNtYWxsLWdyaWQge1xcbiAgYm9yZGVyOiAycHggc29saWQgZ3JheTtcXG59IFxcblxcbi5iaWctYm9hcmQge1xcbiAgYm9yZGVyOiAycHggc29saWQgb3JhbmdlO1xcbiAgZ3JpZC1jb2x1bW46IDIgLyAzO1xcbiAgd2lkdGg6IDMwcmVtO1xcbiAgaGVpZ2h0OiAzMHJlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIHJlc2l6ZTogbm9uZTtcXG59XFxuXFxuLmJpZy1ncmlkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGdyYXk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn0gXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHsgaGlnaGxpZ2h0R3JpZCwgaGlnaEJpZyB9IGZyb20gJy4vZGlzcGxheS1zaGlwcyc7XG5pbXBvcnQgeyBjb252ZXJ0Q29vcmQsIGNvbnZlcnROdW0gfSBmcm9tICcuL2NvbnZlcnQnO1xuXG5jb25zdCBwbGF5ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xuY29uc3QgY29tcHV0ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xuY29uc3QgY29tcHV0ZXIgPSBQbGF5ZXIocGxheWVyQm9hcmQpO1xuY29uc3QgcGxheWVyID0gUGxheWVyKGNvbXB1dGVyQm9hcmQsIGNvbXB1dGVyLCBwbGF5ZXJCb2FyZCk7XG5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoNSwgMSwgNSwgJ3ZlcnRpY2FsJyk7XG5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoNCwgMywgNCwgJ2hvcml6b250YWwnKTtcbnBsYXllckJvYXJkLnBsYWNlU2hpcCg2LCA0LCAzLCAnaG9yaXpvbnRhbCcpO1xucGxheWVyQm9hcmQucGxhY2VTaGlwKDEsIDcsIDIsICd2ZXJ0aWNhbCcpO1xucGxheWVyQm9hcmQucGxhY2VTaGlwKDQsIDgsIDIsICd2ZXJ0aWNhbCcpO1xucGxheWVyQm9hcmQucGxhY2VTaGlwKDksIDksIDEsICd2ZXJ0aWNhbCcpO1xucGxheWVyQm9hcmQucGxhY2VTaGlwKDcsIDgsIDEsICd2ZXJ0aWNhbCcpO1xuXG5oaWdobGlnaHRHcmlkKHBsYXllckJvYXJkLnNoaXBSZWNvcmQpO1xuXG5jb21wdXRlckJvYXJkLnBsYWNlU2hpcCgxLCAxLCA1LCAndmVydGljYWwnKTtcbmNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDMsIDMsIDQsICd2ZXJ0aWNhbCcpO1xuY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoOCwgMywgMywgJ2hvcml6b250YWwnKTtcbmNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDEsIDUsIDIsICd2ZXJ0aWNhbCcpO1xuY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoNCwgNiwgMiwgJ3ZlcnRpY2FsJyk7XG5jb21wdXRlckJvYXJkLnBsYWNlU2hpcCgzLCA5LCAxLCAndmVydGljYWwnKTtcbmNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDcsIDAsIDEsICd2ZXJ0aWNhbCcpO1xuXG5oaWdoQmlnKGNvbXB1dGVyQm9hcmQuc2hpcFJlY29yZCk7XG5cbmNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJpZy1ncmlkJyk7XG5cbmNvbnN0IGZpbmRHcmlkID0gKGdyaWQpID0+IHtcbiAgY29uc3QgcmUgPSAvWzAtOV0rLztcbiAgY29uc3QgbnVtID0gZ3JpZC5jbGFzc05hbWU7XG4gIGNvbnN0IGdyaWROdW0gPSByZS5leGVjKG51bS5zbGljZShudW0ubGVuZ3RoIC0gMiwgbnVtLmxlbmd0aCkpWzBdO1xuICBjb25zdCBjb29yZCA9IGNvbnZlcnROdW0oKTtcbiAgY29uc29sZS5sb2coY29vcmRbZ3JpZE51bV0pO1xuICByZXR1cm4gY29vcmRbZ3JpZE51bV07XG59O1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IGdyaWRzLmxlbmd0aDsgaSsrKSB7XG4gIGdyaWRzW2ldLmNsYXNzTGlzdC5hZGQoYGdyaWQke2l9YCk7XG4gIGdyaWRzW2ldLnRleHRDb250ZW50ID0gJy8nO1xuICBncmlkc1tpXS5zdHlsZS5mb250U2l6ZSA9ICcycmVtJztcbiAgZ3JpZHNbaV0uc3R5bGUuY29sb3IgPSAndHJhbnNwYXJlbnQnO1xuXG4gIC8vIGdyaWQudGV4dENvbnRlbnQgPSAnWCc7XG4gIC8vIGdyaWQuc3R5bGUuZm9udFNpemUgPSAnMnJlbSc7XG4gIC8vIGdyaWQuc3R5bGUuY29sb3IgPSAndHJhbnNwYXJlbnQnO1xuXG4gIGdyaWRzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGZpbmRHcmlkKGdyaWRzW2ldKTtcbiAgICBwbGF5ZXIuYXR0YWNrKHRhcmdldFswXSwgdGFyZ2V0WzFdKTtcbiAgICBjb25zdCByZXN1bHQgPSBjb21wdXRlckJvYXJkLmZpbmRHcmlkKFxuICAgICAgY29tcHV0ZXJCb2FyZC5mdWxsQm9hcmQsXG4gICAgICB0YXJnZXRbMF0sXG4gICAgICB0YXJnZXRbMV1cbiAgICApO1xuICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgaWYgKHJlc3VsdC5taXNzID09PSB0cnVlKSB7XG4gICAgICBncmlkc1tpXS5zdHlsZS5jb2xvciA9ICd3aGl0ZXNtb2tlJztcbiAgICB9XG4gICAgaWYgKHJlc3VsdC5zaGlwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGdyaWRzW2ldLnRleHRDb250ZW50ID0gJ1gnO1xuICAgICAgZ3JpZHNbaV0uc3R5bGUuY29sb3IgPSAncmVkJztcbiAgICB9XG5cbiAgICAvLyBncmlkLnN0eWxlLmNvbG9yID0gJ3doaXRlc21va2UnO1xuICAgIC8vIGdyaWQuc3R5bGUuY29sb3IgPSAncmVkJztcbiAgfSk7XG59XG5cbi8vIE1ha2UgZW5lbXkgYm9hcmQgY2xpY2thYmxlLCBpbnZva2UgYXR0YWNrIGJ5IGNsaWNraW5nLFxuLy8gZGlzcGxheSB3aGV0aGVyIGhpdCBvciBtaXNzXG5cbi8vIE1ha2UgcGxheWVyIGJvYXJkIGRpc3BsYXkgd2hldGVyIGhpdCBvciBtaXNzXG4iXSwibmFtZXMiOlsiY29udmVydENvb3JkIiwibnVtIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwieCIsInkiLCJ0YWJsZSIsImNvb3JkIiwiY29udmVydE51bSIsImhpZ2hsaWdodEdyaWQiLCJzaGlwcyIsInRhcmdldHMiLCJncmlkcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiY29vcmRzIiwicHVzaCIsInRhcmdldCIsImluZGV4Iiwic3R5bGUiLCJib3JkZXIiLCJoaWdoQmlnIiwiU2hpcCIsIkdyaWQiLCJ1cCIsInJpZ2h0Iiwic2hpcCIsIm1pc3MiLCJHYW1lYm9hcmQiLCJtYWtlQm9hcmQiLCJib2FyZCIsImZpbmRHcmlkIiwiZ3JpZCIsInAiLCJxIiwic3VydmV5R3JpZCIsIm9yaWVudCIsImNvdW50IiwiZnVsbEJvYXJkIiwicGxhY2VTaGlwIiwicmVjb3JkIiwiY2hlY2tMZW5ndGgiLCJzdXJ2ZXkiLCJzaGlwTmFtZSIsImZsZWV0Iiwic2hpcFJlY29yZCIsInJlY29yZEtleSIsImNoZWNrU3VuayIsInNoaXBLZXlzIiwiY29vcmRPYmoiLCJjb29yZEtleXMiLCJjaGVja1NoaXAiLCJOdW1iZXIiLCJjYWxTdW5rIiwiaXNTdW5rIiwic3Vua1JlY29yZCIsInJlY2VpdmVBdHRhY2siLCJhdHRhY2tTaGlwIiwiaGl0UmVjb3JkIiwiY3VycmVudFNoaXAiLCJhbGxDb29yZCIsImFsbEtleXMiLCJwcm9wZXJ0eSIsIm9uZUhpdCIsImhpdCIsIlBsYXllciIsImVuZW15Qm9hcmQiLCJjb21wdXRlclBsYXllciIsIm93bkJvYXJkIiwiYWkiLCJjb21wdXRlck9uIiwiY29tcHV0ZXIiLCJhdHRhY2siLCJhdXRvTW92ZSIsImdldFJhbmRvbUludCIsIm1pbiIsIm1heCIsIk1hdGgiLCJjZWlsIiwiZmxvb3IiLCJyYW5kb20iLCJyZXNwb25zZSIsInN1bmsiLCJ0b3RhbEhpdHMiLCJoaXRzIiwicGxheWVyQm9hcmQiLCJjb21wdXRlckJvYXJkIiwicGxheWVyIiwicmUiLCJjbGFzc05hbWUiLCJncmlkTnVtIiwiZXhlYyIsInNsaWNlIiwiY29uc29sZSIsImxvZyIsImkiLCJjbGFzc0xpc3QiLCJhZGQiLCJ0ZXh0Q29udGVudCIsImZvbnRTaXplIiwiY29sb3IiLCJhZGRFdmVudExpc3RlbmVyIiwicmVzdWx0Il0sInNvdXJjZVJvb3QiOiIifQ==