/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\nvar DOM = function () {\n  var game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  var playerBoard = document.getElementById('player-board');\n  var computerBoard = document.getElementById('computer-board');\n  var messageDisplay = document.getElementById('message');\n  var startButton = document.getElementById('start-game');\n  function initializeBoards() {\n    playerBoard.innerHTML = '';\n    computerBoard.innerHTML = '';\n    for (var i = 0; i < 10; i++) {\n      for (var j = 0; j < 10; j++) {\n        var playerCell = document.createElement('div');\n        playerCell.classList.add('cell');\n        playerCell.dataset.x = i;\n        playerCell.dataset.y = j;\n        playerBoard.appendChild(playerCell);\n        var computerCell = document.createElement('div');\n        computerCell.classList.add('cell');\n        computerCell.dataset.x = i;\n        computerCell.dataset.y = j;\n        computerCell.addEventListener('click', handleAttack);\n        computerBoard.appendChild(computerCell);\n      }\n    }\n  }\n  function handleAttack(e) {\n    var x = parseInt(e.target.dataset.x);\n    var y = parseInt(e.target.dataset.y);\n    if (e.target.classList.contains('hit') || e.target.classList.contains('miss')) {\n      messageDisplay.textContent = \"You've already attacked this square!\";\n      return;\n    }\n    var playerResult = game.playTurn(x, y);\n    updateBoard();\n    if (playerResult === 'player') {\n      endGame('player');\n    } else {\n      messageDisplay.textContent = playerResult === 'hit' ? 'You got a hit!' : 'You missed!';\n\n      // Computer's turn\n      setTimeout(function () {\n        var computerResult = game.playTurn();\n        updateBoard();\n        if (computerResult === 'computer') {\n          endGame('computer');\n        } else {\n          messageDisplay.textContent += computerResult === 'hit' ? ' Computer got a hit!' : ' Computer missed!';\n        }\n      }, 500);\n    }\n  }\n  function updateBoard() {\n    updatePlayerBoard();\n    updateComputerBoard();\n  }\n  function updatePlayerBoard() {\n    var _loop = function _loop(i) {\n      var _loop2 = function _loop2(j) {\n        var cell = playerBoard.children[i * 10 + j];\n        if (game.player.gameboard.board[i][j]) {\n          cell.classList.add('ship');\n        }\n        if (game.player.gameboard.missedAttacks.some(function (coord) {\n          return coord[0] === i && coord[1] === j;\n        })) {\n          cell.classList.add('miss');\n        }\n        if (game.player.gameboard.board[i][j] && game.player.gameboard.board[i][j].hits > 0) {\n          cell.classList.add('hit');\n        }\n      };\n      for (var j = 0; j < 10; j++) {\n        _loop2(j);\n      }\n    };\n    for (var i = 0; i < 10; i++) {\n      _loop(i);\n    }\n  }\n  function updateComputerBoard() {\n    var _loop3 = function _loop3(i) {\n      var _loop4 = function _loop4(j) {\n        var cell = computerBoard.children[i * 10 + j];\n        if (game.computer.gameboard.missedAttacks.some(function (coord) {\n          return coord[0] === i && coord[1] === j;\n        })) {\n          cell.classList.add('miss');\n        }\n        if (game.computer.gameboard.board[i][j] && game.computer.gameboard.board[i][j].hits > 0) {\n          cell.classList.add('hit');\n        }\n      };\n      for (var j = 0; j < 10; j++) {\n        _loop4(j);\n      }\n    };\n    for (var i = 0; i < 10; i++) {\n      _loop3(i);\n    }\n  }\n  function endGame(winner) {\n    messageDisplay.textContent = \"Game Over! \".concat(winner === 'player' ? 'You win!' : 'Computer wins!');\n    computerBoard.removeEventListener('click', handleAttack);\n    startButton.textContent = 'Play Again';\n    startButton.style.display = 'block';\n  }\n  function startGame() {\n    game.setup();\n    initializeBoards();\n    updateBoard();\n    messageDisplay.textContent = 'Game started! Click on the enemy board to attack.';\n    startButton.style.display = 'none';\n  }\n  return {\n    startGame: startGame\n  };\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOM);\n\n//# sourceURL=webpack://battleship/./src/dom.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n\n\nvar Game = /*#__PURE__*/function () {\n  function Game() {\n    _classCallCheck(this, Game);\n    this.player = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    this.computer = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](true);\n    this.currentPlayer = this.player;\n  }\n  return _createClass(Game, [{\n    key: \"setup\",\n    value: function setup() {\n      // Place ships for both players\n      this.placeShipsRandomly(this.player.gameboard);\n      this.placeShipsRandomly(this.computer.gameboard);\n    }\n  }, {\n    key: \"placeShipsRandomly\",\n    value: function placeShipsRandomly(gameboard) {\n      var shipLengths = [5, 4, 3, 3, 2];\n      shipLengths.forEach(function (length) {\n        var placed = false;\n        while (!placed) {\n          var x = Math.floor(Math.random() * 10);\n          var y = Math.floor(Math.random() * 10);\n          var isVertical = Math.random() < 0.5;\n          placed = gameboard.placeShip(new _ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"](length), x, y, isVertical);\n        }\n      });\n    }\n  }, {\n    key: \"playTurn\",\n    value: function playTurn(x, y) {\n      if (this.currentPlayer === this.player) {\n        var hit = this.player.attack(this.computer.gameboard, x, y);\n        if (this.computer.gameboard.allShipsSunk()) {\n          return 'player';\n        }\n        this.currentPlayer = this.computer;\n        return hit ? 'hit' : 'miss';\n      } else {\n        var _hit = this.computer.randomAttack(this.player.gameboard);\n        if (this.player.gameboard.allShipsSunk()) {\n          return 'computer';\n        }\n        this.currentPlayer = this.player;\n        return _hit ? 'hit' : 'miss';\n      }\n    }\n  }]);\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);\n\n//# sourceURL=webpack://battleship/./src/game.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nvar Gameboard = /*#__PURE__*/function () {\n  function Gameboard() {\n    _classCallCheck(this, Gameboard);\n    this.ships = [];\n    this.missedAttacks = [];\n    this.board = Array(10).fill(null).map(function () {\n      return Array(10).fill(null);\n    });\n  }\n  return _createClass(Gameboard, [{\n    key: \"placeShip\",\n    value: function placeShip(ship, x, y, isVertical) {\n      if (this.isValidPlacement(ship, x, y, isVertical)) {\n        this.ships.push(ship);\n        for (var i = 0; i < ship.length; i++) {\n          if (isVertical) {\n            this.board[x][y + i] = ship;\n          } else {\n            this.board[x + i][y] = ship;\n          }\n        }\n        return true;\n      }\n      return false;\n    }\n  }, {\n    key: \"isValidPlacement\",\n    value: function isValidPlacement(ship, x, y, isVertical) {\n      if (isVertical) {\n        if (y + ship.length > 10) return false;\n        for (var i = 0; i < ship.length; i++) {\n          if (this.board[x][y + i] !== null) return false;\n        }\n      } else {\n        if (x + ship.length > 10) return false;\n        for (var _i = 0; _i < ship.length; _i++) {\n          if (this.board[x + _i][y] !== null) return false;\n        }\n      }\n      return true;\n    }\n  }, {\n    key: \"receiveAttack\",\n    value: function receiveAttack(x, y) {\n      if (this.board[x][y] === null) {\n        this.missedAttacks.push([x, y]);\n        return false;\n      } else {\n        this.board[x][y].hit();\n        return true;\n      }\n    }\n  }, {\n    key: \"allShipsSunk\",\n    value: function allShipsSunk() {\n      return this.ships.every(function (ship) {\n        return ship.isSunk();\n      });\n    }\n  }]);\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n\nwindow.DOM = _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n\n\n// player.js\nvar Player = /*#__PURE__*/function () {\n  function Player() {\n    var isComputer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n    _classCallCheck(this, Player);\n    this.gameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    this.isComputer = isComputer;\n    this.attackedCoordinates = new Set();\n  }\n  return _createClass(Player, [{\n    key: \"attack\",\n    value: function attack(enemyGameboard, x, y) {\n      return enemyGameboard.receiveAttack(x, y);\n    }\n  }, {\n    key: \"randomAttack\",\n    value: function randomAttack(enemyGameboard) {\n      var x, y;\n      do {\n        x = Math.floor(Math.random() * 10);\n        y = Math.floor(Math.random() * 10);\n      } while (this.attackedCoordinates.has(\"\".concat(x, \",\").concat(y)));\n      this.attackedCoordinates.add(\"\".concat(x, \",\").concat(y));\n      return this.attack(enemyGameboard, x, y);\n    }\n  }]);\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nvar Ship = /*#__PURE__*/function () {\n  function Ship(length) {\n    _classCallCheck(this, Ship);\n    this.length = length;\n    this.hits = 0;\n    this.sunk = false;\n  }\n  return _createClass(Ship, [{\n    key: \"hit\",\n    value: function hit() {\n      this.hits++;\n      this.isSunk();\n    }\n  }, {\n    key: \"isSunk\",\n    value: function isSunk() {\n      if (this.hits >= this.length) {\n        this.sunk = true;\n      }\n      return this.sunk;\n    }\n  }]);\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

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
/******/ 			// no module.id needed
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;