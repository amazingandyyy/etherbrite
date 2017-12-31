'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEvent = undefined;

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var provider = void 0;
var web3 = void 0;
var DEFAULT_GAS = 6000000;

function createEvent(p) {
  if (!p) return console.error('\x1b[31m', 'Provider is required for etherbrite-connect.', '\x1b[0m');
  provider = p;
  web3 = new _web2.default(provider);
  console.log('Deploying contract...');
  return createEventFnc;
}

function createEventFnc(name, location, date, ticketNum, ticketPriceInEther) {
  var _require = require('../contracts/Event.json'),
      abi = _require.abi,
      bytecode = _require.bytecode;

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
}

exports.createEvent = createEvent;