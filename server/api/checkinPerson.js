import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import config from '../config';

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider);
const coinbase = web3.eth.coinbase;

function checkinPerson(req, res, next) {
  checkin(req.params.address)
    .then(addr=>{
      res.send({contract_Address: addr})
    })
    .catch(next);
}

function checkin(addr) {
  const DEFAULT_GAS = 4000000;
  const EventContractABI = require(`${config.contractPath}/Event.json`);
  let EventContract = TruffleContract(EventContractABI);
  EventContract.setProvider(provider);
  return EventContract.checkin(
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


export default checkinPerson;