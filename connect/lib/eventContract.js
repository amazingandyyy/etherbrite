'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventContract = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_GAS = 4700000;

var eventContract = function () {
  function eventContract(p) {
    _classCallCheck(this, eventContract);

    if (!p) return console.error('\x1b[31m', 'Provider is required for etherbrite-connect.', '\x1b[0m');
    this.web3 = new _web2.default(p);
  }

  _createClass(eventContract, [{
    key: 'createEvent',
    value: function createEvent(name, location, date, ticketNum, ticketPriceInEther) {
      var _this = this;

      console.log('Deploying contract...');
      var web3 = this.web3;

      var _require = require('../contracts/Event.json'),
          abi = _require.abi,
          bytecode = _require.bytecode;
      // bytecode is only for deploying


      var ticketPriceInWei = web3.utils.toWei(ticketPriceInEther.toString(), 'ether');
      var eventContract = new web3.eth.Contract(abi);
      return new Promise(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
          var coinbase;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _this.getCoinbase();

                case 2:
                  coinbase = _context.sent;

                  eventContract.deploy({
                    data: bytecode,
                    arguments: [name, location, date, ticketNum, ticketPriceInWei]
                  }).send({
                    from: coinbase,
                    gas: DEFAULT_GAS
                  }).then(function (ins) {
                    return resolve(ins);
                  }).catch(function (e) {
                    return reject(e);
                  });

                case 4:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }, {
    key: 'register',
    value: function register(contractAddress, _ref2) {
      var _this2 = this;

      var first = _ref2.first,
          last = _ref2.last,
          email = _ref2.email;

      console.log('Registering new participant...');
      var web3 = this.web3;

      var _require2 = require('../contracts/Event.json'),
          abi = _require2.abi;

      var eventContract = new web3.eth.Contract(abi, contractAddress);
      var ticketPriceInWei = void 0;

      return new Promise(function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
          var coinbase;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _this2.getCoinbase();

                case 2:
                  coinbase = _context2.sent;

                  eventContract.methods.ticketPrice().call(function (err, priceInWei) {
                    if (err) return console.error(err);
                    ticketPriceInWei = priceInWei;
                    eventContract.methods.register(first, last, email).send({
                      from: coinbase,
                      gas: DEFAULT_GAS,
                      value: ticketPriceInWei // in wei
                    }).then(resolve).catch(reject);
                  });

                case 4:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }));

        return function (_x3, _x4) {
          return _ref3.apply(this, arguments);
        };
      }());
    }
  }, {
    key: 'search',
    value: function search(contractAddress, _ref4) {
      var _this3 = this;

      var address = _ref4.address;

      console.log('Searching for a participant-' + address + '...');
      var web3 = this.web3;

      var _require3 = require('../contracts/Event.json'),
          abi = _require3.abi;

      var eventContract = new web3.eth.Contract(abi, contractAddress);

      return new Promise(function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
          var coinbase;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return _this3.getCoinbase();

                case 2:
                  coinbase = _context3.sent;

                  eventContract.methods.search(address).call({
                    from: coinbase,
                    gas: DEFAULT_GAS
                  }).then(resolve).catch(reject);

                case 4:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this3);
        }));

        return function (_x5, _x6) {
          return _ref5.apply(this, arguments);
        };
      }());
    }
  }, {
    key: 'checkin',
    value: function checkin(contractAddress, _ref6) {
      var _this4 = this;

      var address = _ref6.address;

      console.log('Checkining for a participant-' + address + '...');
      var web3 = this.web3;

      var _require4 = require('../contracts/Event.json'),
          abi = _require4.abi;

      var eventContract = new web3.eth.Contract(abi, contractAddress);

      return new Promise(function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(resolve, reject) {
          var coinbase;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return _this4.getCoinbase();

                case 2:
                  coinbase = _context4.sent;

                  eventContract.methods.checkin(address).send({
                    from: coinbase,
                    gas: DEFAULT_GAS
                  }).then(resolve).catch(reject);

                case 4:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this4);
        }));

        return function (_x7, _x8) {
          return _ref7.apply(this, arguments);
        };
      }());
    }
  }, {
    key: 'getCoinbase',
    value: function getCoinbase() {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        _this5.web3.eth.getCoinbase(function (error, coinbase) {
          if (error) return reject('Coinbase not found');
          resolve(coinbase);
        });
      });
    }
  }]);

  return eventContract;
}();

// Usage
// .then(inst=>{
//   if(inst.options.address){
//     console.log('hell yea');
//   }
//   console.log(inst);
// })
// .catch(e=>{
//   console.error(e);
// })

exports.eventContract = eventContract;