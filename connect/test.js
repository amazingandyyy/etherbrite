import { createEvent } from './src';
import Web3 from 'web3';
const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);

let eventObj = {
  name: 'Testing Event Name',
  location: 'Testing Event Location',
  date: new Date().toLocaleDateString([], {
    day: '2-digit', month: '2-digit', year: 'numeric', 
  }).split('/').join('-').toString(),
  ticketNum: 10,
  ticketPrice : 0.001
};
let { name, location, date, ticketNum, ticketPrice } = eventObj;

function test() {
  createEvent(provider)(name, location, date, ticketNum, ticketPrice)
  .then(contract => {
    console.log(contract.address);
    listenToEvent(contract.address, 'ContractCreated');
  })
  .catch(e=>console.error(e));
}

function listenToEvent(contractAddr, evt) {
  const filter = web3.eth.filter({
    fromBlock: web3.eth.getBlock('latest') - 50,
    toBlock: 'latest',
    address: contractAddr,
    topics: [generateTopic(evt)]
  })

  filter.get(function (err, response) {
    // callback code here
    if(err) return console.error(err);
    console.log(response[0]);
  })
}

function generateTopic(evt){
  let topic = '';
  let result = '';
  switch (evt.toString()) {
    case 'ContractCreated':
      topic = `ContractCreated(uint, string, string, string, uint, uint)`;
      result = "0x6693ea92f7d90a1a5305cf52eb8b9a45186eec40b0e9909e64c070805601aaeb";
      break;
    case 'NewRegistration':
      topic = `NewRegistration(uint, string, string, string, bool)`;
      break;
    case 'CheckedIn':
      topic = `CheckedIn(uint, address, bool)`;
      break;
    default:
      return console.error('Topic cannot be undefined');
      break;
  }
  // const result = web3.sha3(topic);
  // console.log(result);
  return result;
}

test();

// https://coursetro.com/posts/code/100/Solidity-Events-Tutorial---Using-Web3.js-to-Listen-for-Smart-Contract-Events
// var contract = web3.eth.contract(YOUR ABI);
// var contractInst = contract.at('CONTRACT ADDRESS');
// var createdEvent = contractInst.PersonCreated({age: 26});
// createdEvent.watch(function(err, result) {
//   if (err) {
//     console.log(err)
//     return;
//   }
//   console.log("Found ", result);
// })

// https://ethereum.stackexchange.com/questions/2024/how-to-access-the-event-log-by-knowing-the-contract-address-web3
// web3.eth.filter({
//   address: contractAddress
//   from: coinbase,
//   to: 'latest'
// }).get(function (err, result) {
//   // callback code here
// })