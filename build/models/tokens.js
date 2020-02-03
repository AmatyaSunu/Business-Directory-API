"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

/**
 * schema for token
 */
var SCHEMA = _mongoose["default"].Schema;
var tokenSchema = new SCHEMA({
  status: {
    type: Boolean,
    "default": true
  },
  userId: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

var tokenModel = _mongoose["default"].model('tokens', tokenSchema);

var _default = tokenModel;
exports["default"] = _default;