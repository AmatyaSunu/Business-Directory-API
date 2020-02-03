"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

/**
 * schema for admin users
 */
var SCHEMA = _mongoose["default"].Schema;
var adminSchema = new SCHEMA({
  status: {
    type: Boolean,
    "default": true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    "default": "https://www.kindpng.com/imgv/Jwxwib_avatar-michael-jordan-jersey-clip-art-michael-jordan/"
  },
  token: {
    type: String
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

var adminModel = _mongoose["default"].model("admins", adminSchema);

var _default = adminModel;
exports["default"] = _default;