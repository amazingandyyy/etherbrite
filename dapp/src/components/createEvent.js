import Web3 from 'web3';
import TruffleContract from 'truffle-contract';

let provider;
let web3;
let coinbase;
const DEFAULT_GAS = 6000000;
let EventContract;

function createEvent(p) {
  if(!p) return console.error('\x1b[31m','Provider is required for etherbrite-connect.', '\x1b[0m');
  provider = p;
  web3 = new Web3(provider);
  coinbase = web3.eth.coinbase;
  EventContract = TruffleContract(require('./contracts/Event.json'));
  EventContract.setProvider(provider);
  console.log(`Deploying contract...`);
  return createEventFnc;
}

function createEventFnc(name, location, date, ticketNum, ticketPriceInEther) {
  let ticketPriceInWei = web3.toWei(ticketPriceInEther, 'ether');
  return new Promise((resolve, reject) => {
    EventContract.new(
      name,
      location,
      date,
      parseInt(ticketNum),
      parseInt(ticketPriceInWei),
      {
        from: coinbase,
        gas: DEFAULT_GAS
      }
    ).then(c => {
      console.log('good');
      console.log(`deployed event contract address: ${c.address}`);
      resolve(c);
    })
    .catch(e => {
      console.error('Error when creating contract:')
      console.error(e);
      reject(e);
    })
  });
}

export { createEvent };