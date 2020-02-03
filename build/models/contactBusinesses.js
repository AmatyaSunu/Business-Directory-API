"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

/**
 * schema for contact businesses
 */
var SCHEMA = _mongoose["default"].Schema;
var contactBusinessSchema = new SCHEMA({
  status: {
    type: Boolean,
    "default": true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contactNumber: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

var contactBusinessModel = _mongoose["default"].model('ContactAdmin', contactBusinessSchema);

var _default = contactBusinessModel;
exports["default"] = _default;