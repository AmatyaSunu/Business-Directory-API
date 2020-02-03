"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

/**
 * schema for categories
 */
var SCHEMA = _mongoose["default"].Schema;
var OBJECT_ID = SCHEMA.Types.ObjectId;
var categorySchema = new SCHEMA({
  status: {
    type: Boolean,
    "default": true
  },
  title: {
    type: String,
    required: true
  },
  approved: {
    type: OBJECT_ID,
    ref: 'admin',
    required: true
  },
  imageURL: {
    type: String
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

var categoryModel = _mongoose["default"].model('categories', categorySchema);

var _default = categoryModel;
exports["default"] = _default;