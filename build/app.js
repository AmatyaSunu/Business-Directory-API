"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _route = _interopRequireDefault(require("routes/api/route"));

var express = require('express');

var app = express();
/**
 * MongoDb connection
 */

var url = "mongodb://localhost:27017/businessDirectory";
_mongoose["default"].Promise = global.Promise;

_mongoose["default"].connect(url, {
  useNewUrlParser: true
}).then(function () {
  return console.log("MongoDb Connected...");
})["catch"](function (err) {
  return console.log(err);
});
/**
 * Express body parser
  */


app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.json());
/**
 * Routes
 */

app.use('/api', _route["default"]);
var _default = app;
exports["default"] = _default;