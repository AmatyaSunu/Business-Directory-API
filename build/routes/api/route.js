"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressPromiseRouter = _interopRequireDefault(require("express-promise-router"));

var _categoryController = require("../../controllers/api/categoryController");

var _adminController = require("../../controllers/api/adminController");

var router = (0, _expressPromiseRouter["default"])();
router.post('/addAdmin', _adminController.addAdmin);
router.post('/fetchCategory', _categoryController.fetchCategory);
router.post('/addCategory', _categoryController.addCategory);
var _default = router;
exports["default"] = _default;