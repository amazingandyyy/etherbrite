import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import config from '../config';

const web3Provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(web3Provider);
const coinbase = web3.eth.coinbase;

function searchPerson(req, res, next) {
  search(req.params.address)
    .then(addr=>{
      res.send({contract_Address: addr})
    })
    .catch(next);
}

function search(addr) {
  const DEFAULT_GAS = 4000000;
  const EventContractABI = require(`${config.contractPath}/Event.json`);
  let EventContract = TruffleContract(EventContractABI);
  EventContract.setProvider(web3Provider);
  return EventContract.search(
    addr,
    {
      from: coinbase,
      gas: DEFAULT_GAS
    }
  )
  .then(inst => inst.address)
  .catch(e => {
    throw(new Error(e.message));
  })
}


export default searchPerson;