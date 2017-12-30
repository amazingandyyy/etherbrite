'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventListener = undefined;

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var provider = void 0; // Usage
// eventListener(provider)(contractAddress, 'eventName');

var web3 = void 0;

function eventListener(p) {
  provider = p;
  web3 = new _web2.default(provider);
  return eventListenerFnc;
}

function eventListenerFnc(contractAddr, evt) {
  var filter = web3.eth.filter({
    fromBlock: web3.eth.getBlock('latest') - 50,
    toBlock: 'latest',
    address: contractAddr,
    topics: [generateTopic(evt)]
  });
  console.log('\x1B[0m\x1B[2m', 'Listening to', evt + ' event', 'at address', '' + contractAddr, '\x1b[0m');

  return new Promise(function (res, rej) {
    filter.get(function (err, response) {
      if (err) return rej(err);
      if (response.length > 0) {
        return res({ event: evt, response: response[0] });
      }
    });
  });
}

function generateTopic(evt) {
  var topic = '';
  switch (evt.toString()) {
    case 'ContractCreated':
      topic = evt + '()';
      break;
    case 'NewRegistration':
      topic = evt + '(string,string,string,bool)';
      break;
    case 'CheckedIn':
      topic = evt + '(address,bool)';
      break;
    default:
      return console.error('Topic cannot be undefined');
      break;
  }
  return web3.sha3(topic);
}

exports.eventListener = eventListener;