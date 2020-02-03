"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require('dotenv').config();

var admins = require('../../models/admins');

var jwt = require('jsonwebtoken');

var bcrypt = require('bcryptjs');

var flag;
module.exports = {
  addAdmin: function () {
    var _addAdmin = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(req, res, next) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log("Adding admin...");
              _context.prev = 1;
              _context.next = 4;
              return admins.findOne({
                email: req.body.email
              }).then(function (adminUser) {
                if (adminUser) {
                  flag = true;
                  console.log("email already exist");
                } else {
                  //assign admin token
                  var adminToken = jwt.sign({
                    data: adminUser
                  }, process.env.ADMIN_TOKEN, {
                    expiresIn: '2h'
                  });
                  console.log("Token assigned " + adminToken); //creating new object to assign value

                  var newAdmin = new admins({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,
                    imageURL: req.body.imageURL,
                    token: adminToken
                  });
                  console.log(newAdmin); //hashing password

                  bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newAdmin.password, salt, function (err, hash) {
                      //set password to hash
                      newAdmin.password = hash; //saving new admin

                      newAdmin.save().then(function () {
                        flag = false;
                        console.log("Data Saved");
                      })["catch"](function (err) {
                        return console.log(err);
                      });
                    });
                  });
                }
              });

            case 4:
              if (flag) {
                res.json({
                  "message": "Email already Exist",
                  "status": 400
                });
              } else {
                res.json({
                  "message": "Admin added",
                  "status": 200
                });
              }

              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](1);
              console.log("Error in adding admin. Error details: " + _context.t0);

            case 10:
              next();

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 7]]);
    }));

    function addAdmin(_x, _x2, _x3) {
      return _addAdmin.apply(this, arguments);
    }

    return addAdmin;
  }()
};