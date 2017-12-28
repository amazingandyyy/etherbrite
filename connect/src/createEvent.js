import Web3 from 'web3';
import TruffleContract from 'truffle-contract';

let providor;
let web3;
let coinbase;
const DEFAULT_GAS = 6000000;
let EventContract;

function createEvent(p) {
  if(!p) return console.error('Providor is required for etherbrite-connect.');
  providor = p;
  web3 = new Web3(provider);
  coinbase = web3.eth.coinbase;
  EventContract = TruffleContract(require('../contracts/Event.json'));
  EventContract.setProvider(provider);
  return createEventFnc;
}

function createEventFnc(name, location, date, ticketNum, ticketPriceInEther) {
  let ticketPriceInWei = web3.toWei(ticketPriceInEther, 'ether');
  return EventContract.new(
    name,
    location,
    date,
    parseInt(ticketNum),
    parseInt(ticketPriceInWei),
    {
      from: coinbase,
      gas: DEFAULT_GAS
    }
  )
  .then(inst => {
    return inst;
  })
  .catch(e => {
    console.error(e);
    throw(e.message);
  })
}

export { createEvent };