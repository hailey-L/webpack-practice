(self["webpackChunkwebpack_practice"] = self["webpackChunkwebpack_practice"] || []).push([[0],[
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var normalize_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);




function component() {
  const element = document.createElement('div');
  element.innerHTML = 'Webpack이예요';

  console.log(_index_css__WEBPACK_IMPORTED_MODULE_1__.default);

  element.classList = _index_css__WEBPACK_IMPORTED_MODULE_1__.default.helloWebpack;

  return element;
}

document.body.appendChild(component());

//클래스이름을 사용해서 돔의 갯수가 몇개 인지 체크하는 코드 추가
console.log(jquery__WEBPACK_IMPORTED_MODULE_2___default()(`.${_index_css__WEBPACK_IMPORTED_MODULE_1__.default.helloWebpack}`).length);


/***/ }),
/* 1 */,
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"helloWebpack":"Xsm8tCif7FknljylODIGx"});

/***/ })
],
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [2], () => (__webpack_exec__(0)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);