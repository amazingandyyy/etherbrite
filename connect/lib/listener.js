'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listener = undefined;

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var provider = void 0; // Usage
// listener(provider)(contractAddress, 'eventName');

var web3 = void 0;

function listener(p) {
  provider = p;
  web3 = new _web2.default(provider);
  return eventListener;
}

function eventListener(contractAddr, evt) {
  var filter = web3.eth.filter({
    fromBlock: web3.eth.getBlock('latest') - 50,
    toBlock: 'latest',
    address: contractAddr,
    topics: [generateTopic(evt)]
  });
  console.log('\x1b[32m', 'Listening to ' + evt + ' at ' + contractAddr);

  filter.get(function (err, response) {
    // callback code here
    if (err) return console.error(err);
    if (response.length > 0) {
      console.log('\x1b[32m', 'Event:', response[0]);
    }
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

exports.listener = listener;