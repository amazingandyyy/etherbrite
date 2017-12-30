'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEvent = undefined;

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

var _truffleContract = require('truffle-contract');

var _truffleContract2 = _interopRequireDefault(_truffleContract);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var provider = void 0;
var web3 = void 0;
var coinbase = void 0;
var DEFAULT_GAS = 6000000;
var EventContract = void 0;

function createEvent(p) {
  if (!p) return console.error('\x1b[31m', 'Provider is required for etherbrite-connect.', '\x1b[0m');
  provider = p;
  web3 = new _web2.default(provider);
  coinbase = web3.eth.coinbase;
  EventContract = (0, _truffleContract2.default)(require('../contracts/Event.json'));
  EventContract.setProvider(provider);
  console.log('\x1B[32m', 'Deploying contract...', '\x1b[0m');
  return createEventFnc;
}

function createEventFnc(name, location, date, ticketNum, ticketPriceInEther) {
  var ticketPriceInWei = web3.toWei(ticketPriceInEther, 'ether');
  // console.log({
  //   name, location, date, ticketNum, ticketPriceInEther
  // });
  return EventContract.new(name, location, date, parseInt(ticketNum), parseInt(ticketPriceInWei), {
    from: coinbase,
    gas: DEFAULT_GAS
  });
  // .then(contract => {
  //   console.log(`deployed event contract address: ${contract.address}`);
  //   return contract.address;
  // })
  // .catch(e => {
  //   console.error('Error when creating contract:')
  //   console.error(e);
  //   throw(e.message);
  // })
}

exports.createEvent = createEvent;