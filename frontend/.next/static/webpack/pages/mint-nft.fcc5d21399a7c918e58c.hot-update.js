"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/mint-nft",{

/***/ "./src/pages/mint-nft/index.tsx":
/*!**************************************!*\
  !*** ./src/pages/mint-nft/index.tsx ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_dominiclet_projects_wottlenft_frontend_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty */ \"./node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var _home_dominiclet_projects_wottlenft_frontend_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _home_dominiclet_projects_wottlenft_frontend_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/regenerator */ \"./node_modules/next/node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _home_dominiclet_projects_wottlenft_frontend_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_home_dominiclet_projects_wottlenft_frontend_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-hook-form */ \"./node_modules/react-hook-form/dist/index.esm.js\");\n/* harmony import */ var ipfs_http_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ipfs-http-client */ \"./node_modules/ipfs-http-client/esm/src/index.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ \"./node_modules/buffer/index.js\")[\"Buffer\"];\n\n\n\nvar _jsxFileName = \"/home/dominiclet/projects/wottlenft/frontend/src/pages/mint-nft/index.tsx\",\n    _this = undefined,\n    _s = $RefreshSig$();\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0,_home_dominiclet_projects_wottlenft_frontend_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\n\n\n\n\n\n\nvar MintNftPage = function MintNftPage() {\n  _s();\n\n  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_4__.useForm)(),\n      register = _useForm.register,\n      handleSubmit = _useForm.handleSubmit,\n      watch = _useForm.watch;\n\n  var watchImage = watch(\"image\");\n\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null),\n      ipfs = _useState[0],\n      setIpfs = _useState[1];\n\n  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function () {\n    var init = /*#__PURE__*/function () {\n      var _ref = (0,_home_dominiclet_projects_wottlenft_frontend_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__.default)( /*#__PURE__*/_home_dominiclet_projects_wottlenft_frontend_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee() {\n        var client;\n        return _home_dominiclet_projects_wottlenft_frontend_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                if (!ipfs) {\n                  _context.next = 2;\n                  break;\n                }\n\n                return _context.abrupt(\"return\");\n\n              case 2:\n                _context.prev = 2;\n                client = (0,ipfs_http_client__WEBPACK_IMPORTED_MODULE_5__.create)('/ip4/127.0.0.1/tcp/5001');\n                _context.next = 6;\n                return client.isOnline();\n\n              case 6:\n                if (!_context.sent) {\n                  _context.next = 9;\n                  break;\n                }\n\n                setIpfs(client);\n                console.log('IPFS connected');\n\n              case 9:\n                _context.next = 15;\n                break;\n\n              case 11:\n                _context.prev = 11;\n                _context.t0 = _context[\"catch\"](2);\n                console.error(_context.t0);\n                console.log(\"Unsuccessful connection to IPFS\");\n\n              case 15:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee, null, [[2, 11]]);\n      }));\n\n      return function init() {\n        return _ref.apply(this, arguments);\n      };\n    }();\n\n    init();\n  }, []);\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(\"div\", {\n    className: \"h-screen w-screen flex flex-col items-center justify-center\",\n    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(\"div\", {\n      className: \"border h-4/5 w-4/12 rounded-md p-10 bg-gray-100\",\n      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(\"form\", {\n        className: \"h-full flex flex-col items-center\",\n        onSubmit: handleSubmit(function (data) {\n          var reader = new FileReader();\n          reader.readAsArrayBuffer(data.image[0]);\n          reader.onload = /*#__PURE__*/(0,_home_dominiclet_projects_wottlenft_frontend_node_modules_next_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__.default)( /*#__PURE__*/_home_dominiclet_projects_wottlenft_frontend_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee2() {\n            var buffer, _yield$ipfs$add, cid, imageAddr, metadata;\n\n            return _home_dominiclet_projects_wottlenft_frontend_node_modules_next_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee2$(_context2) {\n              while (1) {\n                switch (_context2.prev = _context2.next) {\n                  case 0:\n                    buffer = Buffer.from(reader.result);\n                    _context2.next = 3;\n                    return ipfs.add(buffer);\n\n                  case 3:\n                    _yield$ipfs$add = _context2.sent;\n                    cid = _yield$ipfs$add.cid;\n                    imageAddr = \"https://ipfs.io/ipfs/\" + cid.toString();\n                    console.log(\"IPFS upload successful\");\n                    console.log(\"View image at \" + imageAddr);\n                    metadata = {\n                      name: data.nftName,\n                      description: data.description,\n                      image: imageAddr\n                    };\n                    console.log(\"Send metadata to backend...\");\n                    console.log(JSON.stringify(metadata));\n\n                  case 11:\n                  case \"end\":\n                    return _context2.stop();\n                }\n              }\n            }, _callee2);\n          }));\n        }),\n        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(\"label\", {\n          className: \"w-full\",\n          children: [\"NFT name\", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(\"input\", _objectSpread({\n            className: \"border rounded p-3 w-full my-2\",\n            placeholder: \"Enter your NFT's name\",\n            type: \"text\"\n          }, register(\"nftName\")), void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 64,\n            columnNumber: 25\n          }, _this)]\n        }, void 0, true, {\n          fileName: _jsxFileName,\n          lineNumber: 62,\n          columnNumber: 21\n        }, _this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(\"label\", {\n          className: \"w-full\",\n          children: [\"Description\", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(\"input\", _objectSpread({\n            className: \"border rounded p-3 w-full my-2\",\n            placeholder: \"Enter a short description for your NFT\",\n            type: \"text\"\n          }, register(\"description\")), void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 73,\n            columnNumber: 25\n          }, _this)]\n        }, void 0, true, {\n          fileName: _jsxFileName,\n          lineNumber: 71,\n          columnNumber: 21\n        }, _this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(\"div\", {\n          className: \"h-3/5 w-full\",\n          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(\"label\", {\n            children: [\"Upload image\", watchImage && watchImage.length == 1 && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(\"img\", {\n              id: \"imgPreview\",\n              src: URL.createObjectURL(watchImage[0])\n            }, void 0, false, {\n              fileName: _jsxFileName,\n              lineNumber: 84,\n              columnNumber: 33\n            }, _this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(\"input\", _objectSpread({\n              className: \"border rounded p-3 w-full mt-2\",\n              placeholder: \"Enter a short description for your NFT\",\n              type: \"file\"\n            }, register(\"image\")), void 0, false, {\n              fileName: _jsxFileName,\n              lineNumber: 86,\n              columnNumber: 29\n            }, _this)]\n          }, void 0, true, {\n            fileName: _jsxFileName,\n            lineNumber: 81,\n            columnNumber: 25\n          }, _this)\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 80,\n          columnNumber: 21\n        }, _this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(\"button\", {\n          className: \"border mt-10 w-3/5 h-1/5 rounded-md bg-gray-400\",\n          children: \"Mint NFT\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 94,\n          columnNumber: 21\n        }, _this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 42,\n        columnNumber: 17\n      }, _this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 41,\n      columnNumber: 13\n    }, _this)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 40,\n    columnNumber: 9\n  }, _this);\n};\n\n_s(MintNftPage, \"QnQ8aEuwVi0iVpijnbfcOdGvWs0=\", false, function () {\n  return [react_hook_form__WEBPACK_IMPORTED_MODULE_4__.useForm];\n});\n\n_c = MintNftPage;\n/* harmony default export */ __webpack_exports__[\"default\"] = (MintNftPage);\n\nvar _c;\n\n$RefreshReg$(_c, \"MintNftPage\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQUE7QUFBQTtBQUFBO0FBREo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURKO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FESjtBQThESCxDQXBGRDs7R0FBTUQ7VUFDd0NGOzs7S0FEeENFO0FBcUZOLCtEQUFlQSxXQUFmIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9wYWdlcy9taW50LW5mdC9pbmRleC50c3g/YTEyNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VGb3JtIH0gZnJvbSBcInJlYWN0LWhvb2stZm9ybVwiO1xuaW1wb3J0IHsgY3JlYXRlIH0gZnJvbSAnaXBmcy1odHRwLWNsaWVudCc7XG5cbnR5cGUgSW5wdXRzID0ge1xuICAgIG5mdE5hbWU6IHN0cmluZyxcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nLFxuICAgIGltYWdlOiBhbnksXG59XG5cbnR5cGUgTWV0YWRhdGEgPSB7XG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG4gICAgaW1hZ2U6IHN0cmluZyxcbn1cblxuY29uc3QgTWludE5mdFBhZ2UgPSAoKSA9PiB7XG4gICAgY29uc3QgeyByZWdpc3RlciwgaGFuZGxlU3VibWl0LCB3YXRjaCB9ID0gdXNlRm9ybTxJbnB1dHM+KCk7XG4gICAgY29uc3Qgd2F0Y2hJbWFnZSA9IHdhdGNoKFwiaW1hZ2VcIik7XG4gICAgY29uc3QgW2lwZnMsIHNldElwZnNdID0gdXNlU3RhdGU8YW55fG51bGw+KG51bGwpO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgaW5pdCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGlmIChpcGZzKSByZXR1cm47XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNsaWVudCA9IGNyZWF0ZSgnL2lwNC8xMjcuMC4wLjEvdGNwLzUwMDEnKTtcbiAgICAgICAgICAgICAgICBpZiAoYXdhaXQgY2xpZW50LmlzT25saW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0SXBmcyhjbGllbnQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSVBGUyBjb25uZWN0ZWQnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVuc3VjY2Vzc2Z1bCBjb25uZWN0aW9uIHRvIElQRlNcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpbml0KCk7XG4gICAgfSwgW10pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoLXNjcmVlbiB3LXNjcmVlbiBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3JkZXIgaC00LzUgdy00LzEyIHJvdW5kZWQtbWQgcC0xMCBiZy1ncmF5LTEwMFwiPlxuICAgICAgICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cImgtZnVsbCBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlclwiIG9uU3VibWl0PXtoYW5kbGVTdWJtaXQoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihkYXRhLmltYWdlWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKHJlYWRlci5yZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGNpZCB9ID0gYXdhaXQgaXBmcy5hZGQoYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlQWRkciA9IFwiaHR0cHM6Ly9pcGZzLmlvL2lwZnMvXCIgKyBjaWQudG9TdHJpbmcoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJJUEZTIHVwbG9hZCBzdWNjZXNzZnVsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJWaWV3IGltYWdlIGF0IFwiICsgaW1hZ2VBZGRyKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWV0YWRhdGE6IE1ldGFkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGRhdGEubmZ0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZGF0YS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZTogaW1hZ2VBZGRyLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZW5kIG1ldGFkYXRhIHRvIGJhY2tlbmQuLi5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShtZXRhZGF0YSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidy1mdWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBORlQgbmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJvcmRlciByb3VuZGVkIHAtMyB3LWZ1bGwgbXktMlwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgeW91ciBORlQncyBuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLnJlZ2lzdGVyKFwibmZ0TmFtZVwiKX0gXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidy1mdWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBEZXNjcmlwdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJvcmRlciByb3VuZGVkIHAtMyB3LWZ1bGwgbXktMlwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgYSBzaG9ydCBkZXNjcmlwdGlvbiBmb3IgeW91ciBORlRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4ucmVnaXN0ZXIoXCJkZXNjcmlwdGlvblwiKX0gXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImgtMy81IHctZnVsbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVwbG9hZCBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsod2F0Y2hJbWFnZSAmJiB3YXRjaEltYWdlLmxlbmd0aCA9PSAxKSAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBpZD1cImltZ1ByZXZpZXdcIiBzcmM9e1VSTC5jcmVhdGVPYmplY3RVUkwod2F0Y2hJbWFnZVswXSl9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYm9yZGVyIHJvdW5kZWQgcC0zIHctZnVsbCBtdC0yXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgYSBzaG9ydCBkZXNjcmlwdGlvbiBmb3IgeW91ciBORlRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5yZWdpc3RlcihcImltYWdlXCIpfSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYm9yZGVyIG10LTEwIHctMy81IGgtMS81IHJvdW5kZWQtbWQgYmctZ3JheS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIE1pbnQgTkZUXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuZXhwb3J0IGRlZmF1bHQgTWludE5mdFBhZ2UiXSwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJ1c2VGb3JtIiwiY3JlYXRlIiwiTWludE5mdFBhZ2UiLCJyZWdpc3RlciIsImhhbmRsZVN1Ym1pdCIsIndhdGNoIiwid2F0Y2hJbWFnZSIsImlwZnMiLCJzZXRJcGZzIiwiaW5pdCIsImNsaWVudCIsImlzT25saW5lIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwiZGF0YSIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJyZWFkQXNBcnJheUJ1ZmZlciIsImltYWdlIiwib25sb2FkIiwiYnVmZmVyIiwiQnVmZmVyIiwiZnJvbSIsInJlc3VsdCIsImFkZCIsImNpZCIsImltYWdlQWRkciIsInRvU3RyaW5nIiwibWV0YWRhdGEiLCJuYW1lIiwibmZ0TmFtZSIsImRlc2NyaXB0aW9uIiwiSlNPTiIsInN0cmluZ2lmeSIsImxlbmd0aCIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/mint-nft/index.tsx\n");

/***/ })

});