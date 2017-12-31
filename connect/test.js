import { createEvent } from './src';
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

createEvent(provider)(name, location, date, ticketNum, ticketPrice)
  .then(inst=>{
    if(inst.options.address) return console.log(`Deplyed Contract Address ${inst.options.address}`);
  })
  .catch(e=>{
    console.error(e)
  })