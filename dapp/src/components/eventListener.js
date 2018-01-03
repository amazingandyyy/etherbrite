// Usage
// eventListener(provider)(contractAddress, 'eventName');

import Web3 from 'web3';

let provider;
let web3;

function eventListener(p) {
  provider = p;
  web3 = new Web3(provider);
  return eventListenerFnc;
}

function eventListenerFnc(contractAddr, evt) {
  const filter = web3.eth.filter({
    fromBlock: web3.eth.getBlock('latest') - 50,
    toBlock: 'latest',
    address: contractAddr,
    topics: [generateTopic(evt)]
  })
  console.log(`\x1b[0m\x1b[2m`,`Listening to`,`${evt} event`, `at address`, `${contractAddr}`, '\x1b[0m');
  
  return new Promise((resolve, reject)=>{
    filter.get(function (err, response) {
      if(err) return reject(err);
      if(response.length > 0){
        return resolve({event: evt, response: response[0]});
      }
    })
  })
}

function generateTopic(evt){
  let topic = '';
  switch (evt.toString()) {
    case 'ContractCreated':
      topic = `${evt}()`;
      break;
    case 'NewRegistration':
      topic = `${evt}(address,string,string,string,bool)`;
      break;
    case 'CheckedIn':
      topic = `${evt}(address,bool)`;
      break;
    default:
      return console.error('Topic cannot be undefined');
  }
  return web3.sha3(topic);
}

export { eventListener };