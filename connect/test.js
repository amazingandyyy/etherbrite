import { createEvent, eventListener } from './src';
import Web3 from 'web3';

// test it here
test();

function test() {
  const provider = new Web3.providers.HttpProvider("http://localhost:8545");
  
  let { name, location, date, ticketNum, ticketPrice } = {
    name: 'Testing Event Name',
    location: 'Testing Event Location',
    date: new Date().toLocaleDateString([], {
      day: '2-digit', month: '2-digit', year: 'numeric', 
    }).split('/').join('-').toString(),
    ticketNum: 10,
    ticketPrice : 0.001
  };
  createEvent(provider)(name, location, date, ticketNum, ticketPrice)
  .then(async contract => {
    console.log('\x1b[32m','Conctract deployed as', contract.address);
    try{
      let res = await eventListener(provider)(contract.address, 'ContractCreated')
      console.log(res);
    }catch(e){
      console.error('\x1b[31m', 'Error', e);
    }
  })
  .catch(e=>console.error(e));
}

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