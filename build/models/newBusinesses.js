"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

/**
 * schema for new business addition
 */
var SCHEMA = _mongoose["default"].Schema;
var newBusinessSchema = new SCHEMA({
  status: {
    type: Boolean,
    "default": true
  },
  contactName: {
    type: String,
    required: true
  },
  businessName: {
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
  category: {
    type: String,
    required: true,
    ref: 'category'
  },
  address: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  approvedBy: {
    type: String,
    ref: 'admin'
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

var newBusinessModel = _mongoose["default"].model('newBusinesses', newBusinessSchema);

var _default = newBusinessModel;
exports["default"] = _default;