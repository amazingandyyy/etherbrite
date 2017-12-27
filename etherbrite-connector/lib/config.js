'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventContract = exports.DEFAULT_GAS = exports.coinbase = exports.web3 = exports.provider = undefined;

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

var _truffleContract = require('truffle-contract');

var _truffleContract2 = _interopRequireDefault(_truffleContract);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var provider = new _web2.default.providers.HttpProvider('http://localhost:8545');
var web3 = new _web2.default(provider);
var coinbase = web3.eth.coinbase;

var DEFAULT_GAS = 6000000;
var EventContractABI = require('../contracts/Event.json');
var EventContract = (0, _truffleContract2.default)(EventContractABI);
EventContract.setProvider(provider);

exports.provider = provider;
exports.web3 = web3;
exports.coinbase = coinbase;
exports.DEFAULT_GAS = DEFAULT_GAS;
exports.EventContract = EventContract;