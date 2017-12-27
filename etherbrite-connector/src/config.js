import Web3 from 'web3';
import TruffleContract from 'truffle-contract';

const provider = new Web3.providers.HttpProvider('http://localhost:8545');
const web3 = new Web3(provider);
const coinbase = web3.eth.coinbase;

const DEFAULT_GAS = 6000000;
const EventContractABI = require('../contracts/Event.json');
let EventContract = TruffleContract(EventContractABI);
EventContract.setProvider(provider);

export {
  provider,
  web3,
  coinbase,
  DEFAULT_GAS,
  EventContract
};