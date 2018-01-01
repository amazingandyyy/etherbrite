'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventContract = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      console.log('Deploying contract...');
      var web3 = this.web3;

      var _require = require('../contracts/Event.json'),
          abi = _require.abi,
          bytecode = _require.bytecode;
      // bytecode is only for deploying


      var ticketPriceInWei = web3.utils.toWei(ticketPriceInEther.toString(), 'ether');
      var eventContract = new web3.eth.Contract(abi);
      return new Promise(function (resolve, reject) {
        web3.eth.getCoinbase(function (error, coinbase) {
          if (error) return console.error('Coinbase not found');
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
        });
      });
    }
  }, {
    key: 'register',
    value: function register(address, _ref) {
      var first = _ref.first,
          last = _ref.last,
          email = _ref.email;

      console.log('Registering new participant...');
      var web3 = this.web3;

      var _require2 = require('../contracts/Event.json'),
          abi = _require2.abi;

      var eventContract = new web3.eth.Contract(abi, address);
      var ticketPriceInWei = void 0;

      return new Promise(function (resolve, reject) {
        web3.eth.getCoinbase(function (error, coinbase) {
          if (error) return console.error('Coinbase not found');
          eventContract.methods.ticketPrice().call(function (err, priceInWei) {
            if (err) return console.error(err);
            ticketPriceInWei = priceInWei;
            eventContract.methods.register(first, last, email).send({
              from: coinbase,
              gas: DEFAULT_GAS,
              value: ticketPriceInWei // in wei
            }).then(resolve).catch(reject);
          });
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