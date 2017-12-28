'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEvent = undefined;

var _config = require('./config');

function createEvent(name, location, date, ticketNum, ticketPriceInEther) {
  var ticketPriceInWei = _config.web3.toWei(ticketPriceInEther, 'ether');
  return _config.EventContract.new(name, location, date, parseInt(ticketNum), parseInt(ticketPriceInWei), {
    from: _config.coinbase,
    gas: _config.DEFAULT_GAS
  }).then(function (inst) {
    return inst;
  }).catch(function (e) {
    console.error(e);
    throw e.message;
  });
}

exports.createEvent = createEvent;