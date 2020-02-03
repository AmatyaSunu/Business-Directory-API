"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

/**
 * schema for claim businesses
 */
var SCHEMA = _mongoose["default"].Schema;
var claimBusinessSchema = new SCHEMA({
  status: {
    type: Boolean,
    "default": true
  },
  contactName: {
    type: String,
    required: true
  },
  businessId: {
    type: String,
    required: true,
    ref: 'business'
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
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

var claimBusinessModel = _mongoose["default"].model('claimBusinesses', claimBusinessSchema);

var _default = claimBusinessModel;
exports["default"] = _default;