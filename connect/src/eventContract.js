import Web3 from 'web3';

const DEFAULT_GAS = 6000000;

class eventContract {
  constructor(p){
    if (!p) return console.error('\x1b[31m', 'Provider is required for etherbrite-connect.', '\x1b[0m');
    this.web3 = new Web3(p);
  }
  createEvent(name, location, date, ticketNum, ticketPriceInEther) {
    console.log(`Deploying contract...`);
    const { web3 } = this;
    const { abi, bytecode } = require('../contracts/Event.json');
    let ticketPriceInWei = web3.utils.toWei(ticketPriceInEther.toString(), 'ether');
    let eventContract = new web3.eth.Contract(abi);
    return new Promise((resolve, reject) => {
      web3.eth.getCoinbase((error, coinbase) => {
        if (error) return console.error('Coinbase not found');
        eventContract.deploy({
            data: bytecode,
            arguments: [name, location, date, ticketNum, ticketPriceInWei]
          }).send({
            from: coinbase,
            gas: DEFAULT_GAS
          }).then(ins => resolve(ins))
          .catch(e => reject(e));
      })
    })
  }
}


// Usage
// .then(inst=>{
//   if(inst.options.address){
//     console.log('hell yea');
//   }
//   console.log(inst);
// })
// .catch(e=>{
//   console.error(e);
// })

export { eventContract };