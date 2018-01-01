import { eventContract } from './src';
import Web3 from 'web3';
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
const eventContractInst = new eventContract(provider);

// Test Create contract Class
test('can create an Event Contract', done => {
  eventContractInst.createEvent(name, location, date, ticketNum, ticketPrice).then(inst=>{
    const { address } = inst.options;
    if(address) {
      expect(address).toBe(address);
      done();
    } else return console.error('Deployment failed, no contract address return.')
  })
  .catch(e=>{
    console.error(e)
  })
})

test('can register a new participant by paying enough', done => {
  eventContractInst.createEvent(name, location, date, ticketNum, ticketPrice).then(inst=>{
    const { address } = inst.options;
    if(address) {
      const personObj = { first: 'Andy', last: 'Chen', email: 'amazingandyyy@gmail.com' };
      eventContractInst.register(address, personObj)
        .then(r => {
          expect(Object.keys(r.events)[0]).toBe("NewRegistration");
          done();
        })
        .catch(e => console.error(e))
      } else return console.error('Deployment failed, no contract address return.');
  }).catch(e => console.error(e))
})