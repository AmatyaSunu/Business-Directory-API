"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

/**
 * schema for businesses
 */
var SCHEMA = _mongoose["default"].Schema;
var businessSchema = new SCHEMA({
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
  imageURL: {
    type: String
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

var businessModel = _mongoose["default"].model('businesses', businessSchema);

var _default = businessModel;
exports["default"] = _default;